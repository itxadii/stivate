import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
};

// Trigger reload to clear cached global.prisma client instance
export default nextConfig;
