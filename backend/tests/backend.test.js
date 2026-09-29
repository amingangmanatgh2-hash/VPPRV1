import test from 'node:test';
import assert from 'node:assert';
import app from '../src/index.js';
import { MockD1 } from './mock-db.js';
import { generateWireGuardKeyPair, generatePresharedKey, hashPassword, verifyPassword } from '../src/crypto.js';
import { ensureSeedData } from '../src/seed.js';

test('VPPRV1 Backend Suite', async (t) => {
  const db = new MockD1();
  const env = { DB: db, JWT_SECRET: 'test_jwt_secret_key_123456789' };

  await t.test('1. Cryptography: X25519 & PSK generation', () => {
    const kp = generateWireGuardKeyPair();
    assert.ok(kp.privateKey, 'Private key should exist');
    assert.ok(kp.publicKey, 'Public key should exist');
    assert.strictEqual(typeof kp.privateKey, 'string');
    assert.strictEqual(typeof kp.publicKey, 'string');

    const psk = generatePresharedKey();
    assert.ok(psk, 'PresharedKey should exist');
    assert.strictEqual(typeof psk, 'string');
  });

  await t.test('2. Cryptography: PBKDF2 Password Hashing', async () => {
    const hashed = await hashPassword('AdminPass@2026');
    assert.strictEqual(hashed.iterations, 100000);
    const isValid = await verifyPassword('AdminPass@2026', hashed.hash, hashed.salt);
    assert.strictEqual(isValid, true, 'Valid password should verify');
    const isInvalid = await verifyPassword('WrongPass', hashed.hash, hashed.salt);
    assert.strictEqual(isInvalid, false, 'Invalid password should fail');
  });

  await t.test('3. Database: Seed initial 11 servers with offline status', async () => {
    await ensureSeedData(db);
    assert.strictEqual(db.tables.servers.length, 11, 'Should have exactly 11 default servers');
    
    // Check initial servers are offline
    const allOffline = db.tables.servers.every(s => s.status === 'offline');
    assert.strictEqual(allOffline, true, 'Initial seed servers must start as offline');
    
    // Verify required country nodes exist
    const names = db.tables.servers.map(s => s.name);
    assert.ok(names.some(n => n.includes('آمریکا ۱')));
    assert.ok(names.some(n => n.includes('آمریکا ۲')));
    assert.ok(names.some(n => n.includes('آلمان')));
    assert.ok(names.some(n => n.includes('هلند')));
    assert.ok(names.some(n => n.includes('انگلیس')));
    assert.ok(names.some(n => n.includes('فرانسه')));
    assert.ok(names.some(n => n.includes('ترکیه')));
    assert.ok(names.some(n => n.includes('امارات')));
    assert.ok(names.some(n => n.includes('سنگاپور')));
    assert.ok(names.some(n => n.includes('ژاپن')));
    assert.ok(names.some(n => n.includes('ایران')));
  });

  await t.test('4. API: GET /api/servers & GET /api/servers/status', async () => {
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

  await t.test('5. API: POST /api/v1/provision (Automatic WireGuard Provisioning)', async () => {
    const res = await app.request('/api/v1/provision', { method: 'POST' }, env);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Should return generated subscription token');
    assert.ok(data.token.startsWith('sub_'));
    assert.ok(data.client_address.startsWith('10.66.'));
    createdToken = data.token;
  });

  await t.test('6. API: GET /api/v1/sub/:token (Full Tunnel .conf generation)', async () => {
    const res = await app.request(`/api/v1/sub/${createdToken}`, {}, env);
    assert.strictEqual(res.status, 200);
    const conf = await res.text();
    assert.ok(conf.includes('[Interface]'));
    assert.ok(conf.includes('PrivateKey = '));
    assert.ok(conf.includes('Address = 10.66.'));
    assert.ok(conf.includes('[Peer]'));
    assert.ok(conf.includes('AllowedIPs = 0.0.0.0/0, ::/0'));
    assert.ok(conf.includes('Endpoint = '));
  });

  await t.test('7. API: GET /api/v1/sub/:token?mode=split&port=443 (Net Melli Split Tunnel)', async () => {
    const res = await app.request(`/api/v1/sub/${createdToken}?mode=split&port=443`, {}, env);
    assert.strictEqual(res.status, 200);
    const conf = await res.text();
    assert.ok(conf.includes('[Interface]'));
    assert.ok(conf.includes('MTU = 1330'), 'Split mode MTU must be capped at 1330');
    assert.ok(conf.includes(':443'), 'Endpoint must use UDP port 443');
    assert.ok(!conf.includes('AllowedIPs = 0.0.0.0/0'), 'Split mode must NOT allow all IPs directly');
    assert.ok(conf.includes('AllowedIPs = 1.0.0.0/8'), 'Split mode should route international CIDRs');
  });

  await t.test('8. Node Agent: Report Heartbeat & Peer Sync', async () => {
    const targetServer = db.tables.servers[0];
    const agentToken = targetServer.agent_token;

    // Report Heartbeat
    const repRes = await app.request('/api/agent/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`,
        'X-Server-Id': targetServer.id
      },
      body: JSON.stringify({ load: 22, latency: 45, peers_count: 5 })
    }, env);

    assert.strictEqual(repRes.status, 200);
    const repData = await repRes.json();
    assert.strictEqual(repData.success, true);
    assert.strictEqual(targetServer.status, 'online');
    assert.strictEqual(targetServer.load, 22);
    assert.strictEqual(targetServer.latency, 45);

    // Sync Peers
    const syncRes = await app.request('/api/agent/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`,
        'X-Server-Id': targetServer.id
      }
    }, env);

    assert.strictEqual(syncRes.status, 200);
    const syncData = await syncRes.json();
    assert.strictEqual(syncData.success, true);
    assert.strictEqual(Array.isArray(syncData.peers), true);
  });

  await t.test('9. Admin Auth & Protected Routes', async () => {
    // Login
    const loginRes = await app.request('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'Admin@VPPRV1#2026' })
    }, env);

    assert.strictEqual(loginRes.status, 200);
    const loginData = await loginRes.json();
    assert.ok(loginData.token, 'Should return HMAC session token');

    // Access Dashboard with token
    const dashRes = await app.request('/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    }, env);
    assert.strictEqual(dashRes.status, 200);
    const dashData = await dashRes.json();
    assert.strictEqual(dashData.success, true);
    assert.strictEqual(dashData.totalServers, 11);
    assert.strictEqual(dashData.onlineServers, 1);
  });

  await t.test('10. Static HTML Pages Render (Farsi RTL)', async () => {
    const pages = ['/', '/features', '/servers', '/downloads', '/guide', '/privacy', '/terms', '/about', '/panel'];
    for (const p of pages) {
      const res = await app.request(p, {}, env);
      assert.strictEqual(res.status, 200, `Page ${p} should return 200`);
      const html = await res.text();
      assert.ok(html.includes('dir="rtl"'), `Page ${p} must have dir="rtl"`);
      assert.ok(html.includes('VPPRV1'), `Page ${p} must contain VPPRV1 brand`);
    }
  });
});
