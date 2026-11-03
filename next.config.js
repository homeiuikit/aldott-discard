/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local /public assets only for now. Add remote patterns here when a CMS/CDN is wired in.
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
