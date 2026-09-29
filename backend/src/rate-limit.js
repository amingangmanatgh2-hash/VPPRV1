// VPPRV1 Rate Limiting Middleware using D1
export async function checkRateLimit(db, ip, action, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const key = `${action}:${ip}`;
  
  try {
    const record = await db.prepare("SELECT count, reset_at FROM rate_limits WHERE ip_action = ?").bind(key).first();
    
    if (!record || now > record.reset_at) {
      // Initialize or reset window
      await db.prepare(`
        INSERT INTO rate_limits (ip_action, count, reset_at)
        VALUES (?, 1, ?)
        ON CONFLICT(ip_action) DO UPDATE SET count = 1, reset_at = ?
      `).bind(key, now + windowMs, now + windowMs).run();
      return { allowed: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
      return { allowed: false, remaining: 0, retryAfter: Math.ceil((record.reset_at - now) / 1000) };
    }

    await db.prepare("UPDATE rate_limits SET count = count + 1 WHERE ip_action = ?").bind(key).run();
    return { allowed: true, remaining: limit - (record.count + 1) };
  } catch (err) {
    console.error("Rate limit check error:", err);
    // On DB failure, fail open for UX or return true
    return { allowed: true, remaining: 1 };
  }
}
