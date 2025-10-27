"use client";

import {
	Code,
	Database,
	FileText,
	Globe,
	Image,
	Layers,
	Palette,
	Router,
	Server,
	Settings,
	Shield,
	TestTube,
	Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface FeatureCard {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	status: "completed" | "in-progress" | "planned";
	category: string;
	examples: string[];
}

const features: FeatureCard[] = [
	{
		id: "routing",
		title: "App Router",
		description: "Next.js 15 的新一代路由系统，支持嵌套路由、布局和模板",
		icon: <Router className="h-8 w-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["嵌套路由", "路由组", "并行路由", "拦截路由"],
	},
	{
		id: "server-components",
		title: "Server Components",
		description: "服务端组件，减少客户端 JavaScript 包大小",
		icon: <Server className="h-8 w-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["服务端数据获取", "零客户端 JS", "自动代码分割"],
	},
	{
		id: "data-fetching",
		title: "数据获取",
		description: "多种数据获取模式：SSG、SSR、ISR 和客户端获取",
		icon: <Database className="h-8 w-8" />,
		status: "completed",
		category: "数据管理",
		examples: ["静态生成", "服务端渲染", "增量静态生成", "客户端获取"],
	},
	{
		id: "performance",
		title: "性能优化",
		description: "内置的性能优化特性：图片、字体、脚本优化",
		icon: <Zap className="h-8 w-8" />,
		status: "completed",
		category: "性能优化",
		examples: ["next/image", "next/font", "next/script", "代码分割"],
	},
	{
		id: "api-routes",
		title: "API 路由",
		description: "构建全栈应用的无缝 API 解决方案",
		icon: <Code className="h-8 w-8" />,
		status: "completed",
		category: "API 开发",
		examples: ["RESTful API", "中间件", "身份验证", "文件处理"],
	},
	{
		id: "metadata",
		title: "元数据和 SEO",
		description: "动态和静态元数据管理，优化搜索引擎排名",
		icon: <FileText className="h-8 w-8" />,
		status: "completed",
		category: "SEO 优化",
		examples: ["动态元数据", "sitemap", "robots.txt", "Open Graph"],
	},
	{
		id: "styling",
		title: "样式解决方案",
		description: "多种样式方案：CSS Modules、Tailwind CSS、CSS-in-JS",
		icon: <Palette className="h-8 w-8" />,
		status: "completed",
		category: "样式设计",
		examples: ["全局样式", "CSS 模块", "Tailwind CSS", "主题切换"],
	},
	{
		id: "state-management",
		title: "状态管理",
		description: "React Context、Zustand、Redux 等状态管理方案",
		icon: <Layers className="h-8 w-8" />,
		status: "completed",
		category: "状态管理",
		examples: ["Context API", "Zustand", "Redux Toolkit", "本地存储"],
	},
	{
		id: "forms",
		title: "表单处理",
		description: "表单验证、提交和状态管理的完整解决方案",
		icon: <Settings className="h-8 w-8" />,
		status: "completed",
		category: "表单处理",
		examples: ["受控组件", "表单验证", "文件上传", "多步骤表单"],
	},
	{
		id: "i18n",
		title: "国际化",
		description: "多语言支持和本地化解决方案",
		icon: <Globe className="h-8 w-8" />,
		status: "completed",
		category: "国际化",
		examples: ["路由本地化", "动态翻译", "日期格式化", "SEO 优化"],
	},
	{
		id: "testing",
		title: "测试策略",
		description: "单元测试、集成测试和 E2E 测试的完整覆盖",
		icon: <TestTube className="h-8 w-8" />,
		status: "completed",
		category: "测试",
		examples: ["Jest", "Playwright", "组件测试", "API 测试"],
	},
	{
		id: "security",
		title: "安全性",
		description: "身份验证、授权和安全最佳实践",
		icon: <Shield className="h-8 w-8" />,
		status: "completed",
		category: "安全性",
		examples: ["身份验证", "授权", "CSRF 保护", "安全头"],
	},
];

const categories = [
	"全部",
	"基础特性",
	"数据管理",
	"性能优化",
	"API 开发",
	"SEO 优化",
	"样式设计",
	"状态管理",
	"表单处理",
	"国际化",
	"测试",
	"安全性",
];

export default function NextJsFeaturesPage() {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState("全部");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredFeatures = features.filter((feature) => {
		const matchesCategory = selectedCategory === "全部" || feature.category === selectedCategory;
		const matchesSearch =
			feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			feature.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const getStatusColor = (status: FeatureCard["status"]) => {
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

	const getStatusText = (status: FeatureCard["status"]) => {
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
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="mb-4 font-bold text-4xl text-gray-900">Next.js 15 全特性测试</h1>
							<p className="mx-auto max-w-3xl text-gray-600 text-lg">
								探索 Next.js 15 的全部特性，包括 App Router、Server Components、
								性能优化、数据获取等功能的完整实现和示例。
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
											<div className="text-blue-600">{feature.icon}</div>
											<div>
												<h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getStatusColor(feature.status)}`}
												>
													{getStatusText(feature.status)}
												</span>
											</div>
										</div>
									</div>

									<p className="mb-4 text-gray-600">{feature.description}</p>

									<div className="mb-4">
										<span className="mb-2 block text-gray-500 text-sm">分类: {feature.category}</span>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium text-gray-700 text-sm">包含示例:</h4>
										<div className="flex flex-wrap gap-1">
											{feature.examples.map((example, index) => (
												<span
													key={index}
													className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700 text-xs"
												>
													{example}
												</span>
											))}
										</div>
									</div>

									<div className="mt-6 flex gap-2">
										<button
											className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
											onClick={() => {
												router.push(`/nextjs-features/${feature.id}`);
											}}
										>
											查看详情
										</button>
										{feature.status === "completed" && (
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

				{/* 统计信息 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">统计信息</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="text-center">
								<div className="font-bold text-3xl text-blue-600">{features.length}</div>
								<div className="text-gray-600 text-sm">总特性数</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-green-600">
									{features.filter((f) => f.status === "completed").length}
								</div>
								<div className="text-gray-600 text-sm">已完成</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-yellow-600">
									{features.filter((f) => f.status === "in-progress").length}
								</div>
								<div className="text-gray-600 text-sm">进行中</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-3xl text-gray-600">
									{features.filter((f) => f.status === "planned").length}
								</div>
								<div className="text-gray-600 text-sm">计划中</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
