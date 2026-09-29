#!/usr/bin/env bash
# VPPRV1 Linux Client One-Line Installer
set -e

echo "=========================================================="
echo "          VPPRV1 Linux WireGuard CLI Installer           "
echo "=========================================================="

if [ "$EUID" -ne 0 ]; then
  echo "لطفاً اسکریپت نصب را با دسترسی روت (sudo) اجرا نمایید."
  exit 1
fi

echo "[+] در حال نصب وابستگی‌های WireGuard..."
if command -v apt-get &>/dev/null; then
  apt-get update -qq && apt-get install -y -qq wireguard-tools python3 curl iproute2 resolvconf
elif command -v yum &>/dev/null; then
  yum install -y epel-release && yum install -y wireguard-tools python3 curl iproute
elif command -v pacman &>/dev/null; then
  pacman -Sy --noconfirm wireguard-tools python3 curl
fi

echo "[+] در حال دانلود و تنظیم باینری vpprv1..."
curl -sSL "https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/clients/linux/vpprv1" -o /usr/local/bin/vpprv1
chmod +x /usr/local/bin/vpprv1

echo "=========================================================="
echo "نصب با موفقیت انجام شد!"
echo "دستورات قابل استفاده:"
echo "  sudo vpprv1 connect          # اتصال در حالت عادی (Full Tunnel)"
echo "  sudo vpprv1 connect --melli  # اتصال در حالت نت ملی (Split Tunnel)"
echo "  sudo vpprv1 disconnect       # قطع اتصال"
echo "  sudo vpprv1 status           # مشاهده وضعیت تونل"
echo "  vpprv1 servers               # مشاهده لیست سرورها"
echo "=========================================================="
