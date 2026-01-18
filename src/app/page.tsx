"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import {
	AnimatedCounter,
	AnimatedGradientText,
	Card3DTilt,
	FloatingElement,
	GradientBorder,
	HolographicEffect,
	MagneticButton,
	NeonGlow,
	RevealOnScroll,
	SpotlightCard,
	TextShimmer,
	TypingEffect,
	WaveText,
} from "@/components/ReactBits";
import { routeGroups } from "@/routeDefs";

// 注册 GSAP 插件
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

// 定义分类
const categories = [
	{
		id: "framework",
		title: "框架核心",
		icon: "⚛️",
		description: "React 19 和 Next.js 15 的核心特性",
		color: "blue",
		groups: ["react-19", "nextjs-features"],
		gradient: "from-blue-500 via-cyan-500 to-blue-600",
	},
	{
		id: "ui",
		title: "UI 组件",
		icon: "🎨",
		description: "编辑器、图表、特效等可视化组件",
		color: "purple",
		groups: ["monaco-editor", "mermaid", "charts", "special-effects", "rich-text", "markdown"],
		gradient: "from-purple-500 via-pink-500 to-purple-600",
	},
	{
		id: "data",
		title: "表单与数据",
		icon: "📊",
		description: "表单处理、数据展示和文件操作",
		color: "green",
		groups: ["forms", "data", "files"],
		gradient: "from-green-500 via-emerald-500 to-green-600",
	},
	{
		id: "interaction",
		title: "交互功能",
		icon: "🎯",
		description: "动画、地图、实时通信等交互功能",
		color: "orange",
		groups: ["animation", "map", "chat", "mobile"],
		gradient: "from-orange-500 via-amber-500 to-orange-600",
	},
	{
		id: "integration",
		title: "第三方集成",
		icon: "🔌",
		description: "外部服务和工具的集成",
		color: "indigo",
		groups: ["supabase", "sentry", "bpmn", "d3js", "gsap"],
		gradient: "from-indigo-500 via-violet-500 to-indigo-600",
	},
	{
		id: "tools",
		title: "开发工具",
		icon: "🛠️",
		description: "认证、性能、测试等开发工具",
		color: "gray",
		groups: ["auth", "performance", "other"],
		gradient: "from-gray-500 via-slate-500 to-gray-600",
	},
	{
		id: "advanced",
		title: "高级功能",
		icon: "🚀",
		description: "AI 集成和其他高级特性",
		color: "red",
		groups: ["ai"],
		gradient: "from-red-500 via-rose-500 to-red-600",
	},
];

// 统计数据
const stats = [
	{ label: "功能模块", value: 50, icon: "📦" },
	{ label: "技术分类", value: 7, icon: "🗂️" },
	{ label: "React 19", value: 19, icon: "⚛️" },
	{ label: "Next.js 15", value: 15, icon: "🚀" },
];

// 打字机效果文字
const typingWords = ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "GSAP 动画", "现代前端"];

