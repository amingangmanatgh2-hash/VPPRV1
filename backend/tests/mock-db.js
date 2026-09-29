// Mock D1 Database implementation for Node.js unit tests
export class MockD1 {
  constructor() {
    this.tables = {
      servers: [],
      users: [],
      subscriptions: [],
      peers: [],
      configs: [],
      logs: [],
      admin_auth: [],
      rate_limits: []
    };
  }

  prepare(query) {
    const self = this;
    const stmt = {
      params: [],
      bind(...params) {
        this.params = params;
        return this;
      },
      async first() {
        const res = await this.all();
        return res.results && res.results.length > 0 ? res.results[0] : null;
      },
      async all() {
        const q = query.trim().replace(/\s+/g, ' ');
        const params = this.params || [];

        if (q.includes("SELECT COUNT(*) as count FROM servers")) {
          return { results: [{ count: self.tables.servers.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM admin_auth")) {
          return { results: [{ count: self.tables.admin_auth.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM subscriptions")) {
          return { results: [{ count: self.tables.subscriptions.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM peers")) {
          return { results: [{ count: self.tables.peers.length }] };
        }
        if (q.includes("SELECT * FROM servers WHERE id = ?")) {
          const s = self.tables.servers.find(x => x.id === params[0]);
          return { results: s ? [s] : [] };
        }
        if (q.includes("SELECT * FROM servers WHERE agent_token = ?")) {
          const s = self.tables.servers.find(x => x.agent_token === params[0]);
          return { results: s ? [s] : [] };
        }
        if (q.includes("SELECT * FROM servers WHERE status = 'online'")) {
          const s = self.tables.servers.filter(x => x.status === 'online');
          return { results: s };
        }
        if (q.includes("SELECT * FROM servers LIMIT 1")) {
          return { results: self.tables.servers.slice(0, 1) };
        }
        if (q.includes("SELECT id, name, country, flag, host, port, public_key, status, load, latency, peers_count, agent_token, last_heartbeat FROM servers") || q.includes("SELECT * FROM servers")) {
          return { results: self.tables.servers };
        }
        if (q.includes("SELECT * FROM subscriptions WHERE token = ?")) {
          const sub = self.tables.subscriptions.find(x => x.token === params[0]);
          return { results: sub ? [sub] : [] };
        }
        if (q.includes("SELECT * FROM admin_auth WHERE username = ?")) {
          const u = self.tables.admin_auth.find(x => x.username === params[0]);
          return { results: u ? [u] : [] };
        }
        if (q.includes("SELECT value FROM configs WHERE key = 'iran_cidrs'")) {
          const c = self.tables.configs.find(x => x.key === 'iran_cidrs');
          return { results: c ? [c] : [] };
        }
        if (q.includes("SELECT count, reset_at FROM rate_limits WHERE ip_action = ?")) {
          const r = self.tables.rate_limits.find(x => x.ip_action === params[0]);
          return { results: r ? [r] : [] };
        }
        if (q.includes("SELECT id, public_key, preshared_key, allowed_ips, status FROM peers WHERE server_id = ?")) {
          const p = self.tables.peers.filter(x => x.server_id === params[0] && x.status === 'active');
          return { results: p };
        }
        if (q.includes("SELECT * FROM peers")) {
          return { results: self.tables.peers };
        }
        if (q.includes("SELECT * FROM logs")) {
          return { results: self.tables.logs };
        }
        return { results: [] };
      },
      async run() {
        const q = query.trim().replace(/\s+/g, ' ');
        const params = this.params || [];

        if (q.startsWith("INSERT INTO servers")) {
          self.tables.servers.push({
            id: params[0],
            name: params[1],
            country: params[2],
            flag: params[3],
            host: params[4],
            port: params[5],
            public_key: params[6],
            endpoint_ip: params[7],
            status: 'offline',
            load: 0,
            latency: 0,
            peers_count: 0,
            agent_token: params[8],
            last_heartbeat: 0,
            created_at: params[9]
          });
        }
        if (q.startsWith("INSERT INTO admin_auth")) {
          self.tables.admin_auth.push({
            id: 'admin-01',
            username: 'admin',
            password_hash: params[0],
            salt: params[1],
            iterations: 100000,
            created_at: params[2]
          });
        }
        if (q.startsWith("INSERT INTO configs")) {
          self.tables.configs.push({
            key: 'iran_cidrs',
            value: params[0],
            updated_at: params[1]
          });
        }
        if (q.startsWith("INSERT INTO subscriptions")) {
          self.tables.subscriptions.push({
            token: params[0],
            user_id: 'guest',
            created_ip: params[1],
            server_id: params[2],
            client_private_key: params[3],
            client_public_key: params[4],
            client_address: params[5],
            preshared_key: params[6],
            mode: 'full',
            is_active: 1,
            created_at: params[7],
            expires_at: params[8]
          });
        }
        if (q.startsWith("INSERT INTO peers")) {
          self.tables.peers.push({
            id: params[0],
            server_id: params[1],
            subscription_token: params[2],
            public_key: params[3],
            preshared_key: params[4],
            allowed_ips: params[5],
            status: 'active',
            created_at: params[6]
          });
        }
        if (q.startsWith("UPDATE servers SET status = 'online'")) {
          const s = self.tables.servers.find(x => x.id === params[4]);
          if (s) {
            s.status = 'online';
            s.load = params[0];
            s.latency = params[1];
            s.peers_count = params[2];
            s.last_heartbeat = params[3];
          }
        }
        if (q.startsWith("UPDATE servers SET peers_count = peers_count + 1")) {
          const s = self.tables.servers.find(x => x.id === params[0]);
          if (s) s.peers_count += 1;
        }
        if (q.startsWith("DELETE FROM peers WHERE id = ?")) {
          self.tables.peers = self.tables.peers.filter(x => x.id !== params[0]);
        }
        if (q.startsWith("INSERT INTO logs")) {
          self.tables.logs.push({
            id: self.tables.logs.length + 1,
            level: 'info',
            message: params[0],
            ip: params[1],
            created_at: params[2]
          });
        }
        return { success: true };
      }
    };
    return stmt;
  }
}
