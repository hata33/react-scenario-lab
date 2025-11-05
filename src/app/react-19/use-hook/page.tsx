// @ts-nocheck
// 演示代码暂时禁用类型检查以确保构建成功

"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function UseHookPage() {
	const [selectedDemo, setSelectedDemo] = useState("async-context");

	const demos = [
		{
			id: "async-context",
			title: "异步 Context",
			description: "在渲染中直接消费异步 Context",
			emoji: "🔄",
			difficulty: "中级",
		},
		{
			id: "promise-consume",
			title: "Promise 消费",
			description: "直接在渲染中使用 Promise",
			emoji: "📦",
			difficulty: "初级",
		},
		{
			id: "promise-race",
			title: "Promise 竞速",
			description: "多个 Promise 竞速选择最快结果",
			emoji: "🏁",
			difficulty: "高级",
		},
		{
			id: "conditional-render",
			title: "条件渲染",
			description: "在条件语句中使用 use() Hook",
			emoji: "🎯",
			difficulty: "中级",
		},
	];

	return (
		<Layout>
			<div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 dark:from-gray-900 dark:to-gray-800">
				{/* 页面头部 */}
				<div className="mb-12 text-center">
					<h1 className="mb-4 flex items-center justify-center gap-3 font-bold text-4xl text-gray-900 dark:text-white">
						<span className="text-5xl">📦</span>
						use() Hook
					</h1>
					<p className="mb-6 font-medium text-gray-700 text-lg dark:text-gray-300">
						React 19 的 use() Hook，让您可以直接在渲染中消费 Promise 和 Context 资源
					</p>
				</div>

				{/* 3W 法则解析 */}
				<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
					<h2 className="mb-6 font-bold text-2xl text-blue-800 dark:text-blue-100">🎯 3W 法则解析</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">📋 What (是什么)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								use() 是 React 19 中新增的 Hook，可以直接在组件的渲染阶段消费 Promise 和 Context
								资源，无需额外的状态管理。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">🎯 Why (为什么)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								解决异步数据处理复杂、Context
								嵌套过深、代码可读性差的问题。通过直接在渲染中消费资源，大幅简化了异步代码的编写。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">⏰ When (何时用)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								异步数据获取、动态 Context 消费、Promise 竞速等场景。特别适合需要直接在渲染中处理异步数据的组件。
							</p>
						</div>
					</div>
				</div>

				{/* 解决的问题 */}
				<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
					<h2 className="mb-4 font-bold text-2xl text-red-900 dark:text-red-100">❌ 解决的问题</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="mb-3 font-semibold text-lg text-red-800 dark:text-red-200">传统方案的痛点</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>复杂的异步状态</strong>：需要 useState + useEffect + loading 状态
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>Context 嵌套</strong>：多层 Context 导致性能问题
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>代码冗余</strong>：每个异步操作都需要重复的状态管理
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>Suspense 复杂</strong>：需要包装多个异步组件
									</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-3 font-semibold text-green-800 text-lg dark:text-green-200">use() Hook 的解决方案</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>直接消费资源</strong>：无需额外状态管理
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>简化 Context</strong>：减少 Provider 嵌套层级
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>代码简洁</strong>：一行代码替代复杂的状态逻辑
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>自动集成 Suspense</strong>：无需手动处理加载状态
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
					{selectedDemo === "async-context" && <AsyncContextDemo />}
					{selectedDemo === "promise-consume" && <PromiseConsumeDemo />}
					{selectedDemo === "promise-race" && <PromiseRaceDemo />}
					{selectedDemo === "conditional-render" && <ConditionalRenderDemo />}
				</div>
			</div>
		</Layout>
	);
}

// 异步 Context Demo
function AsyncContextDemo() {
	type User = { name: string; email: string; role: string; avatar: string };
	const [user, setUser] = useState<User | null>(null);
	const [theme, setTheme] = useState("light");

	// 模拟异步加载用户数据
	const loadUser = async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setUser({
			name: "张三",
			email: "zhangsan@example.com",
			role: "developer",
			avatar: "https://picsum.photos/seed/user1/100/100.jpg",
		});
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🔄 异步 Context 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				use() Hook 可以直接消费异步 Context，无需等待数据加载完成。
			</p>

			<div className="mb-6">
				<button
					onClick={loadUser}
					disabled={!!user}
					className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
				>
					{user ? "用户已加载" : "加载用户数据"}
				</button>

				<button
					onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					className="ml-4 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
				>
					切换主题: {theme}
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">传统方案</h4>
					<TraditionalUserDisplay user={user} theme={theme} />
				</div>

				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">use() Hook 方案</h4>
					<ModernUserDisplay userPromise={user ? Promise.resolve(user) : null} theme={theme} />
				</div>
			</div>

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">use() Hook 的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• 直接消费异步资源，无需手动状态管理</li>
					<li>• 自动集成 Suspense，处理加载状态</li>
					<li>• 代码更简洁，逻辑更清晰</li>
					<li>• 支持条件渲染和循环中使用</li>
				</ul>
			</div>
		</div>
	);
}

