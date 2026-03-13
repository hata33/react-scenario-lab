"use client";

import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";
import {
	FeatureContainer,
	FeatureContent,
	FeatureCardGrid,
	FilterBar,
	StatsSection,
	type FeatureGridCard,
} from "@/components/showcase";

interface ReactFeature {
	id: string;
	title: string;
	description: string;
	emoji: string;
	version: string;
	category: string;
	status: "stable" | "experimental";
	difficulty: "beginner" | "intermediate" | "advanced";
	tags: string[];
	href: string;
	buttonText: string;
	examples: string[];
}

const react19Features: ReactFeature[] = [
	{
		id: "actions",
		emoji: "⚡",
		title: "Actions & Hooks",
		description: "useActionState、useOptimistic、useFormStatus、useTransition 等 Hooks 简化异步处理",
		href: "/react-19/actions",
		buttonText: "体验 Actions 生态",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "intermediate",
		tags: ["异步", "表单", "并发", "Server Functions"],
		examples: ["useActionState", "useOptimistic", "useFormStatus", "useTransition", "Server Functions"],
	},
	{
		id: "use-hook",
		emoji: "📦",
		title: "use() Hook",
		description: "在渲染中直接消费 Promise 和 Context 资源，支持条件语句和循环中使用",
		href: "/react-19/use-hook",
		buttonText: "体验 use() Hook",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "beginner",
		tags: ["异步", "Context", "Suspense", "Promise"],
		examples: ["Promise 消费", "Context 读取", "条件渲染", "服务端数据消费"],
	},
	{
		id: "server-components",
		emoji: "🖥️",
		title: "服务端组件 (RSC)",
		description: "在服务端渲染组件，减小客户端打包体积，支持直接在服务端访问数据和 API",
		href: "/react-19/server-components",
		buttonText: "体验服务端渲染",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "advanced",
		tags: ["服务端", "性能", "SEO", "Server Functions"],
		examples: ["服务端数据获取", "零客户端 JS", "自动代码分割", "混合渲染"],
	},
	{
		id: "metadata",
		emoji: "📝",
		title: "文档元数据标签",
		description: "在组件树中直接使用 title、meta、script 等标签，支持异步脚本自动去重",
		href: "/react-19/metadata",
		buttonText: "体验元数据管理",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "beginner",
		tags: ["SEO", "元数据", "社交媒体", "脚本管理"],
		examples: ["动态 title", "meta 标签", "Open Graph", "Twitter Cards"],
	},
	{
		id: "ref-as-prop",
		emoji: "🔗",
		title: "ref 作为属性",
		description: "ref 可作为普通属性传递，无需 forwardRef",
		href: "/react-19/ref-as-prop",
		buttonText: "体验简化 ref",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "beginner",
		tags: ["API", "TypeScript", "简化"],
		examples: ["简化 ref 传递", "组件库开发", "TypeScript 类型"],
	},
	{
		id: "resource-preload",
		emoji: "🚀",
		title: "资源预加载 API",
		description: "提供 preload 等 API 控制关键资源加载",
		href: "/react-19/resource-preload",
		buttonText: "体验资源预加载",
		version: "19.0",
		category: "React 19.0",
		status: "stable",
		difficulty: "intermediate",
		tags: ["性能", "资源", "优化"],
		examples: ["preload", "preinit", "prefetchDNS", "preconnect"],
	},
	{
		id: "compiler",
		emoji: "🤖",
		title: "React Compiler",
		description: "自动优化组件重新渲染，支持 'use memo' 指令",
		href: "/react-19/compiler",
		buttonText: "体验自动优化",
		version: "19.0+",
		category: "React Compiler",
		status: "experimental",
		difficulty: "advanced",
		tags: ["性能", "自动优化", "Compiler"],
		examples: ["自动记忆化", "依赖分析", "渲染优化"],
	},
];

const allFeatures = react19Features;

const categories = ["全部", "React 19.0", "React Compiler"];

