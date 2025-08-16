/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出配置
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 关键修复：禁用图片优化，兼容静态导出
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
