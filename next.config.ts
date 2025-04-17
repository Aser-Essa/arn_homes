import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.cdn-redfin.com",
      },
      {
        protocol: "https",
        hostname: "my.matterport.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
    ],
  },
};

export default nextConfig;
