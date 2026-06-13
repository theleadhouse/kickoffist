import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagsapi.com" },
      { protocol: "https", hostname: "crests.football-data.org" },
      { protocol: "https", hostname: "www.thesportsdb.com" },
      { protocol: "https", hostname: "media.api-sports.io" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "s-maxage=60, stale-while-revalidate=30" },
        ],
      },
    ];
  },
};

export default nextConfig;
