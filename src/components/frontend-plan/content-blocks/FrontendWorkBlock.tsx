"use client";

export function FrontendWorkBlock() {
	return (
		<section className="frontend-work bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				{/* 标题区域 */}
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-700 text-sm dark:bg-emerald-900 dark:text-emerald-300">
						职业认知
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发者做什么？</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						前端开发者是连接设计与用户体验的桥梁，负责将设计稿转化为用户可以交互的界面
					</p>
				</div>

				{/* 核心职责区域 */}
				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[
						{ icon: "🎨", title: "页面开发", color: "blue", desc: "将UI设计稿还原为HTML/CSS代码" },
						{ icon: "⚡", title: "交互实现", color: "green", desc: "实现用户操作响应和反馈" },
						{ icon: "🚀", title: "性能优化", color: "purple", desc: "优化页面加载速度和首屏渲染" },
						{ icon: "🔧", title: "兼容性处理", color: "orange", desc: "处理不同浏览器的兼容问题" },
						{ icon: "🛠️", title: "工程化建设", color: "cyan", desc: "搭建和维护前端构建流程" },
						{ icon: "📱", title: "多端开发", color: "pink", desc: "开发PC端和移动端网站" },
					].map((item) => (
						<div
							key={item.title}
							className={`rounded-xl border-l-4 bg-white p-6 shadow-lg dark:bg-slate-800 border-${item.color}-500`}
						>
							<div className="mb-4 flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-{item.color}-100 dark:bg-{item.color}-900">
									<span className="text-2xl">{item.icon}</span>
								</div>
								<h4 className="font-bold text-slate-900 text-xl dark:text-slate-100">{item.title}</h4>
							</div>
							<p className="text-slate-600 text-sm dark:text-slate-400">{item.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
