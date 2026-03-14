"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrowserMarketChart from "@/components/dashboard-charts/BrowserMarketChart";
import CoreTechAreaChart from "@/components/dashboard-charts/CoreTechAreaChart";
import DeveloperSkillsChart from "@/components/dashboard-charts/DeveloperSkillsChart";
import FrameworkPopularityChart from "@/components/dashboard-charts/FrameworkPopularityChart";
import FrontendToolsChart from "@/components/dashboard-charts/FrontendToolsChart";
import LanguageTrendChart from "@/components/dashboard-charts/LanguageTrendChart";
import PerformanceGaugeChart from "@/components/dashboard-charts/PerformanceGaugeChart";
import SalaryTrendChart from "@/components/dashboard-charts/SalaryTrendChart";
import TechStackRadarChart from "@/components/dashboard-charts/TechStackRadarChart";
import TechTimelineChart from "@/components/dashboard-charts/TechTimelineChart";
import Layout from "@/components/Layout";

export default function FrontendPlanDashboardPage() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const chartContainerRef = useRef<HTMLDivElement>(null);

	// 检测移动设备
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// 更新时间
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// 全屏切换
	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			chartContainerRef.current?.requestFullscreen();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}
	};

	// 监听全屏变化
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	// 移动端提示 - 优化
	if (isMobile) {
		return (
			<Layout showPadding={false} mobileHeaderMode="never">
				<div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 overflow-hidden">
					{/* 装饰背景 */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
						<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
					</div>

					<div className="relative text-center">
						<div className="mb-6 inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 shadow-2xl shadow-purple-500/20">
							<span className="text-6xl">📊</span>
						</div>
						<h1 className="mb-4 font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">数据大屏</h1>
						<p className="mb-8 max-w-md text-slate-300 text-lg leading-relaxed">
							数据大屏需要大屏幕才能获得最佳体验。建议在桌面端或平板设备上访问。
						</p>
						<div className="space-y-4">
							<Link
								href="/thoughts/mobile"
								className="group block rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 font-bold text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105"
							>
								<span className="flex items-center justify-center gap-2">
									切换到移动端版
									<span className="transition-transform group-hover:translate-x-1">→</span>
								</span>
							</Link>
							<Link href="/thoughts" className="block rounded-2xl bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-slate-700/70">
								返回首页
							</Link>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout showPadding={false} mobileHeaderMode="never">
			<div
				ref={chartContainerRef}
				className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900"
			>
				{/* 装饰背景 */}
				<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
					<div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-500" />
				</div>

				{/* 顶部标题栏 - 优化 */}
				<header className="sticky top-0 z-50 border-cyan-500/20 border-b bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-xl shadow-lg shadow-purple-500/10">
					<div className="container mx-auto px-4 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Link
									href="/thoughts"
									className="group rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20"
								>
									<svg className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
									</svg>
								</Link>
								<div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400/30">
									<svg className="h-9 w-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
								<div>
									<h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-bold text-2xl text-transparent md:text-3xl drop-shadow-lg">
										前端发展史数据大屏
									</h1>
									<p className="text-cyan-300/60 text-xs md:text-sm font-medium">Frontend History Dashboard</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								{/* 时间显示 - 优化 */}
								<div className="text-right">
									<div className="font-mono bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-xl md:text-2xl font-bold text-transparent">
										{currentTime.toLocaleTimeString("zh-CN", { hour12: false })}
									</div>
									<div className="text-cyan-300/50 text-xs font-medium">{currentTime.toLocaleDateString("zh-CN")}</div>
								</div>

								{/* 全屏切换按钮 - 优化 */}
								<button
									onClick={toggleFullscreen}
									className="group rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-2.5 text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20"
									title={isFullscreen ? "退出全屏" : "全屏显示"}
								>
									{isFullscreen ? (
										<svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									) : (
										<svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>
				</header>

				{/* 数据卡片统计 - 优化 */}
				<section className="px-4 py-6">
					<div className="container mx-auto">
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{[
								{ label: "技术时代", value: "6", color: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/30", icon: "🌐" },
								{ label: "核心技术", value: "3", color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/30", icon: "⚛️" },
								{ label: "关键事件", value: "100+", color: "from-orange-500 to-red-500", shadow: "shadow-orange-500/30", icon: "📜" },
								{ label: "技术框架", value: "50+", color: "from-green-500 to-teal-500", shadow: "shadow-green-500/30", icon: "🔧" },
							].map((stat, index) => (
								<div
									key={index}
									className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
									style={{ boxShadow: `0 0 40px -10px ${stat.shadow.split('/')[0].replace('shadow-', '')}` }}
								>
									{/* 装饰光效 */}
									<div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
										style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
									/>
									<div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

									<div className="relative flex items-center justify-between">
										<div>
											<div
												className={`bg-gradient-to-r font-bold text-4xl md:text-5xl ${stat.color} mb-2 bg-clip-text text-transparent drop-shadow-lg`}
											>
												{stat.value}
											</div>
											<div className="text-slate-400 text-sm font-medium">{stat.label}</div>
										</div>
										<div className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{stat.icon}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* 图表网格 - 第一行 */}
				<section className="px-4 pb-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							{/* 浏览器市场份额时间线 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-cyan-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-400/50"></span>
									浏览器市场份额演变
								</h3>
								<BrowserMarketChart />
							</div>

							{/* 前端框架流行度 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-400/50"></span>
									前端框架流行度趋势
								</h3>
								<FrameworkPopularityChart />
							</div>

							{/* 前端技术栈雷达图 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/50"></span>
									前端技术栈分布
								</h3>
								<TechStackRadarChart />
							</div>

							{/* 核心技术使用率变化 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-orange-400 to-red-400 shadow-lg shadow-orange-400/50"></span>
									核心技术使用率变化
								</h3>
								<CoreTechAreaChart />
							</div>
						</div>
					</div>
				</section>

				{/* 图表网格 - 第二行 */}
				<section className="px-4 pb-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
							{/* 开发者技能分布 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-pink-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-pink-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg shadow-pink-400/50"></span>
									开发者技能分布
								</h3>
								<DeveloperSkillsChart />
							</div>

							{/* 前端工具链 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 lg:col-span-2">
								<div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-teal-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg shadow-teal-400/50"></span>
									前端工具链分类
								</h3>
								<FrontendToolsChart />
							</div>
						</div>
					</div>
				</section>

				{/* 图表网格 - 第三行 */}
				<section className="px-4 pb-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							{/* 技术时代时间轴 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-yellow-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 shadow-lg shadow-yellow-400/50"></span>
									技术发展时间轴
								</h3>
								<TechTimelineChart />
							</div>

							{/* 性能指标仪表盘 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-red-400 to-rose-400 shadow-lg shadow-red-400/50"></span>
									性能指标仪表盘
								</h3>
								<PerformanceGaugeChart />
							</div>
						</div>
					</div>
				</section>

				{/* 图表网格 - 第四行 */}
				<section className="px-4 pb-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							{/* 编程语言趋势 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-indigo-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 shadow-lg shadow-indigo-400/50"></span>
									编程语言流行度趋势
								</h3>
								<LanguageTrendChart />
							</div>

							{/* 前端薪资变化 - 优化 */}
							<div className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
								<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-500" />
								<h3 className="relative mb-4 flex items-center gap-3 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
									<span className="flex h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-green-400 shadow-lg shadow-emerald-400/50"></span>
									前端工程师薪资趋势
								</h3>
								<SalaryTrendChart />
							</div>
						</div>
					</div>
				</section>

				{/* 底部信息 - 优化 */}
				<footer className="relative border-slate-700/30 border-t bg-slate-900/50 backdrop-blur-xl px-4 py-6">
					<div className="container mx-auto text-center">
						<div className="mb-3 flex items-center justify-center gap-2">
							<div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-600"></div>
							<span className="text-slate-500 text-xs">✨</span>
							<div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-600"></div>
						</div>
						<p className="mb-2 text-slate-400 text-sm font-medium">数据来源: 前端发展史项目 | 图表: ECharts | React Scenario Lab</p>
						<p className="text-slate-500 text-xs">数据更新于: 2024年 | 仅供参考</p>
					</div>
				</footer>
			</div>
		</Layout>
	);
}
