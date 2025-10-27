"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function OwnerStackPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Owner Stack 调试 - React 19 新特性
						</h1>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
								🔍 3W 法则解析
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">
										What - 它是什么？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										Owner Stack 是 React 19 中新的调试机制，能够清晰显示组件的所有权关系，帮助开发者快速定位问题源头。
									</p>
								</div>
								<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-300">
										Why - 为什么需要？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统调试中组件层级复杂、状态传递路径不清晰、错误追踪困难等问题，提供更直观的调试体验。
									</p>
								</div>
								<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300">
										When - 何时使用？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										组件调试、性能分析、错误排查、状态追踪等需要理解组件关系和调用链的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Owner Stack 基础演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							Owner Stack 基础演示
						</h2>
						<div className="grid lg:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
									🚫 传统调试的困境
								</h3>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
											传统调试痛点：
										</p>
										<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
											<li>• 组件层级复杂难以追踪</li>
											<li>• 状态传递路径不明确</li>
											<li>• 错误源头定位困难</li>
											<li>• 调用链路可视化不足</li>
										</ul>
									</div>
									<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
										<p className="text-sm font-medium text-red-800 dark:text-red-300">
											❌ 常见问题：
										</p>
										<ul className="text-sm text-red-700 dark:text-red-400 mt-2">
											<li>• "这个 props 从哪来的？"</li>
											<li>• "为什么组件会重新渲染？"</li>
											<li>• "错误发生在哪个层级？"</li>
											<li>• "状态是如何变化的？"</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
									✅ Owner Stack 的优势
								</h3>
								<div className="space-y-4">
									<OwnerStackDemo />
								</div>
							</div>
						</div>
					</div>

					 {/* 复杂组件树演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							复杂组件树调试
						</h2>
						<ComplexComponentTreeDemo />
					</div>

					{/* 性能分析演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							性能分析与优化
						</h2>
						<PerformanceAnalysisDemo />
					</div>

					{/* 错误追踪演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							错误追踪与调试
						</h2>
						<ErrorTrackingDemo />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							调试最佳实践
						</h2>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
										✅ 推荐做法
									</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												利用 Owner Stack 追踪状态传递
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												分析组件渲染性能瓶颈
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												快速定位错误源头
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												优化组件结构设计
											</span>
										</li>
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
										❌ 避免做法
									</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												过度依赖调试工具
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽略组件设计原则
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												在生产环境保留调试信息
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽视性能优化建议
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// Owner Stack 基础演示组件
function OwnerStackDemo() {
	const [debugMode, setDebugMode] = useState(false);
	const [componentState, setComponentState] = useState({
		app: "initialized",
		parent: "ready",
		child: "loading",
	});

	// 模拟 Owner Stack 信息
	const ownerStackInfo = [
		{ component: "App", props: { debugMode }, state: componentState.app },
		{ component: "ParentComponent", props: { mode: "demo" }, state: componentState.parent },
		{ component: "ChildComponent", props: { data: "test" }, state: componentState.child },
	];

	const updateChildState = () => {
		setComponentState(prev => ({
			...prev,
			child: prev.child === "loading" ? "loaded" : "loading",
		}));
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setDebugMode(!debugMode)}
					className={`px-4 py-2 rounded-lg transition-colors ${
						debugMode
							? "bg-purple-600 text-white hover:bg-purple-700"
							: "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{debugMode ? "关闭" : "开启"} 调试模式
				</button>
				<button
					onClick={updateChildState}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					更新子组件状态
				</button>
			</div>

			{debugMode && (
				<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
					<h4 className="font-medium text-purple-800 dark:text-purple-300 mb-3">
						🔍 Owner Stack 信息：
					</h4>
					<div className="space-y-2">
						{ownerStackInfo.map((owner, index) => (
							<div
								key={owner.component}
								className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-700"
							>
								<span className="text-purple-600 dark:text-purple-400 font-mono text-sm">
									{"".padStart(index * 2, "→")}
								</span>
								<div className="flex-1">
									<span className="font-medium text-gray-800 dark:text-white">
										{owner.component}
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
										state: {owner.state}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
				<p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
					🎯 Owner Stack 的优势：
				</p>
				<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
					<li>• 清晰的组件层级关系</li>
					<li>• 实时的状态追踪</li>
					<li>• 详细的 props 传递信息</li>
					<li>• 直观的调用链路展示</li>
				</ul>
			</div>
		</div>
	);
}

// 复杂组件树演示组件
function ComplexComponentTreeDemo() {
	const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
	const [highlightPath, setHighlightPath] = useState(false);

	// 模拟复杂的组件树结构
	const componentTree = {
		name: "App",
		children: [
			{
				name: "Header",
				children: [
					{ name: "Logo", children: [] },
					{ name: "Navigation", children: [
						{ name: "NavItem", children: [] },
						{ name: "NavItem", children: [] }
					]}
				]
			},
			{
				name: "MainContent",
				children: [
					{
						name: "Sidebar",
						children: [
							{ name: "UserProfile", children: [] },
							{ name: "MenuList", children: [] }
						]
					},
					{
						name: "ContentArea",
						children: [
							{ name: "ArticleList", children: [
								{ name: "ArticleCard", children: [] },
								{ name: "ArticleCard", children: [] }
							]},
							{ name: "Footer", children: [] }
						]
					}
				]
			}
		]
	};

	const renderComponentNode = (node: any, depth = 0, path = "") => {
		const currentPath = path ? `${path}/${node.name}` : node.name;
		const isSelected = selectedComponent === currentPath;
		const isInPath = highlightPath && currentPath.includes(selectedComponent || "");

		return (
			<div key={currentPath} className="ml-4">
				<div
					className={`p-2 rounded cursor-pointer transition-colors mb-1 ${
						isSelected
							? "bg-purple-200 dark:bg-purple-800 border-2 border-purple-500"
							: isInPath
							? "bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-300"
							: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
					}`}
					onClick={() => setSelectedComponent(currentPath)}
				>
					<span className="text-sm font-medium text-gray-800 dark:text-white">
						{"".padStart(depth * 2, "→")} {node.name}
					</span>
				</div>
				{node.children.map((child: any) =>
					renderComponentNode(child, depth + 1, currentPath)
				)}
			</div>
		);
	};

	const getOwnerPath = (componentPath: string) => {
		return componentPath.split("/").slice(0, -1).join(" → ");
	};

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					🌳 组件树结构
				</h3>
				<div className="mb-4">
					<button
						onClick={() => setHighlightPath(!highlightPath)}
						className={`px-3 py-1 text-sm rounded transition-colors ${
							highlightPath
								? "bg-purple-600 text-white hover:bg-purple-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{highlightPath ? "关闭" : "开启"} 路径高亮
					</button>
				</div>
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-96 overflow-auto">
					{renderComponentNode(componentTree)}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					📋 Owner Stack 信息
				</h3>
				{selectedComponent ? (
					<div className="space-y-4">
						<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
								选中组件：
							</h4>
							<p className="text-purple-700 dark:text-purple-400 font-mono">
								{selectedComponent}
							</p>
						</div>

						<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
								Owner 路径：
							</h4>
							<p className="text-blue-700 dark:text-blue-400 font-mono text-sm">
								{getOwnerPath(selectedComponent) || "根组件"}
							</p>
						</div>

						<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
								组件信息：
							</h4>
							<ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
								<li>• 深度: {selectedComponent.split("/").length - 1}</li>
								<li>• 父组件: {selectedComponent.split("/").slice(-2, -1)[0] || "无"}</li>
								<li>• 子组件数量: {selectedComponent.includes("Article") ? 0 : "N/A"}</li>
								<li>• 渲染时间: {Math.random() * 10 + 1 | 0}ms</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
						<p className="text-gray-500 dark:text-gray-400">
							点击左侧组件查看 Owner Stack 信息
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

// 性能分析演示组件
function PerformanceAnalysisDemo() {
	const [analysisMode, setAnalysisMode] = useState(false);
	const [selectedMetric, setSelectedMetric] = useState<"render-time" | "re-renders" | "props-size">("render-time");

	const performanceData = {
		"render-time": [
			{ component: "App", time: 5.2, status: "good" },
			{ component: "Header", time: 2.1, status: "good" },
			{ component: "MainContent", time: 8.7, status: "warning" },
			{ component: "ArticleList", time: 15.3, status: "critical" },
			{ component: "ArticleCard", time: 3.8, status: "good" },
		],
		"re-renders": [
			{ component: "App", count: 1, status: "good" },
			{ component: "Header", count: 3, status: "good" },
			{ component: "MainContent", count: 12, status: "warning" },
			{ component: "ArticleList", count: 25, status: "critical" },
			{ component: "ArticleCard", count: 50, status: "critical" },
		],
		"props-size": [
			{ component: "App", size: "2KB", status: "good" },
			{ component: "Header", size: "1KB", status: "good" },
			{ component: "MainContent", size: "8KB", status: "warning" },
			{ component: "ArticleList", size: "15KB", status: "critical" },
			{ component: "ArticleCard", size: "3KB", status: "good" },
		],
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "good": return "text-green-600 dark:text-green-400";
			case "warning": return "text-yellow-600 dark:text-yellow-400";
			case "critical": return "text-red-600 dark:text-red-400";
			default: return "text-gray-600 dark:text-gray-400";
		}
	};

	const getStatusBg = (status: string) => {
		switch (status) {
			case "good": return "bg-green-50 dark:bg-green-900/20";
			case "warning": return "bg-yellow-50 dark:bg-yellow-900/20";
			case "critical": return "bg-red-50 dark:bg-red-900/20";
			default: return "bg-gray-50 dark:bg-gray-700";
		}
	};

	const currentData = performanceData[selectedMetric];

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					⚡ 性能分析面板
				</h3>
				<div className="flex gap-4 mb-4">
					<button
						onClick={() => setAnalysisMode(!analysisMode)}
						className={`px-4 py-2 rounded-lg transition-colors ${
							analysisMode
								? "bg-purple-600 text-white hover:bg-purple-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{analysisMode ? "关闭" : "开启"} 性能分析
					</button>
				</div>

				<div className="flex gap-2 mb-6">
					{[
						{ key: "render-time", label: "渲染时间" },
						{ key: "re-renders", label: "重渲染次数" },
						{ key: "props-size", label: "Props 大小" },
					].map(metric => (
						<button
							key={metric.key}
							onClick={() => setSelectedMetric(metric.key as any)}
							className={`px-3 py-1 text-sm rounded transition-colors ${
								selectedMetric === metric.key
									? "bg-blue-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}
						>
							{metric.label}
						</button>
					))}
				</div>

				{analysisMode && (
					<div className="space-y-3">
						<h4 className="font-medium text-gray-700 dark:text-gray-300">
							性能指标 ({selectedMetric === "render-time" ? "渲染时间 (ms)" :
								selectedMetric === "re-renders" ? "重渲染次数" : "Props 大小"})：
						</h4>
						{currentData.map(item => (
							<div key={item.component} className={`p-3 rounded-lg ${getStatusBg(item.status)}`}>
								<div className="flex justify-between items-center">
									<span className="font-medium text-gray-800 dark:text-white">
										{item.component}
									</span>
									<span className={`font-bold ${getStatusColor(item.status)}`}>
										{selectedMetric === "render-time" ? `${item.time}ms` :
										 selectedMetric === "re-renders" ? `${item.count}次` : item.size}
									</span>
								</div>
								{item.status !== "good" && (
									<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
										{item.status === "warning" ? "⚠️ 建议优化" : "🚨 急需优化"}
									</p>
								)}
							</div>
						))}

						<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-4">
							<p className="text-sm text-purple-800 dark:text-purple-300">
								💡 <strong>优化建议：</strong>
								{selectedMetric === "render-time" && " 考虑使用 React.memo 和 useMemo 优化渲染性能。"}
								{selectedMetric === "re-renders" && " 检查组件依赖，避免不必要的重渲染。"}
								{selectedMetric === "props-size" && " 减少传递的 props 数量，使用 context 替代 deep props。"}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// 错误追踪演示组件
function ErrorTrackingDemo() {
	const [errorMode, setErrorMode] = useState(false);
	const [currentError, setCurrentError] = useState<string | null>(null);

	const errorScenarios = [
		{
			id: "props-error",
			name: "Props 类型错误",
			component: "UserProfile",
			error: "TypeError: Cannot read property 'name' of undefined",
			owner: "App → Sidebar → UserProfile",
		},
		{
			id: "state-error",
			name: "状态更新错误",
			component: "ArticleList",
			error: "Error: Invalid state update",
			owner: "App → MainContent → ArticleList",
		},
		{
			id: "async-error",
			name: "异步操作错误",
			component: "Navigation",
			error: "NetworkError: Failed to fetch",
			owner: "App → Header → Navigation",
		},
	];

	const simulateError = (errorId: string) => {
		const error = errorScenarios.find(e => e.id === errorId);
		if (error) {
			setCurrentError(error.id);
			// 3秒后清除错误
			setTimeout(() => {
				setCurrentError(null);
			}, 3000);
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				🐛 错误追踪与调试
			</h3>

			<div className="mb-6">
				<button
					onClick={() => setErrorMode(!errorMode)}
					className={`px-4 py-2 rounded-lg transition-colors ${
						errorMode
							? "bg-red-600 text-white hover:bg-red-700"
							: "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{errorMode ? "关闭" : "开启"} 错误模拟
				</button>
			</div>

			{errorMode && (
				<div className="space-y-4">
					<div className="grid md:grid-cols-3 gap-4">
						{errorScenarios.map(error => (
							<button
								key={error.id}
								onClick={() => simulateError(error.id)}
								disabled={currentError === error.id}
								className={`p-3 rounded-lg transition-colors ${
									currentError === error.id
										? "bg-red-100 dark:bg-red-900/50 border-2 border-red-500 cursor-not-allowed"
										: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
								}`}
							>
								<p className="font-medium text-gray-800 dark:text-white">
									{error.name}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{error.component}
								</p>
							</button>
						))}
					</div>

					{currentError && (
						<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-red-800 dark:text-red-300 mb-3">
								🚨 错误详情 (Owner Stack 调试信息)：
							</h4>
							{(() => {
								const error = errorScenarios.find(e => e.id === currentError);
								return error ? (
									<div className="space-y-3">
										<div className="bg-white dark:bg-gray-800 p-3 rounded border border-red-200 dark:border-red-700">
											<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												错误组件：
											</p>
											<p className="font-mono text-red-600 dark:text-red-400">
												{error.component}
											</p>
										</div>

										<div className="bg-white dark:bg-gray-800 p-3 rounded border border-red-200 dark:border-red-700">
											<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Owner 路径：
											</p>
											<p className="font-mono text-sm text-red-600 dark:text-red-400">
												{error.owner}
											</p>
										</div>

										<div className="bg-white dark:bg-gray-800 p-3 rounded border border-red-200 dark:border-red-700">
											<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												错误信息：
											</p>
											<p className="font-mono text-sm text-red-600 dark:text-red-400">
												{error.error}
											</p>
										</div>

										<div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
											<p className="text-sm text-yellow-800 dark:text-yellow-300">
												💡 <strong>调试建议：</strong>
												沿着 Owner 路径向上检查，重点关注 {error.component} 组件的 props 和状态。
											</p>
										</div>
									</div>
								) : null;
							})()}
						</div>
					)}
				</div>
			)}

			<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
				<p className="text-sm text-blue-800 dark:text-blue-300">
					🔍 <strong>Owner Stack 调试价值：</strong>
					通过清晰的组件层级关系，开发者可以快速定位错误源头，理解错误发生的上下文，从而更高效地解决问题。
				</p>
			</div>
		</div>
	);
}