using System.Text.Json.Serialization;

namespace VPPRV1.Models;

public enum ConnectionState
{
    Disconnected,   // قطع
    Checking,       // بررسی
    Connecting,     // اتصال
    Connected,      // متصل
    Disconnecting   // قطع‌شدن
}

public class NodeItem
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;

    [JsonPropertyName("flag")]
    public string Flag { get; set; } = string.Empty;

    [JsonPropertyName("provider")]
    public string Provider { get; set; } = "Hetzner";

    [JsonPropertyName("host")]
    public string Host { get; set; } = string.Empty;

    [JsonPropertyName("port")]
    public int Port { get; set; } = 443;

    [JsonPropertyName("protocol")]
    public string Protocol { get; set; } = "vless";

    [JsonPropertyName("security")]
    public string Security { get; set; } = "reality";

    [JsonPropertyName("latency")]
    public int Latency { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; } = "offline";
}

public class ProvisionResponse
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("token")]
    public string Token { get; set; } = string.Empty;

    [JsonPropertyName("uuid")]
    public string Uuid { get; set; } = string.Empty;

    [JsonPropertyName("vless_uri")]
    public string VlessUri { get; set; } = string.Empty;

    [JsonPropertyName("subscription_url")]
    public string SubscriptionUrl { get; set; } = string.Empty;
}
