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

  // 🔥 IMPORTANT FIX
  turbopack: {},

  // force stable bundling behavior
  webpack: (config) => {
    return config;
  },
};

export default withPWA(nextConfig);
