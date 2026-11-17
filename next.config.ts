import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jandfrental.com" }],
        destination: "https://hamasuhomes.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jandfrental.com" }],
        destination: "https://hamasuhomes.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
