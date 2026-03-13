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
import { PlatformDemoBlock } from "@/components/frontend-plan/content-blocks/PlatformDemoBlock";
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

			{/* 快速导航 */}
			<section className="bg-gradient-to-b from-blue-50 to-purple-50 py-12 dark:from-slate-800 dark:to-slate-700">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">🔍 深入探索</h2>
					<div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
						<Link
							href="/thoughts"
							className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
						>
							<div className="mb-4 flex items-center gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-3xl text-white">
									💡
								</div>
								<div>
									<h3 className="mb-1 font-bold text-slate-900 text-xl dark:text-slate-100">返回首页</h3>
									<p className="text-slate-600 text-sm dark:text-slate-400">选择其他阅读方式</p>
								</div>
							</div>
							<p className="mb-4 text-slate-700 text-sm dark:text-slate-300">切换到移动端版或数据大屏</p>
							<div className="flex items-center gap-2 font-medium text-purple-600 transition-all group-hover:gap-4 dark:text-purple-400">
								返回
								<span className="transition-transform group-hover:translate-x-2">→</span>
							</div>
						</Link>

						<a
							href="#eras"
							className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
						>
							<div className="mb-4 flex items-center gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl text-white">
									🛠️
								</div>
								<div>
									<h3 className="mb-1 font-bold text-slate-900 text-xl dark:text-slate-100">技术时代</h3>
									<p className="text-slate-600 text-sm dark:text-slate-400">按时代浏览前端发展</p>
								</div>
							</div>
							<p className="mb-4 text-slate-700 text-sm dark:text-slate-300">
								从史前时期到AI时代，完整的前端技术发展时间线
							</p>
							<div className="flex items-center gap-2 font-medium text-blue-600 transition-all group-hover:gap-4 dark:text-blue-400">
								查看时代
								<span className="transition-transform group-hover:translate-x-2">→</span>
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

			{/* 不同载体视觉演示 */}
			<PlatformDemoBlock />

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

			{/* 技术时代 */}
			<section id="eras" className="bg-slate-50 py-16 dark:bg-slate-900">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-center font-bold text-3xl text-slate-900 dark:text-slate-100">技术时代</h2>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{config.eras.map((era) => (
							<a
								key={era.id}
								href={`/timeline#${era.slug}`}
								className="era-card hover:-translate-y-1 block rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-slate-800"
							>
								<h3 className="mb-2 font-bold text-slate-900 text-xl dark:text-slate-100">
									{era.name}
									{era.nameEn && <span className="ml-2 font-normal text-sm opacity-70">{era.nameEn}</span>}
								</h3>
								<div className="mb-3 flex items-center gap-2 text-slate-600 text-sm dark:text-slate-400">
									<time>{era.period[0]}</time>
									<span>—</span>
									<time>{era.period[1]}</time>
								</div>
								<p className="text-slate-700 text-sm dark:text-slate-300">{era.description}</p>
								<div className="mt-4 h-2 w-full rounded" style={{ backgroundColor: era.theme.primaryColor }} />
							</a>
						))}
					</div>
				</div>
			</section>

			{/* 功能特性 */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-center font-bold text-3xl text-slate-900 dark:text-slate-100">核心特性</h2>

					<div className="grid gap-8 md:grid-cols-3">
						<div className="feature-card rounded-lg bg-white p-6 shadow dark:bg-slate-800">
							<div className="mb-4 text-4xl">📜</div>
							<h3 className="mb-2 font-bold text-xl">时间轴浏览</h3>
							<p className="text-slate-600 dark:text-slate-400">按时间顺序浏览前端发展历史，了解每个时代的技术特点。</p>
						</div>

						<div className="feature-card rounded-lg bg-white p-6 shadow dark:bg-slate-800">
							<div className="mb-4 text-4xl">🎨</div>
							<h3 className="mb-2 font-bold text-xl">时代主题</h3>
							<p className="text-slate-600 dark:text-slate-400">每个时代都有独特的视觉主题，反映当时的技术风格。</p>
						</div>

						<div className="feature-card rounded-lg bg-white p-6 shadow dark:bg-slate-800">
							<div className="mb-4 text-4xl">🔍</div>
							<h3 className="mb-2 font-bold text-xl">事件详情</h3>
							<p className="text-slate-600 dark:text-slate-400">深入了解关键事件、人物和技术的发展历程。</p>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
