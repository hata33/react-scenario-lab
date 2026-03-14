import Link from "next/link";
import Layout from "@/components/Layout";
import ThoughtsList from "@/components/thoughts/ThoughtsList";
import { getAllCategories, getAllTags } from "@/data/thoughts";

export const metadata = {
	title: "📚 前端发展史 - React Scenario Lab",
	description: "探索 Web 前端技术的发展历程",
};

export default function ThoughtsPage() {
	const categories = getAllCategories();
	const tags = getAllTags();

	// 三个页面入口配置
	const entryCards = [
		{
			id: "pc",
			title: "PC 完整版",
			subtitle: "适合桌面端深度阅读",
			icon: "🖥️",
			href: "/thoughts/pc",
			description: "12个完整内容区块，从Web诞生到AI时代的完整历程",
			stats: "12区块",
			color: "from-blue-500 via-cyan-500 to-teal-500",
			recommend: true,
			features: ["完整内容", "深度阅读", "大屏优化"],
		},
		{
			id: "mobile",
			title: "移动端版",
			subtitle: "触屏优化体验",
			icon: "📱",
			href: "/thoughts/mobile",
			description: "单页滚动设计，专为手机和平板优化",
			stats: "单页滚动",
			color: "from-emerald-500 via-green-500 to-teal-500",
			recommend: false,
			features: ["触屏优化", "滑动流畅", "轻量简洁"],
		},
		{
			id: "dashboard",
			title: "数据大屏",
			subtitle: "可视化数据展示",
			icon: "📊",
			href: "/thoughts/dashboard",
			description: "10个ECharts图表，全屏沉浸式数据可视化体验",
			stats: "10图表",
			color: "from-purple-500 via-pink-500 to-rose-500",
			recommend: false,
			features: ["数据可视化", "全屏支持", "实时更新"],
		},
	];

	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 to-slate-900">
				{/* 装饰性背景 */}
				<div className="fixed inset-0 overflow-hidden -z-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
					<div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-500" />
				</div>

				<div className="mx-auto max-w-7xl px-4 py-8 md:py-12 relative">
					{/* 页面头部 - 优化设计 */}
					<div className="mb-12 md:mb-16 text-center">
						<div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
							<span className="flex h-3 w-3 rounded-full bg-blue-500 animate-ping"></span>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-400">前端技术演进</span>
						</div>
						<h1 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
							📚 前端发展史
						</h1>
						<p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed">
							探索 Web 前端技术的发展历程，从静态网页到智能应用的伟大变革。
							<br />
							<span className="text-slate-500 dark:text-slate-400">选择最适合您的设备开始阅读之旅</span>
						</p>
					</div>

					{/* 三个页面入口 - 全新设计 */}
					<section className="mb-16">
						<div className="text-center mb-10">
							<h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
								选择您的阅读方式
							</h2>
							<p className="text-slate-500 dark:text-slate-400">
								三种不同体验，满足不同设备和使用场景
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
							{entryCards.map((card, index) => (
								<Link
									key={card.id}
									href={card.href}
									className="group"
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-700/50">
										{/* 推荐标签 */}
										{card.recommend && (
											<div className="absolute top-6 right-6 z-10">
												<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-lg animate-pulse">
													<span className="animate-ping">★</span>
													推荐
												</div>
											</div>
										)}

										{/* 装饰性光效 */}
										<div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

										{/* 顶部渐变区域 */}
										<div className={`relative bg-gradient-to-br ${card.color} p-8 overflow-hidden`}>
											{/* 装饰图案 */}
											<div className="absolute inset-0 opacity-10">
												<div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
												<div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
											</div>

											<div className="relative flex flex-col items-center text-center">
												{/* 图标 */}
												<div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
													<div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner ring-2 ring-white/30">
														{card.icon}
													</div>
												</div>

												{/* 标题 */}
												<h3 className="text-2xl font-bold text-white mb-2">
													{card.title}
												</h3>
												<p className="text-white/90 text-sm font-medium">
													{card.subtitle}
												</p>

												{/* 统计标签 */}
												<div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
													<span className="font-bold">{card.stats}</span>
													<span className="opacity-75">•</span>
													<span>完整体验</span>
												</div>
											</div>
										</div>

										{/* 特性标签 */}
										<div className="flex flex-wrap gap-2 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50">
											{card.features.map((feature) => (
												<span
													key={feature}
													className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
													{feature}
												</span>
											))}
										</div>

										{/* 描述内容 */}
										<div className="p-6 pt-2">
											<p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
												{card.description}
											</p>

											{/* 进入按钮 */}
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-500">
													<span className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}></span>
													适合{card.id === "pc" ? "桌面" : card.id === "mobile" ? "手机" : "大屏"}设备
												</div>
												<div className="flex items-center gap-2 font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300 group-hover:gap-3 transition-all">
													<span>立即进入</span>
													<span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</section>

					{/* 分隔线 - 优化样式 */}
					<div className="flex items-center gap-4 my-16">
						<div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
						<div className="flex items-center gap-2 px-4">
							<span className="text-2xl">💡</span>
							<span className="text-sm font-medium text-slate-400">技术文章</span>
						</div>
						<div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
					</div>

					{/* 技术思考文章区域 - 优化 */}
					<div>
						<div className="text-center mb-10">
							<h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
								前端技术思考
							</h2>
							<p className="text-slate-500 dark:text-slate-400">
								深入的技术文章与最佳实践探索
							</p>
						</div>

						{/* 分类和标签筛选 - 优化 */}
						<div className="mb-10 space-y-6">
							{/* 分类 */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-blue-500"></span>
									文章分类
								</h3>
								<div className="flex flex-wrap gap-3">
									<button
										type="button"
										className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 font-medium text-sm text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all"
									>
										<span className="flex items-center gap-2">
											<span>📁</span>
											<span>全部</span>
										</span>
									</button>
									{categories.map((cat) => (
										<button
											key={cat}
											type="button"
											className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-white dark:bg-slate-800 px-5 py-2.5 font-medium text-sm text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
										>
											{cat}
										</button>
									))}
								</div>
							</div>

							{/* 标签 */}
							<div>
								<h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-purple-500"></span>
									热门标签
								</h3>
								<div className="flex flex-wrap gap-2">
									{tags.map((tag) => (
										<button
											key={tag}
											type="button"
											className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
										>
											#{tag}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* 文章列表 */}
						<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8">
							<ThoughtsList />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
