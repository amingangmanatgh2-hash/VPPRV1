// Mock D1 Database implementation for Node.js unit tests (Xray Core)
export class MockD1 {
  constructor() {
    this.tables = {
      nodes: [],
      users: [],
      subscriptions: [],
      inbounds: [],
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

        if (q.includes("SELECT COUNT(*) as count FROM nodes")) {
          return { results: [{ count: self.tables.nodes.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM users WHERE status = 'active'")) {
          const active = self.tables.users.filter(u => u.status === 'active');
          return { results: [{ count: active.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM users")) {
          return { results: [{ count: self.tables.users.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM admin_auth")) {
          return { results: [{ count: self.tables.admin_auth.length }] };
        }
        if (q.includes("SELECT COUNT(*) as count FROM subscriptions")) {
          return { results: [{ count: self.tables.subscriptions.length }] };
        }
        if (q.includes("SELECT * FROM nodes WHERE id = ?")) {
          const n = self.tables.nodes.find(x => x.id === params[0]);
          return { results: n ? [n] : [] };
        }
        if (q.includes("SELECT * FROM nodes WHERE agent_token = ?")) {
          const n = self.tables.nodes.find(x => x.agent_token === params[0]);
          return { results: n ? [n] : [] };
        }
        if (q.includes("SELECT * FROM nodes WHERE status = 'online'")) {
          const n = self.tables.nodes.filter(x => x.status === 'online');
          return { results: n };
        }
        if (q.includes("SELECT * FROM nodes LIMIT 1")) {
          return { results: self.tables.nodes.slice(0, 1) };
        }
        if (q.includes("SELECT") && q.includes("FROM nodes")) {
          return { results: self.tables.nodes };
        }
        if (q.includes("SELECT * FROM subscriptions WHERE token = ?")) {
          const sub = self.tables.subscriptions.find(x => x.token === params[0]);
          return { results: sub ? [sub] : [] };
        }
        if (q.includes("SELECT * FROM users WHERE id = ?")) {
          const u = self.tables.users.find(x => x.id === params[0]);
          return { results: u ? [u] : [] };
        }
        if (q.includes("SELECT") && q.includes("FROM users WHERE status = 'active'")) {
          const active = self.tables.users.filter(u => u.status === 'active');
          return { results: active };
        }
        if (q.includes("SELECT * FROM users")) {
          return { results: self.tables.users };
        }
        if (q.includes("SELECT * FROM admin_auth WHERE username = ?")) {
          const u = self.tables.admin_auth.find(x => x.username === params[0]);
          return { results: u ? [u] : [] };
        }
        if (q.includes("SELECT count, reset_at FROM rate_limits WHERE ip_action = ?")) {
          const r = self.tables.rate_limits.find(x => x.ip_action === params[0]);
          return { results: r ? [r] : [] };
        }
        if (q.includes("SELECT * FROM subscriptions")) {
          return { results: self.tables.subscriptions };
        }
        if (q.includes("SELECT * FROM logs")) {
          return { results: self.tables.logs };
        }
        return { results: [] };
      },
      async run() {
        const q = query.trim().replace(/\s+/g, ' ');
        const params = this.params || [];

        if (q.startsWith("INSERT INTO nodes")) {
          self.tables.nodes.push({
            id: params[0],
            name: params[1],
            country: params[2],
            flag: params[3],
            provider: params[4],
            host: params[5],
            port: params[6],
            ws_port: params[7],
            protocol: params[8],
            transport: params[9],
            security: params[10],
            reality_public_key: params[11],
            reality_private_key: params[12],
            reality_short_id: params[13],
            reality_server_name: params[14],
            ws_path: params[15],
            status: 'offline',
            load: 0,
            latency: 0,
            users_count: 0,
            agent_token: params[16],
            last_heartbeat: 0,
            created_at: params[17]
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
        if (q.startsWith("INSERT INTO users")) {
          self.tables.users.push({
            id: params[0],
            username: params[1],
            email: params[2],
            uuid: params[3],
            status: 'active',
            traffic_limit_bytes: params[4],
            traffic_used_bytes: 0,
            created_at: params[5],
            expires_at: params[6]
          });
        }
        if (q.startsWith("INSERT INTO subscriptions")) {
          self.tables.subscriptions.push({
            token: params[0],
            user_id: params[1],
            created_ip: params[2],
            node_id: params[3],
            protocol: 'vless',
            transport: 'tcp',
            security: 'reality',
            is_active: 1,
            created_at: params[4],
            expires_at: params[5]
          });
        }
        if (q.startsWith("UPDATE nodes SET status = 'online'")) {
          const n = self.tables.nodes.find(x => x.id === params[4]);
          if (n) {
            n.status = 'online';
            n.load = params[0];
            n.latency = params[1];
            n.users_count = params[2];
            n.last_heartbeat = params[3];
          }
        }
        if (q.startsWith("UPDATE nodes SET users_count = users_count + 1")) {
          const n = self.tables.nodes.find(x => x.id === params[0]);
          if (n) n.users_count += 1;
        }
        if (q.startsWith("UPDATE users SET status = ?")) {
          const u = self.tables.users.find(x => x.id === params[1] || x.uuid === params[1]);
          if (u) u.status = params[0];
        }
        if (q.startsWith("UPDATE users SET traffic_used_bytes = traffic_used_bytes + ?")) {
          const u = self.tables.users.find(x => x.uuid === params[1]);
          if (u) u.traffic_used_bytes += params[0];
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
