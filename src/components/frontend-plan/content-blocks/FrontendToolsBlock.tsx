export function FrontendToolsBlock() {
	return (
		<section className="frontend-tools bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-700 text-sm dark:bg-rose-900 dark:text-rose-300">
						工具链
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端工具链</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						构建工具、包管理器、代码规范，现代前端开发的必备工具
					</p>
				</div>

				{/* 工具分类 */}
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{ title: "包管理器", tools: ["npm", "yarn", "pnpm"], icon: "📦" },
						{ title: "构建工具", tools: ["Webpack", "Vite", "esbuild", "Rollup"], icon: "🔨" },
						{ title: "代码规范", tools: ["ESLint", "Prettier", "Biome"], icon: "📏" },
						{ title: "测试工具", tools: ["Jest", "Vitest", "Cypress", "Playwright"], icon: "🧪" },
						{ title: "类型检查", tools: ["TypeScript", "tsc"], icon: "🔍" },
						{ title: "API工具", tools: ["Axios", "Fetch API", "tRPC"], icon: "🌐" },
					].map((category) => (
						<div key={category.title} className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-3xl">{category.icon}</span>
								<h3 className="font-bold text-slate-900 text-xl dark:text-slate-100">{category.title}</h3>
							</div>
							<div className="flex flex-wrap gap-2">
								{category.tools.map((tool) => (
									<span
										key={tool}
										className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 text-sm dark:bg-slate-700 dark:text-slate-300"
									>
										{tool}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
