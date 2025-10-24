import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://deckofcardsapi.com/static/img/**")],
  },
};

export default nextConfig;
