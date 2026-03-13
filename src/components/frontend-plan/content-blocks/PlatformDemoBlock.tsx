export function PlatformDemoBlock() {
	return (
		<section className="platform-demo bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-cyan-100 px-4 py-1 font-semibold text-cyan-700 text-sm dark:bg-cyan-900 dark:text-cyan-300">
						视觉对比
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">不同载体的界面展示</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						通过可视化展示，直观了解Web、H5、小程序、App在界面和交互上的差异
					</p>
				</div>

				{/* 简化的对比展示 */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{[
						{ name: "Web", icon: "🌐", color: "blue", desc: "浏览器访问，响应式布局" },
						{ name: "H5", icon: "📱", color: "green", desc: "移动优化，触摸交互" },
						{ name: "小程序", icon: "🔲", color: "purple", desc: "平台内运行，原生能力" },
						{ name: "App", icon: "📲", color: "orange", desc: "原生应用，最佳性能" },
					].map((item) => (
						<div key={item.name} className="rounded-xl bg-white p-6 text-center shadow-lg dark:bg-slate-800">
							<div className="mb-4 text-5xl">{item.icon}</div>
							<h4 className="mb-2 font-bold text-slate-900 text-xl dark:text-slate-100">{item.name}</h4>
							<p className="text-slate-600 text-sm dark:text-slate-400">{item.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
