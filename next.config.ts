/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {},

  allowedDevOrigins: ["192.168.1.104", "http://192.168.1.104:3000", '10.210.74.213'],
};

module.exports = nextConfig;
