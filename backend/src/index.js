// VPPRV1 Cloudflare Workers Main Backend Application for Xray Core & VLESS
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { generateUUID, generateShortId, hashPassword, verifyPassword, createSessionToken, verifySessionToken, timingSafeEqual } from './crypto.js';
import { ensureSeedData } from './seed.js';
import { buildVlessUri, buildXrayClientJson, buildXrayServerInboundConfig } from './xray-config.js';
import { checkRateLimit } from './rate-limit.js';
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
  allowHeaders: ['Content-Type', 'Authorization', 'X-Node-Id', 'X-Server-Id']
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
  let nodes = [];
  if (c.env && c.env.DB) {
    const res = await c.env.DB.prepare("SELECT * FROM nodes ORDER BY country ASC").all();
    nodes = res.results || [];
  }
  return c.html(renderServersPage(nodes));
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

// GET /api/servers (Returns Xray VPS nodes)
app.get('/api/servers', async (c) => {
  try {
    if (!c.env || !c.env.DB) {
      return c.json({ success: true, count: 0, servers: [] });
    }
    const res = await c.env.DB.prepare(`
      SELECT id, name, country, flag, provider, host, port, ws_port, protocol, transport, security,
             reality_public_key, reality_short_id, reality_server_name, ws_path,
             status, load, latency, users_count, agent_token, last_heartbeat
      FROM nodes ORDER BY country ASC
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
    const nodesRes = await c.env.DB.prepare("SELECT * FROM nodes").all();
    const nodes = nodesRes.results || [];
    const onlineNodes = nodes.filter(n => n.status === 'online');
    const totalUsers = nodes.reduce((acc, n) => acc + (n.users_count || 0), 0);
    const avgLatency = onlineNodes.length > 0 
      ? Math.round(onlineNodes.reduce((acc, n) => acc + n.latency, 0) / onlineNodes.length) 
      : 0;

    return c.json({
      success: true,
      total_count: nodes.length,
      online_count: onlineNodes.length,
      offline_count: nodes.length - onlineNodes.length,
      total_active_users: totalUsers,
      average_latency_ms: avgLatency,
      timestamp: Date.now(),
      servers: nodes.map(n => ({
        id: n.id,
        name: n.name,
        country: n.country,
        flag: n.flag,
        provider: n.provider,
        protocol: n.protocol,
        security: n.security,
        status: n.status,
        latency: n.latency,
        load: n.load,
        users_count: n.users_count,
        last_heartbeat: n.last_heartbeat
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
    engine: "Xray Core & VLESS",
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
        framework: "CLI Xray Core Integration",
        min_os: "Linux Kernel 5.4+",
        download_url: "/api/downloads/VPPRV1-Linux.tar.gz"
      }
    },
    changelog: [
      "معماری کامل مبتنی بر Xray Core و VLESS Reality",
      "همگام‌سازی بلادرنگ کاربران، ترافیک و انقضا با سرورهای Hetzner، Vultr و OVH",
      "پشتیبانی از فرمت‌های استاندارد vless:// و JSON کلاینت",
      "سیستم مدیریت حجم مصرفی و کنترل هوشمند انقضا"
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
  const githubReleaseUrl = `https://github.com/amingangmanatgh2-hash/VPPRV1/releases/download/v1.0.0/${filename}`;
  return c.redirect(githubReleaseUrl, 302);
});

// -------------------------------------------------------------
// PROVISIONING & SUBSCRIPTION (VLESS Standard)
// -------------------------------------------------------------

// POST /api/v1/provision (Generates a valid VLESS subscription without user input)
app.post('/api/v1/provision', async (c) => {
  const clientIP = getClientIP(c);

  if (c.env && c.env.DB) {
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
    const userUUID = generateUUID();
    const token = "sub_" + crypto.randomUUID().replace(/-/g, "");
    const username = "user_" + userUUID.substring(0, 8);
    const now = Date.now();
    const expiresAt = now + (30 * 24 * 60 * 60 * 1000); // 30 days
    const trafficLimit = 50 * 1024 * 1024 * 1024; // 50 GB default quota

    let selectedNode = null;
    if (c.env && c.env.DB) {
      const onlineNode = await c.env.DB.prepare("SELECT * FROM nodes WHERE status = 'online' ORDER BY load ASC, latency ASC LIMIT 1").first();
      if (onlineNode) {
        selectedNode = onlineNode;
      } else {
        selectedNode = await c.env.DB.prepare("SELECT * FROM nodes LIMIT 1").first();
      }
    }

    const nodeId = selectedNode ? selectedNode.id : "hetzner-de-1";
    const nodeName = selectedNode ? selectedNode.name : "آلمان - فرانکفورت (Hetzner)";
    const nodeHost = selectedNode ? selectedNode.host : "de1.vpprv1.net";
    const nodePort = selectedNode ? selectedNode.port : 443;
    const nodePubkey = selectedNode ? selectedNode.reality_public_key : "kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P";
    const nodeShortId = selectedNode ? selectedNode.reality_short_id : "a1b2c3d4";
    const nodeSni = selectedNode ? selectedNode.reality_server_name : "www.microsoft.com";

    if (c.env && c.env.DB) {
      // Save User
      await c.env.DB.prepare(`
        INSERT INTO users (id, username, email, uuid, status, traffic_limit_bytes, traffic_used_bytes, created_at, expires_at)
        VALUES (?, ?, ?, ?, 'active', ?, 0, ?, ?)
      `).bind(userUUID, username, `${username}@vpprv1.net`, userUUID, trafficLimit, now, expiresAt).run();

      // Save Subscription
      await c.env.DB.prepare(`
        INSERT INTO subscriptions (token, user_id, created_ip, node_id, protocol, transport, security, is_active, created_at, expires_at)
        VALUES (?, ?, ?, ?, 'vless', 'tcp', 'reality', 1, ?, ?)
      `).bind(token, userUUID, clientIP, nodeId, now, expiresAt).run();

      // Update node users_count
      await c.env.DB.prepare("UPDATE nodes SET users_count = users_count + 1 WHERE id = ?").bind(nodeId).run();
    }

    const baseUrl = new URL(c.req.url).origin;

    const vlessUri = buildVlessUri({
      uuid: userUUID,
      host: nodeHost,
      port: nodePort,
      name: nodeName,
      transport: "tcp",
      security: "reality",
      realityPublicKey: nodePubkey,
      realityShortId: nodeShortId,
      realitySni: nodeSni
    });

    return c.json({
      success: true,
      message: "اشتراک VLESS با موفقیت ایجاد شد.",
      token: token,
      uuid: userUUID,
      vless_uri: vlessUri,
      subscription_url: `${baseUrl}/api/v1/sub/${token}`,
      node_id: nodeId,
      node_name: nodeName,
      traffic_limit_bytes: trafficLimit,
      created_at: now,
      expires_at: expiresAt
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/v1/sub/:token (Returns standard VLESS URI or JSON config)
app.get('/api/v1/sub/:token', async (c) => {
  const token = c.req.param('token');
  const format = c.req.query('format') || 'vless'; // 'vless' or 'json'

  try {
    let sub = null;
    let user = null;
    let node = null;

    if (c.env && c.env.DB) {
      sub = await c.env.DB.prepare("SELECT * FROM subscriptions WHERE token = ?").bind(token).first();
      if (!sub) {
        return c.text("# Error: Subscription token not found or expired.", 404);
      }

      user = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(sub.user_id).first();
      if (!user || user.status !== 'active' || (user.expires_at > 0 && Date.now() > user.expires_at)) {
        return c.text("# Error: User account is inactive or expired.", 403);
      }

      node = await c.env.DB.prepare("SELECT * FROM nodes WHERE id = ?").bind(sub.node_id).first();
    } else {
      user = { uuid: generateUUID(), username: "guest" };
      node = {
        name: "آلمان - فرانکفورت (Hetzner)",
        host: "de1.vpprv1.net",
        port: 443,
        reality_public_key: "kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P",
        reality_short_id: "a1b2c3d4",
        reality_server_name: "www.microsoft.com"
      };
    }

    const host = node ? node.host : "de1.vpprv1.net";
    const port = node ? node.port : 443;
    const nodeName = node ? node.name : "VPPRV1-Node";

    if (format === 'json') {
      const clientJson = buildXrayClientJson({
        uuid: user.uuid,
        host: host,
        port: port,
        transport: "tcp",
        security: "reality",
        realityPublicKey: node ? node.reality_public_key : "",
        realityShortId: node ? node.reality_short_id : "",
        realitySni: node ? node.reality_server_name : "www.microsoft.com"
      });
      return c.json(clientJson);
    }

    const vlessUri = buildVlessUri({
      uuid: user.uuid,
      host: host,
      port: port,
      name: nodeName,
      transport: "tcp",
      security: "reality",
      realityPublicKey: node ? node.reality_public_key : "",
      realityShortId: node ? node.reality_short_id : "",
      realitySni: node ? node.reality_server_name : "www.microsoft.com"
    });

    c.header('Content-Type', 'text/plain; charset=utf-8');
    return c.text(vlessUri);
  } catch (err) {
    return c.text(`# Error: ${err.message}`, 500);
  }
});

// -------------------------------------------------------------
// NODE AGENT SYNC & REPORT APIS (Xray Core)
// -------------------------------------------------------------

async function authenticateAgent(c) {
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const nodeId = c.req.header('X-Node-Id') || c.req.header('X-Server-Id') || c.req.query('node_id') || c.req.query('server_id');

  if (!token || !c.env || !c.env.DB) return null;

  let node;
  if (nodeId) {
    node = await c.env.DB.prepare("SELECT * FROM nodes WHERE id = ?").bind(nodeId).first();
  } else {
    node = await c.env.DB.prepare("SELECT * FROM nodes WHERE agent_token = ?").bind(token).first();
  }

  if (node && timingSafeEqual(node.agent_token, token)) {
    return node;
  }
  return null;
}

// POST /api/agent/sync (Node Agent requests active Xray users and full config)
app.post('/api/agent/sync', async (c) => {
  try {
    const node = await authenticateAgent(c);
    if (!node) {
      return c.json({ success: false, error: "Unauthorized Node Agent Token" }, 401);
    }

    // Get all active, non-expired users
    const now = Date.now();
    const usersRes = await c.env.DB.prepare(`
      SELECT id, username, email, uuid, traffic_limit_bytes, traffic_used_bytes 
      FROM users 
      WHERE status = 'active' AND (expires_at = 0 OR expires_at > ?)
    `).bind(now).all();

    const activeUsers = usersRes.results || [];

    // Build complete Xray server configuration for this node
    const xrayServerConfig = buildXrayServerInboundConfig({
      node: node,
      activeUsers: activeUsers
    });

    return c.json({
      success: true,
      node_id: node.id,
      timestamp: Date.now(),
      users_count: activeUsers.length,
      users: activeUsers,
      xray_config: xrayServerConfig
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/agent/report (Node Agent reports telemetry, load, traffic usage)
app.post('/api/agent/report', async (c) => {
  try {
    const node = await authenticateAgent(c);
    if (!node) {
      return c.json({ success: false, error: "Unauthorized Node Agent Token" }, 401);
    }

    const body = await c.req.json();
    const load = typeof body.load === 'number' ? Math.round(body.load) : 0;
    const latency = typeof body.latency === 'number' ? Math.round(body.latency) : 0;
    const usersCount = typeof body.users_count === 'number' ? body.users_count : 0;
    const userTrafficMap = body.user_traffic || {}; // { "uuid": bytes }
    const now = Date.now();

    // Update node status
    await c.env.DB.prepare(`
      UPDATE nodes 
      SET status = 'online', load = ?, latency = ?, users_count = ?, last_heartbeat = ? 
      WHERE id = ?
    `).bind(load, latency, usersCount, now, node.id).run();

    // Update user traffic if reported
    for (const [uuid, bytes] of Object.entries(userTrafficMap)) {
      if (typeof bytes === 'number' && bytes > 0) {
        await c.env.DB.prepare(`
          UPDATE users 
          SET traffic_used_bytes = traffic_used_bytes + ? 
          WHERE uuid = ?
        `).bind(bytes, uuid).run();
      }
    }

    return c.json({
      success: true,
      message: "Xray heartbeat & traffic report recorded successfully",
      node_id: node.id,
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

    await c.env.DB.prepare("INSERT INTO logs (level, message, ip, created_at) VALUES ('info', ?, ?, ?)")
      .bind(`Admin login successful: ${username}`, clientIP, Date.now()).run();

    return c.json({ success: true, token });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

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
      return c.json({ totalNodes: 0, onlineNodes: 0, totalUsers: 0, activeUsers: 0, nodes: [] });
    }

    const nodesRes = await c.env.DB.prepare("SELECT * FROM nodes").all();
    const usersCount = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users").first();
    const activeUsersCount = await c.env.DB.prepare("SELECT COUNT(*) as count FROM users WHERE status = 'active'").first();

    const nodes = nodesRes.results || [];
    const onlineCount = nodes.filter(n => n.status === 'online').length;

    return c.json({
      success: true,
      totalNodes: nodes.length,
      onlineNodes: onlineCount,
      totalUsers: usersCount ? usersCount.count : 0,
      activeUsers: activeUsersCount ? activeUsersCount.count : 0,
      nodes: nodes
    });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/users
app.get('/api/admin/users', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) return c.json({ users: [] });
    const res = await c.env.DB.prepare("SELECT * FROM users ORDER BY created_at DESC LIMIT 100").all();
    return c.json({ success: true, users: res.results || [] });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/admin/users/:id/status (Enable/Disable User)
app.post('/api/admin/users/:id/status', requireAdminAuth, async (c) => {
  const userId = c.req.param('id');
  try {
    const { status } = await c.req.json();
    if (c.env && c.env.DB) {
      await c.env.DB.prepare("UPDATE users SET status = ? WHERE id = ?").bind(status, userId).run();
    }
    return c.json({ success: true, message: `User ${userId} status updated to ${status}` });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/admin/subscriptions
app.get('/api/admin/subscriptions', requireAdminAuth, async (c) => {
  try {
    if (!c.env || !c.env.DB) return c.json({ subscriptions: [] });
    const res = await c.env.DB.prepare("SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 100").all();
    return c.json({ success: true, subscriptions: res.results || [] });
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
