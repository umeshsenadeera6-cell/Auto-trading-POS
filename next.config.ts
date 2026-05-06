import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
