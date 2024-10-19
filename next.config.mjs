/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@resvg/resvg-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME,
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
      },
    ],
  },
};

export default nextConfig;
