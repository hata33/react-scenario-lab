"use client";

import Link from "next/link";
import React, { useState } from "react";
import Layout from "@/components/Layout";

const RichTextHomePage = () => {
	const [activeDemo, setActiveDemo] = useState<string | null>(null);

	const editorCategories = [
		{
			id: "basic",
			title: "基础编辑功能",
			description: "文本操作、格式化、段落样式等基础功能",
			icon: "✏️",
			features: [
				{ name: "基础编辑器", path: "/rich-text/basic", description: "文本输入、撤销重做、复制粘贴" },
				{ name: "格式化工具", path: "/rich-text/formatting", description: "粗体、斜体、颜色、字体等格式化" },
				{ name: "段落样式", path: "/rich-text/paragraph", description: "标题、引用、列表、代码块" },
			],
			color: "from-blue-500 to-blue-600",
		},
		{
			id: "advanced",
			title: "高级编辑功能",
			description: "表格、链接、图片、媒体等高级功能",
			icon: "🚀",
			features: [
				{ name: "表格编辑器", path: "/rich-text/table", description: "插入、编辑、样式化表格" },
				{ name: "链接管理", path: "/rich-text/link", description: "插入、编辑、验证链接" },
				{ name: "图片处理", path: "/rich-text/image", description: "图片插入、编辑、调整" },
				{ name: "媒体支持", path: "/rich-text/media", description: "音频、视频、文件嵌入" },
			],
			color: "from-purple-500 to-purple-600",
		},
		{
			id: "extension",
			title: "扩展功能",
			description: "数学公式、图表、代码等扩展功能",
			icon: "🔧",
			features: [
				{ name: "数学公式", path: "/rich-text/formula", description: "LaTeX 公式编辑和渲染" },
				{ name: "图表支持", path: "/rich-text/chart", description: "流程图、思维导图、组织结构图" },
				{ name: "代码高亮", path: "/rich-text/code", description: "多语言代码高亮和格式化" },
			],
			color: "from-green-500 to-green-600",
		},
		{
			id: "collaboration",
			title: "协作功能",
			description: "多人编辑、评论系统、版本控制",
			icon: "👥",
			features: [
				{ name: "实时协作", path: "/rich-text/collaboration", description: "多人实时编辑和光标跟踪" },
				{ name: "评论系统", path: "/rich-text/comment", description: "行内评论和讨论功能" },
				{ name: "版本控制", path: "/rich-text/version", description: "版本历史和变更记录" },
			],
			color: "from-orange-500 to-orange-600",
		},
		{
			id: "import-export",
			title: "导入导出",
			description: "多格式支持、样式处理、批量操作",
			icon: "📊",
			features: [
				{ name: "格式转换", path: "/rich-text/convert", description: "HTML、Markdown、Word、PDF" },
				{ name: "样式处理", path: "/rich-text/style", description: "CSS样式保持和转换" },
				{ name: "批量处理", path: "/rich-text/batch", description: "批量导入导出和转换" },
			],
			color: "from-red-500 to-red-600",
		},
		{
			id: "mobile",
			title: "移动端适配",
			description: "触摸优化、响应式设计、性能优化",
			icon: "📱",
			features: [
				{ name: "移动端编辑器", path: "/rich-text/mobile", description: "触摸优化和手势支持" },
				{ name: "响应式设计", path: "/rich-text/responsive", description: "多设备适配和布局" },
				{ name: "性能优化", path: "/rich-text/performance", description: "渲染优化和内存管理" },
			],
			color: "from-indigo-500 to-indigo-600",
		},
	];

	const FeaturedDemo = ({ category }: { category: any }) => {
		if (activeDemo !== category.id) return null;

		return (
			<div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
				<div className="mb-3 flex items-center justify-between">
					<h4 className="font-medium text-gray-900">{category.title} - 功能预览</h4>
					<button onClick={() => setActiveDemo(null)} className="text-gray-400 hover:text-gray-600">
						✕
					</button>
				</div>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
					{category.features.map((feature: any) => (
						<Link
							key={feature.path}
							href={feature.path}
							className="rounded border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm"
						>
							<div className="mb-1 font-medium text-gray-900">{feature.name}</div>
							<div className="text-gray-600 text-sm">{feature.description}</div>
						</Link>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="mx-auto max-w-7xl p-6">
			{/* 头部介绍 */}
			<div className="mb-8 text-center">
				<h1 className="mb-4 font-bold text-3xl text-gray-900">企业级富文本编辑器</h1>
				<p className="mx-auto mb-6 max-w-3xl text-gray-600 text-lg">
					一套完整的富文本编辑器解决方案，从基础文本编辑到高级协作功能， 帮助开发者构建功能强大、性能优异的编辑器。
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-green-500"></span>
						React + TypeScript
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-blue-500"></span>
						Slate.js / Quill.js
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-purple-500"></span>
						实时协作
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-orange-500"></span>
						企业级功能
					</div>
				</div>
			</div>

			{/* 编辑器分类展示 */}
			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{editorCategories.map((category) => (
					<div
						key={category.id}
						className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
					>
						<div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
							<div className="flex items-center gap-3">
								<span className="text-2xl">{category.icon}</span>
								<div>
									<h3 className="font-semibold text-lg">{category.title}</h3>
									<p className="text-sm text-white/90">{category.description}</p>
								</div>
							</div>
						</div>
						<div className="p-4">
							<div className="space-y-2">
								{category.features.slice(0, 3).map((feature) => (
									<div key={feature.path} className="flex items-center justify-between py-2">
										<div className="flex-1">
											<Link href={feature.path} className="font-medium text-gray-900 hover:text-blue-600">
												{feature.name}
											</Link>
											<p className="mt-1 text-gray-500 text-xs">{feature.description}</p>
										</div>
										<svg
											className="ml-2 h-4 w-4 flex-shrink-0 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								))}
							</div>
							{category.features.length > 3 && (
								<button
									onClick={() => setActiveDemo(activeDemo === category.id ? null : category.id)}
									className="mt-3 font-medium text-blue-600 text-sm hover:text-blue-700"
								>
									{activeDemo === category.id ? "收起" : `查看全部 ${category.features.length} 个功能`}
								</button>
							)}
						</div>
					</div>
				))}
			</div>

			{/* 功能预览区域 */}
			{editorCategories.map((category) => (
				<FeaturedDemo key={category.id} category={category} />
			))}

			{/* 技术栈介绍 */}
			<div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
				<h3 className="mb-6 font-semibold text-gray-900 text-xl">技术栈与架构</h3>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<h4 className="mb-3 font-medium text-gray-900">核心技术</h4>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>• React + TypeScript</li>
							<li>• Slate.js / Quill.js</li>
							<li>• ProseMirror / Draft.js</li>
							<li>• ContentEditable API</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-3 font-medium text-gray-900">渲染引擎</h4>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>• 自定义渲染系统</li>
							<li>• 节点操作优化</li>
							<li>• 选择管理</li>
							<li>• 光标控制</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-3 font-medium text-gray-900">扩展功能</h4>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>• KaTeX / MathJax</li>
							<li>• Mermaid.js</li>
							<li>• Prism.js</li>
							<li>• Socket.io (协作)</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-3 font-medium text-gray-900">性能优化</h4>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>• 虚拟滚动</li>
							<li>• 增量渲染</li>
							<li>• 内存管理</li>
							<li>• 懒加载机制</li>
						</ul>
					</div>
				</div>
			</div>

			{/* 快速开始 */}
			<div className="mt-8 text-center">
				<Link
					href="/rich-text/basic"
					className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
				>
					开始使用富文本编辑器
					<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</Link>
			</div>
		</div>
	);
};

export default RichTextHomePage;
