package net.vpprv1.android

import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import android.util.Log

class VPPRV1VpnService : VpnService() {

    private var vpnInterface: ParcelFileDescriptor? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        if (action == "STOP") {
            disconnectTunnel()
            return START_NOT_STICKY
        }

        val clientIp = intent?.getStringExtra("CLIENT_IP") ?: "172.19.0.1"
        connectTunnel(clientIp)
        return START_STICKY
    }

    private fun connectTunnel(clientIp: String) {
        try {
            val builder = Builder()
                .setSession("VPPRV1 Xray VLESS Tunnel")
                .addAddress(clientIp, 30)
                .addDnsServer("1.1.1.1")
                .addRoute("0.0.0.0", 0)
                .setMtu(1500)

            vpnInterface = builder.establish()
            Log.i("VPPRV1", "Xray VLESS VPN Interface established successfully")
        } catch (e: Exception) {
            Log.e("VPPRV1", "Failed to establish VPN interface", e)
        }
    }

    private fun disconnectTunnel() {
        try {
            vpnInterface?.close()
            vpnInterface = null
            stopSelf()
            Log.i("VPPRV1", "Xray VPN Interface disconnected")
        } catch (e: Exception) {
            Log.e("VPPRV1", "Error closing VPN", e)
        }
    }

    override fun onDestroy() {
        disconnectTunnel()
        super.onDestroy()
    }
}
