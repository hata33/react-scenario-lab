"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const MarkdownHomePage = () => {
	const markdownFeatures = [
		{
			id: "editor",
			title: "实时预览编辑器",
			description: "左右分屏显示，支持实时预览和滚动同步",
			icon: "📝",
			path: "/markdown/editor",
			color: "from-blue-500 to-blue-600",
			features: [
				"实时 Markdown 预览",
				"语法高亮显示",
				"工具栏快捷操作",
				"键盘快捷键支持",
				"滚动位置同步",
				"文档导出功能"
			]
		},
		{
			id: "collaborative",
			title: "协作编辑 (计划中)",
			description: "多人实时编辑，冲突解决，版本管理",
			icon: "👥",
			path: "#",
			color: "from-purple-500 to-purple-600",
			features: [
				"实时协作编辑",
				"用户光标跟踪",
				"冲突自动解决",
				"版本历史记录",
				"评论系统",
				"权限管理"
			]
		},
		{
			id: "advanced",
			title: "高级功能 (计划中)",
			description: "数学公式、图表、插件系统等扩展功能",
			icon: "🚀",
			path: "#",
			color: "from-green-500 to-green-600",
			features: [
				"数学公式渲染",
				"图表和流程图",
				"插件系统架构",
				"自定义语法扩展",
				"批量操作",
				"性能优化"
			]
		},
		{
			id: "mobile",
			title: "移动端适配 (计划中)",
			description: "触摸优化、响应式设计、移动端功能",
			icon: "📱",
			path: "#",
			color: "from-orange-500 to-orange-600",
			features: [
				"移动端编辑器",
				"触摸手势支持",
				"响应式布局",
				"离线编辑支持",
				"移动端预览",
				"性能优化"
			]
		}
	];

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* 页面标题 */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Markdown 编辑器
				</h1>
				<p className="text-xl text-gray-600 max-w-3xl mx-auto">
					一套完整的 Markdown 编辑器解决方案，专注于实用功能和优秀的编辑体验
				</p>
				<div className="flex flex-wrap justify-center gap-4 mt-6">
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<span className="w-2 h-2 bg-green-500 rounded-full"></span>
						<span>实时预览</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
						<span>语法高亮</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<span className="w-2 h-2 bg-purple-500 rounded-full"></span>
						<span>工具栏</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<span className="w-2 h-2 bg-orange-500 rounded-full"></span>
						<span>快捷键</span>
					</div>
				</div>
			</div>

			{/* 功能卡片 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
				{markdownFeatures.map((feature) => (
					<div
						key={feature.id}
						className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
					>
						<div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
							<div className="flex items-center gap-3">
								<span className="text-3xl">{feature.icon}</span>
								<div>
									<h3 className="font-bold text-lg">{feature.title}</h3>
									<p className="text-white/90 text-sm mt-1">
										{feature.description}
									</p>
								</div>
							</div>
						</div>
						<div className="p-6">
							<ul className="space-y-2">
								{feature.features.map((item, index) => (
									<li key={index} className="flex items-start gap-2 text-sm text-gray-600">
										<span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
							<div className="mt-4">
								{feature.path !== "#" ? (
									<Link
										href={feature.path}
										className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
									>
										使用编辑器
										<svg
											className="w-4 h-4 ml-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 7l5 5m0 0l-5 5m0 0V5m0 0v5m0 0L8 12"
											/>
										</svg>
									</Link>
								) : (
									<div className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
										开发中
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* 技术实现介绍 */}
			<div className="bg-gray-50 rounded-xl border border-gray-200 p-8 mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">技术实现</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div>
						<h3 className="font-semibold text-gray-900 mb-3">核心技术</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>React + TypeScript</li>
							<li>react-markdown</li>
							<li>remark-gfm</li>
							<li>rehype-highlight</li>
							<li>react-icons</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 mb-3">编辑器特性</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>实时预览渲染</li>
							<li>滚动位置同步</li>
							<li>语法高亮引擎</li>
							<li>工具栏快捷操作</li>
							<li>键盘快捷键</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 mb-3">性能优化</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>增量渲染</li>
							<li>防抖处理</li>
							<li>虚拟化支持</li>
							<li>内存管理</li>
							<li>响应式设计</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 mb-3">扩展能力</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>插件化架构</li>
							<li>自定义语法扩展</li>
							<li>主题系统</li>
							<li>国际化支持</li>
							<li>API接口</li>
						</ul>
					</div>
				</div>
			</div>

			{/* 使用场景 */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">适用场景</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V6l-6 6v-4z"/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">博客文章</h3>
						</div>
						<p className="text-sm text-gray-600">
							适合技术博客、个人网站等文章发布场景，支持实时预览和丰富的 Markdown 语法。
						</p>
					</div>
					<div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v5a2 2 0 002 2h5.586a1 1 0 00.707.293l6.414-6.414a1 1 0 00-1.414 0l-6.414 6.414A1 1 0 0012.828 0zM12 4.414V6a2 2 0 012 2v6a2 2 0 012 2h5.586a1 1 0 00.707.293l6.414-6.414A1 1 0 0012.828 0z"/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">项目文档</h3>
						</div>
						<p className="text-sm text-gray-600">
							适用于项目文档、API 文档、技术规范等，支持代码高亮和表格编辑。
						</p>
					</div>
					<div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 6.253v13m0-13C10.832 5.477 9.246 4.09 7.75 4.09L3 19l9 13 22v-13h4.132l.015.04m.015-3.863V5.254c0-1.058.95-2.008 2.008S9.696 4.008 8.008 4.008h.015z"/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">技术分享</h3>
						</div>
						<p className="text-sm text-gray-600">
							技术博客、教程文档、笔记分享，支持代码块高亮和数学公式。
						</p>
					</div>
					<div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M4 19.5A2.5 2.5 0 016.5 17c0 1.65 1.35 3 3 3h3a2.5 2.5 0 012.5-2.5c0-1.65-1.35-3-3-3H8c-.534 0-1.036.117-1.5.322l-.404.198c-.527-.265-.832-.482-.993-.482-1.618 0-3.078 2.414-3.078H4zm3 0c0 1.302.838 2.42 2.414 3.078A2.5 2.5 0 019.5 17V6.5c0-1.65-1.35-3-3-3H8c-.534 0-1.036.117-1.5.322l-.404.198c-.527-.265-.832-.482-.993-.482-1.618 0-3.078 2.414-3.078H4z"/>
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">知识管理</h3>
						</div>
						<p className="text-sm text-gray-600">
							个人知识库、笔记整理、文档归档，支持标签分类和全文搜索。
						</p>
					</div>
				</div>
			</div>

			{/* 开发路线图 */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">开发路线</h2>
				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
							✓
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 1: 基础功能 ✅</h3>
							<p className="text-sm text-gray-600 mt-1">
								实时预览、工具栏、语法高亮、键盘快捷键、导出功能
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
							🔄
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 2: 增强功能 (计划中)</h3>
							<p className="text-sm text-gray-600 mt-1">
								图片上传、表格编辑器、数学公式、任务列表、版本历史
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
							🚀
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 3: 高级功能 (计划中)</h3>
							<p className="text-sm text-gray-600 mt-1">
								协作编辑、插件系统、API接口、移动端优化
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* 快速开始 */}
			<div className="text-center">
				<Link
					href="/markdown/editor"
					className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
				>
					开始使用 Markdown 编辑器
					<svg
						className="w-5 h-5 ml-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7l5 5m0 0l-5 5m0 0V5m0 0L8 12"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
};

export default MarkdownHomePage;