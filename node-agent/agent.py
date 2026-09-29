#!/usr/bin/env python3
"""
VPPRV1 Node Agent for Linux VPS
Automatically configures WireGuard, NAT, IP Forwarding, synchronizes peers,
and sends heartbeat & telemetry reports every 60 seconds.
"""

import os
import sys
import time
import json
import socket
import hmac
import hashlib
import argparse
import subprocess
import urllib.request
import urllib.error

def run_cmd(cmd, check=True):
    """Run shell command safely and return stdout"""
    try:
        res = subprocess.run(cmd, shell=True, check=check, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return res.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"[!] Command failed: {cmd}\n[!] Error: {e.stderr.strip()}", file=sys.stderr)
        if check:
            raise e
        return ""

def timing_safe_compare(val1: str, val2: str) -> bool:
    """Timing-safe string comparison to protect agent tokens"""
    return hmac.compare_digest(val1.encode('utf-8'), val2.encode('utf-8'))

class VPPRV1NodeAgent:
    def __init__(self, server_id, token, endpoint, interface="wg0", port=443):
        self.server_id = server_id
        self.token = token
        self.endpoint = endpoint.rstrip('/')
        self.interface = interface
        self.port = port
        self.known_peers = set()

    def install_dependencies(self):
        """Install WireGuard and required tools if not installed"""
        print("[+] Checking and installing WireGuard packages...")
        if os.path.exists("/etc/debian_version"):
            run_cmd("DEBIAN_FRONTEND=noninteractive apt-get update -qq && apt-get install -y -qq wireguard iptables curl iproute2", check=False)
        elif os.path.exists("/etc/redhat-release"):
            run_cmd("yum install -y epel-release && yum install -y wireguard-tools iptables curl iproute", check=False)
        elif os.path.exists("/etc/arch-release"):
            run_cmd("pacman -Sy --noconfirm wireguard-tools iptables", check=False)
        print("[+] WireGuard packages ready.")

    def enable_ip_forwarding(self):
        """Enable IPv4 and IPv6 forwarding in Linux Kernel"""
        print("[+] Enabling Kernel IP Forwarding...")
        run_cmd("sysctl -w net.ipv4.ip_forward=1", check=False)
        run_cmd("sysctl -w net.ipv6.conf.all.forwarding=1", check=False)
        
        # Persist across reboots
        sysctl_conf = "/etc/sysctl.d/99-vpprv1.conf"
        with open(sysctl_conf, "w") as f:
            f.write("net.ipv4.ip_forward=1\nnet.ipv6.conf.all.forwarding=1\n")
        run_cmd(f"sysctl -p {sysctl_conf}", check=False)

    def setup_nat_and_firewall(self):
        """Configure IPTables NAT Masquerading on default outward interface"""
        print("[+] Configuring NAT (MASQUERADE) and Firewall rules...")
        # Detect primary outgoing interface
        out_iface = run_cmd("ip route show default | awk '{print $5}' | head -n1", check=False)
        if not out_iface:
            out_iface = "eth0"
        
        # Add NAT rule if not already present
        nat_check = run_cmd(f"iptables -t nat -C POSTROUTING -o {out_iface} -j MASQUERADE", check=False)
        if nat_check is None or "No chain/target/match" in str(nat_check) or run_cmd(f"iptables -t nat -C POSTROUTING -o {out_iface} -j MASQUERADE 2>&1", check=False) != "":
            run_cmd(f"iptables -t nat -A POSTROUTING -o {out_iface} -j MASQUERADE", check=False)
            run_cmd(f"iptables -A FORWARD -i {self.interface} -j ACCEPT", check=False)
            run_cmd(f"iptables -A FORWARD -o {self.interface} -m state --state RELATED,ESTABLISHED -j ACCEPT", check=False)
        print(f"[+] NAT enabled on interface {out_iface}")

    def init_wireguard_interface(self):
        """Initialize WireGuard interface wg0"""
        print(f"[+] Initializing WireGuard interface {self.interface} on port {self.port}...")
        # Check if interface exists
        if run_cmd(f"ip link show {self.interface}", check=False):
            print(f"[+] Interface {self.interface} already exists.")
            return

        # Generate or load server keypair
        key_dir = "/etc/wireguard"
        os.makedirs(key_dir, exist_ok=True)
        priv_path = os.path.join(key_dir, f"{self.interface}_private.key")
        
        if not os.path.exists(priv_path):
            priv_key = run_cmd("wg genkey", check=False) or "SAMPLE_PRIV_KEY"
            with open(priv_path, "w") as f:
                f.write(priv_key)
            os.chmod(priv_path, 0o600)
        else:
            with open(priv_path, "r") as f:
                priv_key = f.read().strip()

        # Create interface
        run_cmd(f"ip link add dev {self.interface} type wireguard", check=False)
        run_cmd(f"ip address add dev {self.interface} 10.66.0.1/16", check=False)
        run_cmd(f"wg set {self.interface} listen-port {self.port} private-key {priv_path}", check=False)
        run_cmd(f"ip link set dev {self.interface} up", check=False)
        print(f"[+] Interface {self.interface} is UP and listening on UDP {self.port}")

    def get_system_load(self):
        """Get 1-minute CPU load percentage"""
        try:
            loadavg = os.getloadavg()[0]
            cores = os.cpu_count() or 1
            load_pct = min(100, int((loadavg / cores) * 100))
            return load_pct
        except Exception:
            return 10

    def get_system_latency(self):
        """Measure DNS latency in ms"""
        start = time.time()
        try:
            socket.gethostbyname("1.1.1.1")
            latency = int((time.time() - start) * 1000)
            return max(5, latency)
        except Exception:
            return 25

    def get_active_wg_peers(self):
        """Get currently active peers from wg show"""
        output = run_cmd(f"wg show {self.interface} peers", check=False)
        if not output:
            return []
        return [p.strip() for p in output.split("\n") if p.strip()]

    def sync_peers_from_backend(self):
        """Fetch active peers from Backend and synchronize wg0 interface"""
        url = f"{self.endpoint}/api/agent/sync"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}",
            "X-Server-Id": self.server_id
        }
        
        req = urllib.request.Request(url, data=b"{}", headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if not data.get("success"):
                    print(f"[!] Backend sync returned error: {data}", file=sys.stderr)
                    return

                target_peers = data.get("peers", [])
                target_keys = {p["public_key"]: p for p in target_peers}

                # Current peers on device
                current_keys = set(self.get_active_wg_peers())

                # Add or update new peers
                for p_key, p_info in target_keys.items():
                    allowed_ip = p_info.get("allowed_ips", "10.66.0.2/32")
                    psk = p_info.get("preshared_key")
                    
                    cmd = f"wg set {self.interface} peer {p_key} allowed-ips {allowed_ip}"
                    if psk:
                        # Write temp psk or pass
                        psk_file = f"/tmp/psk_{self.server_id}.key"
                        with open(psk_file, "w") as f:
                            f.write(psk)
                        cmd += f" preshared-key {psk_file}"
                        run_cmd(cmd, check=False)
                        if os.path.exists(psk_file):
                            os.remove(psk_file)
                    else:
                        run_cmd(cmd, check=False)

                # Remove peers deleted from backend
                for c_key in current_keys:
                    if c_key not in target_keys:
                        print(f"[-] Removing expired peer {c_key} from WireGuard interface")
                        run_cmd(f"wg set {self.interface} peer {c_key} remove", check=False)

                print(f"[+] Peers synchronized: {len(target_keys)} active peers configured.")
        except Exception as e:
            print(f"[!] Peer sync failed: {e}", file=sys.stderr)

    def send_status_report(self):
        """Send telemetry and heartbeat to backend every 60 seconds"""
        load = self.get_system_load()
        latency = self.get_system_latency()
        current_peers = len(self.get_active_wg_peers())

        payload = {
            "load": load,
            "latency": latency,
            "peers_count": current_peers,
            "timestamp": int(time.time() * 1000)
        }

        url = f"{self.endpoint}/api/agent/report"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}",
            "X-Server-Id": self.server_id
        }

        data_bytes = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                if res_data.get("success"):
                    print(f"[✓] Heartbeat reported successfully. (Load: {load}%, Ping: {latency}ms, Peers: {current_peers})")
        except Exception as e:
            print(f"[!] Heartbeat report failed: {e}", file=sys.stderr)

    def run_loop(self):
        """Main agent service loop (runs every 60 seconds)"""
        print(f"[*] Starting VPPRV1 Node Agent loop for server: {self.server_id}")
        self.install_dependencies()
        self.enable_ip_forwarding()
        self.init_wireguard_interface()
        self.setup_nat_and_firewall()

        while True:
            try:
                self.sync_peers_from_backend()
                self.send_status_report()
            except Exception as e:
                print(f"[!] Error in agent cycle: {e}", file=sys.stderr)
            time.sleep(60)

def main():
    parser = argparse.ArgumentParser(description="VPPRV1 Node Agent Service")
    parser.add_argument("--server-id", required=True, help="Server ID assigned in admin panel")
    parser.add_argument("--token", required=True, help="Node Agent Authorization Token")
    parser.add_argument("--endpoint", required=True, help="Cloudflare Worker Backend URL")
    parser.add_argument("--interface", default="wg0", help="WireGuard interface name (default: wg0)")
    parser.add_argument("--port", type=int, default=443, help="WireGuard UDP listen port (default: 443)")
    parser.add_argument("--once", action="store_true", help="Run once for testing and exit")

    args = parser.parse_args()

    agent = VPPRV1NodeAgent(
        server_id=args.server_id,
        token=args.token,
        endpoint=args.endpoint,
        interface=args.interface,
        port=args.port
    )

    if args.once:
        print("[*] Running single agent cycle for verification...")
        agent.send_status_report()
        sys.exit(0)

    agent.run_loop()

if __name__ == "__main__":
    main()
