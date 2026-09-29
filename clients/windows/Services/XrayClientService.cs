using System.Diagnostics;
using System.Net.NetworkInformation;

namespace VPPRV1.Services;

public class XrayClientService
{
    private Process? _xrayProcess;

    public async Task<int> PingHostAsync(string host)
    {
        try
        {
            using var ping = new Ping();
            var reply = await ping.SendPingAsync(host, 1500);
            return reply.Status == IPStatus.Success ? (int)reply.RoundtripTime : 999;
        }
        catch
        {
            return 999;
        }
    }

    public async Task<bool> StartVlessTunnelAsync(string clientConfigJson)
    {
        try
        {
            string tempDir = Path.Combine(Path.GetTempPath(), "VPPRV1");
            Directory.CreateDirectory(tempDir);
            string configPath = Path.Combine(tempDir, "config.json");
            await File.WriteAllTextAsync(configPath, clientConfigJson);

            // Execute local xray-core binary if available
            string xrayExe = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "xray.exe");
            if (File.Exists(xrayExe))
            {
                var psi = new ProcessStartInfo
                {
                    FileName = xrayExe,
                    Arguments = $"run -c \"{configPath}\"",
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                _xrayProcess = Process.Start(psi);
            }
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> StopVlessTunnelAsync()
    {
        try
        {
            if (_xrayProcess != null && !_xrayProcess.HasExited)
            {
                _xrayProcess.Kill(true);
                _xrayProcess.Dispose();
                _xrayProcess = null;
            }
            return true;
        }
        catch
        {
            return false;
        }
    }
}
