/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@elo-tech/ui', '@elo-tech/utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