export default function React19Overview() {
	const [selectedCategory, setSelectedCategory] = useState("全部");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredFeatures = allFeatures.filter((feature) => {
		const matchesCategory = selectedCategory === "全部" || feature.category === selectedCategory;
		const matchesSearch =
			feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			feature.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	const handleCardClick = (cardId: string) => {
		const feature = allFeatures.find((f) => f.id === cardId);
		if (feature) {
			window.location.href = feature.href;
		}
	};

	return (
		<Layout>
			<FeatureContainer>
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
						<div className="text-center">
							<h1 className="mb-4 font-bold text-responsive-3xl text-gray-900">React 19 新特性实验室</h1>
							<p className="mx-auto max-w-3xl text-gray-600 text-responsive-base">
								深入探索 React 19 全版本新特性，包括 Actions、Hooks、Server Components 等功能的完整实现和示例。
							</p>
						</div>
					</div>
				</div>

				{/* 搜索和过滤 */}
				<FeatureContent>
					<FilterBar
						categories={categories}
						selectedCategory={selectedCategory}
						searchQuery={searchQuery}
						onCategoryChange={setSelectedCategory}
						onSearchChange={setSearchQuery}
					/>
				</FeatureContent>

				{/* 特性卡片网格 */}
				<FeatureContent>
					<FeatureCardGrid
						cards={filteredFeatures.map((f) => ({
							...f,
							icon: null,
							examples: f.examples || [],
						}))}
						onCardClick={handleCardClick}
					/>
				</FeatureContent>

				{/* React 19 核心优势 */}
				<FeatureContent>
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">React 19 核心优势</h2>
						<div className="mb-4 text-green-600 text-sm">
							✨ React 19 专注于提升开发体验和用户体验，特别是在表单处理和服务端渲染方面
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="rounded-lg border border-green-100 bg-green-50 p-4">
								<h3 className="mb-2 font-semibold text-green-800">🚀 渐进增强</h3>
								<p className="text-green-700 text-sm">表单在 JavaScript 加载前就能工作，useActionState 支持 permalink</p>
							</div>
							<div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
								<h3 className="mb-2 font-semibold text-blue-800">⚡ 简化异步处理</h3>
								<p className="text-blue-700 text-sm">Actions 系统自动管理 pending 状态、错误处理和表单重置</p>
							</div>
							<div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
								<h3 className="mb-2 font-semibold text-purple-800">🔄 乐观更新</h3>
								<p className="text-purple-700 text-sm">useOptimistic Hook 让 UI 立即响应用户操作</p>
							</div>
							<div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
								<h3 className="mb-2 font-semibold text-yellow-800">🖥️ 服务端组件</h3>
								<p className="text-yellow-700 text-sm">零客户端 JavaScript，自动代码分割，更好的 SEO</p>
							</div>
							<div className="rounded-lg border border-red-100 bg-red-50 p-4">
								<h3 className="mb-2 font-semibold text-red-800">📊 状态管理简化</h3>
								<p className="text-red-700 text-sm">useFormStatus 让子组件轻松访问表单状态</p>
							</div>
							<div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
								<h3 className="mb-2 font-semibold text-indigo-800">🤖 自动优化</h3>
								<p className="text-indigo-700 text-sm">React Compiler 自动优化组件重渲染</p>
							</div>
						</div>
					</div>
				</FeatureContent>

				{/* 官方代码示例 */}
				<FeatureContent>
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">官方代码示例</h2>
						<div className="mb-4 text-blue-600 text-sm">
							📖 以下示例来自 React 官方文档，展示了 React 19 新特性的实际用法
						</div>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">useActionState Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const name = formData.get("name");
    if (!name) return { error: "Required" };
    return { success: true };
  },
  null
);`}
								</pre>
								<p className="text-gray-600 text-xs">管理表单状态，自动处理 pending 和错误</p>
							</div>
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">use() Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}`}
								</pre>
								<p className="text-gray-600 text-xs">在渲染中直接消费 Promise 和 Context</p>
							</div>
						</div>
					</div>
				</FeatureContent>

				{/* 统计信息 */}
				<FeatureContent>
					<StatsSection
						title="统计信息"
						stats={[
							{ label: "总特性数", value: allFeatures.length, color: "text-blue-600" },
							{ label: "稳定版", value: allFeatures.filter((f) => f.status === "stable").length, color: "text-green-600" },
							{ label: "实验性", value: allFeatures.filter((f) => f.status === "experimental").length, color: "text-yellow-600" },
							{ label: "高级特性", value: allFeatures.filter((f) => f.difficulty === "advanced").length, color: "text-purple-600" },
						]}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
