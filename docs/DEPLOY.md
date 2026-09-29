# راهنمای استقرار Backend سامانه VPPRV1 در Cloudflare

این سند مراحل استقرار مستقیم سامانه بر بستر Cloudflare Workers و دیتابیس Cloudflare D1 را شرح می‌دهد.

---

## نیازمندی‌ها
- حساب کاربری در Cloudflare
- ابزار خط فرمان Wrangler (`npm install -g wrangler`)

---

## مراحل گام‌به‌گام استقرار

### ۱. ورود به حساب کلودفلر
```bash
wrangler login
```

### ۲. ایجاد پایگاه داده D1
```bash
wrangler d1 create vpprv1_db
```
شناسه `database_id` دریافتی را در فایل `backend/wrangler.toml` قرار دهید.

### ۳. اعمال مایگریشن پایگاه داده
```bash
cd backend
wrangler d1 migrations apply vpprv1_db --remote
```

### ۴. استقرار Worker
```bash
wrangler deploy
```

پس از پایان فرآیند، آدرس دامنه اینترنتی اختصاصی Workers شما (مانند `https://vpprv1-backend.<subdomain>.workers.dev`) فعال و آماده سرویس‌دهی خواهد بود.
