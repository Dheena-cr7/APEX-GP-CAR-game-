// ICE servers for WebRTC (internet rooms).
//
// STUN lets two players find each other's public address; that is enough on
// most home networks. Strict networks (mobile data, carrier-grade NAT, many
// office / campus Wi-Fi) also need a TURN relay. PeerJS's bundled relays no
// longer exist, so a TURN server is configured at build time:
//
//   VITE_TURN_URLS        comma-separated, e.g. "turn:a.example.com:80,turns:a.example.com:443?transport=tcp"
//   VITE_TURN_USERNAME
//   VITE_TURN_CREDENTIAL
//
// (GitHub Pages: set them as repository variables / secrets; see README.)

const STUN = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
  { urls: 'stun:stun.cloudflare.com:3478' },
];

export function turnConfigured() {
  return !!(import.meta.env && import.meta.env.VITE_TURN_URLS);
}

export function iceServers() {
  const env = import.meta.env || {};
  const list = STUN.slice();
  if (env.VITE_TURN_URLS) {
    list.push({
      urls: String(env.VITE_TURN_URLS).split(',').map((u) => u.trim()).filter(Boolean),
      username: env.VITE_TURN_USERNAME || '',
      credential: env.VITE_TURN_CREDENTIAL || '',
    });
  }
  return list;
}
