"use client";

import Link from "next/link";
import Layout from "@/components/Layout";

export default function TechStackPage() {
	return (
		<Layout>
			{/* Hero 区块 */}
			<section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 py-24 text-white">
				{/* 装饰背景 */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-400/20 blur-3xl" />
					<div className="absolute top-1/2 right-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-400/20 blur-3xl delay-1000" />
					<div className="absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-400/20 blur-3xl delay-500" />
				</div>

				<div className="container relative mx-auto px-4">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
							<span className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></span>
							<span className="font-medium text-sm">技术演进</span>
						</div>
						<h1 className="mb-6 font-bold text-5xl drop-shadow-2xl md:text-6xl lg:text-7xl">前端技术栈演进</h1>
						<p className="mx-auto max-w-3xl text-blue-100 text-xl leading-relaxed md:text-2xl">
							从 Web 诞生到 AI 时代，了解前端技术栈的演进历程，更好地理解现代前端的技术选择
						</p>
					</div>
				</div>
			</section>

			{/* 技术时代卡片 */}
			<section className="bg-slate-50 py-20 dark:bg-slate-900">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-purple-900/30">
							<span className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></span>
							<span className="font-semibold text-purple-700 text-sm dark:text-purple-300">技术演进</span>
						</div>
						<h2 className="mb-4 font-bold text-4xl text-slate-900 dark:text-slate-100">六个技术时代</h2>
						<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
							回顾前端技术的发展历程，每个时代都有其标志性的技术和突破
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								name: "基础三件套",
								period: "1990 - 2005",
								icon: "🌐",
								color: "orange",
								techs: ["HTML", "CSS", "JavaScript"],
								desc: "Web 的基础，至今仍然是前端开发的核心",
								details: [
									"1990: Tim Berners-Lee 发明 HTML",
									"1996: CSS 规范发布",
									"1995: JavaScript 在 10 天内诞生",
									"静态页面为主，交互有限",
								],
							},
							{
								name: "jQuery 时代",
								period: "2006 - 2013",
								icon: "💫",
								color: "blue",
								techs: ["jQuery", "Ajax", "插件生态"],
								desc: "简化 DOM 操作，Ajax 带来动态交互革命",
								details: [
									"2006: jQuery 发布，简化 DOM 操作",
									"2005: Ajax 术语诞生，异步请求兴起",
									"丰富的插件生态系统",
									"动态网页成为主流",
								],
							},
							{
								name: "框架兴起",
								period: "2013 - 2018",
								icon: "⚛️",
								color: "cyan",
								techs: ["Angular", "React", "Vue"],
								desc: "组件化开发，虚拟 DOM，单向数据流",
								details: [
									"2013: React 开源，虚拟 DOM 革命",
									"2010: AngularJS 发布",
									"2014: Vue.js 诞生",
									"MVVM 模式流行",
								],
							},
							{
								name: "工程化时代",
								period: "2015 - 2020",
								icon: "🔧",
								color: "green",
								techs: ["Webpack", "Babel", "npm", "ES6+"],
								desc: "构建工具、模块化、TypeScript 普及",
								details: [
									"2015: ES6/ES2015 发布",
									"Webpack 成为主流构建工具",
									"TypeScript 类型系统普及",
									"模块化开发成为标准",
								],
							},
							{
								name: "全栈时代",
								period: "2018 - 2023",
								icon: "🌟",
								color: "purple",
								techs: ["Node.js", "SSR", "GraphQL", "BFF"],
								desc: "JavaScript 全栈，服务端渲染，前后端分离",
								details: [
									"Next.js、Nuxt.js 等 SSR 框架兴起",
									"GraphQL 数据查询语言",
									"BFF 架构模式",
									"前端向全栈方向发展",
								],
							},
							{
								name: "AI 时代",
								period: "2023 - 至今",
								icon: "🤖",
								color: "pink",
								techs: ["AI 辅助", "Vercel AI SDK", "智能代码生成"],
								desc: "AI 工具链，智能开发助手，代码自动生成",
								details: [
									"ChatGPT、Claude 等 AI 助手",
									"GitHub Copilot 代码补全",
									"Vercel AI SDK 集成 AI 能力",
									"AI 辅助开发成为常态",
								],
							},
						].map((era, index) => (
							<div
								key={era.name}
								className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800"
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br from-${era.color}-500/0 to-${era.color}-500/0 group-hover:from-${era.color}-500/5 group-hover:to-${era.color}-500/10 transition-all duration-500`}
								/>
								<div className="relative">
									<div className="mb-4 flex items-center justify-between">
										<div
											className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-${era.color}-100 to-${era.color}-200 text-3xl dark:from-${era.color}-900 dark:to-${era.color}-800`}
										>
											{era.icon}
										</div>
										<span className="font-mono text-slate-500 text-xs dark:text-slate-400">{era.period}</span>
									</div>
									<h3 className="mb-2 font-bold text-slate-900 text-xl dark:text-slate-100">{era.name}</h3>
									<p className="mb-4 text-slate-600 text-sm dark:text-slate-400">{era.desc}</p>
									<div className="mb-4 flex flex-wrap gap-2">
										{era.techs.map((tech) => (
											<span
												key={tech}
												className={`rounded-full px-3 py-1 font-medium text-xs bg-${era.color}-50 text-${era.color}-700 dark:bg-${era.color}-900/30 dark:text-${era.color}-400`}
											>
												{tech}
											</span>
										))}
									</div>
									<ul className="space-y-1.5">
										{era.details.map((detail, i) => (
											<li key={i} className="flex items-start gap-2 text-slate-600 text-xs dark:text-slate-400">
												<span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-current" />
												{detail}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 关键技术节点 */}
			<section className="bg-white py-20 dark:bg-slate-800">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-4xl text-slate-900 dark:text-slate-100">关键技术节点</h2>
						<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
							回顾那些改变前端发展历程的重要技术里程碑
						</p>
					</div>

					<div className="mx-auto max-w-4xl">
						<div className="space-y-6">
							{[
								{ year: "1990", event: "HTML 诞生", impact: "Web 世界的起点" },
								{ year: "1995", event: "JavaScript 诞生", impact: "网页开始有了交互能力" },
								{ year: "1998", event: "CSS2 发布", impact: "样式与结构分离" },
								{ year: "2005", event: "Ajax 诞生", impact: "无刷新异步交互革命" },
								{ year: "2006", event: "jQuery 发布", impact: "简化 DOM 操作" },
								{ year: "2008", event: "V8 引擎", impact: "JavaScript 性能飞跃" },
								{ year: "2013", event: "React 开源", impact: "组件化开发范式" },
								{ year: "2015", event: "ES6 发布", impact: "JavaScript 现代化" },
								{ year: "2016", event: "Next.js 诞生", impact: "React 服务端渲染" },
								{ year: "2020", event: "Tailwind CSS", impact: "原子化 CSS 革命" },
								{ year: "2023", event: "AI 编程助手", impact: "AI 辅助开发时代" },
							].map((milestone) => (
								<div
									key={milestone.year}
									className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-800"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
									<div className="relative flex items-center gap-6">
										<div className="flex shrink-0 flex-col items-center">
											<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
												<span className="font-bold text-lg">{milestone.year}</span>
											</div>
										</div>
										<div className="flex-1">
											<h3 className="mb-1 font-bold text-slate-900 text-xl dark:text-slate-100">{milestone.event}</h3>
											<p className="text-slate-600 dark:text-slate-400">{milestone.impact}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* 底部 CTA */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className="mb-6 font-bold text-3xl text-slate-900 dark:text-slate-100">继续探索</h2>
						<p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
							了解现代前端开发的实践和最佳应用
						</p>
						<div className="flex justify-center gap-4">
							<Link
								href="/frontend/modern"
								className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
							>
								现代前端实践
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</Link>
							<Link
								href="/react-19/actions"
								className="group inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-8 py-4 font-bold text-slate-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-slate-700 dark:text-slate-300"
							>
								学习 React 19
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
