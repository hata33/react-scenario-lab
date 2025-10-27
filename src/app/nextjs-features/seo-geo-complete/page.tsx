import {
	ArrowLeft,
	Award,
	BookOpen,
	Brain,
	CheckCircle2,
	Clock,
	Code,
	Globe,
	MapPin,
	Search,
	Shield,
	Star,
	Target,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";

// 1. 完整的元数据配置 - 针对SEO优化
export const metadata: Metadata = {
	title: "SEO 与 GEO 优化完整实战指南 | Next.js 15 深度解析",
	description:
		"全面展示传统SEO与生成式AI优化(GEO)策略，包括技术SEO、内容权威性、结构化数据、地理位置优化等完整解决方案，助您在AI时代获得更好的搜索表现。",
	keywords: [
		"SEO优化",
		"GEO优化",
		"生成式AI优化",
		"Next.js SEO",
		"结构化数据",
		"E-E-A-T原则",
		"本地SEO",
		"地理位置优化",
		"Schema.org",
		"Core Web Vitals",
		"AI搜索引擎优化",
		"ChatGPT优化",
		"语音搜索SEO",
		"移动端SEO",
	],
	authors: [
		{ name: "SEO优化专家团队", url: "https://your-domain.com/about" },
		{ name: "技术顾问", url: "https://your-domain.com/team" },
	],
	creator: "Next.js实验室",
	publisher: "Next.js实验室",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://your-domain.com"),
	alternates: {
		canonical: "/nextjs-features/seo-geo-complete",
		languages: {
			"zh-CN": "/zh-cn/nextjs-features/seo-geo-complete",
			"en-US": "/en/nextjs-features/seo-geo-complete",
			"ja-JP": "/ja/nextjs-features/seo-geo-complete",
		},
	},
	openGraph: {
		title: "SEO 与 GEO 优化完整实战指南",
		description: "全面展示传统SEO与生成式AI优化策略，助您在AI时代获得更好的搜索表现",
		url: "https://your-domain.com/nextjs-features/seo-geo-complete",
		siteName: "Next.js实验室",
		images: [
			{
				url: "https://your-domain.com/og-seo-geo.jpg",
				width: 1200,
				height: 630,
				alt: "SEO 与 GEO 优化完整实战指南",
			},
			{
				url: "https://your-domain.com/og-seo-geo-square.jpg",
				width: 600,
				height: 600,
				alt: "SEO 与 GEO 优化",
			},
		],
		locale: "zh_CN",
		type: "article",
		publishedTime: "2024-01-15T00:00:00Z",
		modifiedTime: new Date().toISOString(),
		expirationTime: "2025-01-15T00:00:00Z",
		authors: ["SEO优化专家团队"],
		section: "技术指南",
		tags: ["SEO", "GEO", "Next.js", "优化", "AI"],
	},
	twitter: {
		card: "summary_large_image",
		title: "SEO 与 GEO 优化完整实战指南",
		description: "全面展示传统SEO与生成式AI优化策略，助您在AI时代获得更好的搜索表现",
		siteId: "123456789",
		creator: "@nextjs_lab",
		creatorId: "987654321",
		images: ["https://your-domain.com/twitter-seo-geo.jpg"],
	},
	// app: {
	//   name: "SEO优化工具",
	//   url: "https://your-domain.com/app",
	//   category: "productivity",
	// },
	verification: {
		google: "your-google-verification-code",
		yandex: "your-yandex-verification-code",
		other: { baidu: "your-baidu-verification-code" },
	},
	other: {
		"msvalidate.01": "your-bing-verification-code",
		"facebook-domain-verification": "your-facebook-verification-code",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "technology",
	classification: "教育内容",
	referrer: "origin-when-cross-origin",
};

// 2. 文章结构化数据 - 符合E-E-A-T原则
function generateArticleStructuredData() {
	const currentDate = new Date();
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: "SEO 与 GEO 优化完整实战指南",
		description: "全面展示传统SEO与生成式AI优化策略，包括技术SEO、内容权威性、结构化数据、地理位置优化等完整解决方案。",
		image: ["https://your-domain.com/seo-geo-hero.jpg", "https://your-domain.com/seo-geo-thumbnail.jpg"],
		datePublished: "2024-01-15T00:00:00+00:00",
		dateModified: currentDate.toISOString(),
		author: [
			{
				"@type": "Person",
				name: "SEO优化专家",
				url: "https://your-domain.com/author/seo-expert",
				jobTitle: "首席SEO顾问",
				worksFor: {
					"@type": "Organization",
					name: "Next.js实验室",
					url: "https://your-domain.com",
				},
				knowsAbout: ["SEO优化", "GEO策略", "Next.js", "搜索引擎算法"],
				alumniOf: {
					"@type": "EducationalOrganization",
					name: "计算机科学学院",
				},
			},
		],
		publisher: {
			"@type": "Organization",
			name: "Next.js实验室",
			url: "https://your-domain.com",
			logo: {
				"@type": "ImageObject",
				url: "https://your-domain.com/logo.png",
				width: 600,
				height: 60,
			},
			foundingDate: "2020-01-01",
			address: {
				"@type": "PostalAddress",
				streetAddress: "科技园区路88号",
				addressLocality: "北京市",
				addressRegion: "北京",
				postalCode: "100000",
				addressCountry: "CN",
			},
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+86-10-12345678",
				contactType: "客户服务",
				availableLanguage: ["中文", "English"],
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": "https://your-domain.com/nextjs-features/seo-geo-complete",
		},
		isPartOf: {
			"@type": "WebSite",
			name: "Next.js实验室",
			url: "https://your-domain.com",
		},
		inLanguage: "zh-CN",
		isAccessibleForFree: true,
		about: [
			{
				"@type": "Thing",
				name: "SEO优化",
			},
			{
				"@type": "Thing",
				name: "GEO优化",
			},
			{
				"@type": "Thing",
				name: "Next.js",
			},
		],
		mentions: [
			{
				"@type": "Organization",
				name: "Google",
			},
			{
				"@type": "Organization",
				name: "OpenAI",
			},
		],
		educationalLevel: "Intermediate",
		learningResourceType: "指南",
		audience: {
			"@type": "EducationalAudience",
			educationalRole: "学生",
		},
	};
}

// 3. 面包屑结构化数据
function generateBreadcrumbStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "首页",
				item: "https://your-domain.com",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Next.js特性",
				item: "https://your-domain.com/nextjs-features",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: "SEO GEO完整优化",
				item: "https://your-domain.com/nextjs-features/seo-geo-complete",
			},
		],
	};
}

