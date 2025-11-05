"use client";

import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";

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
	what: string;
	why: string;
	when: string;
	href: string;
	buttonText: string;
	examples: string[];
}

// React 19 全版本特性数据
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
		what: "Actions 是 React 19 中简化异步数据变更的新机制，包括 Server Functions 和配套 Hooks",
		why: "解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题，提供更好的渐进增强支持",
		when: "处理表单提交、数据变更、乐观更新、并发渲染、服务端函数调用场景",
		examples: [
			"useActionState",
			"useOptimistic",
			"useFormStatus",
			"useTransition",
			"Server Functions",
			"form Actions",
			"progressive enhancement",
		],
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
		what: "use() 是一个新的 Hook，可以直接在渲染中消费 Promise 和 Context，支持 Suspense",
		why: "解决异步数据处理复杂、Context 嵌套过深、代码可读性差的问题，简化资源消费",
		when: "异步数据获取、服务端组件 Promise 消费、动态 Context 消费、Promise 竞速等场景",
		examples: ["Promise 消费", "Context 读取", "条件渲染", "服务端数据消费", "Suspense 集成"],
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
		what: "RSC 允许在服务端渲染组件，只将必要的 JavaScript 发送到客户端，支持 Server Functions",
		why: "解决首屏加载慢、客户端包体积大、SEO 效果差的问题，提供更好的性能和用户体验",
		when: "内容展示网站、SEO 要求高、性能敏感的应用、需要服务端数据获取的场景",
		examples: ["服务端数据获取", "零客户端 JS", "自动代码分割", "混合渲染", "Server Functions", "客户端组件组合"],
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
		what: "可以直接在组件中使用 HTML 头部标签和异步脚本，自动提升到 head 中并去重",
		why: "解决动态 SEO 管理复杂、社交媒体分享优化困难、脚本重复加载的问题",
		when: "需要动态 SEO、社交媒体分享、页面元数据管理、第三方脚本集成",
		examples: ["动态 title", "meta 标签", "Open Graph", "Twitter Cards", "异步脚本", "脚本去重"],
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
		what: "ref 现在可以作为普通属性传递，不再需要 forwardRef",
		why: "解决 forwardRef 代码冗余、API 不直观、TypeScript 类型复杂的问题",
		when: "需要访问子组件 DOM、库组件开发、ref 传递场景",
		examples: ["简化 ref 传递", "组件库开发", "TypeScript 类型", "函数组件 ref"],
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
		what: "preload API 允许开发者控制关键资源的加载时机和优先级",
		why: "解决资源加载延迟、用户体验不流畅、性能优化困难的问题",
		when: "性能优化、关键资源预加载、用户体验提升场景",
		examples: ["preload", "preinit", "prefetchDNS", "preconnect"],
	},
];

