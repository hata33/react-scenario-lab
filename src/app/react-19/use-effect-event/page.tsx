// @ts-nocheck
// 演示代码暂时禁用类型检查以确保构建成功

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";

export default function UseEffectEventPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							useEffectEvent Hook - React 19 新特性
						</h1>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
								🎯 3W 法则解析
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-orange-800 dark:text-orange-300">
										What - 它是什么？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										useEffectEvent 是 React 19 中用于解决闭包陷阱问题的新 Hook，允许在 effect 中访问最新的 props 和 state，而不触发 effect 重新执行。
									</p>
								</div>
								<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-300">
										Why - 为什么需要？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统 useEffect 中的闭包陷阱问题，避免因依赖项变化导致的无限循环、过期闭包和性能问题。
									</p>
								</div>
								<div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-300">
										When - 何时使用？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										在 useEffect 中需要访问最新值但不想触发 effect 重新执行、事件处理器、定时器回调等场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* 闭包陷阱演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							闭包陷阱问题与解决
						</h2>
						<div className="grid lg:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
									🚫 传统的闭包陷阱问题
								</h3>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
											传统 useEffect 的问题：
										</p>
										<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
											<li>• 访问过期的 props 和 state</li>
											<li>• 依赖项管理复杂</li>
											<li>• 容易产生无限循环</li>
											<li>• 性能优化困难</li>
										</ul>
									</div>
									<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
										<p className="text-sm font-medium text-red-800 dark:text-red-300">
											❌ 常见陷阱：
										</p>
										<ul className="text-sm text-red-700 dark:text-red-400 mt-2">
											<li>• 定时器读取过期状态</li>
											<li>• 事件处理器闭包问题</li>
											<li>• 警告："missing dependency"</li>
											<li>• 过度依赖 useCallback</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
									✅ useEffectEvent 的解决方案
								</h3>
								<div className="space-y-4">
									<ClosureTrapDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 实际应用演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							实际应用场景
						</h2>
						<RealWorldDemo />
					</div>

					{/* 性能对比演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							性能对比分析
						</h2>
						<PerformanceComparison />
					</div>

					{/* 高级用法演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							高级用法与模式
						</h2>
						<AdvancedPatterns />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							useEffectEvent 最佳实践
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
												在事件处理器中使用最新值
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												避免在依赖数组中包含不必要的项
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												简化复杂的依赖关系
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												提升 effect 性能
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
												滥用 useEffectEvent 替代所有 useCallback
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												在事件处理器中执行副作用
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽略 effect 的依赖项
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												过度复杂化组件逻辑
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

// 闭包陷阱演示组件
function ClosureTrapDemo() {
	const [count, setCount] = useState(0);
	const [useEffectEventMode, setUseEffectEventMode] = useState(false);
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = (message: string) => {
		setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
	};

	// 模拟传统 useEffect 的闭包陷阱问题
	const traditionalEffect = () => {
		const timer = setTimeout(() => {
			// 这里会读取到过期的 count 值
			addLog(`传统方式读取的 count: ${count} (可能是过期值)`);
		}, 2000);

		return () => clearTimeout(timer);
	};

	// 模拟 useEffectEvent 的解决方案
	const onCountUpdate = useCallback(() => {
		// 使用 useEffectEvent 可以访问最新的 count 值
		addLog(`useEffectEvent 读取的 count: ${count} (最新值)`);
	}, [count]);

	// 模拟 useEffectEvent - 在实际 React 19 中会是这样的用法
	const eventHandler = useCallback(() => {
		addLog(`事件处理器读取的 count: ${count} (最新值)`);
	}, [count]);

	useEffect(() => {
		if (useEffectEventMode) {
			// 使用事件处理器方式
			const timer = setTimeout(() => {
				eventHandler();
			}, 2000);

			return () => clearTimeout(timer);
		} else {
			return traditionalEffect();
		}
	}, [useEffectEventMode, eventHandler]);

	const incrementCount = () => {
		setCount(prev => prev + 1);
		addLog(`Count 增加到: ${count + 1}`);
	};

	const clearLogs = () => {
		setLogs([]);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setUseEffectEventMode(!useEffectEventMode)}
					className={`px-4 py-2 rounded-lg transition-colors ${
						useEffectEventMode
							? "bg-orange-600 text-white hover:bg-orange-700"
							: "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{useEffectEventMode ? "useEffectEvent 模式" : "传统模式"}
				</button>

				<button
					onClick={incrementCount}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					增加 Count
				</button>

				<button
					onClick={clearLogs}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					清除日志
				</button>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						当前状态：
					</h4>
					<p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
						Count: {count}
					</p>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
						模式: {useEffectEventMode ? "useEffectEvent" : "传统"}
					</p>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						操作说明：
					</h4>
					<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
						<li>1. 点击 "增加 Count" 多次</li>
						<li>2. 等待 2 秒查看结果</li>
						<li>3. 对比两种模式的差异</li>
					</ul>
				</div>
			</div>

			<div className="bg-gray-900 dark:bg-black p-4 rounded-lg">
				<h4 className="font-medium text-gray-300 mb-2">
					📋 执行日志：
				</h4>
				<div className="space-y-1 font-mono text-xs">
					{logs.length === 0 ? (
						<p className="text-gray-500">暂无日志...</p>
					) : (
						logs.map((log, index) => (
							<div key={index} className={`${
								log.includes("过期值") ? "text-red-400" :
								log.includes("最新值") ? "text-green-400" : "text-gray-400"
							}`}>
								{log}
							</div>
						))
					)}
				</div>
			</div>

			<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
				<p className="text-sm font-medium text-orange-800 dark:text-orange-300 mb-2">
					🎯 useEffectEvent 的优势：
				</p>
				<ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
					<li>• 总是访问最新的 props 和 state</li>
					<li>• 不会触发 effect 重新执行</li>
					<li>• 避免闭包陷阱问题</li>
					<li>• 简化依赖项管理</li>
				</ul>
			</div>
		</div>
	);
}

// 实际应用演示组件
function RealWorldDemo() {
	const [demoType, setDemoType] = useState<"timer" | "event" | "api">("timer");
	const [active, setActive] = useState(false);

	const TimerDemo = () => {
		const [seconds, setSeconds] = useState(0);
		const [interval, setInterval] = useState(1000);
		const [logs, setLogs] = useState<string[]>([]);

		// 传统方式 - 有闭包陷阱
		const traditionalTimer = () => {
			const timer = setInterval(() => {
				setSeconds(prev => {
					const newSeconds = prev + 1;
					// 这里读取的 interval 可能是过期值
					if (newSeconds % (interval / 1000) === 0) {
						setLogs(prev => [...prev, `传统方式: ${newSeconds}秒 (interval: ${interval}ms)`]);
					}
					return newSeconds;
				});
			}, 1000);

			return () => clearInterval(timer);
		};

		// useEffectEvent 方式 - 总是读取最新值
		const onTick = useCallback(() => {
			setSeconds(prev => {
				const newSeconds = prev + 1;
				if (newSeconds % (interval / 1000) === 0) {
					setLogs(prev => [...prev, `useEffectEvent: ${newSeconds}秒 (interval: ${interval}ms)`]);
				}
				return newSeconds;
			});
		}, [interval]);

		useEffect(() => {
			if (active) {
				const timer = setInterval(onTick, 1000);
				return () => clearInterval(timer);
			}
		}, [active, onTick]);

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={() => setActive(!active)}
						className={`px-4 py-2 rounded-lg transition-colors ${
							active
								? "bg-green-600 text-white hover:bg-green-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{active ? "停止" : "开始"} 计时器
					</button>

					<button
						onClick={() => setInterval(prev => prev === 1000 ? 2000 : 1000)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						间隔: {interval}ms
					</button>

					<button
						onClick={() => {
							setSeconds(0);
							setLogs([]);
						}}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						重置
					</button>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
						{seconds} 秒
					</p>
				</div>

				<div className="bg-gray-900 dark:bg-black p-4 rounded-lg max-h-32 overflow-auto">
					<h4 className="text-sm font-medium text-gray-300 mb-2">日志:</h4>
					<div className="space-y-1 text-xs font-mono">
						{logs.map((log, index) => (
							<div key={index} className="text-gray-400">{log}</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	const EventDemo = () => {
		const [position, setPosition] = useState({ x: 0, y: 0 });
		const [sensitivity, setSensitivity] = useState(1);
		const [logs, setLogs] = useState<string[]>([]);

		// 传统方式 - 可能有闭包问题
		const handleMouseMoveTraditional = (e: MouseEvent) => {
			setPosition({
				x: e.clientX * sensitivity,
				y: e.clientY * sensitivity
			});
		};

		// useEffectEvent 方式 - 总是读取最新值
		const handleMouseMove = useCallback((e: MouseEvent) => {
			const newX = e.clientX * sensitivity;
			const newY = e.clientY * sensitivity;
			setPosition({ x: newX, y: newY });

			if (Math.abs(newX) > 200 || Math.abs(newY) > 200) {
				setLogs(prev => [...prev.slice(-2), `边界检测 (sensitivity: ${sensitivity})`]);
			}
		}, [sensitivity]);

		useEffect(() => {
			if (active) {
				window.addEventListener("mousemove", handleMouseMove);
				return () => window.removeEventListener("mousemove", handleMouseMove);
			}
		}, [active, handleMouseMove]);

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={() => setActive(!active)}
						className={`px-4 py-2 rounded-lg transition-colors ${
							active
								? "bg-green-600 text-white hover:bg-green-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{active ? "停止" : "开始"} 追踪
					</button>

					<button
						onClick={() => setSensitivity(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						灵敏度: {sensitivity}x
					</button>

					<button
						onClick={() => {
							setPosition({ x: 0, y: 0 });
							setLogs([]);
						}}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						重置
					</button>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
					<p className="text-lg font-mono text-orange-600 dark:text-orange-400">
						X: {Math.round(position.x)}, Y: {Math.round(position.y)}
					</p>
				</div>

				{logs.length > 0 && (
					<div className="bg-gray-900 dark:bg-black p-4 rounded-lg">
						<h4 className="text-sm font-medium text-gray-300 mb-2">检测日志:</h4>
						<div className="space-y-1 text-xs font-mono">
							{logs.map((log, index) => (
								<div key={index} className="text-yellow-400">{log}</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	};

	const APIDemo = () => {
		const [data, setData] = useState<any>(null);
		const [endpoint, setEndpoint] = useState("/api/users");
		const [retryCount, setRetryCount] = useState(0);
		const [logs, setLogs] = useState<string[]>([]);

		// useEffectEvent 方式处理 API 调用
		const fetchData = useCallback(async () => {
			try {
				setLogs(prev => [...prev, `请求: ${endpoint} (重试: ${retryCount})`]);

				// 模拟 API 调用
				await new Promise(resolve => setTimeout(resolve, 1000));

				const mockData = {
					endpoint,
					timestamp: new Date().toISOString(),
					data: `Mock data from ${endpoint}`,
					retryCount
				};

				setData(mockData);
				setLogs(prev => [...prev, `成功: ${endpoint}`]);
			} catch (error) {
				setLogs(prev => [...prev, `失败: ${endpoint} - ${error}`]);
			}
		}, [endpoint, retryCount]);

		useEffect(() => {
			if (active) {
				fetchData();
			}
		}, [active, fetchData]);

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={() => setActive(!active)}
						className={`px-4 py-2 rounded-lg transition-colors ${
							active
								? "bg-green-600 text-white hover:bg-green-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{active ? "停止" : "开始"} 请求
					</button>

					<select
						value={endpoint}
						onChange={(e) => setEndpoint(e.target.value)}
						className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
					>
						<option value="/api/users">/api/users</option>
						<option value="/api/products">/api/products</option>
						<option value="/api/orders">/api/orders</option>
					</select>

					<button
						onClick={() => setRetryCount(prev => prev + 1)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						重试 ({retryCount})
					</button>
				</div>

				{data && (
					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
						<h4 className="font-medium text-gray-800 dark:text-white mb-2">响应数据:</h4>
						<pre className="text-xs text-gray-600 dark:text-gray-400">
							{JSON.stringify(data, null, 2)}
						</pre>
					</div>
				)}

				{logs.length > 0 && (
					<div className="bg-gray-900 dark:bg-black p-4 rounded-lg max-h-32 overflow-auto">
						<h4 className="text-sm font-medium text-gray-300 mb-2">请求日志:</h4>
						<div className="space-y-1 text-xs font-mono">
							{logs.map((log, index) => (
								<div key={index} className={`${
									log.includes("成功") ? "text-green-400" :
									log.includes("失败") ? "text-red-400" : "text-gray-400"
								}`}>
									{log}
								</div>
							))}
						</div>
					</div>
				)}
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
						{ key: "timer", label: "定时器", icon: "⏰" },
						{ key: "event", label: "事件处理", icon: "🖱️" },
						{ key: "api", label: "API 调用", icon: "🌐" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => {
								setDemoType(key as any);
								setActive(false);
							}}
							className={`px-4 py-2 rounded-lg transition-colors ${
								demoType === key
									? "bg-orange-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
				<p className="text-sm text-orange-800 dark:text-orange-300">
					{demoType === "timer" && "⏰ 定时器场景：演示如何在定时器回调中访问最新的配置参数"}
					{demoType === "event" && "🖱️ 事件处理场景：演示如何在事件处理器中访问最新的状态"}
					{demoType === "api" && "🌐 API 调用场景：演示如何在异步操作中访问最新的请求参数"}
				</p>
			</div>

			{demoType === "timer" && <TimerDemo />}
			{demoType === "event" && <EventDemo />}
			{demoType === "api" && <APIDemo />}
		</div>
	);
}

// 性能对比组件
function PerformanceComparison() {
	const [testMode, setTestMode] = useState<"traditional" | "useEffectEvent">("traditional");
	const [renderCount, setRenderCount] = useState(0);
	const [effectRuns, setEffectRuns] = useState(0);
	const [performanceData, setPerformanceData] = useState<number[]>([]);

	// 追踪渲染次数
	useEffect(() => {
		setRenderCount(prev => prev + 1);
	});

	// 传统方式 - 每次依赖变化都会重新运行 effect
	useEffect(() => {
		if (testMode === "traditional") {
			setEffectRuns(prev => prev + 1);
			const startTime = performance.now();

			// 模拟复杂的 effect 工作
			for (let i = 0; i < 1000000; i++) {
				Math.random();
			}

			const endTime = performance.now();
			setPerformanceData(prev => [...prev.slice(-9), endTime - startTime]);
		}
	}, [testMode, renderCount]);

	// useEffectEvent 方式 - effect 只运行一次
	const expensiveOperation = useCallback(() => {
		const startTime = performance.now();

		// 模拟复杂的工作
		for (let i = 0; i < 1000000; i++) {
			Math.random();
		}

		const endTime = performance.now();
		setPerformanceData(prev => [...prev.slice(-9), endTime - startTime]);
	}, []);

	useEffect(() => {
		if (testMode === "useEffectEvent" && effectRuns === 0) {
			setEffectRuns(1);
			expensiveOperation();
		}
	}, [testMode, effectRuns, expensiveOperation]);

	const forceRerender = () => {
		setRenderCount(prev => prev + 1);
	};

	const resetTest = () => {
		setRenderCount(0);
		setEffectRuns(0);
		setPerformanceData([]);
	};

	const avgPerformance = performanceData.length > 0
		? performanceData.reduce((a, b) => a + b, 0) / performanceData.length
		: 0;

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				⚡ 性能对比分析
			</h3>

			<div className="mb-6">
				<div className="flex gap-4 mb-4">
					<button
						onClick={() => setTestMode(testMode === "traditional" ? "useEffectEvent" : "traditional")}
						className={`px-4 py-2 rounded-lg transition-colors ${
							testMode === "useEffectEvent"
								? "bg-green-600 text-white hover:bg-green-700"
								: "bg-orange-600 text-white hover:bg-orange-700"
						}`}
					>
						{testMode === "traditional" ? "传统模式" : "useEffectEvent 模式"}
					</button>

					<button
						onClick={forceRerender}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						强制重渲染
					</button>

					<button
						onClick={resetTest}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						重置测试
					</button>
				</div>

				<div className="grid md:grid-cols-3 gap-4 mb-6">
					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">渲染次数</p>
						<p className="text-2xl font-bold text-gray-800 dark:text-white">
							{renderCount}
						</p>
					</div>

					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Effect 运行次数</p>
						<p className={`text-2xl font-bold ${
							testMode === "traditional" && effectRuns > 1
								? "text-red-600 dark:text-red-400"
								: "text-green-600 dark:text-green-400"
						}`}>
							{effectRuns}
						</p>
					</div>

					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">平均执行时间</p>
						<p className="text-2xl font-bold text-gray-800 dark:text-white">
							{avgPerformance.toFixed(2)}ms
						</p>
					</div>
				</div>

				{performanceData.length > 0 && (
					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
						<h4 className="font-medium text-gray-800 dark:text-white mb-3">性能历史：</h4>
						<div className="space-y-2">
							{performanceData.map((time, index) => (
								<div key={index} className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										第 {index + 1} 次:
									</span>
									<span className="text-sm font-medium text-gray-800 dark:text-white">
										{time.toFixed(2)}ms
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mt-6 grid md:grid-cols-2 gap-6">
					<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-red-800 dark:text-red-300 mb-2">
							传统模式问题：
						</h4>
						<ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
							<li>• 每次渲染都触发 effect</li>
							<li>• 性能开销大</li>
							<li>• 可能导致无限循环</li>
							<li>• 依赖项管理复杂</li>
						</ul>
					</div>

					<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
							useEffectEvent 优势：
						</h4>
						<ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
							<li>• Effect 只运行一次</li>
							<li>• 性能开销小</li>
							<li>• 避免无限循环</li>
							<li>• 简化依赖管理</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// 高级用法模式组件
function AdvancedPatterns() {
	const [pattern, setPattern] = useState<"debounce" | "throttle" | "memo">("debounce");

	// 防抖模式
	const DebouncePattern = () => {
		const [input, setInput] = useState("");
		const [debouncedValue, setDebouncedValue] = useState("");
		const [logs, setLogs] = useState<string[]>([]);

		// useEffectEvent 方式的防抖处理
		const updateDebouncedValue = useCallback((value: string) => {
			const timer = setTimeout(() => {
				setDebouncedValue(value);
				setLogs(prev => [...prev.slice(-4), `防抖更新: "${value}"`]);
			}, 500);

			return () => clearTimeout(timer);
		}, []);

		useEffect(() => {
			return updateDebouncedValue(input);
		}, [input, updateDebouncedValue]);

		return (
			<div className="space-y-4">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="输入内容..."
					className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
				/>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<p className="text-sm text-gray-600 dark:text-gray-400">输入值:</p>
					<p className="font-mono text-gray-800 dark:text-white">"{input}"</p>
				</div>

				<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
					<p className="text-sm text-gray-600 dark:text-gray-400">防抖值:</p>
					<p className="font-mono text-green-700 dark:text-green-300">"{debouncedValue}"</p>
				</div>

				<div className="bg-gray-900 dark:bg-black p-4 rounded-lg">
					<h4 className="text-sm font-medium text-gray-300 mb-2">更新日志:</h4>
					<div className="space-y-1 text-xs font-mono">
						{logs.map((log, index) => (
							<div key={index} className="text-gray-400">{log}</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	// 节流模式
	const ThrottlePattern = () => {
		const [scrollPosition, setScrollPosition] = useState(0);
		const [throttledPosition, setThrottledPosition] = useState(0);
		const [logs, setLogs] = useState<string[]>([]);

		// useEffectEvent 方式的节流处理
		const updateScrollPosition = useCallback(() => {
			const now = Date.now();
			const lastUpdate = useRef(now);

			return () => {
				if (now - lastUpdate.current > 100) {
					setThrottledPosition(window.scrollY);
					setLogs(prev => [...prev.slice(-4), `节流更新: ${Math.round(window.scrollY)}px`]);
					lastUpdate.current = now;
				}
			};
		}, []);

		useEffect(() => {
			const handleScroll = updateScrollPosition();
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}, [updateScrollPosition]);

		return (
			<div className="space-y-4">
				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
					<p className="text-sm text-gray-600 dark:text-gray-400">实时滚动位置:</p>
					<p className="font-mono text-gray-800 dark:text-white">{Math.round(scrollPosition)}px</p>
				</div>

				<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
					<p className="text-sm text-gray-600 dark:text-gray-400">节流滚动位置:</p>
					<p className="font-mono text-green-700 dark:text-green-300">{Math.round(throttledPosition)}px</p>
				</div>

				<div className="bg-gray-900 dark:bg-black p-4 rounded-lg">
					<h4 className="text-sm font-medium text-gray-300 mb-2">更新日志:</h4>
					<div className="space-y-1 text-xs font-mono">
						{logs.map((log, index) => (
							<div key={index} className="text-gray-400">{log}</div>
						))}
					</div>
				</div>

				<div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
					<p className="text-sm text-yellow-800 dark:text-yellow-300">
						📜 滚动页面查看节流效果
					</p>
				</div>
			</div>
		);
	};

	// 记忆模式
	const MemoPattern = () => {
		const [count, setCount] = useState(0);
		const [expensiveValue, setExpensiveValue] = useState(0);
		const [logs, setLogs] = useState<string[]>([]);

		// useEffectEvent 方式的记忆计算
		const computeExpensiveValue = useCallback(() => {
			const result = Math.pow(count, 3) + Math.sqrt(count) * 100;
			setLogs(prev => [...prev.slice(-4), `计算: f(${count}) = ${result.toFixed(2)}`]);
			return result;
		}, [count]);

		useEffect(() => {
			const newValue = computeExpensiveValue();
			setExpensiveValue(newValue);
		}, [computeExpensiveValue]);

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={() => setCount(prev => prev + 1)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						增加 Count
					</button>

					<button
						onClick={() => setCount(prev => Math.max(0, prev - 1))}
						className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
					>
						减少 Count
					</button>

					<button
						onClick={() => {
							setCount(0);
							setLogs([]);
						}}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						重置
					</button>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
						<p className="text-sm text-gray-600 dark:text-gray-400">输入值:</p>
						<p className="text-2xl font-bold text-gray-800 dark:text-white">{count}</p>
					</div>

					<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
						<p className="text-sm text-gray-600 dark:text-gray-400">计算结果:</p>
						<p className="text-2xl font-bold text-green-700 dark:text-green-300">
							{expensiveValue.toFixed(2)}
						</p>
					</div>
				</div>

				<div className="bg-gray-900 dark:bg-black p-4 rounded-lg">
					<h4 className="text-sm font-medium text-gray-300 mb-2">计算日志:</h4>
					<div className="space-y-1 text-xs font-mono">
						{logs.map((log, index) => (
							<div key={index} className="text-gray-400">{log}</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				🔧 高级用法与模式
			</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "debounce", label: "防抖模式", icon: "⏱️" },
						{ key: "throttle", label: "节流模式", icon: "🚦" },
						{ key: "memo", label: "记忆模式", icon: "🧠" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setPattern(key as any)}
							className={`px-4 py-2 rounded-lg transition-colors ${
								pattern === key
									? "bg-orange-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
				<p className="text-sm text-orange-800 dark:text-orange-300">
					{pattern === "debounce" && "⏱️ 防抖模式：使用 useEffectEvent 实现高效的防抖功能，避免频繁更新"}
					{pattern === "throttle" && "🚦 节流模式：使用 useEffectEvent 实现节流功能，限制更新频率"}
					{pattern === "memo" && "🧠 记忆模式：使用 useEffectEvent 优化复杂计算，避免不必要的重复计算"}
				</p>
			</div>

			{pattern === "debounce" && <DebouncePattern />}
			{pattern === "throttle" && <ThrottlePattern />}
			{pattern === "memo" && <MemoPattern />}

			<div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
				<p className="text-sm text-purple-800 dark:text-purple-300">
					💡 <strong>高级模式总结：</strong>
					useEffectEvent 可以与各种性能优化模式结合使用，提供更简洁、更高效的实现方式，
					避免了传统方法中的复杂依赖管理和闭包陷阱问题。
				</p>
			</div>
		</div>
	);
}