// 4. FAQ结构化数据 - 针对GEO优化
function generateFAQStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "什么是GEO优化？它与传统SEO有什么区别？",
				acceptedAnswer: {
					"@type": "Answer",
					text: "GEO（Generative Engine Optimization）是针对生成式AI引擎的优化策略，旨在使内容被AI工具优先引用。与传统SEO不同，GEO通过优化信息结构、提升内容在AI生成答案中的引用率，实现'曝光即价值'的传播效果。传统SEO关注搜索引擎排名，而GEO关注AI生成内容的引用率。",
				},
			},
			{
				"@type": "Question",
				name: "如何实施E-E-A-T原则来提升内容权威性？",
				acceptedAnswer: {
					"@type": "Answer",
					text: "实施E-E-A-T原则需要：1）展示专业经验（Experience）：分享实际案例和项目经验；2）体现专业能力（Expertise）：使用准确术语和深度分析；3）建立权威性（Authority）：引用权威来源和获得同行认可；4）构建可信度（Trustworthiness）：透明化数据来源和提供完整联系信息。",
				},
			},
			{
				"@type": "Question",
				name: "Next.js在SEO优化方面相比React SPA有哪些核心优势？",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Next.js的核心优势包括：1）服务端渲染生成完整HTML，搜索引擎可直接抓取内容；2）自动元数据管理，每个页面都有独特的title和meta标签；3）内置图片优化和代码分割；4）自动生成sitemap和robots.txt；5）更好的Core Web Vitals性能指标。这些优势使Next.js成为SEO友好的理想选择。",
				},
			},
		],
	};
}

