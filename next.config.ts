import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: "4mb",
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
