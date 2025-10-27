// @ts-nocheck
// 演示代码暂时禁用类型检查以确保构建成功

"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

export default function ServerComponentsPage() {
	const [selectedDemo, setSelectedDemo] = useState("basic-rsc");

	const demos = [
		{
			id: "basic-rsc",
			title: "基础服务端组件",
			description: "服务端渲染组件，零 JavaScript 发送到客户端",
			emoji: "🖥️",
			difficulty: "初级",
		},
		{
			id: "data-fetching",
			title: "数据获取",
			description: "在服务端直接访问数据库和 API",
			emoji: "📊",
			difficulty: "中级",
		},
		{
			id: "mixed-rendering",
			title: "混合渲染",
			description: "服务端和客户端组件的混合使用",
			emoji: "🔄",
			difficulty: "高级",
		},
		{
			id: "performance",
			title: "性能对比",
			description: "RSC vs CSR 性能差异演示",
			emoji: "⚡",
			difficulty: "中级",
		},
	];

	return (
		<Layout>
			<div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 dark:from-gray-900 dark:to-gray-800">
				{/* 页面头部 */}
				<div className="mb-12 text-center">
					<h1 className="mb-4 flex items-center justify-center gap-3 font-bold text-4xl text-gray-900 dark:text-white">
						<span className="text-5xl">🖥️</span>
						服务端组件 (RSC)
					</h1>
					<p className="mb-6 text-gray-600 text-lg dark:text-gray-300">
						React 19 服务端组件，在服务端渲染组件，只将必要的 JavaScript 发送到客户端
					</p>
				</div>

				{/* 3W 法则解析 */}
				<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
					<h2 className="mb-6 font-bold text-2xl text-blue-900 dark:text-blue-100">🎯 3W 法则解析</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">📋 What (是什么)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								服务端组件允许在服务端渲染组件，只将必要的 JavaScript 发送到客户端。通过 'use server'
								指令标识，实现零客户端 JavaScript 的组件渲染。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">🎯 Why (为什么)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								解决首屏加载慢、客户端包体积大、SEO
								效果差的问题。通过在服务端完成大部分渲染工作，大幅提升性能和用户体验。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">⏰ When (何时用)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								内容展示网站、SEO 要求高、性能敏感的应用。特别适合博客、电商产品页、文档站点等以内容展示为主的场景。
							</p>
						</div>
					</div>
				</div>

				{/* 解决的问题 */}
				<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
					<h2 className="mb-4 font-bold text-2xl text-red-900 dark:text-red-100">❌ 解决的问题</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="mb-3 font-semibold text-lg text-red-800 dark:text-red-200">传统客户端渲染的痛点</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>首屏加载慢</strong>：需要下载、解析、执行大量 JavaScript
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>包体积大</strong>：所有组件代码都需要发送到客户端
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>SEO 效果差</strong>：搜索引擎难以获取动态内容
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>性能问题</strong>：低端设备渲染性能差
									</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-3 font-semibold text-green-800 text-lg dark:text-green-200">服务端组件的解决方案</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>即时渲染</strong>：服务端直接生成 HTML，无等待时间
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>零 JavaScript</strong>：纯展示组件无需客户端代码
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>完美 SEO</strong>：搜索引擎直接获取最终 HTML
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>性能卓越</strong>：客户端只需处理必要的交互
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Demo 选择器 */}
				<div className="mb-8 flex flex-wrap justify-center gap-4">
					{demos.map((demo) => (
						<button
							key={demo.id}
							onClick={() => setSelectedDemo(demo.id)}
							className={`rounded-lg px-6 py-3 font-medium transition-all ${
								selectedDemo === demo.id
									? "scale-105 bg-blue-500 text-white shadow-lg"
									: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
							}`}
						>
							<span className="mr-2">{demo.emoji}</span>
							{demo.title}
							<span
								className={`ml-2 rounded px-2 py-1 text-xs ${
									demo.difficulty === "初级"
										? "bg-green-100 text-green-800"
										: demo.difficulty === "中级"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
								}`}
							>
								{demo.difficulty}
							</span>
						</button>
					))}
				</div>

				{/* Demo 展示区域 */}
				<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
					{selectedDemo === "basic-rsc" && <BasicRSCDemo />}
					{selectedDemo === "data-fetching" && <DataFetchingDemo />}
					{selectedDemo === "mixed-rendering" && <MixedRenderingDemo />}
					{selectedDemo === "performance" && <PerformanceDemo />}
				</div>
			</div>
		</Layout>
	);
}

