"use client";

import {
	ArrowLeft,
	CheckCircle,
	Code,
	Copy,
	Eye,
	FileText,
	Globe,
	Image as ImageIcon,
	Search,
	Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";

interface MetadataExample {
	id: string;
	title: string;
	description: string;
	category: "Dynamic" | "Static" | "Structured" | "Social" | "Sitemap" | "Robots";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	preview?: {
		title: string;
		description: string;
		image?: string;
		url: string;
	};
}

const metadataExamples: MetadataExample[] = [
	{
		id: "dynamic-metadata",
		title: "动态元数据",
		description: "根据页面内容动态生成标题、描述和关键词",
		category: "Dynamic",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function getBlogPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  if (!res.ok) return null;
  return res.json();
}

// 动态生成元数据
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: '文章未找到',
      description: '您访问的文章不存在或已被删除'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    },
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`
    }
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  // 页面组件
}`,
		benefits: ["SEO 优化", "动态内容", "个性化设置", "自动生成"],
		preview: {
			title: "Next.js 15 元数据指南 - 深入理解 SEO 优化",
			description: "全面介绍 Next.js 15 的元数据功能，包括动态元数据、静态元数据、Open Graph 标签等...",
			image: "https://example.com/images/blog-nextjs-metadata.jpg",
			url: "https://example.com/blog/nextjs-metadata-guide",
		},
	},
	{
		id: "static-metadata",
		title: "静态元数据",
		description: "为静态页面定义固定的元数据信息",
		category: "Static",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// app/about/page.tsx
import { Metadata } from 'next';

// 静态元数据
export const metadata: Metadata = {
  title: {
    default: '关于我们 - Next.js 实验室',
    template: '%s | Next.js 实验室'
  },
  description: '了解 Next.js 实验室的团队、使命和愿景。我们致力于提供最好的 Next.js 学习资源。',
  keywords: ['Next.js', 'React', '前端开发', 'Web 开发', '教程'],
  authors: [{ name: 'Next.js 实验室团队' }],
  creator: 'Next.js 实验室',
  publisher: 'Next.js 实验室',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://nextjs-lab.example.com'),
  alternates: {
    canonical: '/about',
    languages: {
      'en-US': '/en/about',
      'zh-CN': '/zh/about'
    }
  },
  openGraph: {
    title: '关于我们 - Next.js 实验室',
    description: '了解 Next.js 实验室的团队、使命和愿景',
    images: ['/images/about-og.jpg'],
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 - Next.js 实验室',
    description: '了解 Next.js 实验室的团队、使命和愿景',
    images: ['/images/about-twitter.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function AboutPage() {
  return <div>关于我们页面内容</div>;
}`,
		benefits: ["简单易用", "性能优化", "缓存友好", "SEO 基础"],
		preview: {
			title: "关于我们 | Next.js 实验室",
			description: "了解 Next.js 实验室的团队、使命和愿景。我们致力于提供最好的 Next.js 学习资源。",
			url: "https://nextjs-lab.example.com/about",
		},
	},
	{
		id: "structured-data",
		title: "结构化数据",
		description: "使用 JSON-LD 格式添加结构化数据，提升搜索结果展示",
		category: "Structured",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// app/products/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    // 添加结构化数据
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images,
        brand: {
          '@type': 'Brand',
          name: product.brand
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CNY',
          price: product.price,
          availability: 'https://schema.org/InStock'
        },
        review: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: product.reviews[0].author
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: product.reviews[0].rating,
            bestRating: 5
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.averageRating,
          reviewCount: product.reviewCount
        }
      })
    }
  };
}

// 文章的结构化数据示例
const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '文章标题',
  description: '文章描述',
  image: 'https://example.com/image.jpg',
  author: {
    '@type': 'Person',
    name: '作者姓名'
  },
  publisher: {
    '@type': 'Organization',
    name: '网站名称',
    logo: {
      '@type': 'ImageObject',
      url: 'https://example.com/logo.jpg'
    }
  },
  datePublished: '2024-01-01',
  dateModified: '2024-01-02'
};`,
		benefits: ["搜索优化", "丰富摘要", "点击率提升", "用户体验"],
		preview: {
			title: "iPhone 15 Pro - 产品详情 | 电商网站",
			description: "iPhone 15 Pro 采用钛金属设计，搭载 A17 Pro 芯片，支持 USB-C 接口，配备专业级相机系统。",
			url: "https://example.com/products/iphone-15-pro",
		},
	},
	{
		id: "social-media",
		title: "社交媒体优化",
		description: "优化 Open Graph 和 Twitter Cards 标签，提升社交媒体分享效果",
		category: "Social",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // 基础设置
  title: 'Next.js 实验室',
  description: '学习和探索 Next.js 的最佳平台',

  // Open Graph 标签
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://nextjs-lab.example.com',
    siteName: 'Next.js 实验室',
    title: 'Next.js 实验室 - 学习 Next.js 的最佳平台',
    description: '提供 Next.js 教程、实战项目和最佳实践分享',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js 实验室'
      }
    ]
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@nextjslab',
    creator: '@nextjslab',
    title: 'Next.js 实验室 - 学习 Next.js 的最佳平台',
    description: '提供 Next.js 教程、实战项目和最佳实践分享',
    images: ['/images/twitter-default.jpg']
  },

  // 其他社交平台
  other: {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@nextjslab',
    'twitter:creator': '@nextjslab',
    'twitter:title': 'Next.js 实验室',
    'twitter:description': '学习和探索 Next.js 的最佳平台',
    'twitter:image': 'https://nextjs-lab.example.com/images/twitter-default.jpg'
  }
};

