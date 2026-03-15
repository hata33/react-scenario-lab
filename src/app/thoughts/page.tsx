import Link from "next/link";
import { BrowserHistoryBlock } from "@/components/frontend-plan/content-blocks/BrowserHistoryBlock";
import { FrameworkHistoryBlock } from "@/components/frontend-plan/content-blocks/FrameworkHistoryBlock";
import { HeroBlock } from "@/components/frontend-plan/content-blocks/HeroBlock";
import Layout from "@/components/Layout";
import { loadContentConfig } from "@/lib/config/loader";

export const metadata = {
	title: "📚 前端发展史 - React Scenario Lab",
	description: "探索 Web 前端技术的发展历程",
};

export default async function ThoughtsPage() {
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
			<section className="border-slate-200 border-b bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
				<div className="container mx-auto px-4">
					<div className="mx-auto grid max-w-2xl gap-4">
						<Link
							href="/thoughts/dashboard"
							className="border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="text-2xl">📊</span>
									<div>
										<h3 className="font-semibold text-slate-900 dark:text-slate-100">数据大屏</h3>
										<p className="text-slate-500 text-sm dark:text-slate-400">可视化展示</p>
									</div>
								</div>
								<span className="text-slate-400">→</span>
							</div>
						</Link>

						<Link href="/frontend/modern" className="border border-blue-600 bg-blue-600 p-4 text-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="text-2xl">⚡</span>
									<div>
										<h3 className="font-semibold">现代前端实践</h3>
										<p className="text-sm text-white/80">工程化实践</p>
									</div>
								</div>
								<span>→</span>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* 浏览器发展历史 */}
			<BrowserHistoryBlock />

			{/* 前端框架发展历史 */}
			<FrameworkHistoryBlock />

			{/* 技术时代 */}
			<section
				id="eras"
				className="border-slate-200 border-b bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900"
			>
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<div className="mb-4">
							<span className="font-semibold text-slate-500 text-sm dark:text-slate-400">完整历程</span>
						</div>
						<h2 className="font-bold text-3xl text-slate-900 dark:text-slate-100">技术时代</h2>
						<div className="mx-auto mt-4 h-px w-20 bg-slate-300 dark:bg-slate-700" />
						<p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
							点击下方时代卡片，查看详细的历史事件和技术里程碑
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{config.eras.map((era) => (
							<a
								key={era.id}
								href={`/timeline#${era.slug}`}
								className="group block border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
							>
								<div className="mb-3 flex items-center gap-2">
									<div className="h-3 w-3" style={{ backgroundColor: era.theme.primaryColor }} />
									<h3 className="font-semibold text-slate-900 dark:text-slate-100">{era.name}</h3>
								</div>
								<div className="mb-3 flex items-center gap-2 text-slate-600 text-sm dark:text-slate-400">
									<time className="font-medium">{era.period[0]}</time>
									<span className="text-slate-400">—</span>
									<time className="font-medium">{era.period[1]}</time>
								</div>
								<p className="text-slate-700 text-sm dark:text-slate-300">{era.description}</p>
								<div className="mt-4 flex items-center font-medium text-slate-900 text-sm dark:text-slate-100">
									查看详情
									<span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* 相关阅读 */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="font-bold text-3xl text-slate-900 dark:text-slate-100">继续探索</h2>
						<div className="mx-auto mt-4 h-px w-20 bg-slate-300 dark:bg-slate-700" />
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						<Link href="/frontend/modern" className="border border-blue-600 bg-blue-600 p-6 text-white">
							<div className="mb-4 text-4xl">⚡</div>
							<h3 className="mb-2 font-semibold">现代前端实践</h3>
							<p className="text-sm text-white/80">工程化实践与最佳应用</p>
						</Link>

						<Link
							href="/frontend/tech-stack"
							className="border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
						>
							<div className="mb-4 text-4xl">🛠️</div>
							<h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">技术栈演进</h3>
							<p className="text-slate-600 text-sm dark:text-slate-400">了解前端技术栈的发展历程</p>
						</Link>

						<Link
							href="/thoughts/dashboard"
							className="border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
						>
							<div className="mb-4 text-4xl">📊</div>
							<h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">数据大屏</h3>
							<p className="text-slate-600 text-sm dark:text-slate-400">图表可视化展示</p>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
}
