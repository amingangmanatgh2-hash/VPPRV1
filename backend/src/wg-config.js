// VPPRV1 WireGuard .conf Config Generator
import { calculateSplitAllowedIPs, IRAN_CIDRS } from './iran-cidrs.js';

export function buildWireGuardConfig({
  clientPrivateKey,
  clientAddress = "10.66.66.2/32",
  dns = "1.1.1.1, 1.0.0.1",
  serverPublicKey,
  presharedKey,
  serverHost,
  serverPort = 443,
  mode = "full",
  customAllowedIPs = null,
  mtu = null
}) {
  let allowedIPs;
  let effectiveMtu;

  if (mode === "split") {
    // Net Melli Split Tunnel Mode:
    // Route international traffic through VPN, bypass domestic Iran IP ranges directly
    allowedIPs = customAllowedIPs || calculateSplitAllowedIPs(IRAN_CIDRS);
    // MTU max 1330 for strict carrier packet limits
    effectiveMtu = mtu ? Math.min(Number(mtu), 1330) : 1330;
  } else {
    // Full Tunnel: All traffic (0.0.0.0/0, ::/0)
    allowedIPs = customAllowedIPs || "0.0.0.0/0, ::/0";
    effectiveMtu = mtu ? Number(mtu) : 1420;
  }

  const lines = [
    "# -------------------------------------------------------------",
    "# VPPRV1 Secure WireGuard Configuration",
    `# Mode: ${mode === 'split' ? 'Split Tunnel (Net Melli Bypass - Direct Iran)' : 'Full Tunnel'}`,
    `# Generated at: ${new Date().toISOString()}`,
    "# -------------------------------------------------------------",
    "",
    "[Interface]",
    `PrivateKey = ${clientPrivateKey}`,
    `Address = ${clientAddress}`,
    `DNS = ${dns}`,
    `MTU = ${effectiveMtu}`,
    "",
    "[Peer]",
    `PublicKey = ${serverPublicKey}`
  ];

  if (presharedKey) {
    lines.push(`PresharedKey = ${presharedKey}`);
  }

  lines.push(`Endpoint = ${serverHost}:${serverPort}`);
  lines.push(`AllowedIPs = ${allowedIPs}`);
  lines.push("PersistentKeepalive = 25");
  lines.push("");

  return lines.join("\n");
}