export default function HomePage() {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	// GSAP 动画
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero 区域动画
			gsap.from(titleRef.current, {
				y: 100,
				opacity: 0,
				duration: 1.2,
				ease: "power3.out",
			});

			gsap.from(subtitleRef.current, {
				y: 50,
				opacity: 0,
				duration: 1,
				delay: 0.3,
				ease: "power3.out",
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<Layout showBackButton={false} showPadding={false}>
			<div ref={heroRef} className="relative min-h-screen bg-slate-950">
				{/* 主内容 */}
				<div className="relative z-10">
					{/* Hero 区域 */}
					<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
						{/* 装饰性标签 */}
						<RevealOnScroll direction="down" delay={0.2}>
							<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80 backdrop-blur-md">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
								</span>
								<TypingEffect words={typingWords} className="text-white/90" />
							</div>
						</RevealOnScroll>

						{/* 标题 - 渐变文字 */}
						<FloatingElement distance={20} duration={5}>
							<h1 ref={titleRef} className="mb-6 max-w-5xl font-bold text-5xl md:text-7xl lg:text-8xl">
								<WaveText text="React Scenario Lab" className="text-white" />
							</h1>
						</FloatingElement>

						{/* 渐变副标题 */}
						<p ref={subtitleRef} className="mb-12 max-w-2xl text-lg md:text-xl">
							<AnimatedGradientText
								colors={["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]}
								className="from-blue-400 via-purple-400 to-pink-400"
							>
								基于 Next.js 15 和 React 19 的组件实验室，探索现代前端开发的各种场景和最佳实践。
								从基础组件到高级特性，全方位展示 React 生态系统的强大功能。
							</AnimatedGradientText>
						</p>

						{/* 技术栈徽章 */}
						<RevealOnScroll direction="up" delay={0.5}>
							<div className="mb-8 flex flex-wrap justify-center gap-4 text-sm">
								{["⚛️ React 19", "🚀 Next.js 15", "🎨 Tailwind CSS 4", "⚡ GSAP 动画", "🛠️ TypeScript"].map((badge) => (
									<HolographicEffect key={badge} className="rounded-full">
										<NeonGlow color="#3b82f6" intensity={15}>
											<span className="inline-block cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10">
												{badge}
											</span>
										</NeonGlow>
									</HolographicEffect>
								))}
							</div>
						</RevealOnScroll>

						{/* 磁性按钮 */}
						<MagneticButton strength={0.6} className="group">
							<NeonGlow color="#8b5cf6" intensity={25}>
								<span className="inline-block transform rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-10 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
									开始探索
									<span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
								</span>
							</NeonGlow>
						</MagneticButton>
					</div>

					{/* 统计数据 */}
					<RevealOnScroll direction="up">
						<div className="mx-auto mb-20 max-w-6xl px-4">
							<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
								{stats.map((stat, index) => (
									<HolographicEffect key={index} className="group">
										<div className="transform rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10">
											<div className="mb-3 text-5xl">{stat.icon}</div>
											<div className="mb-2 font-bold text-4xl text-white">
												<AnimatedCounter end={stat.value} suffix={stat.value === 50 ? "+" : ""} />
											</div>
											<div className="text-gray-400 text-sm">{stat.label}</div>
										</div>
									</HolographicEffect>
								))}
							</div>
						</div>
					</RevealOnScroll>

					{/* 分类展示 */}
					<div className="space-y-20 px-4 pb-20">
						{categories.map((category) => {
							const categoryRouteGroups = routeGroups.filter((group) => category.groups.includes(group.path));

							if (categoryRouteGroups.length === 0) return null;

							return (
								<RevealOnScroll key={category.id} direction="up">
									<div className="mx-auto max-w-7xl">
										{/* 分类标题 */}
										<div className="mb-10 flex items-center gap-6">
											<FloatingElement distance={15} duration={4}>
												<HolographicEffect>
													<div
														className={`rounded-3xl bg-gradient-to-br ${category.gradient} transform p-6 shadow-2xl transition-transform duration-300 hover:scale-110`}
													>
														<span className="text-6xl">{category.icon}</span>
													</div>
												</HolographicEffect>
											</FloatingElement>
											<div>
												<h2 className="mb-3 font-bold text-4xl text-white">
													<TextShimmer speed={2}>{category.title}</TextShimmer>
												</h2>
												<p className="text-gray-400 text-lg">{category.description}</p>
											</div>
										</div>

										{/* 功能卡片网格 */}
										<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
											{categoryRouteGroups.map((group) => (
												<Card3DTilt key={group.path} maxTilt={8}>
													<SpotlightCard className="rounded-2xl">
														<HolographicEffect>
															<div className="group relative transform overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10">
																{/* 渐变装饰条 */}
																<div
																	className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${category.gradient}`}
																/>

																{/* 发光效果 */}
																<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

																<div className="relative p-8">
																	<h3 className="mb-6 font-bold text-2xl text-white">{group.title}</h3>

																	{/* 功能列表 */}
																	<ul className="space-y-3">
																		{group.children.map((child) => {
																			const href = child.path ? `/${group.path}/${child.path}` : `/${group.path}`;
																			return (
																				<li key={child.path}>
																					<Link
																						href={href}
																						className="group/link flex items-center text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-white"
																					>
																						<span className="mr-3 text-blue-400 text-xl transition-transform duration-300 group-hover/link:scale-125">
																							→
																						</span>
																						{child.title}
																					</Link>
																				</li>
																			);
																		})}
																	</ul>
																</div>
															</div>
														</HolographicEffect>
													</SpotlightCard>
												</Card3DTilt>
											))}
										</div>
									</div>
								</RevealOnScroll>
							);
						})}
					</div>

					{/* 底部 CTA */}
					<RevealOnScroll direction="up" delay={0.3}>
						<div className="mx-auto max-w-4xl px-4 pb-20 text-center">
							<GradientBorder colors={["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]} borderWidth={3}>
								<div className="rounded-3xl bg-slate-950 p-12">
									<h3 className="mb-6 font-bold text-4xl text-white">
										<WaveText text="开始探索" waveHeight={15} />
									</h3>
									<p className="mb-8 text-gray-400 text-lg">
										点击左侧菜单或上方功能卡片，开始探索 React 19 和 Next.js 15 的强大功能。 使用快捷键{" "}
										<kbd className="rounded bg-white/10 px-3 py-1.5 font-mono">Ctrl/Cmd + B</kbd> 切换侧边栏。
									</p>
									<div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
										<div className="flex items-center gap-3">
											<NeonGlow color="#3b82f6" intensity={10}>
												<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13 10V3L4 14h7v7l9-11h-7z"
													/>
												</svg>
											</NeonGlow>
											<span>高性能渲染</span>
										</div>
										<div className="flex items-center gap-3">
											<NeonGlow color="#8b5cf6" intensity={10}>
												<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
													/>
												</svg>
											</NeonGlow>
											<span>模块化设计</span>
										</div>
										<div className="flex items-center gap-3">
											<NeonGlow color="#ec4899" intensity={10}>
												<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
													/>
												</svg>
											</NeonGlow>
											<span>最佳实践</span>
										</div>
									</div>
								</div>
							</GradientBorder>
						</div>
					</RevealOnScroll>
				</div>
			</div>
		</Layout>
	);
}