// 动态社交媒体图片生成
export async function generateSocialImage(title: string, description: string) {
  const imageUrl = \`https://api.example.com/og?title=\${encodeURIComponent(title)}&description=\${encodeURIComponent(description)}\`;

  return {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: title
  };
}`,
		benefits: ["社交分享优化", "品牌一致性", "点击率提升", "用户体验"],
		preview: {
			title: "Next.js 实验室 - 学习 Next.js 的最佳平台",
			description: "提供 Next.js 教程、实战项目和最佳实践分享",
			image: "https://nextjs-lab.example.com/images/social-share.jpg",
			url: "https://nextjs-lab.example.com",
		},
	},
	{
		id: "sitemap-generation",
		title: "Sitemap 生成",
		description: "自动生成网站地图，帮助搜索引擎更好地索引网站内容",
		category: "Sitemap",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextjs-lab.example.com';

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/about\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/blog\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 动态生成博客文章页面
  async function generateBlogSitemaps() {
    const posts = await getBlogPosts();

    return posts.map((post) => ({
      url: \`\${baseUrl}/blog/\${post.slug}\`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  }

  // 生成所有页面
  const allPages = [...staticPages, ...await generateBlogSitemaps()];

  return allPages;
}

// 多语言 sitemap
export function sitemapI18n(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextjs-lab.example.com';

  return [
    {
      url: \`\${baseUrl}/en\`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          'en': \`\${baseUrl}/en\`,
          'zh': \`\${baseUrl}/zh\`,
        }
      }
    },
    {
      url: \`\${baseUrl}/zh\`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          'en': \`\${baseUrl}/en\`,
          'zh': \`\${baseUrl}/zh\`,
        }
      }
    }
  ];
}

// 图片 sitemap
export function imagesSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextjs-lab.example.com';

  return [
    {
      url: \`\${baseUrl}/images/hero.jpg\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        {
          url: \`\${baseUrl}/images/hero.jpg\`,
          title: 'Hero Image',
          caption: 'Next.js 实验室首页背景图'
        }
      ]
    }
  ];
}`,
		benefits: ["SEO 优化", "索引完整性", "爬虫友好", "网站架构"],
		preview: {
			title: "Sitemap - Next.js 实验室",
			description: "XML 格式的网站地图，包含所有页面链接和元数据信息",
			url: "https://nextjs-lab.example.com/sitemap.xml",
		},
	},
	{
		id: "robots-txt",
		title: "Robots.txt 配置",
		description: "配置搜索引擎爬虫行为，控制页面索引权限",
		category: "Robots",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nextjs-lab.example.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
        '/*.json$',
        '/*.xml$'
      ],
      crawlDelay: 1
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
    host: baseUrl
  };
}

// 针对不同搜索引擎的配置
export function robotsBySearchEngine(): MetadataRoute.Robots {
  const baseUrl = 'https://nextjs-lab.example.com';

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/'],
        crawlDelay: 1
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/private/', '/admin/'],
        crawlDelay: 2
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/private/', '/admin/'],
        crawlDelay: 3
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/private/', '/admin/']
      }
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
    host: baseUrl
  };
}

