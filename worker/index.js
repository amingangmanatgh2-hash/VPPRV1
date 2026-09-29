const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
const uid = () => crypto.randomUUID();
const bytesToHex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const digest = async value => bytesToHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
const passwordHash = async (password, salt, iterations = 210000) => bytesToHex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations, hash: 'SHA-256' }, await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']), 256));
const allowed = new Set(['servers', 'nodes', 'users', 'subscriptions', 'configs', 'releases']);

async function auth(req, env) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  return env.DB.prepare(`SELECT a.id,a.email,a.role FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>datetime('now')`).bind(await digest(token)).first();
}
async function body(req) { try { return await req.json(); } catch { return null; } }
const required = (obj, fields) => fields.every(k => typeof obj?.[k] === 'string' && obj[k].trim());

async function api(req, env, url) {
  const path = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (!path.length) return json({ name: env.APP_NAME, version: env.APP_VERSION, status: 'فعال', docs: '/api/health' });
  if (path[0] === 'health') {
    try { await env.DB.prepare('SELECT 1').first(); return json({ ok: true, service: 'VPPRV1 API', database: 'متصل', time: new Date().toISOString() }); }
    catch { return json({ ok: false, database: 'قطع' }, 503); }
  }
  if (path[0] === 'public') {
    if (path[1] === 'servers') {
      const { results } = await env.DB.prepare("SELECT id,name,country,city,status,latency,load,capacity FROM servers WHERE status='active' ORDER BY (latency + load*2) ASC").all();
      return json({ servers: results });
    }
    if (path[1] === 'best-server') {
      const server = await env.DB.prepare("SELECT id,name,country,city,host,port,public_key,latency,load FROM servers WHERE status='active' ORDER BY (latency + load*2) ASC LIMIT 1").first();
      return server ? json({ server, strategy: 'latency-load-health' }) : json({ error: 'در حال حاضر سرور فعالی ثبت نشده است.' }, 503);
    }
    if (path[1] === 'releases') {
      const { results } = await env.DB.prepare('SELECT platform,version,url,sha256,published_at FROM releases ORDER BY published_at DESC').all();
      return json({ releases: results });
    }
  }
  if (path[0] === 'auth' && path[1] === 'bootstrap' && req.method === 'POST') {
    const count = await env.DB.prepare('SELECT COUNT(*) count FROM admins').first();
    if (count.count) return json({ error: 'راه‌اندازی اولیه قبلاً انجام شده است.' }, 409);
    const data = await body(req);
    if (!required(data, ['email','password']) || data.password.length < 12) return json({ error: 'ایمیل و رمز حداقل ۱۲ کاراکتری الزامی است.' }, 400);
    const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
    await env.DB.prepare('INSERT INTO admins(id,email,password_hash,salt) VALUES(?,?,?,?)').bind(uid(), data.email.toLowerCase(), await passwordHash(data.password, salt), salt).run();
    return json({ ok: true, message: 'مدیر با موفقیت ساخته شد.' }, 201);
  }
  if (path[0] === 'auth' && path[1] === 'login' && req.method === 'POST') {
    const data = await body(req); const admin = data?.email ? await env.DB.prepare('SELECT * FROM admins WHERE email=?').bind(data.email.toLowerCase()).first() : null;
    if (!admin || await passwordHash(data.password || '', admin.salt, admin.iterations) !== admin.password_hash) return json({ error: 'ایمیل یا رمز عبور نادرست است.' }, 401);
    const token = bytesToHex(crypto.getRandomValues(new Uint8Array(32))); const expires = new Date(Date.now() + 8 * 3600e3).toISOString();
    await env.DB.prepare('INSERT INTO sessions(id,admin_id,token_hash,expires_at) VALUES(?,?,?,?)').bind(uid(), admin.id, await digest(token), expires).run();
    return json({ token, expires, admin: { email: admin.email, role: admin.role } });
  }
  const admin = await auth(req, env);
  if (!admin) return json({ error: 'ورود مدیر الزامی است.' }, 401);
  if (path[0] === 'auth' && path[1] === 'me') return json({ admin });
  if (path[0] === 'auth' && path[1] === 'logout') { const t=req.headers.get('authorization').replace(/^Bearer\s+/i,''); await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await digest(t)).run(); return json({ok:true}); }
  if (path[0] === 'dashboard') {
    const row = await env.DB.prepare(`SELECT (SELECT COUNT(*) FROM servers) servers,(SELECT COUNT(*) FROM servers WHERE status='active') activeServers,(SELECT COUNT(*) FROM users) users,(SELECT COUNT(*) FROM subscriptions WHERE status='active') subscriptions,(SELECT COUNT(*) FROM configs WHERE enabled=1) configs`).first();
    return json(row);
  }
  const table = path[0];
  if (!allowed.has(table)) return json({ error: 'مسیر پیدا نشد.' }, 404);
  if (req.method === 'GET') { const { results } = await env.DB.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 200`).all(); return json({ items: results }); }
  if (table === 'servers' && req.method === 'POST') {
    const d=await body(req); if(!required(d,['name','country','city','host'])) return json({error:'فیلدهای ضروری کامل نیست.'},400);
    const id=uid(); await env.DB.prepare('INSERT INTO servers(id,name,country,city,host,port,public_key,status,latency,load) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,d.name,d.country,d.city,d.host,Number(d.port)||51820,d.public_key||'',d.status||'inactive',Number(d.latency)||9999,Number(d.load)||0).run();
    await env.DB.prepare('INSERT INTO logs(level,action,actor,details) VALUES(?,?,?,?)').bind('info','server.create',admin.email,id).run(); return json({id},201);
  }
  if (table === 'servers' && path[1] && req.method === 'PATCH') { const d=await body(req); const fields=['name','country','city','host','port','public_key','status','latency','load'].filter(k=>d[k]!==undefined); if(!fields.length)return json({error:'تغییری ارسال نشده.'},400); await env.DB.prepare(`UPDATE servers SET ${fields.map(k=>`${k}=?`).join(',')},updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(...fields.map(k=>d[k]),path[1]).run(); return json({ok:true}); }
  if (path[1] && req.method === 'DELETE') { await env.DB.prepare(`DELETE FROM ${table} WHERE id=?`).bind(path[1]).run(); return json({ok:true}); }
  return json({ error: 'عملیات پشتیبانی نمی‌شود.' }, 405);
}

export default { async fetch(req, env) { const url = new URL(req.url); try { if (url.pathname.startsWith('/api/')) return await api(req, env, url); if (url.pathname === '/panel' || url.pathname === '/panel/') return env.ASSETS.fetch(new Request(new URL('/panel.html', url), req)); return env.ASSETS.fetch(req); } catch (e) { console.error(e); return json({ error: 'خطای داخلی سرویس', requestId: uid() }, 500); } } };