const react191Features: ReactFeature[] = [
	{
		id: "use-form-status",
		emoji: "📊",
		title: "useFormStatus Hook",
		description: "子组件访问父表单状态的专用 Hook，支持 pending、data、method、action 等状态",
		href: "/react-19/use-form-status",
		buttonText: "体验表单状态管理",
		version: "19.1",
		category: "React 19.1",
		status: "stable",
		difficulty: "beginner",
		tags: ["Hook", "表单", "状态管理", "UI 反馈"],
		what: "useFormStatus Hook 允许子组件访问父表单的提交状态，无需 prop drilling",
		why: "解决表单状态传递复杂、UI 反馈不及时、组件耦合度高的问题",
		when: "表单提交按钮状态管理、加载状态显示、表单数据访问、多按钮表单处理",
		examples: ["pending 状态", "表单数据访问", "按钮禁用", "加载提示", "formAction 支持"],
	},
	{
		id: "owner-stack",
		emoji: "🔍",
		title: "Owner Stack 调试",
		description: "新的调试功能，帮助定位渲染源组件",
		href: "/react-19/owner-stack",
		buttonText: "体验调试增强",
		version: "19.1",
		category: "React 19.1",
		status: "stable",
		difficulty: "intermediate",
		tags: ["调试", "开发工具", "性能"],
		what: "Owner Stack 提供完整的组件调用链，帮助快速定位渲染触发源",
		why: "解决组件调试困难、性能问题定位复杂、开发效率低的问题",
		when: "调试复杂组件树、性能问题诊断、开发阶段调试",
		examples: ["调用链跟踪", "性能问题定位", "React DevTools", "组件渲染分析"],
	},
	{
		id: "suspense-enhanced",
		emoji: "🔄",
		title: "Suspense 增强",
		description: "统一并优化了客户端、服务端和混合渲染阶段的行为",
		href: "/react-19/suspense-enhanced",
		buttonText: "体验 Suspense 增强",
		version: "19.1",
		category: "React 19.1",
		status: "stable",
		difficulty: "intermediate",
		tags: ["异步", "渲染", "稳定性"],
		what: "改进了 Suspense 在不同渲染环境下的一致性和稳定性",
		why: "解决水合边界不一致、混合渲染不稳定、异步渲染体验差的问题",
		when: "使用 Suspense、混合渲染、异步组件加载场景",
		examples: ["水合边界优化", "混合渲染支持", "异步渲染稳定", "回退处理"],
	},
];

// React 19.2+ 正在开发中的功能（暂时保留占位，等待官方文档）
const react192Features: ReactFeature[] = [
	{
		id: "future-features",
		emoji: "🚧",
		title: "未来功能",
		description: "React 19.2+ 版本正在开发中的功能，等待官方文档发布",
		href: "/react-19/future-features",
		buttonText: "敬请期待",
		version: "19.2+",
		category: "React 19.2+",
		status: "stable",
		difficulty: "advanced",
		tags: ["开发中", "实验性", "未来版本"],
		what: "React 团队正在开发的未来功能，具体细节等待官方发布",
		why: "持续改进 React 生态系统，提供更好的开发体验",
		when: "等待官方发布具体功能详情",
		examples: ["等待官方发布"],
	},
];

const compilerFeatures: ReactFeature[] = [
	{
		id: "compiler",
		emoji: "🤖",
		title: "React Compiler",
		description: "自动优化组件重新渲染，支持 'use memo' 指令和多种编译模式，无需手动使用 useMemo、useCallback",
		href: "/react-19/compiler",
		buttonText: "体验自动优化",
		version: "19.0+",
		category: "React Compiler",
		status: "experimental",
		difficulty: "advanced",
		tags: ["性能", "自动优化", "Compiler", "use memo"],
		what: "React Compiler 自动分析组件依赖关系，进行智能优化，支持 'use memo' 指令和渐进式采用",
		why: "解决手动优化复杂、性能调优困难、代码冗余的问题，提供更好的开发体验",
		when: "性能敏感应用、复杂组件树、减少手动优化工作、渐进式优化迁移",
		examples: ["自动记忆化", "依赖分析", "渲染优化", "性能提升", "'use memo' 指令", "编译模式配置", "渐进式采用"],
	},
];

// 所有特性数据
const allFeatures = [...react19Features, ...react191Features, ...react192Features, ...compilerFeatures];

