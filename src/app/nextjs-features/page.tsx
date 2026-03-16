"use client";

import {
	Code,
	Database,
	FileText,
	Globe,
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
import { useState } from "react";
import Layout from "@/components/Layout";
import {
	FeatureCardGrid,
	FeatureContainer,
	FeatureContent,
	type FeatureGridCard,
	FilterBar,
	StatsSection,
} from "@/components/showcase";

const features: FeatureGridCard[] = [
	{
		id: "routing",
		title: "App Router",
		description: "Next.js 15 的新一代路由系统，支持嵌套路由、布局和模板",
		icon: <Router className="h-8 w-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["嵌套路由", "路由组", "并行路由", "拦截路由"],
		href: "/nextjs-features/routing",
	},
	{
		id: "server-components",
		title: "Server Components",
		description: "服务端组件，减少客户端 JavaScript 包大小",
		icon: <Server className="h-8 w-8" />,
		status: "in-progress",
		category: "基础特性",
		examples: ["服务端数据获取", "零客户端 JS", "自动代码分割"],
		href: "/nextjs-features/server-components",
	},
	{
		id: "data-fetching",
		title: "数据获取",
		description: "多种数据获取模式：SSG、SSR、ISR 和客户端获取",
		icon: <Database className="h-8 w-8" />,
		status: "completed",
		category: "数据管理",
		examples: ["静态生成", "服务端渲染", "增量静态生成", "客户端获取"],
		href: "/nextjs-features/data-fetching",
	},
	{
		id: "performance",
		title: "性能优化",
		description: "内置的性能优化特性：图片、字体、脚本优化",
		icon: <Zap className="h-8 w-8" />,
		status: "completed",
		category: "性能优化",
		examples: ["next/image", "next/font", "next/script", "代码分割"],
		href: "/nextjs-features/performance",
	},
	{
		id: "api-routes",
		title: "API 路由",
		description: "构建全栈应用的无缝 API 解决方案",
		icon: <Code className="h-8 w-8" />,
		status: "completed",
		category: "API 开发",
		examples: ["RESTful API", "中间件", "身份验证", "文件处理"],
		href: "/nextjs-features/api-routes",
	},
	{
		id: "metadata",
		title: "元数据和 SEO",
		description: "动态和静态元数据管理，优化搜索引擎排名",
		icon: <FileText className="h-8 w-8" />,
		status: "completed",
		category: "SEO 优化",
		examples: ["动态元数据", "sitemap", "robots.txt", "Open Graph"],
		href: "/nextjs-features/metadata",
	},
	{
		id: "styling",
		title: "样式解决方案",
		description: "多种样式方案：CSS Modules、Tailwind CSS、CSS-in-JS",
		icon: <Palette className="h-8 w-8" />,
		status: "completed",
		category: "样式设计",
		examples: ["全局样式", "CSS 模块", "Tailwind CSS", "主题切换"],
		href: "/nextjs-features/styling",
	},
	{
		id: "state-management",
		title: "状态管理",
		description: "React Context、Zustand、Redux 等状态管理方案",
		icon: <Layers className="h-8 w-8" />,
		status: "completed",
		category: "状态管理",
		examples: ["Context API", "Zustand", "Redux Toolkit", "本地存储"],
		href: "/nextjs-features/state-management",
	},
	{
		id: "forms",
		title: "表单处理",
		description: "表单验证、提交和状态管理的完整解决方案",
		icon: <Settings className="h-8 w-8" />,
		status: "completed",
		category: "表单处理",
		examples: ["受控组件", "表单验证", "文件上传", "多步骤表单"],
		href: "/nextjs-features/forms",
	},
	{
		id: "i18n",
		title: "国际化",
		description: "多语言支持和本地化解决方案",
		icon: <Globe className="h-8 w-8" />,
		status: "completed",
		category: "国际化",
		examples: ["路由本地化", "动态翻译", "日期格式化", "SEO 优化"],
		href: "/nextjs-features/i18n",
	},
	{
		id: "testing",
		title: "测试策略",
		description: "单元测试、集成测试和 E2E 测试的完整覆盖",
		icon: <TestTube className="h-8 w-8" />,
		status: "completed",
		category: "测试",
		examples: ["Jest", "Playwright", "组件测试", "API 测试"],
		href: "/nextjs-features/testing",
	},
	{
		id: "security",
		title: "安全性",
		description: "身份验证、授权和安全最佳实践",
		icon: <Shield className="h-8 w-8" />,
		status: "completed",
		category: "安全性",
		examples: ["身份验证", "授权", "CSRF 保护", "安全头"],
		href: "/nextjs-features/security",
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

	const handleCardClick = (cardId: string) => {
		router.push(`/nextjs-features/${cardId}`);
	};

	return (
		<Layout>
			<FeatureContainer>
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
						<div className="text-center">
							<h1 className="mb-4 font-bold text-gray-900 text-responsive-3xl">Next.js 15 全特性测试</h1>
							<p className="mx-auto max-w-3xl text-gray-600 text-responsive-base">
								探索 Next.js 15 的全部特性，包括 App Router、Server Components、
								性能优化、数据获取等功能的完整实现和示例。
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
					<FeatureCardGrid cards={filteredFeatures} onCardClick={handleCardClick} />
				</FeatureContent>

				{/* 统计信息 */}
				<FeatureContent>
					<StatsSection
						title="统计信息"
						stats={[
							{ label: "总特性数", value: features.length, color: "text-blue-600" },
							{
								label: "已完成",
								value: features.filter((f) => f.status === "completed").length,
								color: "text-green-600",
							},
							{
								label: "进行中",
								value: features.filter((f) => f.status === "in-progress").length,
								color: "text-yellow-600",
							},
							{ label: "计划中", value: features.filter((f) => f.status === "planned").length, color: "text-gray-600" },
						]}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