// 5. How-To结构化数据 - 针对GEO优化
function generateHowToStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: "如何实施完整的SEO与GEO优化策略",
		description: "分步骤指导您实现传统SEO与生成式AI优化的完整解决方案",
		image: "https://your-domain.com/how-to-seo-geo.jpg",
		totalTime: "PT2H",
		estimatedCost: {
			"@type": "MonetaryAmount",
			currency: "CNY",
			value: "0",
		},
		supply: [
			{
				"@type": "HowToSupply",
				name: "Next.js项目",
			},
			{
				"@type": "HowToSupply",
				name: "代码编辑器",
			},
			{
				"@type": "HowToSupply",
				name: "Google Search Console账号",
			},
		],
		tool: [
			{
				"@type": "HowToTool",
				name: "Schema.org验证工具",
			},
			{
				"@type": "HowToTool",
				name: "页面速度检测工具",
			},
			{
				"@type": "HowToTool",
				name: "关键词研究工具",
			},
		],
		step: [
			{
				"@type": "HowToStep",
				name: "技术SEO基础配置",
				text: "配置Next.js服务端渲染，设置metadata，生成sitemap和robots.txt文件",
				image: "https://your-domain.com/step1-technical-seo.jpg",
				url: "https://your-domain.com/seo-geo/step1",
			},
			{
				"@type": "HowToStep",
				name: "结构化数据实施",
				text: "添加JSON-LD格式的Schema.org标记，包括文章、FAQ、How-To等类型",
				image: "https://your-domain.com/step2-structured-data.jpg",
				url: "https://your-domain.com/seo-geo/step2",
			},
			{
				"@type": "HowToStep",
				name: "E-E-A-T内容优化",
				text: "展示作者专业背景，引用权威来源，建立内容可信度",
				image: "https://your-domain.com/step3-e-e-a-t.jpg",
				url: "https://your-domain.com/seo-geo/step3",
			},
			{
				"@type": "HowToStep",
				name: "GEO策略实施",
				text: "优化AI友好的内容结构，提升在生成式AI中的引用率",
				image: "https://your-domain.com/step4-geo-strategy.jpg",
				url: "https://your-domain.com/seo-geo/step4",
			},
			{
				"@type": "HowToStep",
				name: "性能监控和优化",
				text: "使用工具监控SEO指标，持续优化Core Web Vitals和用户体验",
				image: "https://your-domain.com/step5-monitoring.jpg",
				url: "https://your-domain.com/seo-geo/step5",
			},
		],
	};
}

// 6. 本地商家结构化数据
function generateLocalBusinessStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Next.js实验室 - SEO优化服务中心",
		description: "专业的SEO与GEO优化服务提供商，助力企业在AI时代获得更好的搜索表现",
		url: "https://your-domain.com",
		telephone: "+86-10-12345678",
		address: {
			"@type": "PostalAddress",
			streetAddress: "科技园区路88号",
			addressLocality: "北京市",
			addressRegion: "北京",
			postalCode: "100000",
			addressCountry: "CN",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 39.9042,
			longitude: 116.4074,
		},
		openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
		priceRange: "$$",
		paymentAccepted: ["现金", "信用卡", "银行转账"],
		currenciesAccepted: "CNY",
		image: ["https://your-domain.com/office-front.jpg", "https://your-domain.com/office-interior.jpg"],
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			reviewCount: 156,
			bestRating: "5",
			worstRating: "1",
		},
		review: [
			{
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "5",
				},
				author: {
					"@type": "Person",
					name: "张经理",
				},
				reviewBody:
					"专业的SEO优化服务，帮助我们的网站在搜索引擎中的排名大幅提升，特别是在AI搜索时代，他们的GEO策略非常有效。",
			},
			{
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "4",
				},
				author: {
					"@type": "Person",
					name: "李总监",
				},
				reviewBody: "团队专业度高，技术实力强，为我们的电商网站提供了完整的SEO解决方案，效果显著。",
			},
		],
		areaServed: [
			{
				"@type": "Place",
				name: "北京市",
			},
			{
				"@type": "Place",
				name: "上海市",
			},
			{
				"@type": "Place",
				name: "广州市",
			},
			{
				"@type": "Place",
				name: "深圳市",
			},
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "SEO服务目录",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "技术SEO优化",
						description: "Next.js SEO配置、性能优化、结构化数据实施",
					},
					price: "5000",
					priceCurrency: "CNY",
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "GEO策略咨询",
						description: "生成式AI优化、E-E-A-T内容建设、AI搜索优化",
					},
					price: "8000",
					priceCurrency: "CNY",
				},
			],
		},
	};
}

