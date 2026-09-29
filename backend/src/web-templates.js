// VPPRV1 Persian RTL Modern Web UI Template Generator

export function renderPage({ title, currentPath, content }) {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | VPPRV1 - پلتفرم امن WireGuard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #090d16;
      --bg-card: rgba(17, 24, 39, 0.75);
      --bg-card-hover: rgba(31, 41, 55, 0.85);
      --border-color: rgba(55, 65, 81, 0.5);
      --border-highlight: rgba(16, 185, 129, 0.3);
      --primary: #10b981;
      --primary-hover: #059669;
      --accent-cyan: #06b6d4;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-sub: #6b7280;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.08) 0%, transparent 40%);
      background-attachment: fixed;
    }
    a {
      color: var(--primary);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    a:hover {
      color: var(--accent-cyan);
    }
    .header {
      border-bottom: 1px solid var(--border-color);
      backdrop-filter: blur(12px);
      background: rgba(9, 13, 22, 0.85);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 800;
      font-size: 1.35rem;
      color: #fff;
    }
    .logo-badge {
      background: linear-gradient(135deg, #10b981, #06b6d4);
      color: #090d16;
      padding: 0.25rem 0.6rem;
      border-radius: 8px;
      font-weight: 900;
      letter-spacing: 1px;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-links a {
      color: var(--text-muted);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.4rem 0.6rem;
      border-radius: 6px;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
    .nav-cta {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .btn {
      padding: 0.6rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      transition: all 0.25s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
      color: #fff;
    }
    .btn-outline {
      background: transparent;
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }
    .btn-outline:hover {
      border-color: var(--primary);
      background: rgba(16, 185, 129, 0.08);
      color: #fff;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
      flex: 1;
      width: 100%;
    }
    .hero {
      text-align: center;
      padding: 3.5rem 1rem 4rem 1rem;
      max-width: 850px;
      margin: 0 auto;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    .hero h1 {
      font-size: 2.75rem;
      font-weight: 900;
      line-height: 1.3;
      margin-bottom: 1.25rem;
      background: linear-gradient(135deg, #ffffff 40%, #a7f3d0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: 1.15rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
      line-height: 1.8;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }
    .card:hover {
      border-color: var(--border-highlight);
      background: var(--bg-card-hover);
      transform: translateY(-2px);
    }
    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: rgba(16, 185, 129, 0.15);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.7;
    }
    .footer {
      border-top: 1px solid var(--border-color);
      background: rgba(9, 13, 22, 0.95);
      padding: 2.5rem 1.5rem 1.5rem 1.5rem;
      color: var(--text-sub);
      font-size: 0.9rem;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .footer-col h4 {
      color: #fff;
      font-size: 1rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    .footer-col ul {
      list-style: none;
    }
    .footer-col ul li {
      margin-bottom: 0.5rem;
    }
    .footer-col ul li a {
      color: var(--text-muted);
    }
    .footer-col ul li a:hover {
      color: var(--primary);
    }
    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      border-top: 1px solid rgba(55, 65, 81, 0.3);
      padding-top: 1.5rem;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--primary);
      display: inline-block;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .code-box {
      background: #04070e;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      font-family: monospace;
      direction: ltr;
      text-align: left;
      overflow-x: auto;
      color: #34d399;
      margin: 1rem 0;
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hero h1 { font-size: 2rem; }
      .card-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="nav-container">
      <a href="/" class="logo-container">
        <span class="logo-badge">VPPRV1</span>
        <span>سامانه امن وی‌پی‌ان</span>
      </a>
      <nav class="nav-links">
        <a href="/" class="${currentPath === '/' ? 'active' : ''}">صفحه اصلی</a>
        <a href="/features" class="${currentPath === '/features' ? 'active' : ''}">امکانات و قابلیت‌ها</a>
        <a href="/servers" class="${currentPath === '/servers' ? 'active' : ''}">وضعیت سرورها</a>
        <a href="/downloads" class="${currentPath === '/downloads' ? 'active' : ''}">دانلود کلاینت‌ها</a>
        <a href="/guide" class="${currentPath === '/guide' ? 'active' : ''}">راهنمای اتصال</a>
        <a href="/about" class="${currentPath === '/about' ? 'active' : ''}">درباره ما</a>
      </nav>
      <div class="nav-cta">
        <a href="/panel" class="btn btn-outline">پنل مدیریت</a>
        <button id="quick-connect-btn" onclick="quickProvision()" class="btn btn-primary">
          <span class="pulse-dot"></span> دریافت فوری اتصال
        </button>
      </div>
    </div>
  </header>

  <main class="container">
    ${content}
  </main>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-col" style="max-width: 320px;">
        <div class="logo-container" style="margin-bottom: 0.75rem;">
          <span class="logo-badge">VPPRV1</span>
          <span>سامانه نسل جدید WireGuard</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.7;">
          پلتفرم پیشرفته مدیریت و توزیع اتصال امن WireGuard با الگوریتم مدرن X25519، رمزگذاری چندلایه و قابلیت مسیریابی تفکیکی نت ملی (Split Tunneling).
        </p>
      </div>
      <div class="footer-col">
        <h4>بخش‌های سایت</h4>
        <ul>
          <li><a href="/">صفحه اصلی</a></li>
          <li><a href="/features">فهرست ۵۰+ قابلیت</a></li>
          <li><a href="/servers">سرورهای جهانی</a></li>
          <li><a href="/downloads">دانلود برنامه‌ها</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>پشتیبانی و اسناد</h4>
        <ul>
          <li><a href="/guide">راهنمای تصویری اتصال</a></li>
          <li><a href="/privacy">سیاست حریم خصوصی Zero-Log</a></li>
          <li><a href="/terms">شرایط و قوانین استفاده</a></li>
          <li><a href="/panel">ورود به پنل مدیریت</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>پلتفرم‌ها</h4>
        <ul>
          <li><a href="/downloads#windows">کلاینت ویندوز (.NET 8 Avalonia)</a></li>
          <li><a href="/downloads#android">کلاینت اندروید (Kotlin VpnService)</a></li>
          <li><a href="/downloads#linux">کلاینت لینوکس (CLI یک‌خطی)</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>تمامی حقوق محفوظ است © ۱۴۰۵ / 2026 - پروژه اختصاصی VPPRV1</p>
    </div>
  </footer>

  <script>
    async function quickProvision() {
      const btn = document.getElementById('quick-connect-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'در حال تولید کانفیگ امن...';
      btn.disabled = true;
      try {
        const res = await fetch('/api/v1/provision', { method: 'POST' });
        const data = await res.json();
        if (data.token) {
          window.location.href = '/api/v1/sub/' + data.token;
        } else {
          alert('خطا در صدور کانفیگ: ' + (data.error || 'لطفاً دوباره تلاش کنید'));
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      } catch (e) {
        alert('خطای ارتباط با سرور');
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;
}
