"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FrontendPlatformsBlock() {
	const [activePlatform, setActivePlatform] = useState("web");

	const platforms = [
		{
			id: "web",
			name: "Web网页",
			icon: "🌐",
			color: "blue",
			description: "运行在浏览器中的网页应用，通过URL访问，无需安装",
			features: ["跨平台访问", "无需安装", "SEO友好", "即时更新"],
		},
		{
			id: "h5",
			name: "H5页面",
			icon: "📱",
			color: "green",
			description: "专为移动端优化的网页，主要用于微信等社交平台传播",
			features: ["移动端优化", "轻量级", "易传播", "丰富动画"],
		},
		{
			id: "miniprogram",
			name: "小程序",
			icon: "🔲",
			color: "purple",
			description: "运行在微信/支付宝等超级App内的轻量级应用",
			features: ["无需下载", "接近原生体验", "平台能力", "流量优势"],
		},
		{
			id: "app",
			name: "原生App",
			icon: "📲",
			color: "orange",
			description: "运行在操作系统上的原生应用程序",
			features: ["最佳性能", "完整功能", "离线使用", "品牌独立"],
		},
	];

	const current = platforms.find((p) => p.id === activePlatform)!;

	return (
		<section className="frontend-platforms bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				{/* 标题区域 */}
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 font-semibold text-sm text-violet-700 dark:bg-violet-900 dark:text-violet-300">
						技术载体
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发的四大载体</h2>
				</div>

				{/* 平台选择 */}
				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{platforms.map((platform) => (
						<button
							key={platform.id}
							onClick={() => setActivePlatform(platform.id)}
							className={cn(
								"flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all",
								activePlatform === platform.id
									? `bg-${platform.color}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-2xl">{platform.icon}</span>
							<span>{platform.name}</span>
						</button>
					))}
				</div>

				{/* 平台详情 */}
				<div className="mx-auto max-w-4xl">
					<div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						<div className="mb-6 flex items-center gap-4">
							<div className="flex h-20 w-20 items-center justify-center rounded-xl bg-{current.color}-100 text-4xl">
								{current.icon}
							</div>
							<div className="flex-1">
								<h3 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">{current.name}</h3>
								<p className="text-slate-600 dark:text-slate-400">{current.description}</p>
							</div>
						</div>

						{/* 核心特性 */}
						<div className="mb-6">
							<h4 className="mb-3 font-bold text-lg text-slate-900 dark:text-slate-100">✨ 核心特性</h4>
							<div className="grid gap-3 md:grid-cols-2">
								{current.features.map((feature, index) => (
									<div key={index} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
										<span className="mt-1 text-{current.color}-500">✓</span>
										<span className="text-slate-700 text-sm dark:text-slate-300">{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
