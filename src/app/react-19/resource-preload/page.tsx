"use client";

import { useState, useEffect, Suspense } from "react";
import Layout from "@/components/Layout";

export default function ResourcePreloadPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							预加载资源 API - React 19 新特性
						</h1>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
								🚀 3W 法则解析
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-300">
										What - 它是什么？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										preload、prefetch、preinit API 是 React 19 中用于资源预加载的新机制，允许开发者提前加载关键资源，提升应用性能。
									</p>
								</div>
								<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300">
										Why - 为什么需要？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统资源加载时机不可控、关键资源延迟加载、用户体验等待等问题。通过主动预加载，减少用户等待时间。
									</p>
								</div>
								<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
									<h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-300">
										When - 何时使用？
									</h3>
									<p className="text-gray-700 dark:text-gray-300">
										用户可能访问的页面、即将显示的图片、关键 JS/CSS 资源、字体文件等需要提前加载的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Preload API 演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							preload API - 关键资源预加载
						</h2>
						<div className="grid lg:grid-cols-2 gap-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
									🚫 传统方式的问题
								</h3>
								<div className="space-y-4">
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
											传统资源加载方式：
										</p>
										<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
											<li>• 资源加载时机不可控</li>
											<li>• 关键资源可能延迟加载</li>
											<li>• 用户体验存在等待时间</li>
											<li>• 无法主动控制资源优先级</li>
										</ul>
									</div>
									<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
										<p className="text-sm font-medium text-red-800 dark:text-red-300">
											❌ 常见问题：
										</p>
										<ul className="text-sm text-red-700 dark:text-red-400 mt-2">
											<li>• 图片加载闪烁</li>
											<li>• 页面跳转延迟</li>
											<li>• 字体渲染延迟</li>
											<li>• 关键 JS 执行阻塞</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
									✅ React 19 preload 的优势
								</h3>
								<div className="space-y-4">
									<PreloadDemo />
								</div>
							</div>
						</div>
					</div>

					{/* Prefetch API 演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							prefetch API - 页面预获取
						</h2>
						<PrefetchDemo />
					</div>

					{/* Preinit API 演示 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							preinit API - 资源预处理
						</h2>
						<PreinitDemo />
					</div>

					{/* 性能对比 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							性能对比分析
						</h2>
						<PerformanceComparison />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							最佳实践指南
						</h2>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
										✅ 推荐做法
									</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												对关键 CSS 和字体使用 preload
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												对用户可能访问的页面使用 prefetch
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												对首屏关键图片使用 preload
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-green-500 mr-2">✓</span>
											<span className="text-gray-700 dark:text-gray-300">
												合理设置资源优先级
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
												过度预加载不必要的大文件
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												预加载用户 unlikely 访问的资源
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												忽略网络状况和设备性能
											</span>
										</li>
										<li className="flex items-start">
											<span className="text-red-500 mr-2">✗</span>
											<span className="text-gray-700 dark:text-gray-300">
												预加载过多低优先级资源
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

// Preload 演示组件
function PreloadDemo() {
	const [imageUrl, setImageUrl] = useState("");
	const [isPreloaded, setIsPreloaded] = useState(false);
	const [loadTime, setLoadTime] = useState<number | null>(null);

	const handlePreload = () => {
		const startTime = Date.now();
		const url = "https://picsum.photos/800/600?random=1";

		// 模拟 React 19 的 preload API
		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "image";
		link.href = url;
		document.head.appendChild(link);

		// 预加载完成后设置状态
		setTimeout(() => {
			setImageUrl(url);
			setIsPreloaded(true);
			setLoadTime(Date.now() - startTime);
		}, 100);
	};

	const handleNormalLoad = () => {
		const startTime = Date.now();
		const url = "https://picsum.photos/800/600?random=2";

		setImageUrl(url);
		setIsPreloaded(false);

		// 模拟图片加载时间
		setTimeout(() => {
			setLoadTime(Date.now() - startTime);
		}, 800);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={handlePreload}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					预加载图片
				</button>
				<button
					onClick={handleNormalLoad}
					className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
				>
					普通加载
				</button>
			</div>

			{imageUrl && (
				<div className="space-y-2">
					<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
						<p className="text-sm text-green-800 dark:text-green-300">
							{isPreloaded ? "✅ 预加载完成" : "📥 普通加载中..."}
						</p>
						{loadTime && (
							<p className="text-xs text-green-700 dark:text-green-400 mt-1">
								加载时间: {loadTime}ms
							</p>
						)}
					</div>
					<img
						src={imageUrl}
						alt="Demo"
						className="w-full h-48 object-cover rounded-lg"
						onLoad={() => {
							if (!loadTime) {
								setLoadTime(Date.now() - (Date.now() - 1000));
							}
						}}
					/>
				</div>
			)}

			<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
				<p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
					🎯 预加载的优势：
				</p>
				<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
					<li>• 提前加载关键资源</li>
					<li>• 减少用户等待时间</li>
					<li>• 提升页面渲染性能</li>
					<li>• 更好的用户体验</li>
				</ul>
			</div>
		</div>
	);
}

// Prefetch 演示组件
function PrefetchDemo() {
	const [prefetchedPages, setPrefetchedPages] = useState<string[]>([]);
	const [navigationTime, setNavigationTime] = useState<number | null>(null);

	const pages = [
		{ id: "home", name: "首页", url: "/home" },
		{ id: "products", name: "产品页", url: "/products" },
		{ id: "about", name: "关于我们", url: "/about" },
		{ id: "contact", name: "联系方式", url: "/contact" },
	];

	const handlePrefetch = (pageId: string, pageUrl: string) => {
		// 模拟 React 19 的 prefetch API
		const link = document.createElement("link");
		link.rel = "prefetch";
		link.href = pageUrl;
		document.head.appendChild(link);

		setPrefetchedPages(prev => [...prev, pageId]);

		// 3秒后移除
		setTimeout(() => {
			setPrefetchedPages(prev => prev.filter(id => id !== pageId));
		}, 3000);
	};

	const handleNavigate = (pageName: string) => {
		const startTime = Date.now();

		// 模拟页面导航
		setTimeout(() => {
			setNavigationTime(Date.now() - startTime);
		}, Math.random() * 500 + 100);
	};

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					📄 页面预获取演示
				</h3>
				<div className="space-y-3">
					{pages.map(page => (
						<div
							key={page.id}
							className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
						>
							<span className="text-gray-700 dark:text-gray-300">
								{page.name}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => handlePrefetch(page.id, page.url)}
									disabled={prefetchedPages.includes(page.id)}
									className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
								>
									{prefetchedPages.includes(page.id) ? "已预取" : "预取"}
								</button>
								<button
									onClick={() => handleNavigate(page.name)}
									className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								>
									导航
								</button>
							</div>
						</div>
					))}
				</div>

				{navigationTime && (
					<div className="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
						<p className="text-sm text-green-800 dark:text-green-300">
							导航到页面耗时: {navigationTime}ms
						</p>
						<p className="text-xs text-green-700 dark:text-green-400 mt-1">
							{navigationTime < 200 ? "⚡ 极快" : navigationTime < 500 ? "🚀 快速" : "🐌 较慢"}
						</p>
					</div>
				)}
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					📊 Prefetch 使用场景
				</h3>
				<div className="space-y-4">
					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
							适合预取的页面：
						</h4>
						<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
							<li>• 用户可能点击的链接</li>
							<li>• 分页的下一页内容</li>
							<li>• 流程中的下一步页面</li>
							<li>• 热门搜索结果页面</li>
						</ul>
					</div>

					<div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
							⚠️ 注意事项：
						</h4>
						<ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
							<li>• 不要预取过多页面</li>
							<li>• 避免预取大型资源</li>
							<li>• 考虑用户的网络状况</li>
							<li>• 监控预取命中率</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// Preinit 演示组件
function PreinitDemo() {
	const [scriptsLoaded, setScriptsLoaded] = useState<string[]>([]);
	const [initTime, setInitTime] = useState<number | null>(null);

	const scripts = [
		{ id: "analytics", name: "分析脚本", src: "/analytics.js" },
		{ id: "chat", name: "聊天插件", src: "/chat-widget.js" },
		{ id: "payment", name: "支付 SDK", src: "/payment-sdk.js" },
	];

	const handlePreinit = (scriptId: string, scriptSrc: string) => {
		const startTime = Date.now();

		// 模拟 React 19 的 preinit API
		const link = document.createElement("link");
		link.rel = "preinit";
		link.as = "script";
		link.href = scriptSrc;
		document.head.appendChild(link);

		// 模拟脚本预处理和执行
		setTimeout(() => {
			setScriptsLoaded(prev => [...prev, scriptId]);
			setInitTime(Date.now() - startTime);
		}, 300);
	};

	const executeScript = (scriptName: string) => {
		// 模拟脚本执行
		console.log(`执行 ${scriptName}`);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
				⚡ 脚本预处理演示
			</h3>
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<h4 className="font-medium text-gray-700 dark:text-gray-300">
						可用脚本：
					</h4>
					{scripts.map(script => (
						<div
							key={script.id}
							className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
						>
							<span className="text-gray-700 dark:text-gray-300">
								{script.name}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => handlePreinit(script.id, script.src)}
									disabled={scriptsLoaded.includes(script.id)}
									className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
								>
									{scriptsLoaded.includes(script.id) ? "已预处理" : "预处理"}
								</button>
								<button
									onClick={() => executeScript(script.name)}
									disabled={!scriptsLoaded.includes(script.id)}
									className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
								>
									执行
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="space-y-4">
					{initTime && (
						<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
							<p className="text-sm text-purple-800 dark:text-purple-300">
								预处理完成，耗时: {initTime}ms
							</p>
							<p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
								脚本已准备好立即执行
							</p>
						</div>
					)}

					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
						<h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
							Preinit 的优势：
						</h4>
						<ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
							<li>• 提前下载和解析脚本</li>
							<li>• 减少执行延迟</li>
							<li>• 避免渲染阻塞</li>
							<li>• 更好的脚本管理</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// 性能对比组件
function PerformanceComparison() {
	const [selectedScenario, setSelectedScenario] = useState<"mobile" | "desktop" | "slow-network">("desktop");
	const [showMetrics, setShowMetrics] = useState(false);

	const scenarios = {
		mobile: {
			name: "移动设备",
			network: "4G",
			description: "手机网络环境下的性能表现",
		},
		desktop: {
			name: "桌面设备",
			network: "WiFi",
			description: "桌面端 WiFi 环境下的性能表现",
		},
		"slow-network": {
			name: "慢速网络",
			network: "3G",
			description: "网络状况较差时的性能表现",
		},
	};

	const performanceData = {
		mobile: {
			traditional: { fcp: 1800, lcp: 3200, cls: 0.15, fid: 180 },
			optimized: { fcp: 1200, lcp: 2100, cls: 0.08, fid: 85 },
		},
		desktop: {
			traditional: { fcp: 800, lcp: 1500, cls: 0.05, fid: 45 },
			optimized: { fcp: 500, lcp: 900, cls: 0.02, fid: 20 },
		},
		"slow-network": {
			traditional: { fcp: 3500, lcp: 6800, cls: 0.25, fid: 320 },
			optimized: { fcp: 2200, lcp: 4100, cls: 0.12, fid: 150 },
		},
	};

	const currentData = performanceData[selectedScenario];

	const calculateImprovement = (traditional: number, optimized: number) => {
		return Math.round(((traditional - optimized) / traditional) * 100);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
					📈 性能测试场景
				</h3>
				<div className="flex gap-4 mb-6">
					{Object.entries(scenarios).map(([key, scenario]) => (
						<button
							key={key}
							onClick={() => setSelectedScenario(key as any)}
							className={`px-4 py-2 rounded-lg transition-colors ${
								selectedScenario === key
									? "bg-blue-600 text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							{scenario.name}
						</button>
					))}
				</div>

				<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						{scenarios[selectedScenario].name} ({scenarios[selectedScenario].network})
					</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{scenarios[selectedScenario].description}
					</p>
				</div>

				<button
					onClick={() => setShowMetrics(!showMetrics)}
					className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-6"
				>
					{showMetrics ? "隐藏" : "显示"}性能指标
				</button>

				{showMetrics && (
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-red-800 dark:text-red-300 mb-3">
								🚫 传统加载方式
							</h4>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">FCP:</span>
									<span className="text-sm font-medium">{currentData.traditional.fcp}ms</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">LCP:</span>
									<span className="text-sm font-medium">{currentData.traditional.lcp}ms</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">CLS:</span>
									<span className="text-sm font-medium">{currentData.traditional.cls}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">FID:</span>
									<span className="text-sm font-medium">{currentData.traditional.fid}ms</span>
								</div>
							</div>
						</div>

						<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
							<h4 className="font-medium text-green-800 dark:text-green-300 mb-3">
								✅ 预加载优化
							</h4>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">FCP:</span>
									<span className="text-sm font-medium">
										{currentData.optimized.fcp}ms
										<span className="text-green-600 ml-2">
											(-{calculateImprovement(currentData.traditional.fcp, currentData.optimized.fcp)}%)
										</span>
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">LCP:</span>
									<span className="text-sm font-medium">
										{currentData.optimized.lcp}ms
										<span className="text-green-600 ml-2">
											(-{calculateImprovement(currentData.traditional.lcp, currentData.optimized.lcp)}%)
										</span>
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">CLS:</span>
									<span className="text-sm font-medium">
										{currentData.optimized.cls}
										<span className="text-green-600 ml-2">
											(-{calculateImprovement(currentData.traditional.cls * 100, currentData.optimized.cls * 100)}%)
										</span>
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">FID:</span>
									<span className="text-sm font-medium">
										{currentData.optimized.fid}ms
										<span className="text-green-600 ml-2">
											(-{calculateImprovement(currentData.traditional.fid, currentData.optimized.fid)}%)
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
					<p className="text-sm text-blue-800 dark:text-blue-300">
						💡 <strong>关键洞察：</strong>
						预加载技术在网络状况较差的环境中效果最为显著，移动设备的性能提升尤为明显。
					</p>
				</div>
			</div>
		</div>
	);
}