/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/portfolio",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
