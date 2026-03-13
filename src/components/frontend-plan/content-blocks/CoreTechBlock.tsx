"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CoreTechBlock() {
	const [activeTech, setActiveTech] = useState("html");

	const techs = [
		{
			id: "html",
			name: "HTML",
			icon: "📄",
			color: "orange",
			tagline: "网页的骨架和结构",
			description: "HTML（HyperText Markup Language）超文本标记语言，是构建网页的基础",
			features: ["标签和元素", "语义化标签", "文档对象模型（DOM）", "超链接和锚点", "表单和输入"],
		},
		{
			id: "css",
			name: "CSS",
			icon: "🎨",
			color: "blue",
			tagline: "网页的视觉表现",
			description: "CSS（Cascading Style Sheets）层叠样式表，用于描述HTML文档的呈现方式",
			features: ["选择器", "盒模型", "定位", "Flexbox", "Grid布局", "动画和过渡"],
		},
		{
			id: "javascript",
			name: "JavaScript",
			icon: "⚡",
			color: "yellow",
			tagline: "网页的交互逻辑",
			description: "JavaScript是一种轻量级的编程语言，最初为网页交互而设计",
			features: ["变量和数据类型", "函数和作用域", "异步编程", "DOM操作", "事件处理"],
		},
	];

	const current = techs.find((t) => t.id === activeTech)!;

	return (
		<section className="core-tech bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				{/* 标题区域 */}
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 font-semibold text-orange-700 text-sm dark:bg-orange-900 dark:text-orange-300">
						核心技术
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端三大核心技术</h2>
				</div>

				{/* 技术选择 */}
				<div className="mb-12 flex justify-center gap-4">
					{techs.map((tech) => (
						<button
							key={tech.id}
							onClick={() => setActiveTech(tech.id)}
							className={cn(
								"flex flex-col items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-all",
								activeTech === tech.id
									? `bg-${tech.color}-500 scale-105 text-white shadow-xl`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-3xl">{tech.icon}</span>
							<span className="text-xl">{tech.name}</span>
						</button>
					))}
				</div>

				{/* 技术详情 */}
				<div className="mx-auto max-w-6xl">
					<div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						<div className="mb-8 flex items-start gap-6">
							<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-{current.color}-100 text-5xl">
								{current.icon}
							</div>
							<div className="flex-1">
								<h3 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">
									{current.name} - {current.tagline}
								</h3>
								<p className="text-slate-600 dark:text-slate-400">{current.description}</p>
							</div>
						</div>

						{/* 核心特性 */}
						<div>
							<h4 className="mb-4 font-bold text-slate-900 text-xl dark:text-slate-100">🔑 核心概念</h4>
							<div className="grid gap-3 md:grid-cols-2">
								{current.features.map((feature, index) => (
									<div key={index} className="rounded-lg border-2 border-{current.color}-200 bg-{current.color}-50 p-4">
										<div className="flex items-start gap-2">
											<span className="mt-1 text-{current.color}-500">✓</span>
											<span className="text-slate-700 dark:text-slate-300">{feature}</span>
										</div>
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
