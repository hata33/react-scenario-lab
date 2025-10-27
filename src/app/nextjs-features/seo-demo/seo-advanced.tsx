"use client";

import { BarChart3, Check, ChevronDown, ChevronUp, Code, Copy, Lightbulb, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	generateBreadcrumbSchema,
	generateEventSchema,
	generateFAQSchema,
	generateHowToSchema,
	generateServiceSchema,
	generateVideoSchema,
} from "./metadata";

interface SEOFeature {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	priority: "high" | "medium" | "low";
	implementation: string;
	benefits: string[];
	codeExample: string;
}

const advancedSEOFeatures: SEOFeature[] = [
	{
		id: "structured-data",
		title: "多样化结构化数据",
		description: "添加面包屑、FAQ、产品、视频等多种结构化数据，提升搜索结果展示效果",
		icon: <Target className="h-6 w-6" />,
		priority: "high",
		implementation: "在页面中嵌入多种JSON-LD结构化数据",
		benefits: ["丰富搜索结果", "提升点击率", "获得特色摘要", "语音搜索优化"],
		codeExample: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://your-domain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "SEO优化",
      "item": "https://your-domain.com/seo"
    }
  ]
}
</script>`,
	},
	{
		id: "core-web-vitals",
		title: "Core Web Vitals 优化",
		description: "优化LCP、FID、CLS等核心性能指标，提升搜索排名",
		icon: <BarChart3 className="h-6 w-6" />,
		priority: "high",
		implementation: "图片优化、字体优化、JavaScript拆分、减少CLS",
		benefits: ["更好的搜索排名", "提升用户体验", "降低跳出率", "提高转化率"],
		codeExample: `// 优化 Largest Contentful Paint (LCP)
import Image from 'next/image';

