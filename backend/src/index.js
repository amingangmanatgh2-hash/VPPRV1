// VPPRV1 Cloudflare Workers Main Backend Application
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { generateWireGuardKeyPair, generatePresharedKey, hashPassword, verifyPassword, createSessionToken, verifySessionToken, timingSafeEqual } from './crypto.js';
import { ensureSeedData } from './seed.js';
import { buildWireGuardConfig } from './wg-config.js';
import { checkRateLimit } from './rate-limit.js';
import { calculateSplitAllowedIPs, IRAN_CIDRS } from './iran-cidrs.js';
import { 
  renderHomePage, 
  renderFeaturesPage, 
  renderServersPage, 
  renderDownloadsPage, 
  renderGuidePage, 
  renderPrivacyPage, 
  renderTermsPage, 
  renderAboutPage 
} from './web-pages.js';
import { renderAdminPanelPage } from './admin-panel.js';

const app = new Hono();

// Global CORS Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Helper to get client IP
function getClientIP(c) {
  return c.req.header('cf-connecting-ip') || 
         c.req.header('x-forwarded-for') || 
         c.req.header('x-real-ip') || 
         '127.0.0.1';
}

// Ensure seed data runs on requests
app.use('*', async (c, next) => {
  if (c.env && c.env.DB) {
    await ensureSeedData(c.env.DB);
  }
  await next();
});

// -------------------------------------------------------------
// PUBLIC WEBSITE PAGES (Persian RTL)
// -------------------------------------------------------------

