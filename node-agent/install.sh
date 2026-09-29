#!/usr/bin/env bash
# VPPRV1 Xray Core Node Agent One-Line Installer & Systemd Service Setup
set -e

echo "=========================================================="
echo "        VPPRV1 Linux Xray Core Node Agent Installer       "
echo "=========================================================="

if [ "$EUID" -ne 0 ]; then
  echo "[!] Please run this installer as root (sudo)."
  exit 1
fi

NODE_ID=""
TOKEN=""
ENDPOINT=""

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --node-id|--server-id) NODE_ID="$2"; shift ;;
    --token) TOKEN="$2"; shift ;;
    --endpoint) ENDPOINT="$2"; shift ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

if [ -z "$NODE_ID" ] || [ -z "$TOKEN" ] || [ -z "$ENDPOINT" ]; then
  echo "[!] Usage: $0 --node-id <ID> --token <TOKEN> --endpoint <URL>"
  exit 1
fi

INSTALL_DIR="/opt/vpprv1-agent"
mkdir -p "$INSTALL_DIR"

echo "[+] Installing Xray Core official release..."
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install || true

echo "[+] Downloading VPPRV1 agent files..."
curl -sSL "https://raw.githubusercontent.com/amingangmanatgh2-hash/VPPRV1/main/node-agent/agent.py" -o "$INSTALL_DIR/agent.py"
chmod +x "$INSTALL_DIR/agent.py"

echo "[+] Creating systemd service file..."
cat <<EOF > /etc/systemd/system/vpprv1-agent.service
[Unit]
Description=VPPRV1 Xray Core Node Agent Service
After=network.target xray.service

[Service]
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR
ExecStart=/usr/bin/python3 $INSTALL_DIR/agent.py --node-id $NODE_ID --token $TOKEN --endpoint $ENDPOINT
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo "[+] Reloading systemd daemon and enabling service..."
systemctl daemon-reload
systemctl enable vpprv1-agent.service
systemctl restart vpprv1-agent.service

echo "[✓] VPPRV1 Xray Node Agent installed and running successfully!"
systemctl status vpprv1-agent.service --no-pager || true
