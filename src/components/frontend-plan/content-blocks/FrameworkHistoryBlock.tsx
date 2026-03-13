export function FrameworkHistoryBlock() {
	return (
		<section className="framework-history bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 font-semibold text-indigo-700 text-sm dark:bg-indigo-900 dark:text-indigo-300">
						框架历史
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端框架发展史</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从 jQuery 到现代框架，前端开发方式的演进历程
					</p>
				</div>

				{/* 框架时间线 */}
				<div className="mx-auto max-w-4xl">
					{[
						{ year: "2006", name: "jQuery", desc: "简化DOM操作，统治前端10年", icon: "⚡" },
						{ year: "2010", name: "Backbone.js", desc: "MVC框架，引入结构化开发", icon: "🦴" },
						{ year: "2010", name: "AngularJS", desc: "Google出品，双向绑定", icon: "🅰️" },
						{ year: "2013", name: "React", desc: "Facebook开源，虚拟DOM革命", icon: "⚛️" },
						{ year: "2014", name: "Vue.js", desc: "渐进式框架，易学易用", icon: "💚" },
					].map((item, index) => (
						<div key={index} className="mb-6 flex gap-4">
							<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-lg dark:bg-indigo-900">
								{item.year}
							</div>
							<div className="flex-1 rounded-lg bg-white p-4 shadow dark:bg-slate-800">
								<div className="mb-1 flex items-center gap-2">
									<span className="text-2xl">{item.icon}</span>
									<h4 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
								</div>
								<p className="text-slate-600 text-sm dark:text-slate-400">{item.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
