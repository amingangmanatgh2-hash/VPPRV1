// VPPRV1 Initial Database Seed & Schema Auto-initializer
// Automatically initializes tables and default 11 servers when database is empty

import { generateWireGuardKeyPair } from './crypto.js';

export const INITIAL_SERVERS = [
  {
    id: "us-east-1",
    name: "آمریکا ۱ (نیویورک)",
    country: "USA",
    flag: "🇺🇸",
    host: "us1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.10"
  },
  {
    id: "us-west-1",
    name: "آمریکا ۲ (لس‌آنجلس)",
    country: "USA",
    flag: "🇺🇸",
    host: "us2.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.11"
  },
  {
    id: "de-fra-1",
    name: "آلمان (فرانکفورت)",
    country: "Germany",
    flag: "🇩🇪",
    host: "de1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.20"
  },
  {
    id: "nl-ams-1",
    name: "هلند (آمستردام)",
    country: "Netherlands",
    flag: "🇳🇱",
    host: "nl1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.30"
  },
  {
    id: "uk-lon-1",
    name: "انگلیس (لندن)",
    country: "UK",
    flag: "🇬🇧",
    host: "uk1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.40"
  },
  {
    id: "fr-par-1",
    name: "فرانسه (پاریس)",
    country: "France",
    flag: "🇫🇷",
    host: "fr1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.50"
  },
  {
    id: "tr-ist-1",
    name: "ترکیه (استانبول)",
    country: "Turkey",
    flag: "🇹🇷",
    host: "tr1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.60"
  },
  {
    id: "ae-dxb-1",
    name: "امارات (دبی)",
    country: "UAE",
    flag: "🇦🇪",
    host: "ae1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.70"
  },
  {
    id: "sg-sin-1",
    name: "سنگاپور",
    country: "Singapore",
    flag: "🇸🇬",
    host: "sg1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.80"
  },
  {
    id: "jp-tyo-1",
    name: "ژاپن (توکیو)",
    country: "Japan",
    flag: "🇯🇵",
    host: "jp1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.90"
  },
  {
    id: "ir-thr-1",
    name: "ایران داخلی (تهران)",
    country: "Iran",
    flag: "🇮🇷",
    host: "ir1.vpprv1.net",
    port: 443,
    endpoint_ip: "198.51.100.100"
  }
];

export async function ensureSeedData(db) {
  try {
    // 1. Create tables if they do not exist
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS servers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        flag TEXT NOT NULL,
        host TEXT NOT NULL,
        port INTEGER NOT NULL DEFAULT 443,
        public_key TEXT NOT NULL,
        preshared_key TEXT,
        endpoint_ip TEXT,
        status TEXT NOT NULL DEFAULT 'offline',
        load INTEGER NOT NULL DEFAULT 0,
        latency INTEGER NOT NULL DEFAULT 0,
        peers_count INTEGER NOT NULL DEFAULT 0,
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
        role TEXT NOT NULL DEFAULT 'user',
        created_at INTEGER NOT NULL
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        token TEXT PRIMARY KEY,
        user_id TEXT,
        created_ip TEXT,
        server_id TEXT,
        client_private_key TEXT NOT NULL,
        client_public_key TEXT NOT NULL,
        client_address TEXT NOT NULL,
        preshared_key TEXT,
        mode TEXT NOT NULL DEFAULT 'full',
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (server_id) REFERENCES servers(id)
      )
    `).run();

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS peers (
        id TEXT PRIMARY KEY,
        server_id TEXT NOT NULL,
        subscription_token TEXT NOT NULL,
        public_key TEXT NOT NULL,
        preshared_key TEXT,
        allowed_ips TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at INTEGER NOT NULL,
        FOREIGN KEY (server_id) REFERENCES servers(id),
        FOREIGN KEY (subscription_token) REFERENCES subscriptions(token)
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

    // 2. Check if servers table has any rows
    const countResult = await db.prepare("SELECT COUNT(*) as count FROM servers").first();
    if (countResult && countResult.count === 0) {
      console.log("Seeding initial servers database...");
      const now = Date.now();
      for (const s of INITIAL_SERVERS) {
        const kp = generateWireGuardKeyPair();
        const agentToken = "node_" + crypto.randomUUID().replace(/-/g, "");
        await db.prepare(`
          INSERT INTO servers (id, name, country, flag, host, port, public_key, endpoint_ip, status, load, latency, peers_count, agent_token, last_heartbeat, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'offline', 0, 0, 0, ?, 0, ?)
        `).bind(s.id, s.name, s.country, s.flag, s.host, s.port, kp.publicKey, s.endpoint_ip, agentToken, now).run();
      }
    }

    // 3. Seed default Iran CIDR config if not present
    const iranConfig = await db.prepare("SELECT value FROM configs WHERE key = 'iran_cidrs'").first();
    if (!iranConfig) {
      const { IRAN_CIDRS } = await import('./iran-cidrs.js');
      await db.prepare("INSERT INTO configs (key, value, updated_at) VALUES ('iran_cidrs', ?, ?)")
        .bind(JSON.stringify(IRAN_CIDRS), Date.now())
        .run();
    }

    // 4. Seed default admin if admin_auth is empty
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
