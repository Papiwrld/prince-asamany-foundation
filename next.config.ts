import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // All images are local — no remote patterns needed.
    // 75 = default for most <Image>, 82 = hero background, 90 = high-detail cards.
    qualities: [75, 82, 90],
  },
};

export default nextConfig;
