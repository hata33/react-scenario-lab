"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FrontendResponsibilitiesBlock() {
	const [activeTab, setActiveTab] = useState(0);

	const responsibilities = [
		{
			id: "ui-dev",
			title: "UI界面开发",
			icon: "🎨",
			color: "blue",
			description: "将设计师的视觉稿还原为代码，实现用户界面的每个细节",
			tasks: ["使用HTML/CSS实现页面结构和样式", "实现响应式布局，适配各种屏幕尺寸", "实现复杂动画和过渡效果"],
			skills: ["HTML5语义化", "CSS3布局（Flex/Grid）", "响应式设计"],
		},
		{
			id: "interaction",
			title: "交互逻辑实现",
			icon: "⚡",
			color: "green",
			description: "使用JavaScript实现用户操作响应和页面动态效果",
			tasks: ["实现表单验证和提交", "处理用户点击、滑动等交互事件", "与后端API对接和数据交互"],
			skills: ["JavaScript/TypeScript", "DOM操作", "事件处理", "状态管理"],
		},
		{
			id: "performance",
			title: "性能优化",
			icon: "🚀",
			color: "purple",
			description: "优化页面加载速度和运行性能，提升用户体验",
			tasks: ["优化首屏加载时间（FCP/LCP）", "减少资源体积和HTTP请求数", "实现懒加载和代码分割"],
			skills: ["Performance API", "浏览器渲染原理", "缓存策略"],
		},
	];

	return (
		<section className="frontend-responsibilities bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				{/* 标题区域 */}
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 font-semibold text-amber-700 text-sm dark:bg-amber-900 dark:text-amber-300">
						工作内容
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发者的一天</h2>
				</div>

				{/* 标签导航 */}
				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{responsibilities.map((resp, index) => (
						<button
							key={resp.id}
							onClick={() => setActiveTab(index)}
							className={cn(
								"flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm transition-all",
								activeTab === index
									? `bg-${resp.color}-500 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-lg">{resp.icon}</span>
							<span>{resp.title}</span>
						</button>
					))}
				</div>

				{/* 详情内容 */}
				<div className="mx-auto max-w-5xl">
					<div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						<div className="mb-6 flex items-start gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-{current.color}-100 text-3xl dark:bg-{current.color}-900">
								{responsibilities[activeTab].icon}
							</div>
							<div className="flex-1">
								<h4 className="font-bold text-2xl text-slate-900 dark:text-slate-100">
									{responsibilities[activeTab].title}
								</h4>
								<p className="text-slate-600 dark:text-slate-400">{responsibilities[activeTab].description}</p>
							</div>
						</div>

						{/* 具体任务 */}
						<div className="mb-6">
							<h5 className="mb-3 font-bold text-slate-900 dark:text-slate-100">📝 具体任务</h5>
							<div className="grid gap-3 md:grid-cols-2">
								{responsibilities[activeTab].tasks.map((task, index) => (
									<div key={index} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
										<span className="mt-1 text-{current.color}-500">✓</span>
										<span className="text-slate-700 text-sm dark:text-slate-300">{task}</span>
									</div>
								))}
							</div>
						</div>

						{/* 核心技能 */}
						<div>
							<h5 className="mb-3 font-bold text-slate-900 dark:text-slate-100">💡 核心技能</h5>
							<div className="flex flex-wrap gap-2">
								{responsibilities[activeTab].skills.map((skill, index) => (
									<span
										key={index}
										className="rounded-full bg-{current.color}-100 px-3 py-1 text-sm text-{current.color}-700"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
