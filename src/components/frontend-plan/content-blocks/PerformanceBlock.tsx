export function PerformanceBlock() {
	return (
		<section className="performance bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 font-semibold text-amber-700 text-sm dark:bg-amber-900 dark:text-amber-300">
						性能优化
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端性能优化</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从加载到渲染，全面提升前端应用性能
					</p>
				</div>

				{/* 性能指标 */}
				<div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{[
						{ name: "LCP", full: "Largest Contentful Paint", desc: "最大内容绘制", target: "< 2.5s" },
						{ name: "FID", full: "First Input Delay", desc: "首次输入延迟", target: "< 100ms" },
						{ name: "CLS", full: "Cumulative Layout Shift", desc: "累积布局偏移", target: "< 0.1" },
						{ name: "FCP", full: "First Contentful Paint", desc: "首次内容绘制", target: "< 1.8s" },
					].map((metric) => (
						<div key={metric.name} className="rounded-xl bg-white p-6 text-center shadow-lg dark:bg-slate-800">
							<div className="mb-2 font-bold text-3xl text-blue-600 dark:text-blue-400">{metric.name}</div>
							<div className="mb-2 text-slate-600 text-sm dark:text-slate-400">{metric.full}</div>
							<div className="mb-3 text-slate-500 text-xs dark:text-slate-500">{metric.desc}</div>
							<div className="font-semibold text-green-600 text-sm dark:text-green-400">目标: {metric.target}</div>
						</div>
					))}
				</div>

				{/* 优化策略 */}
				<div className="grid gap-6 md:grid-cols-2">
					{[
						{
							title: "加载优化",
							items: ["代码分割", "懒加载", "预加载关键资源", "CDN加速", "压缩资源"],
							icon: "⚡",
						},
						{
							title: "渲染优化",
							items: ["减少重排重绘", "虚拟列表", "防抖节流", "CSS containment", "will-change"],
							icon: "🎨",
						},
						{
							title: "网络优化",
							items: ["HTTP/2", "资源缓存", "图片优化", "字体优化", "减少HTTP请求"],
							icon: "🌐",
						},
						{
							title: "代码优化",
							items: ["Tree shaking", "代码压缩", "移除死代码", "按需导入", "Polyfill优化"],
							icon: "💻",
						},
					].map((strategy) => (
						<div key={strategy.title} className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
								<span className="text-2xl">{strategy.icon}</span>
								{strategy.title}
							</h3>
							<ul className="space-y-2">
								{strategy.items.map((item) => (
									<li key={item} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
										<span className="text-green-500">✓</span>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
