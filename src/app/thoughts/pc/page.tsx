import Link from "next/link";
import { BrowserHistoryBlock } from "@/components/frontend-plan/content-blocks/BrowserHistoryBlock";
import { CoreTechBlock } from "@/components/frontend-plan/content-blocks/CoreTechBlock";
import { FrameworkHistoryBlock } from "@/components/frontend-plan/content-blocks/FrameworkHistoryBlock";
import { FrontendIntroBlock } from "@/components/frontend-plan/content-blocks/FrontendIntroBlock";
import { FrontendPlatformsBlock } from "@/components/frontend-plan/content-blocks/FrontendPlatformsBlock";
import { FrontendResponsibilitiesBlock } from "@/components/frontend-plan/content-blocks/FrontendResponsibilitiesBlock";
import { FrontendSkillsBlock } from "@/components/frontend-plan/content-blocks/FrontendSkillsBlock";
import { FrontendToolsBlock } from "@/components/frontend-plan/content-blocks/FrontendToolsBlock";
import { FrontendWorkBlock } from "@/components/frontend-plan/content-blocks/FrontendWorkBlock";
import { HeroBlock } from "@/components/frontend-plan/content-blocks/HeroBlock";
import { PerformanceBlock } from "@/components/frontend-plan/content-blocks/PerformanceBlock";
import { PlatformComparisonBlock } from "@/components/frontend-plan/content-blocks/PlatformComparisonBlock";
import Layout from "@/components/Layout";
import { loadContentConfig } from "@/lib/config/loader";

export const metadata = {
	title: "前端发展史 - PC完整版",
	description: "探索 Web 前端技术的发展历程",
};

