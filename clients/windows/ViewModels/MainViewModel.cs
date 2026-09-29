using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using VPPRV1.Helpers;
using VPPRV1.Models;
using VPPRV1.Services;

namespace VPPRV1.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private readonly HttpClient _http = new();
    private readonly XrayClientService _xrayService = new();
    private readonly System.Timers.Timer _durationTimer = new(1000);

    private ConnectionState _state = ConnectionState.Disconnected;
    private string _statusText = "قطع";
    private string _pingDisplay = "---";
    private string _durationDisplay = "۰۰:۰۰:۰۰";
    private bool _isRealityMode = true;
    private NodeItem? _selectedNode;
    private List<NodeItem> _nodes = new();
    private DateTime? _connectedSince;

    public string BackendUrl { get; set; } = "https://vpprv1.workers.dev";

    public MainViewModel()
    {
        _durationTimer.Elapsed += (s, e) => UpdateDuration();
        _ = LoadNodesAsync();
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

    public bool IsRealityMode
    {
        get => _isRealityMode;
        set
        {
            if (_isRealityMode != value)
            {
                _isRealityMode = value;
                OnPropertyChanged();
                if (State == ConnectionState.Connected)
                {
                    _ = ReconnectAsync();
                }
            }
        }
    }

    public List<NodeItem> Nodes
    {
        get => _nodes;
        set { _nodes = value; OnPropertyChanged(); }
    }

    public NodeItem? SelectedNode
    {
        get => _selectedNode;
        set { _selectedNode = value; OnPropertyChanged(); }
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

    public async Task LoadNodesAsync()
    {
        try
        {
            var res = await _http.GetFromJsonAsync<Dictionary<string, object>>($"{BackendUrl}/api/servers");
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

        string targetHost = SelectedNode?.Host ?? "1.1.1.1";
        int pingMs = await _xrayService.PingHostAsync(targetHost);
        PingDisplay = (pingMs < 999 ? $"{pingMs} میلی‌ثانیه" : "عالی").ToPersianNumbers();

        State = ConnectionState.Connecting;
        await Task.Delay(500);

        try
        {
            var provRes = await _http.PostAsync($"{BackendUrl}/api/v1/provision", null);
            var prov = await provRes.Content.ReadFromJsonAsync<ProvisionResponse>();

            if (prov != null && !string.IsNullOrEmpty(prov.Token))
            {
                string jsonUrl = $"{BackendUrl}/api/v1/sub/{prov.Token}?format=json";
                string clientJson = await _http.GetStringAsync(jsonUrl);

                await _xrayService.StartVlessTunnelAsync(clientJson);
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
        await _xrayService.StopVlessTunnelAsync();
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