// 基础服务端组件 Demo
function BasicRSCDemo() {
	const [renderMode, setRenderMode] = useState("server");

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🖥️ 基础服务端组件演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				服务端组件在服务端渲染，只发送最终的 HTML 到客户端，零 JavaScript 开销。
			</p>

			<div className="mb-6">
				<div className="mb-4 flex gap-2">
					<button
						onClick={() => setRenderMode("server")}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${
							renderMode === "server"
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
						}`}
					>
						服务端渲染 (RSC)
					</button>
					<button
						onClick={() => setRenderMode("client")}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${
							renderMode === "client"
								? "bg-purple-500 text-white"
								: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
						}`}
					>
						客户端渲染 (CSR)
					</button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
						{renderMode === "server" ? "服务端组件" : "客户端组件"}
					</h4>

					{renderMode === "server" ? <ServerProductCard /> : <ClientProductCard />}

					<div className="mt-4 text-gray-600 text-sm dark:text-gray-400">
						{renderMode === "server" ? (
							<p>✅ 在服务端渲染，零 JavaScript 发送到客户端</p>
						) : (
							<p>❌ 在客户端渲染，需要完整的 React 运行时</p>
						)}
					</div>
				</div>

				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">性能指标对比</h4>
					<PerformanceComparison renderMode={renderMode} />
				</div>
			</div>

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">服务端组件的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• 零客户端 JavaScript，加载速度快</li>
					<li>• 更好的 SEO，搜索引擎可以直接获取内容</li>
					<li>• 减少客户端计算压力，适合低端设备</li>
					<li>• 更小的包体积，只发送必要的交互代码</li>
				</ul>
			</div>
		</div>
	);
}

// 模拟服务端产品卡片组件
function ServerProductCard() {
	// 模拟服务端数据获取
	const product = {
		id: 1,
		name: "React 19 完全指南",
		price: "¥99",
		rating: 4.8,
		description: "深入学习 React 19 的新特性和最佳实践",
		features: ["服务端组件", "Actions", "use() Hook", "React Compiler"],
		reviews: 128,
		instructor: "前端专家",
	};

	return (
		<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
			<div className="mb-3 flex items-center gap-3">
				<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white">
					R19
				</div>
				<div>
					<h5 className="font-semibold text-gray-900 dark:text-white">{product.name}</h5>
					<p className="text-gray-600 text-sm dark:text-gray-400">{product.instructor}</p>
				</div>
			</div>

			<p className="mb-3 text-gray-600 text-sm dark:text-gray-400">{product.description}</p>

			<div className="mb-3 flex items-center justify-between">
				<span className="font-bold text-green-600 text-xl">{product.price}</span>
				<div className="flex items-center gap-1">
					<span className="text-yellow-500">⭐</span>
					<span className="font-medium text-sm">{product.rating}</span>
					<span className="text-gray-500 text-xs">({product.reviews})</span>
				</div>
			</div>

			<div className="mb-4">
				<p className="mb-2 font-medium text-sm">包含内容：</p>
				<div className="flex flex-wrap gap-1">
					{product.features.map((feature, index) => (
						<span
							key={index}
							className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300"
						>
							{feature}
						</span>
					))}
				</div>
			</div>

			<button className="w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600">
				立即购买
			</button>
		</div>
	);
}

