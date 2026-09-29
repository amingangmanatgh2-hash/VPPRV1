import test from 'node:test';
import assert from 'node:assert';
import app from '../src/index.js';
import { MockD1 } from './mock-db.js';
import { generateUUID, generateShortId, hashPassword, verifyPassword } from '../src/crypto.js';
import { ensureSeedData } from '../src/seed.js';
import { buildVlessUri, buildXrayClientJson, buildXrayServerInboundConfig } from '../src/xray-config.js';

test('VPPRV1 Xray Core & VLESS Suite', async (t) => {
  const db = new MockD1();
  const env = { DB: db, JWT_SECRET: 'test_jwt_secret_key_123456789' };

  await t.test('1. Cryptography: UUID v4 & Short ID generation', () => {
    const uuid = generateUUID();
    assert.ok(uuid, 'UUID should exist');
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'Must be valid UUID v4');

    const shortId = generateShortId();
    assert.ok(shortId, 'ShortId should exist');
    assert.strictEqual(shortId.length, 8, 'ShortId should be 8-char hex');
  });

  await t.test('2. Cryptography: PBKDF2 Password Hashing', async () => {
    const hashed = await hashPassword('AdminPass@2026');
    assert.strictEqual(hashed.iterations, 100000);
    const isValid = await verifyPassword('AdminPass@2026', hashed.hash, hashed.salt);
    assert.strictEqual(isValid, true, 'Valid password should verify');
    const isInvalid = await verifyPassword('WrongPass', hashed.hash, hashed.salt);
    assert.strictEqual(isInvalid, false, 'Invalid password should fail');
  });

  await t.test('3. Database: Seed initial 11 Xray nodes with offline status', async () => {
    await ensureSeedData(db);
    assert.strictEqual(db.tables.nodes.length, 11, 'Should have exactly 11 default Xray nodes');
    
    // Check initial nodes are offline
    const allOffline = db.tables.nodes.every(n => n.status === 'offline');
    assert.strictEqual(allOffline, true, 'Initial seed nodes must start as offline');
    
    // Verify VPS Providers (Hetzner, Vultr, OVH)
    const providers = db.tables.nodes.map(n => n.provider);
    assert.ok(providers.some(p => p.includes('Hetzner')));
    assert.ok(providers.some(p => p.includes('Vultr')));
    assert.ok(providers.some(p => p.includes('OVH')));
  });

  await t.test('4. VLESS URI & Config Generation', () => {
    const uri = buildVlessUri({
      uuid: "12345678-1234-4234-8234-123456789abc",
      host: "de1.vpprv1.net",
      port: 443,
      name: "آلمان (Hetzner)",
      transport: "tcp",
      security: "reality",
      realityPublicKey: "kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P",
      realityShortId: "a1b2c3d4",
      realitySni: "www.microsoft.com"
    });

    assert.ok(uri.startsWith("vless://12345678-1234-4234-8234-123456789abc@de1.vpprv1.net:443?"));
    assert.ok(uri.includes("type=tcp"));
    assert.ok(uri.includes("security=reality"));
    assert.ok(uri.includes("pbk=kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P"));
    assert.ok(uri.includes("sid=a1b2c3d4"));
    assert.ok(uri.includes("sni=www.microsoft.com"));
    assert.ok(uri.includes("flow=xtls-rprx-vision"));

    const clientJson = buildXrayClientJson({
      uuid: "12345678-1234-4234-8234-123456789abc",
      host: "de1.vpprv1.net",
      port: 443,
      security: "reality"
    });
    assert.strictEqual(clientJson.outbounds[0].protocol, "vless");
    assert.strictEqual(clientJson.outbounds[0].streamSettings.security, "reality");
  });

  await t.test('5. API: GET /api/servers & GET /api/servers/status', async () => {
    const res = await app.request('/api/servers', {}, env);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.servers.length, 11);

    const statusRes = await app.request('/api/servers/status', {}, env);
    assert.strictEqual(statusRes.status, 200);
    const statusData = await statusRes.json();
    assert.strictEqual(statusData.total_count, 11);
    assert.strictEqual(statusData.online_count, 0);
  });

  let createdToken = '';

  await t.test('6. API: POST /api/v1/provision (Automatic VLESS Provisioning)', async () => {
    const res = await app.request('/api/v1/provision', { method: 'POST' }, env);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Should return generated subscription token');
    assert.ok(data.token.startsWith('sub_'));
    assert.ok(data.vless_uri.startsWith('vless://'));
    assert.ok(data.uuid);
    createdToken = data.token;
  });

  await t.test('7. API: GET /api/v1/sub/:token (VLESS URI output)', async () => {
    const res = await app.request(`/api/v1/sub/${createdToken}`, {}, env);
    assert.strictEqual(res.status, 200);
    const uri = await res.text();
    assert.ok(uri.startsWith('vless://'));
    assert.ok(uri.includes('security=reality'));
  });

  await t.test('8. API: GET /api/v1/sub/:token?format=json (Xray Client JSON)', async () => {
    const res = await app.request(`/api/v1/sub/${createdToken}?format=json`, {}, env);
    assert.strictEqual(res.status, 200);
    const config = await res.json();
    assert.ok(config.outbounds);
    assert.strictEqual(config.outbounds[0].protocol, 'vless');
  });

  await t.test('9. Node Agent: Report Heartbeat & Xray Sync', async () => {
    const targetNode = db.tables.nodes[0];
    const agentToken = targetNode.agent_token;

    // Report Heartbeat
    const repRes = await app.request('/api/agent/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`,
        'X-Node-Id': targetNode.id
      },
      body: JSON.stringify({ load: 22, latency: 45, users_count: 5 })
    }, env);

    assert.strictEqual(repRes.status, 200);
    const repData = await repRes.json();
    assert.strictEqual(repData.success, true);
    assert.strictEqual(targetNode.status, 'online');
    assert.strictEqual(targetNode.load, 22);
    assert.strictEqual(targetNode.latency, 45);

    // Sync Xray Server Config
    const syncRes = await app.request('/api/agent/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`,
        'X-Node-Id': targetNode.id
      }
    }, env);

    assert.strictEqual(syncRes.status, 200);
    const syncData = await syncRes.json();
    assert.strictEqual(syncData.success, true);
    assert.ok(syncData.xray_config, 'Should return full Xray server inbound config');
    assert.strictEqual(syncData.xray_config.inbounds[0].protocol, 'vless');
  });

  await t.test('10. Admin Auth & User Management (Status Toggle)', async () => {
    // Login
    const loginRes = await app.request('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'Admin@VPPRV1#2026' })
    }, env);

    assert.strictEqual(loginRes.status, 200);
    const loginData = await loginRes.json();
    assert.ok(loginData.token, 'Should return HMAC session token');

    // Access Users
    const usersRes = await app.request('/api/admin/users', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    }, env);
    assert.strictEqual(usersRes.status, 200);
    const usersData = await usersRes.json();
    assert.strictEqual(usersData.users.length > 0, true);

    const testUser = usersData.users[0];
    // Disable user
    const toggleRes = await app.request(`/api/admin/users/${testUser.id}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify({ status: 'disabled' })
    }, env);
    assert.strictEqual(toggleRes.status, 200);
    
    // Verify in db
    const updatedUser = db.tables.users.find(u => u.id === testUser.id);
    assert.strictEqual(updatedUser.status, 'disabled');
  });

  await t.test('11. Static HTML Pages Render (Farsi RTL)', async () => {
    const pages = ['/', '/features', '/servers', '/downloads', '/guide', '/privacy', '/terms', '/about', '/panel'];
    for (const p of pages) {
      const res = await app.request(p, {}, env);
      assert.strictEqual(res.status, 200, `Page ${p} should return 200`);
      const html = await res.text();
      assert.ok(html.includes('dir="rtl"'), `Page ${p} must have dir="rtl"`);
      assert.ok(html.includes('VPPRV1'), `Page ${p} must contain VPPRV1 brand`);
      assert.ok(!html.includes('WireGuard'), `Page ${p} must not contain WireGuard`);
    }
  });
});
