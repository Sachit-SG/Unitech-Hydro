import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

function buildCsp(): string {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  const connectSrc = isDev
    ? "connect-src 'self' https://api.resend.com ws: wss: http://localhost:* http://127.0.0.1:*"
    : "connect-src 'self' https://api.resend.com";

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    connectSrc,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: "4mb",
  },
  async headers() {
    const csp = buildCsp();
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dam2.jpg",
        destination: "/images/upper-phawa-headworks.jpg",
        permanent: true,
      },
      {
        source: "/dam.jpg",
        destination: "/images/upper-phawa-civil-works.jpg",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
