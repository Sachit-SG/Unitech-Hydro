import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
