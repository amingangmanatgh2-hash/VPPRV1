// VPPRV1 Initial Database Seed for Xray Core Nodes
// Seeds default 11 VPS nodes on Hetzner, Vultr, OVH
// Status starts as 'offline' until real Xray Node Agent connects and syncs

import { generateShortId } from './crypto.js';

export const INITIAL_NODES = [
  {
    id: "hetzner-de-1",
    name: "آلمان - فرانکفورت (Hetzner)",
    country: "Germany",
    flag: "🇩🇪",
    provider: "Hetzner Cloud",
    host: "de1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P",
    reality_private_key: "eP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qk",
    reality_short_id: "a1b2c3d4",
    reality_server_name: "www.microsoft.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "hetzner-fi-1",
    name: "فنلاند - هلسینکی (Hetzner)",
    country: "Finland",
    flag: "🇫🇮",
    provider: "Hetzner Cloud",
    host: "fi1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "mN8bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2L",
    reality_private_key: "xP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qm",
    reality_short_id: "b2c3d4e5",
    reality_server_name: "www.yahoo.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-us-1",
    name: "آمریکا - نیویورک (Vultr)",
    country: "USA",
    flag: "🇺🇸",
    provider: "Vultr",
    host: "us1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "vX9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2V",
    reality_private_key: "zP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qv",
    reality_short_id: "c3d4e5f6",
    reality_server_name: "gateway.icloud.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-us-2",
    name: "آمریکا - لس‌آنجلس (Vultr)",
    country: "USA",
    flag: "🇺🇸",
    provider: "Vultr",
    host: "us2.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "wZ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2W",
    reality_private_key: "yP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qw",
    reality_short_id: "d4e5f6a7",
    reality_server_name: "www.apple.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "ovh-fr-1",
    name: "فرانسه - پاریس (OVH)",
    country: "France",
    flag: "🇫🇷",
    provider: "OVHcloud",
    host: "fr1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "oV9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2O",
    reality_private_key: "oP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qo",
    reality_short_id: "e5f6a7b8",
    reality_server_name: "www.amazon.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "ovh-uk-1",
    name: "انگلیس - لندن (OVH)",
    country: "UK",
    flag: "🇬🇧",
    provider: "OVHcloud",
    host: "uk1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "uK9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2U",
    reality_private_key: "uP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qu",
    reality_short_id: "f6a7b8c9",
    reality_server_name: "www.speedtest.net",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "hetzner-nl-1",
    name: "هلند - آمستردام (Hetzner)",
    country: "Netherlands",
    flag: "🇳🇱",
    provider: "Hetzner Cloud",
    host: "nl1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "nL9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2N",
    reality_private_key: "nP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qn",
    reality_short_id: "a7b8c9d0",
    reality_server_name: "www.cloudflare.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-sg-1",
    name: "سنگاپور (Vultr)",
    country: "Singapore",
    flag: "🇸🇬",
    provider: "Vultr",
    host: "sg1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "sG9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2S",
    reality_private_key: "sP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qs",
    reality_short_id: "b8c9d0e1",
    reality_server_name: "www.google.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-jp-1",
    name: "ژاپن - توکیو (Vultr)",
    country: "Japan",
    flag: "🇯🇵",
    provider: "Vultr",
    host: "jp1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "jP9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2J",
    reality_private_key: "jP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qj",
    reality_short_id: "c9d0e1f2",
    reality_server_name: "www.samsung.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-tr-1",
    name: "ترکیه - استانبول (Vultr)",
    country: "Turkey",
    flag: "🇹🇷",
    provider: "Vultr",
    host: "tr1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "tR9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2T",
    reality_private_key: "tP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qt",
    reality_short_id: "d0e1f2a3",
    reality_server_name: "www.bing.com",
    ws_path: "/vpprv1-ws"
  },
  {
    id: "vultr-ae-1",
    name: "امارات - دبی (Vultr)",
    country: "UAE",
    flag: "🇦🇪",
    provider: "Vultr",
    host: "ae1.vpprv1.net",
    port: 443,
    ws_port: 80,
    protocol: "vless",
    transport: "tcp",
    security: "reality",
    reality_public_key: "aE9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2A",
    reality_private_key: "aP1q2R3s4T5u6V7w8X9Y0Z1a2b3c4v5A6y7z8X1w9Qa",
    reality_short_id: "e1f2a3b4",
    reality_server_name: "www.oracle.com",
    ws_path: "/vpprv1-ws"
  }
];

