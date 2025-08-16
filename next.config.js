/** @type {import('next').NextConfig} */
const nextConfig = {
  // 暂时禁用 React Compiler，避免依赖问题
  // experimental: {
  //   reactCompiler: true,
  // },
  // 启用 TypeScript 严格模式
  typescript: {
    ignoreBuildErrors: false,
  },
  // 启用 ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
