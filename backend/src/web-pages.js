// VPPRV1 Website Pages Content (Farsi RTL)
import { renderPage } from './web-templates.js';

export function renderHomePage() {
  const content = `
    <section class="hero">
      <div class="hero-badge">
        <span class="pulse-dot"></span> نسل جدید شبکه اختصاصی مجازی WireGuard X25519
      </div>
      <h1>اینترنت آزاد، امن و پرسرعت<br>با فناوری نوین تفکیک ترافیک</h1>
      <p>
        سامانه VPPRV1 مجهز به هسته کریپتوگرافی X25519، پروتکل مدرن WireGuard، پورت ۴۴۳ و مسیریابی هوشمند نت ملی (Split Tunneling) بدون افت کیفیت و پینگ.
      </p>
      <div class="hero-actions">
        <button onclick="quickProvision()" class="btn btn-primary" style="font-size: 1.05rem; padding: 0.8rem 1.75rem;">
          ⚡ دریافت اشتراک آنی (.conf)
        </button>
        <a href="/downloads" class="btn btn-outline" style="font-size: 1.05rem; padding: 0.8rem 1.75rem;">
          📥 دانلود کلاینت‌ها (Windows / Android / Linux)
        </a>
      </div>
    </section>

    <div style="margin-top: 3rem; text-align: center;">
      <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff;">چرا VPPRV1 انتخاب متمایز است؟</h2>
      <p style="color: var(--text-muted);">زیرساخت غیرمتمرکز، رمزنگاری کوانتوم‌پایدار، و تطبیق کامل با شرایط اینترنت ایران</p>
    </div>

    <div class="card-grid">
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>پروتکل فوق‌سریع WireGuard</h3>
        <p>بهره‌گیری از هسته سبک و مدرن وایرگارد با مصرف بهینه باتری، حداقل تاخیر (Latency) و عبور از UDP Port 443 برای پایداری حداکثری.</p>
      </div>

      <div class="card">
        <div class="card-icon">🇮🇷</div>
        <h3>مسیریابی هوشمند نت ملی (Split Tunnel)</h3>
        <p>ترافیک سایت‌ها، بانک‌ها و خدمات دولتی ایران به صورت مستقیم و بدون عبور از VPN باز می‌شود و تنها ترافیک بین‌الملل رمزگذاری می‌گردد.</p>
      </div>

      <div class="card">
        <div class="card-icon">🔒</div>
        <h3>امنیت منحنی بیضوی X25519 & PSK</h3>
        <p>تولید کلیدهای اختصاصی X25519 در کنار کلید مشترک پیش‌فرض (PresharedKey 32-byte) برای مقاومت کامل در برابر حملات رمزگشایی.</p>
      </div>

      <div class="card">
        <div class="card-icon">🌍</div>
        <h3>شبکه ابری سرورهای جهانی</h3>
        <p>سرورهای پرسرعت در ۱۱ نقطه کلیدی دنیا شامل آلمان، هلند، آمریکا، فرانسه، ترکیه، امارات، سنگاپور، ژاپن و ایران.</p>
      </div>

      <div class="card">
        <div class="card-icon">🖥️</div>
        <h3>کلاینت‌های بومی اختصاصی</h3>
        <p>نرم‌افزارهای دسکتاپ ویندوز (.NET 8 Avalonia)، اپلیکیشن موبایل اندروید (Kotlin VpnService) و کلاینت خط فرمان لینوکس.</p>
      </div>

      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>سیاست حریم خصوصی Zero-Log</h3>
        <p>هیچ لاگ یا داده‌ای از ترافیک عبوری کاربران ذخیره نمی‌شود و سیستم بدون هویت شخصی (Provision ناشناس) کار می‌کند.</p>
      </div>
    </div>

    <section style="margin-top: 4rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 2.5rem; text-align: center;">
      <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">اتصال مستقیم در ۳ ثانیه</h3>
      <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto 1.5rem auto;">
        بدون نیاز به ثبت نام یا ایمیل، دکمه زیر را بزنید تا کلید اختصاصی WireGuard شما تولید و فایل <code>.conf</code> بلافاصله تحویل داده شود.
      </p>
      <button onclick="quickProvision()" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1rem;">
        دریافت فوری کانفیگ وایرگارد
      </button>
    </section>
  `;
  return renderPage({ title: "صفحه اصلی", currentPath: "/", content });
}

