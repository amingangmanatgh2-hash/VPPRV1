# کلاینت‌های VPPRV1

این پوشه محل کلاینت‌های بومی است. قرارداد الزام‌آور:

- Android: استفاده از `android.net.VpnService` و backend معتبر WireGuard؛ نگهداری کلید در Android Keystore.
- Windows: استفاده از WireGuardNT و نگهداری secret با DPAPI؛ installer امضاشده MSIX/NSIS.
- Linux: استفاده از kernel WireGuard یا wireguard-go و Secret Service؛ بسته deb/rpm/AppImage.

هیچ کلاینتی نباید آدرس سرور را از کاربر مطالبه کند؛ `/api/public/best-server` و endpoint اختصاصی provisioning منبع تنظیمات هستند. تولید باینری قابل انتشار نیازمند signing certificate مالک است و artifact امضانشده به‌عنوان Release نهایی ارائه نمی‌شود.
