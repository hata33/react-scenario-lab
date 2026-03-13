import { cn } from "@/lib/utils";

export function FrontendIntroBlock() {
	return (
		<section className="frontend-intro bg-gradient-to-b from-blue-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				{/* 标题区域 */}
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 font-semibold text-blue-700 text-sm dark:bg-blue-900 dark:text-blue-300">
						第一优先级 · 核心概念
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">什么是 Web 前端？</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						Web 前端是构建用户在浏览器中看到和交互的网页界面的技术和实践
					</p>
				</div>

				{/* 三大核心技术 */}
				<div className="mb-12 grid gap-6 md:grid-cols-3">
					<div className="tech-card rounded-xl border-2 border-orange-200 bg-white p-6 shadow-lg transition-all hover:border-orange-400 dark:border-orange-900 dark:bg-slate-800 dark:hover:border-orange-700">
						<div className="mb-4 text-5xl">📄</div>
						<h3 className="mb-2 font-bold text-2xl text-orange-600 dark:text-orange-400">HTML</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">超文本标记语言</p>
						<p className="text-slate-700 dark:text-slate-300">网页的骨架和结构，定义内容的语义和层次</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">1991年由 Tim Berners-Lee 创建</div>
					</div>

					<div className="tech-card rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:border-blue-400 dark:border-blue-900 dark:bg-slate-800 dark:hover:border-blue-700">
						<div className="mb-4 text-5xl">🎨</div>
						<h3 className="mb-2 font-bold text-2xl text-blue-600 dark:text-blue-400">CSS</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">层叠样式表</p>
						<p className="text-slate-700 dark:text-slate-300">控制网页的视觉呈现，负责布局、颜色、字体等样式</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">CSS1于1996年成为W3C推荐标准</div>
					</div>

					<div className="tech-card rounded-xl border-2 border-yellow-200 bg-white p-6 shadow-lg transition-all hover:border-yellow-400 dark:border-yellow-900 dark:bg-slate-800 dark:hover:border-yellow-700">
						<div className="mb-4 text-5xl">⚡</div>
						<h3 className="mb-2 font-bold text-2xl text-yellow-600 dark:text-yellow-400">JavaScript</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">脚本语言</p>
						<p className="text-slate-700 dark:text-slate-300">实现网页的动态交互，处理用户操作和数据处理</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">1995年由 Brendan Eich 在10天内创建</div>
					</div>
				</div>

				{/* 前端与后端的区别 */}
				<div className="mb-12 rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">前端与后端的区别</h3>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-slate-200 border-b-2 dark:border-slate-700">
									<th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">维度</th>
									<th className="px-4 py-3 text-left text-blue-600 dark:text-blue-400">前端（Frontend）</th>
									<th className="px-4 py-3 text-left text-green-600 dark:text-green-400">后端（Backend）</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">运行环境</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">浏览器</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">服务器</td>
								</tr>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">用户可见</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">是（直接看到和操作）</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">否（服务器端运行）</td>
								</tr>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">主要职责</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">用户界面、交互体验</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">业务逻辑、数据处理</td>
								</tr>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">核心技术</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">HTML/CSS/JavaScript</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">Python/Java/Go等</td>
								</tr>
								<tr>
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">关注重点</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">用户体验、视觉呈现</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">数据安全、性能稳定</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* 前端技术发展历程 */}
				<div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-8 dark:from-slate-800 dark:to-slate-700">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">前端技术发展历程</h3>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-purple-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">史前时期</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">1940s - 1980s</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">计算机图形界面诞生，超文本概念出现</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-blue-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">静态网页时代</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">1990 - 1995</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">HTML诞生，Web开始起步</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-green-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">动态交互萌芽</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">1995 - 2005</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">JavaScript和CSS出现，初步实现动态效果</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-orange-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">Ajax革命</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">2005 - 2010</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">异步通信技术改变Web应用模式</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-cyan-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">框架时代</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">2010 - 2015</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">Angular、React、Vue等框架相继诞生</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-pink-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">工程化时代</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">2015 - 2020</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">构建工具、模块化、TypeScript普及</p>
						</div>

						<div className="era-item">
							<div className="mb-2 flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-indigo-500" />
								<h4 className="font-bold text-slate-900 dark:text-slate-100">AI时代</h4>
							</div>
							<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">2020 - 至今</p>
							<p className="text-slate-500 text-xs dark:text-slate-500">AI辅助开发工具开始影响前端开发方式</p>
						</div>
					</div>

					<div className="mt-8 text-center">
						<a
							href="/frontend-plan"
							className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
						>
							探索完整时间线 →
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
