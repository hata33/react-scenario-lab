"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "@/components/Layout";

export default function ReactCompilerPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							React Compiler - React 19 革命性特性
						</h1>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
								⚡ 3W 法则解析
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-indigo-800 dark:text-indigo-300">
										What - 它是什么？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										React Compiler 是 React 19 中的革命性编译器，能够自动优化组件性能，无需手动优化即可获得最佳性能。
									</p>
								</div>
								<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">
										Why - 为什么需要？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决手动性能优化的复杂性，减少开发者的心智负担，自动应用最佳实践，提升应用性能。
									</p>
								</div>
								<div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-pink-800 dark:text-pink-300">
										When - 何时使用？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										所有 React 应用都可以使用，特别适合大型复杂应用、性能敏感场景和需要自动优化的项目。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Compiler 基础演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							自动优化原理演示
						</h2>
						<div className="grid lg:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
									🚫 手动优化的复杂性
								</h3>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
											传统性能优化挑战：
										</p>
										<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
											<li>• 需要手动使用 React.memo</li>
											<li>• 复杂的 useCallback/useMemo</li>
											<li>• 依赖项管理困难</li>
											<li>• 过度优化或优化不足</li>
										</ul>
									</div>
									<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
										<p className="text-sm font-medium text-red-800 dark:text-red-300">
											❌ 常见问题：
										</p>
										<ul className="text-sm text-red-700 dark:text-red-400 mt-2">
											<li>• 遗忘优化导致性能问题</li>
											<li>• 过度优化增加复杂性</li>
											<li>• 依赖项错误导致bug</li>
											<li>• 维护成本高</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
									✅ React Compiler 的优势
								</h3>
								<div className="space-y-4">
									<CompilerBasicDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 智能优化演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							智能优化策略
						</h2>
						<SmartOptimizationDemo />
					</div>

					{/* 性能对比演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							性能提升对比
						</h2>
						<PerformanceComparison />
					</div>

					{/* 实际应用演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							实际应用场景
						</h2>
						<RealWorldApplications />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							React Compiler 最佳实践
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
												相信编译器的自动优化
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												编写简洁的组件代码
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												遵循 React 最佳实践
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												监控编译器输出和建议
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
												过度干预编译器优化
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽略编译器警告
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												编写过于复杂的代码
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												依赖编译器解决所有问题
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

// Compiler 基础演示组件
function CompilerBasicDemo() {
	const [compilerEnabled, setCompilerEnabled] = useState(true);
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");
	const [renderCount, setRenderCount] = useState(0);
	const [optimizations, setOptimizations] = useState<string[]>([]);

	// 追踪渲染次数
	useEffect(() => {
		setRenderCount(prev => prev + 1);
	});

	// 模拟 React Compiler 的自动优化
	const addOptimizationLog = useCallback((optimization: string) => {
		if (compilerEnabled) {
			setOptimizations(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${optimization}`]);
		}
	}, [compilerEnabled]);

	// 模拟编译器自动应用 React.memo
	const MemoizedComponent = useMemo(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动应用 React.memo 到组件");
		}
		return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
	}, [compilerEnabled, addOptimizationLog]);

	// 模拟编译器自动优化计算
	const expensiveValue = useMemo(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动缓存复杂计算结果");
		}

		// 模拟复杂计算
		let result = 0;
		for (let i = 0; i < 100000; i++) {
			result += Math.sqrt(i);
		}
		return result;
	}, [count, compilerEnabled, addOptimizationLog]);

	// 模拟编译器自动优化事件处理器
	const optimizedHandler = useCallback(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动优化事件处理器");
		}
		setCount(prev => prev + 1);
	}, [compilerEnabled, addOptimizationLog]);

	const clearOptimizations = () => {
		setOptimizations([]);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setCompilerEnabled(!compilerEnabled)}
					className={`px-4 py-2 rounded-lg transition-colors ${
						compilerEnabled
							? "bg-indigo-600 text-white hover:bg-indigo-700"
							: "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{compilerEnabled ? "编译器已启用" : "编译器已禁用"}
				</button>

				<button
					onClick={clearOptimizations}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					清除日志
				</button>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-3">组件状态</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>渲染次数:</span>
							<span className={`font-medium ${
								compilerEnabled && renderCount > 3 ? "text-orange-600" : "text-green-600"
							}`}>
								{renderCount}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Count:</span>
							<span>{count}</span>
						</div>
						<div className="flex justify-between">
							<span>Name:</span>
							<span>{name || "空"}</span>
						</div>
						<div className="flex justify-between">
							<span>计算结果:</span>
							<span className="font-mono text-xs">{expensiveValue.toFixed(0)}</span>
						</div>
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-3">操作面板</h4>
					<div className="space-y-3">
						<div className="flex gap-2">
							<button
								onClick={optimizedHandler}
								className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
							>
								增加 Count
							</button>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="输入名称..."
								className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
							/>
						</div>
					</div>
				</div>
			</div>

			{compilerEnabled && optimizations.length > 0 && (
				<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
					<h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
						🤖 编译器优化日志:
					</h4>
					<div className="space-y-1 font-mono text-xs">
						{optimizations.map((log, index) => (
							<div key={index} className="text-indigo-700 dark:text-indigo-400">
								{log}
							</div>
						))}
					</div>
				</div>
			)}

			<div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg">
				<p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
					🎯 React Compiler 的优势：
				</p>
				<ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-1">
					<li>• 自动检测优化机会</li>
					<li>• 无需手动记忆化</li>
					<li>• 智能依赖分析</li>
					<li>• 零配置性能提升</li>
				</ul>
			</div>
		</div>
	);
}

// 智能优化演示组件
function SmartOptimizationDemo() {
	const [strategy, setStrategy] = useState<"memo" | "callback" | "dependency">("memo");
	const [data, setData] = useState<any>({});
	const [optimizationReport, setOptimizationReport] = useState<any>({});

	// React.memo 自动优化演示
	const MemoDemo = () => {
		const [props, setProps] = useState({ id: 1, name: "组件A", value: 100 });
		const [parentState, setParentState] = useState(0);

		// 模拟编译器分析组件是否需要 memo
		const shouldMemo = useMemo(() => {
			// 模拟编译器分析：组件有复杂渲染逻辑且 props 不频繁变化
			const hasComplexRendering = true;
			const propsChangeFrequency = "low";
			return hasComplexRendering && propsChangeFrequency === "low";
		}, [props]);

		const updateProps = () => {
			setProps(prev => ({ ...prev, value: prev.value + 10 }));
		};

		const updateParentState = () => {
			setParentState(prev => prev + 1);
		};

		return (
			<div className="space-y-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-3">
						组件优化分析
					</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>需要 React.memo:</span>
							<span className={`font-medium ${shouldMemo ? "text-green-600" : "text-red-600"}`}>
								{shouldMemo ? "是" : "否"}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Props ID:</span>
							<span>{props.id}</span>
						</div>
						<div className="flex justify-between">
							<span>Props Value:</span>
							<span>{props.value}</span>
						</div>
						<div className="flex justify-between">
							<span>父组件状态:</span>
							<span>{parentState}</span>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={updateProps}
						className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
					>
						更新 Props
					</button>
					<button
						onClick={updateParentState}
						className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
					>
						更新父状态
					</button>
				</div>

				{shouldMemo && (
					<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
						<p className="text-sm text-green-800 dark:text-green-300">
							✅ 编译器建议：此组件适合使用 React.memo 优化，因为 props 变化不频繁但组件渲染较复杂。
						</p>
					</div>
				)}
			</div>
		);
	};

	// useCallback 自动优化演示
	const CallbackDemo = () => {
		const [items, setItems] = useState([1, 2, 3]);
		const [filter, setFilter] = useState("");

		// 模拟编译器分析事件处理器
		const handleItemClick = useCallback((itemId: number) => {
			console.log(`Item ${itemId} clicked`);
			setItems(prev => prev.filter(id => id !== itemId));
		}, []);

		const analyzeCallback = useCallback(() => {
			// 模拟编译器分析：处理器传递给子组件且依赖项稳定
			const passedToChild = true;
			const stableDependencies = true;
			const performanceCritical = true;

			return {
				shouldOptimize: passedToChild && stableDependencies && performanceCritical,
				reason: performanceCritical ? "性能关键路径" : "普通优化"
			};
		}, []);

		const analysis = analyzeCallback();

		return (
			<div className="space-y-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-3">
						事件处理器分析
					</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>需要 useCallback:</span>
							<span className={`font-medium ${analysis.shouldOptimize ? "text-green-600" : "text-red-600"}`}>
								{analysis.shouldOptimize ? "是" : "否"}
							</span>
						</div>
						<div className="flex justify-between">
							<span>优化原因:</span>
							<span>{analysis.reason}</span>
						</div>
						<div className="flex justify-between">
							<span>当前项目数:</span>
							<span>{items.length}</span>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<input
						type="text"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						placeholder="过滤项目..."
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
					/>
					<div className="flex flex-wrap gap-2">
						{items
							.filter(item => !filter || item.toString().includes(filter))
							.map(item => (
								<button
									key={item}
									onClick={() => handleItemClick(item)}
									className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors"
								>
									项目 {item}
								</button>
							))}
					</div>
				</div>

				{analysis.shouldOptimize && (
					<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
						<p className="text-sm text-green-800 dark:text-green-300">
							✅ 编译器建议：此事件处理器传递给子组件，使用 useCallback 可以避免不必要的重渲染。
						</p>
					</div>
				)}
			</div>
		);
	};

	// 依赖项优化演示
	const DependencyDemo = () => {
		const [user, setUser] = useState({ id: 1, name: "张三" });
		const [posts, setPosts] = useState<any[]>([]);
		const [settings, setSettings] = useState({ theme: "light" });

		// 模拟编译器分析依赖项
		const analyzeDependencies = useCallback(() => {
			// 模拟复杂的数据依赖关系
			const userPosts = posts.filter(post => post.userId === user.id);
			const processedPosts = userPosts.map(post => ({
				...post,
				displayName: `${settings.theme === "dark" ? "🌙" : "☀️"} ${post.title}`
			}));

			return {
				userPostsCount: userPosts.length,
				processedPostsCount: processedPosts.length,
				dependencies: {
					user: true,
					posts: true,
					settings: true
				}
			};
		}, [user.id, posts, settings.theme]);

		const analysis = analyzeDependencies();

		const loadPosts = () => {
			const newPosts = [
				{ id: 1, userId: user.id, title: "文章1" },
				{ id: 2, userId: user.id, title: "文章2" },
				{ id: 3, userId: 2, title: "其他文章" }
			];
			setPosts(newPosts);
		};

		return (
			<div className="space-y-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-3">
						依赖项分析
					</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>用户相关文章:</span>
							<span>{analysis.userPostsCount}</span>
						</div>
						<div className="flex justify-between">
							<span>处理后文章:</span>
							<span>{analysis.processedPostsCount}</span>
						</div>
						<div className="flex justify-between">
							<span>依赖项数量:</span>
							<span>{Object.values(analysis.dependencies).filter(Boolean).length}</span>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={loadPosts}
						className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
					>
						加载文章
					</button>
					<button
						onClick={() => setUser(prev => ({ ...prev, name: prev.name === "张三" ? "李四" : "张三" }))}
						className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
					>
						切换用户
					</button>
					<button
						onClick={() => setSettings(prev => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }))}
						className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
					>
						切换主题
					</button>
				</div>

				<div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
					<p className="text-sm text-blue-800 dark:text-blue-300">
						🔍 编译器分析：检测到 3 个依赖项，建议使用 useMemo 缓存计算结果，避免重复处理。
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				🧠 智能优化策略
			</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "memo", label: "React.memo", icon: "📦" },
						{ key: "callback", label: "useCallback", icon: "🎯" },
						{ key: "dependency", label: "依赖分析", icon: "🔗" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setStrategy(key as any)}
							className={`px-4 py-2 rounded-lg transition-colors ${
								strategy === key
									? "bg-indigo-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{strategy === "memo" && <MemoDemo />}
			{strategy === "callback" && <CallbackDemo />}
			{strategy === "dependency" && <DependencyDemo />}

			<div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
				<p className="text-sm text-purple-800 dark:text-purple-300">
					🤖 <strong>智能优化策略：</strong>
					React Compiler 能够智能分析代码模式，自动应用最合适的优化策略，无需开发者手动干预。
				</p>
			</div>
		</div>
	);
}

// 性能对比演示组件
function PerformanceComparison() {
	const [comparisonMode, setComparisonMode] = useState<"manual" | "compiler">("compiler");
	const [complexity, setComplexity] = useState<"simple" | "medium" | "complex">("medium");
	const [performanceMetrics, setPerformanceMetrics] = useState<any>({});
	const [isRunning, setIsRunning] = useState(false);

	// 模拟不同复杂度的组件
	const runPerformanceTest = useCallback(async () => {
		setIsRunning(true);
		const startTime = Date.now();

		// 模拟渲染性能测试
		const renderCounts = complexity === "simple" ? 100 : complexity === "medium" ? 500 : 1000;
	 const optimizationLevels = comparisonMode === "compiler" ? 0.9 : 0.3; // 编译器优化90%，手动30%

		// 模拟渲染过程
		for (let i = 0; i < renderCounts; i++) {
			// 模拟渲染工作
			await new Promise(resolve => setTimeout(resolve, 1));

			// 应用优化
			if (Math.random() < optimizationLevels) {
				// 优化路径 - 更快
				await new Promise(resolve => setTimeout(resolve, 0.5));
			} else {
				// 非优化路径 - 更慢
				await new Promise(resolve => setTimeout(resolve, 2));
			}
		}

		const endTime = Date.now();
		const totalTime = endTime - startTime;

		setPerformanceMetrics({
			totalTime,
			renderCounts,
			optimizationRate: optimizationLevels * 100,
			averageRenderTime: totalTime / renderCounts,
			mode: comparisonMode
		});

		setIsRunning(false);
	}, [comparisonMode, complexity]);

	const resetTest = () => {
		setPerformanceMetrics({});
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				⚡ 性能提升对比
			</h3>

			<div className="mb-6">
				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							优化模式
						</label>
						<div className="flex gap-2">
							<button
								onClick={() => setComparisonMode("manual")}
								className={`px-4 py-2 rounded-lg transition-colors ${
									comparisonMode === "manual"
										? "bg-orange-600 text-white"
										: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
								}`}
							>
								🔧 手动优化
							</button>
							<button
								onClick={() => setComparisonMode("compiler")}
								className={`px-4 py-2 rounded-lg transition-colors ${
									comparisonMode === "compiler"
										? "bg-indigo-600 text-white"
										: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
								}`}
							>
								🤖 编译器优化
							</button>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							测试复杂度
						</label>
						<div className="flex gap-2">
							{[
								{ key: "simple", label: "简单" },
								{ key: "medium", label: "中等" },
								{ key: "complex", label: "复杂" },
							].map(({ key, label }) => (
								<button
									key={key}
									onClick={() => setComplexity(key as any)}
									className={`px-3 py-2 rounded-lg transition-colors ${
										complexity === key
											? "bg-purple-600 text-white"
											: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
									}`}
								>
									{label}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						onClick={runPerformanceTest}
						disabled={isRunning}
						className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{isRunning ? "运行中..." : "开始测试"}
					</button>

					<button
						onClick={resetTest}
						className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						重置
					</button>
				</div>
			</div>

			{performanceMetrics.totalTime && (
				<div className="space-y-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">总耗时</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{performanceMetrics.totalTime}ms
							</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">渲染次数</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{performanceMetrics.renderCounts}
							</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">优化率</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{performanceMetrics.optimizationRate.toFixed(0)}%
							</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">平均耗时</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{performanceMetrics.averageRenderTime.toFixed(1)}ms
							</p>
						</div>
					</div>

					<div className={`p-4 rounded-lg ${
						comparisonMode === "compiler"
							? "bg-green-50 dark:bg-green-900/20"
							: "bg-orange-50 dark:bg-orange-900/20"
					}`}>
						<p className={`text-sm font-medium ${
							comparisonMode === "compiler"
								? "text-green-800 dark:text-green-300"
								: "text-orange-800 dark:text-orange-300"
						}`}>
							{comparisonMode === "compiler" ? "🚀 编译器优化结果：" : "🔧 手动优化结果："}
						</p>
						<p className={`text-sm mt-1 ${
							comparisonMode === "compiler"
								? "text-green-700 dark:text-green-400"
								: "text-orange-700 dark:text-orange-400"
						}`}>
							{comparisonMode === "compiler"
								? `React Compiler 自动应用了 ${performanceMetrics.optimizationRate.toFixed(0)}% 的优化，显著提升了渲染性能。`
								: `手动优化达到了 ${performanceMetrics.optimizationRate.toFixed(0)}% 的优化率，但需要开发者投入大量精力。`}
						</p>
					</div>
				</div>
			)}

			<div className="mt-6 grid md:grid-cols-2 gap-6">
				<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
					<h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
						🤖 编译器优化优势：
					</h4>
					<ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-1">
						<li>• 自动检测优化机会</li>
						<li>• 零配置高性能</li>
						<li>• 智能依赖分析</li>
						<li>• 持续性能改进</li>
					</ul>
				</div>

				<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
					<h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
						🔧 手动优化挑战：
					</h4>
					<ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
						<li>• 需要深度理解原理</li>
						<li>• 容易遗漏优化点</li>
						<li>• 维护成本高</li>
						<li>• 性能提升有限</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

// 实际应用演示组件
function RealWorldApplications() {
	const [application, setApplication] = useState<"ecommerce" | "dashboard" | "social">("ecommerce");

	// 电商应用演示
	const EcommerceDemo = () => {
		const [products, setProducts] = useState<any[]>([]);
		const [cart, setCart] = useState<any[]>([]);
		const [filters, setFilters] = useState({ category: "", priceRange: "" });

		// 模拟编译器优化电商应用
		const optimizedProductList = useMemo(() => {
			// 编译器会自动优化这个复杂的产品列表计算
			return products
				.filter(product => {
					if (filters.category && product.category !== filters.category) return false;
					if (filters.priceRange) {
						const [min, max] = filters.priceRange.split("-").map(Number);
						if (product.price < min || product.price > max) return false;
					}
					return true;
				})
				.map(product => ({
					...product,
					discountPrice: product.price * 0.9,
					inStock: product.stock > 0
				}));
		}, [products, filters]);

		const loadProducts = () => {
			const mockProducts = Array.from({ length: 100 }, (_, i) => ({
				id: i + 1,
				name: `商品 ${i + 1}`,
				price: Math.random() * 1000 + 50,
				category: ["电子产品", "服装", "图书", "家居"][i % 4],
				stock: Math.floor(Math.random() * 100)
			}));
			setProducts(mockProducts);
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadProducts}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
					>
						加载商品
					</button>
					<select
						value={filters.category}
						onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
						className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
					>
						<option value="">所有分类</option>
						<option value="电子产品">电子产品</option>
						<option value="服装">服装</option>
						<option value="图书">图书</option>
						<option value="家居">家居</option>
					</select>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						优化结果 ({optimizedProductList.length} 件商品)
					</h4>
					<div className="grid grid-cols-3 gap-2">
						{optimizedProductList.slice(0, 6).map((product) => (
							<div key={product.id} className="bg-white dark:bg-gray-800 p-2 rounded text-xs">
								<p className="font-medium truncate">{product.name}</p>
								<p className="text-gray-600 dark:text-gray-400">
									¥{product.price.toFixed(0)} → ¥{product.discountPrice.toFixed(0)}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
					<p className="text-sm text-green-800 dark:text-green-300">
						🛒 编译器优化：自动优化了产品列表的过滤、排序和价格计算，提升了页面响应速度。
					</p>
				</div>
			</div>
		);
	};

	// 仪表板应用演示
	const DashboardDemo = () => {
		const [metrics, setMetrics] = useState<any>({});
		const [timeRange, setTimeRange] = useState("7d");

		// 模拟编译器优化仪表板数据处理
		const optimizedMetrics = useMemo(() => {
			// 编译器会自动优化这些复杂的数据聚合计算
			return {
				totalRevenue: metrics.revenue?.reduce((sum: number, item: any) => sum + item.amount, 0) || 0,
				averageOrderValue: metrics.orders?.length > 0
					? metrics.orders.reduce((sum: number, order: any) => sum + order.total, 0) / metrics.orders.length
					: 0,
				conversionRate: metrics.visitors && metrics.conversions
					? (metrics.conversions / metrics.visitors * 100).toFixed(2)
					: 0,
				activeUsers: metrics.users?.filter((user: any) => user.lastActive > Date.now() - 24 * 60 * 60 * 1000).length || 0
			};
		}, [metrics]);

		const loadMetrics = () => {
			const mockMetrics = {
				revenue: Array.from({ length: 30 }, (_, i) => ({ amount: Math.random() * 10000 + 1000 })),
				orders: Array.from({ length: 50 }, (_, i) => ({ total: Math.random() * 500 + 50 })),
				visitors: 10000,
				conversions: 250,
				users: Array.from({ length: 100 }, (_, i) => ({
					lastActive: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
				}))
			};
			setMetrics(mockMetrics);
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadMetrics}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
					>
						加载指标
					</button>
					<select
						value={timeRange}
						onChange={(e) => setTimeRange(e.target.value)}
						className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
					>
						<option value="7d">7天</option>
						<option value="30d">30天</option>
						<option value="90d">90天</option>
					</select>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">总收入</p>
						<p className="text-lg font-bold text-gray-800 dark:text-white">
							¥{optimizedMetrics.totalRevenue.toFixed(0)}
						</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">平均订单</p>
						<p className="text-lg font-bold text-gray-800 dark:text-white">
							¥{optimizedMetrics.averageOrderValue.toFixed(0)}
						</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">转化率</p>
						<p className="text-lg font-bold text-gray-800 dark:text-white">
							{optimizedMetrics.conversionRate}%
						</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">活跃用户</p>
						<p className="text-lg font-bold text-gray-800 dark:text-white">
							{optimizedMetrics.activeUsers}
						</p>
					</div>
				</div>

				<div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
					<p className="text-sm text-blue-800 dark:text-blue-300">
						📊 编译器优化：自动缓存了复杂的数据聚合计算，确保仪表板快速响应。
					</p>
				</div>
			</div>
		);
	};

	// 社交应用演示
	const SocialDemo = () => {
		const [posts, setPosts] = useState<any[]>([]);
		const [userInteractions, setUserInteractions] = useState<any>({});

		// 模拟编译器优化社交动态
		const optimizedFeed = useMemo(() => {
			// 编译器会自动优化这个复杂的社交动态排序算法
			return posts
				.map(post => ({
					...post,
					engagementScore: post.likes + post.comments * 2 + post.shares * 3,
					trendingScore: post.engagementScore / (Date.now() - post.timestamp) * 100000,
					personalizedScore: userInteractions.interests
						? post.tags.some((tag: string) => userInteractions.interests.includes(tag)) ? 1.5 : 1
						: 1
				}))
				.sort((a, b) => (b.trendingScore * b.personalizedScore) - (a.trendingScore * a.personalizedScore));
		}, [posts, userInteractions]);

		const loadPosts = () => {
			const mockPosts = Array.from({ length: 50 }, (_, i) => ({
				id: i + 1,
				content: `动态内容 ${i + 1}`,
				likes: Math.floor(Math.random() * 1000),
				comments: Math.floor(Math.random() * 100),
				shares: Math.floor(Math.random() * 50),
				timestamp: Date.now() - Math.random() * 24 * 60 * 60 * 1000,
				tags: ["科技", "生活", "娱乐", "体育"].slice(0, Math.floor(Math.random() * 3) + 1)
			}));
			setPosts(mockPosts);
			setUserInteractions({ interests: ["科技", "生活"] });
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadPosts}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
					>
						加载动态
					</button>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						个性化推荐 (前5条)
					</h4>
					<div className="space-y-2">
						{optimizedFeed.slice(0, 5).map((post) => (
							<div key={post.id} className="bg-white dark:bg-gray-800 p-3 rounded">
								<p className="text-sm font-medium">{post.content}</p>
								<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
									互动: {post.engagementScore} | 趋势: {post.trendingScore.toFixed(1)}
									{post.personalizedScore > 1 && " | 🎯 个性化推荐"}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
					<p className="text-sm text-purple-800 dark:text-purple-300">
						💬 编译器优化：自动优化了复杂的推荐算法和个性化计算，提升了用户体验。
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				🌍 实际应用场景
			</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "ecommerce", label: "电商应用", icon: "🛒" },
						{ key: "dashboard", label: "数据仪表板", icon: "📊" },
						{ key: "social", label: "社交应用", icon: "💬" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setApplication(key as any)}
							className={`px-4 py-2 rounded-lg transition-colors ${
								application === key
									? "bg-indigo-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{application === "ecommerce" && <EcommerceDemo />}
			{application === "dashboard" && <DashboardDemo />}
			{application === "social" && <SocialDemo />}

			<div className="mt-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
				<p className="text-sm text-indigo-800 dark:text-indigo-300">
					🚀 <strong>React Compiler 革命性影响：</strong>
					通过自动优化，React Compiler 让开发者专注于业务逻辑，而将性能优化交给编译器处理，
					大大提升了开发效率和应用性能。
				</p>
			</div>
		</div>
	);
}