// 使用优先级加载
<Image
  src="hero-image.jpg"
  alt="Hero image"
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 预加载关键资源
<link
  rel="preload"
  href="/fonts/main.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>`,
	},
	{
		id: "international-seo",
		title: "国际化 SEO",
		description: "多语言支持和hreflang标签，面向全球市场",
		icon: <Zap className="h-6 w-6" />,
		priority: "medium",
		implementation: "配置i18n、添加hreflang标签、本地化内容",
		benefits: ["覆盖全球用户", "本地化搜索", "提升国际排名", "多语言支持"],
		codeExample: `// next.config.js
module.exports = {
  i18n: {
    locales: ['zh-CN', 'en-US', 'ja-JP'],
    defaultLocale: 'zh-CN',
    domains: [
      {
        domain: 'your-domain.cn',
        defaultLocale: 'zh-CN',
      },
      {
        domain: 'your-domain.com',
        defaultLocale: 'en-US',
      }
    ]
  }
}

// hreflang 标签
<link rel="alternate" hrefLang="zh-CN" href="https://your-domain.cn/seo" />
<link rel="alternate" hrefLang="en-US" href="https://your-domain.com/seo" />`,
	},
	{
		id: "schema-markup",
		title: "高级 Schema 标记",
		description: "使用HowTo、Event、Product等复杂Schema类型",
		icon: <Lightbulb className="h-6 w-6" />,
		priority: "medium",
		implementation: "添加特定行业的结构化数据",
		benefits: ["获得丰富摘要", "提升可见性", "行业特定优化", "竞争优势"],
		codeExample: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "如何优化网站SEO",
  "step": [
    {
      "@type": "HowToStep",
      "name": "关键词研究",
      "text": "研究目标用户搜索的关键词",
      "image": "https://example.com/step1.jpg"
    }
  ]
}
</script>`,
	},
];

const faqData = [
	{
		question: "Next.js 相比 React SPA 在 SEO 方面有哪些具体优势？",
		answer:
			"Next.js 在服务器端生成完整的HTML内容，搜索引擎可以直接抓取和索引。而React SPA只能渲染空的HTML容器，内容需要JavaScript执行后才能显示，这对搜索引擎不友好。",
	},
	{
		question: "结构化数据对SEO有什么作用？",
		answer:
			"结构化数据帮助搜索引擎更好地理解页面内容，可以获得丰富的搜索结果展示（如评分、价格、FAQ等），提升点击率和搜索可见性。",
	},
	{
		question: "如何衡量SEO优化效果？",
		answer:
			"可以通过Google Search Console监控搜索表现，使用Google Analytics分析流量，关注Core Web Vitals性能指标，以及监控关键词排名变化。",
	},
];

export default function SEOAdvancedFeatures() {
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

	const copyToClipboard = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-red-100 text-red-800 border-red-200";
			case "medium":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "low":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getPriorityText = (priority: string) => {
		switch (priority) {
			case "high":
				return "高优先级";
			case "medium":
				return "中优先级";
			case "low":
				return "低优先级";
			default:
				return "一般";
		}
	};

	return (
		<div className="space-y-8">
			{/* FAQ 结构化数据演示 */}
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="mb-6 flex items-center space-x-3">
					<Lightbulb className="h-6 w-6 text-blue-600" />
					<h3 className="font-semibold text-gray-900 text-xl">FAQ 结构化数据演示</h3>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{faqData.map((faq, index) => (
						<div key={index} className="rounded-lg border border-gray-200 p-4">
							<h4 className="mb-2 font-medium text-gray-900">Q: {faq.question}</h4>
							<p className="text-gray-700 text-sm">A: {faq.answer}</p>
						</div>
					))}
				</div>

				<div className="mt-6 rounded-lg bg-gray-50 p-4">
					<div className="mb-2 flex items-center justify-between">
						<h5 className="font-medium text-gray-900">生成的 FAQ Schema:</h5>
						<button
							onClick={() => copyToClipboard(JSON.stringify(generateFAQSchema(faqData), null, 2), "faq-schema")}
							className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
						>
							{copiedId === "faq-schema" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
							<span className="text-sm">{copiedId === "faq-schema" ? "已复制" : "复制代码"}</span>
						</button>
					</div>
					<pre className="overflow-x-auto text-gray-600 text-xs">
						<code>{JSON.stringify(generateFAQSchema(faqData), null, 2)}</code>
					</pre>
				</div>
			</div>

			{/* 高级 SEO 功能 */}
			<div>
				<h3 className="mb-6 font-semibold text-gray-900 text-xl">更多 SEO 优化功能</h3>
				<div className="space-y-4">
					{advancedSEOFeatures.map((feature) => (
						<div key={feature.id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
							<div className="p-6">
								<div className="mb-4 flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className="text-blue-600">{feature.icon}</div>
										<div>
											<h4 className="font-semibold text-gray-900 text-lg">{feature.title}</h4>
											<span
												className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-xs ${getPriorityColor(feature.priority)}`}
											>
												{getPriorityText(feature.priority)}
											</span>
										</div>
									</div>
									<button
										onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
										className="text-gray-400 hover:text-gray-600"
									>
										{expandedFeature === feature.id ? (
											<ChevronUp className="h-5 w-5" />
										) : (
											<ChevronDown className="h-5 w-5" />
										)}
									</button>
								</div>

								<p className="mb-4 text-gray-700">{feature.description}</p>

								<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
									<div className="rounded bg-gray-50 p-3">
										<h5 className="mb-1 font-medium text-gray-900 text-sm">实现方式</h5>
										<p className="text-gray-600 text-xs">{feature.implementation}</p>
									</div>
									<div className="rounded bg-green-50 p-3 md:col-span-2">
										<h5 className="mb-2 font-medium text-green-900 text-sm">主要优势</h5>
										<div className="flex flex-wrap gap-1">
											{feature.benefits.map((benefit, index) => (
												<span
													key={index}
													className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-green-700 text-xs"
												>
													{benefit}
												</span>
											))}
										</div>
									</div>
								</div>

								{expandedFeature === feature.id && (
									<div className="mt-4 border-gray-200 border-t pt-4">
										<div className="mb-2 flex items-center justify-between">
											<h5 className="font-medium text-gray-900">代码示例</h5>
											<button
												onClick={() => copyToClipboard(feature.codeExample, feature.id)}
												className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
											>
												{copiedId === feature.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
												<span className="text-sm">{copiedId === feature.id ? "已复制" : "复制代码"}</span>
											</button>
										</div>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{feature.codeExample}</code>
											</pre>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* SEO 检查清单 */}
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<h3 className="mb-4 font-semibold text-blue-900 text-xl">🚀 SEO 优化检查清单</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<h4 className="mb-2 font-medium text-blue-800">技术 SEO</h4>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>✅ 服务端渲染 (SSR/SSG)</li>
							<li>✅ 元数据优化</li>
							<li>✅ 结构化数据</li>
							<li>✅ sitemap.xml</li>
							<li>✅ robots.txt</li>
							<li>✅ Core Web Vitals 优化</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-2 font-medium text-blue-800">内容 SEO</h4>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>✅ 语义化 HTML</li>
							<li>✅ 图片 alt 属性</li>
							<li>✅ 内链结构</li>
							<li>✅ URL 结构优化</li>
							<li>✅ 移动端适配</li>
							<li>✅ 页面加载速度</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
