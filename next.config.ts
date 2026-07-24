import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photography is served from Unsplash. We allow their image host and
    // request modern formats so Next/Image can optimise + serve AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