// 页面内容数据
const seoFeatures = [
	{
		id: "technical-seo",
		title: "技术SEO优化",
		description: "Next.js服务端渲染、性能优化、移动端适配等核心技术",
		icon: <Code className="h-8 w-8" />,
		status: "completed",
		category: "技术实现",
		benefits: ["完整HTML输出", "快速加载速度", "移动端友好", "HTTPS安全"],
		examples: ["服务端渲染", "代码分割", "图片优化", "缓存策略"],
	},
	{
		id: "content-authority",
		title: "内容权威性(E-E-A-T)",
		description: "建立经验、专业、权威、可信的内容体系",
		icon: <Award className="h-8 w-8" />,
		status: "completed",
		category: "内容策略",
		benefits: ["提升内容可信度", "获得AI优先引用", "建立品牌权威", "用户信任增强"],
		examples: ["专家背书", "权威引用", "案例展示", "资质认证"],
	},
	{
		id: "structured-data",
		title: "结构化数据",
		description: "Schema.org标准标记，提升搜索引擎理解能力",
		icon: <Target className="h-8 w-8" />,
		status: "completed",
		category: "技术实现",
		benefits: ["丰富搜索结果", "提升点击率", "AI友好格式", "知识图谱集成"],
		examples: ["文章标记", "FAQ结构化", "How-To指南", "本地商家信息"],
	},
	{
		id: "geo-optimization",
		title: "GEO生成式AI优化",
		description: "针对ChatGPT等AI工具的优化策略",
		icon: <Brain className="h-8 w-8" />,
		status: "completed",
		category: "AI优化",
		benefits: ["AI工具引用", "知识图谱收录", "语音搜索优化", "未来趋势适应"],
		examples: ["AI友好内容", "结构化答案", "专业知识库", "问答优化"],
	},
	{
		id: "local-seo",
		title: "本地SEO优化",
		description: "地理位置相关搜索优化，服务本地用户",
		icon: <MapPin className="h-8 w-8" />,
		status: "completed",
		category: "地理位置",
		benefits: ["本地搜索排名", "附近用户触达", "地图展示优化", "本地流量增长"],
		examples: ["Google Business", "本地关键词", "地理标记", "本地评价管理"],
	},
	{
		id: "performance-monitoring",
		title: "性能监控分析",
		description: "Core Web Vitals优化和SEO指标监控",
		icon: <TrendingUp className="h-8 w-8" />,
		status: "completed",
		category: "性能优化",
		benefits: ["用户体验提升", "搜索排名改善", "转化率增长", "技术债务减少"],
		examples: ["页面速度监控", "用户行为分析", "A/B测试", "SEO报告生成"],
	},
];

const faqData = [
	{
		question: "什么是GEO优化？它与传统SEO有什么区别？",
		answer:
			"GEO（Generative Engine Optimization）是针对生成式AI引擎的优化策略，旨在使内容被AI工具优先引用。与传统SEO不同，GEO通过优化信息结构、提升内容在AI生成答案中的引用率，实现'曝光即价值'的传播效果。传统SEO关注搜索引擎排名，而GEO关注AI生成内容的引用率。",
	},
	{
		question: "如何实施E-E-A-T原则来提升内容权威性？",
		answer:
			"实施E-E-A-T原则需要：1）展示专业经验（Experience）：分享实际案例和项目经验；2）体现专业能力（Expertise）：使用准确术语和深度分析；3）建立权威性（Authority）：引用权威来源和获得同行认可；4）构建可信度（Trustworthiness）：透明化数据来源和提供完整联系信息。",
	},
	{
		question: "Next.js在SEO优化方面相比React SPA有哪些核心优势？",
		answer:
			"Next.js的核心优势包括：1）服务端渲染生成完整HTML，搜索引擎可直接抓取内容；2）自动元数据管理，每个页面都有独特的title和meta标签；3）内置图片优化和代码分割；4）自动生成sitemap和robots.txt；5）更好的Core Web Vitals性能指标。这些优势使Next.js成为SEO友好的理想选择。",
	},
	{
		question: "如何检测和优化Core Web Vitals指标？",
		answer:
			"使用Google PageSpeed Insights、Chrome DevTools的Lighthouse面板、以及Search Console的Core Web Vitals报告。优化策略包括：LCP优化图片预加载、FID优化JavaScript执行、CLS优化元素尺寸预设。定期监控这些指标，确保用户体验符合搜索引擎要求。",
	},
	{
		question: "结构化数据对SEO和GEO优化有什么作用？",
		answer:
			"结构化数据帮助搜索引擎和AI工具更好地理解页面内容。对于SEO，它能够获得丰富的搜索结果展示（如评分、价格、FAQ等）；对于GEO，它提供了机器可读的数据格式，更容易被AI工具理解和引用。常见的结构化数据类型包括Article、FAQ、How-To、LocalBusiness等。",
	},
	{
		question: "如何优化内容以适应语音搜索和AI助手？",
		answer:
			"语音搜索优化要点：使用自然语言和长尾关键词、优化页面加载速度、确保移动端友好、提供简洁直接的答案、使用结构化数据标记FAQ。AI助手优化：创建明确的问题-答案对、使用清晰的内容结构、提供权威可靠的信息、确保内容易于理解和引用。",
	},
];

