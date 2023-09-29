/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'critics.io',
          port: '',
        },
      ],
    },
  }
