# VPPRV1 - پلتفرم جامع و امن شبکه WireGuard

<div align="center">

![VPPRV1 Banner](https://img.shields.io/badge/VPPRV1-WireGuard%20X25519-10b981?style=for-the-badge&logo=wireguard)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers%20%2B%20D1-f38020?style=for-the-badge&logo=cloudflare)
![Platforms](https://img.shields.io/badge/Clients-Windows%20%7C%20Android%20%7C%20Linux-06b6d4?style=for-the-badge)

**سامانه جامع، واقعی و پرسرعت مدیریت و توزیع تونل‌های امن WireGuard با الگوریتم X25519 و تفکیک ترافیک نت ملی (Split Tunneling)**

[امکانات و قابلیت‌ها](docs/FEATURES.md) • [مستندات API](docs/API.md) • [راهنمای استقرار](docs/DEPLOY.md)

</div>

---

## 🚀 معرفی پروژه

پروژه **VPPRV1** یک پلتفرم کامل و آماده بهره‌برداری جهت ایجاد، مدیریت و مسیریابی ارتباطات امن WireGuard در لبه شبکه ابری است. این پروژه از هسته کریپتوگرافی واقعی **Curve25519 (X25519)**، کلیدهای مقاوم در برابر کوانتوم **PresharedKey (PSK)**، و تفکیک ترافیک داخلی ایران با پورت UDP 443 و MTU 1330 بهره می‌برد.

### 🌟 ساختار پروژه
```text
VPPRV1/
├── backend/            # هسته Serverless کلودفلر (Cloudflare Workers + D1 Database + Hono)
│   ├── src/            # منطق برنامه، روت‌ها، تمپلیت‌های RTL فارسی، کریپتوگرافی و تولید .conf
│   ├── migrations/     # اسکریپت‌های D1 Schema Migration
│   └── tests/          # آزمون‌های جامع واحد (Unit Tests)
├── node-agent/         # ایجنت پایتونی سرورهای لینوکس (همگام‌ساز Peerها، فایروال، NAT و مانیتورینگ)
├── clients/
│   ├── windows/        # کلاینت دسکتاپ ویندوز (.NET 8 + Avalonia UI + اسکریپت NSIS)
│   ├── android/        # کلاینت موبایل اندروید (Kotlin + Android VpnService + ساخت APK)
│   └── linux/          # کلاینت خط فرمان لینوکس (CLI فارسی + اسکریپت نصب یک‌خطی)
├── docs/               # مستندات کامل ۵۰ قابلیت، مستندات API و اسناد توسعه
└── .github/workflows/  # خطوط لوله CI/CD خودکار تست، بیلد و استقرار
```

---

## ⚙️ ویژگی‌های کلیدی

- 🔑 **تولید کلید واقعی X25519 & PSK:** تولید امن جفت‌کلیدهای استاندارد وایرگارد و کلید اشتراکی ۳۲ بایتی.
- 🇮🇷 **حالت نت ملی (Split Tunneling):** مسیریابی تفکیکی ترافیک با پارامتر `?mode=split&port=443`؛ سایت‌های ایرانی مستقیماً از اینترنت کاربر باز شده و ترافیک بین‌الملل رمزگذاری می‌شود.
- 🤖 **نود ایجنت هوشمند لینوکس:** نصب خودکار وابستگی‌ها، اعمال `net.ipv4.ip_forward=1`، قوانین NAT Masquerade در فایروال و ارسال هارت‌بیت هر ۶۰ ثانیه.
- 🛡️ **امنیت سازمانی:** هش کلمه عبور با PBKDF2 (با ۱۰۰,۰۰۰ دور)، توکن‌های نشست HMAC-SHA256، مقایسه Timing-Safe و محافظت کامل در برابر SQLi، XSS و Brute-Force.
- 🎛️ **پنل مدیریت Dark Premium:** پنل کاملاً فارسی و راست‌چین (RTL) با مانیتورینگ زنده نودها، Peerها، اشتراک‌ها، لاگ‌ها و ویرایشگر آنلاین رنج‌های CIDR ایران.
- 🖥️ **کلاینت‌های بومی:** ویندوز (.NET 8 Avalonia)، اندروید (Kotlin VpnService) و لینوکس (CLI فارسی).

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
curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/node-agent/install.sh | sudo bash -s -- --server-id de-fra-1 --token <YOUR_NODE_TOKEN> --endpoint https://<WORKER_URL>
```

### ۳. نصب و اجرای کلاینت لینوکس
```bash
curl -sSL https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/clients/linux/install.sh | sudo bash

# برقراری اتصال در حالت عادی:
sudo vpprv1 connect

# برقراری اتصال در حالت نت ملی (Split Tunnel):
sudo vpprv1 connect --melli
```

---

## 📱 راهنمای نصب دستی کلاینت اندروید (APK)

هنگام نصب فایل `VPPRV1.apk` به صورت دستی در دستگاه‌های اندرویدی:
1. در صورتی که با پیام *«Install Unknown Apps»* مواجه شدید، به مرورگر یا فایل منیجر خود مجوز نصب برنامه از منابع ناشناس را بدهید.
2. به دلیل استفاده از سرویس سیستمی `VpnService`، در اولین اتصال سیستم‌عامل اندروید پنجره تأیید مجوز اتصال VPN را نمایش می‌دهد که باید گزینه **OK / تأیید** را انتخاب نمایید.

---

## 📄 مجوز و حریم خصوصی
تمامی حقوق محفوظ است © ۱۴۰۵ / 2026. سامانه VPPRV1 منطبق بر سیاست **Zero-Log** پیاده‌سازی شده و هیچ‌گونه ترافیک کاربری را ذخیره نمی‌کند.
