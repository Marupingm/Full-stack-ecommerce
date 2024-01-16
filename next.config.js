/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
  // Ensure production builds are optimized
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
// Modified on 2025-02-19 00:50:50
