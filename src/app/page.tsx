import Link from "next/link";
import Layout from "@/components/Layout";
import { routeGroups } from "@/routeDefs";

// 定义分类
const categories = [
	{
		id: "framework",
		title: "框架核心",
		icon: "⚛️",
		description: "React 19 和 Next.js 15 的核心特性",
		color: "blue",
		groups: ["react-19", "nextjs-features"],
	},
	{
		id: "ui",
		title: "UI 组件",
		icon: "🎨",
		description: "编辑器、图表、特效等可视化组件",
		color: "purple",
		groups: ["monaco-editor", "mermaid", "charts", "special-effects", "rich-text", "markdown"],
	},
	{
		id: "data",
		title: "表单与数据",
		icon: "📊",
		description: "表单处理、数据展示和文件操作",
		color: "green",
		groups: ["forms", "data", "files"],
	},
	{
		id: "interaction",
		title: "交互功能",
		icon: "🎯",
		description: "动画、地图、实时通信等交互功能",
		color: "orange",
		groups: ["animation", "map", "chat", "mobile"],
	},
	{
		id: "integration",
		title: "第三方集成",
		icon: "🔌",
		description: "外部服务和工具的集成",
		color: "indigo",
		groups: ["supabase", "sentry", "bpmn", "d3js", "gsap"],
	},
	{
		id: "tools",
		title: "开发工具",
		icon: "🛠️",
		description: "认证、性能、测试等开发工具",
		color: "gray",
		groups: ["auth", "performance", "other"],
	},
	{
		id: "advanced",
		title: "高级功能",
		icon: "🚀",
		description: "AI 集成和其他高级特性",
		color: "red",
		groups: ["ai"],
	},
];

export default function HomePage() {
	const colorClasses: Record<string, string> = {
		blue: "from-blue-500 to-blue-600",
		purple: "from-purple-500 to-purple-600",
		green: "from-green-500 to-green-600",
		orange: "from-orange-500 to-orange-600",
		indigo: "from-indigo-500 to-indigo-600",
		gray: "from-gray-500 to-gray-600",
		red: "from-red-500 to-red-600",
	};

	return (
		<Layout showBackButton={false}>
			<div className="mx-auto max-w-7xl">
				{/* 头部介绍 */}
				<div className="mb-12 text-center">
					<h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-5xl text-transparent">
						React Scenario Lab
					</h1>
					<p className="mx-auto mb-4 max-w-2xl text-gray-600 text-lg">
						欢迎使用 React Scenario Lab！这是一个基于 Next.js 15 和 React 19 的组件实验室， 探索现代 React
						开发的各种场景和最佳实践。
					</p>
					<div className="flex justify-center gap-4 text-gray-500 text-sm">
						<span>⚛️ React 19</span>
						<span>•</span>
						<span>🚀 Next.js 15</span>
						<span>•</span>
						<span>🎨 Tailwind CSS 4</span>
					</div>
				</div>

				{/* 分类展示 */}
				<div className="space-y-12">
					{categories.map((category) => {
						// 获取该分类下的路由组
						const categoryRouteGroups = routeGroups.filter((group) => category.groups.includes(group.path));

						return (
							<div key={category.id} className="space-y-6">
								{/* 分类标题 */}
								<div className="flex items-center gap-4">
									<span className="text-5xl">{category.icon}</span>
									<div>
										<h2 className="mb-2 font-bold text-3xl text-gray-900">{category.title}</h2>
										<p className="text-gray-600">{category.description}</p>
									</div>
								</div>

								{/* 分类下的功能组 */}
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{categoryRouteGroups.map((group) => (
										<div key={group.path} className="overflow-hidden rounded-xl bg-white shadow-md">
											{/* 顶部装饰条 */}
											<div className={`h-2 bg-gradient-to-r ${colorClasses[category.color]}`} />

											<div className="p-6">
												<h3 className="mb-4 font-semibold text-gray-900 text-xl">{group.title}</h3>

												{/* 功能列表 */}
												<ul className="space-y-2">
													{group.children.map((child) => {
														const href = child.path ? `/${group.path}/${child.path}` : `/${group.path}`;
														return (
															<li key={child.path}>
																<Link
																	href={href}
																	className="flex items-center text-blue-600 text-gray-600 hover:text-blue-800 hover:underline"
																>
																	{child.title}
																</Link>
															</li>
														);
													})}
												</ul>
											</div>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>

				{/* 底部提示 */}
				<div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center">
					<h3 className="mb-4 font-bold text-2xl text-gray-900">开始探索</h3>
					<p className="mb-6 text-gray-600">点击左侧菜单或上方功能卡片，开始探索 React 19 和 Next.js 15 的强大功能。</p>
					<div className="flex justify-center gap-6 text-gray-500 text-sm">
						<div className="flex items-center gap-2">
							<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
								/>
							</svg>
							<span>快捷键: Ctrl/Cmd + B</span>
						</div>
						<div className="flex items-center gap-2">
							<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>点击菜单后侧边栏自动隐藏</span>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
