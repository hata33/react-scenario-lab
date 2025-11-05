"use client";

import Link from "next/link";

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
				"文档导出功能",
			],
		},
		{
			id: "collaborative",
			title: "协作编辑 (计划中)",
			description: "多人实时编辑，冲突解决，版本管理",
			icon: "👥",
			path: "#",
			color: "from-purple-500 to-purple-600",
			features: ["实时协作编辑", "用户光标跟踪", "冲突自动解决", "版本历史记录", "评论系统", "权限管理"],
		},
		{
			id: "advanced",
			title: "高级功能 (计划中)",
			description: "数学公式、图表、插件系统等扩展功能",
			icon: "🚀",
			path: "#",
			color: "from-green-500 to-green-600",
			features: ["数学公式渲染", "图表和流程图", "插件系统架构", "自定义语法扩展", "批量操作", "性能优化"],
		},
		{
			id: "mobile",
			title: "移动端适配 (计划中)",
			description: "触摸优化、响应式设计、移动端功能",
			icon: "📱",
			path: "#",
			color: "from-orange-500 to-orange-600",
			features: ["移动端编辑器", "触摸手势支持", "响应式布局", "离线编辑支持", "移动端预览", "性能优化"],
		},
	];

	return (
		<div className="mx-auto max-w-7xl p-6">
			{/* 页面标题 */}
			<div className="mb-12 text-center">
				<h1 className="mb-4 font-bold text-4xl text-gray-900">Markdown 编辑器</h1>
				<p className="mx-auto max-w-3xl text-gray-600 text-xl">
					一套完整的 Markdown 编辑器解决方案，专注于实用功能和优秀的编辑体验
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-4">
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-green-500"></span>
						<span>实时预览</span>
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-blue-500"></span>
						<span>语法高亮</span>
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-purple-500"></span>
						<span>工具栏</span>
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span className="h-2 w-2 rounded-full bg-orange-500"></span>
						<span>快捷键</span>
					</div>
				</div>
			</div>

			{/* 功能卡片 */}
			<div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{markdownFeatures.map((feature) => (
					<div
						key={feature.id}
						className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
					>
						<div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
							<div className="flex items-center gap-3">
								<span className="text-3xl">{feature.icon}</span>
								<div>
									<h3 className="font-bold text-lg">{feature.title}</h3>
									<p className="mt-1 text-sm text-white/90">{feature.description}</p>
								</div>
							</div>
						</div>
						<div className="p-6">
							<ul className="space-y-2">
								{feature.features.map((item, index) => (
									<li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
										<span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
							<div className="mt-4">
								{feature.path !== "#" ? (
									<Link
										href={feature.path}
										className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
									>
										使用编辑器
										<svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 7l5 5m0 0l-5 5m0 0V5m0 0v5m0 0L8 12"
											/>
										</svg>
									</Link>
								) : (
									<div className="inline-flex cursor-not-allowed items-center rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-500 text-sm">
										开发中
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* 技术实现介绍 */}
			<div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-8">
				<h2 className="mb-6 font-bold text-2xl text-gray-900">技术实现</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<h3 className="mb-3 font-semibold text-gray-900">核心技术</h3>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>React + TypeScript</li>
							<li>react-markdown</li>
							<li>remark-gfm</li>
							<li>rehype-highlight</li>
							<li>react-icons</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-3 font-semibold text-gray-900">编辑器特性</h3>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>实时预览渲染</li>
							<li>滚动位置同步</li>
							<li>语法高亮引擎</li>
							<li>工具栏快捷操作</li>
							<li>键盘快捷键</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-3 font-semibold text-gray-900">性能优化</h3>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li>增量渲染</li>
							<li>防抖处理</li>
							<li>虚拟化支持</li>
							<li>内存管理</li>
							<li>响应式设计</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-3 font-semibold text-gray-900">扩展能力</h3>
						<ul className="space-y-2 text-gray-600 text-sm">
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
			<div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<h2 className="mb-6 font-bold text-2xl text-gray-900">适用场景</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V6l-6 6v-4z" />
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">博客文章</h3>
						</div>
						<p className="text-gray-600 text-sm">
							适合技术博客、个人网站等文章发布场景，支持实时预览和丰富的 Markdown 语法。
						</p>
					</div>
					<div>
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v5a2 2 0 002 2h5.586a1 1 0 00.707.293l6.414-6.414a1 1 0 00-1.414 0l-6.414 6.414A1 1 0 0012.828 0zM12 4.414V6a2 2 0 012 2v6a2 2 0 012 2h5.586a1 1 0 00.707.293l6.414-6.414A1 1 0 0012.828 0z" />
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">项目文档</h3>
						</div>
						<p className="text-gray-600 text-sm">适用于项目文档、API 文档、技术规范等，支持代码高亮和表格编辑。</p>
					</div>
					<div>
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 6.253v13m0-13C10.832 5.477 9.246 4.09 7.75 4.09L3 19l9 13 22v-13h4.132l.015.04m.015-3.863V5.254c0-1.058.95-2.008 2.008S9.696 4.008 8.008 4.008h.015z" />
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">技术分享</h3>
						</div>
						<p className="text-gray-600 text-sm">技术博客、教程文档、笔记分享，支持代码块高亮和数学公式。</p>
					</div>
					<div>
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
								<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M4 19.5A2.5 2.5 0 016.5 17c0 1.65 1.35 3 3 3h3a2.5 2.5 0 012.5-2.5c0-1.65-1.35-3-3-3H8c-.534 0-1.036.117-1.5.322l-.404.198c-.527-.265-.832-.482-.993-.482-1.618 0-3.078 2.414-3.078H4zm3 0c0 1.302.838 2.42 2.414 3.078A2.5 2.5 0 019.5 17V6.5c0-1.65-1.35-3-3-3H8c-.534 0-1.036.117-1.5.322l-.404.198c-.527-.265-.832-.482-.993-.482-1.618 0-3.078 2.414-3.078H4z" />
								</svg>
							</div>
							<h3 className="font-semibold text-gray-900">知识管理</h3>
						</div>
						<p className="text-gray-600 text-sm">个人知识库、笔记整理、文档归档，支持标签分类和全文搜索。</p>
					</div>
				</div>
			</div>

			{/* 开发路线图 */}
			<div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<h2 className="mb-6 font-bold text-2xl text-gray-900">开发路线</h2>
				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
							✓
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 1: 基础功能 ✅</h3>
							<p className="mt-1 text-gray-600 text-sm">实时预览、工具栏、语法高亮、键盘快捷键、导出功能</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
							🔄
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 2: 增强功能 (计划中)</h3>
							<p className="mt-1 text-gray-600 text-sm">图片上传、表格编辑器、数学公式、任务列表、版本历史</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600">
							🚀
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Phase 3: 高级功能 (计划中)</h3>
							<p className="mt-1 text-gray-600 text-sm">协作编辑、插件系统、API接口、移动端优化</p>
						</div>
					</div>
				</div>
			</div>

			{/* 快速开始 */}
			<div className="text-center">
				<Link
					href="/markdown/editor"
					className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-lg text-white shadow-sm transition-colors hover:bg-blue-700"
				>
					开始使用 Markdown 编辑器
					<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m0 0V5m0 0L8 12" />
					</svg>
				</Link>
			</div>
		</div>
	);
};

export default MarkdownHomePage;
