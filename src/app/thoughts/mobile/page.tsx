"use client";

import Link from "next/link";
import Layout from "@/components/Layout";

export default function FrontendPlanMobilePage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
				{/* 顶部导航 - 返回首页 - 优化 */}
				<div className="sticky top-0 z-10 border-slate-200/50 border-b bg-white/80 backdrop-blur-md px-4 py-3 dark:border-slate-700/50 dark:bg-slate-800/80">
					<Link
						href="/thoughts"
						className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 font-bold text-blue-600 active:scale-95 dark:text-blue-400 transition-colors"
					>
						<span className="text-lg">←</span>
						<span>返回首页</span>
					</Link>
				</div>

				{/* Hero 区块 - 优化 */}
				<section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-4 py-12 text-white">
					{/* 装饰背景 */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
					</div>

					<div className="relative text-center">
						<div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
							<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
							<span className="font-semibold text-sm">移动端优化</span>
						</div>
						<h1 className="mb-2 font-bold text-responsive-3xl drop-shadow-lg">📱 前端发展史</h1>
						<p className="text-responsive-sm text-white/90">向下滑动阅读完整内容</p>
					</div>
				</section>

				{/* 什么是前端 - 优化 */}
				<section className="px-4 py-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
							<span className="text-lg">💡</span>
						</div>
						<h2 className="font-bold text-responsive-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-700 dark:from-slate-100 dark:to-blue-300">
							什么是 Web 前端？
						</h2>
					</div>
					<p className="mb-6 text-responsive-sm text-slate-600 dark:text-slate-400 leading-relaxed">
						Web 前端是构建用户在浏览器中看到和交互的网页界面的技术和实践
					</p>

					{/* 三大核心技术 - 优化 */}
					<div className="space-y-3">
						<TechCard icon="📄" title="HTML" subtitle="网页骨架" desc="超文本标记语言" color="orange" />
						<TechCard icon="🎨" title="CSS" subtitle="视觉样式" desc="层叠样式表" color="blue" />
						<TechCard icon="⚡" title="JavaScript" subtitle="交互逻辑" desc="脚本编程语言" color="yellow" />
					</div>
				</section>

				{/* 前后端对比 - 优化 */}
				<section className="bg-white/50 dark:bg-slate-800/50 px-4 py-6 backdrop-blur-sm">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
							<span className="text-lg">⚖️</span>
						</div>
						<h2 className="font-bold text-responsive-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-green-700 dark:from-slate-100 dark:to-green-300">
							前端 vs 后端
						</h2>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="group relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 dark:border-blue-800/50 dark:from-blue-950/20 dark:to-slate-800 transition-all active:scale-95">
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-2xl dark:from-blue-900 dark:to-blue-800">
								🎨
							</div>
							<h3 className="mb-3 font-bold text-blue-700 text-sm dark:text-blue-400">前端</h3>
							<ul className="space-y-2 text-slate-600 text-xs dark:text-slate-400">
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>浏览器运行</li>
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>用户可见</li>
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400"></span>界面交互</li>
							</ul>
						</div>
						<div className="group relative overflow-hidden rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-4 dark:border-green-800/50 dark:from-green-950/20 dark:to-slate-800 transition-all active:scale-95">
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-2xl dark:from-green-900 dark:to-green-800">
								⚙️
							</div>
							<h3 className="mb-3 font-bold text-green-700 text-sm dark:text-green-400">后端</h3>
							<ul className="space-y-2 text-slate-600 text-xs dark:text-slate-400">
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-400"></span>服务器运行</li>
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-400"></span>用户不可见</li>
								<li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-400"></span>数据处理</li>
							</ul>
						</div>
					</div>
				</section>

				{/* 核心技术详解 - 优化 */}
				<section className="px-4 py-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
							<span className="text-lg">🔧</span>
						</div>
						<h2 className="font-bold text-responsive-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-purple-700 dark:from-slate-100 dark:to-purple-300">
							核心技术详解
						</h2>
					</div>

					{/* HTML */}
					<div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-800 ring-1 ring-orange-200/50 dark:ring-orange-800/50">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 text-3xl dark:from-orange-900 dark:to-orange-800 shadow-lg ring-2 ring-orange-200 dark:ring-orange-700">
								📄
							</div>
							<div>
								<h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500">HTML</h3>
								<p className="text-slate-500 text-xs dark:text-slate-400">网页的骨架和结构</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["标签与元素", "语义化", "DOM结构", "超链接", "表单输入"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 px-3 py-2.5 text-slate-700 text-xs dark:from-orange-950/30 dark:to-orange-900/20 dark:text-slate-300 font-medium active:scale-95 transition-transform"
								>
									• {item}
								</div>
							))}
						</div>
					</div>

					{/* CSS */}
					<div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-800 ring-1 ring-blue-200/50 dark:ring-blue-800/50">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-3xl dark:from-blue-900 dark:to-blue-800 shadow-lg ring-2 ring-blue-200 dark:ring-blue-700">
								🎨
							</div>
							<div>
								<h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500">CSS</h3>
								<p className="text-slate-500 text-xs dark:text-slate-400">网页的视觉表现</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["选择器", "盒模型", "Flex布局", "Grid网格", "动画过渡"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 px-3 py-2.5 text-slate-700 text-xs dark:from-blue-950/30 dark:to-blue-900/20 dark:text-slate-300 font-medium active:scale-95 transition-transform"
								>
									• {item}
								</div>
							))}
						</div>
					</div>

					{/* JavaScript */}
					<div className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-800 ring-1 ring-yellow-200/50 dark:ring-yellow-800/50">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 text-3xl dark:from-yellow-900 dark:to-yellow-800 shadow-lg ring-2 ring-yellow-200 dark:ring-yellow-700">
								⚡
							</div>
							<div>
								<h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700 dark:from-yellow-400 dark:to-yellow-500">JavaScript</h3>
								<p className="text-slate-500 text-xs dark:text-slate-400">网页的交互逻辑</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["变量类型", "函数作用域", "异步编程", "DOM操作", "事件处理"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50 px-3 py-2.5 text-slate-700 text-xs dark:from-yellow-950/30 dark:to-yellow-900/20 dark:text-slate-300 font-medium active:scale-95 transition-transform"
								>
									• {item}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* 发展时间线 - 优化 */}
				<section className="bg-white/50 dark:bg-slate-800/50 px-4 py-6 backdrop-blur-sm">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
							<span className="text-lg">📜</span>
						</div>
						<h2 className="font-bold text-responsive-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-amber-700 dark:from-slate-100 dark:to-amber-300">
							发展时间线
						</h2>
					</div>
					<div className="space-y-3">
						{[
							{ year: "1990", event: "Web诞生", desc: "Tim Berners-Lee创建第一个网页", icon: "🌐" },
							{ year: "1995", event: "JavaScript诞生", desc: "Brendan Eich在10天内创建", icon: "⚡" },
							{ year: "1998", event: "CSS2发布", desc: "样式表成为W3C标准", icon: "🎨" },
							{ year: "2004", event: "Firefox发布", desc: "打破IE垄断的开源浏览器", icon: "🦊" },
							{ year: "2008", event: "Chrome发布", desc: "V8引擎性能革命", icon: "🌐" },
							{ year: "2013", event: "React诞生", desc: "Facebook开源，虚拟DOM革命", icon: "⚛️" },
							{ year: "2014", event: "Vue.js发布", desc: "渐进式框架，易学易用", icon: "💚" },
							{ year: "2024", event: "React 19", desc: "服务端组件与AI时代", icon: "⚛️" },
						].map((item) => (
							<div key={item.year} className="group relative overflow-hidden flex gap-3 rounded-2xl bg-gradient-to-br from-white to-slate-50 p-4 shadow-md dark:from-slate-800 dark:to-slate-900 transition-all active:scale-[0.98]">
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-2xl shadow-lg ring-2 ring-purple-200 dark:ring-purple-700">
									{item.icon}
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-1 inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 font-bold text-purple-700 text-xs dark:bg-purple-900/50 dark:text-purple-400">
										<span>{item.year}</span>
									</div>
									<h3 className="mb-1 font-bold text-slate-900 text-sm dark:text-slate-100">{item.event}</h3>
									<p className="line-clamp-2 text-slate-600 text-xs dark:text-slate-400">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 前端四大载体 - 优化 */}
				<section className="px-4 py-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
							<span className="text-lg">📱</span>
						</div>
						<h2 className="font-bold text-responsive-xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-cyan-700 dark:from-slate-100 dark:to-cyan-300">
							前端四大载体
						</h2>
					</div>
					<div className="space-y-3">
						{[
							{ name: "Web网页", icon: "🌐", desc: "运行在浏览器，跨平台访问", color: "blue", grad: "from-blue-500 to-cyan-500" },
							{ name: "H5页面", icon: "📱", desc: "专为移动端优化的网页", color: "green", grad: "from-green-500 to-emerald-500" },
							{ name: "小程序", icon: "🔲", desc: "运行在超级App内的轻应用", color: "purple", grad: "from-purple-500 to-pink-500" },
							{ name: "原生App", icon: "📲", desc: "运行在操作系统上的应用", color: "orange", grad: "from-orange-500 to-red-500" },
						].map((platform) => (
							<div
								key={platform.name}
								className="group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-800 transition-all active:scale-[0.98]"
							>
								<div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${platform.grad} text-3xl shadow-lg ring-2 ring-white/50`}>
									{platform.icon}
								</div>
								<div className="flex-1">
									<h3 className="mb-1 font-bold text-slate-900 text-sm dark:text-slate-100">{platform.name}</h3>
									<p className="text-slate-500 text-xs dark:text-slate-400">{platform.desc}</p>
								</div>
								<div className="text-slate-400 text-2xl opacity-30 group-hover:opacity-50 transition-opacity">→</div>
							</div>
						))}
					</div>
				</section>

				{/* 底部 CTA - 优化 */}
				<section className="pb-8 px-4">
					<Link
						href="/thoughts/pc"
						className="group relative overflow-hidden block min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-4 text-center font-bold text-white shadow-xl transition-all active:scale-95"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<span className="relative flex items-center justify-center gap-2">
							切换到 PC 完整版
							<span className="transition-transform group-hover:translate-x-1">→</span>
						</span>
					</Link>
				</section>
			</div>
		</Layout>
	);
}

// 技术卡片组件 - 优化
function TechCard({
	icon,
	title,
	subtitle,
	desc,
	color,
}: {
	icon: string;
	title: string;
	subtitle: string;
	desc: string;
	color: string;
}) {
	const colorMap: Record<string, { border: string; bg: string; text: string; shadow: string }> = {
		orange: {
			border: "border-orange-400 dark:border-orange-600",
			bg: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
			text: "text-orange-600 dark:text-orange-400",
			shadow: "shadow-orange-200/50 dark:shadow-orange-900/20",
		},
		blue: {
			border: "border-blue-400 dark:border-blue-600",
			bg: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
			text: "text-blue-600 dark:text-blue-400",
			shadow: "shadow-blue-200/50 dark:shadow-blue-900/20",
		},
		yellow: {
			border: "border-yellow-400 dark:border-yellow-600",
			bg: "bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/30 dark:to-yellow-900/20",
			text: "text-yellow-600 dark:text-yellow-400",
			shadow: "shadow-yellow-200/50 dark:shadow-yellow-900/20",
		},
	};

	const styles = colorMap[color] || colorMap.orange;

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border-l-4 ${styles.border} ${styles.bg} p-4 shadow-md dark:bg-slate-800 transition-all active:scale-[0.98] ${styles.shadow}`}
		>
			<div className="flex items-center gap-3">
				<span className="text-3xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
				<div className="flex-1">
					<h3 className={`font-bold text-sm ${styles.text}`}>{title}</h3>
					<p className="text-slate-500 text-xs dark:text-slate-400">{subtitle}</p>
				</div>
				<span className="ml-auto text-slate-400 text-xs dark:text-slate-500 font-medium bg-white/50 dark:bg-slate-700/50 px-2 py-1 rounded-full">{desc}</span>
			</div>
		</div>
	);
}
