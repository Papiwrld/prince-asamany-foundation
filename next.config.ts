import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // All images are local — no remote patterns needed.
    // The hero image uses quality={90}; allow it so the build doesn't warn.
    qualities: [75, 90],
  },
};

export default nextConfig;
