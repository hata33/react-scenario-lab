export function FrontendIntroBlock() {
	return (
		<section className="frontend-intro relative bg-gradient-to-b from-blue-50 via-white to-purple-50 py-16 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			{/* 装饰性背景 */}
			<div className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-blue-400/5 blur-3xl" />
				<div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-purple-400/5 blur-3xl" />
			</div>

			<div className="container mx-auto px-4">
				{/* 标题区域 - 优化 */}
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 dark:border-blue-800/50">
						<span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
						<span className="font-semibold text-blue-700 text-sm dark:text-blue-300">第一优先级 · 核心概念</span>
					</div>
					<h2 className="mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text font-bold text-4xl text-transparent md:text-5xl dark:from-slate-100 dark:via-blue-200 dark:to-purple-200">
						什么是 Web 前端？
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed dark:text-slate-400">
						Web 前端是构建用户在浏览器中看到和交互的网页界面的技术和实践
					</p>
				</div>

				{/* 三大核心技术 - 优化卡片设计 */}
				<div className="mb-16 grid gap-6 md:grid-cols-3">
					<div className="tech-card group hover:-translate-y-2 relative overflow-hidden rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-xl transition-all duration-300 hover:border-orange-400 hover:shadow-2xl dark:border-orange-900/50 dark:from-slate-800 dark:to-orange-950/20 dark:hover:border-orange-700/50">
						{/* 卡片光效 */}
						<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/10" />

						<div className="relative">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 text-5xl shadow-lg ring-2 ring-orange-200 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:from-orange-900/50 dark:to-orange-800/50 dark:ring-orange-700/50">
								📄
							</div>
							<h3 className="mb-2 bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text font-bold text-2xl text-transparent dark:from-orange-400 dark:to-orange-500">
								HTML
							</h3>
							<p className="mb-3 font-medium text-orange-600/80 text-sm dark:text-orange-400/80">超文本标记语言</p>
							<p className="text-slate-700 leading-relaxed dark:text-slate-300">
								网页的骨架和结构，定义内容的语义和层次
							</p>
							<div className="mt-6 flex items-center gap-2 text-slate-500 text-xs dark:text-slate-500">
								<span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
								1991年由 Tim Berners-Lee 创建
							</div>
						</div>
					</div>

					<div className="tech-card group hover:-translate-y-2 relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-xl transition-all duration-300 hover:border-blue-400 hover:shadow-2xl dark:border-blue-900/50 dark:from-slate-800 dark:to-blue-950/20 dark:hover:border-blue-700/50">
						{/* 卡片光效 */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-blue-500/10" />

						<div className="relative">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-5xl shadow-lg ring-2 ring-blue-200 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:from-blue-900/50 dark:to-blue-800/50 dark:ring-blue-700/50">
								🎨
							</div>
							<h3 className="mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text font-bold text-2xl text-transparent dark:from-blue-400 dark:to-blue-500">
								CSS
							</h3>
							<p className="mb-3 font-medium text-blue-600/80 text-sm dark:text-blue-400/80">层叠样式表</p>
							<p className="text-slate-700 leading-relaxed dark:text-slate-300">
								控制网页的视觉呈现，负责布局、颜色、字体等样式
							</p>
							<div className="mt-6 flex items-center gap-2 text-slate-500 text-xs dark:text-slate-500">
								<span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
								CSS1于1996年成为W3C推荐标准
							</div>
						</div>
					</div>

					<div className="tech-card group hover:-translate-y-2 relative overflow-hidden rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-white to-yellow-50/30 p-8 shadow-xl transition-all duration-300 hover:border-yellow-400 hover:shadow-2xl dark:border-yellow-900/50 dark:from-slate-800 dark:to-yellow-950/20 dark:hover:border-yellow-700/50">
						{/* 卡片光效 */}
						<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 transition-all duration-500 group-hover:from-yellow-500/5 group-hover:to-yellow-500/10" />

						<div className="relative">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 text-5xl shadow-lg ring-2 ring-yellow-200 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 dark:from-yellow-900/50 dark:to-yellow-800/50 dark:ring-yellow-700/50">
								⚡
							</div>
							<h3 className="mb-2 bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text font-bold text-2xl text-transparent dark:from-yellow-400 dark:to-yellow-500">
								JavaScript
							</h3>
							<p className="mb-3 font-medium text-sm text-yellow-600/80 dark:text-yellow-400/80">脚本语言</p>
							<p className="text-slate-700 leading-relaxed dark:text-slate-300">
								实现网页的动态交互，处理用户操作和数据处理
							</p>
							<div className="mt-6 flex items-center gap-2 text-slate-500 text-xs dark:text-slate-500">
								<span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
								1995年由 Brendan Eich 在10天内创建
							</div>
						</div>
					</div>
				</div>

				{/* 前端与后端的区别 - 优化 */}
				<div className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-200/50 dark:from-slate-800 dark:to-slate-900/50 dark:ring-slate-700/50">
					{/* 装饰背景 */}
					<div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl" />

					<h3 className="mb-8 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-center font-bold text-2xl text-transparent dark:from-slate-100 dark:to-slate-300">
						前端与后端的区别
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-slate-200/50 border-b-2 dark:border-slate-700/50">
									<th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">维度</th>
									<th className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text px-6 py-4 text-left font-bold text-transparent dark:from-blue-400 dark:to-blue-500">
										前端（Frontend）
									</th>
									<th className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text px-6 py-4 text-left font-bold text-transparent dark:from-green-400 dark:to-green-500">
										后端（Backend）
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-slate-100/50 border-b transition-colors hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
									<td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">运行环境</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">浏览器</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">服务器</td>
								</tr>
								<tr className="border-slate-100/50 border-b transition-colors hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
									<td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">用户可见</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">是（直接看到和操作）</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">否（服务器端运行）</td>
								</tr>
								<tr className="border-slate-100/50 border-b transition-colors hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
									<td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">主要职责</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">用户界面、交互体验</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">业务逻辑、数据处理</td>
								</tr>
								<tr className="border-slate-100/50 border-b transition-colors hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
									<td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">核心技术</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">HTML/CSS/JavaScript</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">Python/Java/Go等</td>
								</tr>
								<tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
									<td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">关注重点</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">用户体验、视觉呈现</td>
									<td className="px-6 py-4 text-slate-600 dark:text-slate-400">数据安全、性能稳定</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* 前端技术发展历程 - 优化 */}
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 shadow-xl ring-1 ring-purple-200/50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 dark:ring-purple-800/50">
					{/* 装饰背景 */}
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/5 to-pink-400/5 blur-3xl" />
						<div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/5 to-cyan-400/5 blur-3xl" />
					</div>

					<div className="relative">
						<h3 className="mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-center font-bold text-2xl text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
							前端技术发展历程
						</h3>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							{[
								{
									color: "purple",
									name: "史前时期",
									period: "1940s - 1980s",
									desc: "计算机图形界面诞生，超文本概念出现",
								},
								{ color: "blue", name: "静态网页时代", period: "1990 - 1995", desc: "HTML诞生，Web开始起步" },
								{
									color: "green",
									name: "动态交互萌芽",
									period: "1995 - 2005",
									desc: "JavaScript和CSS出现，初步实现动态效果",
								},
								{ color: "orange", name: "Ajax革命", period: "2005 - 2010", desc: "异步通信技术改变Web应用模式" },
								{ color: "cyan", name: "框架时代", period: "2010 - 2015", desc: "Angular、React、Vue等框架相继诞生" },
								{ color: "pink", name: "工程化时代", period: "2015 - 2020", desc: "构建工具、模块化、TypeScript普及" },
								{ color: "indigo", name: "AI时代", period: "2020 - 至今", desc: "AI辅助开发工具开始影响前端开发方式" },
							].map((era) => (
								<div
									key={era.name}
									className="era-item group relative overflow-hidden rounded-xl bg-white/50 p-4 ring-1 ring-slate-200/50 transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:bg-slate-800/50 dark:ring-slate-700/50 dark:hover:bg-slate-800/80"
								>
									<div
										className={`absolute inset-0 bg-gradient-to-br from-${era.color}-500/0 to-${era.color}-500/0 group-hover:from-${era.color}-500/5 group-hover:to-${era.color}-500/10 transition-all duration-500`}
									/>
									<div className="relative">
										<div className="mb-2 flex items-center gap-2">
											<div
												className={`h-3 w-3 rounded-full bg-${era.color}-500 shadow-lg shadow-${era.color}-500/30`}
											/>
											<h4 className="font-bold text-slate-900 dark:text-slate-100">{era.name}</h4>
										</div>
										<p className="mb-1 font-medium text-slate-600 text-sm dark:text-slate-400">{era.period}</p>
										<p className="text-slate-500 text-xs leading-relaxed dark:text-slate-500">{era.desc}</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-10 text-center">
							<a
								href="/timeline"
								className="group hover:-translate-y-1 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-bold text-white shadow-xl transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl"
							>
								探索完整时间线
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
