# مستندات کامل API سامانه VPPRV1 (Xray Core & VLESS)

این سند شامل مشخصات تمامی Endpointهای عمومی، اشتراک، نود ایجنت و پنل مدیریت سامانه VPPRV1 مبتنی بر هسته Xray Core می‌باشد.

---

## ۱. وب‌سرویس‌های عمومی (Public Endpoints)

### دریافت لیست نودهای سرور (VPS)
- **متد:** `GET /api/servers`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "count": 11,
  "servers": [
    {
      "id": "hetzner-de-1",
      "name": "آلمان - فرانکفورت (Hetzner)",
      "country": "Germany",
      "flag": "🇩🇪",
      "provider": "Hetzner Cloud",
      "host": "de1.vpprv1.net",
      "port": 443,
      "protocol": "vless",
      "security": "reality",
      "reality_public_key": "kQ9bU1wX8z7yA6v5c4b3a2Z1Y0X9w8V7u6T5s4R3q2P",
      "reality_short_id": "a1b2c3d4",
      "reality_server_name": "www.microsoft.com",
      "status": "offline",
      "load": 0,
      "latency": 0,
      "users_count": 0
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
  "total_active_users": 5,
  "average_latency_ms": 35,
  "timestamp": 1790774200000
}
```

### صدور اشتراک آنی VLESS (Provision)
بدون نیاز به ورودی کاربر یک حساب کاربری و اشتراک معتبر VLESS به همراه UUID یکتا تولید می‌کند (دارای Rate Limit بر اساس IP).
- **متد:** `POST /api/v1/provision`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "message": "اشتراک VLESS با موفقیت ایجاد شد.",
  "token": "sub_a1b2c3d4e5f67890",
  "uuid": "7a35e839-447a-4286-a212-094364491745",
  "vless_uri": "vless://7a35e839-447a-4286-a212-094364491745@de1.vpprv1.net:443?type=tcp&security=reality&pbk=...&sid=a1b2c3d4&sni=www.microsoft.com&flow=xtls-rprx-vision#VPPRV1-Node",
  "subscription_url": "https://vpprv1.workers.dev/api/v1/sub/sub_a1b2c3d4e5f67890",
  "node_id": "hetzner-de-1",
  "node_name": "آلمان - فرانکفورت (Hetzner)",
  "traffic_limit_bytes": 53687091200,
  "created_at": 1790774200000,
  "expires_at": 1793366200000
}
```

### دریافت کانفیگ اشتراک VLESS
- **متد:** `GET /api/v1/sub/:token`
- **پارامترهای Query:**
  - `format=vless` (پیش‌فرض): خروجی لینک مستقیم استاندارد `vless://...`
  - `format=json` : خروجی ساختار کامل JSON کلاینت برای Xray
- **خروجی:** متن استاندارد لینک VLESS یا ساختار JSON

---

## ۲. وب‌سرویس‌های ارتباطی Xray Node Agent

### همگام‌سازی Inbound و کاربران فعال
- **متد:** `POST /api/agent/sync`
- **هدر:** `Authorization: Bearer <NODE_AGENT_TOKEN>`
- **پاسخ موفق (200 OK):**
```json
{
  "success": true,
  "node_id": "hetzner-de-1",
  "users_count": 10,
  "users": [
    {
      "id": "7a35e839-447a-4286-a212-094364491745",
      "uuid": "7a35e839-447a-4286-a212-094364491745",
      "email": "user_7a35e839@vpprv1.net"
    }
  ],
  "xray_config": {
    "log": { "loglevel": "warning" },
    "inbounds": [ ... ],
    "outbounds": [ ... ]
  }
}
```

### ارسال هارت‌بیت و آمار ترافیک نود
- **متد:** `POST /api/agent/report`
- **هدر:** `Authorization: Bearer <NODE_AGENT_TOKEN>`
- **بدنه درخواست (JSON):**
```json
{
  "load": 18,
  "latency": 32,
  "users_count": 4,
  "user_traffic": {
    "7a35e839-447a-4286-a212-094364491745": 104857600
  },
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

### فعال / غیرفعال‌سازی کاربر
- **متد:** `POST /api/admin/users/:id/status`
- **هدر:** `Authorization: Bearer <SESSION_TOKEN>`
- **بدنه درخواست:**
```json
{
  "status": "disabled"
}
```
