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

	// 移动端提示
	if (isMobile) {
		return (
			<Layout showPadding={false} mobileHeaderMode="never">
				<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
					<div className="text-center">
						<div className="mb-4 text-6xl">📊</div>
						<h1 className="mb-4 font-bold text-2xl text-white">数据大屏</h1>
						<p className="mb-6 max-w-md text-slate-300">
							数据大屏需要大屏幕才能获得最佳体验。建议在桌面端或平板设备上访问。
						</p>
						<div className="space-y-3">
							<Link
								href="/thoughts/mobile"
								className="block rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white"
							>
								切换到移动端版 →
							</Link>
							<Link href="/thoughts" className="block rounded-xl bg-slate-700 px-6 py-3 font-bold text-white">
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
				className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
			>
				{/* 顶部标题栏 */}
				<header className="sticky top-0 z-50 border-cyan-500/30 border-b bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-blue-900/80 backdrop-blur-md">
					<div className="container mx-auto px-4 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Link
									href="/thoughts"
									className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 transition-all hover:bg-cyan-500/40"
								>
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
									</svg>
								</Link>
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
									<svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
								<div>
									<h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold text-2xl text-transparent md:text-3xl">
										前端发展史数据大屏
									</h1>
									<p className="text-cyan-300/70 text-xs md:text-sm">Frontend History Dashboard</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								{/* 时间显示 */}
								<div className="text-right">
									<div className="font-mono text-cyan-400 text-xl md:text-2xl">
										{currentTime.toLocaleTimeString("zh-CN", { hour12: false })}
									</div>
									<div className="text-cyan-300/70 text-xs">{currentTime.toLocaleDateString("zh-CN")}</div>
								</div>

								{/* 全屏切换按钮 */}
								<button
									onClick={toggleFullscreen}
									className="rounded-lg border border-cyan-500/30 bg-cyan-500/20 p-2 text-cyan-400 transition-all hover:bg-cyan-500/40"
									title={isFullscreen ? "退出全屏" : "全屏显示"}
								>
									{isFullscreen ? (
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									) : (
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

				{/* 数据卡片统计 */}
				<section className="px-4 py-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{[
								{ label: "技术时代", value: "6", color: "from-cyan-500 to-blue-500", icon: "🌐" },
								{ label: "核心技术", value: "3", color: "from-purple-500 to-pink-500", icon: "⚛️" },
								{ label: "关键事件", value: "100+", color: "from-orange-500 to-red-500", icon: "📜" },
								{ label: "技术框架", value: "50+", color: "from-green-500 to-teal-500", icon: "🔧" },
							].map((stat, index) => (
								<div
									key={index}
									className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm"
								>
									<div
										className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br opacity-20 blur-xl"
										style={{
											background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
										}}
									/>
									<div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />

									<div className="relative flex items-center justify-between">
										<div>
											<div
												className={`bg-gradient-to-r font-bold text-3xl md:text-4xl ${stat.color} mb-1 bg-clip-text text-transparent`}
											>
												{stat.value}
											</div>
											<div className="text-slate-400 text-sm">{stat.label}</div>
										</div>
										<div className="text-4xl">{stat.icon}</div>
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
							{/* 浏览器市场份额时间线 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-cyan-400 text-lg">
									<span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
									浏览器市场份额演变
								</h3>
								<BrowserMarketChart />
							</div>

							{/* 前端框架流行度 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-purple-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></span>
									前端框架流行度趋势
								</h3>
								<FrameworkPopularityChart />
							</div>

							{/* 前端技术栈雷达图 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-green-400 text-lg">
									<span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
									前端技术栈分布
								</h3>
								<TechStackRadarChart />
							</div>

							{/* 核心技术使用率变化 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-orange-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-orange-400"></span>
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
							{/* 开发者技能分布 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-pink-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-pink-400"></span>
									开发者技能分布
								</h3>
								<DeveloperSkillsChart />
							</div>

							{/* 前端工具链 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm lg:col-span-2">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-teal-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-teal-400"></span>
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
							{/* 技术时代时间轴 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-yellow-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></span>
									技术发展时间轴
								</h3>
								<TechTimelineChart />
							</div>

							{/* 性能指标仪表盘 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-lg text-red-400">
									<span className="h-2 w-2 animate-pulse rounded-full bg-red-400"></span>
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
							{/* 编程语言趋势 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-indigo-400 text-lg">
									<span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400"></span>
									编程语言流行度趋势
								</h3>
								<LanguageTrendChart />
							</div>

							{/* 前端薪资变化 */}
							<div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur-sm">
								<h3 className="mb-4 flex items-center gap-2 font-bold text-emerald-400 text-lg">
									<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
									前端工程师薪资趋势
								</h3>
								<SalaryTrendChart />
							</div>
						</div>
					</div>
				</section>

				{/* 底部信息 */}
				<footer className="border-slate-700/50 border-t bg-slate-900/50 px-4 py-6">
					<div className="container mx-auto text-center">
						<p className="mb-2 text-slate-500 text-sm">数据来源: 前端发展史项目 | 图表: ECharts | React Scenario Lab</p>
						<p className="text-slate-600 text-xs">数据更新于: 2024年 | 仅供参考</p>
					</div>
				</footer>
			</div>
		</Layout>
	);
}
