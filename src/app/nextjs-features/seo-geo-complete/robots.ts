import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/", "/nextjs-features", "/nextjs-features/seo-geo-complete", "/blog", "/sitemap.xml"],
				disallow: ["/admin/", "/private/", "/api/private/", "/_next/static/", "/temp/"],
				crawlDelay: 1,
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
				crawlDelay: 0.5,
			},
			{
				userAgent: "Bingbot",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
				crawlDelay: 1,
			},
			{
				userAgent: "Slurp",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
				crawlDelay: 2,
			},
			{
				userAgent: "DuckDuckBot",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
			},
			{
				userAgent: "Baiduspider",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
				crawlDelay: 1,
			},
			{
				userAgent: "Yandexbot",
				allow: "/",
				disallow: ["/admin/", "/private/", "/api/private/"],
				crawlDelay: 2,
			},
		],
		sitemap: [
			"https://your-domain.com/sitemap.xml",
			"https://your-domain.com/sitemap-seo.xml",
			"https://your-domain.com/sitemap-blog.xml",
		],
		host: "https://your-domain.com",
	};
}
