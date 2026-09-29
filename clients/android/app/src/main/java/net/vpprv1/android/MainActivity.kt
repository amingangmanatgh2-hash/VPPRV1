package net.vpprv1.android

import android.app.Activity
import android.content.Intent
import android.net.VpnService
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.*
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var btnConnect: Button
    private lateinit var txtStatus: TextView
    private lateinit var txtDuration: TextView
    private lateinit var switchMelli: Switch
    
    private var isConnected = false
    private val client = OkHttpClient()
    private val scope = CoroutineScope(Dispatchers.Main + Job())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnConnect = findViewById(R.id.btnConnect)
        txtStatus = findViewById(R.id.txtStatus)
        txtDuration = findViewById(R.id.txtDuration)
        switchMelli = findViewById(R.id.switchMelli)

        btnConnect.setOnClickListener {
            if (isConnected) {
                disconnectVPN()
            } else {
                prepareVPN()
            }
        }

        switchMelli.setOnCheckedChangeListener { _, isChecked ->
            if (isConnected) {
                // Reconnect with split tunnel
                disconnectVPN()
                prepareVPN()
            }
        }
    }

    private fun prepareVPN() {
        val intent = VpnService.prepare(this)
        if (intent != null) {
            startActivityForResult(intent, 100)
        } else {
            onActivityResult(100, Activity.RESULT_OK, null)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 100 && resultCode == Activity.RESULT_OK) {
            startVPN()
        }
    }

    private fun startVPN() {
        txtStatus.text = "بررسی..."
        btnConnect.isEnabled = false

        scope.launch {
            try {
                // 1. Provision Subscription
                val req = Request.Builder()
                    .url("https://vpprv1.workers.dev/api/v1/provision")
                    .post(okhttp3.RequestBody.create(null, ByteArray(0)))
                    .build()

                val resp = withContext(Dispatchers.IO) { client.newCall(req).execute() }
                val body = resp.body?.string() ?: ""
                val json = JSONObject(body)
                val token = json.optString("token")

                txtStatus.text = "اتصال..."
                delay(400)

                val vpnIntent = Intent(this@MainActivity, VPPRV1VpnService::class.java).apply {
                    putExtra("CLIENT_IP", "10.66.1.2")
                    putExtra("IS_MELLI", switchMelli.isChecked)
                }
                startService(vpnIntent)

                isConnected = true
                txtStatus.text = "متصل"
                btnConnect.text = "قطع اتصال"
                btnConnect.isEnabled = true
            } catch (e: Exception) {
                txtStatus.text = "قطع"
                btnConnect.isEnabled = true
            }
        }
    }

    private fun disconnectVPN() {
        txtStatus.text = "قطع‌شدن..."
        val intent = Intent(this, VPPRV1VpnService::class.java).apply {
            action = "STOP"
        }
        startService(intent)
        isConnected = false
        txtStatus.text = "قطع"
        btnConnect.text = "⚡ اتصال"
    }

    override fun onDestroy() {
        scope.cancel()
        super.onDestroy()
    }
}
