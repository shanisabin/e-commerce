import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skilltestnextjs.evidam.zybotechlab.com",
      },
    ],
  },
};

export default nextConfig;

