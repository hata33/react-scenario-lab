"use client";

import Link from "next/link";
import { PlatformComparisonBlock } from "@/components/frontend-plan/content-blocks/PlatformComparisonBlock";
import Layout from "@/components/Layout";

export default function ModernFrontendPage() {
	const currentYear = new Date().getFullYear();
	return (
		<Layout showBackButton={false}>
			{/* Hero 区块 */}
			<section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-24 text-white">
				{/* 装饰背景 */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-400/20 blur-3xl" />
					<div className="absolute top-1/2 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-400/20 blur-3xl delay-1000" />
					<div className="absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full bg-pink-400/20 blur-3xl delay-500" />
				</div>

				<div className="container relative mx-auto px-4">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
							<span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
							<span className="font-medium text-sm">{currentYear} 前端标准</span>
						</div>
						<h1 className="mb-6 font-bold text-5xl drop-shadow-2xl md:text-6xl lg:text-7xl">现代前端工程化实践</h1>
						<p className="mx-auto max-w-3xl text-blue-100 text-xl leading-relaxed md:text-2xl">
							从用户界面到全栈能力，探索现代前端工程师的核心技能与职责范围
						</p>

						{/* 核心指标 */}
						<div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
							{[
								{ label: "核心技能", value: "15+", color: "from-blue-400 to-cyan-400" },
								{ label: "工具链", value: "20+", color: "from-purple-400 to-pink-400" },
								{ label: "框架选择", value: "10+", color: "from-green-400 to-emerald-400" },
								{ label: "最佳实践", value: "100%", color: "from-orange-400 to-red-400" },
							].map((stat) => (
								<div key={stat.label} className="relative">
									<div
										className={`bg-gradient-to-r font-bold text-4xl md:text-5xl ${stat.color} mb-2 bg-clip-text text-transparent`}
									>
										{stat.value}
									</div>
									<div className="text-blue-200 text-sm">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* 快速导航 */}
			<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute top-10 right-10 h-64 w-64 animate-pulse rounded-full bg-blue-400/10 blur-3xl" />
					<div className="absolute bottom-10 left-10 h-64 w-64 animate-pulse rounded-full bg-purple-400/10 blur-3xl delay-1000" />
				</div>

				<div className="container relative mx-auto px-4">
					<div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
						<Link
							href="/thoughts"
							className="group hover:-translate-y-1 block"
						>
							<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-purple-50/30 p-8 shadow-xl ring-1 ring-purple-200/50 transition-all duration-300 hover:shadow-2xl dark:from-slate-800 dark:to-purple-950/20 dark:ring-purple-800/50">
								<div className="relative">
									<div className="mb-4 flex items-center gap-4">
										<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-3xl text-white shadow-lg ring-2 ring-purple-200 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:ring-purple-700">
											📚
										</div>
										<div>
											<h3 className="mb-1 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text font-bold text-transparent text-xl dark:from-slate-100 dark:to-slate-300">
												前端发展史
											</h3>
											<p className="text-slate-600 text-sm dark:text-slate-400">了解技术演进历程</p>
										</div>
									</div>
									<p className="text-slate-700 text-sm dark:text-slate-300">从 Web 诞生到 AI 时代的完整发展历史</p>
									<div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-bold text-transparent transition-all group-hover:gap-4 dark:from-purple-400 dark:to-blue-400">
										查看历史
										<span className="transition-transform group-hover:translate-x-2">→</span>
									</div>
								</div>
							</div>
						</Link>

						<Link
							href="/frontend/tech-stack"
							className="group hover:-translate-y-1 block"
						>
							<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-xl ring-1 ring-blue-200/50 transition-all duration-300 hover:shadow-2xl dark:from-slate-800 dark:to-blue-950/20 dark:ring-blue-800/50">
								<div className="relative">
									<div className="mb-4 flex items-center gap-4">
										<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl text-white shadow-lg ring-2 ring-blue-200 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:ring-blue-700">
											🛠️
										</div>
										<div>
											<h3 className="mb-1 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text font-bold text-transparent text-xl dark:from-slate-100 dark:to-slate-300">
												技术栈演进
											</h3>
											<p className="text-slate-600 text-sm dark:text-slate-400">现代技术全景</p>
										</div>
									</div>
									<p className="text-slate-700 text-sm dark:text-slate-300">深入了解现代前端技术栈的组成和选择</p>
									<div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold text-transparent transition-all group-hover:gap-4 dark:from-blue-400 dark:to-cyan-400">
										查看技术栈
										<span className="transition-transform group-hover:translate-x-2">→</span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* 不同载体对比 - 置顶 */}
			<PlatformComparisonBlock />

			{/* 数据大屏入口 */}
			<section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl">
						<Link
							href="/thoughts/dashboard"
							className="group block border border-slate-200 bg-white p-8 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
						>
							<div className="flex items-center gap-6">
								<div className="flex h-16 w-16 items-center justify-center border border-slate-200 bg-slate-50 text-3xl dark:border-slate-700 dark:bg-slate-900">
									📊
								</div>
								<div className="flex-1">
									<h3 className="mb-1 font-semibold text-xl text-slate-900 dark:text-slate-100">前端发展史数据大屏</h3>
									<p className="text-slate-600 dark:text-slate-400">
										10个 ECharts 图表，展示浏览器市场份额、框架流行度、技能要求、薪资趋势等数据可视化内容
									</p>
									<div className="mt-3 flex items-center gap-4 text-sm">
										<span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
											<span>•</span>
											浏览器市场份额
										</span>
										<span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
											<span>•</span>
											框架流行度
										</span>
										<span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
											<span>•</span>
											技能雷达图
										</span>
										<span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
											<span>•</span>
											薪资趋势
										</span>
									</div>
								</div>
								<span className="text-slate-400 transition-transform group-hover:translate-x-1">→</span>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* 什么是现代前端 */}
			<section className="bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl">
						<div className="mb-12 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/30">
								<span className="h-2 w-2 rounded-full bg-blue-500"></span>
								<span className="font-semibold text-blue-700 text-sm dark:text-blue-300">核心概念</span>
							</div>
							<h2 className="mb-4 font-bold text-4xl text-slate-900 dark:text-slate-100">什么是现代前端？</h2>
							<p className="text-lg text-slate-600 dark:text-slate-400">
								现代前端开发已经远远超出了"写网页"的范畴，成为了一个涵盖用户界面、交互逻辑、数据处理、工程化等多个领域的综合技术体系
							</p>
						</div>

						{/* 三大核心 */}
						<div className="mb-12 grid gap-6 md:grid-cols-3">
							<div className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-blue-500/10" />
								<div className="relative">
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-3xl dark:from-blue-900 dark:to-blue-800">
										🎨
									</div>
									<h3 className="mb-2 font-bold text-blue-600 text-xl dark:text-blue-400">用户界面</h3>
									<p className="text-slate-600 dark:text-slate-400">构建美观、响应式的用户界面，提供最佳视觉体验</p>
								</div>
							</div>

							<div className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-purple-500/5 group-hover:to-purple-500/10" />
								<div className="relative">
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-3xl dark:from-purple-900 dark:to-purple-800">
										⚡
									</div>
									<h3 className="mb-2 font-bold text-purple-600 text-xl dark:text-purple-400">交互逻辑</h3>
									<p className="text-slate-600 dark:text-slate-400">实现复杂的用户交互，处理状态管理和数据流</p>
								</div>
							</div>

							<div className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800">
								<div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 transition-all duration-500 group-hover:from-green-500/5 group-hover:to-green-500/10" />
								<div className="relative">
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-green-200 text-3xl dark:from-green-900 dark:to-green-800">
										🚀
									</div>
									<h3 className="mb-2 font-bold text-green-600 text-xl dark:text-green-400">工程化</h3>
									<p className="text-slate-600 dark:text-slate-400">使用现代工具链和构建系统，提升开发效率和代码质量</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 职责与范围 */}
			<section className="bg-white py-20 dark:bg-slate-800">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-4xl text-slate-900 dark:text-slate-100">职责与范围</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400">
							现代前端工程师的职责范围已经大幅扩展，不再局限于页面开发
						</p>
					</div>

					<div className="grid gap-8 lg:grid-cols-2">
						{/* 核心职责 */}
						<div className="space-y-4">
							<h3 className="flex items-center gap-3 font-bold text-2xl text-slate-900 dark:text-slate-100">
								<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
									📋
								</span>
								核心职责
							</h3>
							{[
								{ title: "用户界面开发", desc: "使用 HTML/CSS/JavaScript 构建美观、易用的用户界面", icon: "🎨" },
								{ title: "交互逻辑实现", desc: "处理用户操作，管理应用状态，实现动态功能", icon: "⚙️" },
								{ title: "性能优化", desc: "优化加载速度、渲染性能，提供流畅用户体验", icon: "⚡" },
								{ title: "跨端适配", desc: "确保应用在不同设备和浏览器上正常运行", icon: "📱" },
								{ title: "接口对接", desc: "与后端协作，对接 API，处理数据请求", icon: "🔌" },
								{ title: "代码质量", desc: "编写可维护、可测试、可扩展的代码", icon: "✨" },
							].map((item) => (
								<div key={item.title} className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
									<span className="text-2xl">{item.icon}</span>
									<div>
										<h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">{item.title}</h4>
										<p className="text-slate-600 text-sm dark:text-slate-400">{item.desc}</p>
									</div>
								</div>
							))}
						</div>

						{/* 技能范围 */}
						<div className="space-y-4">
							<h3 className="flex items-center gap-3 font-bold text-2xl text-slate-900 dark:text-slate-100">
								<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
									🎯
								</span>
								技能范围
							</h3>
							{[
								{ title: "核心框架", desc: "React、Vue、Angular 等主流框架", level: "必备" },
								{ title: "TypeScript", desc: "类型安全，提升代码质量", level: "必备" },
								{ title: "构建工具", desc: "Webpack、Vite、TurboPack 等构建系统", level: "必备" },
								{ title: "状态管理", desc: "Redux、Zustand、Jotai 等状态方案", level: "重要" },
								{ title: "CSS 方案", desc: "Tailwind CSS、CSS-in-JS、Styled Components", level: "重要" },
								{ title: "测试能力", desc: "单元测试、集成测试、E2E 测试", level: "加分" },
								{ title: "Node.js", desc: "服务端渲染、API 开发", level: "加分" },
								{ title: "性能监控", desc: "Lighthouse、Sentry、Analytics", level: "加分" },
							].map((item) => (
								<div
									key={item.title}
									className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700"
								>
									<div className="flex items-center gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-bold text-slate-600 text-sm dark:bg-slate-600 dark:text-slate-300">
											{item.title[0]}
										</div>
										<div>
											<h4 className="font-semibold text-slate-900 text-sm dark:text-slate-100">{item.title}</h4>
											<p className="text-slate-500 text-xs dark:text-slate-400">{item.desc}</p>
										</div>
									</div>
									<span
										className={`rounded-full px-3 py-1 font-semibold text-xs ${item.level === "必备"
											? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
											: item.level === "重要"
												? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
												: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
											}`}
									>
										{item.level}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* 工程化实践 */}
			<section className="bg-gradient-to-b from-slate-50 to-blue-50 py-20 dark:from-slate-900 dark:to-slate-800">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-4xl text-slate-900 dark:text-slate-100">工程化实践</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400">现代前端开发离不开完善的工程化体系</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: "版本控制",
								icon: "📂",
								items: ["Git 工作流", "分支管理", "Code Review", "CI/CD 集成"],
								color: "from-orange-500 to-red-500",
							},
							{
								title: "代码规范",
								icon: "📏",
								items: ["ESLint/Prettier", "编码规范", "Commit 规范", "文档规范"],
								color: "from-blue-500 to-cyan-500",
							},
							{
								title: "构建优化",
								icon: "⚡",
								items: ["代码分割", "懒加载", "Tree Shaking", "压缩优化"],
								color: "from-green-500 to-emerald-500",
							},
							{
								title: "测试保障",
								icon: "🧪",
								items: ["单元测试", "集成测试", "E2E 测试", "视觉回归测试"],
								color: "from-purple-500 to-pink-500",
							},
							{
								title: "性能监控",
								icon: "📊",
								items: ["Core Web Vitals", "错误监控", "用户行为分析", "A/B 测试"],
								color: "from-yellow-500 to-orange-500",
							},
							{
								title: "安全防护",
								icon: "🔒",
								items: ["XSS 防护", "CSRF 防护", "内容安全策略", "依赖安全"],
								color: "from-red-500 to-pink-500",
							},
						].map((practice) => (
							<div
								key={practice.title}
								className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800"
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${practice.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
								/>
								<div className="relative">
									<div
										className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${practice.color} text-2xl text-white shadow-lg`}
									>
										{practice.icon}
									</div>
									<h3 className="mb-4 font-bold text-slate-900 text-xl dark:text-slate-100">{practice.title}</h3>
									<ul className="space-y-2">
										{practice.items.map((item) => (
											<li key={item} className="flex items-center gap-2 text-slate-600 text-sm dark:text-slate-400">
												<span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 底部 CTA */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className="mb-6 font-bold text-3xl text-slate-900 dark:text-slate-100">开始你的前端之旅</h2>
						<p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
							探索左侧菜单中的各个功能模块，学习现代前端开发的最佳实践
						</p>
						<div className="flex justify-center gap-4">
							<Link
								href="/react-19/actions"
								className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
							>
								学习 React 19
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</Link>
							<Link
								href="/nextjs-features/routing"
								className="group inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-8 py-4 font-bold text-slate-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-slate-700 dark:text-slate-300"
							>
								探索 Next.js
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
