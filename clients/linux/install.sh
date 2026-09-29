#!/usr/bin/env bash
# VPPRV1 Linux Client Installer (Xray Core)
set -e

echo "=========================================================="
echo "          VPPRV1 Linux Xray Core CLI Installer            "
echo "=========================================================="

if [ "$EUID" -ne 0 ]; then
  echo "لطفاً اسکریپت نصب را با دسترسی روت (sudo) اجرا نمایید."
  exit 1
fi

echo "[+] در حال نصب هسته رسمی Xray Core..."
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install || true

echo "[+] در حال دانلود و تنظیم باینری vpprv1..."
curl -sSL "https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/clients/linux/vpprv1" -o /usr/local/bin/vpprv1
chmod +x /usr/local/bin/vpprv1

echo "=========================================================="
echo "نصب با موفقیت انجام شد!"
echo "دستورات قابل استفاده:"
echo "  vpprv1 connect          # برقراری اتصال امن VLESS Reality"
echo "  vpprv1 disconnect       # قطع اتصال"
echo "  vpprv1 status           # مشاهده وضعیت اتصال"
echo "  vpprv1 servers          # مشاهده لیست نودها"
echo "=========================================================="
