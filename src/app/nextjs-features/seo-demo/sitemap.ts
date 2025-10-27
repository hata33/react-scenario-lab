import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://your-domain.com";

	// 静态页面
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/nextjs-features`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/nextjs-features/seo-demo`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
	];

	// 模拟动态博客文章
	const blogPosts = [
		{
			url: `${baseUrl}/blog/nextjs-15-features`,
			lastModified: new Date("2024-01-15"),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog/react-server-components`,
			lastModified: new Date("2024-01-10"),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog/performance-optimization`,
			lastModified: new Date("2024-01-05"),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
	];

	return [...staticPages, ...blogPosts];
}
