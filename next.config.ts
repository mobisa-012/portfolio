import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['miro.medium.com', 'cdn-images-1.medium.com', 'medium.com'],
  },
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