const categories = ["全部", "React 19.0", "React 19.1", "React 19.2+", "React Compiler"];

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

	const getStatusColor = (status: ReactFeature["status"]) => {
		switch (status) {
			case "stable":
				return "text-green-600 bg-green-100";
			case "experimental":
				return "text-yellow-600 bg-yellow-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: ReactFeature["status"]) => {
		switch (status) {
			case "stable":
				return "稳定";
			case "experimental":
				return "实验性";
			default:
				return "未知";
		}
	};

	const getDifficultyColor = (difficulty: ReactFeature["difficulty"]) => {
		switch (difficulty) {
			case "beginner":
				return "text-green-600 bg-green-100";
			case "intermediate":
				return "text-yellow-600 bg-yellow-100";
			case "advanced":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyText = (difficulty: ReactFeature["difficulty"]) => {
		switch (difficulty) {
			case "beginner":
				return "初级";
			case "intermediate":
				return "中级";
			case "advanced":
				return "高级";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="mb-4 font-bold text-4xl text-gray-900">React 19 新特性实验室</h1>
							<p className="mx-auto max-w-3xl text-gray-600 text-lg">
								深入探索 React 19 全版本新特性，包括 Actions、Hooks、Server Components 等功能的完整实现和示例。
							</p>
						</div>
					</div>
				</div>

				{/* 搜索和过滤 */}
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`rounded-lg px-4 py-2 font-medium text-sm transition-colors ${
										selectedCategory === category
											? "bg-blue-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-100"
									}`}
								>
									{category}
								</button>
							))}
						</div>
						<div className="relative">
							<input
								type="text"
								placeholder="搜索特性..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-64 rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
							/>
							<svg
								className="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* 特性卡片网格 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredFeatures.map((feature) => (
							<div
								key={feature.id}
								className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
							>
								<div className="p-6">
									<div className="mb-4 flex items-start justify-between">
										<div className="flex items-center space-x-3">
											<div className="text-4xl">{feature.emoji}</div>
											<div>
												<h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
												<div className="mt-1 flex items-center space-x-2">
													<span
														className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getStatusColor(feature.status)}`}
													>
														{getStatusText(feature.status)}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getDifficultyColor(feature.difficulty)}`}
													>
														{getDifficultyText(feature.difficulty)}
													</span>
												</div>
											</div>
										</div>
									</div>

									<p className="mb-4 text-gray-600">{feature.description}</p>

									<div className="mb-4">
										<span className="mb-2 block text-gray-500 text-sm">分类: {feature.category}</span>
									</div>

									<div className="mb-4">
										<h4 className="mb-2 font-medium text-gray-700 text-sm">标签:</h4>
										<div className="flex flex-wrap gap-1">
											{feature.tags.map((tag, index) => (
												<span
													key={index}
													className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700 text-xs"
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									<div className="mb-4">
										<h4 className="mb-2 font-medium text-gray-700 text-sm">包含示例:</h4>
										<div className="flex flex-wrap gap-1">
											{feature.examples.map((example, index) => (
												<span
													key={index}
													className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-blue-700 text-xs"
												>
													{example}
												</span>
											))}
										</div>
									</div>

									<div className="mt-6 flex gap-2">
										<Link href={feature.href}>
											<button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700">
												查看详情
											</button>
										</Link>
										{feature.status === "stable" && (
											<button
												className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-sm transition-colors hover:bg-gray-50"
												onClick={() => {
													// TODO: Open demo
													console.log(`Open demo for ${feature.id}`);
												}}
											>
												演示
											</button>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* React 19 核心优势 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">React 19 核心优势</h2>
						<div className="mb-4 text-green-600 text-sm">
							✨ React 19 专注于提升开发体验和用户体验，特别是在表单处理和服务端渲染方面
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="rounded-lg border border-green-100 bg-green-50 p-4">
								<h3 className="mb-2 font-semibold text-green-800">🚀 渐进增强</h3>
								<p className="text-green-700 text-sm">
									表单在 JavaScript 加载前就能工作，useActionState 支持permalink，确保基础功能始终可用
								</p>
							</div>
							<div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
								<h3 className="mb-2 font-semibold text-blue-800">⚡ 简化异步处理</h3>
								<p className="text-blue-700 text-sm">
									Actions 系统自动管理 pending 状态、错误处理和表单重置，大幅减少样板代码
								</p>
							</div>
							<div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
								<h3 className="mb-2 font-semibold text-purple-800">🔄 乐观更新</h3>
								<p className="text-purple-700 text-sm">useOptimistic Hook 让 UI 立即响应用户操作，提供流畅的用户体验</p>
							</div>
							<div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
								<h3 className="mb-2 font-semibold text-yellow-800">🖥️ 服务端组件</h3>
								<p className="text-sm text-yellow-700">零客户端 JavaScript，自动代码分割，更好的 SEO 和首屏性能</p>
							</div>
							<div className="rounded-lg border border-red-100 bg-red-50 p-4">
								<h3 className="mb-2 font-semibold text-red-800">📊 状态管理简化</h3>
								<p className="text-red-700 text-sm">useFormStatus 让子组件轻松访问表单状态，无需复杂的 prop drilling</p>
							</div>
							<div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
								<h3 className="mb-2 font-semibold text-indigo-800">🤖 自动优化</h3>
								<p className="text-indigo-700 text-sm">React Compiler 自动优化组件重渲染，支持选择性加入和渐进式采用</p>
							</div>
						</div>
					</div>
				</div>

				{/* 官方代码示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">官方代码示例</h2>
						<div className="mb-4 text-blue-600 text-sm">
							📖 以下示例来自 React 官方文档，展示了 React 19 新特性的实际用法
						</div>

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							{/* useActionState 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">useActionState Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`const [error, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    const error = await updateName(formData.get("name"));
    if (error) {
      return error;
    }
    redirect("/path");
    return null;
  },
  null,
);`}
								</pre>
								<p className="text-gray-600 text-xs">管理表单状态，自动处理 pending 和错误</p>
							</div>

							{/* Server Functions 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">Server Functions</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`// 服务器端
'use server';
export async function updateName(name) {
  await db.users.updateName(name);
}

// 客户端
<form action={updateName}>
  <input type="text" name="name" />
  <button type="submit">Update</button>
</form>`}
								</pre>
								<p className="text-gray-600 text-xs">直接在表单中使用服务端函数</p>
							</div>

							{/* use Hook 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">use() Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`function Comments({commentsPromise}) {
  // use 会等待 Promise 解析
  const comments = use(commentsPromise);
  return comments.map(comment =>
    <p key={comment.id}>{comment}</p>
  );
}`}
								</pre>
								<p className="text-gray-600 text-xs">在渲染中直接消费 Promise 和 Context</p>
							</div>

							{/* React Compiler 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">React Compiler 'use memo'</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`function TodoList({ todos }) {
  "use memo"; // 选择性加入编译器优化

  const sortedTodos = todos.slice().sort();
  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}`}
								</pre>
								<p className="text-gray-600 text-xs">选择性加入 React Compiler 自动优化</p>
							</div>

							{/* Document Metadata 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">文档元数据和脚本</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`function MyComponent() {
  return (
    <div>
      <title>My Page Title</title>
      <meta name="description" content="Page description" />
      <script async={true} src="..." />
      Hello World
    </div>
  )
}`}
								</pre>
								<p className="text-gray-600 text-xs">在组件中直接使用 head 标签，脚本自动去重</p>
							</div>

							{/* useFormStatus 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">useFormStatus Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending, data } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中..." : "提交"}
    </button>
  );
}

// 在表单中使用
<form action={submitAction}>
  <SubmitButton />
</form>`}
								</pre>
								<p className="text-gray-600 text-xs">子组件访问父表单状态，无需 prop drilling</p>
							</div>

							{/* useOptimistic 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">useOptimistic Hook</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage) => [
    ...state,
    { text: newMessage, sending: true }
  ]
);

// 立即显示 UI 更新
<form action={formAction}>
  <input type="text" name="message" />
  <button type="submit">发送</button>
</form>

{optimisticMessages.map(msg => (
  <div key={msg.id}>
    {msg.text}
    {msg.sending && <small> (发送中...)</small>}
  </div>
))}`}
								</pre>
								<p className="text-gray-600 text-xs">乐观更新 UI，提升用户体验</p>
							</div>

							{/* useTransition with Actions 示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">useTransition + Actions</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`const [isPending, startTransition] = useTransition();

const onClick = () => {
  startTransition(async () => {
    const error = await updateName(name);
    if (error) {
      setError(error);
    }
  });
};`}
								</pre>
								<p className="text-gray-600 text-xs">结合 useTransition 管理异步操作状态</p>
							</div>

							{/* 多按钮表单处理示例 */}
							<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">多按钮表单处理</h3>
								<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
									{`<form action={publishAction}>
  <textarea name="content" />
  <br />
  <button type="submit" name="button" value="publish">
    发布
  </button>
  <button formAction={saveDraftAction}>
    保存草稿
  </button>
</form>`}
								</pre>
								<p className="text-gray-600 text-xs">使用 formAction 处理多种提交类型</p>
							</div>
						</div>
					</div>
				</div>

				{/* 实际应用指南 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">实际应用指南</h2>
						<div className="mb-4 text-indigo-600 text-sm">📚 如何在项目中逐步采用 React 19 新特性</div>

						<div className="space-y-6">
							<div className="rounded-lg border border-gray-100 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">🏁 从简单的 Hooks 开始</h3>
								<div className="mb-3 text-gray-600 text-sm">
									首先在现有项目中引入 useFormStatus 和 useOptimistic，这些 Hook 可以立即改善用户体验
								</div>
								<div className="rounded bg-gray-50 p-3 text-gray-700 text-sm">
									<strong>推荐顺序：</strong> useFormStatus → useOptimistic → useActionState → Server Functions
								</div>
							</div>

							<div className="rounded-lg border border-gray-100 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">📝 表单处理现代化</h3>
								<div className="mb-3 text-gray-600 text-sm">
									将传统的表单处理迁移到 Actions 系统，享受自动的状态管理和错误处理
								</div>
								<ul className="list-inside list-disc space-y-1 text-gray-600 text-sm">
									<li>用 Server Functions 替代 API 路由处理</li>
									<li>用 useActionState 管理表单状态</li>
									<li>用 useFormStatus 优化按钮状态</li>
									<li>添加渐进增强支持</li>
								</ul>
							</div>

							<div className="rounded-lg border border-gray-100 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">🚀 性能优化策略</h3>
								<div className="mb-3 text-gray-600 text-sm">利用 React Compiler 和服务端组件来提升应用性能</div>
								<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
									<div className="rounded bg-blue-50 p-3 text-blue-700 text-sm">
										<strong>客户端优化：</strong> React Compiler + 乐观更新
									</div>
									<div className="rounded bg-green-50 p-3 text-green-700 text-sm">
										<strong>服务端优化：</strong> Server Components + 资源预加载
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-gray-100 p-4">
								<h3 className="mb-3 font-semibold text-gray-800">⚠️ 注意事项</h3>
								<ul className="list-inside list-disc space-y-1 text-gray-600 text-sm">
									<li>确保项目已升级到 React 19</li>
									<li>服务端功能需要支持 React Server Components 的框架</li>
									<li>渐进增强功能需要正确配置服务器路由</li>
									<li>React Compiler 目前为实验性功能，建议在非关键路径测试</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* 统计信息 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">统计信息</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="text-center">
								<div className="font-bold text-3xl text-blue-600">{allFeatures.length}</div>
								<div className="text-gray-600 text-sm">总特性数</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-green-600">
									{allFeatures.filter((f) => f.status === "stable").length}
								</div>
								<div className="text-gray-600 text-sm">稳定版</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-yellow-600">
									{allFeatures.filter((f) => f.status === "experimental").length}
								</div>
								<div className="text-gray-600 text-sm">实验性</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-purple-600">
									{allFeatures.filter((f) => f.difficulty === "advanced").length}
								</div>
								<div className="text-gray-600 text-sm">高级特性</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