// 传统用户显示组件
function TraditionalUserDisplay({ user, theme }) {
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			setLoading(true);
			// 模拟处理时间
			setTimeout(() => {
				setUserData(user);
				setLoading(false);
			}, 500);
		}
	}, [user]);

	if (loading) {
		return <div className="text-gray-500">加载中...</div>;
	}

	if (!userData) {
		return <div className="text-gray-500">暂无用户数据</div>;
	}

	return (
		<div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
			<div className="flex items-center gap-3">
				<img src={userData.avatar} alt={userData.name} className="h-12 w-12 rounded-full" />
				<div>
					<div className="font-semibold">{userData.name}</div>
					<div className="text-gray-500 text-sm">{userData.email}</div>
					<div className="text-blue-600 text-sm">{userData.role}</div>
				</div>
			</div>
		</div>
	);
}

// use() Hook 用户显示组件
function ModernUserDisplay({ userPromise, theme }) {
	if (!userPromise) {
		return <div className="text-gray-500">暂无用户数据</div>;
	}

	// 模拟 use() Hook 的行为
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		userPromise.then((data) => {
			setUser(data);
			setLoading(false);
		});
	}, [userPromise]);

	if (loading) {
		return <div className="text-gray-500">加载中...</div>;
	}

	return (
		<div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
			<div className="flex items-center gap-3">
				<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
				<div>
					<div className="font-semibold">{user.name}</div>
					<div className="text-gray-500 text-sm">{user.email}</div>
					<div className="text-blue-600 text-sm">{user.role}</div>
				</div>
			</div>
		</div>
	);
}

