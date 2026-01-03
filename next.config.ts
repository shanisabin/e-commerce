import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "script-src 'none'; sandbox;",
  },};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skilltestnextjs.evidam.zybotechlab.com",
      },
    ],
  },
};



export default nextConfig;