app.get('/', (c) => c.html(renderHomePage()));
app.get('/features', (c) => c.html(renderFeaturesPage()));
app.get('/servers', async (c) => {
  let servers = [];
  if (c.env && c.env.DB) {
    const res = await c.env.DB.prepare("SELECT * FROM servers ORDER BY country ASC").all();
    servers = res.results || [];
  }
  return c.html(renderServersPage(servers));
});
app.get('/downloads', (c) => c.html(renderDownloadsPage()));
app.get('/guide', (c) => c.html(renderGuidePage()));
app.get('/privacy', (c) => c.html(renderPrivacyPage()));
app.get('/terms', (c) => c.html(renderTermsPage()));
app.get('/about', (c) => c.html(renderAboutPage()));
app.get('/panel', (c) => c.html(renderAdminPanelPage()));

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// GET /api/servers
app.get('/api/servers', async (c) => {
  try {
    if (!c.env || !c.env.DB) {
      return c.json({ success: true, servers: [] });
    }
    const res = await c.env.DB.prepare(`
      SELECT id, name, country, flag, host, port, public_key, status, load, latency, peers_count, agent_token, last_heartbeat 
      FROM servers ORDER BY country ASC
    `).all();
    return c.json({ success: true, count: res.results.length, servers: res.results });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/servers/status
app.get('/api/servers/status', async (c) => {
  try {
    if (!c.env || !c.env.DB) {
      return c.json({ success: true, online_count: 0, total_count: 0, servers: [] });
    }
    const serversRes = await c.env.DB.prepare("SELECT * FROM servers").all();
    const servers = serversRes.results || [];
    const onlineServers = servers.filter(s => s.status === 'online');
    const totalPeers = servers.reduce((acc, s) => acc + (s.peers_count || 0), 0);
    const avgLatency = onlineServers.length > 0 
      ? Math.round(onlineServers.reduce((acc, s) => acc + s.latency, 0) / onlineServers.length) 
      : 0;

    return c.json({
      success: true,
      total_count: servers.length,
      online_count: onlineServers.length,
      offline_count: servers.length - onlineServers.length,
      total_active_peers: totalPeers,
      average_latency_ms: avgLatency,
      timestamp: Date.now(),
      servers: servers.map(s => ({
        id: s.id,
        name: s.name,
        country: s.country,
        flag: s.flag,
        status: s.status,
        latency: s.latency,
        load: s.load,
        peers: s.peers_count,
        last_heartbeat: s.last_heartbeat
      }))
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/versions
app.get('/api/versions', (c) => {
  return c.json({
    success: true,
    version: "1.0.0",
    release_date: "2026-09-29",
    platforms: {
      windows: {
        version: "1.0.0",
        file: "VPPRV1-Setup.exe",
        framework: ".NET 8 Avalonia UI",
        min_os: "Windows 10 64-bit",
        download_url: "/api/downloads/VPPRV1-Setup.exe"
      },
      android: {
        version: "1.0.0",
        file: "VPPRV1.apk",
        framework: "Kotlin Native Android VpnService",
        min_os: "Android 8.0 (API 26)",
        download_url: "/api/downloads/VPPRV1.apk"
      },
      linux: {
        version: "1.0.0",
        file: "VPPRV1-Linux.tar.gz",
        framework: "CLI WireGuard Integration",
        min_os: "Linux Kernel 5.4+",
        download_url: "/api/downloads/VPPRV1-Linux.tar.gz"
      }
    },
    changelog: [
      "انتشار اولین نسخه رسمی پلتفرم VPPRV1",
      "پشتیبانی کامل از الگوریتم مدرن رمزنگاری X25519",
      "مسیریابی هوشمند تفکیک ترافیک نت ملی با MTU 1330 و UDP 443",
      "سیستم همگام‌سازی بلادرنگ Node Agent برای سرورهای لینوکس"
    ]
  });
});

// GET /api/downloads
app.get('/api/downloads', (c) => {
  return c.json({
    success: true,
    packages: [
      {
        name: "VPPRV1 Windows Setup",
        filename: "VPPRV1-Setup.exe",
        type: "NSIS Installer",
        size: "18.4 MB",
        url: "/api/downloads/VPPRV1-Setup.exe"
      },
      {
        name: "VPPRV1 Windows Portable",
        filename: "VPPRV1-Portable.zip",
        type: "ZIP Archive",
        size: "17.9 MB",
        url: "/api/downloads/VPPRV1-Portable.zip"
      },
      {
        name: "VPPRV1 Android APK",
        filename: "VPPRV1.apk",
        type: "Android Package",
        size: "14.2 MB",
        url: "/api/downloads/VPPRV1.apk"
      },
      {
        name: "VPPRV1 Linux CLI Package",
        filename: "VPPRV1-Linux.tar.gz",
        type: "Tarball",
        size: "4.5 MB",
        url: "/api/downloads/VPPRV1-Linux.tar.gz"
      }
    ]
  });
});

// GET /api/downloads/:filename
app.get('/api/downloads/:filename', (c) => {
  const filename = c.req.param('filename');
  // Return downloadable content or redirection
  const githubReleaseUrl = `https://github.com/amingangmanatgh2-hash/VPPRV1/releases/download/v1.0.0/${filename}`;
  return c.redirect(githubReleaseUrl, 302);
});

// -------------------------------------------------------------
// PROVISIONING & SUBSCRIPTION
// -------------------------------------------------------------

// POST /api/v1/provision (Generates a valid subscription without user input)
app.post('/api/v1/provision', async (c) => {
  const clientIP = getClientIP(c);

  if (c.env && c.env.DB) {
    // Check Rate Limit (5 requests per 10 minutes per IP)
    const rateCheck = await checkRateLimit(c.env.DB, clientIP, 'provision', 10, 600000);
    if (!rateCheck.allowed) {
      return c.json({
        success: false,
        error: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً چند دقیقه دیگر دوباره امتحان کنید.",
        retry_after_seconds: rateCheck.retryAfter
      }, 429);
    }
  }

  try {
    // Generate real cryptographic X25519 keypair for client
    const clientKeypair = generateWireGuardKeyPair();
    const psk = generatePresharedKey();
    const token = "sub_" + crypto.randomUUID().replace(/-/g, "");

    // Choose default or best server
    let selectedServer = null;
    if (c.env && c.env.DB) {
      // Prefer online server with lowest load, else first server
      const onlineServer = await c.env.DB.prepare("SELECT * FROM servers WHERE status = 'online' ORDER BY load ASC, latency ASC LIMIT 1").first();
      if (onlineServer) {
        selectedServer = onlineServer;
      } else {
        selectedServer = await c.env.DB.prepare("SELECT * FROM servers LIMIT 1").first();
      }
    }

    const serverId = selectedServer ? selectedServer.id : "de-fra-1";
    const serverName = selectedServer ? selectedServer.name : "آلمان (فرانکفورت)";

    // Allocate client address
    const octet3 = Math.floor(Math.random() * 250) + 1;
    const octet4 = Math.floor(Math.random() * 250) + 2;
    const clientAddress = `10.66.${octet3}.${octet4}/32`;

    const now = Date.now();
    const expiresAt = now + (30 * 24 * 60 * 60 * 1000); // 30 days

    if (c.env && c.env.DB) {
      // Save subscription
      await c.env.DB.prepare(`
        INSERT INTO subscriptions (token, user_id, created_ip, server_id, client_private_key, client_public_key, client_address, preshared_key, mode, is_active, created_at, expires_at)
        VALUES (?, 'guest', ?, ?, ?, ?, ?, ?, 'full', 1, ?, ?)
      `).bind(token, clientIP, serverId, clientKeypair.privateKey, clientKeypair.publicKey, clientAddress, psk, now, expiresAt).run();

      // Save peer record for agent sync
      const peerId = "peer_" + crypto.randomUUID().replace(/-/g, "").substring(0, 12);
      await c.env.DB.prepare(`
        INSERT INTO peers (id, server_id, subscription_token, public_key, preshared_key, allowed_ips, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'active', ?)
      `).bind(peerId, serverId, token, clientKeypair.publicKey, psk, clientAddress, now).run();

      // Update server peers_count
      await c.env.DB.prepare("UPDATE servers SET peers_count = peers_count + 1 WHERE id = ?").bind(serverId).run();
    }

    const baseUrl = new URL(c.req.url).origin;

    return c.json({
      success: true,
      message: "اشتراک وایرگارد با موفقیت ایجاد شد.",
      token: token,
      subscription_url: `${baseUrl}/api/v1/sub/${token}`,
      conf_url: `${baseUrl}/api/v1/sub/${token}`,
      client_address: clientAddress,
      server_id: serverId,
      server_name: serverName,
      created_at: now,
      expires_at: expiresAt
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/v1/sub/:token (Returns a real valid WireGuard .conf)
app.get('/api/v1/sub/:token', async (c) => {
  const token = c.req.param('token');
  const modeParam = c.req.query('mode') || 'full'; // 'split' or 'full'
  const portParam = c.req.query('port') ? parseInt(c.req.query('port')) : null;
  const mtuParam = c.req.query('mtu') ? parseInt(c.req.query('mtu')) : null;

  try {
    let sub = null;
    let server = null;
    let iranCidrsList = IRAN_CIDRS;

    if (c.env && c.env.DB) {
      sub = await c.env.DB.prepare("SELECT * FROM subscriptions WHERE token = ?").bind(token).first();
      if (!sub) {
        return c.text("# خطا: اشتراک یافت نشد یا منقضی شده است.\n# Token not found or expired.", 404);
      }

      server = await c.env.DB.prepare("SELECT * FROM servers WHERE id = ?").bind(sub.server_id).first();

      // Read Iran CIDRs from database config if available
      const cidrRecord = await c.env.DB.prepare("SELECT value FROM configs WHERE key = 'iran_cidrs'").first();
      if (cidrRecord && cidrRecord.value) {
        try {
          iranCidrsList = JSON.parse(cidrRecord.value);
        } catch (e) {}
      }
    } else {
      // Fallback demo config
      const kp = generateWireGuardKeyPair();
      sub = {
        client_private_key: kp.privateKey,
        client_public_key: kp.publicKey,
        client_address: "10.66.1.2/32",
        preshared_key: generatePresharedKey()
      };
      server = {
        host: "de1.vpprv1.net",
        port: 443,
        public_key: generateWireGuardKeyPair().publicKey
      };
    }

    const host = server ? server.host : "de1.vpprv1.net";
    const port = portParam || (server ? server.port : 443);
    const serverPubKey = server ? server.public_key : "dHJhbnNwYXJlbnRfcHVibGljX2tleV9leGFtcGxlMTIz=";

    // Calculate split allowed IPs if requested
    let customAllowedIPs = null;
    if (modeParam === 'split') {
      customAllowedIPs = calculateSplitAllowedIPs(iranCidrsList);
    }

    const wgConfText = buildWireGuardConfig({
      clientPrivateKey: sub.client_private_key,
      clientAddress: sub.client_address,
      dns: "1.1.1.1, 1.0.0.1",
      serverPublicKey: serverPubKey,
      presharedKey: sub.preshared_key,
      serverHost: host,
      serverPort: port,
      mode: modeParam,
      customAllowedIPs: customAllowedIPs,
      mtu: mtuParam
    });

    c.header('Content-Type', 'text/plain; charset=utf-8');
    c.header('Content-Disposition', `attachment; filename="vpprv1-${token.substring(0, 10)}.conf"`);
    return c.text(wgConfText);
  } catch (err) {
    return c.text(`# Error: ${err.message}`, 500);
  }
});

// -------------------------------------------------------------
// NODE AGENT SYNC & REPORT APIS
// -------------------------------------------------------------

// Helper to authenticate Agent token timing-safely
async function authenticateAgent(c) {
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const serverId = c.req.header('X-Server-Id') || c.req.query('server_id');

  if (!token || !c.env || !c.env.DB) return null;

  let server;
  if (serverId) {
    server = await c.env.DB.prepare("SELECT * FROM servers WHERE id = ?").bind(serverId).first();
  } else {
    // Match by token
    server = await c.env.DB.prepare("SELECT * FROM servers WHERE agent_token = ?").bind(token).first();
  }

  if (server && timingSafeEqual(server.agent_token, token)) {
    return server;
  }
  return null;
}

// POST /api/agent/sync (Node Agent requests active peers)
app.post('/api/agent/sync', async (c) => {
  try {
    const server = await authenticateAgent(c);
    if (!server) {
      return c.json({ success: false, error: "Unauthorized Node Agent Token" }, 401);
    }

    // Get active peers for this server
    const peersRes = await c.env.DB.prepare(`
      SELECT id, public_key, preshared_key, allowed_ips, status 
      FROM peers 
      WHERE server_id = ? AND status = 'active'
    `).bind(server.id).all();

    return c.json({
      success: true,
      server_id: server.id,
      timestamp: Date.now(),
      peers: peersRes.results || []
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/agent/report (Node Agent reports telemetry & heartbeat)
app.post('/api/agent/report', async (c) => {
  try {
    const server = await authenticateAgent(c);
    if (!server) {
      return c.json({ success: false, error: "Unauthorized Node Agent Token" }, 401);
    }

    const body = await c.req.json();
    const load = typeof body.load === 'number' ? Math.round(body.load) : 0;
    const latency = typeof body.latency === 'number' ? Math.round(body.latency) : 0;
    const peersCount = typeof body.peers_count === 'number' ? body.peers_count : 0;
    const now = Date.now();

    // Update server table
    await c.env.DB.prepare(`
      UPDATE servers 
      SET status = 'online', load = ?, latency = ?, peers_count = ?, last_heartbeat = ? 
      WHERE id = ?
    `).bind(load, latency, peersCount, now, server.id).run();

    return c.json({
      success: true,
      message: "Heartbeat report recorded successfully",
      server_id: server.id,
      timestamp: now
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION & MANAGEMENT APIS
// -------------------------------------------------------------

// POST /api/admin/login
app.post('/api/admin/login', async (c) => {
  const clientIP = getClientIP(c);

  if (c.env && c.env.DB) {
    const rateCheck = await checkRateLimit(c.env.DB, clientIP, 'admin_login', 5, 300000);
    if (!rateCheck.allowed) {
      return c.json({ success: false, error: "تعداد تلاش‌های ناموفق زیاد بوده است. لطفاً ۵ دقیقه دیگر امتحان کنید." }, 429);
    }
  }

  try {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ success: false, error: "نام کاربری و رمز عبور الزامی است." }, 400);
    }

    if (!c.env || !c.env.DB) {
      // In-memory demo fallback
      if (username === 'admin' && password === 'Admin@VPPRV1#2026') {
        const token = await createSessionToken({ user: 'admin', role: 'admin' }, 'vpprv1_secret_jwt_key_2026');
        return c.json({ success: true, token });
      }
      return c.json({ success: false, error: "نام کاربری یا رمز عبور اشتباه است." }, 401);
    }

    const user = await c.env.DB.prepare("SELECT * FROM admin_auth WHERE username = ?").bind(username).first();
    if (!user) {
      return c.json({ success: false, error: "نام کاربری یا رمز عبور اشتباه است." }, 401);
    }

    const isValid = await verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return c.json({ success: false, error: "نام کاربری یا رمز عبور اشتباه است." }, 401);
    }

    const jwtSecret = c.env.JWT_SECRET || 'vpprv1_secret_jwt_key_2026';
    const token = await createSessionToken({ user: username, role: 'admin' }, jwtSecret);

    // Record login log
    await c.env.DB.prepare("INSERT INTO logs (level, message, ip, created_at) VALUES ('info', ?, ?, ?)")
      .bind(`Admin login successful: ${username}`, clientIP, Date.now()).run();

    return c.json({ success: true, token });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// Admin Auth Middleware
async function requireAdminAuth(c, next) {
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    return c.json({ success: false, error: "Unauthorized. Missing Token." }, 401);
  }

  const jwtSecret = (c.env && c.env.JWT_SECRET) ? c.env.JWT_SECRET : 'vpprv1_secret_jwt_key_2026';
  const session = await verifySessionToken(token, jwtSecret);

  if (!session) {
    return c.json({ success: false, error: "Invalid or expired session token." }, 401);
  }

  c.set('admin_user', session.user);
  await next();
}

// GET /api/admin/dashboard
app.get('/api/admin/dashboard', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) {
      return c.json({ totalServers: 0, onlineServers: 0, totalSubs: 0, totalPeers: 0, servers: [] });
    }

    const serversRes = await c.env.DB.prepare("SELECT * FROM servers").all();
    const subsCount = await c.env.DB.prepare("SELECT COUNT(*) as count FROM subscriptions").first();
    const peersCount = await c.env.DB.prepare("SELECT COUNT(*) as count FROM peers WHERE status = 'active'").first();

    const servers = serversRes.results || [];
    const onlineCount = servers.filter(s => s.status === 'online').length;

    return c.json({
      success: true,
      totalServers: servers.length,
      onlineServers: onlineCount,
      totalSubs: subsCount ? subsCount.count : 0,
      totalPeers: peersCount ? peersCount.count : 0,
      servers: servers
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/peers
app.get('/api/admin/peers', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) return c.json({ peers: [] });
    const res = await c.env.DB.prepare("SELECT * FROM peers ORDER BY created_at DESC LIMIT 100").all();
    return c.json({ success: true, peers: res.results || [] });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// DELETE /api/admin/peers/:id
app.delete('/api/admin/peers/:id', requireAdminAuth, async (c) => {
  const id = c.req.param('id');
  try {
    if (c.env && c.env.DB) {
      await c.env.DB.prepare("DELETE FROM peers WHERE id = ?").bind(id).run();
    }
    return c.json({ success: true, message: `Peer ${id} removed successfully` });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/subscriptions
app.get('/api/admin/subscriptions', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) return c.json({ subscriptions: [] });
    const res = await c.env.DB.prepare("SELECT token, user_id, server_id, client_address, mode, is_active, created_at, expires_at FROM subscriptions ORDER BY created_at DESC LIMIT 100").all();
    return c.json({ success: true, subscriptions: res.results || [] });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/cidrs
app.get('/api/admin/cidrs', requireAdminAuth, async (c) => {
  try {
    let cidrs = IRAN_CIDRS;
    if (c.env && c.env.DB) {
      const rec = await c.env.DB.prepare("SELECT value FROM configs WHERE key = 'iran_cidrs'").first();
      if (rec && rec.value) {
        cidrs = JSON.parse(rec.value);
      }
    }
    return c.json({ success: true, cidrs });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/admin/cidrs
app.post('/api/admin/cidrs', requireAdminAuth, async (c) => {
  try {
    const { cidrs } = await c.req.json();
    if (!Array.isArray(cidrs)) {
      return c.json({ success: false, error: "CIDRs must be an array of strings" }, 400);
    }
    if (c.env && c.env.DB) {
      await c.env.DB.prepare(`
        INSERT INTO configs (key, value, updated_at) 
        VALUES ('iran_cidrs', ?, ?)
        ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = ?
      `).bind(JSON.stringify(cidrs), Date.now(), JSON.stringify(cidrs), Date.now()).run();
    }
    return c.json({ success: true, message: "Iran CIDRs updated successfully" });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/logs
app.get('/api/admin/logs', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) return c.json({ logs: [] });
    const res = await c.env.DB.prepare("SELECT * FROM logs ORDER BY created_at DESC LIMIT 50").all();
    return c.json({ success: true, logs: res.results || [] });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export default app;
