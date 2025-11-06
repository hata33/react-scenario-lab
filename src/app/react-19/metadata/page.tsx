"use client";

import { Code, Copy, FileText, Globe, Share2, Tag } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
// Import utils
import { copyWithFeedback } from "@/utils";

// Import extracted components from index files
import {
	ArchitectureOverview,
	ExampleDetail,
	ExampleSelector,
	Header,
	OfficialExamples,
	ThreeWRule,
} from "../(components)";
// Import types
import type { FeatureCard, MetadataExample, WSection } from "../(types)";
// Import demo components from index file
import { BlogSEODemo, DynamicSEODemo, ProductMetadataDemo, SocialSharingDemo } from "./(components)";

const metadataExamples: MetadataExample[] = [
	{
		id: "dynamic-seo",
		title: "动态 SEO 管理",
		description: "React 19 允许在组件中直接定义和管理动态元数据，自动提升到文档 head 中",
		category: "Core Features",
		difficulty: "初级",
		status: "completed",
		icon: <FileText className="h-5 w-5" />,
		codeSnippet: `"use client";

// 动态 SEO 组件示例
function ArticlePage({ article }) {
  // React 19 自动提升这些标签到 head
  return (
    <>
      <title>{article.title} - 我的博客</title>
      <meta name="description" content={article.description} />
      <meta name="keywords" content={article.tags.join(", ")} />
      <meta name="author" content={article.author} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:image" content={article.image} />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.description} />
      <meta name="twitter:image" content={article.image} />

      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
    </>
  );
}`,
		benefits: ["组件内定义元数据", "自动提升到 head", "动态内容支持", "SEO 友好"],
		useCases: ["博客网站", "电商平台", "内容管理系统", "动态页面"],
		problemsSolved: [
			{
				problem: "SEO 管理复杂",
				description: "传统方式需要手动操作 DOM 或使用第三方库来更新页面元数据，代码复杂且容易出错",
				solution: "React 19 让你可以在组件中直接使用 title、meta 等标签，自动提升到文档 head，简化 SEO 管理",
			},
			{
				problem: "内容与元数据分离",
				description: "传统方案中，页面内容的元数据往往与组件逻辑分离，维护困难且容易出现不一致",
				solution: "React 19 允许在组件内部定义元数据，与业务逻辑紧密结合，确保一致性",
			},
			{
				problem: "动态内容更新困难",
				description: "当页面内容发生变化时，需要手动同步更新相关的元数据，容易出现遗漏",
				solution: "组件状态变化时，元数据会自动更新，无需手动同步，确保 SEO 信息始终准确",
			},
			{
				problem: "代码冗余",
				description: "传统方案需要大量样板代码来处理不同类型的元数据和场景",
				solution: "React 19 的原生支持大大简化了代码，减少了样板代码和维护成本",
			},
		],
	},
	{
		id: "social-sharing",
		title: "社交媒体分享优化",
		description: "通过 Open Graph 和 Twitter Card 元数据优化社交媒体分享效果，提升用户体验和传播效果",
		category: "Social Media",
		difficulty: "中级",
		status: "completed",
		icon: <Share2 className="h-5 w-5" />,
		codeSnippet: `"use client";

function ProductPage({ product }) {
  // 社交媒体分享优化
  return (
    <>
      <title>{product.name} - 产品详情</title>
      <meta name="description" content={product.description} />

      {/* Open Graph 标签 */}
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <meta property="og:url" content={product.url} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="我的商城" />

      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />

      {/* 产品专用元数据 */}
      <meta property="product:brand" content={product.brand} />
      <meta property="product:price:amount" content={product.price} />
      <meta property="product:price:currency" content="CNY" />
      <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />

      <main>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span>{product.price}</span>
      </main>
    </>
  );
}`,
		benefits: ["Open Graph 支持", "Twitter Card 优化", "产品专用元数据", "分享效果提升"],
		useCases: ["电商网站", "社交平台", "内容分享", "品牌推广"],
		problemsSolved: [
			{
				problem: "社交媒体分享效果差",
				description: "没有正确的 Open Graph 和 Twitter Card 元数据，社交媒体分享时缺少图片、标题等信息",
				solution: "React 19 让你能够轻松定义完整的社交媒体元数据，确保分享时展示丰富的卡片式预览",
			},
			{
				problem: "产品信息展示不完整",
				description: "电商产品在社交平台分享时，缺少价格、库存、品牌等关键信息",
				solution: "支持完整的电商专用元数据标签，让产品在社交平台分享时展示完整的商品信息",
			},
			{
				problem: "品牌识别度低",
				description: "分享内容缺少品牌标识和统一性，降低品牌曝光和认知",
				solution: "通过统一的元数据管理和品牌信息标签，提升在各个平台的品牌识别度",
			},
			{
				problem: "转化率低",
				description: "社交媒体分享缺乏吸引力和完整性，用户点击意愿低，转化效果差",
				solution: "优化的分享卡片包含完整的商品信息和视觉元素，提升用户点击和转化率",
			},
		],
	},
	{
		id: "product-metadata",
		title: "电商产品元数据",
		description: "通过结构化数据和电商专用元数据优化，提升产品页面的搜索引擎表现和用户体验",
		category: "E-commerce",
		difficulty: "中级",
		status: "completed",
		icon: <Globe className="h-5 w-5" />,
		codeSnippet: `"use client";

function EcommercePage({ product }) {
  return (
    <>
      <title>{product.name} - {product.category} | 我的商城</title>
      <meta name="description" content={product.description} />

      {/* 基础产品元数据 */}
      <meta property="product:brand" content={product.brand} />
      <meta property="product:category" content={product.category} />
      <meta property="product:condition" content="new" />

      {/* 价格和库存信息 */}
      <meta property="product:price:amount" content={product.price} />
      <meta property="product:price:currency" content={product.currency} />
      <meta property="product:availability" content={product.stock > 0 ? "in stock" : "out of stock"} />
      <meta property="product:retailer" content="我的商城" />

      {/* 评分和评价 */}
      <meta property="product:rating:value" content={product.rating} />
      <meta property="product:rating:count" content={product.reviewCount} />
      <meta property="product:rating:worst" content={1} />
      <meta property="product:rating:best" content={5} />

      {/* 结构化数据 - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: product.images,
          description: product.description,
          brand: {
            "@type": "Brand",
            name: product.brand
          },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency,
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount
          }
        })}
      </script>

      <main>
        <h1>{product.name}</h1>
        <div className="product-info">
          <span className="price">{product.price}</span>
          <span className="brand">{product.brand}</span>
          <div className="rating">⭐ {product.rating}</div>
        </div>
      </main>
    </>
  );
}`,
		benefits: ["Schema.org 结构化数据", "电商专用标签", "价格库存管理", "搜索结果优化"],
		useCases: ["电商平台", "产品详情页", "购物车", "品牌商城"],
		problemsSolved: [
			{
				problem: "搜索引擎理解不足",
				description: "传统网页搜索引擎难以准确理解产品信息，导致搜索结果展示效果差",
				solution: "通过 Schema.org 结构化数据，让搜索引擎准确理解产品属性、价格、库存等信息",
			},
			{
				problem: "搜索结果展示单调",
				description: "缺乏结构化数据，搜索结果只显示基本的标题和描述，缺少丰富的产品信息",
				solution: "结构化数据让搜索结果展示价格、评分、库存等丰富信息，提升点击率",
			},
			{
				problem: "价格信息不透明",
				description: "用户需要在页面加载后才能看到价格信息，影响用户决策效率",
				solution: "通过结构化数据在搜索结果中直接显示价格，提升用户决策效率",
			},
			{
				problem: "库存信息滞后",
				description: "库存变化时搜索结果信息不能及时更新，导致用户失望",
				solution: "动态更新结构化数据，确保搜索引擎信息与实际库存同步",
			},
		],
	},
	{
		id: "blog-seo",
		title: "博客文章 SEO 优化",
		description: "通过完整的博客文章元数据和结构化数据，提升文章在搜索引擎的排名和展示效果",
		category: "Content Management",
		difficulty: "高级",
		status: "completed",
		icon: <Tag className="h-5 w-5" />,
		codeSnippet: `"use client";

function BlogPost({ post }) {
  return (
    <>
      <title>{post.title} - 我的博客</title>
      <meta name="description" content={post.description} />
      <meta name="keywords" content={post.tags.join(", ")} />
      <meta name="author" content={post.author} />
      <meta name="author:twitter" content={post.authorTwitter} />

      {/* 文章专用元数据 */}
      <meta name="article:published_time" content={post.publishDate} />
      <meta name="article:modified_time" content={post.modifiedDate} />
      <meta name="article:section" content={post.category} />
      <meta name="article:tag" content={post.tags.join(", ")} />
      <meta name="article:reading_time" content={post.readTime} />

      {/* 图片和媒体 */}
      <meta name="image" content={post.coverImage} />
      <meta name="image:alt" content={post.imageAlt} />
      <meta property="og:image" content={post.coverImage} />
      <meta property="og:image:alt" content={post.imageAlt} />

      {/* 语言和国际化 */}
      <meta name="language" content={post.language} />
      <link rel="canonical" href={post.canonicalUrl} />

      {/* 结构化数据 - BlogPosting */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.coverImage,
          author: {
            "@type": "Person",
            name: post.author,
            url: post.authorTwitter ? \`https://twitter.com/\${post.authorTwitter}\` : undefined
          },
          publisher: {
            "@type": "Organization",
            name: "我的博客",
            logo: "https://myblog.com/logo.png"
          },
          datePublished: post.publishDate,
          dateModified: post.modifiedDate,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": post.canonicalUrl
          },
          wordCount: post.wordCount
        })}
      </script>

      <article>
        <header>
          <h1>{post.title}</h1>
          <div className="meta">
            <time>{post.publishDate}</time>
            <span>作者: {post.author}</span>
            <span>阅读时间: {post.readTime} 分钟</span>
          </div>
        </header>

        <main className="prose">
          <p>{post.content}</p>
        </main>
      </article>
    </>
  );
}`,
		benefits: ["文章元数据标准", "作者信息管理", "时间标记支持", "结构化数据"],
		useCases: ["博客网站", "新闻门户", "技术文档", "内容平台"],
		problemsSolved: [
			{
				problem: "搜索引擎排名差",
				description: "缺乏完整的文章元数据，搜索引擎难以准确理解和分类内容，影响排名",
				solution: "通过完整的文章元数据，让搜索引擎准确理解内容类型、作者、发布时间等信息",
			},
			{
				problem: "作者信息缺失",
				description: "传统方案中作者信息与内容分离，影响搜索结果中的权威性展示",
				solution: "在元数据中包含完整的作者信息，提升搜索结果中的作者身份展示",
			},
			{
				problem: "内容时效性判断困难",
				description: "用户和搜索引擎难以判断内容的时效性，影响点击决策",
				solution: "明确的发布和修改时间标记，帮助用户判断内容新鲜度",
			},
			{
				problem: "内容组织结构不清晰",
				description: "缺乏结构化数据，搜索引擎难以理解内容的层次和结构关系",
				solution: "通过 BlogPosting 结构化数据，清晰定义文章的各个部分和关系",
			},
		],
	},
];

