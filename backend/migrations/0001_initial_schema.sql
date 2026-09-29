-- Migration 0001: VPPRV1 Xray Core Schema
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
);

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
);

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
);

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
);

CREATE TABLE IF NOT EXISTS configs (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  ip TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_auth (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  iterations INTEGER NOT NULL DEFAULT 100000,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
  ip_action TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset_at INTEGER NOT NULL
);
