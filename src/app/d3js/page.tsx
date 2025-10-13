"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const d3jsPageData = [
	{
		title: "多层级节点关系",
		description: "交互式的力导向图，展示复杂的多层级节点关系",
		href: "/d3js/multi-level-nodes",
		features: ["力导向布局", "节点拖拽", "缩放控制", "搜索过滤"],
		status: "completed",
	},
	{
		title: "新风格力导向图",
		description: "现代化的力导向图设计，支持自定义样式和动画",
		href: "/d3js/new-style-graph",
		features: ["自定义样式", "动画效果", "主题切换", "数据导入导出"],
		status: "planned",
	},
];

export default function D3jsPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<div className="flex items-center mb-4">
						<Link
							href="/"
							className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							返回首页
						</Link>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">D3.js 可视化</h1>
					<p className="text-gray-600">探索数据可视化的无限可能，使用D3.js创建交互式图表</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{d3jsPageData.map((item, index) => (
						<Link key={index} href={item.href}>
							<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 h-full">
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<h3 className="text-xl font-semibold text-gray-900">
											{item.title}
										</h3>
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${
												item.status === "completed"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{item.status === "completed" ? "已完成" : "计划中"}
										</span>
									</div>
									<p className="text-gray-600 text-sm mb-3">
										{item.description}
									</p>
								</div>
								<div className="space-y-3">
									<h4 className="font-medium text-gray-900">主要功能：</h4>
									<ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
										{item.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center">
												<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
												{feature}
											</li>
										))}
									</ul>
								</div>
								{item.status === "planned" && (
									<div className="mt-4 p-3 bg-yellow-50 rounded-lg">
										<p className="text-sm text-yellow-800">
											🚧 此功能正在开发中，敬请期待！
										</p>
									</div>
								)}
							</div>
						</Link>
					))}
				</div>

				<div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">关于 D3.js</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								什么是 D3.js？
							</h3>
							<p className="text-gray-600 mb-4">
								D3.js（Data-Driven Documents）是一个强大的JavaScript库，用于使用数据操作文档。
								它可以帮助你将数据带入生活，使用HTML、SVG和CSS创建动态、交互式的数据可视化。
							</p>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								核心特性
							</h3>
							<ul className="space-y-2 text-gray-600">
								<li className="flex items-start">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
									<span>数据驱动：绑定任意数据到DOM，并应用转换</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
									<span>选择器：使用强大的选择器操作DOM元素</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
									<span>动态属性：响应式属性和样式计算</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
									<span>过渡和动画：平滑的过渡效果和动画</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								技术栈
							</h3>
							<div className="space-y-4">
								<div className="flex items-center">
									<div className="text-2xl font-bold text-blue-600 mr-3">D3.js v7</div>
									<span className="text-gray-600">数据可视化核心库</span>
								</div>
								<div className="flex items-center">
									<div className="text-2xl font-bold text-green-600 mr-3">TypeScript</div>
									<span className="text-gray-600">类型安全保障</span>
								</div>
								<div className="flex items-center">
									<div className="text-2xl font-bold text-purple-600 mr-3">React 19</div>
									<span className="text-gray-600">现代化组件框架</span>
								</div>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
								应用场景
							</h3>
							<ul className="space-y-2 text-gray-600">
								<li className="flex items-start">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span>
									<span>网络关系图和组织架构图</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span>
									<span>数据仪表板和报表系统</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span>
									<span>地理信息可视化</span>
								</li>
								<li className="flex items-start">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span>
									<span>实时数据监控和分析</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-8 p-6 bg-blue-50 rounded-lg">
					<h3 className="text-lg font-semibold text-blue-900 mb-3">
						🎯 开发计划
					</h3>
					<p className="text-blue-800 mb-4">
						我们正在积极开发更多D3.js可视化组件，包括各种图表类型、交互功能和高级特性。
						所有功能都将支持TypeScript、响应式设计和自定义主题。
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
						<div>
							<h4 className="font-semibold mb-2">基础图表</h4>
							<ul className="space-y-1">
								<li>• 柱状图和条形图</li>
								<li>• 饼图和环形图</li>
								<li>• 折线图和面积图</li>
								<li>• 散点图和气泡图</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-2">高级功能</h4>
							<ul className="space-y-1">
								<li>• 3D可视化</li>
								<li>• 地理图表</li>
								<li>• 树状图和旭日图</li>
								<li>• 桑基图和弦图</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-2">交互特性</h4>
							<ul className="space-y-1">
								<li>• 实时数据更新</li>
								<li>• 主题切换</li>
								<li>• 数据导出</li>
								<li>• 移动端适配</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}