export default function MetadataPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(metadataExamples[0]);

	const architectureFeatures: FeatureCard[] = [
		{
			icon: <FileText className="h-6 w-6 text-blue-600" />,
			title: "组件内定义",
			description: "直接在组件中声明元数据",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Share2 className="h-6 w-6 text-green-600" />,
			title: "社交媒体优化",
			description: "Open Graph 和 Twitter Card",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Globe className="h-6 w-6 text-purple-600" />,
			title: "结构化数据",
			description: "Schema.org 标准支持",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Tag className="h-6 w-6 text-orange-600" />,
			title: "SEO 友好",
			description: "搜索引擎优化增强",
			bgColor: "bg-orange-50",
			iconColor: "text-orange-600",
			titleColor: "text-orange-900",
			descriptionColor: "text-orange-700",
		},
	];

	// 3W Rule data
	const threeWSections: WSection[] = [
		{
			description:
				"文档元数据标签是 React 19 中革命性的新功能，允许在组件中直接使用 HTML 头部标签如 title、meta、link 等，这些标签会自动提升到文档的 head 部分，实现真正的组件内元数据管理。",
			features: ["原生 HTML 标签支持", "自动提升机制", "动态内容管理", "完整 SEO 优化"],
		},
		{
			description:
				"解决传统 SEO 管理复杂、社交媒体分享优化困难的问题。通过在组件中直接定义元数据，简化了 SEO 优化流程，提升了开发效率和内容质量。",
			features: ["简化 SEO 管理流程", "提升内容质量", "增强社交媒体效果", "改善用户体验"],
		},
		{
			description:
				"适合需要动态 SEO、社交媒体优化、页面元数据管理的所有场景。特别适合电商网站、博客平台、内容管理系统、新闻门户等需要大量内容管理的应用。",
			features: ["电商产品优化", "博客文章管理", "内容管理系统", "新闻门户网站"],
		},
	];

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"dynamic-seo": [
				{
					title: "🚀 基础元数据管理",
					code: `"use client";

// React 19 - 组件内元数据
function ProductPage({ product }) {
  return (
    <>
      <title>{product.name} - 我的商城</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={product.tags.join(", ")} />

      <main>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </main>
    </>
  );
}

// 自动提升到 head
// 无需额外配置，React 19 自动处理`,
					description: "React 19 最基础的元数据管理方式",
				},
				{
					title: "📊 动态内容更新",
					code: `"use client";

function ArticlePage({ article }) {
  // 响应式更新元数据
  useEffect(() => {
    document.title = article.title;
  }, [article.title]);

  return (
    <>
      <title>{article.title} - 博客</title>
      <meta name="description" content={article.description} />

      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <button onClick={() => {
          setArticle(newArticle);
        }}>
          更新文章
        </button>
      </article>
    </>
  );
}`,
					description: "动态响应内容变化的元数据更新",
				},
			],
			"social-sharing": [
				{
					title: "📱 Open Graph 优化",
					code: `"use client";

function SharePage({ content }) {
  return (
    <>
      {/* Open Graph - Facebook/LinkedIn */}
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:image" content={content.image} />
      <meta property="og:url" content={content.url} />
      <meta property="og:type" content={content.type} />
      <meta property="og:site_name" content="我的网站" />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <meta name="twitter:image" content={content.image} />

      <main>{content.body}</main>
    </>
  );
}`,
					description: "社交媒体平台的完整元数据支持",
				},
				{
					title: "🔗 高级链接属性",
					code: `<meta property="og:url" content={pageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:video" content={videoUrl} />
<meta property="og:video:type" content="video/mp4" />
<meta property="og:video:width" content="1280" />
<meta property="og:video:height" content="720" />`,
					description: "图片、视频等媒体文件的详细属性",
				},
			],
			"product-metadata": [
				{
					title: "🛒 产品 Schema.org",
					code: `<!-- JSON-LD 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "iPhone 15 Pro",
  "image": [
    "https://example.com/photos/1x1/photo.jpg"
  ],
  "description": "最新款 iPhone",
  "brand": {
    "@type": "Brand",
    "name": "Apple"
  },
  "offers": {
    "@type": "Offer",
    "price": "999",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1245"
  }
}
</script>`,
					description: "完整的电商产品结构化数据",
				},
				{
					title: "💰 电商专用元数据",
					code: `<!-- 产品基础信息 -->
<meta property="product:brand" content="Apple" />
<meta property="product:category" content="Electronics" />
<meta property="product:condition" content="New" />

<!-- 价格信息 -->
<meta property="product:price:amount" content="999" />
<meta property="product:price:currency" content="USD" />
<meta property="product:price:valid_until" content="2024-12-31" />

<!-- 库存信息 -->
<meta property="product:availability" content="in stock" />
<meta property="product:retailer" content="官方商城" />

<!-- 尺寸和重量 -->
<meta property="product:weight:value" content="0.23" />
<meta property="product:weight:unit" content="kg" />
<meta property="product:height:value" content="150" />
<meta property="product:height:unit" content="mm" />`,
					description: "Google 和 Facebook 支持的电商专用元数据",
				},
				{
					title: "⭐ 评价信息元数据",
					code: `<!-- 评分信息 -->
<meta property="product:rating:value" content="4.8" />
<meta property="product:rating:count" content="1245" />
<meta property="product:rating:worst" content="1" />
<meta property="product:rating:best" content="5" />

<!-- 评价数量和统计 -->
<meta property="aggregateRating:ratingValue" content="4.8" />
<meta property="aggregateRating:reviewCount" content="1245" />

<!-- 自定义评分系统 -->
<meta property="custom:rating" content="4.8/5" />
<meta property="custom:totalReviews" content="1245" />`,
					description: "产品评分和评价的详细元数据标记",
				},
			],
			"blog-seo": [
				{
					title: "📝 文章 Schema.org",
					code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "React 19 完全指南",
  "description": "深入了解 React 19 的新特性...",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "张三",
    "url": "https://zhangsan.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "技术博客"
  },
  "datePublished": "2024-01-20T10:00:00Z",
  "dateModified": "2024-01-22T15:30:00Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/react-19-guide"
  }
}
</script>`,
					description: "BlogPosting 结构化数据标准",
				},
				{
					title: "📅 文章专用元数据",
					code: `<!-- 发布时间 -->
