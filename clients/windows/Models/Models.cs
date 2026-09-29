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

public class ServerItem
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;

    [JsonPropertyName("flag")]
    public string Flag { get; set; } = string.Empty;

    [JsonPropertyName("host")]
    public string Host { get; set; } = string.Empty;

    [JsonPropertyName("port")]
    public int Port { get; set; } = 443;

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

    [JsonPropertyName("conf_url")]
    public string ConfUrl { get; set; } = string.Empty;

    [JsonPropertyName("client_address")]
    public string ClientAddress { get; set; } = string.Empty;
}
