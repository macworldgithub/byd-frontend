import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.virtualyard.com.au",
        pathname: "/**",
      },
    ],
  },

  // 🔥 IMPORTANT FIX
  turbopack: {},

  // force stable bundling behavior
  webpack: (config) => {
    return config;
  },
};

export default withPWA(nextConfig);
