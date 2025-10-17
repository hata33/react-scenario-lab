"use client";

import React, { useState } from "react";
import {
	FileText,
	Database,
	Zap,
	Settings,
	Globe,
	Shield,
	Image,
	Code,
	TestTube,
	Server,
	Router,
	Layers,
	Palette,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

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
		icon: <Router className="w-8 h-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["嵌套路由", "路由组", "并行路由", "拦截路由"],
	},
	{
		id: "server-components",
		title: "Server Components",
		description: "服务端组件，减少客户端 JavaScript 包大小",
		icon: <Server className="w-8 h-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["服务端数据获取", "零客户端 JS", "自动代码分割"],
	},
	{
		id: "data-fetching",
		title: "数据获取",
		description: "多种数据获取模式：SSG、SSR、ISR 和客户端获取",
		icon: <Database className="w-8 h-8" />,
		status: "completed",
		category: "数据管理",
		examples: ["静态生成", "服务端渲染", "增量静态生成", "客户端获取"],
	},
	{
		id: "performance",
		title: "性能优化",
		description: "内置的性能优化特性：图片、字体、脚本优化",
		icon: <Zap className="w-8 h-8" />,
		status: "completed",
		category: "性能优化",
		examples: ["next/image", "next/font", "next/script", "代码分割"],
	},
	{
		id: "api-routes",
		title: "API 路由",
		description: "构建全栈应用的无缝 API 解决方案",
		icon: <Code className="w-8 h-8" />,
		status: "completed",
		category: "API 开发",
		examples: ["RESTful API", "中间件", "身份验证", "文件处理"],
	},
	{
		id: "metadata",
		title: "元数据和 SEO",
		description: "动态和静态元数据管理，优化搜索引擎排名",
		icon: <FileText className="w-8 h-8" />,
		status: "completed",
		category: "SEO 优化",
		examples: ["动态元数据", "sitemap", "robots.txt", "Open Graph"],
	},
	{
		id: "styling",
		title: "样式解决方案",
		description: "多种样式方案：CSS Modules、Tailwind CSS、CSS-in-JS",
		icon: <Palette className="w-8 h-8" />,
		status: "completed",
		category: "样式设计",
		examples: ["全局样式", "CSS 模块", "Tailwind CSS", "主题切换"],
	},
	{
		id: "state-management",
		title: "状态管理",
		description: "React Context、Zustand、Redux 等状态管理方案",
		icon: <Layers className="w-8 h-8" />,
		status: "completed",
		category: "状态管理",
		examples: ["Context API", "Zustand", "Redux Toolkit", "本地存储"],
	},
	{
		id: "forms",
		title: "表单处理",
		description: "表单验证、提交和状态管理的完整解决方案",
		icon: <Settings className="w-8 h-8" />,
		status: "completed",
		category: "表单处理",
		examples: ["受控组件", "表单验证", "文件上传", "多步骤表单"],
	},
	{
		id: "i18n",
		title: "国际化",
		description: "多语言支持和本地化解决方案",
		icon: <Globe className="w-8 h-8" />,
		status: "completed",
		category: "国际化",
		examples: ["路由本地化", "动态翻译", "日期格式化", "SEO 优化"],
	},
	{
		id: "testing",
		title: "测试策略",
		description: "单元测试、集成测试和 E2E 测试的完整覆盖",
		icon: <TestTube className="w-8 h-8" />,
		status: "completed",
		category: "测试",
		examples: ["Jest", "Playwright", "组件测试", "API 测试"],
	},
	{
		id: "security",
		title: "安全性",
		description: "身份验证、授权和安全最佳实践",
		icon: <Shield className="w-8 h-8" />,
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
		const matchesCategory =
			selectedCategory === "全部" || feature.category === selectedCategory;
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
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<div className="text-center">
							<h1 className="text-4xl font-bold text-gray-900 mb-4">
								Next.js 15 全特性测试
							</h1>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto">
								探索 Next.js 15 的全部特性，包括 App Router、Server Components、
								性能优化、数据获取等功能的完整实现和示例。
							</p>
						</div>
					</div>
				</div>

				{/* 搜索和过滤 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
								className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<svg
								className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredFeatures.map((feature) => (
							<div
								key={feature.id}
								className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
							>
								<div className="p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center space-x-3">
											<div className="text-blue-600">{feature.icon}</div>
											<div>
												<h3 className="text-lg font-semibold text-gray-900">
													{feature.title}
												</h3>
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}
												>
													{getStatusText(feature.status)}
												</span>
											</div>
										</div>
									</div>

									<p className="text-gray-600 mb-4">{feature.description}</p>

									<div className="mb-4">
										<span className="text-sm text-gray-500 mb-2 block">
											分类: {feature.category}
										</span>
									</div>

									<div className="space-y-2">
										<h4 className="text-sm font-medium text-gray-700">
											包含示例:
										</h4>
										<div className="flex flex-wrap gap-1">
											{feature.examples.map((example, index) => (
												<span
													key={index}
													className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
												>
													{example}
												</span>
											))}
										</div>
									</div>

									<div className="mt-6 flex gap-2">
										<button
											className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
											onClick={() => {
												router.push(`/nextjs-features/${feature.id}`);
											}}
										>
											查看详情
										</button>
										{feature.status === "completed" && (
											<button
												className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
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
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">
							统计信息
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">
									{features.length}
								</div>
								<div className="text-sm text-gray-600">总特性数</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-green-600">
									{features.filter((f) => f.status === "completed").length}
								</div>
								<div className="text-sm text-gray-600">已完成</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-yellow-600">
									{features.filter((f) => f.status === "in-progress").length}
								</div>
								<div className="text-sm text-gray-600">进行中</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-gray-600">
									{features.filter((f) => f.status === "planned").length}
								</div>
								<div className="text-sm text-gray-600">计划中</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
