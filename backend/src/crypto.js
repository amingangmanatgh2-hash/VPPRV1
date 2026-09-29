// VPPRV1 Cryptographic Utilities & Token Generation
// PBKDF2 Password Hashing, HMAC-SHA256 Sessions, Timing-Safe string compare, UUID generation

/**
 * Timing-safe string comparison to mitigate side-channel timing attacks
 */
export function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  const enc = new TextEncoder();
  const aBuf = enc.encode(a);
  const bBuf = enc.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < aBuf.byteLength; i++) {
    diff |= aBuf[i] ^ bBuf[i];
  }
  return diff === 0;
}

/**
 * Generate standard UUID v4 for Xray VLESS clients
 */
export function generateUUID() {
  return crypto.randomUUID();
}

/**
 * Generate 8-character hex Short ID for Reality
 */
export function generateShortId() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * PBKDF2 Password Hashing (100,000 iterations, SHA-256)
 */
export async function hashPassword(password, saltHex = null) {
  const enc = new TextEncoder();
  let salt;
  if (!saltHex) {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    salt = saltHex;
  }

  const saltBytes = new Uint8Array(salt.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const passKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    passKey,
    256
  );

  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return { hash: hashHex, salt, iterations: 100000 };
}

/**
 * Verify PBKDF2 Password
 */
export async function verifyPassword(password, hashHex, saltHex) {
  const res = await hashPassword(password, saltHex);
  return timingSafeEqual(res.hash, hashHex);
}

/**
 * Generate HMAC-SHA256 Token (for secure sessions)
 */
export async function createSessionToken(data, secret) {
  const enc = new TextEncoder();
  const payload = JSON.stringify({
    ...data,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry
  });
  const b64Payload = btoa(payload);

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(b64Payload));
  let binary = '';
  const len = sigBytes.byteLength;
  const bytes = new Uint8Array(sigBytes);
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const sigB64 = btoa(binary);

  return `${b64Payload}.${sigB64}`;
}

/**
 * Verify HMAC-SHA256 Token
 */
export async function verifySessionToken(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [b64Payload, sigB64] = parts;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const binary = atob(sigB64);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(b64Payload));
    if (!valid) return null;

    const payload = JSON.parse(atob(b64Payload));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}