<meta name="article:published_time" content="2024-01-20T10:00:00Z" />
<meta name="article:modified_time" content="2024-01-22T15:30:00Z" />

<!-- 文章分类和标签 -->
<meta name="article:section" content="技术教程" />
<meta name="article:tag" content="React" />
<meta name="article:tag" content="JavaScript" />
<meta name="article:tag" content="Web开发" />

<!-- 阅读信息 -->
<meta name="article:reading_time" content="15" />
<meta name="word_count" content="2500" />
<meta name="estimated_reading_time" content="PT15M" />

<!-- 作者信息 -->
<meta name="author" content="张三" />
<meta name="author:bio" content="前端开发专家，专注 React 生态" />
<meta name="author:website" content="https://zhangsan.com" />

<!-- 语言和地域 -->
<meta name="language" content="zh-CN" />
<meta name="geo.region" content="CN" />`,
					description: "完整的内容管理系统元数据标准",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "dynamic-seo":
				return [<DynamicSEODemo key="dynamic" />];
			case "social-sharing":
				return [<SocialSharingDemo key="social" />];
			case "product-metadata":
				return [<ProductMetadataDemo key="product" />];
			case "blog-seo":
				return [<BlogSEODemo key="blog" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<FileText className="h-8 w-8 text-blue-600" />}
					title="React 19 文档元数据"
					subtitle="组件内元数据管理"
				/>

				{/* Metadata 架构概览 */}
				<ArchitectureOverview title="文档元数据 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 示例选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择功能:"
					examples={metadataExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = metadataExamples.find((ex) => ex.id === exampleId);
						if (example) setSelectedExample(example);
					}}
				/>

				{/* 详细展示区域 - 下方内容 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					{selectedExample && (
						<ExampleDetail
							example={selectedExample}
							demoComponents={getDemoComponents()}
							onCopyCode={(code) => copyWithFeedback(code, setCopiedCode)}
							copiedCode={copiedCode}
						/>
					)}
				</div>

				{/* 官方代码示例 */}
				<OfficialExamples
					title={`📚 ${selectedExample?.title} 官方示例`}
					description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
					examples={getOfficialExamples(selectedExample?.id || "")}
				/>
			</div>
		</Layout>
	);
}
