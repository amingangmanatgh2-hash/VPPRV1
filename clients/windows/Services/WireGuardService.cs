using System.Diagnostics;
using System.Net.NetworkInformation;
using VPPRV1.Models;

namespace VPPRV1.Services;

public class WireGuardService
{
    private Process? _tunnelProcess;

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

    public async Task<bool> StartTunnelAsync(string confContent, string tunnelName = "vpprv1")
    {
        try
        {
            string tempDir = Path.Combine(Path.GetTempPath(), "VPPRV1");
            Directory.CreateDirectory(tempDir);
            string confPath = Path.Combine(tempDir, $"{tunnelName}.conf");
            await File.WriteAllTextAsync(confPath, confContent);

            // Execute wireguard install tunnel service if wireguard.exe exists
            string wgExe = @"C:\Program Files\WireGuard\wireguard.exe";
            if (File.Exists(wgExe))
            {
                var psi = new ProcessStartInfo
                {
                    FileName = wgExe,
                    Arguments = $"/installtunnelservice \"{confPath}\"",
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                _tunnelProcess = Process.Start(psi);
            }
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> StopTunnelAsync(string tunnelName = "vpprv1")
    {
        try
        {
            string wgExe = @"C:\Program Files\WireGuard\wireguard.exe";
            if (File.Exists(wgExe))
            {
                var psi = new ProcessStartInfo
                {
                    FileName = wgExe,
                    Arguments = $"/uninstalltunnelservice {tunnelName}",
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                Process.Start(psi);
            }
            return true;
        }
        catch
        {
            return false;
        }
    }
}
