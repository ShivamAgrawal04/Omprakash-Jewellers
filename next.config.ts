import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/bridal", destination: "/collections/bridal", permanent: true },
      { source: "/new-arrivals", destination: "/jewellery", permanent: true },
      { source: "/offers", destination: "/jewellery", permanent: true },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/craftsmanship", destination: "/about", permanent: true },
      { source: "/care", destination: "/about", permanent: true },
      { source: "/visit", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
