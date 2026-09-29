// VPPRV1 Persian RTL Website Pages for Xray Core & VLESS
import { renderPage } from './web-templates.js';

export function renderHomePage() {
  const content = `
    <section class="hero">
      <div class="hero-badge">
        <span class="pulse-dot"></span> نسل جدید شبکه اختصاصی مبتنی بر Xray Core & VLESS Reality
      </div>
      <h1>اینترنت آزاد، امن و پرسرعت<br>با پروتکل پیشرفته VLESS + Reality</h1>
      <p>
        سامانه VPPRV1 با بهره‌گیری از هسته قدرتمند Xray Core، رمزنگاری استاندارد VLESS Reality و WebSocket، پورت ۴۴۳ و مسیریابی هوشمند، اتصالی پایدار و بدون قطعی را فراهم می‌کند.
      </p>
      <div class="hero-actions">
        <button onclick="quickProvision()" class="btn btn-primary" style="font-size: 1.05rem; padding: 0.8rem 1.75rem;">
          ⚡ دریافت آنی کانفیگ VLESS
        </button>
        <a href="/downloads" class="btn btn-outline" style="font-size: 1.05rem; padding: 0.8rem 1.75rem;">
          📥 دانلود کلاینت‌ها (Windows / Android / Linux)
        </a>
      </div>
    </section>

    <div style="margin-top: 3rem; text-align: center;">
      <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff;">چرا VPPRV1 بر پایه Xray Core متمایز است؟</h2>
      <p style="color: var(--text-muted);">زیرساخت واقعی بر روی دیتاسنترهای Hetzner، Vultr و OVH با همگام‌سازی لحظه‌ای</p>
    </div>

    <div class="card-grid">
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>پروتکل فوق‌سریع VLESS</h3>
        <p>بهره‌گیری از پروتکل مدرن VLESS بدون سربار رمزنگاری اضافه و با حداکثر بهره‌وری پهنای باند و کمترین تاخیر (Latency).</p>
      </div>

      <div class="card">
        <div class="card-icon">🎭</div>
        <h3>فناوری ضدفیلتر TCP Reality</h3>
        <p>استفاده از شبیه‌سازی هویت وب‌سایت‌های معتبر جهانی (مانند مایکروسافت، اپل و یاهو) جهت عبور مطمئن از فایروال‌های پیشرفته اینترنت.</p>
      </div>

      <div class="card">
        <div class="card-icon">🌐</div>
        <h3>پشتیبانی همزمان از VLESS + WebSocket</h3>
        <p>پشتیبانی از انتقال مبتنی بر WS برای پایداری و سازگاری با CDNها و شبکه‌های دارای محدودیت‌های خاص پورت.</p>
      </div>

      <div class="card">
        <div class="card-icon">🌍</div>
        <h3>نودهای واقعی Hetzner, Vultr, OVH</h3>
        <p>استقرار واقعی روی برترین سرویس‌دهندگان ابری جهان در آلمان، فنلاند، آمریکا، فرانسه، هلند، انگلیس، سنگاپور، ژاپن و امارات.</p>
      </div>

      <div class="card">
        <div class="card-icon">🖥️</div>
        <h3>سازگاری با تمام کلاینت‌های استاندارد</h3>
        <p>تولید URI معتبر <code>vless://</code> سازگار با نرم‌افزارهای v2rayN, v2rayNG, Nekoray, Clash, Sing-box و کلاینت‌های بومی VPPRV1.</p>
      </div>

      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>مدیریت هوشمند حجم و انقضا</h3>
        <p>پایش ترافیک مصرفی آپلود/دانلود، تاریخ انقضا، فعال/غیرفعال‌سازی لحظه‌ای کاربران و همگام‌سازی با سرویس StatsService در Xray.</p>
      </div>
    </div>

    <section style="margin-top: 4rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 2.5rem; text-align: center;">
      <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">اتصال مستقیم در ۳ ثانیه</h3>
      <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto 1.5rem auto;">
        بدون نیاز به ثبت نام، دکمه زیر را بزنید تا UUID اختصاصی Xray شما تولید و لینک اشتراک استاندارد VLESS بلافاصله تحویل داده شود.
      </p>
      <button onclick="quickProvision()" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1rem;">
        دریافت فوری کانفیگ VLESS
      </button>
    </section>
  `;
  return renderPage({ title: "صفحه اصلی", currentPath: "/", content });
}

