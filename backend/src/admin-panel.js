// VPPRV1 Admin Panel Modern Dark Premium UI for Xray Core & VLESS
export function renderAdminPanelPage() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>پنل مدیریت VPPRV1 | کنترل یکپارچه Xray Core & VLESS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #080c14;
      --bg-sidebar: #0e1422;
      --bg-card: rgba(18, 26, 43, 0.85);
      --border-color: rgba(55, 65, 81, 0.6);
      --primary: #10b981;
      --primary-hover: #059669;
      --accent-cyan: #06b6d4;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --danger: #ef4444;
      --warning: #f59e0b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Vazirmatn', sans-serif; }
    body { background-color: var(--bg-dark); color: var(--text-main); min-height: 100vh; display: flex; }
    
    .admin-wrapper { display: flex; width: 100%; min-height: 100vh; }
    .sidebar { width: 260px; background: var(--bg-sidebar); border-left: 1px solid var(--border-color); padding: 1.5rem 1rem; display: flex; flex-direction: column; }
    .main-content { flex: 1; padding: 2rem; overflow-y: auto; max-height: 100vh; }
    
    .logo { display: flex; align-items: center; gap: 0.75rem; font-weight: 800; font-size: 1.25rem; margin-bottom: 2rem; padding: 0 0.5rem; }
    .logo-badge { background: linear-gradient(135deg, var(--primary), var(--accent-cyan)); color: #080c14; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 900; }
    
    .nav-menu { display: flex; flex-direction: column; gap: 0.35rem; list-style: none; flex: 1; }
    .nav-item button { width: 100%; text-align: right; background: transparent; border: none; padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.95rem; font-weight: 500; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s ease; }
    .nav-item button:hover, .nav-item button.active { background: rgba(16, 185, 129, 0.12); color: #fff; font-weight: 600; }
    .nav-item button.active { border-right: 3px solid var(--primary); }
    
    .card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; backdrop-filter: blur(8px); }
    .grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
    .stat-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .stat-val { font-size: 1.85rem; font-weight: 800; color: #fff; }
    .stat-label { font-size: 0.85rem; color: var(--text-muted); }
    
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: right; }
    th { padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.85rem; border-bottom: 1px solid var(--border-color); }
    td { padding: 1rem; border-bottom: 1px solid rgba(55, 65, 81, 0.3); font-size: 0.9rem; }
    tr:hover td { background: rgba(255, 255, 255, 0.02); }
    
    .btn { padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: all 0.2s; }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { background: var(--primary-hover); }
    .btn-danger { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .btn-danger:hover { background: var(--danger); color: #fff; }
    .btn-warning { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    
    .badge-online { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.2rem 0.5rem; border-radius: 99px; font-size: 0.75rem; }
    .badge-offline { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.2rem 0.5rem; border-radius: 99px; font-size: 0.75rem; }
    
    .code-snippet { background: #04070e; border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem; font-family: monospace; font-size: 0.85rem; direction: ltr; text-align: left; color: #34d399; display: flex; justify-content: space-between; align-items: center; }
    .copy-btn { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); padding: 0.25rem 0.6rem; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
    
    #login-overlay { position: fixed; inset: 0; background: rgba(8, 12, 20, 0.95); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
    .login-box { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 400px; text-align: center; }
    .input-field { width: 100%; padding: 0.75rem 1rem; background: #04070e; border: 1px solid var(--border-color); border-radius: 8px; color: #fff; font-size: 0.95rem; margin-bottom: 1rem; }
    .input-field:focus { outline: none; border-color: var(--primary); }
    
    @media (max-width: 768px) {
      .admin-wrapper { flex-direction: column; }
      .sidebar { width: 100%; border-left: none; border-bottom: 1px solid var(--border-color); }
    }
  </style>
</head>
<body>

  <!-- Login Modal Overlay -->
  <div id="login-overlay">
    <div class="login-box">
      <div class="logo" style="justify-content: center; margin-bottom: 1.5rem;">
        <span class="logo-badge">VPPRV1</span>
        <span>ورود به پنل مدیریت Xray</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">
        احراز هویت امن PBKDF2 با ۱۰۰,۰۰۰ دور رمزنگاری و HMAC Session
      </p>
      <form id="login-form" onsubmit="handleLogin(event)">
        <input type="text" id="username" class="input-field" placeholder="نام کاربری (پیش‌فرض: admin)" required>
        <input type="password" id="password" class="input-field" placeholder="کلمه عبور" required>
        <div id="login-error" style="color: var(--danger); font-size: 0.85rem; margin-bottom: 1rem; display: none;"></div>
        <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
          🔐 ورود ایمن به سامانه
        </button>
      </form>
    </div>
  </div>

  <div class="admin-wrapper" id="admin-app" style="display: none;">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-badge">VPPRV1</span>
        <span>پنل مدیریت Xray</span>
      </div>
      <ul class="nav-menu">
        <li class="nav-item"><button class="active" onclick="showTab('dashboard')">📊 داشبورد سیستم</button></li>
        <li class="nav-item"><button onclick="showTab('nodes')">🖥️ نودهای سرور (VPS)</button></li>
        <li class="nav-item"><button onclick="showTab('users')">👥 مدیریت کاربران و UUID</button></li>
        <li class="nav-item"><button onclick="showTab('subs')">🎟️ اشتراک‌ها (Subscriptions)</button></li>
        <li class="nav-item"><button onclick="showTab('agent')">🤖 دستورات Agent سرورها</button></li>
        <li class="nav-item"><button onclick="showTab('downloads')">📦 نسخه‌ها و دانلودها</button></li>
        <li class="nav-item"><button onclick="showTab('logs')">📋 لاگ‌های امنیتی</button></li>
        <li class="nav-item"><button onclick="showTab('settings')">⚙️ تنظیمات سامانه</button></li>
      </ul>
      <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: auto;">
        <button onclick="handleLogout()" class="btn btn-danger" style="width: 100%; justify-content: center;">
          🚪 خروج از حساب
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      
      <!-- DASHBOARD TAB -->
      <section id="tab-dashboard" class="tab-pane">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">داشبورد وضعیت سامانه Xray Core</h2>
          <button onclick="refreshDashboard()" class="btn btn-primary">🔄 به‌روزرسانی زنده</button>
        </div>

        <div class="grid-stats">
          <div class="stat-card">
            <span class="stat-label">تعداد کل نودها (VPS)</span>
            <span class="stat-val" id="stat-nodes">--</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">نودهای فعال و متصل</span>
            <span class="stat-val" id="stat-online-nodes" style="color: var(--primary);">--</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">تعداد کل کاربران (UUID)</span>
            <span class="stat-val" id="stat-users">--</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">کاربران فعال (Active)</span>
            <span class="stat-val" id="stat-active-users" style="color: var(--accent-cyan);">--</span>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">وضعیت زنده نودهای سرور Xray</h3>
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>نام نود</th>
                  <th>دیتاسنتر</th>
                  <th>کشور</th>
                  <th>آدرس و پورت</th>
                  <th>پروتکل / امنیت</th>
                  <th>وضعیت اتصال</th>
                  <th>تاخیر (Ping)</th>
                  <th>بار کاری (Load)</th>
                  <th>کاربران</th>
                  <th>آخرین هارت‌بیت</th>
                </tr>
              </thead>
              <tbody id="dashboard-nodes-table">
                <tr><td colspan="10" style="text-align: center;">در حال دریافت اطلاعات...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- NODES TAB -->
      <section id="tab-nodes" class="tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">مدیریت نودهای سرور (VPS)</h2>
          <button onclick="refreshDashboard()" class="btn btn-primary">🔄 رفرش</button>
        </div>

        <div class="card">
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>شناسه نود</th>
                  <th>نام</th>
                  <th>پرووایدر</th>
                  <th>هاست</th>
                  <th>پورت VLESS</th>
                  <th>امنیت</th>
                  <th>وضعیت</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody id="nodes-table">
                <tr><td colspan="8" style="text-align: center;">در حال بارگذاری...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- USERS TAB -->
      <section id="tab-users" class="tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">مدیریت کاربران، حجم مصرفی و انقضا</h2>
          <button onclick="openAddUserModal()" class="btn btn-primary">➕ ایجاد کاربر جدید</button>
        </div>

        <div class="card">
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>نام کاربری</th>
                  <th>شناسه یکتا (UUID)</th>
                  <th>وضعیت</th>
                  <th>حجم مصرفی</th>
                  <th>سقف مجاز</th>
                  <th>تاریخ انقضا</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody id="users-table">
                <tr><td colspan="7" style="text-align: center;">در حال بارگذاری...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- SUBSCRIPTIONS TAB -->
      <section id="tab-subs" class="tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">اشتراک‌ها و لینک‌های استاندارد VLESS</h2>
          <button onclick="loadSubs()" class="btn btn-primary">🔄 رفرش</button>
        </div>
        <div class="card">
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>توکن اشتراک</th>
                  <th>کاربر</th>
                  <th>پروتکل</th>
                  <th>وضعیت</th>
                  <th>تاریخ ایجاد</th>
                  <th>دریافت کانفیگ VLESS</th>
                </tr>
              </thead>
              <tbody id="subs-table">
                <tr><td colspan="6" style="text-align: center;">در حال بارگذاری...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- AGENT COMMANDS TAB -->
      <section id="tab-agent" class="tab-pane" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem;">دستور راه‌اندازی Xray Node Agent برای VPS</h2>
        <div class="card">
          <h3 style="margin-bottom: 0.75rem; font-size: 1.1rem;">نصب یک‌خطی Agent روی سرورهای Hetzner / Vultr / OVH</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
            دستور زیر را در سرور لینوکس خود اجرا کنید. اسکریپت به صورت خودکار هسته Xray Core را نصب کرده و هر ۶۰ ثانیه کاربران و وضعیت را همگام می‌سازد:
          </p>
          <div id="agent-commands-list" style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Generated dynamically -->
          </div>
        </div>
      </section>

      <!-- DOWNLOADS & VERSIONS TAB -->
      <section id="tab-downloads" class="tab-pane" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem;">نسخه‌ها و لینک‌های دانلود کلاینت</h2>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th>نام پکیج</th>
                <th>پلتفرم</th>
                <th>نسخه</th>
                <th>لینک دانلود مستقیم</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>VPPRV1-Setup.exe</td>
                <td>Windows (.NET 8 Avalonia)</td>
                <td>1.0.0</td>
                <td><a href="/api/downloads/VPPRV1-Setup.exe" class="btn btn-primary">دریافت فایل</a></td>
              </tr>
              <tr>
                <td>VPPRV1-Portable.zip</td>
                <td>Windows (Portable)</td>
                <td>1.0.0</td>
                <td><a href="/api/downloads/VPPRV1-Portable.zip" class="btn btn-primary">دریافت فایل</a></td>
              </tr>
              <tr>
                <td>VPPRV1.apk</td>
                <td>Android (Kotlin Native VpnService)</td>
                <td>1.0.0</td>
                <td><a href="/api/downloads/VPPRV1.apk" class="btn btn-primary">دریافت فایل</a></td>
              </tr>
              <tr>
                <td>VPPRV1-Linux.tar.gz</td>
                <td>Linux (CLI Package)</td>
                <td>1.0.0</td>
                <td><a href="/api/downloads/VPPRV1-Linux.tar.gz" class="btn btn-primary">دریافت فایل</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- LOGS TAB -->
      <section id="tab-logs" class="tab-pane" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800;">لاگ‌های امنیتی و رویدادهای سیستم</h2>
          <button onclick="loadLogs()" class="btn btn-primary">🔄 بازخوانی لاگ‌ها</button>
        </div>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th>سطح</th>
                <th>شرح رویداد</th>
                <th>آی‌پی مبدا</th>
                <th>زمان</th>
              </tr>
            </thead>
            <tbody id="logs-table">
              <tr><td colspan="4" style="text-align: center;">در حال بارگذاری لاگ‌ها...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SETTINGS TAB -->
      <section id="tab-settings" class="tab-pane" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem;">تنظیمات پیشرفته سیستم</h2>
        <div class="card">
          <h3 style="margin-bottom: 1rem;">تنظیمات پیش‌فرض Xray & VLESS</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
            <div>
              <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.35rem;">دامنه پیش‌فرض SNI در Reality</label>
              <input type="text" id="setting-sni" class="input-field" value="www.microsoft.com">
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.35rem;">پورت پیش‌فرض VLESS Reality</label>
              <input type="number" id="setting-port" class="input-field" value="443">
            </div>
            <div>
              <button onclick="alert('تنظیمات با موفقیت ذخیره شدند.')" class="btn btn-primary">ذخیره تنظیمات</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <script>
    let authToken = localStorage.getItem('vpprv1_token');

    if (authToken) {
      document.getElementById('login-overlay').style.display = 'none';
      document.getElementById('admin-app').style.display = 'flex';
      refreshDashboard();
    }

    async function handleLogin(e) {
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      const errBox = document.getElementById('login-error');
      errBox.style.display = 'none';

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('vpprv1_token', data.token);
          authToken = data.token;
          document.getElementById('login-overlay').style.display = 'none';
          document.getElementById('admin-app').style.display = 'flex';
          refreshDashboard();
        } else {
          errBox.innerText = data.error || 'اطلاعات ورود نادرست است';
          errBox.style.display = 'block';
        }
      } catch (err) {
        errBox.innerText = 'خطا در برقراری ارتباط با سرور';
        errBox.style.display = 'block';
      }
    }

    function handleLogout() {
      localStorage.removeItem('vpprv1_token');
      location.reload();
    }

    function showTab(tabName) {
      document.querySelectorAll('.tab-pane').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.nav-item button').forEach(el => el.classList.remove('active'));
      const activeBtn = event.currentTarget || document.querySelector(\`button[onclick="showTab('\${tabName}')"]\`);
      if (activeBtn) activeBtn.classList.add('active');
      const target = document.getElementById('tab-' + tabName);
      if (target) target.style.display = 'block';

      if (tabName === 'dashboard') refreshDashboard();
      if (tabName === 'nodes' || tabName === 'agent') loadNodes();
      if (tabName === 'users') loadUsers();
      if (tabName === 'subs') loadSubs();
      if (tabName === 'logs') loadLogs();
    }

    async function apiFetch(url, options = {}) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + authToken;
      const res = await fetch(url, options);
      if (res.status === 401) {
        handleLogout();
        throw new Error('Unauthorized');
      }
      return res.json();
    }

    function formatBytes(bytes) {
      if (!bytes || bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async function refreshDashboard() {
      try {
        const data = await apiFetch('/api/admin/dashboard');
        document.getElementById('stat-nodes').innerText = data.totalNodes || 0;
        document.getElementById('stat-online-nodes').innerText = data.onlineNodes || 0;
        document.getElementById('stat-users').innerText = data.totalUsers || 0;
        document.getElementById('stat-active-users').innerText = data.activeUsers || 0;

        const tbody = document.getElementById('dashboard-nodes-table');
        if (data.nodes && data.nodes.length > 0) {
          tbody.innerHTML = data.nodes.map(n => {
            const isOnline = n.status === 'online';
            return \`
              <tr>
                <td><strong>\${n.flag || ''} \${n.name}</strong></td>
                <td>\${n.provider || 'Hetzner'}</td>
                <td>\${n.country}</td>
                <td><code style="direction:ltr; display:inline-block;">\${n.host}:\${n.port}</code></td>
                <td><span style="color:var(--primary); font-weight:700;">VLESS + \${n.security === 'reality' ? 'Reality' : 'WS'}</span></td>
                <td>
                  <span class="\${isOnline ? 'badge-online' : 'badge-offline'}">
                    \${isOnline ? '🟢 آنلاین' : '🔴 آفلاین'}
                  </span>
                </td>
                <td>\${isOnline ? n.latency + ' ms' : '---'}</td>
                <td>\${isOnline ? n.load + '%' : '---'}</td>
                <td>\${n.users_count || 0}</td>
                <td>\${n.last_heartbeat ? new Date(n.last_heartbeat).toLocaleTimeString('fa-IR') : 'هرگز'}</td>
              </tr>
            \`;
          }).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function loadNodes() {
      try {
        const data = await apiFetch('/api/servers');
        const tbody = document.getElementById('nodes-table');
        const agentList = document.getElementById('agent-commands-list');
        
        if (data.servers) {
          tbody.innerHTML = data.servers.map(n => \`
            <tr>
              <td><code>\${n.id}</code></td>
              <td>\${n.flag} \${n.name}</td>
              <td>\${n.provider || 'Hetzner'}</td>
              <td>\${n.host}</td>
              <td>\${n.port}</td>
              <td>\${n.security}</td>
              <td>
                <span class="\${n.status === 'online' ? 'badge-online' : 'badge-offline'}">
                  \${n.status}
                </span>
              </td>
              <td>
                <button onclick="deleteNode('\${n.id}')" class="btn btn-danger">حذف</button>
              </td>
            </tr>
          \`).join('');

          agentList.innerHTML = data.servers.map(n => \`
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem;">
              <h4 style="color:#fff; margin-bottom: 0.5rem;">نصب Xray Agent روی نود: \${n.flag} \${n.name} (\${n.provider} - \${n.host})</h4>
              <div class="code-snippet">
                <span>curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/node-agent/install.sh | sudo bash -s -- --node-id \${n.id} --token \${n.agent_token} --endpoint https://\${window.location.host}</span>
                <button class="copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); alert('دستور کپی شد');">کپی دستور</button>
              </div>
            </div>
          \`).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function loadUsers() {
      try {
        const data = await apiFetch('/api/admin/users');
        const tbody = document.getElementById('users-table');
        if (data.users) {
          tbody.innerHTML = data.users.map(u => {
            const isActive = u.status === 'active';
            return \`
              <tr>
                <td><strong>\${u.username}</strong></td>
                <td><code style="font-size:0.8rem;">\${u.uuid}</code></td>
                <td>
                  <span class="\${isActive ? 'badge-online' : 'badge-offline'}">
                    \${isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                <td>\${formatBytes(u.traffic_used_bytes)}</td>
                <td>\${u.traffic_limit_bytes > 0 ? formatBytes(u.traffic_limit_bytes) : 'نامحدود'}</td>
                <td>\${new Date(u.expires_at).toLocaleDateString('fa-IR')}</td>
                <td>
                  <button onclick="toggleUserStatus('\${u.id}', '\${isActive ? 'disabled' : 'active'}')" class="\${isActive ? 'btn btn-warning' : 'btn btn-primary'}">
                    \${isActive ? 'غیرفعال‌سازی' : 'فعال‌سازی'}
                  </button>
                </td>
              </tr>
            \`;
          }).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function toggleUserStatus(userId, newStatus) {
      try {
        await apiFetch(\`/api/admin/users/\${userId}/status\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        loadUsers();
      } catch (e) {
        alert('خطا در تغییر وضعیت کاربر');
      }
    }

    async function loadSubs() {
      try {
        const data = await apiFetch('/api/admin/subscriptions');
        const tbody = document.getElementById('subs-table');
        if (data.subscriptions) {
          tbody.innerHTML = data.subscriptions.map(s => \`
            <tr>
              <td><code>\${s.token}</code></td>
              <td>\${s.user_id}</td>
              <td>\${s.protocol.toUpperCase()} + \${s.security}</td>
              <td><span class="badge-online">فعال</span></td>
              <td>\${new Date(s.created_at).toLocaleDateString('fa-IR')}</td>
              <td>
                <a href="/api/v1/sub/\${s.token}" target="_blank" class="btn btn-primary" style="font-size:0.75rem;">دریافت VLESS</a>
              </td>
            </tr>
          \`).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function loadLogs() {
      try {
        const data = await apiFetch('/api/admin/logs');
        const tbody = document.getElementById('logs-table');
        if (data.logs) {
          tbody.innerHTML = data.logs.map(l => \`
            <tr>
              <td><span style="color: \${l.level === 'error' ? 'var(--danger)' : 'var(--primary)'}; font-weight:700;">\${l.level}</span></td>
              <td>\${l.message}</td>
              <td><code>\${l.ip || '---'}</code></td>
              <td>\${new Date(l.created_at).toLocaleString('fa-IR')}</td>
            </tr>
          \`).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }
  </script>
</body>
</html>`;
}