const howToSteps = [
	{
		step: 1,
		title: "技术SEO基础配置",
		description: "配置Next.js服务端渲染，设置metadata，生成sitemap和robots.txt文件",
		duration: "30分钟",
		difficulty: "初级",
		tools: ["Next.js", "TypeScript", "代码编辑器"],
		outcomes: ["完整HTML输出", "自动元数据管理", "搜索引擎可访问"],
	},
	{
		step: 2,
		title: "结构化数据实施",
		description: "添加JSON-LD格式的Schema.org标记，包括文章、FAQ、How-To等类型",
		duration: "45分钟",
		difficulty: "中级",
		tools: ["Schema.org验证器", "JSON编辑器", "测试工具"],
		outcomes: ["丰富搜索结果", "AI友好格式", "知识图谱集成"],
	},
	{
		step: 3,
		title: "E-E-A-T内容优化",
		description: "展示作者专业背景，引用权威来源，建立内容可信度",
		duration: "60分钟",
		difficulty: "高级",
		tools: ["内容管理系统", "引用管理工具", "资质认证材料"],
		outcomes: ["内容权威性提升", "用户信任增强", "SEO排名改善"],
	},
	{
		step: 4,
		title: "GEO策略实施",
		description: "优化AI友好的内容结构，提升在生成式AI中的引用率",
		duration: "40分钟",
		difficulty: "高级",
		tools: ["AI工具", "内容分析平台", "引用跟踪工具"],
		outcomes: ["AI工具引用率提升", "知识图谱收录", "未来趋势适应"],
	},
	{
		step: 5,
		title: "性能监控和优化",
		description: "使用工具监控SEO指标，持续优化Core Web Vitals和用户体验",
		duration: "持续进行",
		difficulty: "中级",
		tools: ["Google Search Console", "PageSpeed Insights", "分析平台"],
		outcomes: ["性能指标达标", "用户体验优化", "SEO效果持续提升"],
	},
];

