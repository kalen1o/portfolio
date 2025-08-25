/** @type {import('next').Config} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: process.env.NODE_ENV === "production",
  assetPrefix: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    unoptimized: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