export function renderFeaturesPage() {
  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">۵۰ قابلیت واقعی و پیاده‌سازی شده در VPPRV1 (Xray Core)</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem;">
        تمامی موارد زیر به صورت واقعی در کدهای Backend، Node Agent، کلاینت‌های اختصاصی و پنل مدیریت پیاده‌سازی شده‌اند.
      </p>
    </div>

    <div class="card-grid">
      <!-- بخش ۱: معماری Xray Core و VLESS -->
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>۱. پروتکل پیشرفته VLESS استاندارد</h3>
        <p>پیاده‌سازی پروتکل سبک و پرسرعت VLESS بدون افت کیفیت و هدررفت پهنای باند برای دسترسی سریع به اینترنت بین‌الملل.</p>
      </div>
      <div class="card">
        <div class="card-icon">🎭</div>
        <h3>۲. فناوری VLESS + TCP Reality</h3>
        <p>شبیه‌سازی کامل هندشیک TLS با دامنه‌های مجاز و استخراج کلید عمومی Reality جهت استتار ارتباطات در برابر فیلترینگ.</p>
      </div>
      <div class="card">
        <div class="card-icon">🌐</div>
        <h3>۳. پشتیبانی از VLESS + WebSocket</h3>
        <p>پشتیبانی از ترنسپورت WS روی پورت ۸۰/۴۴۳ برای سازگاری حداکثری با شبکه‌های دارای اختلال.</p>
      </div>
      <div class="card">
        <div class="card-icon">🆔</div>
        <h3>۴. تولید UUID v4 اختصاصی برای هر کاربر</h3>
        <p>صدور شناسه یکتای تصادفی کریپتوگرافیک جهت احراز هویت در هسته Xray بدون تداخل شناسه‌ها.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔗</div>
        <h3>۵. تولید لینک استاندارد vless://</h3>
        <p>سازگاری ۱۰۰٪ خروجی لینک‌ها با نرم‌افزارهای استاندارد v2rayN, v2rayNG, Nekoray, Streisand, Sing-box و Shadowrocket.</p>
      </div>

      <!-- بخش ۲: ابری و سرورها -->
      <div class="card">
        <div class="card-icon">☁️</div>
        <h3>۶. کنترل‌پنل سرورلس Cloudflare Workers</h3>
        <p>اجرای بدون سرور در لبه شبکه جهانی (Edge) کلودفلر برای پاسخ‌دهی با کمترین تاخیر در سراسر جهان.</p>
      </div>
      <div class="card">
        <div class="card-icon">💾</div>
        <h3>۷. پایگاه داده توزیع‌شده Cloudflare D1</h3>
        <p>ذخیره‌سازی اطلاعات نودها، کاربران، سابسکریپشن‌ها و مصرف ترافیک در پایگاه داده SQLite توزیع‌شده D1.</p>
      </div>
      <div class="card">
        <div class="card-icon">🏢</div>
        <h3>۸. اتصال به پرووایدرهای Hetzner, Vultr, OVH</h3>
        <p>مدیریت سرورهای VPS اختصاصی از برترین ارائه‌دهندگان ابری بین‌المللی با پورت ۱ گیگابیت.</p>
      </div>
      <div class="card">
        <div class="card-icon">🤖</div>
        <h3>۹. نود ایجنت سبک پایتونی (Node Agent)</h3>
        <p>سرویس هوشمند روی VPS جهت دانلود خودکار باینری رسمی Xray، تنظیم پیکربندی Inboundها و مدیریت پروسس.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔄</div>
        <h3>۱۰. همگام‌سازی لحظه‌ای تنظیمات (Sync Engine)</h3>
        <p>دریافت خودکار لیست کاربران فعال از پنل کلودفلر و بارگذاری مجدد فایل کانفیگ Xray با سیگنال زنده بدون قطعی اتصال.</p>
      </div>

      <!-- بخش ۳: ترافیک و کاربران -->
      <div class="card">
        <div class="card-icon">📊</div>
        <h3>۱۱. پایش ترافیک مصرفی آپلود و دانلود</h3>
        <p>استخراج آمار ترافیک مصرفی کلاینت‌ها از سرویس StatsService هسته Xray و ثبت دوره‌ای در دیتابیس D1.</p>
      </div>
      <div class="card">
        <div class="card-icon">⏳</div>
        <h3>۱۲. مدیریت تاریخ انقضا و زمان اشتراک</h3>
        <p>محاسبه زمان باقی‌مانده و غیرفعال‌سازی خودکار اشتراک‌های به پایان رسیده.</p>
      </div>
      <div class="card">
        <div class="card-icon">🚫</div>
        <h3>۱۳. فعال و غیرفعال‌سازی آنی کاربر</h3>
        <p>امکان مسدودسازی فوری هر کاربر از پنل مدیریت و قطع دسترسی او از تمامی نودهای فعال در کمتر از ۱ دقیقه.</p>
      </div>
      <div class="card">
        <div class="card-icon">🚦</div>
        <h3>۱۴. سقف مصرف حجم (Traffic Quota)</h3>
        <p>تعریف سقف مصرف پهنای باند بر حسب بایت/گیگابایت و جلوگیری خودکار از ترافیک اضافی.</p>
      </div>
      <div class="card">
        <div class="card-icon">💓</div>
        <h3>۱۵. ارسال هارت‌بیت دوره‌ای نودها (هر ۶۰ ثانیه)</h3>
        <p>گزارش منظم وضعیت سلامت، میزان لود رم و پردازنده سرور و تاخیر شبکه به پنل کنترل.</p>
      </div>

      <!-- بخش ۴: امنیت و احراز هویت -->
      <div class="card">
        <div class="card-icon">🔐</div>
        <h3>۱۶. هش کلمه عبور با PBKDF2 (۱۰۰,۰۰۰ دور)</h3>
        <p>رمزگذاری کلمات عبور ادمین با تابع استاندارد PBKDF2 و ۱۰۰ هزار تکرار همراه با نمک تصادفی ۱۶ بایتی.</p>
      </div>
      <div class="card">
        <div class="card-icon">🎟️</div>
        <h3>۱۷. مدیریت نشست امن با HMAC-SHA256 Token</h3>
        <p>امضای رمزشده کوکی‌های Session با الگوریتم HMAC-SHA256 و کلید رمزنگاری محرمانه سمت سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۱۸. احراز هویت امن با توکن Timing-Safe</h3>
        <p>استفاده از الگوریتم مقایسه با زمان ثابت جهت جلوگیری کامل از حملات تحلیل زمانی در ایجنت.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛑</div>
        <h3>۱۹. محدودساز نرخ درخواست (Rate Limit) بر اساس IP</h3>
        <p>جلوگیری از حملات Brute Force در صفحه لاگین و جلوگیری از اسپم در متد صدور آنی Provision.</p>
      </div>
      <div class="card">
        <div class="card-icon">🧼</div>
        <h3>۲۰. پیشگیری ساختاری از تزریق SQL</h3>
        <p>استفاده ۱۰۰٪ از Prepared Statements و متغیرهای مقید در تمامی کوئری‌های D1.</p>
      </div>

      <!-- بخش ۵: پنل و داشبورد -->
      <div class="card">
        <div class="card-icon">🎛️</div>
        <h3>۲۱. داشبورد مانیتورینگ Dark Premium فارسی</h3>
        <p>طراحی مدرن تیره با تم سبز/فیروزه‌ای، کاملاً راست‌چین و انیمیشن‌های نرم برای پایش کلیه منابع.</p>
      </div>
      <div class="card">
        <div class="card-icon">🖥️</div>
        <h3>۲۲. مدیریت کامل نودها و سرورها</h3>
        <p>پنل مدیریت جامع مشخصات سرورها، آدرس‌ها، پورت‌ها، کلیدهای Reality و وضعیت آنلاین/آفلاین.</p>
      </div>
      <div class="card">
        <div class="card-icon">📋</div>
        <h3>۲۳. تولید دستور یک‌خطی نصب Xray Node Agent</h3>
        <p>امکان کپی مستقیم دستور نصب و راه‌اندازی ایجنت به همراه توکن اختصاصی برای هر سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">👥</div>
        <h3>۲۴. مدیریت کاربران و UUIDها</h3>
        <p>مشاهده وضعیت کاربران فعال، مصرف پهنای باند، ایجاد دستی کاربر و بازنشانی شناسه.</p>
      </div>
      <div class="card">
        <div class="card-icon">📥</div>
        <h3>۲۵. مدیریت سابسکریپشن‌ها و دانلود لینک‌ها</h3>
        <p>مشاهده توکن‌های اشتراک فعال و دریافت فرمت‌های VLESS و JSON کلاینت.</p>
      </div>
      <div class="card">
        <div class="card-icon">📝</div>
        <h3>۲۶. لاگ‌برداری ساختاریافته وقایع سیستم</h3>
        <p>ثبت خطاهای دسترسی، احراز هویت‌های ناموفق و رویدادهای سیستمی در جدول Logs پایگاه داده.</p>
      </div>
      <div class="card">
        <div class="card-icon">📱</div>
        <h3>۲۷. رابط کاربری واکنش‌گرا و سازگار با موبایل</h3>
        <p>نمایش استاندارد پنل مدیریت در نمایشگرهای موبایل، تبلت و دسکتاپ.</p>
      </div>

      <!-- بخش ۶: کلاینت‌ها -->
      <div class="card">
        <div class="card-icon">🪟</div>
        <h3>۲۸. کلاینت دسکتاپ ویندوز (.NET 8 & Avalonia)</h3>
        <p>برنامه مدرن کراس‌پلتفرم ویندوز با رابط کاربری فارسی، دکمه اتصال ۵ وضعیتی و انیمیشن Pulse.</p>
      </div>
      <div class="card">
        <div class="card-icon">🤖</div>
        <h3>۲۹. اپلیکیشن اندروید بومی (Kotlin & VpnService)</h3>
        <p>پیاده‌سازی سرویس اتصال مبتنی بر استاندارد Android VpnService با پشتیبانی از VLESS.</p>
      </div>
      <div class="card">
        <div class="card-icon">🐧</div>
        <h3>۳۰. کلاینت ترمینال لینوکس (vpprv1 CLI)</h3>
        <p>ابزار خط فرمان سبک لینوکس با دستورات فارسی <code>vpprv1 connect</code> و <code>vpprv1 status</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">⏱️</div>
        <h3>۳۱. نمایش زمان اتصال و اعداد به فارسی</h3>
        <p>تایمر زنده مدت برقراری اتصال با فرمت‌بندی اعداد به خط و الفبای فارسی.</p>
      </div>
      <div class="card">
        <div class="card-icon">💿</div>
        <h3>۳۲. نصاب ویندوز NSIS به همراه نسخه Portable</h3>
        <p>تولید خروجی نصاب رسمی با قابلیت حذف (Uninstall) کامل و نسخه بدون نیاز به نصب (Portable ZIP).</p>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>۳۳. بسته قابل استقرار VPPRV1-Linux.tar.gz</h3>
        <p>بسته‌بندی کامل باینری و اسکریپت نصب یک‌خطی جهت راه‌اندازی سریع در کلیه توزیع‌های لینوکس.</p>
      </div>

      <!-- بخش ۷: استقرار و CI/CD -->
      <div class="card">
        <div class="card-icon">🚀</div>
        <h3>۳۴. خط لوله GitHub Actions CI/CD چندگانه</h3>
        <p>ورک‌فلوهای خودکار برای تست، بیلد ویندوز، اندروید، لینوکس و استقرار به Cloudflare Workers.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۳۵. عدم انتشار Secretها در گیت‌هاب (.gitignore)</h3>
        <p>پیکربندی کامل فایل .gitignore جهت ممانعت از ارسال فایل‌های حاوی رمز یا کلیدهای امنیتی به ریپازیتوری.</p>
      </div>
      <div class="card">
        <div class="card-icon">🌱</div>
        <h3>۳۶. راه‌اندازی و Seed اولیه ۱۱ سرور پیش‌فرض</h3>
        <p>ایجاد خودکار سرورهای آلمان، فنلاند، آمریکا، فرانسه، انگلیس، هلند، سنگاپور، ژاپن، ترکیه و امارات با وضعیت اولیه Offline.</p>
      </div>
      <div class="card">
        <div class="card-icon">📚</div>
        <h3>۳۷. مستندات کامل فارسی و راهنمای تفصیلی</h3>
        <p>مستندات شفاف فارسی در فایل‌های <code>README.md</code>، <code>docs/FEATURES.md</code> و صفحات وب.</p>
      </div>
      <div class="card">
        <div class="card-icon">🎯</div>
        <h3>۳۸. پورت استاندارد HTTPS 443</h3>
        <p>استفاده از پورت امن ۴۴۳ جهت عبور ایمن ترافیک Reality از میان فایروال‌های سخت‌گیر شبکه.</p>
      </div>
      <div class="card">
        <div class="card-icon">🧩</div>
        <h3>۳۹. ساختار ماژولار و قابل توسعه اینباندها</h3>
        <p>قابلیت تعریف و مدیریت اینباندهای جدید VLESS بر روی هر نود با تنظیمات سفارشی.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>۴۰. سازگاری کامل با هسته رسمی Xray-core</h3>
        <p>تولید ساختار JSON معتبر و استاندارد برای نسخه رسمی Xray-core در سرور و کلاینت.</p>
      </div>

      <!-- قابلیت‌های تکمیلی ۴۱ تا ۵۰ -->
      <div class="card">
        <div class="card-icon">📶</div>
        <h3>۴۱. انتخاب خودکار بهترین نود بر اساس پینگ</h3>
        <p>سنجش تاخیر شبکه تمامی سرورها و سوئیچ هوشمند روی پایدارترین سرور با کمترین Latency.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔄</div>
        <h3>۴۲. راه‌اندازی مجدد خودکار سرویس در لینوکس</h3>
        <p>پیکربندی systemd برای اجرای خودکار Node Agent و Xray-core پس از ریبوت سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔒</div>
        <h3>۴۳. پشتیبانی از Vision Flow (xtls-rprx-vision)</h3>
        <p>استفاده از جدیدترین تکنولوژی Vision Flow در ارتباطات TCP Reality جهت جلوگیری از شناسایی الگوهای ترافیکی.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔎</div>
        <h3>۴۴. قابلیت Sniffing ترافیک</h3>
        <p>فعال‌سازی Sniffing هوشمند برای پروتکل‌های HTTP، TLS و QUIC جهت مسیریابی صحیح دامنه‌ها.</p>
      </div>
      <div class="card">
        <div class="card-icon">🚦</div>
        <h3>۴۵. سیستم روتینگ هوشمند کلاینت</h3>
        <p>هدایت مستقیم سایت‌های ایرانی (GeoIP / GeoSite) بدون عبور از فیلتر در فایل JSON کلاینت.</p>
      </div>
      <div class="card">
        <div class="card-icon">📋</div>
        <h3>۴۶. صدور گواهی و کلیدهای Short ID امن</h3>
        <p>تولید مقادیر تصادفی هگزادسیمال ۸ کاراکتری برای شناسه کوتاه Reality (ShortId).</p>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>۴۷. سرعت بالا با کمترین مصرف منابع پردازنده</h3>
        <p>مصرف کمتر از ۳۰ مگابایت رم برای اجرای سرویس کامل Xray-core و Node Agent در VPS.</p>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>۴۸. مدیریت متمرکز و دانلود آسان کلاینت‌ها</h3>
        <p>صفحه اختصاصی دانلود متصل به آخرین انتشار GitHub Release با پشتیبانی از فرمت‌های EXE, APK, ZIP, TAR.GZ.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۴۹. سیاست حریم خصوصی Zero-Log</h3>
        <p>عدم ذخیره‌سازی هیچ‌گونه داده یا تاریخچه از سایت‌های بازدید شده توسط کاربران.</p>
      </div>
      <div class="card">
        <div class="card-icon">✨</div>
        <h3>۵۰. تجربه کاربری یکپارچه و مدرن فارسی</h3>
        <p>طراحی تمام بخش‌های وب‌سایت، پنل مدیریت، خط فرمان و کلاینت‌ها با زبان مادری فارسی و ساختار RTL.</p>
      </div>
    </div>
  `;
  return renderPage({ title: "۵۰ قابلیت واقعی سامانه (Xray Core)", currentPath: "/features", content });
}

export function renderServersPage(nodes = []) {
  let nodesHtml = '';
  if (nodes.length === 0) {
    nodesHtml = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">در حال بارگذاری سرورها...</p>';
  } else {
    nodesHtml = nodes.map(n => {
      const isOnline = n.status === 'online';
      return `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">${n.flag || '🌐'}</span>
              <h3 style="margin: 0;">${n.name}</h3>
            </div>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: ${isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${isOnline ? '#34d399' : '#f87171'}; border: 1px solid ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: ${isOnline ? '#34d399' : '#f87171'};"></span>
              ${isOnline ? 'فعال و آنلاین' : 'آفلاین (در انتظار اتصال Node Agent)'}
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            <div>دیتاسنتر: <strong style="color: #fff;">${n.provider || 'Hetzner / Vultr'}</strong></div>
            <div>پورت VLESS: <strong style="color: #fff;">TCP ${n.port}</strong></div>
            <div>تاخیر (Ping): <strong style="color: ${isOnline ? '#34d399' : '#9ca3af'};">${isOnline ? n.latency + ' ms' : '---'}</strong></div>
            <div>بار کاری (Load): <strong style="color: #fff;">${isOnline ? n.load + '%' : '---'}</strong></div>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; font-size: 0.75rem; color: var(--text-sub); display: flex; justify-content: space-between;">
            <span>پروتکل: VLESS + ${n.security === 'reality' ? 'Reality' : 'WS'}</span>
            <span>کاربران متصل: ${n.users_count || 0}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">وضعیت زنده نودهای Xray Core در جهان</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem;">
        سرورهای ابری اختصاصی مستقر در دیتاسنترهای Hetzner، Vultr و OVH. وضعیت واقعی هر نود پس از دریافت هارت‌بیت Agent به آنلاین تغییر می‌یابد.
      </p>
    </div>

    <div class="card-grid">
      ${nodesHtml}
    </div>
  `;
  return renderPage({ title: "وضعیت سرورها (Nodes)", currentPath: "/servers", content });
}

export function renderDownloadsPage() {
  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">دانلود کلاینت‌های اختصاصی VPPRV1 (Xray Core)</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem;">
        دریافت نرم‌افزارهای رسمی و بومی برای انواع پلتفرم‌ها متصل به آخرین انتشار GitHub Release
      </p>
    </div>

    <div class="card-grid">
      <!-- Windows Card -->
      <div class="card" id="windows">
        <div class="card-icon">🪟</div>
        <h3>کلاینت ویندوز (Windows)</h3>
        <p style="margin-bottom: 1rem;">
          توسعه یافته با فریم‌ورک مدرن .NET 8 و Avalonia UI با رابط کامپوننت ۵ وضعیتی، پینگ خودکار و پشتیبانی مستقیم از VLESS Reality.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
          <a href="/api/downloads/VPPRV1-Setup.exe" class="btn btn-primary" style="justify-content: center;">
            📥 دانلود نسخه نصبی (Setup.exe)
          </a>
          <a href="/api/downloads/VPPRV1-Portable.zip" class="btn btn-outline" style="justify-content: center;">
            📦 دانلود نسخه پرتابل (Portable.zip)
          </a>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-sub); margin-top: 0.75rem;">
          نیازمندی: Windows 10 / 11 (64-bit)
        </div>
      </div>

      <!-- Android Card -->
      <div class="card" id="android">
        <div class="card-icon">📱</div>
        <h3>کلاینت اندروید (Android)</h3>
        <p style="margin-bottom: 1rem;">
          اپلیکیشن بومی با زبان Kotlin و استفاده از Android VpnService، مجهز به تست پینگ و پشتیبانی از اتصالات VLESS.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
          <a href="/api/downloads/VPPRV1.apk" class="btn btn-primary" style="justify-content: center;">
            📥 دانلود مستقیم فایل نصب (APK)
          </a>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-sub); margin-top: 0.75rem;">
          نیازمندی: Android 8.0 به بالا (تست‌شده تا Android 14)
        </div>
      </div>

      <!-- Linux Card -->
      <div class="card" id="linux">
        <div class="card-icon">🐧</div>
        <h3>کلاینت خط فرمان لینوکس (Linux CLI)</h3>
        <p style="margin-bottom: 1rem;">
          ابزار ترمینال سبک با دستورات فارسی برای تمامی توزیع‌های اوبونتو، دبیان، فدورا و آرچ با پشتیبانی از VLESS.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
          <a href="/api/downloads/VPPRV1-Linux.tar.gz" class="btn btn-primary" style="justify-content: center;">
            📥 دانلود بسته لینوکس (tar.gz)
          </a>
        </div>
        <div class="code-box" style="margin-top: 0.75rem; font-size: 0.8rem;">
          curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/clients/linux/install.sh | bash
        </div>
      </div>
    </div>

    <!-- Compatible VLESS Clients -->
    <div style="margin-top: 3.5rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem;">
      <h3 style="font-size: 1.3rem; margin-bottom: 0.75rem; color: #fff;">استفاده از سایر کلاینت‌های استاندارد VLESS</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.5rem;">
        کانفیگ‌های تولید شده توسط VPPRV1 کاملاً استاندارد بوده و با تمامی نرم‌افزارهای مطرح جهان مانند v2rayN (Windows)، v2rayNG (Android)، Sing-box، Nekoray و Streisand (iOS/macOS) سازگار هستند.
      </p>
    </div>
  `;
  return renderPage({ title: "دانلود کلاینت‌ها", currentPath: "/downloads", content });
}

export function renderGuidePage() {
  const content = `
    <div style="max-width: 850px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff; text-align: center;">راهنمای گام‌به‌گام اتصال به VLESS (VPPRV1)</h1>
      <p style="color: var(--text-muted); text-align: center; margin-bottom: 3rem;">
        آموزش دریافت اشتراک، راه‌اندازی در کلاینت‌های اختصاصی و وارد کردن در نرم‌افزارهای استاندارد
      </p>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام اول: دریافت کانفیگ اختصاصی VLESS</h3>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">
            با کلیک بر روی دکمه "دریافت کانفیگ VLESS" در بالای سایت، سیستم بلافاصله یک UUID امن برای شما تولید کرده و لینک اشتراک اختصاصی ارائه می‌دهد.
          </p>
          <div class="code-box">
            https://vpprv1.workers.dev/api/v1/sub/&lt;TOKEN&gt;
          </div>
        </div>

        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام دوم: ساختار لینک VLESS Reality</h3>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">
            خروجی لینک به صورت استاندارد با امنیت Reality و شبیه‌سازی SNI معتبر صادر می‌شود:
          </p>
          <div class="code-box">
            vless://&lt;UUID&gt;@de1.vpprv1.net:443?type=tcp&security=reality&pbk=...&sni=www.microsoft.com&flow=xtls-rprx-vision#VPPRV1-Germany
          </div>
        </div>

        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام سوم: وارد کردن در نرم‌افزار</h3>
          <p style="color: var(--text-muted); line-height: 1.8;">
            ۱. لینک <code>vless://...</code> کپی شده را در کلیپ‌بورد خود داشته باشید.<br>
            ۲. در نرم‌افزارهایی مثل v2rayN یا v2rayNG، گزینه <strong>Import config from clipboard</strong> را انتخاب کنید.<br>
            ۳. دکمه اتصال را بزنید تا ارتباط با سرور Xray برقرار گردد.
          </p>
        </div>
      </div>
    </div>
  `;
  return renderPage({ title: "راهنمای اتصال", currentPath: "/guide", content });
}

export function renderPrivacyPage() {
  const content = `
    <div style="max-width: 850px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">سیاست حفظ حریم خصوصی (Privacy Policy)</h1>
      <p style="color: var(--text-muted); margin-bottom: 2.5rem;">تعهد ما به امنیت، عدم ثبت لاگ فعالیت‌ها و شفافیت فنی</p>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۱. خط مشی عدم ثبت اطلاعات ترافیکی (Zero-Log Policy)</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          سامانه VPPRV1 هیچ‌گونه اطلاعاتی از وب‌سایت‌های بازدید شده، بسته‌های داده عبوری، درخواست‌های DNS یا فعالیت‌های آنلاین کاربران را ثبت، ذخیره یا پردازش نمی‌کند.
        </p>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۲. عدم نیاز به هویت یا ایمیل شخصی</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          صدور کانفیگ‌ها در VPPRV1 بر پایه UUIDهای تصادفی انجام می‌شود و هیچ اطلاعات هویتی نظیر شماره همراه یا ایمیل برای استفاده ضروری نیست.
        </p>
      </div>
    </div>
  `;
  return renderPage({ title: "سیاست حریم خصوصی", currentPath: "/privacy", content });
}

export function renderTermsPage() {
  const content = `
    <div style="max-width: 850px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">قوانین و شرایط استفاده (Terms of Service)</h1>
      <p style="color: var(--text-muted); margin-bottom: 2.5rem;">اصول و تعهدات بهره‌برداری از خدمات شبکه VPPRV1</p>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۱. استفاده مجاز و قانونی</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          استفاده از شبکه تنها به منظور حفظ حریم خصوصی و امنیت ارتباطات مجاز بوده و هرگونه اقدام مخرب، ارسال اسپم یا حملات سایبری ممنوع است.
        </p>
      </div>
    </div>
  `;
  return renderPage({ title: "قوانین و شرایط", currentPath: "/terms", content });
}

export function renderAboutPage() {
  const content = `
    <div style="max-width: 850px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">درباره پروژه VPPRV1</h1>
      <p style="color: var(--text-muted); margin-bottom: 2.5rem;">سامانه جامع، واقعی و متن‌باز مدیریت تونل‌های Xray Core & VLESS</p>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.75rem;">معماری مهندسی و مدرن</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          پروژه VPPRV1 با معماری توزیع‌شده طراحی شده است:
        </p>
        <ul style="margin: 1rem 1.5rem; color: var(--text-muted); line-height: 2;">
          <li><strong>Cloudflare Workers:</strong> مدیریت APIها، توکن‌ها و داشبورد کنترل.</li>
          <li><strong>Cloudflare D1:</strong> پایگاه داده توزیع‌شده برای ثبت نودها و کاربران.</li>
          <li><strong>Node Agent & Xray Core:</strong> اجرای واقعی هسته Xray بر روی سرورهای ابری Hetzner, Vultr, OVH.</li>
          <li><strong>کلاینت‌های اختصاصی:</strong> ویندوز، اندروید و لینوکس با رابط کاملاً فارسی.</li>
        </ul>
      </div>
    </div>
  `;
  return renderPage({ title: "درباره ما", currentPath: "/about", content });
}