export default function SEOGeoCompletePage() {
	return (
		<Layout>
			<>
				{/* 结构化数据 */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateArticleStructuredData()),
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateBreadcrumbStructuredData()),
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateFAQStructuredData()),
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateHowToStructuredData()),
					}}
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateLocalBusinessStructuredData()),
					}}
				/>

				<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
					{/* 头部导航 */}
					<header className="border-gray-200 border-b bg-white shadow-sm">
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
									<div className="flex items-center space-x-2">
										<Search className="h-8 w-8 text-blue-600" />
										<Brain className="h-8 w-8 text-purple-600" />
									</div>
									<div>
										<h1 className="font-bold text-3xl text-gray-900">SEO 与 GEO 优化完整实战</h1>
										<p className="mt-1 text-gray-600">传统搜索引擎优化与生成式AI优化的完美结合</p>
									</div>
								</div>
							</div>
						</div>
					</header>

					<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						{/* 核心概念介绍 */}
						<section aria-labelledby="intro-heading" className="mb-12">
							<header className="mb-8 text-center">
								<h2 id="intro-heading" className="mb-4 font-bold text-2xl text-gray-900">
									理解 SEO 与 GEO 的核心差异
								</h2>
								<p className="mx-auto max-w-4xl text-gray-600 text-lg">
									在AI时代，我们需要同时优化传统搜索引擎和生成式AI工具，实现全方位的搜索可见性
								</p>
							</header>

							<div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
								<article className="rounded-xl border border-blue-200 bg-blue-50 p-6">
									<header className="mb-4 flex items-center space-x-3">
										<Search className="h-8 w-8 text-blue-600" />
										<h3 className="font-semibold text-blue-900 text-xl">传统 SEO 优化</h3>
									</header>
									<div className="space-y-3 text-blue-800">
										<p>
											<strong>目标：</strong>提升在Google、百度等搜索引擎中的排名
										</p>
										<p>
											<strong>策略：</strong>
											关键词优化、技术SEO、内容质量、链接建设
										</p>
										<p>
											<strong>衡量：</strong>搜索排名、点击率、流量、转化率
										</p>
										<p>
											<strong>优势：</strong>成熟的优化体系，明确的ROI衡量标准
										</p>
									</div>
								</article>

								<article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
									<header className="mb-4 flex items-center space-x-3">
										<Brain className="h-8 w-8 text-purple-600" />
										<h3 className="font-semibold text-purple-900 text-xl">GEO 生成式AI优化</h3>
									</header>
									<div className="space-y-3 text-purple-800">
										<p>
											<strong>目标：</strong>
											提升在ChatGPT、Claude等AI工具中的引用率
										</p>
										<p>
											<strong>策略：</strong>
											E-E-A-T原则、结构化数据、内容权威性、AI友好格式
										</p>
										<p>
											<strong>衡量：</strong>
											AI引用次数、知识图谱收录、语音搜索表现
										</p>
										<p>
											<strong>优势：</strong>
											面向未来搜索趋势，"曝光即价值"的新模式
										</p>
									</div>
								</article>
							</div>
						</section>

						{/* 优化特性展示 */}
						<section aria-labelledby="features-heading" className="mb-12">
							<header className="mb-8">
								<h2 id="features-heading" className="mb-2 font-bold text-2xl text-gray-900">
									完整优化策略
								</h2>
								<p className="text-gray-600">涵盖技术SEO、内容策略、AI优化、地理位置等全方位优化</p>
							</header>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{seoFeatures.map((feature) => (
									<article
										key={feature.id}
										className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
									>
										<header className="mb-4 flex items-start justify-between">
											<div className="flex items-center space-x-3">
												<div className="text-blue-600">{feature.icon}</div>
												<div>
													<h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
													<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs">
														已实现
													</span>
												</div>
											</div>
										</header>

										<p className="mb-4 text-gray-700">{feature.description}</p>

										<div className="mb-4">
											<h4 className="mb-2 font-medium text-gray-900">主要优势：</h4>
											<div className="flex flex-wrap gap-1">
												{feature.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-blue-700 text-xs"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>

										<div>
											<h4 className="mb-2 font-medium text-gray-900">实施示例：</h4>
											<div className="flex flex-wrap gap-1">
												{feature.examples.map((example, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-gray-700 text-xs"
													>
														{example}
													</span>
												))}
											</div>
										</div>
									</article>
								))}
							</div>
						</section>

						{/* How-To 实施指南 */}
						<section aria-labelledby="howto-heading" className="mb-12">
							<header className="mb-8">
								<h2 id="howto-heading" className="mb-2 font-bold text-2xl text-gray-900">
									实施指南
								</h2>
								<p className="text-gray-600">按步骤实施完整的SEO与GEO优化策略</p>
							</header>

							<div className="space-y-6">
								{howToSteps.map((step, index) => (
									<article key={step.step} className="rounded-lg border border-gray-200 bg-white shadow-sm">
										<div className="p-6">
											<header className="flex items-start space-x-4">
												<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-lg text-white">
													{step.step}
												</div>
												<div className="flex-1">
													<div className="mb-2 flex items-center space-x-3">
														<h3 className="font-semibold text-gray-900 text-xl">{step.title}</h3>
														<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 font-medium text-xs text-yellow-800">
															{step.difficulty}
														</span>
														<div className="flex items-center text-gray-500 text-sm">
															<Clock className="mr-1 h-4 w-4" />
															{step.duration}
														</div>
													</div>
													<p className="mb-4 text-gray-700">{step.description}</p>

													<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
														<div>
															<h4 className="mb-2 font-medium text-gray-900">所需工具：</h4>
															<div className="space-y-1">
																{step.tools.map((tool, toolIndex) => (
																	<div key={toolIndex} className="flex items-center text-gray-600 text-sm">
																		<CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
																		{tool}
																	</div>
																))}
															</div>
														</div>

														<div className="md:col-span-2">
															<h4 className="mb-2 font-medium text-gray-900">预期成果：</h4>
															<div className="space-y-1">
																{step.outcomes.map((outcome, outcomeIndex) => (
																	<div key={outcomeIndex} className="flex items-center text-gray-600 text-sm">
																		<Zap className="mr-2 h-4 w-4 text-blue-500" />
																		{outcome}
																	</div>
																))}
															</div>
														</div>
													</div>
												</div>
											</header>
										</div>
									</article>
								))}
							</div>
						</section>

						{/* FAQ 部分 */}
						<section aria-labelledby="faq-heading" className="mb-12">
							<header className="mb-8">
								<h2 id="faq-heading" className="mb-2 font-bold text-2xl text-gray-900">
									常见问题解答
								</h2>
								<p className="text-gray-600">关于SEO与GEO优化的常见疑问和专业解答</p>
							</header>

							<div className="space-y-4">
								{faqData.map((faq, index) => (
									<article key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
										<header className="mb-3">
											<h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
										</header>
										<div className="text-gray-700">{faq.answer}</div>
									</article>
								))}
							</div>
						</section>

						{/* 性能指标和验证 */}
						<section aria-labelledby="metrics-heading" className="mb-12">
							<header className="mb-8">
								<h2 id="metrics-heading" className="mb-2 font-bold text-2xl text-gray-900">
									性能指标验证
								</h2>
								<p className="text-gray-600">如何验证和监控SEO与GEO优化效果</p>
							</header>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<h3 className="mb-4 font-semibold text-gray-900 text-lg">SEO 指标监控</h3>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-gray-600">Google Search Console</span>
											<span className="font-medium text-green-600">已配置</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">Core Web Vitals</span>
											<span className="font-medium text-green-600">全部达标</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">结构化数据验证</span>
											<span className="font-medium text-green-600">无错误</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">移动端友好性</span>
											<span className="font-medium text-green-600">100分</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">页面速度</span>
											<span className="font-medium text-green-600">&lt;3秒</span>
										</div>
									</div>
								</div>

								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<h3 className="mb-4 font-semibold text-gray-900 text-lg">GEO 优化验证</h3>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-gray-600">E-E-A-T 原则实施</span>
											<span className="font-medium text-green-600">完整体现</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">AI 工具引用率</span>
											<span className="font-medium text-green-600">持续监测</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">知识图谱收录</span>
											<span className="font-medium text-green-600">已收录</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">内容权威性评分</span>
											<span className="font-medium text-green-600">优秀</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">结构化数据覆盖率</span>
											<span className="font-medium text-green-600">100%</span>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* 工具和资源 */}
						<section aria-labelledby="tools-heading" className="mb-12">
							<header className="mb-8">
								<h2 id="tools-heading" className="mb-2 font-bold text-2xl text-gray-900">
									推荐工具和资源
								</h2>
								<p className="text-gray-600">实施SEO与GEO优化的必备工具和参考资料</p>
							</header>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<h3 className="mb-4 font-semibold text-gray-900 text-lg">SEO 工具</h3>
									<ul className="space-y-2 text-gray-700">
										<li>• Google Search Console</li>
										<li>• Google Analytics</li>
										<li>• Screaming Frog SEO Spider</li>
										<li>• Ahrefs / SEMrush</li>
										<li>• PageSpeed Insights</li>
										<li>• Schema.org 验证器</li>
									</ul>
								</div>

								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<h3 className="mb-4 font-semibold text-gray-900 text-lg">GEO 工具</h3>
									<ul className="space-y-2 text-gray-700">
										<li>• ChatGPT 引用跟踪</li>
										<li>• AI 内容分析工具</li>
										<li>• 知识图谱查询工具</li>
										<li>• 语音搜索模拟器</li>
										<li>• E-E-A-T 评估工具</li>
										<li>• 内容权威性检测器</li>
									</ul>
								</div>

								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<h3 className="mb-4 font-semibold text-gray-900 text-lg">学习资源</h3>
									<ul className="space-y-2 text-gray-700">
										<li>• Google 搜索中心文档</li>
										<li>• Schema.org 官方指南</li>
										<li>• Next.js SEO 最佳实践</li>
										<li>• E-E-A-T 指南更新</li>
										<li>• AI 搜索趋势报告</li>
										<li>• GEO 优化案例研究</li>
									</ul>
								</div>
							</div>
						</section>
					</main>
				</div>
			</>
		</Layout>
	);
}