export function renderFeaturesPage() {
  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">۵۰ قابلیت واقعی و پیاده‌سازی شده در VPPRV1</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem;">
        تمامی موارد زیر به صورت واقعی در کدهای Backend، Node Agent، کلاینت‌های Windows/Android/Linux و پنل مدیریت پروژه پیاده‌سازی شده‌اند و هیچ قابلیت ساختگی وجود ندارد.
      </p>
    </div>

    <div class="card-grid">
      <!-- بخش ۱: هسته و کریپتوگرافی -->
      <div class="card">
        <div class="card-icon">🔑</div>
        <h3>۱. تولید کلید واقعی X25519 Curve</h3>
        <p>تولید کلیدهای عمومی و خصوصی مبتنی بر منحنی 25519 استاندارد برای دست‌تکانی امن پروتکل WireGuard.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۲. کلیدهای اشتراکی PresharedKey (PSK)</h3>
        <p>پشتیبانی کامل از لایه امنیتی کوانتومی ۳۲ بایتی در تمام کانفیگ‌های خروجی و ثبت همزمان در Peer سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>۳. معماری Cloudflare Workers Edge</h3>
        <p>اجرای بدون سرور (Serverless) در بیش از ۳۰۰ دیتاسنتر کلودفلر در سراسر جهان با کمترین تاخیر در پاسخگویی.</p>
      </div>
      <div class="card">
        <div class="card-icon">💾</div>
        <h3>۴. پایگاه داده توزیع‌شده Cloudflare D1</h3>
        <p>استفاده از SQLite توزیع‌شده D1 برای ذخیره‌سازی ایزوله و تراکنشی اطلاعات سرورها، کاربران، سابسکریپشن‌ها و لاگ‌ها.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚙️</div>
        <h3>۵. سازگاری رسمی با هسته WireGuard</h3>
        <p>تولید خروجی‌های کاملاً منطبق با ساختار استاندارد WireGuard .conf بدون نیاز به تغییر در کلاینت‌های رسمی.</p>
      </div>

      <!-- بخش ۲: نت ملی و تفکیک ترافیک -->
      <div class="card">
        <div class="card-icon">🇮🇷</div>
        <h3>۶. پارامتر هوشمند Split Tunnel (?mode=split)</h3>
        <p>سوئیچ خودکار بین حالت Full Tunnel و Split Tunnel تنها با ارسال یک پارامتر در آدرس API اشتراک.</p>
      </div>
      <div class="card">
        <div class="card-icon">🌐</div>
        <h3>۷. محاسبه ریاضی AllowedIPs تفکیکی</h3>
        <p>محاسبه معکوس رنج‌های IPv4 بین‌المللی برای اطمینان از خروج مستقیم رنج‌های IP ایران از اینترنت ISP کاربر.</p>
      </div>
      <div class="card">
        <div class="card-icon">🎯</div>
        <h3>۸. پورت استاندارد UDP 443</h3>
        <p>انتقال ترافیک WireGuard روی پورت امن ۴۴۳ برای عبور بهینه از فایروال‌ها و محدودیت‌های پورت شبکه.</p>
      </div>
      <div class="card">
        <div class="card-icon">📏</div>
        <h3>۹. تنظیم MTU حداکثر ۱۳۳۰</h3>
        <p>کاهش اندازه MTU به ۱۳۳۰ جهت جلوگیری از پکت فرگمنتیشن (Packet Fragmentation) در اپراتورهای همراه و ثابت ایران.</p>
      </div>
      <div class="card">
        <div class="card-icon">✏️</div>
        <h3>۱۰. ویرایش زنده CIDRهای ایران بدون Deploy</h3>
        <p>امکان تغییر و به‌روزرسانی رنج‌های IP ایران مستقیماً از داخل پنل مدیریت بدون نیاز به استقرار مجدد کد.</p>
      </div>

      <!-- بخش ۳: Node Agent و سرورها -->
      <div class="card">
        <div class="card-icon">🤖</div>
        <h3>۱۱. نود ایجنت سبک و خودکار (Node Agent)</h3>
        <p>اسکریپت پایتون ماژولار و سبک جهت مدیریت لحظه‌ای سرور لینوکس، همگام‌سازی Peerها و پیکربندی شبکه.</p>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>۱۲. نصب خودکار پیش‌نیازهای WireGuard در لینوکس</h3>
        <p>تشخیص خودکار توزیع‌های اوبونتو، دبیان، سنت‌او‌اس و نصب ابزارهای <code>wireguard</code> و <code>iptables</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔀</div>
        <h3>۱۳. فعال‌سازی خودکار IP Forwarding</h3>
        <p>تنظیم دائمی <code>net.ipv4.ip_forward=1</code> در کرنل لینوکس جهت برقراری روتینگ بین اینترفیس‌ها.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔥</div>
        <h3>۱۴. پیکربندی خودکار NAT و فایروال Iptables</h3>
        <p>اعمال قواعد MASQUERADE روی اینترفیس خروجی شبکه به شکل خودکار در زمان استارت سرویس.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔄</div>
        <h3>۱۵. همگام‌سازی دوطرفه Peerها (Sync Engine)</h3>
        <p>دریافت لیست Peerهای فعال از Backend و اعمال آنی روی جدول اینترفیس wg0 با دستورات <code>wg set</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">🗑️</div>
        <h3>۱۶. حذف واقعی و بلادرنگ Peerهای منقضی</h3>
        <p>تشخیص Peerهای غیرفعال یا حذف‌شده از پنل و اجرای دستور <code>wg set wg0 peer &lt;KEY&gt; remove</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">💓</div>
        <h3>۱۷. ارسال گزارش وضعیت دوره‌ای (هر ۶۰ ثانیه)</h3>
        <p>ارسال هارت‌بیت دوره‌ای شامل Load میانگین، حافظه رم، ترافیک ورودی/خروجی و تعداد کلاینت‌های آنلاین.</p>
      </div>
      <div class="card">
        <div class="card-icon">📊</div>
        <h3>۱۸. سنجش دقیق لود پردازنده و رم سرور</h3>
        <p>محاسبه میزان بار کاری سرور از فایل <code>/proc/loadavg</code> و <code>/proc/meminfo</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">⏱️</div>
        <h3>۱۹. اندازه‌گیری واقعی Latency سرور</h3>
        <p>سنجش پینگ و تاخیر شبکه نسبت به DNS و گیت‌وی‌های بالادست به صورت میلی‌ثانیه.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۲۰. احراز هویت امن با توکن Timing-Safe</h3>
        <p>استفاده از الگوریتم مقایسه با زمان ثابت جهت جلوگیری کامل از حملات تحلیل زمانی (Timing Attacks) در Agent.</p>
      </div>

      <!-- بخش ۴: امنیت و احراز هویت -->
      <div class="card">
        <div class="card-icon">🔐</div>
        <h3>۲۱. هش کلمه عبور با PBKDF2 (۱۰۰,۰۰۰ دور)</h3>
        <p>رمزگذاری کلمات عبور ادمین با تابع استاندارد PBKDF2 و ۱۰۰ هزار تکرار همراه با نمک (Salt) تصادفی ۱۶ بایتی.</p>
      </div>
      <div class="card">
        <div class="card-icon">🎟️</div>
        <h3>۲۲. مدیریت نشست امن با HMAC-SHA256 Token</h3>
        <p>امضای رمزشده کوکی‌های Session با الگوریتم HMAC-SHA256 و کلید رمزنگاری محرمانه سمت سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">⏳</div>
        <h3>۲۳. انقضای خودکار نشست (Session Expiration)</h3>
        <p>بررسی تاریخ انقضا (TTL ۲۴ ساعته) در هر درخواست و باطل‌سازی خودکار سشن‌های منقضی‌شده.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛑</div>
        <h3>۲۴. محدودساز نرخ درخواست (Rate Limit) بر اساس IP</h3>
        <p>جلوگیری از حملات Brute Force در صفحه لاگین و جلوگیری از اسپم در متد صدور آنی Provision.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>۲۵. پیشگیری از تزریق پایگاه داده (SQL Injection)</h3>
        <p>استفاده انحصاری از Prepared Statements و متغیرهای مقید (Binding) در تمامی کوئری‌های D1.</p>
      </div>
      <div class="card">
        <div class="card-icon">🧼</div>
        <h3>۲۶. پاکسازی ورودی‌ها و جلوگیری از XSS</h3>
        <p>اعتبارسنجی و فیلتراسیون کامل داده‌های ورودی قبل از رندر شدن در پنل مدیریت.</p>
      </div>
      <div class="card">
        <div class="card-icon">🙈</div>
        <h3>۲۷. ایزوله‌سازی کلید خصوصی کلاینت</h3>
        <p>عدم نمایش یا افشای کلیدهای خصوصی در لاگ‌ها و درخواست‌های عمومی کلاینت‌ها.</p>
      </div>
      <div class="card">
        <div class="card-icon">🌱</div>
        <h3>۲۸. راه‌اندازی و Seed اولیه ۱۱ سرور پیش‌فرض</h3>
        <p>ایجاد خودکار سرورهای آمریکا، آلمان، هلند، انگلیس، فرانسه، ترکیه، امارات، سنگاپور، ژاپن و ایران با وضعیت اولیه‌ی واقعی Offline.</p>
      </div>
      <div class="card">
        <div class="card-icon">📋</div>
        <h3>۲۹. لاگ‌برداری ساختاریافته وقایع سیستم</h3>
        <p>ثبت خطاهای دسترسی، احراز هویت‌های ناموفق و رویدادهای سیستمی در جدول Logs پایگاه داده.</p>
      </div>
      <div class="card">
        <div class="card-icon">🚫</div>
        <h3>۳۰. عدم انتشار Secretها در گیت‌هاب (.gitignore)</h3>
        <p>پیکربندی کامل فایل .gitignore جهت ممانعت از ارسال فایل‌های حاوی رمز یا کلیدهای امنیتی به ریپازیتوری.</p>
      </div>

      <!-- بخش ۵: پنل ادمین -->
      <div class="card">
        <div class="card-icon">🎛️</div>
        <h3>۳۱. داشبورد مانیتورینگ Dark Premium فارسی</h3>
        <p>طراحی مدرن تیره با تم سبز/فیروزه‌ای، کاملاً راست‌چین و انیمیشن‌های نرم برای پایش کلیه منابع.</p>
      </div>
      <div class="card">
        <div class="card-icon">🖥️</div>
        <h3>۳۲. مدیریت کامل سرورها (افزودن / ویرایش / حذف)</h3>
        <p>پنل مدیریت جامع مشخصات سرورها، آدرس‌ها، پورت‌ها و کلیدهای عمومی وایرگارد.</p>
      </div>
      <div class="card">
        <div class="card-icon">📋</div>
        <h3>۳۳. تولید دستور یک‌خطی نصب Node Agent</h3>
        <p>امکان کپی مستقیم دستور نصب و راه‌اندازی ایجنت به همراه توکن اختصاصی برای هر سرور.</p>
      </div>
      <div class="card">
        <div class="card-icon">👥</div>
        <h3>۳۴. مدیریت اشتراک‌ها و کاربران</h3>
        <p>مشاهده وضعیت اشتراک‌های فعال، ترافیک، توکن‌ها و امکان مسدودسازی فوری هر کاربر.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔍</div>
        <h3>۳۵. پایش زنده وضعیت Peerها و سشن‌ها</h3>
        <p>مشاهده دقیق تمام Peerهای متصل به همراه کلید عمومی و آدرس IP اختصاص داده شده.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚙️</div>
        <h3>۳۶. تنظیمات پیشرفته سیستم و پارامترها</h3>
        <p>امکان تغییر رنج آی‌پی‌های اختصاصی، پیش‌فرض DNS و رنج CIDRهای اختصاصی تفکیک ترافیک.</p>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>۳۷. مدیریت نسخه‌های منتشر شده و لینک‌های دانلود</h3>
        <p>پنل اختصاصی ثبت و مدیریت نسخه‌های کلاینت‌های مختلف سیستم.</p>
      </div>
      <div class="card">
        <div class="card-icon">📱</div>
        <h3>۳۸. رابط کاربری واکنش‌گرا و سازگار با موبایل</h3>
        <p>نمایش استاندارد پنل مدیریت در نمایشگرهای موبایل، تبلت و دسکتاپ.</p>
      </div>

      <!-- بخش ۶: کلاینت‌ها -->
      <div class="card">
        <div class="card-icon">🪟</div>
        <h3>۳۹. کلاینت دسکتاپ ویندوز با .NET 8 و Avalonia</h3>
        <p>برنامه مدرن کراس‌پلتفرم ویندوز با رابط کاربری فارسی و گرافیک برداری روان.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔘</div>
        <h3>۴۰. دکمه اتصال ۵ وضعیتی و انیمیشن Pulse</h3>
        <p>مدیریت دقیق وضعیت‌های قطع، بررسی، اتصال، متصل و قطع‌شدن همراه با انیمیشن پالس بصری.</p>
      </div>
      <div class="card">
        <div class="card-icon">📶</div>
        <h3>۴۱. انتخاب خودکار بهترین سرور بر اساس Ping</h3>
        <p>سنجش تاخیر شبکه تمامی سرورها و سوئیچ هوشمند روی پایدارترین سرور با کمترین Latency.</p>
      </div>
      <div class="card">
        <div class="card-icon">⏱️</div>
        <h3>۴۲. نمایش زمان اتصال و اعداد به فارسی</h3>
        <p>تایمر زنده مدت برقراری تونل با فرمت‌بندی اعداد به خط و الفبای فارسی.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔄</div>
        <h3>۴۳. قابلیت Reconnect خودکار هنگام تغییر حالت</h3>
        <p>قطع امن و برقراری مجدد تونل با کانفیگ جدید در صورت سوئیچ کاربر به حالت نت ملی.</p>
      </div>
      <div class="card">
        <div class="card-icon">💿</div>
        <h3>۴۴. نصاب ویندوز NSIS به همراه نسخه Portable</h3>
        <p>تولید خروجی نصاب رسمی با قابلیت حذف (Uninstall) کامل و نسخه بدون نیاز به نصب (Portable ZIP).</p>
      </div>
      <div class="card">
        <div class="card-icon">🤖</div>
        <h3>۴۵. اپلیکیشن اندروید نیتیو (Kotlin VpnService)</h3>
        <p>پیاده‌سازی مبتنی بر استاندارد Android VpnService با پشتیبانی از پروتکل وایرگارد و ساخت فایل APK.</p>
      </div>
      <div class="card">
        <div class="card-icon">🐧</div>
        <h3>۴۶. کلاینت خط فرمان لینوکس (CLI فارسی)</h3>
        <p>ابزار ترمینال لینوکس با دستورات فارسی و سوییچ‌های <code>vpprv1 connect</code> و <code>vpprv1 connect --melli</code>.</p>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>۴۷. بسته قابل استقرار VPPRV1-Linux.tar.gz</h3>
        <p>بسته‌بندی کامل باینری و اسکریپت نصب یک‌خطی جهت راه‌اندازی سریع در کلیه توزیع‌های لینوکس.</p>
      </div>

      <!-- بخش ۷: استقرار و CI/CD -->
      <div class="card">
        <div class="card-icon">🚀</div>
        <h3>۴۸. خط لوله GitHub Actions CI/CD چندگانه</h3>
        <p>ورک‌فلوهای خودکار برای تست، بیلد ویندوز، اندروید، لینوکس و استقرار به Cloudflare Workers.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>۴۹. مدیریت امن Secrets در خطوط CI/CD</h3>
        <p>استفاده از متغیرهای ایمن Keystore اندروید و Cloudflare بدون ذخیره هیچ توکن محرمانه‌ای در سورس‌کد.</p>
      </div>
      <div class="card">
        <div class="card-icon">📚</div>
        <h3>۵۰. مستندات کامل فارسی و راهنمای تفصیلی</h3>
        <p>مستندات شفاف فارسی در فایل‌های <code>README.md</code>، <code>docs/FEATURES.md</code> و صفحات وب.</p>
      </div>
    </div>
  `;
  return renderPage({ title: "۵۰ قابلیت واقعی سامانه", currentPath: "/features", content });
}

export function renderServersPage(servers = []) {
  let serversHtml = '';
  if (servers.length === 0) {
    serversHtml = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">در حال بارگذاری سرورها...</p>';
  } else {
    serversHtml = servers.map(s => {
      const isOnline = s.status === 'online';
      return `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">${s.flag || '🌐'}</span>
              <h3 style="margin: 0;">${s.name}</h3>
            </div>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: ${isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${isOnline ? '#34d399' : '#f87171'}; border: 1px solid ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: ${isOnline ? '#34d399' : '#f87171'};"></span>
              ${isOnline ? 'فعال و آنلاین' : 'آفلاین (در انتظار اتصال VPS)'}
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            <div>هاست: <strong style="color: #fff; direction: ltr; display: inline-block;">${s.host}</strong></div>
            <div>پورت: <strong style="color: #fff;">UDP ${s.port}</strong></div>
            <div>تاخیر (Ping): <strong style="color: ${isOnline ? '#34d399' : '#9ca3af'};">${isOnline ? s.latency + ' ms' : '---'}</strong></div>
            <div>بار کاری (Load): <strong style="color: #fff;">${isOnline ? s.load + '%' : '---'}</strong></div>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; font-size: 0.75rem; color: var(--text-sub); display: flex; justify-content: space-between;">
            <span>پروتکل: WireGuard X25519</span>
            <span>تعداد Peerها: ${s.peers_count || 0}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">وضعیت زنده سرورهای جهانی VPPRV1</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem;">
        شبکه جهانی ما متشکل از نودهای پرسرعت در نقاط استراتژیک است. تا زمانی که نود ایجنت واقعی به سرور متصل نشود، وضعیت به صورت آفلاین نمایش داده می‌شود.
      </p>
    </div>

    <div class="card-grid">
      ${serversHtml}
    </div>
  `;
  return renderPage({ title: "وضعیت سرورها", currentPath: "/servers", content });
}

export function renderDownloadsPage(downloads = []) {
  const content = `
    <div style="text-align: center; max-width: 800px; margin: 0 auto 3rem auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff;">دانلود کلاینت‌های اختصاصی VPPRV1</h1>
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
          توسعه یافته با فریم‌ورک مدرن .NET 8 و Avalonia UI با رابط کامپوننت ۵ وضعیتی، پینگ خودکار و سوئیچ نت ملی.
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
          اپلیکیشن بومی با زبان Kotlin و استفاده از Android VpnService، مجهز به تست پینگ و سوئیچ حالت Split Tunneling.
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
          ابزار ترمینال سبک با دستورات فارسی برای تمامی توزیع‌های اوبونتو، دبیان، فدورا و آرچ.
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

    <!-- Official WireGuard Clients -->
    <div style="margin-top: 3.5rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem;">
      <h3 style="font-size: 1.3rem; margin-bottom: 0.75rem; color: #fff;">استفاده از نرم‌افزار رسمی WireGuard</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.5rem;">
        کانفیگ‌های تولید شده توسط VPPRV1 کامپتیبل با تمام نرم‌افزارهای رسمی WireGuard در iOS، macOS، Windows و Android هستند. کافیست فایل <code>.conf</code> دریافتی را در نرم‌افزار WireGuard وارد (Import) کنید.
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://www.wireguard.com/install/" target="_blank" class="btn btn-outline">
          🔗 صفحه دانلود کلاینت رسمی وایرگارد
        </a>
      </div>
    </div>
  `;
  return renderPage({ title: "دانلود کلاینت‌ها", currentPath: "/downloads", content });
}

export function renderGuidePage() {
  const content = `
    <div style="max-width: 850px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #fff; text-align: center;">راهنمای گام‌به‌گام اتصال به VPPRV1</h1>
      <p style="color: var(--text-muted); text-align: center; margin-bottom: 3rem;">
        آموزش دریافت اشتراک، راه‌اندازی در کلاینت‌های اختصاصی و استفاده از نرم‌افزار رسمی WireGuard
      </p>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام اول: دریافت کانفیگ اختصاصی</h3>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">
            با کلیک بر روی دکمه "دریافت فوری اتصال" در بالای سایت، سیستم بلافاصله یک کلید رمزنگاری X25519 امن برای شما تولید کرده و لینک اشتراک اختصاصی ارائه می‌دهد.
          </p>
          <div class="code-box">
            https://vpprv1.workers.dev/api/v1/sub/&lt;TOKEN&gt;
          </div>
        </div>

        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام دوم: انتخاب حالت اتصال (نت ملی یا عادی)</h3>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">
            اگر می‌خواهید هنگام اتصال به VPN، سایت‌های داخلی ایران مانند بانک‌ها و اسنپ بدون قطعی و با سرعت کامل باز شوند، از حالت <strong>نت ملی (Split Tunnel)</strong> استفاده کنید:
          </p>
          <div class="code-box">
            # حالت نت ملی (IPهای ایران تفکیک شده و از اینترنت مستقیم رد می‌شوند):
            https://vpprv1.workers.dev/api/v1/sub/&lt;TOKEN&gt;?mode=split&port=443

            # حالت عبور کل ترافیک (Full Tunnel):
            https://vpprv1.workers.dev/api/v1/sub/&lt;TOKEN&gt;
          </div>
        </div>

        <div class="card">
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 0.75rem;">گام سوم: وارد کردن در برنامه و اتصال</h3>
          <p style="color: var(--text-muted); line-height: 1.8;">
            ۱. در ویندوز یا اندروید، نرم‌افزار VPPRV1 را باز کنید.<br>
            ۲. دکمه اتصال بزرگ وسط صفحه را فشار دهید تا اتصال در ۵ وضعیت بصری بررسی و فعال شود.<br>
            ۳. در کلاینت رسمی WireGuard، گزینه "Add Tunnel" -> "Import from file or archive" را بزنید و فایل دانلودی <code>vpprv1-&lt;token&gt;.conf</code> را انتخاب نمایید.
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
      <p style="color: var(--text-muted); margin-bottom: 2.5rem;">تعهد ما به امنیت، رمزنگاری و عدم ثبت لاگ فعالیت‌های کاربران</p>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۱. خط مشی عدم ثبت اطلاعات ترافیکی (Zero-Log Policy)</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          سامانه VPPRV1 هیچ‌گونه اطلاعاتی از وب‌سایت‌های بازدید شده، بسته‌های داده عبوری، درخواست‌های DNS یا فعالیت‌های آنلاین کاربران را ثبت، ذخیره یا پردازش نمی‌کند.
        </p>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۲. عدم نیاز به هویت یا ایمیل شخصی</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          صدور کانفیگ‌ها در VPPRV1 بر پایه توکن‌های رمزنگاری تصادفی انجام می‌شود و هیچ اطلاعات هویتی نظیر شماره همراه یا ایمیل برای استفاده ضروری نیست.
        </p>
      </div>

      <div class="card">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۳. رمزنگاری سرتاسری مدرن X25519</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          تمام ترافیک با الگوریتم‌های استاندارد ChaCha20-Poly1305 و منحنی بیضوی Curve25519 به همراه کلیدهای ۳۲ بایتی پیش‌فرض محافظت می‌شوند.
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
          استفاده از شبکه تنها به منظور حفظ حریم خصوصی و امنیت ارتباطات مجاز بوده و هرگونه اقدام مخرب، ارسال اسپم، حملات سایبری (DDoS) یا اقدامات آسیب‌رسان به زیرساخت‌ها ممنوع است.
        </p>
      </div>

      <div class="card">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">۲. پایداری خدمات و شفافیت فنی</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          ما همواره در تلاش برای ارائه بالاترین کیفیت اتصال هستیم. وضعیت آنلاین بودن تمام سرورها به صورت شفاف و بر اساس پایش واقعی هارت‌بیت ایجنت‌ها در صفحه وضعیت سرورها نمایش داده می‌شود.
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
      <p style="color: var(--text-muted); margin-bottom: 2.5rem;">سامانه جامع، واقعی و متن‌باز مدیریت تونل‌های WireGuard</p>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--primary); margin-bottom: 0.75rem;">معماری مهندسی و مدرن</h3>
        <p style="color: var(--text-muted); line-height: 1.8;">
          پروژه VPPRV1 از پایه با هدف ارائه یک راهکار استاندارد و فوق‌سریع برای مدیریت شبکه‌های امن وایرگارد طراحی شده است. معماری سامانه از بخش‌های زیر تشکیل یافته است:
        </p>
        <ul style="margin: 1rem 1.5rem; color: var(--text-muted); line-height: 2;">
          <li><strong>Backend:</strong> هسته ابری Serverless مبتنی بر Cloudflare Workers و دیتابیس توزیع‌شده Cloudflare D1.</li>
          <li><strong>Node Agent:</strong> ایجنت هوشمند لینوکسی برای مدیریت بلادرنگ کرنل، جداول روتینگ و Peerهای WireGuard در VPS.</li>
          <li><strong>کلاینت دسکتاپ:</strong> برنامه بومی ویندوز بر پایه فریم‌ورک قدرتمند .NET 8 و Avalonia UI با رابط کاملاً فارسی.</li>
          <li><strong>کلاینت موبایل:</strong> اپلیکیشن بومی اندروید توسعه داده شده با زبان کاتلین و Android VpnService.</li>
          <li><strong>کلاینت ترمینال:</strong> ابزار خط فرمان لینوکس جهت اتصال فوق‌العاده سریع با یک دستور ساده.</li>
        </ul>
      </div>
    </div>
  `;
  return renderPage({ title: "درباره ما", currentPath: "/about", content });
}