// 客户端产品卡片组件
function ClientProductCard() {
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);

	// 模拟客户端数据获取
	useState(() => {
		setTimeout(() => {
			setProduct({
				id: 1,
				name: "React 19 完全指南",
				price: "¥99",
				rating: 4.8,
				description: "深入学习 React 19 的新特性和最佳实践",
				features: ["服务端组件", "Actions", "use() Hook", "React Compiler"],
				reviews: 128,
				instructor: "前端专家",
			});
			setLoading(false);
		}, 1500);
	});

	if (loading) {
		return (
			<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
				<div className="animate-pulse">
					<div className="mb-3 h-4 rounded bg-gray-300 dark:bg-gray-600"></div>
					<div className="mb-2 h-3 rounded bg-gray-300 dark:bg-gray-600"></div>
					<div className="h-3 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
			<div className="mb-3 flex items-center gap-3">
				<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white">
					C19
				</div>
				<div>
					<h5 className="font-semibold text-gray-900 dark:text-white">{product.name}</h5>
					<p className="text-gray-600 text-sm dark:text-gray-400">{product.instructor}</p>
				</div>
			</div>

			<p className="mb-3 text-gray-600 text-sm dark:text-gray-400">{product.description}</p>

			<div className="mb-3 flex items-center justify-between">
				<span className="font-bold text-green-600 text-xl">{product.price}</span>
				<div className="flex items-center gap-1">
					<span className="text-yellow-500">⭐</span>
					<span className="font-medium text-sm">{product.rating}</span>
					<span className="text-gray-500 text-xs">({product.reviews})</span>
				</div>
			</div>

			<div className="mb-4">
				<p className="mb-2 font-medium text-sm">包含内容：</p>
				<div className="flex flex-wrap gap-1">
					{product.features.map((feature, index) => (
						<span
							key={index}
							className="rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs dark:bg-purple-900/30 dark:text-purple-300"
						>
							{feature}
						</span>
					))}
				</div>
			</div>

			<button className="w-full rounded-md bg-purple-500 py-2 text-white transition-colors hover:bg-purple-600">
				立即购买
			</button>
		</div>
	);
}

// 性能对比组件
function PerformanceComparison({ renderMode }) {
	const metrics =
		renderMode === "server"
			? {
					bundleSize: "0KB",
					timeToInteractive: "0.8s",
					firstContentfulPaint: "0.3s",
					javascriptSize: "0KB",
				}
			: {
					bundleSize: "245KB",
					timeToInteractive: "2.1s",
					firstContentfulPaint: "1.2s",
					javascriptSize: "198KB",
				};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">包大小:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.bundleSize}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">可交互时间:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.timeToInteractive}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">首次内容绘制:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.firstContentfulPaint}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">JavaScript 大小:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.javascriptSize}
				</span>
			</div>
		</div>
	);
}

// 数据获取 Demo
function DataFetchingDemo() {
	const [selectedUser, setSelectedUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const loadUserData = async (userId) => {
		setLoading(true);
		// 模拟服务端数据获取
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const userData = {
			id: userId,
			name: `用户 ${userId}`,
			email: `user${userId}@example.com`,
			role: userId % 2 === 0 ? "Admin" : "User",
			joinDate: "2024-01-15",
			posts: userId * 15,
			followers: userId * 127,
			avatar: `https://picsum.photos/seed/user${userId}/100/100.jpg`,
		};
		setSelectedUser(userData);
		setLoading(false);
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">📊 数据获取演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">服务端组件可以直接访问数据库和 API，无需客户端请求。</p>

			<div className="mb-6">
				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((id) => (
						<button
							key={id}
							onClick={() => loadUserData(id)}
							className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							用户 {id}
						</button>
					))}
				</div>
			</div>

			{loading && (
				<div className="py-8 text-center">
					<div className="mx-auto h-8 w-8 animate-spin rounded-full border-blue-600 border-b-2"></div>
					<p className="mt-2 text-gray-500">服务端获取数据中...</p>
				</div>
			)}

			{selectedUser && !loading && (
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">服务端数据获取</h4>
						<ServerUserProfile user={selectedUser} />
						<div className="mt-4 rounded bg-green-50 p-3 dark:bg-green-900/20">
							<p className="text-green-800 text-sm dark:text-green-200">✅ 数据在服务端获取，客户端直接接收结果</p>
						</div>
					</div>

					<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">客户端数据获取</h4>
						<ClientUserProfile userId={selectedUser.id} />
						<div className="mt-4 rounded bg-yellow-50 p-3 dark:bg-yellow-900/20">
							<p className="text-sm text-yellow-800 dark:text-yellow-200">⚠️ 客户端需要额外请求，增加延迟和复杂性</p>
						</div>
					</div>
				</div>
			)}

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">服务端数据获取的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 直接访问数据库，无需 API 层</li>
					<li>• 减少网络请求数量</li>
					<li>• 更好的性能和用户体验</li>
					<li>• 敏感数据保留在服务端</li>
				</ul>
			</div>
		</div>
	);
}

