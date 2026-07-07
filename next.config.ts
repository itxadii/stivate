import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/solutions/dispatch-management",
        destination: "/solutions/dispatch-management-software",
        permanent: true,
      },
      {
        source: "/solutions/grn-management",
        destination: "/solutions/grn-management-software",
        permanent: true,
      },
      {
        source: "/solutions/gate-entry",
        destination: "/solutions/gate-entry-management",
        permanent: true,
      },
      {
        source: "/solutions/employee-productivity",
        destination: "/solutions/employee-productivity-tracking",
        permanent: true,
      },
      {
        source: "/solutions/inventory-tracking",
        destination: "/solutions/warehouse-automation",
        permanent: true,
      },
      {
        source: "/solutions/custom-software-development",
        destination: "/solutions/custom-manufacturing-software",
        permanent: true,
      },
      {
        source: "/industries/warehousing",
        destination: "/industries/warehouse",
        permanent: true,
      },
      {
        source: "/industries/3pl-logistics",
        destination: "/industries/3pl",
        permanent: true,
      },
      {
        source: "/industries/food-manufacturing",
        destination: "/industries/food-processing",
        permanent: true,
      },
    ];
  },
};

// Trigger reload to clear cached global.prisma client instance
export default nextConfig;
