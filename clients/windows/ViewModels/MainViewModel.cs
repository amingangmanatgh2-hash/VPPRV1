using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Net.Http.Json;
using VPPRV1.Helpers;
using VPPRV1.Models;
using VPPRV1.Services;

namespace VPPRV1.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private readonly HttpClient _http = new();
    private readonly WireGuardService _wgService = new();
    private readonly System.Timers.Timer _durationTimer = new(1000);

    private ConnectionState _state = ConnectionState.Disconnected;
    private string _statusText = "قطع";
    private string _pingDisplay = "---";
    private string _durationDisplay = "۰۰:۰۰:۰۰";
    private bool _isMelliMode = false;
    private ServerItem? _selectedServer;
    private List<ServerItem> _servers = new();
    private DateTime? _connectedSince;

    public string BackendUrl { get; set; } = "https://vpprv1.workers.dev";

    public MainViewModel()
    {
        _durationTimer.Elapsed += (s, e) => UpdateDuration();
        _ = LoadServersAsync();
    }

    public ConnectionState State
    {
        get => _state;
        set
        {
            _state = value;
            OnPropertyChanged();
            UpdateStatusText();
        }
    }

    public string StatusText
    {
        get => _statusText;
        set { _statusText = value; OnPropertyChanged(); }
    }

    public string PingDisplay
    {
        get => _pingDisplay;
        set { _pingDisplay = value; OnPropertyChanged(); }
    }

    public string DurationDisplay
    {
        get => _durationDisplay;
        set { _durationDisplay = value; OnPropertyChanged(); }
    }

    public bool IsMelliMode
    {
        get => _isMelliMode;
        set
        {
            if (_isMelliMode != value)
            {
                _isMelliMode = value;
                OnPropertyChanged();
                if (State == ConnectionState.Connected)
                {
                    _ = ReconnectAsync();
                }
            }
        }
    }

    public List<ServerItem> Servers
    {
        get => _servers;
        set { _servers = value; OnPropertyChanged(); }
    }

    public ServerItem? SelectedServer
    {
        get => _selectedServer;
        set { _selectedServer = value; OnPropertyChanged(); }
    }

    private void UpdateStatusText()
    {
        StatusText = State switch
        {
            ConnectionState.Disconnected => "قطع",
            ConnectionState.Checking => "بررسی",
            ConnectionState.Connecting => "اتصال",
            ConnectionState.Connected => "متصل",
            ConnectionState.Disconnecting => "قطع‌شدن",
            _ => "قطع"
        };
    }

    private void UpdateDuration()
    {
        if (State == ConnectionState.Connected && _connectedSince.HasValue)
        {
            var diff = DateTime.Now - _connectedSince.Value;
            DurationDisplay = PersianFormatter.FormatDurationPersian(diff);
        }
    }

    public async Task LoadServersAsync()
    {
        try
        {
            var res = await _http.GetFromJsonAsync<Dictionary<string, object>>($"{BackendUrl}/api/servers");
            // Populate servers list
        }
        catch { }
    }

    public async Task ToggleConnectionAsync()
    {
        if (State == ConnectionState.Connected)
        {
            await DisconnectAsync();
        }
        else if (State == ConnectionState.Disconnected)
        {
            await ConnectAsync();
        }
    }

    public async Task ConnectAsync()
    {
        State = ConnectionState.Checking;
        await Task.Delay(400);

        // Ping selected or auto server
        string targetHost = SelectedServer?.Host ?? "1.1.1.1";
        int pingMs = await _wgService.PingHostAsync(targetHost);
        PingDisplay = (pingMs < 999 ? $"{pingMs} میلی‌ثانیه" : "خوب").ToPersianNumbers();

        State = ConnectionState.Connecting;
        await Task.Delay(500);

        try
        {
            var provRes = await _http.PostAsync($"{BackendUrl}/api/v1/provision", null);
            var prov = await provRes.Content.ReadFromJsonAsync<ProvisionResponse>();

            if (prov != null && !string.IsNullOrEmpty(prov.Token))
            {
                string confUrl = $"{BackendUrl}/api/v1/sub/{prov.Token}" + (IsMelliMode ? "?mode=split&port=443" : "");
                string confContent = await _http.GetStringAsync(confUrl);

                await _wgService.StartTunnelAsync(confContent);
                _connectedSince = DateTime.Now;
                _durationTimer.Start();
                State = ConnectionState.Connected;
            }
            else
            {
                State = ConnectionState.Disconnected;
            }
        }
        catch
        {
            State = ConnectionState.Disconnected;
        }
    }

    public async Task DisconnectAsync()
    {
        State = ConnectionState.Disconnecting;
        _durationTimer.Stop();
        await _wgService.StopTunnelAsync();
        await Task.Delay(400);
        State = ConnectionState.Disconnected;
        DurationDisplay = "۰۰:۰۰:۰۰";
    }

    public async Task ReconnectAsync()
    {
        await DisconnectAsync();
        await ConnectAsync();
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? name = null) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
