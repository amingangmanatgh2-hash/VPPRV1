// VPPRV1 Cryptographic Utilities
// Standard WireGuard X25519 Curve and WebCrypto PBKDF2/HMAC implementations

import { x25519 } from '@noble/curves/ed25519';

/**
 * Convert Uint8Array to base64 string
 */
export function toBase64(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Convert base64 string to Uint8Array
 */
export function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generate a cryptographically secure WireGuard X25519 Keypair
 * Returns { privateKey: base64, publicKey: base64 }
 */
export function generateWireGuardKeyPair() {
  const privateBytes = x25519.utils.randomPrivateKey();
  const publicBytes = x25519.getPublicKey(privateBytes);
  return {
    privateKey: toBase64(privateBytes),
    publicKey: toBase64(publicBytes)
  };
}

/**
 * Derive WireGuard X25519 Public Key from Private Key (base64)
 */
export function getPublicKeyFromPrivate(privateKeyBase64) {
  const privateBytes = fromBase64(privateKeyBase64);
  const publicBytes = x25519.getPublicKey(privateBytes);
  return toBase64(publicBytes);
}

/**
 * Generate a 32-byte PresharedKey for WireGuard post-quantum resistance
 */
export function generatePresharedKey() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return toBase64(randomBytes);
}

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
  const sigB64 = toBase64(new Uint8Array(sigBytes));

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

    const sigBytes = fromBase64(sigB64);
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
