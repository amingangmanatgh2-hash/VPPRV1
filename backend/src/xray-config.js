// VPPRV1 VLESS Standard URI and Xray JSON Configuration Generator

/**
 * Generate standard VLESS URI string for client apps
 * Supports VLESS+TCP+Reality and VLESS+WS
 */
export function buildVlessUri({
  uuid,
  host,
  port = 443,
  name = "VPPRV1-Node",
  transport = "tcp",      // "tcp" or "ws"
  security = "reality",   // "reality" or "none" / "tls"
  realityPublicKey = null,
  realityShortId = null,
  realitySni = "www.microsoft.com",
  wsPath = "/vpprv1-ws",
  wsHost = null,
  flow = "xtls-rprx-vision"
}) {
  const encodedName = encodeURIComponent(name);
  const params = new URLSearchParams();

  params.set("type", transport);
  params.set("security", security);

  if (security === "reality") {
    if (realityPublicKey) params.set("pbk", realityPublicKey);
    if (realityShortId) params.set("sid", realityShortId);
    if (realitySni) params.set("sni", realitySni);
    if (flow && transport === "tcp") params.set("flow", flow);
    params.set("fp", "chrome");
  } else if (security === "tls") {
    if (realitySni) params.set("sni", realitySni);
    params.set("fp", "chrome");
  }

  if (transport === "ws") {
    params.set("path", wsPath);
    if (wsHost || host) params.set("host", wsHost || host);
  }

  return `vless://${uuid}@${host}:${port}?${params.toString()}#${encodedName}`;
}

/**
 * Generate full Xray Client JSON config for desktop/mobile clients
 */
export function buildXrayClientJson({
  uuid,
  host,
  port = 443,
  transport = "tcp",
  security = "reality",
  realityPublicKey = null,
  realityShortId = null,
  realitySni = "www.microsoft.com",
  wsPath = "/vpprv1-ws",
  flow = "xtls-rprx-vision"
}) {
  const outbound = {
    tag: "proxy",
    protocol: "vless",
    settings: {
      vnext: [
        {
          address: host,
          port: port,
          users: [
            {
              id: uuid,
              encryption: "none",
              flow: security === "reality" && transport === "tcp" ? flow : ""
            }
          ]
        }
      ]
    },
    streamSettings: {
      network: transport,
      security: security
    }
  };

  if (security === "reality") {
    outbound.streamSettings.realitySettings = {
      show: false,
      fingerprint: "chrome",
      serverName: realitySni,
      publicKey: realityPublicKey || "",
      shortId: realityShortId || "",
      spiderX: ""
    };
  } else if (transport === "ws") {
    outbound.streamSettings.wsSettings = {
      path: wsPath,
      headers: {
        Host: host
      }
    };
  }

  return {
    log: {
      loglevel: "warning"
    },
    inbounds: [
      {
        tag: "socks-in",
        port: 10808,
        listen: "127.0.0.1",
        protocol: "socks",
        settings: {
          auth: "noauth",
          udp: true
        }
      },
      {
        tag: "http-in",
        port: 10809,
        listen: "127.0.0.1",
        protocol: "http",
        settings: {}
      }
    ],
    outbounds: [
      outbound,
      {
        tag: "direct",
        protocol: "freedom",
        settings: {}
      },
      {
        tag: "block",
        protocol: "blackhole",
        settings: {}
      }
    ],
    routing: {
      domainStrategy: "IPIfNonMatch",
      rules: [
        {
          type: "field",
          ip: ["geoip:private", "geoip:ir"],
          outboundTag: "direct"
        },
        {
          type: "field",
          domain: ["geosite:cn", "geosite:ir"],
          outboundTag: "direct"
        }
      ]
    }
  };
}

/**
 * Generate Xray Server inbound config for Node VPS
 */
export function buildXrayServerInboundConfig({
  node,
  activeUsers = []
}) {
  const clients = activeUsers.map(u => ({
    id: u.uuid,
    flow: node.security === "reality" ? "xtls-rprx-vision" : "",
    email: u.email || `${u.username}@vpprv1`
  }));

  const inbounds = [];

  // Inbound 1: VLESS + TCP + Reality
  if (node.security === "reality") {
    inbounds.push({
      tag: "vless-reality-in",
      port: node.port || 443,
      protocol: "vless",
      settings: {
        clients: clients,
        decryption: "none"
      },
      streamSettings: {
        network: "tcp",
        security: "reality",
        realitySettings: {
          show: false,
          dest: `${node.reality_server_name || 'www.microsoft.com'}:443`,
          xver: 0,
          serverNames: [node.reality_server_name || "www.microsoft.com"],
          privateKey: node.reality_private_key || "",
          shortIds: [node.reality_short_id || ""]
        }
      },
      sniffing: {
        enabled: true,
        destOverride: ["http", "tls", "quic"]
      }
    });
  }

  // Inbound 2: VLESS + WS (if configured)
  if (node.ws_port) {
    inbounds.push({
      tag: "vless-ws-in",
      port: node.ws_port || 80,
      protocol: "vless",
      settings: {
        clients: clients.map(c => ({ id: c.id, email: c.email })),
        decryption: "none"
      },
      streamSettings: {
        network: "ws",
        security: "none",
        wsSettings: {
          path: node.ws_path || "/vpprv1-ws"
        }
      }
    });
  }

  return {
    log: {
      loglevel: "warning"
    },
    api: {
      tag: "api",
      services: ["StatsService"]
    },
    stats: {},
    policy: {
      levels: {
        "0": {
          statsUserUplink: true,
          statsUserDownlink: true
        }
      },
      system: {
        statsInboundUplink: true,
        statsInboundDownlink: true
      }
    },
    inbounds: inbounds,
    outbounds: [
      {
        tag: "direct",
        protocol: "freedom"
      },
      {
        tag: "blocked",
        protocol: "blackhole"
      }
    ]
  };
}
