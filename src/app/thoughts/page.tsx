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
			subtitle: "适合桌面端阅读",
			icon: "🖥️",
			href: "/thoughts/pc",
			description: "完整的前端发展史内容，适合大屏深度阅读",
			color: "from-blue-500 to-cyan-500",
			recommend: true,
		},
		{
			id: "mobile",
			title: "移动端版",
			subtitle: "触屏优化体验",
			icon: "📱",
			href: "/thoughts/mobile",
			description: "专为手机设计，底部导航支持左右滑动",
			color: "from-green-500 to-emerald-500",
			recommend: false,
		},
		{
			id: "dashboard",
			title: "数据大屏",
			subtitle: "可视化数据展示",
			icon: "📊",
			href: "/thoughts/dashboard",
			description: "10个ECharts图表，全屏沉浸式体验",
			color: "from-purple-500 to-pink-500",
			recommend: false,
		},
	];

	return (
		<Layout>
			<div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
				{/* 页面头部 */}
				<div className="mb-8 md:mb-12">
					<h1 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl lg:text-5xl">📚 前端发展史</h1>
					<p className="max-w-2xl text-base text-gray-600 md:text-lg lg:text-xl">
						探索 Web 前端技术的发展历程，从静态网页到智能应用的伟大变革。
					</p>
				</div>

				{/* 三个页面入口 - 最顶部 */}
				<section className="mb-12">
					<div className="mb-6 flex items-center gap-2">
						<h2 className="font-bold text-gray-900 text-xl">选择阅读方式</h2>
						<span className="text-gray-400 text-sm">根据您的设备选择最佳体验</span>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{entryCards.map((card) => (
							<Link key={card.id} href={card.href} className="group relative">
								<div className="relative h-full overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-lg transition-all duration-300 hover:border-gray-200 hover:shadow-xl dark:bg-slate-800 dark:hover:border-slate-600">
									{/* 推荐标签 */}
									{card.recommend && (
										<div className="absolute top-4 right-4 z-10">
											<div className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 font-bold text-white text-xs shadow-md">
												推荐
											</div>
										</div>
									)}

									{/* 顶部图标区域 */}
									<div className={`bg-gradient-to-br ${card.color} p-6`}>
										<div className="flex items-center gap-4">
											<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-4xl backdrop-blur-sm">
												{card.icon}
											</div>
											<div className="flex-1 text-white">
												<h3 className="mb-1 font-bold text-xl">{card.title}</h3>
												<p className="text-sm text-white/80">{card.subtitle}</p>
											</div>
										</div>
									</div>

									{/* 描述内容 */}
									<div className="p-6">
										<p className="mb-4 text-gray-600 text-sm dark:text-slate-400">{card.description}</p>
										<div className="flex items-center gap-2 font-medium text-gray-900 transition-all group-hover:gap-3 dark:text-slate-100">
											<span>立即进入</span>
											<span className="transition-transform group-hover:translate-x-1">→</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>

				{/* 分隔线 */}
				<div className="my-12 border-gray-200 border-t dark:border-slate-700"></div>

				{/* 技术思考文章区域 */}
				<div className="mt-12">
					<div className="mb-8">
						<h2 className="mb-4 font-bold text-2xl text-gray-900">💡 前端技术思考</h2>
						<p className="text-gray-600">深入的技术文章与最佳实践探索</p>
					</div>

					{/* 分类和标签筛选 */}
					<div className="mb-8 space-y-4">
						{/* 分类 */}
						<div>
							<h3 className="mb-3 font-medium text-gray-700 text-sm">分类</h3>
							<div className="flex flex-wrap gap-2">
								<button
									type="button"
									className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700 active:scale-95"
								>
									全部
								</button>
								{categories.map((cat) => (
									<button
										key={cat}
										type="button"
										className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-50 active:scale-95"
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						{/* 标签 */}
						<div>
							<h3 className="mb-3 font-medium text-gray-700 text-sm">标签</h3>
							<div className="flex flex-wrap gap-2">
								{tags.map((tag) => (
									<button
										key={tag}
										type="button"
										className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-600 text-sm transition-colors hover:border-gray-300 hover:bg-gray-50 active:scale-95"
									>
										#{tag}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* 文章列表 */}
					<ThoughtsList />
				</div>
			</div>
		</Layout>
	);
}
