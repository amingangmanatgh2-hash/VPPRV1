# معماری VPPRV1

این سامانه دو بخش مستقل دارد:

1. **Control Plane:** ‏Cloudflare Worker، D1، پنل و API. مدیریت metadata سرور، وضعیت، کاربر، subscription، peer و release.
2. **Data Plane:** نودهای لینوکسی عمومی با WireGuard. ترافیک VPN فقط از این نودها عبور می‌کند و از Worker عبور نمی‌کند.

## جریان اتصال

کلاینت کلید WireGuard را محلی تولید می‌کند، با subscription احراز می‌شود، public key را ثبت می‌کند، از API بهترین سرور را می‌گیرد و tunnel را با API رسمی سیستم‌عامل فعال می‌کند. Agent نود وضعیت latency/load را به Control Plane گزارش می‌دهد.

## مدل انتخاب

فقط `status=active` واجد شرایط است. نسخه اول امتیاز `latency + 2×load` دارد. در تولید باید freshness گزارش سلامت، ظرفیت، فاصله جغرافیایی و packet loss نیز لحاظ شود.

## مرز امنیتی

Private key کلاینت هرگز از دستگاه خارج نمی‌شود. private key سرور فقط روی نود و با permission محدود قرار دارد. D1 حاوی password hash و public key است، نه secret WireGuard.