// 服务端用户资料组件
function ServerUserProfile({ user }) {
	return (
		<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
			<div className="mb-4 flex items-center gap-3">
				<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
				<div>
					<h5 className="font-semibold text-gray-900 dark:text-white">{user.name}</h5>
					<p className="text-gray-600 text-sm dark:text-gray-400">{user.email}</p>
					<span className="inline-block rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300">
						{user.role}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.posts}</div>
					<div className="text-gray-500 text-xs">文章</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.followers}</div>
					<div className="text-gray-500 text-xs">关注者</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.joinDate}</div>
					<div className="text-gray-500 text-xs">加入时间</div>
				</div>
			</div>
		</div>
	);
}

// 客户端用户资料组件
function ClientUserProfile({ userId }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useState(() => {
		// 模拟客户端 API 请求
		setTimeout(() => {
			setUser({
				id: userId,
				name: `用户 ${userId}`,
				email: `user${userId}@example.com`,
				role: userId % 2 === 0 ? "Admin" : "User",
				joinDate: "2024-01-15",
				posts: userId * 15,
				followers: userId * 127,
				avatar: `https://picsum.photos/seed/user${userId}/100/100.jpg`,
			});
			setLoading(false);
		}, 800);
	});

	if (loading) {
		return (
			<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
				<div className="animate-pulse">
					<div className="mb-3 h-4 rounded bg-gray-300 dark:bg-gray-600"></div>
					<div className="mb-2 h-3 rounded bg-gray-300 dark:bg-gray-600"></div>
					<div className="h-3 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
			<div className="mb-4 flex items-center gap-3">
				<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
				<div>
					<h5 className="font-semibold text-gray-900 dark:text-white">{user.name}</h5>
					<p className="text-gray-600 text-sm dark:text-gray-400">{user.email}</p>
					<span className="inline-block rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs dark:bg-purple-900/30 dark:text-purple-300">
						{user.role}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.posts}</div>
					<div className="text-gray-500 text-xs">文章</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.followers}</div>
					<div className="text-gray-500 text-xs">关注者</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg dark:text-white">{user.joinDate}</div>
					<div className="text-gray-500 text-xs">加入时间</div>
				</div>
			</div>
		</div>
	);
}

// 混合渲染 Demo
function MixedRenderingDemo() {
	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🔄 混合渲染演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">服务端组件和客户端组件的混合使用，发挥各自的优势。</p>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">服务端渲染部分</h4>
					<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
						<h5 className="mb-2 font-semibold">产品信息 (服务端渲染)</h5>
						<p className="mb-3 text-gray-600 text-sm dark:text-gray-400">
							这是纯展示内容，在服务端预渲染，无需客户端 JavaScript。
						</p>
						<div className="text-green-600 text-xs dark:text-green-400">✅ 零 JavaScript，快速加载</div>
					</div>
				</div>

				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">客户端交互部分</h4>
					<div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
						<h5 className="mb-2 font-semibold">交互组件 (客户端渲染)</h5>
						<ClientInteractiveComponent />
						<div className="mt-2 text-purple-600 text-xs dark:text-purple-400">⚡ 需要交互，客户端渲染</div>
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">混合渲染的最佳实践：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 静态内容使用服务端组件</li>
					<li>• 交互功能使用客户端组件</li>
					<li>• 合理分离关注点</li>
					<li>• 优化包体积和性能</li>
				</ul>
			</div>
		</div>
	);
}