export default async function FrontendPlanPCPage() {
	const config = await loadContentConfig();

	return (
		<Layout>
			{/* Hero 区块 */}
			<HeroBlock
				content={{
					title: "前端发展史",
					subtitle: "从史前时期到 AI 时代",
					description: "探索 Web 前端技术的演进历程，见证从静态页面到智能应用的伟大变革。",
				}}
			/>

			{/* 快速导航 - 优化 */}
			<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
				{/* 装饰背景 */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-10 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
				</div>

				<div className="container mx-auto px-4 relative">
					<div className="mb-10 text-center">
						<div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50">
							<span className="text-lg">🔍</span>
							<span className="font-semibold text-slate-700 dark:text-slate-300">深入探索</span>
						</div>
					</div>
					<div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
						<Link
							href="/thoughts"
							className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-purple-50/30 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:from-slate-800 dark:to-purple-950/20 ring-1 ring-purple-200/50 dark:ring-purple-800/50"
						>
							{/* 卡片光效 */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-500" />

							<div className="relative">
								<div className="mb-4 flex items-center gap-4">
									<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-3xl text-white shadow-lg ring-2 ring-purple-200 dark:ring-purple-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
										💡
									</div>
									<div>
										<h3 className="mb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 text-xl dark:from-slate-100 dark:to-slate-300">返回首页</h3>
										<p className="text-slate-600 text-sm dark:text-slate-400">选择其他阅读方式</p>
									</div>
								</div>
								<p className="mb-4 text-slate-700 text-sm dark:text-slate-300">切换到移动端版或数据大屏</p>
								<div className="flex items-center gap-2 font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 transition-all group-hover:gap-4">
									返回
									<span className="transition-transform group-hover:translate-x-2">→</span>
								</div>
							</div>
						</Link>

						<a
							href="#eras"
							className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:from-slate-800 dark:to-blue-950/20 ring-1 ring-blue-200/50 dark:ring-blue-800/50"
						>
							{/* 卡片光效 */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-500" />

							<div className="relative">
								<div className="mb-4 flex items-center gap-4">
									<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl text-white shadow-lg ring-2 ring-blue-200 dark:ring-blue-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
										🛠️
									</div>
									<div>
										<h3 className="mb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 text-xl dark:from-slate-100 dark:to-slate-300">技术时代</h3>
										<p className="text-slate-600 text-sm dark:text-slate-400">按时代浏览前端发展</p>
									</div>
								</div>
								<p className="mb-4 text-slate-700 text-sm dark:text-slate-300">
									从史前时期到AI时代，完整的前端技术发展时间线
								</p>
								<div className="flex items-center gap-2 font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400 transition-all group-hover:gap-4">
									查看时代
									<span className="transition-transform group-hover:translate-x-2">→</span>
								</div>
							</div>
						</a>
					</div>
				</div>
			</section>

			{/* 第一优先级：什么是Web前端 */}
			<FrontendIntroBlock />

			{/* 前端开发者工作职责 */}
			<FrontendWorkBlock />

			{/* 前端开发者核心职责详解 */}
			<FrontendResponsibilitiesBlock />

			{/* 前端四大载体详解 */}
			<FrontendPlatformsBlock />

			{/* 不同载体视觉演示 - 交互式对比 */}
			<PlatformComparisonBlock />

			{/* 前端三大核心技术详解 */}
			<CoreTechBlock />

			{/* 浏览器发展历史 */}
			<BrowserHistoryBlock />

			{/* 前端框架发展历史 */}
			<FrameworkHistoryBlock />

			{/* 前端工具链 */}
			<FrontendToolsBlock />

			{/* 前端技能树和学习路径 */}
			<FrontendSkillsBlock />

			{/* 前端性能优化 */}
			<PerformanceBlock />

			{/* 技术时代 - 优化 */}
			<section id="eras" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 py-20 dark:from-slate-900 dark:to-slate-800">
				{/* 装饰背景 */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 relative">
					<div className="mb-12 text-center">
						<div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50">
							<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
							<span className="font-semibold text-slate-700 dark:text-slate-300">完整历程</span>
						</div>
						<h2 className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200">
							技术时代
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{config.eras.map((era, index) => (
							<a
								key={era.id}
								href={`/timeline#${era.slug}`}
								className="era-card group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-800 ring-1 ring-slate-200/50 dark:ring-slate-700/50"
								style={{ animationDelay: `${index * 50}ms` }}
							>
								{/* 卡片光效 */}
								<div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									style={{
										background: `linear-gradient(135deg, ${era.theme.primaryColor}11, ${era.theme.primaryColor}05)`
									}}
								/>

								<div className="relative">
									<h3 className="mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 text-xl dark:from-slate-100 dark:to-slate-300">
										{era.name}
										{era.nameEn && <span className="ml-2 font-normal text-sm opacity-70">{era.nameEn}</span>}
									</h3>
									<div className="mb-3 flex items-center gap-2 text-slate-600 text-sm dark:text-slate-400">
										<time className="font-medium">{era.period[0]}</time>
										<span className="text-slate-400">—</span>
										<time className="font-medium">{era.period[1]}</time>
									</div>
									<p className="text-slate-700 text-sm dark:text-slate-300 leading-relaxed">{era.description}</p>
									<div className="mt-5 h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${era.theme.primaryColor}22` }}>
										<div className="h-full rounded-full transition-all duration-500 group-hover:w-full w-3/4" style={{ backgroundColor: era.theme.primaryColor }} />
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* 功能特性 - 优化 */}
			<section className="relative overflow-hidden py-20">
				{/* 装饰背景 */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
					<div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 relative">
					<div className="mb-12 text-center">
						<div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 ring-1 ring-blue-200/50 dark:ring-blue-800/50">
							<span className="text-lg">✨</span>
							<span className="font-semibold text-slate-700 dark:text-slate-300">核心亮点</span>
						</div>
						<h2 className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200">
							核心特性
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								icon: "📜",
								title: "时间轴浏览",
								desc: "按时间顺序浏览前端发展历史，了解每个时代的技术特点。",
								color: "from-blue-500 to-cyan-500",
							},
							{
								icon: "🎨",
								title: "时代主题",
								desc: "每个时代都有独特的视觉主题，反映当时的技术风格。",
								color: "from-purple-500 to-pink-500",
							},
							{
								icon: "🔍",
								title: "事件详情",
								desc: "深入了解关键事件、人物和技术的发展历程。",
								color: "from-orange-500 to-red-500",
							},
						].map((feature, index) => (
							<div
								key={feature.title}
								className="feature-card group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
							>
								{/* 卡片光效 */}
								<div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

								<div className="relative">
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-4xl shadow-lg ring-2 ring-slate-200 dark:from-slate-700 dark:to-slate-800 dark:ring-slate-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
										{feature.icon}
									</div>
									<h3 className="mb-3 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
										{feature.title}
									</h3>
									<p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
}
