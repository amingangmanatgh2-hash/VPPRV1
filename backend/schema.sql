-- VPPRV1 D1 Initial Schema

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
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at INTEGER NOT NULL
);

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
);

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
