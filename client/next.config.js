/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/me', destination: '/me/dashboard', permanent: true }]
  },
  transpilePackages: ['ui'],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
