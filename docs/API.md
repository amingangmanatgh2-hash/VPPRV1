# مستندات کامل API سامانه VPPRV1

این سند شامل مشخصات تمامی Endpointهای عمومی، مدیریتی، اشتراک و نود ایجنت سامانه VPPRV1 می‌باشد.

---

## ۱. وب‌سرویس‌های عمومی (Public Endpoints)

### دریافت لیست سرورها
- **متد:** `GET /api/servers`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "count": 11,
  "servers": [
    {
      "id": "de-fra-1",
      "name": "آلمان (فرانکفورت)",
      "country": "Germany",
      "flag": "🇩🇪",
      "host": "de1.vpprv1.net",
      "port": 443,
      "public_key": "x25519_base64_public_key...",
      "status": "offline",
      "load": 0,
      "latency": 0,
      "peers_count": 0
    }
  ]
}
```

### دریافت وضعیت زنده شبکه سرورها
- **متد:** `GET /api/servers/status`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "total_count": 11,
  "online_count": 1,
  "offline_count": 10,
  "total_active_peers": 5,
  "average_latency_ms": 35,
  "timestamp": 1790774200000
}
```

### صدور اشتراک آنی (Provision)
بدون نیاز به ورودی کاربر یک اشتراک معتبر WireGuard به همراه کلید X25519 تولید می‌کند (دارای Rate Limit بر اساس IP).
- **متد:** `POST /api/v1/provision`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "message": "اشتراک وایرگارد با موفقیت ایجاد شد.",
  "token": "sub_a1b2c3d4e5f67890",
  "subscription_url": "https://vpprv1.workers.dev/api/v1/sub/sub_a1b2c3d4e5f67890",
  "conf_url": "https://vpprv1.workers.dev/api/v1/sub/sub_a1b2c3d4e5f67890",
  "client_address": "10.66.14.22/32",
  "server_id": "de-fra-1",
  "server_name": "آلمان (فرانکفورت)",
  "created_at": 1790774200000,
  "expires_at": 1793366200000
}
```

### دریافت فایل کانفیگ وایرگارد (.conf)
- **متد:** `GET /api/v1/sub/:token`
- **پارامترهای اختیاری Query:**
  - `mode=split` : فعال‌سازی تفکیک ترافیک نت ملی (AllowedIPs شامل رنج‌های خارج از ایران، MTU 1330)
  - `port=443` : تنظیم پورت روی UDP 443
  - `mtu=1330` : تنظیم دستی اندازه MTU
- **خروجی:** متن استاندارد فایل WireGuard با هدر دانلودی `Content-Disposition: attachment; filename="vpprv1-...conf"`

---

## ۲. وب‌سرویس‌های ارتباطی Node Agent

### همگام‌سازی Peerهای فعال
- **متد:** `POST /api/agent/sync`
- **هدر:** `Authorization: Bearer <NODE_AGENT_TOKEN>`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "server_id": "de-fra-1",
  "peers": [
    {
      "id": "peer_123456",
      "public_key": "client_public_key_x25519...",
      "preshared_key": "psk_base64_32bytes...",
      "allowed_ips": "10.66.14.22/32",
      "status": "active"
    }
  ]
}
```

### ارسال هارت‌بیت و وضعیت نود
- **متد:** `POST /api/agent/report`
- **هدر:** `Authorization: Bearer <NODE_AGENT_TOKEN>`
- **بدنه درخواست (JSON):**
```json
{
  "load": 18,
  "latency": 32,
  "peers_count": 4,
  "timestamp": 1790774200000
}
```

---

## ۳. وب‌سرویس‌های پنل مدیریت (Admin Endpoints)

### ورود به پنل مدیریت
- **متد:** `POST /api/admin/login`
- **بدنه درخواست (JSON):**
```json
{
  "username": "admin",
  "password": "YOUR_ADMIN_PASSWORD"
}
```
- **پاسخ موفق:** توکن نشست رمزشده با HMAC-SHA256 (با اعتبار ۲۴ ساعت)

### دریافت اطلاعات داشبورد
- **متد:** `GET /api/admin/dashboard`
- **هدر:** `Authorization: Bearer <SESSION_TOKEN>`

### به‌روزرسانی رنج‌های نت ملی (Iran CIDRs)
- **متد:** `POST /api/admin/cidrs`
- **هدر:** `Authorization: Bearer <SESSION_TOKEN>`
- **بدنه درخواست:**
```json
{
  "cidrs": [
    "2.144.0.0/14",
    "5.22.0.0/15"
  ]
}
```
