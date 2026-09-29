# VPPRV1 - سامانه جامع مدیریت و توزیع Xray Core & VLESS

<div align="center">

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/amingangmanatgh2-hash/VPPRV1)

![VPPRV1 Banner](https://img.shields.io/badge/VPPRV1-Xray%20Core%20%7C%20VLESS-10b981?style=for-the-badge)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers%20%2B%20D1-f38020?style=for-the-badge&logo=cloudflare)
![VPS Providers](https://img.shields.io/badge/VPS-Hetzner%20%7C%20Vultr%20%7C%20OVH-06b6d4?style=for-the-badge)

**سامانه جامع، واقعی و پرسرعت مدیریت و توزیع کانفیگ‌های امن VLESS Reality و WebSocket مبتنی بر هسته Xray Core**

[⚡ دپلوی مستقیم ۱-کلیک در داشبورد کلادفلر](https://deploy.workers.cloudflare.com/?url=https://github.com/amingangmanatgh2-hash/VPPRV1) • [امکانات و قابلیت‌ها](docs/FEATURES.md) • [مستندات API](docs/API.md)

</div>

---

## 🚀 معماری سیستم

پروژه **VPPRV1** یک پلتفرم کامل و آماده بهره‌برداری جهت ایجاد، مدیریت و مسیریابی ارتباطات امن VLESS با تفکیک وظایف زیر است:

- **Cloudflare Workers:** به عنوان Backend و API سرورلس جهت صدور اشتراک، احراز هویت ادمین و ارائه وب‌سایت.
- **Cloudflare D1:** پایگاه داده توزیع‌شده جهت نگهداری اطلاعات نودها، کاربران، ترافیک و توکن‌ها.
- **VPSهای واقعی (Hetzner, Vultr, OVH):** اجرای واقعی هسته **Xray Core** و سرویس‌دهی Inboundهای VLESS Reality و VLESS WebSocket.
- **Node Agent:** سرویس پایتونی مقیم روی هر VPS جهت همگام‌سازی لحظه‌ای کاربران فعال، اعمال پیکربندی Inbound و گزارش هارت‌بیت و مصرف ترافیک.
- **Clientها:** کلاینت ویندوز (.NET 8 Avalonia)، اپلیکیشن اندروید (Kotlin VpnService)، خط فرمان لینوکس (CLI) و تمامی کلاینت‌های استاندارد v2ray / Xray.

---

## ⚙️ ویژگی‌های کلیدی

- ⚡ **پروتکل VLESS + TCP Reality:** شبیه‌سازی امن TLS با هویت استاندارد سایت‌های جهانی و عبور پایدار از فایروال.
- 🌐 **پشتیبانی از VLESS + WebSocket:** پایداری و سازگاری با انواع شبکه‌ها.
- 📊 **مدیریت حجم مصرفی و انقضا:** پایش ترافیک آپلود/دانلود و سقف مصرف مجاز برای هر کاربر.
- 🚫 **فعال و غیرفعال‌سازی آنی کاربر:** قطع فوری دسترسی در تمام نودها به صورت خودکار.
- 🔄 **همگام‌سازی خودکار (Sync Engine):** اعمال تغییرات کاربران روی Xray بدون قطعی سرویس.
- 🛡️ **امنیت سازمانی:** هش کلمه عبور با PBKDF2 (با ۱۰۰,۰۰۰ دور)، توکن‌های نشست HMAC-SHA256، مقایسه Timing-Safe و محافظت کامل در برابر SQLi، XSS و Brute-Force.
- 🎛️ **پنل مدیریت Dark Premium:** پنل کاملاً فارسی و راست‌چین (RTL) با مانیتورینگ زنده نودها، کاربران، اشتراک‌ها و لاگ‌ها.

---

## 🛠️ راهنمای راه‌اندازی سریع

### ۱. اجرای محلی Backend
```bash
cd backend
npm install
npm test
npm run dev
```

### ۲. نصب ایجنت روی سرور VPS لینوکس
```bash
curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/node-agent/install.sh | sudo bash -s -- --node-id hetzner-de-1 --token <YOUR_NODE_TOKEN> --endpoint https://<WORKER_URL>
```

### ۳. استفاده از کلاینت لینوکس
```bash
curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/clients/linux/install.sh | sudo bash

# برقراری اتصال VLESS:
vpprv1 connect

# مشاهده وضعیت:
vpprv1 status
```

---

## 📱 راهنمای نصب دستی کلاینت اندروید (APK)

هنگام نصب فایل `VPPRV1.apk` به صورت دستی:
1. در صورت نمایش هشدار نصب از منابع ناشناس، مجوز مربوطه را فعال نمایید.
2. در اولین اتصال، پیام سیستم‌عامل اندروید برای اعطای دسترسی `VpnService` را تأیید فرمایید.

---

## 📄 مجوز و حریم خصوصی
تمامی حقوق محفوظ است © ۱۴۰۵ / 2026. سامانه VPPRV1 منطبق بر سیاست **Zero-Log** پیاده‌سازی شده و هیچ‌گونه ترافیک کاربری را ذخیره نمی‌کند.
