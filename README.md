<div dir="rtl" align="right">

# VPPRV1 — VPN Project Preview V1

پلتفرم فارسی و RTL برای مدیریت زیرساخت واقعی **WireGuard**؛ شامل وب‌سایت، پنل مدیریت، API روی Cloudflare Workers و پایگاه‌داده D1.

> **شفافیت فنی:** Cloudflare Workers اتصال UDP و WireGuard server ارائه نمی‌کند؛ پس Worker لایه کنترل (Control Plane) است. برای عبور واقعی ترافیک حداقل یک VPS عمومی با WireGuard لازم است. تا وقتی نود VPN ثبت و provision نشده، رابط هیچ اتصال نمایشی را به‌عنوان VPN واقعی معرفی نمی‌کند.

## استقرار یک‌کلیکی Cloudflare

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/amingangmanatgh2-hash/VPPRV1)

در Cloudflare یک D1 با نام `vpprv1-db` بسازید، شناسه آن را جایگزین `REPLACE_WITH_D1_DATABASE_ID` در `wrangler.jsonc` کنید و migration را اعمال کنید. Workflow آماده `.github/workflows/cloudflare.yml` با Secretهای `CLOUDFLARE_API_TOKEN` و `CLOUDFLARE_ACCOUNT_ID` نیز قابل اجراست.

## امکانات واقعی فعلی

- وب‌سایت Premium، واکنش‌گرا، فارسی و RTL
- پنل `/panel` با login، session هشت‌ساعته و PBKDF2-SHA256 (۲۱۰٬۰۰۰ دور)
- مدیریت سرور و API آماده برای نود، کاربر، اشتراک، کانفیگ و نسخه
- انتخاب خودکار سرور فعال براساس `latency + load × 2`
- Cloudflare Worker + D1، migration و API سلامت
- عدم ذخیره private key؛ دیتابیس فقط public key همتا را می‌پذیرد
- صفحه دانلود متصل به جدول Release؛ فایل منتشرنشده نمایش داده نمی‌شود
- PWA فارسی قابل نصب و GitHub Actions برای تست و Deploy

## API

| مسیر | دسترسی | کاربرد |
|---|---|---|
| `GET /api/health` | عمومی | سلامت Worker و D1 |
| `GET /api/public/servers` | عمومی | سرورهای فعال |
| `GET /api/public/best-server` | عمومی | بهترین سرور |
| `GET /api/public/releases` | عمومی | دانلودهای رسمی |
| `POST /api/auth/bootstrap` | فقط یک‌بار | ساخت اولین مدیر |
| `POST /api/auth/login` | عمومی | دریافت session |
| `GET /api/dashboard` | مدیر | آمار پنل |
| `/api/servers` | مدیر | CRUD سرورها |

نمونه راه‌اندازی مدیر (فقط یک بار و با رمز حداقل ۱۲ نویسه):

```bash
curl -X POST https://YOUR-WORKER.workers.dev/api/auth/bootstrap \
  -H 'content-type: application/json' \
  -d '{"email":"admin@example.com","password":"A-VERY-LONG-UNIQUE-PASSWORD"}'
```

## توسعه و تست

```bash
npm ci
npm run db:local
npm test
npm run build
npm run dev
```

## ساختار

- `public/` وب‌سایت، PWA و پنل
- `worker/` Backend و API
- `migrations/` schema پایگاه‌داده D1
- `clients/` مشخصات و کلاینت‌های بومی (در حال تکمیل)
- `docs/` معماری و مدل امنیتی
- `.github/workflows/` تست و استقرار خودکار

## امنیت

Secret، token، رمز، private key و کانفیگ WireGuard در Git نگهداری نمی‌شود. کلید خصوصی باید در client تولید و در Keystore/DPAPI سیستم‌عامل ذخیره شود. PAT ارسال‌شده در گفتگو باید فوراً از GitHub حذف (revoke) شود؛ پروژه از credential امن محیط Arena استفاده می‌کند و آن PAT را ذخیره یا استفاده نمی‌کند.

## وضعیت کلاینت‌ها

قرارداد API و طراحی Control Plane آماده است، اما فایل‌های `VPPRV1-Setup.exe`، `VPPRV1.apk` و بسته لینوکس بدون toolchain امضا و کلیدهای code-signing معتبر ساخته نشده‌اند و عمداً لینک جعلی ندارند. برای VPN قابل انتشار در Google Play، پیاده‌سازی Android باید از `VpnService`، disclosure روشن و سیاست Data Safety استفاده کند. تولید artifact امضاشده در Release نیازمند secretهای signing مالک پروژه است.

## مجوز

MIT — نام WireGuard علامت تجاری صاحبان آن است.

</div>
