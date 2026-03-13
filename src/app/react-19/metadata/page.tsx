"use client";

import { FileText, Globe, Share2, Tag } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import {
	type Example,
	type ExampleDetail,
	FeatureContainer,
	FeatureContent,
	FeatureExampleDetail,
	FeatureExampleSelector,
	FeatureHeader,
	FeatureOfficialExamples,
	FeatureOverview,
	FeatureThreeWRule,
	type OfficialExample,
} from "@/components/showcase";
import { copyWithFeedback } from "@/utils";
import { BlogSEODemo, DynamicSEODemo, ProductMetadataDemo, SocialSharingDemo } from "./(components)";

const metadataExamples: Example[] = [
	{ id: "dynamic-seo", title: "动态 SEO 管理", icon: <FileText className="h-5 w-5" />, difficulty: "初级" },
	{ id: "social-sharing", title: "社交媒体分享优化", icon: <Share2 className="h-5 w-5" />, difficulty: "中级" },
	{ id: "product-metadata", title: "电商产品元数据", icon: <Globe className="h-5 w-5" />, difficulty: "中级" },
	{ id: "blog-seo", title: "博客文章 SEO 优化", icon: <Tag className="h-5 w-5" />, difficulty: "高级" },
];

const exampleDetails: Record<string, ExampleDetail> = {
	"dynamic-seo": {
		title: "动态 SEO 管理",
		icon: <FileText className="h-5 w-5" />,
		description: "React 19 允许在组件中直接定义和管理动态元数据，自动提升到文档 head 中",
		codeSnippet: `"use client";

function ArticlePage({ article }) {
  return (
    <>
      <title>{article.title} - 我的博客</title>
      <meta name="description" content={article.description} />
      <meta name="keywords" content={article.tags.join(", ")} />
      <meta name="author" content={article.author} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:image" content={article.image} />

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
		status: "completed",
	},
	"social-sharing": {
		title: "社交媒体分享优化",
		icon: <Share2 className="h-5 w-5" />,
		description: "通过 Open Graph 和 Twitter Card 元数据优化社交媒体分享效果，提升用户体验和传播效果",
		codeSnippet: `"use client";

function ProductPage({ product }) {
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

      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />

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
		status: "completed",
	},
	"product-metadata": {
		title: "电商产品元数据",
		icon: <Globe className="h-5 w-5" />,
		description: "通过结构化数据和电商专用元数据优化，提升产品页面的搜索引擎表现和用户体验",
		codeSnippet: `"use client";

function EcommercePage({ product }) {
  return (
    <>
      <title>{product.name} - {product.category} | 我的商城</title>
      <meta name="description" content={product.description} />

      {/* 基础产品元数据 */}
      <meta property="product:brand" content={product.brand} />
      <meta property="product:price:amount" content={product.price} />
      <meta property="product:price:currency" content={product.currency} />
      <meta property="product:availability" content={product.stock > 0 ? "in stock" : "out of stock"} />

      {/* 结构化数据 - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          description: product.description,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency
          }
        })}
      </script>

      <main>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
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
		status: "completed",
	},
	"blog-seo": {
		title: "博客文章 SEO 优化",
		icon: <Tag className="h-5 w-5" />,
		description: "通过完整的博客文章元数据和结构化数据，提升文章在搜索引擎的排名和展示效果",
		codeSnippet: `"use client";

function BlogPost({ post }) {
  return (
    <>
      <title>{post.title} - 我的博客</title>
      <meta name="description" content={post.description} />
      <meta name="keywords" content={post.tags.join(", ")} />
      <meta name="author" content={post.author} />

      {/* 文章专用元数据 */}
      <meta name="article:published_time" content={post.publishDate} />
      <meta name="article:modified_time" content={post.modifiedDate} />
      <meta name="article:section" content={post.category} />
      <meta name="article:tag" content={post.tags.join(", ")} />

      {/* 结构化数据 - BlogPosting */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          author: {
            "@type": "Person",
            name: post.author
          },
          datePublished: post.publishDate
        })}
      </script>

      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
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
		status: "completed",
	},
};

const architectureFeatures = [
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

const threeWSections = [
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

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		"dynamic-seo": [
			{
				title: "🚀 基础元数据管理",
				code: `"use client";

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
}`,
				description: "React 19 最基础的元数据管理方式",
			},
		],
		"social-sharing": [
			{
				title: "📱 Open Graph 优化",
				code: `"use client";

function SharePage({ content }) {
  return (
    <>
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:image" content={content.image} />
      <meta property="og:url" content={content.url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:image" content={content.image} />

      <main>{content.body}</main>
    </>
  );
}`,
				description: "社交媒体平台的完整元数据支持",
			},
		],
		"product-metadata": [
			{
				title: "🛒 产品 Schema.org",
				code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "iPhone 15 Pro",
  "brand": {
    "@type": "Brand",
    "name": "Apple"
  },
  "offers": {
    "@type": "Offer",
    "price": "999",
    "priceCurrency": "USD"
  }
}
</script>`,
				description: "完整的电商产品结构化数据",
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
  "author": {
    "@type": "Person",
    "name": "张三"
  },
  "datePublished": "2024-01-20T10:00:00Z"
}
</script>`,
				description: "BlogPosting 结构化数据标准",
			},
		],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
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

export default function MetadataPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(metadataExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<FileText className="h-6 w-6 text-blue-600 md:h-8 md:w-8" />}
					title="React 19 文档元数据"
					subtitle="组件内元数据管理"
				/>

				<FeatureContent className="space-y-4">
					<FeatureOverview title="文档元数据 生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>

				<FeatureExampleSelector
					label="选择功能:"
					examples={metadataExamples}
					selectedExampleId={selectedExampleId}
					onSelectExample={setSelectedExampleId}
				/>

				<FeatureContent>
					<FeatureExampleDetail
						example={selectedExample}
						demoComponents={getDemoComponents(selectedExampleId)}
						onCopyCode={handleCopyCode}
						copiedCode={copiedCode}
					/>
				</FeatureContent>

				<FeatureContent>
					<FeatureOfficialExamples
						title={`📚 ${selectedExample?.title} 官方示例`}
						description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
						examples={getOfficialExamples(selectedExampleId)}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
