/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  distDir: 'build',
};

module.exports = nextConfig;
