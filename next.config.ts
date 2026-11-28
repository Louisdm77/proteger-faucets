import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { remotePatterns: [
 { protocol: "https", hostname: "images.unsplash.com" },
 { protocol: "https", hostname: "protegerfaucets.com" }
]},
  async headers() {
    return [{ source: "/img/products/:file*", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] }];
  },
};
export default nextConfig;
