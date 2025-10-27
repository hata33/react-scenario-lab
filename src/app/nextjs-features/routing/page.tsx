"use client";

import { ArrowLeft, CheckCircle, Code, GitBranch, Layers, Router, Zap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "@/components/Layout";

interface FeatureExample {
	id: string;
	title: string;
	description: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	demoPath: string;
	codeSnippet: string;
	features: string[];
}

const routingExamples: FeatureExample[] = [
	{
		id: "nested-routes",
		title: "嵌套路由",
		description: "使用文件夹结构创建嵌套路由，实现复杂的页面层级关系",
		difficulty: "初级",
		status: "completed",
		demoPath: "/nextjs-features/routing/nested-demo",
		codeSnippet: `// 文件夹结构
app/
  dashboard/
    layout.tsx
    page.tsx
    settings/
      page.tsx
    analytics/
      page.tsx`,
		features: ["文件夹即路由", "布局继承", "自动生成路由"],
	},
	{
		id: "route-groups",
		title: "路由组",
		description: "使用括号创建路由组，不影响 URL 路径但可以共享布局",
		difficulty: "中级",
		status: "in-progress",
		demoPath: "/nextjs-features/routing/groups-demo",
		codeSnippet: `// 路由组结构
app/
  (marketing)/
    layout.tsx
    page.tsx
  (shop)/
    layout.tsx
    page.tsx`,
		features: ["逻辑分组", "共享布局", "URL 不受影响"],
	},
	{
		id: "parallel-routes",
		title: "并行路由",
		description: "使用插槽实现并行路由，同时渲染多个独立页面",
		difficulty: "高级",
		status: "planned",
		demoPath: "/nextjs-features/routing/parallel-demo",
		codeSnippet: `// 并行路由结构
app/
  @analytics/
    page.tsx
  @team/
    page.tsx
  layout.tsx // 包含 <slot name="analytics"> 和 <slot name="team">`,
		features: ["独立渲染", "插槽系统", "状态隔离"],
	},
	{
		id: "intercepting-routes",
		title: "拦截路由",
		description: "拦截导航并在当前上下文中显示路由内容",
		difficulty: "高级",
		status: "planned",
		demoPath: "/nextjs-features/routing/intercepting-demo",
		codeSnippet: `// 拦截路由结构
app/
  feed/
    [...slug]/
      page.tsx
  @modal/
    (..)feed/
      [...slug]/
        page.tsx`,
		features: ["模态框", "上下文保持", "路由拦截"],
	},
	{
		id: "dynamic-routes",
		title: "动态路由",
		description: "使用方括号创建动态路由，处理参数化路径",
		difficulty: "初级",
		status: "completed",
		demoPath: "/nextjs-features/routing/dynamic-demo",
		codeSnippet: `// 动态路由
app/
  blog/
    [slug]/
      page.tsx
  users/
    [id]/
      page.tsx
      settings/
        page.tsx`,
		features: ["参数化路径", "类型安全", "嵌套动态路由"],
	},
	{
		id: "route-handlers",
		title: "路由处理函数",
		description: "创建 API 端点，处理请求和响应",
		difficulty: "中级",
		status: "in-progress",
		demoPath: "/nextjs-features/routing/handlers-demo",
		codeSnippet: `// API 路由
app/
  api/
    users/
      route.ts  // GET / POST
    users/
      [id]/
        route.ts  // GET / PUT / DELETE`,
		features: ["RESTful API", "中间件支持", "类型安全"],
	},
];

export default function RoutingFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<FeatureExample | null>(null);

	const getDifficultyColor = (difficulty: FeatureExample["difficulty"]) => {
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

	const getStatusColor = (status: FeatureExample["status"]) => {
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

	const getStatusText = (status: FeatureExample["status"]) => {
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
								<Router className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">App Router 特性</h1>
									<p className="text-gray-600">Next.js 15 的新一代路由系统完整指南</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 概述 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">什么是 App Router？</h2>
						<div className="prose prose-gray max-w-none">
							<p>
								App Router 是 Next.js 13+ 引入的新一代路由系统，基于 React Server Components
								和文件系统路由。它提供了更直观的路由定义方式，支持：
							</p>
							<ul className="list-disc space-y-2 pl-6">
								<li>
									<strong>嵌套路由</strong>：通过文件夹结构自然形成嵌套路由
								</li>
								<li>
									<strong>布局系统</strong>：共享 UI 组件，保持状态
								</li>
								<li>
									<strong>服务端组件</strong>：减少客户端 JavaScript 体积
								</li>
								<li>
									<strong>并行路由</strong>：同时渲染多个独立页面
								</li>
								<li>
									<strong>拦截路由</strong>：在当前上下文中显示路由内容
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* 特性示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">功能示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{routingExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-blue-500" : ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="mb-3 flex items-start justify-between">
											<h3 className="font-semibold text-gray-900 text-lg">{example.title}</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getDifficultyColor(example.difficulty)}`}
												>
													{example.difficulty}
												</span>
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getStatusColor(example.status)}`}
												>
													{getStatusText(example.status)}
												</span>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{example.description}</p>
										<div className="flex flex-wrap gap-2">
											{example.features.map((feature, index) => (
												<span
													key={index}
													className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700 text-xs"
												>
													{feature}
												</span>
											))}
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
											{selectedExample.status === "completed" && (
												<button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
													<Code className="h-4 w-4" />
													<span>查看演示</span>
												</button>
											)}
										</div>
										<p className="mb-4 text-gray-600">{selectedExample.description}</p>
										<div className="flex items-center space-x-4 text-gray-500 text-sm">
											<span>难度: {selectedExample.difficulty}</span>
											<span>状态: {getStatusText(selectedExample.status)}</span>
										</div>
									</div>
									<div className="p-6">
										<h4 className="mb-3 font-semibold text-gray-900">代码示例</h4>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>
									</div>
									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该示例已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<Layers className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个示例</h3>
									<p className="text-gray-600">点击左侧的示例查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* 学习资源 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">学习资源</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							<a
								href="https://nextjs.org/docs/app/building-your-application/routing/fundamentals"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
							>
								<Zap className="h-6 w-6 text-blue-600" />
								<div>
									<h4 className="font-medium text-gray-900">官方文档</h4>
									<p className="text-gray-600 text-sm">路由基础概念</p>
								</div>
							</a>
							<a
								href="https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
							>
								<Layers className="h-6 w-6 text-green-600" />
								<div>
									<h4 className="font-medium text-gray-900">布局和模板</h4>
									<p className="text-gray-600 text-sm">共享 UI 组件</p>
								</div>
							</a>
							<a
								href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
							>
								<GitBranch className="h-6 w-6 text-purple-600" />
								<div>
									<h4 className="font-medium text-gray-900">高级路由</h4>
									<p className="text-gray-600 text-sm">并行和拦截路由</p>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
