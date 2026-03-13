"use client";

import Link from "next/link";
import Layout from "@/components/Layout";

export default function FrontendPlanMobilePage() {
	return (
		<Layout>
			<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
				{/* 顶部导航 - 返回首页 */}
				<div className="sticky top-0 z-10 border-slate-200 border-b bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
					<Link
						href="/thoughts"
						className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 font-medium text-blue-600 active:scale-95 dark:text-blue-400"
					>
						<span>← 返回首页</span>
					</Link>
				</div>

				{/* Hero 区块 */}
				<section className="relative bg-gradient-to-br from-blue-600 to-purple-700 px-4 py-10 text-white">
					<div className="text-center">
						<h1 className="mb-2 font-bold text-responsive-3xl">📱 前端发展史</h1>
						<p className="text-responsive-sm text-white/80">移动端优化版 • 向下滑动阅读</p>
					</div>
				</section>

				{/* 什么是前端 */}
				<section className="px-4 py-6">
					<h2 className="mb-3 font-bold text-responsive-xl text-slate-900 dark:text-slate-100">什么是 Web 前端？</h2>
					<p className="mb-4 text-responsive-sm text-slate-600 dark:text-slate-400">
						Web 前端是构建用户在浏览器中看到和交互的网页界面的技术和实践
					</p>

					{/* 三大核心技术 */}
					<div className="space-y-3">
						<TechCard icon="📄" title="HTML" subtitle="网页骨架" desc="超文本标记语言" color="orange" />
						<TechCard icon="🎨" title="CSS" subtitle="视觉样式" desc="层叠样式表" color="blue" />
						<TechCard icon="⚡" title="JavaScript" subtitle="交互逻辑" desc="脚本编程语言" color="yellow" />
					</div>
				</section>

				{/* 前后端对比 */}
				<section className="bg-white px-4 py-6 dark:bg-slate-800">
					<h2 className="mb-3 font-bold text-responsive-xl text-slate-900 dark:text-slate-100">前端 vs 后端</h2>
					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
							<div className="mb-2 text-2xl">🎨</div>
							<h3 className="mb-2 font-bold text-blue-700 text-sm dark:text-blue-400">前端</h3>
							<ul className="space-y-1 text-slate-600 text-xs dark:text-slate-400">
								<li>• 浏览器运行</li>
								<li>• 用户可见</li>
								<li>• 界面交互</li>
							</ul>
						</div>
						<div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
							<div className="mb-2 text-2xl">⚙️</div>
							<h3 className="mb-2 font-bold text-green-700 text-sm dark:text-green-400">后端</h3>
							<ul className="space-y-1 text-slate-600 text-xs dark:text-slate-400">
								<li>• 服务器运行</li>
								<li>• 用户不可见</li>
								<li>• 数据处理</li>
							</ul>
						</div>
					</div>
				</section>

				{/* 核心技术详解 */}
				<section className="px-4 py-6">
					<h2 className="mb-4 font-bold text-responsive-xl text-slate-900 dark:text-slate-100">核心技术详解</h2>

					{/* HTML */}
					<div className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl dark:bg-orange-900">
								📄
							</div>
							<div>
								<h3 className="font-bold text-slate-900 dark:text-slate-100">HTML</h3>
								<p className="text-slate-500 text-xs">网页的骨架和结构</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["标签与元素", "语义化", "DOM结构", "超链接", "表单输入"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-orange-50 px-3 py-2 text-slate-700 text-xs dark:bg-orange-900/20 dark:text-slate-300"
								>
									• {item}
								</div>
							))}
						</div>
					</div>

					{/* CSS */}
					<div className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl dark:bg-blue-900">
								🎨
							</div>
							<div>
								<h3 className="font-bold text-slate-900 dark:text-slate-100">CSS</h3>
								<p className="text-slate-500 text-xs">网页的视觉表现</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["选择器", "盒模型", "Flex布局", "Grid网格", "动画过渡"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-blue-50 px-3 py-2 text-slate-700 text-xs dark:bg-blue-900/20 dark:text-slate-300"
								>
									• {item}
								</div>
							))}
						</div>
					</div>

					{/* JavaScript */}
					<div className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-2xl dark:bg-yellow-900">
								⚡
							</div>
							<div>
								<h3 className="font-bold text-slate-900 dark:text-slate-100">JavaScript</h3>
								<p className="text-slate-500 text-xs">网页的交互逻辑</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{["变量类型", "函数作用域", "异步编程", "DOM操作", "事件处理"].map((item) => (
								<div
									key={item}
									className="rounded-lg bg-yellow-50 px-3 py-2 text-slate-700 text-xs dark:bg-yellow-900/20 dark:text-slate-300"
								>
									• {item}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* 发展时间线 */}
				<section className="bg-white px-4 py-6 dark:bg-slate-800">
					<h2 className="mb-4 font-bold text-responsive-xl text-slate-900 dark:text-slate-100">📜 发展时间线</h2>
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
							<div key={item.year} className="flex gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-700">
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-2xl">
									{item.icon}
								</div>
								<div className="min-w-0 flex-1">
									<div className="font-bold text-purple-600 text-sm dark:text-purple-400">{item.year}</div>
									<h3 className="font-bold text-slate-900 text-sm dark:text-slate-100">{item.event}</h3>
									<p className="line-clamp-2 text-slate-600 text-xs dark:text-slate-400">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 前端四大载体 */}
				<section className="px-4 py-6">
					<h2 className="mb-4 font-bold text-responsive-xl text-slate-900 dark:text-slate-100">📱 前端四大载体</h2>
					<div className="space-y-3">
						{[
							{ name: "Web网页", icon: "🌐", desc: "运行在浏览器，跨平台访问", color: "blue" },
							{ name: "H5页面", icon: "📱", desc: "专为移动端优化的网页", color: "green" },
							{ name: "小程序", icon: "🔲", desc: "运行在超级App内的轻应用", color: "purple" },
							{ name: "原生App", icon: "📲", desc: "运行在操作系统上的应用", color: "orange" },
						].map((platform) => (
							<div
								key={platform.name}
								className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800"
							>
								<div
									className={`h-12 w-12 bg-${platform.color}-100 dark:bg-${platform.color}-900 flex items-center justify-center rounded-xl text-2xl`}
								>
									{platform.icon}
								</div>
								<div>
									<h3 className="font-bold text-slate-900 text-sm dark:text-slate-100">{platform.name}</h3>
									<p className="text-slate-500 text-xs">{platform.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 底部 CTA */}
				<section className="px-4 py-8">
					<Link
						href="/thoughts"
						className="block flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-center font-bold text-white active:scale-95"
					>
						切换到 PC 完整版 →
					</Link>
				</section>
			</div>
		</Layout>
	);
}

// 技术卡片组件
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
	const colorMap: Record<string, string> = {
		orange: "border-orange-400 dark:border-orange-600",
		blue: "border-blue-400 dark:border-blue-600",
		yellow: "border-yellow-400 dark:border-yellow-600",
	};

	return (
		<div
			className={`rounded-xl border-l-4 bg-white p-4 shadow-sm dark:bg-slate-800 ${colorMap[color] || "border-slate-400"}`}
		>
			<div className="flex items-center gap-3">
				<span className="text-2xl">{icon}</span>
				<div>
					<h3 className="font-bold text-slate-900 text-sm dark:text-slate-100">{title}</h3>
					<p className="text-slate-500 text-xs">{subtitle}</p>
				</div>
				<span className="ml-auto text-slate-400 text-xs">{desc}</span>
			</div>
		</div>
	);
}