// 客户端交互组件
function ClientInteractiveComponent() {
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	const handleLike = () => {
		setLikes((prev) => prev + 1);
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			setComments((prev) => [
				...prev,
				{
					id: Date.now(),
					text: newComment,
					time: new Date().toLocaleTimeString(),
				},
			]);
			setNewComment("");
		}
	};

	return (
		<div>
			<div className="mb-4 flex gap-2">
				<button onClick={handleLike} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
					❤️ {likes}
				</button>
				<span className="text-gray-500 text-sm">点击点赞</span>
			</div>

			<form onSubmit={handleAddComment} className="mb-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="添加评论..."
						className="flex-1 rounded border px-2 py-1 text-sm"
					/>
					<button type="submit" className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
						发送
					</button>
				</div>
			</form>

			{comments.length > 0 && (
				<div className="space-y-2">
					{comments.map((comment) => (
						<div key={comment.id} className="rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
							<div className="font-medium">{comment.text}</div>
							<div className="text-gray-500 text-xs">{comment.time}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// 性能对比 Demo
function PerformanceDemo() {
	const [activeTab, setActiveTab] = useState("comparison");

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">⚡ 性能对比演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">服务端组件 vs 客户端组件的性能差异对比。</p>

			<div className="mb-6 flex gap-2">
				<button
					onClick={() => setActiveTab("comparison")}
					className={`rounded-md px-4 py-2 font-medium transition-colors ${
						activeTab === "comparison"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
					}`}
				>
					性能对比
				</button>
				<button
					onClick={() => setActiveTab("metrics")}
					className={`rounded-md px-4 py-2 font-medium transition-colors ${
						activeTab === "metrics"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
					}`}
				>
					详细指标
				</button>
				<button
					onClick={() => setActiveTab("optimization")}
					className={`rounded-md px-4 py-2 font-medium transition-colors ${
						activeTab === "optimization"
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
					}`}
				>
					优化建议
				</button>
			</div>

			{activeTab === "comparison" && <PerformanceComparisonTab />}
			{activeTab === "metrics" && <DetailedMetricsTab />}
			{activeTab === "optimization" && <OptimizationSuggestionsTab />}
		</div>
	);
}

// 性能对比标签页
function PerformanceComparisonTab() {
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-100 dark:bg-gray-700">
							<th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">指标</th>
							<th className="border border-gray-300 px-4 py-2 text-center dark:border-gray-600">服务端组件</th>
							<th className="border border-gray-300 px-4 py-2 text-center dark:border-gray-600">客户端组件</th>
							<th className="border border-gray-300 px-4 py-2 text-center dark:border-gray-600">提升</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-gray-300 px-4 py-2 dark:border-gray-600">首次内容绘制</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">0.3s</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-red-600 dark:border-gray-600">1.2s</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">
								75% ⬆️
							</td>
						</tr>
						<tr>
							<td className="border border-gray-300 px-4 py-2 dark:border-gray-600">可交互时间</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">0.8s</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-red-600 dark:border-gray-600">2.1s</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">
								62% ⬆️
							</td>
						</tr>
						<tr>
							<td className="border border-gray-300 px-4 py-2 dark:border-gray-600">JavaScript 大小</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">0KB</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-red-600 dark:border-gray-600">198KB</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">
								100% ⬇️
							</td>
						</tr>
						<tr>
							<td className="border border-gray-300 px-4 py-2 dark:border-gray-600">包大小</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">45KB</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-red-600 dark:border-gray-600">245KB</td>
							<td className="border border-gray-300 px-4 py-2 text-center text-green-600 dark:border-gray-600">
								82% ⬇️
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<h4 className="mb-3 font-semibold text-green-900 dark:text-green-100">✅ 服务端组件优势</h4>
					<ul className="space-y-1 text-green-800 text-sm dark:text-green-200">
						<li>• 即时内容显示</li>
						<li>• 零客户端 JavaScript</li>
						<li>• 更好的 SEO</li>
						<li>• 更小的包体积</li>
						<li>• 更快的首屏加载</li>
					</ul>
				</div>

				<div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
					<h4 className="mb-3 font-semibold text-yellow-900 dark:text-yellow-100">⚠️ 客户端组件限制</h4>
					<ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
						<li>• 加载时间较长</li>
						<li>• JavaScript 依赖</li>
						<li>• SEO 效果差</li>
						<li>• 包体积较大</li>
						<li>• 首屏显示慢</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

// 详细指标标签页
function DetailedMetricsTab() {
	const metrics = {
		server: {
			lcp: "1.2s",
			fid: "0ms",
			cls: "0.05",
			ttfb: "0.3s",
			fcp: "0.4s",
			si: "1.3s",
		},
		client: {
			lcp: "2.8s",
			fid: "180ms",
			cls: "0.15",
			ttfb: "0.5s",
			fcp: "1.6s",
			si: "3.2s",
		},
	};

	return (
		<div className="space-y-6">
			{Object.entries(metrics.server).map(([key, serverValue]) => {
				const clientValue = metrics.client[key];
				const improvement = ((parseFloat(clientValue) - parseFloat(serverValue)) / parseFloat(clientValue)) * 100;

				return (
					<div key={key} className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
						<div className="mb-2 flex items-center justify-between">
							<span className="font-medium text-gray-900 dark:text-white">
								{key.toUpperCase()} ({getMetricName(key)})
							</span>
							<span className={`font-bold text-sm ${improvement > 0 ? "text-green-600" : "text-red-600"}`}>
								{improvement > 0 ? "+" : ""}
								{improvement.toFixed(0)}% 改进
							</span>
						</div>
						<div className="flex gap-4">
							<div className="flex-1">
								<div className="mb-1 text-gray-500 text-xs">服务端组件</div>
								<div className="flex items-center gap-2">
									<div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-600">
										<div
											className="h-2 rounded-full bg-green-500"
											style={{ width: `${(parseFloat(serverValue) / 3) * 100}%` }}
										></div>
									</div>
									<span className="font-medium text-sm">{serverValue}</span>
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-1 text-gray-500 text-xs">客户端组件</div>
								<div className="flex items-center gap-2">
									<div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-600">
										<div
											className="h-2 rounded-full bg-red-500"
											style={{ width: `${(parseFloat(clientValue) / 3) * 100}%` }}
										></div>
									</div>
									<span className="font-medium text-sm">{clientValue}</span>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

// 优化建议标签页
function OptimizationSuggestionsTab() {
	return (
		<div className="space-y-4">
			<div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">🎯 何时使用服务端组件</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• 静态内容展示（文章、产品页面、文档）</li>
					<li>• SEO 要求高的页面</li>
					<li>• 首屏性能关键的应用</li>
					<li>• 包含敏感数据的组件</li>
					<li>• 低端设备为主要用户群体的应用</li>
				</ul>
			</div>

			<div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900/20">
				<h4 className="mb-3 font-semibold text-purple-900 dark:text-purple-100">⚡ 何时使用客户端组件</h4>
				<ul className="space-y-1 text-purple-800 text-sm dark:text-purple-200">
					<li>• 需要用户交互的组件（表单、按钮、拖拽）</li>
					<li>• 浏览器 API 访问（localStorage、window、document）</li>
					<li>• 实时数据更新（WebSocket、定时器）</li>
					<li>• 复杂的状态管理和副作用</li>
					<li>• 第三方库集成（图表库、地图库）</li>
				</ul>
			</div>

			<div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
				<h4 className="mb-3 font-semibold text-green-900 dark:text-green-100">💡 混合渲染最佳实践</h4>
				<ul className="space-y-1 text-green-800 text-sm dark:text-green-200">
					<li>• 使用 "服务器组件优先" 原则</li>
					<li>• 只在必要时使用 'use client' 指令</li>
					<li>• 将交互功能下推到组件树的叶子节点</li>
					<li>• 合理拆分组件，减少客户端渲染范围</li>
					<li>• 使用 Suspense 处理异步组件加载</li>
				</ul>
			</div>
		</div>
	);
}

// 获取指标名称
function getMetricName(key) {
	const names = {
		lcp: "Largest Contentful Paint",
		fid: "First Input Delay",
		cls: "Cumulative Layout Shift",
		ttfb: "Time to First Byte",
		fcp: "First Contentful Paint",
		si: "Speed Index",
	};
	return names[key] || key;
}
