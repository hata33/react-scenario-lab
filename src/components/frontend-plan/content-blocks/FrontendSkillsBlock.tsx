export function FrontendSkillsBlock() {
	return (
		<section className="frontend-skills bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1 font-semibold text-sm text-teal-700 dark:bg-teal-900 dark:text-teal-300">
						技能树
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">
						前端技能树和学习路径
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从入门到精通，前端开发者需要掌握的技能体系
					</p>
				</div>

				{/* 技能树 */}
				<div className="grid gap-8 md:grid-cols-3">
					{/* 基础技能 */}
					<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
						<h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
							<span>🌱</span> 基础技能
						</h3>
						<ul className="space-y-2">
							{["HTML5/CSS3", "JavaScript基础", "Git版本控制", "HTTP协议", "浏览器原理"].map((skill) => (
								<li key={skill} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
									<span className="text-green-500">✓</span>
									{skill}
								</li>
							))}
						</ul>
					</div>

					{/* 进阶技能 */}
					<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
						<h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
							<span>🌿</span> 进阶技能
						</h3>
						<ul className="space-y-2">
							{["TypeScript", "React/Vue/Angular", "状态管理", "前端工程化", "性能优化"].map((skill) => (
								<li key={skill} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
									<span className="text-blue-500">✓</span>
									{skill}
								</li>
							))}
						</ul>
					</div>

					{/* 高级技能 */}
					<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
						<h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
							<span>🌳</span> 高级技能
						</h3>
						<ul className="space-y-2">
							{["Node.js", "微前端", "服务端渲染", "前端架构", "团队管理"].map((skill) => (
								<li key={skill} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
									<span className="text-purple-500">✓</span>
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
