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

        val clientIp = intent?.getStringExtra("CLIENT_IP") ?: "10.66.1.2"
        val isMelli = intent?.getBooleanExtra("IS_MELLI", false) ?: false

        connectTunnel(clientIp, isMelli)
        return START_STICKY
    }

    private fun connectTunnel(clientIp: String, isMelli: Boolean) {
        try {
            val builder = Builder()
                .setSession("VPPRV1 Secure Tunnel")
                .addAddress(clientIp, 32)
                .addDnsServer("1.1.1.1")
                .setMtu(if (isMelli) 1330 else 1420)

            if (isMelli) {
                // Route international CIDRs only, bypass domestic Iran IP ranges
                builder.addRoute("1.0.0.0", 8)
                builder.addRoute("3.0.0.0", 8)
                builder.addRoute("8.0.0.0", 6)
            } else {
                builder.addRoute("0.0.0.0", 0)
            }

            vpnInterface = builder.establish()
            Log.i("VPPRV1", "VPN Interface established successfully")
        } catch (e: Exception) {
            Log.e("VPPRV1", "Failed to establish VPN interface", e)
        }
    }

    private fun disconnectTunnel() {
        try {
            vpnInterface?.close()
            vpnInterface = null
            stopSelf()
            Log.i("VPPRV1", "VPN Interface disconnected")
        } catch (e: Exception) {
            Log.e("VPPRV1", "Error closing VPN", e)
        }
    }

    override fun onDestroy() {
        disconnectTunnel()
        super.onDestroy()
    }
}
