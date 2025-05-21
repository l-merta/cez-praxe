import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://images.metmuseum.org/**')],
  },
};

export default nextConfig;
