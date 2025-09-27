/** @type {import('next').NextConfig} */

const prodConfig = {
  protocol: "https",
  hostname: "ziarahapi.dreamtourism.co.uk",
  port: "",
  pathname: "**/media/**",
};
const localConfig = {
  protocol: "http",
  hostname: "192.168.0.101",
  port: "8000",
  pathname: "**/media/**",
};
const cloudFlareConfig = {
  protocol: "https",
  hostname: "imagedelivery.net",
  port: "",
  pathname: "",
};

const nextConfig = {
  images: {
    domains: ["imagedelivery.net"], // Add the hostname here
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  output: "standalone",
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "/api/gone",
        },
      ],
    };
  },
};

module.exports = nextConfig;
