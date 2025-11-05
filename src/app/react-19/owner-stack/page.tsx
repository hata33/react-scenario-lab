"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

export default function OwnerStackPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">
							Owner Stack 调试 - React 19 新特性
						</h1>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-white">🔍 3W 法则解析</h2>
							<div className="grid gap-6 md:grid-cols-3">
								<div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
									<h3 className="mb-2 font-bold text-lg text-purple-800 dark:text-purple-300">What - 它是什么？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										Owner Stack 是 React 19 中新的调试机制，能够清晰显示组件的所有权关系，帮助开发者快速定位问题源头。
									</p>
								</div>
								<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
									<h3 className="mb-2 font-bold text-blue-800 text-lg dark:text-blue-300">Why - 为什么需要？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统调试中组件层级复杂、状态传递路径不清晰、错误追踪困难等问题，提供更直观的调试体验。
									</p>
								</div>
								<div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
									<h3 className="mb-2 font-bold text-green-800 text-lg dark:text-green-300">When - 何时使用？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										组件调试、性能分析、错误排查、状态追踪等需要理解组件关系和调用链的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Owner Stack 基础演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">Owner Stack 基础演示</h2>
						<div className="grid gap-6 lg:grid-cols-2">
							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">🚫 传统调试的困境</h3>
								<div className="space-y-4">
									<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
										<p className="mb-2 text-gray-600 text-sm dark:text-gray-300">传统调试痛点：</p>
										<ul className="space-y-2 text-gray-700 text-sm dark:text-gray-300">
											<li>• 组件层级复杂难以追踪</li>
											<li>• 状态传递路径不明确</li>
											<li>• 错误源头定位困难</li>
											<li>• 调用链路可视化不足</li>
										</ul>
									</div>
									<div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
										<p className="font-medium text-red-800 text-sm dark:text-red-300">❌ 常见问题：</p>
										<ul className="mt-2 text-red-700 text-sm dark:text-red-400">
											<li>• "这个 props 从哪来的？"</li>
											<li>• "为什么组件会重新渲染？"</li>
											<li>• "错误发生在哪个层级？"</li>
											<li>• "状态是如何变化的？"</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">✅ Owner Stack 的优势</h3>
								<div className="space-y-4">
									<OwnerStackDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 复杂组件树演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">复杂组件树调试</h2>
						<ComplexComponentTreeDemo />
					</div>

					{/* 性能分析演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">性能分析与优化</h2>
						<PerformanceAnalysisDemo />
					</div>

					{/* 错误追踪演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">错误追踪与调试</h2>
						<ErrorTrackingDemo />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">调试最佳实践</h2>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">✅ 推荐做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">利用 Owner Stack 追踪状态传递</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">分析组件渲染性能瓶颈</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">快速定位错误源头</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">优化组件结构设计</span>
										</li>
									</ul>
								</div>
								<div>
									<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">❌ 避免做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">过度依赖调试工具</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">忽略组件设计原则</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">在生产环境保留调试信息</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">忽视性能优化建议</span>
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
		setComponentState((prev) => ({
			...prev,
			child: prev.child === "loading" ? "loaded" : "loading",
		}));
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setDebugMode(!debugMode)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						debugMode ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{debugMode ? "关闭" : "开启"} 调试模式
				</button>
				<button
					onClick={updateChildState}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					更新子组件状态
				</button>
			</div>

			{debugMode && (
				<div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
					<h4 className="mb-3 font-medium text-purple-800 dark:text-purple-300">🔍 Owner Stack 信息：</h4>
					<div className="space-y-2">
						{ownerStackInfo.map((owner, index) => (
							<div
								key={owner.component}
								className="flex items-center gap-2 rounded border border-purple-200 bg-white p-2 dark:border-purple-700 dark:bg-gray-800"
							>
								<span className="font-mono text-purple-600 text-sm dark:text-purple-400">
									{"".padStart(index * 2, "→")}
								</span>
								<div className="flex-1">
									<span className="font-medium text-gray-800 dark:text-white">{owner.component}</span>
									<span className="ml-2 text-gray-500 text-xs dark:text-gray-400">state: {owner.state}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
				<p className="mb-2 font-medium text-blue-800 text-sm dark:text-blue-300">🎯 Owner Stack 的优势：</p>
				<ul className="space-y-1 text-blue-700 text-sm dark:text-blue-400">
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
					{
						name: "Navigation",
						children: [
							{ name: "NavItem", children: [] },
							{ name: "NavItem", children: [] },
						],
					},
				],
			},
			{
				name: "MainContent",
				children: [
					{
						name: "Sidebar",
						children: [
							{ name: "UserProfile", children: [] },
							{ name: "MenuList", children: [] },
						],
					},
					{
						name: "ContentArea",
						children: [
							{
								name: "ArticleList",
								children: [
									{ name: "ArticleCard", children: [] },
									{ name: "ArticleCard", children: [] },
								],
							},
							{ name: "Footer", children: [] },
						],
					},
				],
			},
		],
	};

	const renderComponentNode = (node: any, depth = 0, path = "") => {
		const currentPath = path ? `${path}/${node.name}` : node.name;
		const isSelected = selectedComponent === currentPath;
		const isInPath = highlightPath && currentPath.includes(selectedComponent || "");

		return (
			<div key={currentPath} className="ml-4">
				<div
					className={`mb-1 cursor-pointer rounded p-2 transition-colors ${
						isSelected
							? "border-2 border-purple-500 bg-purple-200 dark:bg-purple-800"
							: isInPath
								? "border-2 border-purple-300 bg-purple-100 dark:bg-purple-900/50"
								: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
					}`}
					onClick={() => setSelectedComponent(currentPath)}
				>
					<span className="font-medium text-gray-800 text-sm dark:text-white">
						{"".padStart(depth * 2, "→")} {node.name}
					</span>
				</div>
				{node.children.map((child: any) => renderComponentNode(child, depth + 1, currentPath))}
			</div>
		);
	};

	const getOwnerPath = (componentPath: string) => {
		return componentPath.split("/").slice(0, -1).join(" → ");
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🌳 组件树结构</h3>
				<div className="mb-4">
					<button
						onClick={() => setHighlightPath(!highlightPath)}
						className={`rounded px-3 py-1 text-sm transition-colors ${
							highlightPath
								? "bg-purple-600 text-white hover:bg-purple-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{highlightPath ? "关闭" : "开启"} 路径高亮
					</button>
				</div>
				<div className="max-h-96 overflow-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					{renderComponentNode(componentTree)}
				</div>
			</div>

			<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">📋 Owner Stack 信息</h3>
				{selectedComponent ? (
					<div className="space-y-4">
						<div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
							<h4 className="mb-2 font-medium text-purple-800 dark:text-purple-300">选中组件：</h4>
							<p className="font-mono text-purple-700 dark:text-purple-400">{selectedComponent}</p>
						</div>

						<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
							<h4 className="mb-2 font-medium text-blue-800 dark:text-blue-300">Owner 路径：</h4>
							<p className="font-mono text-blue-700 text-sm dark:text-blue-400">
								{getOwnerPath(selectedComponent) || "根组件"}
							</p>
						</div>

						<div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
							<h4 className="mb-2 font-medium text-green-800 dark:text-green-300">组件信息：</h4>
							<ul className="space-y-1 text-green-700 text-sm dark:text-green-400">
								<li>• 深度: {selectedComponent.split("/").length - 1}</li>
								<li>• 父组件: {selectedComponent.split("/").slice(-2, -1)[0] || "无"}</li>
								<li>• 子组件数量: {selectedComponent.includes("Article") ? 0 : "N/A"}</li>
								<li>• 渲染时间: {(Math.random() * 10 + 1) | 0}ms</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
						<p className="text-gray-500 dark:text-gray-400">点击左侧组件查看 Owner Stack 信息</p>
					</div>
				)}
			</div>
		</div>
	);
}

// 性能分析演示组件
function PerformanceAnalysisDemo() {
	type RenderTimeData = { component: string; time: number; status: string };
	type ReRenderData = { component: string; count: number; status: string };
	type PropsSizeData = { component: string; size: string; status: string };
	type PerformanceData = RenderTimeData | ReRenderData | PropsSizeData;

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
			case "good":
				return "text-green-600 dark:text-green-400";
			case "warning":
				return "text-yellow-600 dark:text-yellow-400";
			case "critical":
				return "text-red-600 dark:text-red-400";
			default:
				return "text-gray-600 dark:text-gray-400";
		}
	};

	const getStatusBg = (status: string) => {
		switch (status) {
			case "good":
				return "bg-green-50 dark:bg-green-900/20";
			case "warning":
				return "bg-yellow-50 dark:bg-yellow-900/20";
			case "critical":
				return "bg-red-50 dark:bg-red-900/20";
			default:
				return "bg-gray-50 dark:bg-gray-700";
		}
	};

	const currentData = performanceData[selectedMetric];

	const getItemValue = (item: PerformanceData) => {
		if (selectedMetric === "render-time" && "time" in item) {
			return `${item.time}ms`;
		} else if (selectedMetric === "re-renders" && "count" in item) {
			return `${item.count}次`;
		} else if (selectedMetric === "props-size" && "size" in item) {
			return item.size;
		}
		return "";
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<div className="mb-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">⚡ 性能分析面板</h3>
				<div className="mb-4 flex gap-4">
					<button
						onClick={() => setAnalysisMode(!analysisMode)}
						className={`rounded-lg px-4 py-2 transition-colors ${
							analysisMode ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{analysisMode ? "关闭" : "开启"} 性能分析
					</button>
				</div>

				<div className="mb-6 flex gap-2">
					{[
						{ key: "render-time", label: "渲染时间" },
						{ key: "re-renders", label: "重渲染次数" },
						{ key: "props-size", label: "Props 大小" },
					].map((metric) => (
						<button
							key={metric.key}
							onClick={() => setSelectedMetric(metric.key as any)}
							className={`rounded px-3 py-1 text-sm transition-colors ${
								selectedMetric === metric.key
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{metric.label}
						</button>
					))}
				</div>

				{analysisMode && (
					<div className="space-y-3">
						<h4 className="font-medium text-gray-700 dark:text-gray-300">
							性能指标 (
							{selectedMetric === "render-time"
								? "渲染时间 (ms)"
								: selectedMetric === "re-renders"
									? "重渲染次数"
									: "Props 大小"}
							)：
						</h4>
						{currentData.map((item) => (
							<div key={item.component} className={`rounded-lg p-3 ${getStatusBg(item.status)}`}>
								<div className="flex items-center justify-between">
									<span className="font-medium text-gray-800 dark:text-white">{item.component}</span>
									<span className={`font-bold ${getStatusColor(item.status)}`}>{getItemValue(item)}</span>
								</div>
								{item.status !== "good" && (
									<p className="mt-1 text-gray-600 text-xs dark:text-gray-400">
										{item.status === "warning" ? "⚠️ 建议优化" : "🚨 急需优化"}
									</p>
								)}
							</div>
						))}

						<div className="mt-4 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
							<p className="text-purple-800 text-sm dark:text-purple-300">
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
		const error = errorScenarios.find((e) => e.id === errorId);
		if (error) {
			setCurrentError(error.id);
			// 3秒后清除错误
			setTimeout(() => {
				setCurrentError(null);
			}, 3000);
		}
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🐛 错误追踪与调试</h3>

			<div className="mb-6">
				<button
					onClick={() => setErrorMode(!errorMode)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						errorMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{errorMode ? "关闭" : "开启"} 错误模拟
				</button>
			</div>

			{errorMode && (
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						{errorScenarios.map((error) => (
							<button
								key={error.id}
								onClick={() => simulateError(error.id)}
								disabled={currentError === error.id}
								className={`rounded-lg p-3 transition-colors ${
									currentError === error.id
										? "cursor-not-allowed border-2 border-red-500 bg-red-100 dark:bg-red-900/50"
										: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
								}`}
							>
								<p className="font-medium text-gray-800 dark:text-white">{error.name}</p>
								<p className="text-gray-500 text-xs dark:text-gray-400">{error.component}</p>
							</button>
						))}
					</div>

					{currentError && (
						<div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
							<h4 className="mb-3 font-medium text-red-800 dark:text-red-300">🚨 错误详情 (Owner Stack 调试信息)：</h4>
							{(() => {
								const error = errorScenarios.find((e) => e.id === currentError);
								return error ? (
									<div className="space-y-3">
										<div className="rounded border border-red-200 bg-white p-3 dark:border-red-700 dark:bg-gray-800">
											<p className="mb-1 font-medium text-gray-700 text-sm dark:text-gray-300">错误组件：</p>
											<p className="font-mono text-red-600 dark:text-red-400">{error.component}</p>
										</div>

										<div className="rounded border border-red-200 bg-white p-3 dark:border-red-700 dark:bg-gray-800">
											<p className="mb-1 font-medium text-gray-700 text-sm dark:text-gray-300">Owner 路径：</p>
											<p className="font-mono text-red-600 text-sm dark:text-red-400">{error.owner}</p>
										</div>

										<div className="rounded border border-red-200 bg-white p-3 dark:border-red-700 dark:bg-gray-800">
											<p className="mb-1 font-medium text-gray-700 text-sm dark:text-gray-300">错误信息：</p>
											<p className="font-mono text-red-600 text-sm dark:text-red-400">{error.error}</p>
										</div>

										<div className="rounded bg-yellow-50 p-3 dark:bg-yellow-900/20">
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

			<div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
				<p className="text-blue-800 text-sm dark:text-blue-300">
					🔍 <strong>Owner Stack 调试价值：</strong>
					通过清晰的组件层级关系，开发者可以快速定位错误源头，理解错误发生的上下文，从而更高效地解决问题。
				</p>
			</div>
		</div>
	);
}