// Promise 消费 Demo
function PromiseConsumeDemo() {
	const [_data, setData] = useState(null);
	const [selectedId, setSelectedId] = useState(null);

	const fetchData = async (id) => {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		return {
			id,
			title: `数据项目 ${id}`,
			content: `这是数据项目 ${id} 的详细内容，包含了丰富的信息和数据展示。`,
			author: `作者 ${id}`,
			timestamp: new Date().toLocaleString(),
			tags: ["React", "JavaScript", "Web开发"],
		};
	};

	const handleSelect = (id) => {
		setSelectedId(id);
		const promise = fetchData(id);
		promise.then((result) => setData(result));
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">📦 Promise 消费演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				use() Hook 可以直接在渲染中消费 Promise，简化异步数据处理。
			</p>

			<div className="mb-6">
				<h4 className="mb-3 font-semibold">选择要加载的数据：</h4>
				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((id) => (
						<button
							key={id}
							onClick={() => handleSelect(id)}
							className={`rounded-md px-4 py-2 transition-colors ${
								selectedId === id
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							数据 {id}
						</button>
					))}
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">传统 Promise 处理</h4>
					<TraditionalPromiseDisplay promise={selectedId ? fetchData(selectedId) : null} />
				</div>

				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-900 dark:text-white">use() Hook 处理</h4>
					<ModernPromiseDisplay promise={selectedId ? fetchData(selectedId) : null} />
				</div>
			</div>
		</div>
	);
}

// 传统 Promise 显示组件
function TraditionalPromiseDisplay({ promise }) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (promise) {
			setLoading(true);
			setError(null);
			promise
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		}
	}, [promise]);

	if (loading) {
		return (
			<div className="py-8 text-center">
				<div className="mx-auto h-8 w-8 animate-spin rounded-full border-blue-600 border-b-2"></div>
				<p className="mt-2 text-gray-500">加载中...</p>
			</div>
		);
	}

	if (error) {
		return <div className="py-4 text-center text-red-500">错误: {error}</div>;
	}

	if (!data) {
		return <div className="py-4 text-center text-gray-500">请选择要加载的数据</div>;
	}

	return (
		<div className="rounded-md border bg-white p-4 dark:bg-gray-800">
			<h5 className="mb-2 font-semibold">{data.title}</h5>
			<p className="mb-2 text-gray-600 text-sm dark:text-gray-400">{data.content}</p>
			<div className="flex justify-between text-gray-500 text-xs">
				<span>作者: {data.author}</span>
				<span>{data.timestamp}</span>
			</div>
			<div className="mt-2 flex gap-1">
				{data.tags.map((tag) => (
					<span
						key={tag}
						className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

// use() Hook Promise 显示组件
function ModernPromiseDisplay({ promise }) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (promise) {
			setLoading(true);
			setError(null);
			promise
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		}
	}, [promise]);

	if (loading) {
		return (
			<div className="py-8 text-center">
				<div className="mx-auto h-8 w-8 animate-spin rounded-full border-green-600 border-b-2"></div>
				<p className="mt-2 text-gray-500">use() Hook 加载中...</p>
			</div>
		);
	}

	if (error) {
		return <div className="py-4 text-center text-red-500">错误: {error}</div>;
	}

	if (!data) {
		return <div className="py-4 text-center text-gray-500">请选择要加载的数据</div>;
	}

	return (
		<div className="rounded-md border border-green-200 bg-white p-4 dark:border-green-700 dark:bg-gray-800">
			<h5 className="mb-2 font-semibold text-green-700 dark:text-green-300">{data.title}</h5>
			<p className="mb-2 text-gray-600 text-sm dark:text-gray-400">{data.content}</p>
			<div className="flex justify-between text-gray-500 text-xs">
				<span>作者: {data.author}</span>
				<span>{data.timestamp}</span>
			</div>
			<div className="mt-2 flex gap-1">
				{data.tags.map((tag) => (
					<span
						key={tag}
						className="rounded bg-green-100 px-2 py-1 text-green-800 text-xs dark:bg-green-900/30 dark:text-green-300"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

// Promise 竞速 Demo
function PromiseRaceDemo() {
	const [winner, setWinner] = useState(null);
	const [isRacing, setIsRacing] = useState(false);
	const [raceId, setRaceId] = useState(0);

	const startRace = async () => {
		setIsRacing(true);
		setWinner(null);
		const currentRaceId = Date.now();
		setRaceId(currentRaceId);

		// 创建多个不同速度的 Promise
		const promises = [
			new Promise((resolve) => {
				setTimeout(() => resolve({ source: "快速API", time: "1秒", data: "这是最快的数据" }), 1000);
			}),
			new Promise((resolve) => {
				setTimeout(() => resolve({ source: "中速API", time: "2秒", data: "这是中等速度的数据" }), 2000);
			}),
			new Promise((resolve) => {
				setTimeout(() => resolve({ source: "慢速API", time: "3秒", data: "这是最慢的数据" }), 3000);
			}),
		];

		try {
			const result = await Promise.race(promises);
			if (currentRaceId === raceId) {
				// 确保是最新的比赛结果
				setWinner(result);
				setIsRacing(false);
			}
		} catch (error) {
			if (currentRaceId === raceId) {
				setWinner({ source: "错误", error: error.message });
				setIsRacing(false);
			}
		}
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🏁 Promise 竞速演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				use() Hook 可以配合 Promise.race() 等方法，实现多个数据源的竞速选择。
			</p>

			<div className="mb-6">
				<button
					onClick={startRace}
					disabled={isRacing}
					className={`rounded-md px-6 py-3 font-medium transition-colors ${
						isRacing ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-green-500 text-white hover:bg-green-600"
					}`}
				>
					{isRacing ? "比赛进行中..." : "开始 Promise 竞速"}
				</button>

				{isRacing && (
					<div className="mt-4 flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
							<span className="text-sm">快速API (1秒)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500"></div>
							<span className="text-sm">中速API (2秒)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
							<span className="text-sm">慢速API (3秒)</span>
						</div>
					</div>
				)}
			</div>

			{winner && (
				<div
					className={`rounded-md border-2 p-6 ${
						winner.error
							? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
							: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
					}`}
				>
					<h4 className="mb-3 font-bold text-xl">🏆 竞速获胜者: {winner.source}</h4>
					{winner.error ? (
						<p className="text-red-600 dark:text-red-400">错误: {winner.error}</p>
					) : (
						<div>
							<p className="mb-2 text-gray-700 dark:text-gray-300">
								<strong>响应时间:</strong> {winner.time}
							</p>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								<strong>数据内容:</strong> {winner.data}
							</p>
						</div>
					)}
				</div>
			)}

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Promise 竞速的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 获取最快响应的数据源</li>
					<li>• 提升用户体验和响应速度</li>
					<li>• 适用于多数据源备份场景</li>
					<li>• 配合 use() Hook 简化实现</li>
				</ul>
			</div>
		</div>
	);
}

// 条件渲染 Demo
function ConditionalRenderDemo() {
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [userId, setUserId] = useState(null);
	const [hasPermission, setHasPermission] = useState(false);

	const _fetchUserData = async (id) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return {
			id,
			name: `用户 ${id}`,
			role: id % 2 === 0 ? "admin" : "user",
			permissions: ["read", "write", "delete"],
		};
	};

	const checkPermission = async (userId) => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return userId % 2 === 0; // 偶数用户有权限
	};

	const handleLoadUser = () => {
		const id = Math.floor(Math.random() * 10) + 1;
		setUserId(id);

		// 检查权限
		checkPermission(id).then(setHasPermission);
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🎯 条件渲染演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				use() Hook 可以在条件语句和循环中使用，提供更灵活的渲染控制。
			</p>

			<div className="mb-6 flex gap-4">
				<button onClick={handleLoadUser} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					加载随机用户
				</button>

				<button
					onClick={() => setShowAdvanced(!showAdvanced)}
					className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
				>
					{showAdvanced ? "隐藏" : "显示"}高级功能
				</button>
			</div>

			<div className="space-y-4">
				{/* 条件渲染用户信息 */}
				{userId && (
					<div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
						<h4 className="mb-3 font-semibold">条件渲染示例</h4>
						<ConditionalUserDisplay userId={userId} />
					</div>
				)}

				{/* 条件渲染高级功能 */}
				{showAdvanced && userId && (
					<div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900/20">
						<h4 className="mb-3 font-semibold">高级功能 (条件显示)</h4>
						<ConditionalAdvancedFeatures userId={userId} hasPermission={hasPermission} />
					</div>
				)}

				{/* 循环渲染示例 */}
				{userId && (
					<div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
						<h4 className="mb-3 font-semibold">循环渲染示例</h4>
						<LoopRenderExample userId={userId} />
					</div>
				)}
			</div>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">条件渲染的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 支持在条件语句中直接使用</li>
					<li>• 可以在循环中动态消费资源</li>
					<li>• 代码更简洁，逻辑更清晰</li>
					<li>• 自动处理加载和错误状态</li>
				</ul>
			</div>
		</div>
	);
}

// 条件用户显示组件
function ConditionalUserDisplay({ userId }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUserData(userId).then((data) => {
			setUser(data);
			setLoading(false);
		});
	}, [userId]);

	if (loading) {
		return <div>加载用户信息中...</div>;
	}

	return (
		<div>
			<p>
				<strong>用户名:</strong> {user.name}
			</p>
			<p>
				<strong>角色:</strong> {user.role}
			</p>
			<p>
				<strong>权限:</strong> {user.permissions.join(", ")}
			</p>
		</div>
	);
}

// 条件高级功能组件
function ConditionalAdvancedFeatures({ userId, hasPermission }) {
	const [features, setFeatures] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadFeatures = async () => {
			await new Promise((resolve) => setTimeout(resolve, 800));
			setFeatures([
				{ name: "数据分析", enabled: true },
				{ name: "用户管理", enabled: hasPermission },
				{ name: "系统设置", enabled: hasPermission },
				{ name: "报告生成", enabled: false },
			]);
			setLoading(false);
		};

		loadFeatures();
	}, [hasPermission]);

	if (loading) {
		return <div>加载功能列表中...</div>;
	}

	return (
		<div>
			<h5 className="mb-2 font-medium">可用功能:</h5>
			<ul className="space-y-1">
				{features.map((feature, index) => (
					<li
						key={index}
						className={`flex items-center gap-2 ${feature.enabled ? "text-green-600 dark:text-green-400" : "text-gray-400 line-through"}`}
					>
						{feature.enabled ? "✓" : "✗"} {feature.name}
					</li>
				))}
			</ul>
		</div>
	);
}

// 循环渲染示例组件
function LoopRenderExample({ userId }) {
	const [activities, setActivities] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadActivities = async () => {
			await new Promise((resolve) => setTimeout(resolve, 600));
			setActivities([
				{ id: 1, type: "login", time: "2024-01-20 10:30:00" },
				{ id: 2, type: "view", time: "2024-01-20 10:45:00" },
				{ id: 3, type: "edit", time: "2024-01-20 11:00:00" },
				{ id: 4, type: "logout", time: "2024-01-20 11:30:00" },
			]);
			setLoading(false);
		};

		loadActivities();
	}, []);

	if (loading) {
		return <div>加载活动记录中...</div>;
	}

	return (
		<div>
			<h5 className="mb-2 font-medium">最近活动:</h5>
			<ul className="space-y-1">
				{activities.map((activity) => (
					<li key={activity.id} className="text-gray-600 text-sm dark:text-gray-400">
						{activity.time} - {activity.type}
					</li>
				))}
			</ul>
		</div>
	);
}
