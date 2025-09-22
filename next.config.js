/** @type {import('next').NextConfig} */
const nextConfig = {
	// 移除 output 配置，使用默认值
	typescript: {
		ignoreBuildErrors: false,
	},
	// 关键修复：禁用图片优化，兼容静态导出
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