// 环境变量配置的 robots.txt
export function dynamicRobots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nextjs-lab.example.com';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : '/disallowed-in-dev/',
      disallow: isProduction
        ? ['/private/', '/admin/', '/api/']
        : '/'
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
    host: baseUrl
  };
}`,
		benefits: ["爬虫控制", "隐私保护", "性能优化", "SEO 管理"],
		preview: {
			title: "Robots.txt - Next.js 实验室",
			description: "搜索引擎爬虫访问规则和网站地图链接配置",
			url: "https://nextjs-lab.example.com/robots.txt",
		},
	},
];

export default function MetadataFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<MetadataExample | null>(null);
	const [copiedCode, setCopiedCode] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedCode(true);
			setTimeout(() => setCopiedCode(false), 2000);
		} catch (error) {
			console.error("复制失败:", error);
		}
	};

	const getCategoryColor = (category: MetadataExample["category"]) => {
		switch (category) {
			case "Dynamic":
				return "text-blue-600 bg-blue-100";
			case "Static":
				return "text-green-600 bg-green-100";
			case "Structured":
				return "text-purple-600 bg-purple-100";
			case "Social":
				return "text-orange-600 bg-orange-100";
			case "Sitemap":
				return "text-indigo-600 bg-indigo-100";
			case "Robots":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: MetadataExample["difficulty"]) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusColor = (status: MetadataExample["status"]) => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: MetadataExample["status"]) => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
							>
								<ArrowLeft className="mr-2 h-5 w-5" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<FileText className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">元数据和 SEO 特性</h1>
									<p className="text-gray-600">Next.js 完整的 SEO 解决方案：动态元数据、结构化数据、社交媒体优化</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* SEO 概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">SEO 特性概览</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-6">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Search className="mx-auto mb-2 h-6 w-6 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">搜索引擎</h3>
								<p className="text-blue-700 text-sm">优化排名</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<FileText className="mx-auto mb-2 h-6 w-6 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">元数据</h3>
								<p className="text-green-700 text-sm">动态生成</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Globe className="mx-auto mb-2 h-6 w-6 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">结构化</h3>
								<p className="text-purple-700 text-sm">数据标记</p>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<Share2 className="mx-auto mb-2 h-6 w-6 text-orange-600" />
								<h3 className="mb-1 font-semibold text-orange-900">社交媒体</h3>
								<p className="text-orange-700 text-sm">优化分享</p>
							</div>
							<div className="rounded-lg bg-indigo-50 p-4 text-center">
								<ImageIcon className="mx-auto mb-2 h-6 w-6 text-indigo-600" />
								<h3 className="mb-1 font-semibold text-indigo-900">网站地图</h3>
								<p className="text-indigo-700 text-sm">自动生成</p>
							</div>
							<div className="rounded-lg bg-red-50 p-4 text-center">
								<Code className="mx-auto mb-2 h-6 w-6 text-red-600" />
								<h3 className="mb-1 font-semibold text-red-900">爬虫控制</h3>
								<p className="text-red-700 text-sm">权限管理</p>
							</div>
						</div>
					</div>
				</div>

				{/* 元数据示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">实现示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{metadataExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-blue-500" : ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="mb-3 flex items-start justify-between">
											<div>
												<h3 className="mb-1 font-semibold text-gray-900 text-lg">{example.title}</h3>
												<div className="mb-2 flex items-center space-x-2">
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getCategoryColor(example.category)}`}
													>
														{example.category}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getDifficultyColor(example.difficulty)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{example.description}</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<Eye className="h-4 w-4 text-gray-400" />
												<span className="text-gray-500 text-sm">SEO 优化</span>
											</div>
											{example.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-6">
										<div className="mb-4 flex items-center justify-between">
											<h3 className="font-semibold text-gray-900 text-xl">{selectedExample.title}</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm ${getCategoryColor(selectedExample.category)}`}
												>
													{selectedExample.category}
												</span>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{selectedExample.description}</p>

										{/* 搜索结果预览 */}
										{selectedExample.preview && (
											<div className="mb-4">
												<h4 className="mb-2 font-medium text-gray-900 text-sm">搜索结果预览</h4>
												<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
													<div className="space-y-2">
														<div className="cursor-pointer font-medium text-blue-600 text-sm hover:underline">
															{selectedExample.preview.title}
														</div>
														<div className="text-green-600 text-xs">{selectedExample.preview.url}</div>
														<div className="text-gray-600 text-sm">{selectedExample.preview.description}</div>
													</div>
												</div>
											</div>
										)}
									</div>

									<div className="p-6">
										<div className="mb-3 flex items-center justify-between">
											<h4 className="font-semibold text-gray-900">代码示例</h4>
											<button
												onClick={() => copyToClipboard(selectedExample.codeSnippet)}
												className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-900"
											>
												<Copy className="h-4 w-4" />
												<span>{copiedCode ? "已复制" : "复制"}</span>
											</button>
										</div>
										<div className="mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										{/* 主要优势 */}
										<div className="mb-6">
											<h5 className="mb-2 font-medium text-gray-900">主要优势</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该功能已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个元数据示例</h3>
									<p className="text-gray-600">点击左侧的示例查看详细信息和代码实现</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