export async function ensureSeedData(db) {
  try {
    // 1. Create tables if they do not exist
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS nodes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        flag TEXT NOT NULL,
        provider TEXT NOT NULL DEFAULT 'Hetzner',
        host TEXT NOT NULL,
        port INTEGER NOT NULL DEFAULT 443,
        ws_port INTEGER NOT NULL DEFAULT 80,
        protocol TEXT NOT NULL DEFAULT 'vless',
        transport TEXT NOT NULL DEFAULT 'tcp',
        security TEXT NOT NULL DEFAULT 'reality',
        reality_public_key TEXT,
        reality_private_key TEXT,
        reality_short_id TEXT,
        reality_server_name TEXT,
        ws_path TEXT DEFAULT '/vpprv1-ws',
        status TEXT NOT NULL DEFAULT 'offline',
        load INTEGER NOT NULL DEFAULT 0,
        latency INTEGER NOT NULL DEFAULT 0,
        users_count INTEGER NOT NULL DEFAULT 0,
        agent_token TEXT NOT NULL,
        last_heartbeat INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT,
        uuid TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'active',
        traffic_limit_bytes INTEGER NOT NULL DEFAULT 0,
        traffic_used_bytes INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        created_ip TEXT,
        node_id TEXT,
        protocol TEXT NOT NULL DEFAULT 'vless',
        transport TEXT NOT NULL DEFAULT 'tcp',
        security TEXT NOT NULL DEFAULT 'reality',
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (node_id) REFERENCES nodes(id)
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS inbounds (
        id TEXT PRIMARY KEY,
        node_id TEXT NOT NULL,
        tag TEXT NOT NULL,
        protocol TEXT NOT NULL DEFAULT 'vless',
        port INTEGER NOT NULL DEFAULT 443,
        network TEXT NOT NULL DEFAULT 'tcp',
        security TEXT NOT NULL DEFAULT 'reality',
        server_name TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (node_id) REFERENCES nodes(id)
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS configs (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        ip TEXT,
        created_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS admin_auth (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        iterations INTEGER NOT NULL DEFAULT 100000,
        created_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        ip_action TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        reset_at INTEGER NOT NULL
      )
    `).run();

    // 2. Check if nodes table has any rows
    const countResult = await db.prepare("SELECT COUNT(*) as count FROM nodes").first();
    if (countResult && countResult.count === 0) {
      console.log("Seeding initial Xray VPS nodes database...");
      const now = Date.now();
      for (const n of INITIAL_NODES) {
        const agentToken = "node_" + crypto.randomUUID().replace(/-/g, "");
        await db.prepare(`
          INSERT INTO nodes (
            id, name, country, flag, provider, host, port, ws_port, protocol, transport, security,
            reality_public_key, reality_private_key, reality_short_id, reality_server_name, ws_path,
            status, load, latency, users_count, agent_token, last_heartbeat, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'offline', 0, 0, 0, ?, 0, ?)
        `).bind(
          n.id, n.name, n.country, n.flag, n.provider, n.host, n.port, n.ws_port, n.protocol, n.transport, n.security,
          n.reality_public_key, n.reality_private_key, n.reality_short_id, n.reality_server_name, n.ws_path,
          agentToken, now
        ).run();
      }
    }

    // 3. Seed default admin if admin_auth is empty
    const adminCount = await db.prepare("SELECT COUNT(*) as count FROM admin_auth").first();
    if (adminCount && adminCount.count === 0) {
      const { hashPassword } = await import('./crypto.js');
      const hashed = await hashPassword("Admin@VPPRV1#2026");
      await db.prepare(`
        INSERT INTO admin_auth (id, username, password_hash, salt, iterations, created_at)
        VALUES ('admin-01', 'admin', ?, ?, 100000, ?)
      `).bind(hashed.hash, hashed.salt, Date.now()).run();
    }
  } catch (err) {
    console.error("Seed check error:", err);
  }
}
