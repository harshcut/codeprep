const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/me', destination: '/me/dashboard', permanent: true }]
  },
  transpilePackages: ['ui'],
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

module.exports = withMDX(nextConfig)
