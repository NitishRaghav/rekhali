/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'localhost:5000',
    '*.replit.dev',
    '*.sisko.replit.dev',
  ],
}

export default nextConfig
