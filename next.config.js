/** @type {import('next').NextConfig} */
const nextConfig = {
	// 启用 standalone 输出以支持 Docker 部署
	output: "standalone",
	typescript: {
		ignoreBuildErrors: false,
	},
	// 关键修复：禁用图片优化，兼容静态导出
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
