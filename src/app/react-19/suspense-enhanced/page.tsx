"use client";

import { useState, useEffect, Suspense } from "react";
import Layout from "@/components/Layout";

export default function SuspenseEnhancedPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							增强的 Suspense - React 19 新特性
						</h1>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
								⏳ 3W 法则解析
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-indigo-800 dark:text-indigo-300">
										What - 它是什么？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										增强的 Suspense 是 React 19 中改进的异步渲染机制，提供了更好的加载状态管理、错误边界处理和并发渲染支持。
									</p>
								</div>
								<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">
										Why - 为什么需要？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统异步加载体验差、加载状态管理复杂、错误处理不完善、并发渲染支持不足等问题。
									</p>
								</div>
								<div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-pink-800 dark:text-pink-300">
										When - 何时使用？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										数据获取、代码分割、图片加载、异步组件渲染等需要优雅处理加载状态的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* 基础 Suspense 演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							基础 Suspense 功能
						</h2>
						<div className="grid lg:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
									🚫 传统异步处理的痛点
								</h3>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
											传统加载状态管理：
										</p>
										<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
											<li>• 需要手动管理 loading 状态</li>
											<li>• 代码复杂且容易出错</li>
											<li>• 错误处理逻辑分散</li>
											<li>• 用户体验不一致</li>
										</ul>
									</div>
									<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
										<p className="text-sm font-medium text-red-800 dark:text-red-300">
											❌ 常见问题：
										</p>
										<ul className="text-sm text-red-700 dark:text-red-400 mt-2">
											<li>• 加载闪烁问题</li>
											<li>• 嵌套加载状态复杂</li>
											<li>• 错误边界配置繁琐</li>
											<li>• 并发渲染支持有限</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
									✅ React 19 Suspense 的优势
								</h3>
								<div className="space-y-4">
									<BasicSuspenseDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 并发渲染演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							并发渲染特性
						</h2>
						<ConcurrentRenderingDemo />
					</div>

					{/* 嵌套 Suspense 演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							嵌套 Suspense 处理
						</h2>
						<NestedSuspenseDemo />
					</div>

					{/* 服务器组件集成 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							服务器组件集成
						</h2>
						<ServerComponentDemo />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							Suspense 最佳实践
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
												合理划分 Suspense 边界
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												提供有意义的加载状态
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												配合错误边界使用
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												利用并发渲染优势
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
												过度嵌套 Suspense
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽略错误边界配置
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												加载状态过于简单
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												在 Suspense 中使用副作用
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

// 基础 Suspense 演示组件
function BasicSuspenseDemo() {
	const [showContent, setShowContent] = useState(false);
	const [loadingType, setLoadingType] = useState<"skeleton" | "spinner" | "progress">("skeleton");

	const AsyncComponent = () => {
		const [data, setData] = useState(null);

		useEffect(() => {
			const timer = setTimeout(() => {
				setData({ message: "数据加载完成！", timestamp: new Date().toLocaleTimeString() });
			}, 2000);

			return () => clearTimeout(timer);
		}, []);

		if (!data) {
			throw new Promise(() => {}); // 触发 Suspense
		}

		return (
			<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
				<p className="text-green-800 dark:text-green-300 font-medium">
					✅ {data.message}
				</p>
				<p className="text-sm text-green-700 dark:text-green-400 mt-1">
					加载时间: {data.timestamp}
				</p>
			</div>
		);
	};

	const LoadingFallback = () => {
		switch (loadingType) {
			case "skeleton":
				return (
					<div className="space-y-3">
						<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
						<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
					</div>
				);
			case "spinner":
				return (
					<div className="flex items-center justify-center py-4">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					</div>
				);
			case "progress":
				return (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>加载中...</span>
							<span>75%</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
						</div>
					</div>
				);
			default:
				return <div>加载中...</div>;
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setShowContent(!showContent)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					{showContent ? "隐藏" : "显示"}异步内容
				</button>

				{showContent && (
					<div className="flex gap-2">
						{(["skeleton", "spinner", "progress"] as const).map(type => (
							<button
								key={type}
								onClick={() => setLoadingType(type)}
								className={`px-3 py-1 text-sm rounded transition-colors ${
									loadingType === type
										? "bg-purple-600 text-white"
										: "bg-gray-600 text-white hover:bg-gray-700"
								}`}
							>
								{type === "skeleton" ? "骨架屏" :
								 type === "spinner" ? "旋转器" : "进度条"}
							</button>
						))}
					</div>
				)}
			</div>

			{showContent && (
				<Suspense fallback={<LoadingFallback />}>
					<AsyncComponent />
				</Suspense>
			)}

			<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
				<p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
					🎯 React 19 Suspense 的优势：
				</p>
				<ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-1">
					<li>• 声明式异步处理</li>
					<li>• 自动管理加载状态</li>
					<li>• 支持多种加载模式</li>
					<li>• 更好的用户体验</li>
				</ul>
			</div>
		</div>
	);
}

// 并发渲染演示组件
function ConcurrentRenderingDemo() {
	const [concurrentMode, setConcurrentMode] = useState(false);
	const [renderPriority, setRenderPriority] = useState<"high" | "normal" | "low">("normal");

	const HeavyComponent = ({ priority, delay }: { priority: string; delay: number }) => {
		const [data, setData] = useState(null);

		useEffect(() => {
			const startTime = Date.now();
			const timer = setTimeout(() => {
				setData({
					priority,
					renderTime: Date.now() - startTime,
					timestamp: new Date().toLocaleTimeString(),
				});
			}, delay);

			return () => clearTimeout(timer);
		}, [priority, delay]);

		if (!data) {
			throw new Promise(() => {}); // 触发 Suspense
		}

		return (
			<div className={`p-4 rounded-lg border-2 ${
				priority === "high"
					? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
					: priority === "low"
					? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700"
					: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
			}`}>
				<h4 className="font-medium text-gray-800 dark:text-white mb-2">
					{priority === "high" ? "🔥 高优先级" :
					 priority === "low" ? "🐌 低优先级" : "⚡ 普通优先级"} 组件
				</h4>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					渲染时间: {data.renderTime}ms
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-500">
					完成时间: {data.timestamp}
				</p>
			</div>
		);
	};

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					🚀 并发渲染控制
				</h3>
				<div className="space-y-4">
					<div className="flex gap-4">
						<button
							onClick={() => setConcurrentMode(!concurrentMode)}
							className={`px-4 py-2 rounded-lg transition-colors ${
								concurrentMode
									? "bg-green-600 text-white hover:bg-green-700"
									: "bg-gray-600 text-white hover:bg-gray-700"
							}`}
						>
							{concurrentMode ? "并发模式" : "同步模式"}
						</button>

						<div className="flex gap-2">
							{(["high", "normal", "low"] as const).map(priority => (
								<button
									key={priority}
									onClick={() => setRenderPriority(priority)}
									className={`px-3 py-1 text-sm rounded transition-colors ${
										renderPriority === priority
											? "bg-purple-600 text-white"
											: "bg-gray-600 text-white hover:bg-gray-700"
									}`}
								>
									{priority === "high" ? "高" :
									 priority === "low" ? "低" : "普通"}
								</button>
							))}
						</div>
					</div>

					<Suspense
						fallback={
							<div className="flex items-center justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
							</div>
						}
					>
						<div className="space-y-3">
							<HeavyComponent priority="high" delay={1000} />
							<HeavyComponent priority="normal" delay={2000} />
							<HeavyComponent priority="low" delay={3000} />
						</div>
					</Suspense>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					📊 并发渲染特性
				</h3>
				<div className="space-y-4">
					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
							并发渲染优势：
						</h4>
						<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
							<li>• 优先级调度</li>
							<li>• 可中断渲染</li>
							<li>• 更好的用户交互响应</li>
							<li>• 时间切片</li>
						</ul>
					</div>

					<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
							当前模式：
						</h4>
						<p className="text-sm text-green-700 dark:text-green-400">
							{concurrentMode
								? "🚀 并发渲染已启用 - 组件将根据优先级依次渲染"
								: "🔄 同步渲染模式 - 组件按顺序依次完成渲染"}
						</p>
					</div>

					<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
						<p className="text-sm text-purple-800 dark:text-purple-300">
							💡 <strong>关键洞察：</strong>
							React 19 的并发渲染允许高优先级更新（如用户交互）打断低优先级渲染（如数据获取），提供更流畅的用户体验。
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// 嵌套 Suspense 演示组件
function NestedSuspenseDemo() {
	const [showNested, setShowNested] = useState(false);
	const [nestedLevel, setNestedLevel] = useState(1);

	const NestedComponent = ({ level }: { level: number }) => {
		const [data, setData] = useState(null);

		useEffect(() => {
			const timer = setTimeout(() => {
				setData({ level, message: `第 ${level} 层组件加载完成` });
			}, 1000 * level);

			return () => clearTimeout(timer);
		}, [level]);

		if (!data) {
			throw new Promise(() => {}); // 触发 Suspense
		}

		if (level < nestedLevel) {
			return (
				<div className="ml-4">
					<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-3">
						<p className="text-green-800 dark:text-green-300 font-medium">
							✅ {data.message}
						</p>
					</div>
					<Suspense
						fallback={
							<div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg mb-3">
								<p className="text-orange-600 dark:text-orange-400 text-sm">
									加载第 {level + 1} 层组件...
								</p>
							</div>
						}
					>
						<NestedComponent level={level + 1} />
					</Suspense>
				</div>
			);
		}

		return (
			<div className="ml-4">
				<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
					<p className="text-green-800 dark:text-green-300 font-medium">
						✅ {data.message}
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				📦 嵌套 Suspense 处理
			</h3>

			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={() => setShowNested(!showNested)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						{showNested ? "隐藏" : "显示"}嵌套组件
					</button>

					{showNested && (
						<div className="flex gap-2">
							{[1, 2, 3, 4].map(level => (
								<button
									key={level}
									onClick={() => setNestedLevel(level)}
									className={`px-3 py-1 text-sm rounded transition-colors ${
										nestedLevel === level
											? "bg-purple-600 text-white"
											: "bg-gray-600 text-white hover:bg-gray-700"
									}`}
								>
									{level} 层
								</button>
							))}
						</div>
					)}
				</div>

				{showNested && (
					<Suspense
						fallback={
							<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
								<p className="text-blue-600 dark:text-blue-400 text-center">
									正在加载根组件...
								</p>
							</div>
						}
					>
						<NestedComponent level={0} />
					</Suspense>
				)}

				<div className="grid md:grid-cols-2 gap-6 mt-6">
					<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
							嵌套 Suspense 优势：
						</h4>
						<ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-1">
							<li>• 独立的加载状态</li>
							<li>• 渐进式内容展示</li>
							<li>• 更好的用户体验</li>
							<li>• 灵活的边界控制</li>
						</ul>
					</div>

					<div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-pink-800 dark:text-pink-300 mb-2">
							使用场景：
						</h4>
						<ul className="text-sm text-pink-700 dark:text-pink-400 space-y-1">
							<li>• 页面布局嵌套加载</li>
							<li>• 组件树渐进渲染</li>
							<li>• 复杂数据结构展示</li>
							<li>• 多级菜单系统</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// 服务器组件集成演示组件
function ServerComponentDemo() {
	const [serverData, setServerData] = useState(null);
	const [loadingServer, setLoadingServer] = useState(false);

	const mockServerComponent = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					id: 1,
					title: "服务器组件数据",
					content: "这是从服务器组件获取的数据",
					timestamp: new Date().toISOString(),
				});
			}, 2000);
		});
	};

	const loadServerData = async () => {
		setLoadingServer(true);
		try {
			const data = await mockServerComponent();
			setServerData(data);
		} catch (error) {
			console.error("加载服务器数据失败:", error);
		} finally {
			setLoadingServer(false);
		}
	};

	const ServerComponentWrapper = () => {
		if (!serverData) {
			throw new Promise(() => {}); // 触发 Suspense
		}

		return (
			<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
				<h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
					🖥️ 服务器组件
				</h4>
				<p className="text-green-700 dark:text-green-400 mb-1">
					{serverData.title}
				</p>
				<p className="text-sm text-green-600 dark:text-green-500">
					{serverData.content}
				</p>
				<p className="text-xs text-green-500 dark:text-green-400 mt-2">
					时间戳: {new Date(serverData.timestamp).toLocaleString()}
				</p>
			</div>
		);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				🖥️ 服务器组件集成
			</h3>

			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadServerData}
						disabled={loadingServer}
						className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loadingServer ? "加载中..." : "加载服务器数据"}
					</button>
				</div>

				<Suspense
					fallback={
						<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
							<div className="flex items-center space-x-3">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
								<span className="text-blue-600 dark:text-blue-400">
									正在从服务器获取数据...
								</span>
							</div>
						</div>
					}
				>
					<ServerComponentWrapper />
				</Suspense>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
							服务器组件 + Suspense：
						</h4>
						<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
							<li>• 无缝集成服务器渲染</li>
							<li>• 自动处理异步数据</li>
							<li>• 客户端/服务端统一体验</li>
							<li>• 优化的 SEO 支持</li>
						</ul>
					</div>

					<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
							React 19 新特性：
						</h4>
						<ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
							<li>• 改进的服务器组件支持</li>
							<li>• 更好的流式渲染</li>
							<li>• 增强的错误边界</li>
							<li>• 优化的水合过程</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}