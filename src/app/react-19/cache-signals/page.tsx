"use client";

import { CheckCircle, Clock, Code, Copy, Database, Target, Zap } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";

// 示例接口定义
interface CacheSignalExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	status: "completed" | "in-progress" | "pending";
	icon: React.ReactNode;
	codeSnippet: string;
	details?: string[];
	useCases?: string[];
}

// 示例数据
const cacheSignalExamples: CacheSignalExample[] = [
	{
		id: "basic-caching",
		title: "📦 基础缓存机制",
		description: "展示 Cache Signals 的基本缓存功能，包括数据的存储、获取和失效机制。",
		category: "State Management",
		difficulty: "初级",
		status: "completed",
		icon: <Database className="h-5 w-5" />,
		codeSnippet: `// 基础缓存示例
function UserProfile({ userId }) {
  // 使用 cache signal 缓存用户数据
  const user = cache.use(\`user-\${userId}\`, async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  });

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
		details: ["自动缓存数据，避免重复请求", "依赖追踪，智能失效", "支持异步数据获取"],
		useCases: ["用户信息缓存", "API 响应缓存", "计算结果缓存"],
	},
	{
		id: "dependency-tracking",
		title: "🔍 智能依赖追踪",
		description: "演示 Cache Signals 如何自动追踪数据依赖关系，实现精确的缓存失效。",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `// 复杂的依赖关系自动追踪
function UserDashboard({ userId }) {
  // 自动追踪用户数据的依赖
  const user = cache.use(\`user-\${userId}\`, () => fetchUser(userId));

  // 自动追踪文章对用户的依赖
  const posts = cache.use(\`posts-\${userId}\`, () => fetchUserPosts(userId));

  // 当用户数据变化时，自动失效相关缓存
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
}`,
		details: ["自动建立依赖图", "级联缓存失效", "最小化重新渲染"],
		useCases: ["复杂数据关系", "组件间数据共享", "级联更新场景"],
	},
	{
		id: "cache-strategies",
		title: "⚡ 缓存策略管理",
		description: "展示不同的缓存策略，包括 TTL、LRU 和自定义失效策略。",
		category: "Performance",
		difficulty: "高级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `// 多种缓存策略
function DataCache() {
  const [strategy, setStrategy] = useState("ttl");

  const cacheConfig = {
    ttl: { ttl: 5000 }, // 5秒过期
    lru: { maxSize: 100 }, // 最多100项
    custom: { shouldInvalidate: (data) => data.isStale }
  };

  const data = cache.use("api-data", fetchData, {
    ...cacheConfig[strategy],
    strategy: strategy
  });

  return (
    <CacheControls
      strategy={strategy}
      onChange={setStrategy}
      data={data}
    />
  );
}`,
		details: ["TTL (生存时间) 策略", "LRU (最近最少使用) 策略", "自定义失效策略", "策略动态切换"],
		useCases: ["实时数据缓存", "大量数据管理", "性能优化场景"],
	},
	{
		id: "advanced-applications",
		title: "🕐 高级应用场景",
		description: "展示 Cache Signals 在复杂场景中的应用，包括实时数据、计算缓存等。",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Clock className="h-5 w-5" />,
		codeSnippet: `// 实时数据缓存
function useRealtimeData(channel) {
  return cache.use(\`realtime-\${channel}\`, async () => {
    // 建立实时连接
    const subscription = createSubscription(channel, {
      onData: (newData) => {
        // 自动更新缓存
        cache.update(\`realtime-\${channel}\`, newData);
      }
    });

    return { data: initialData, subscription };
  }, {
    // 实时数据特殊配置
    realtime: true,
    subscription: true,
    autoReconnect: true
  });
}`,
		details: ["实时数据同步", "计算结果缓存", "离线数据支持", "网络状态感知"],
		useCases: ["实时聊天应用", "复杂计算缓存", "离线优先应用", "数据密集型应用"],
	},
];

// 获取官方示例
const getOfficialExamples = () => [
	{
		title: "🔍 智能依赖追踪",
		code: `// 复杂的依赖关系自动追踪
function UserDashboard({ userId }) {
  // 自动追踪用户数据的依赖
  const user = cache.use(\`user-\${userId}\`, () => fetchUser(userId));

  // 自动追踪文章对用户的依赖
  const posts = cache.use(\`posts-\${userId}\`, () => fetchUserPosts(userId));

  // 当用户数据变化时，自动失效相关缓存
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
}`,
	},
	{
		title: "⚡ 缓存策略管理",
		code: `// 多种缓存策略
function DataCache() {
  const [strategy, setStrategy] = useState("ttl");

  const cacheConfig = {
    ttl: { ttl: 5000 }, // 5秒过期
    lru: { maxSize: 100 }, // 最多100项
    custom: { shouldInvalidate: (data) => data.isStale }
  };

  const data = cache.use("api-data", fetchData, {
    ...cacheConfig[strategy],
    strategy: strategy
  });

  return (
    <CacheControls
      strategy={strategy}
      onChange={setStrategy}
      data={data}
    />
  );
}`,
	},
	{
		title: "🕐 实时数据缓存",
		code: `// 实时数据缓存
function useRealtimeData(channel) {
  return cache.use(\`realtime-\${channel}\`, async () => {
    // 建立实时连接
    const subscription = createSubscription(channel, {
      onData: (newData) => {
        // 自动更新缓存
        cache.update(\`realtime-\${channel}\`, newData);
      },
      onConnect: () => cache.update(\`status-\${channel}\`, 'connected'),
      onDisconnect: () => cache.update(\`status-\${channel}\`, 'disconnected')
    });

    return { data: initialData, subscription };
  }, {
    // 实时数据特殊配置
    realtime: true,
    subscription: true,
    autoReconnect: true
  });
}`,
	},
];

export default function CacheSignalsPage() {
	const [selectedExample, setSelectedExample] = useState(cacheSignalExamples[0]);
	const [copiedCode, setCopiedCode] = useState<string | null>(null);

	// 复制代码功能
	const handleCopyCode = async (code: string) => {
		try {
			await navigator.clipboard.writeText(code);
			setCopiedCode(code);
			setTimeout(() => setCopiedCode(null), 2000);
		} catch (error) {
			console.error("复制失败:", error);
		}
	};

	// 恢复选中状态
	useEffect(() => {
		const savedExample = sessionStorage.getItem("selectedCacheSignalExample");
		if (savedExample) {
			const example = cacheSignalExamples.find((ex) => ex.id === savedExample);
			if (example) setSelectedExample(example);
		}
	}, []);

	// 保存选中状态
	useEffect(() => {
		sessionStorage.setItem("selectedCacheSignalExample", selectedExample.id);
	}, [selectedExample]);

	// 模拟 Cache Signals 缓存机制
	const cache = React.useRef(new Map());
	const dependencies = React.useRef(new Map());

	const handleCacheToggle = useCallback(() => {
		// 模拟缓存操作
		const key = `demo-${Date.now()}`;
		const value = { data: "sample", timestamp: Date.now() };
		cache.current.set(key, value);
		console.log("缓存已更新:", { key, value });
	}, []);

	const handleSearch = useCallback(async () => {
		// 模拟搜索操作
		const query = "sample query";
		console.log("执行搜索:", query);
	}, []);

	const clearCache = useCallback(() => {
		// 清空缓存
		cache.current.clear();
		dependencies.current.clear();
		console.log("缓存已清空");
	}, []);

	return (
		<Layout>
			<div className="container mx-auto py-8">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-3xl">React 19 Cache Signals</h1>
					<p className="mb-6 text-gray-600">
						Cache Signals 是 React 19 中的新特性，提供智能缓存和依赖追踪机制。
						通过自动化的缓存管理，显著提升应用性能和用户体验。
					</p>

					{/* 3W 规则部分 */}
					<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
						<h2 className="mb-4 text-xl font-semibold text-blue-800">📖 3W 规则：Cache Signals</h2>
						<div className="grid gap-6 md:grid-cols-3">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
										W
									</div>
									<h3 className="font-semibold text-blue-800">What - 什么是 Cache Signals</h3>
								</div>
								<p className="text-blue-700 leading-relaxed">
									Cache Signals 是 React 19 引入的智能缓存系统，它能够自动追踪组件间的数据依赖关系，
									并在数据发生变化时智能地更新相关缓存。它结合了缓存机制和信号系统，
									为开发者提供了一个既高效又易用的状态管理解决方案。
								</p>
								<div className="rounded border border-blue-200 bg-white p-3">
									<h4 className="mb-2 font-medium text-blue-800">核心特性</h4>
									<ul className="space-y-1 text-sm text-blue-700">
										<li>• 自动依赖追踪</li>
										<li>• 智能缓存失效</li>
										<li>• 精确更新机制</li>
										<li>• 性能优化</li>
									</ul>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold">
										W
									</div>
									<h3 className="font-semibold text-green-800">Why - 为什么使用 Cache Signals</h3>
								</div>
								<p className="text-green-700 leading-relaxed">
									传统的缓存方案往往需要手动管理依赖关系，容易出现过度渲染或缓存失效不及时的问题。
									Cache Signals 通过自动化的依赖追踪和智能更新机制，解决了这些痛点，
									让开发者能够专注于业务逻辑而不用担忕性能问题。
								</p>
								<div className="rounded border border-green-200 bg-white p-3">
									<h4 className="mb-2 font-medium text-green-800">解决的问题</h4>
									<ul className="space-y-1 text-sm text-green-700">
										<li>• 减少不必要的重新渲染</li>
										<li>• 避免缓存失效不及时</li>
										<li>• 简化状态管理逻辑</li>
										<li>• 提升应用响应速度</li>
									</ul>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
										W
									</div>
									<h3 className="font-semibold text-purple-800">When - 何时使用 Cache Signals</h3>
								</div>
								<p className="text-purple-700 leading-relaxed">
									当你的应用需要处理复杂的数据依赖关系、频繁的数据更新或需要优化性能时，
									Cache Signals 就是一个理想的选择。特别适合数据密集型应用、实时数据同步、
									以及需要精确控制缓存失效策略的场景。
								</p>
								<div className="rounded border border-purple-200 bg-white p-3">
									<h4 className="mb-2 font-medium text-purple-800">最佳使用场景</h4>
									<ul className="space-y-1 text-sm text-purple-700">
										<li>• 复杂数据依赖关系</li>
										<li>• 实时数据同步</li>
										<li>• 大数据量缓存</li>
										<li>• 性能敏感型应用</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{cacheSignalExamples.map((example) => (
							<button
								key={example.id}
								onClick={() => setSelectedExample(example)}
								className={`rounded-lg border p-4 text-left transition-all ${selectedExample.id === example.id
										? "border-blue-500 bg-blue-50 shadow-md"
										: "border-gray-200 bg-white hover:border-gray-300 hover:shadow"
									}`}
							>
								<div className="mb-2 flex items-center gap-2">
									{example.icon}
									<h3 className="font-semibold">{example.title}</h3>
								</div>
								<p className="mb-3 text-gray-600 text-sm">{example.description}</p>
								<div className="flex items-center justify-between">
									<span
										className={`rounded px-2 py-1 font-medium text-xs ${example.category === "State Management"
												? "bg-blue-100 text-blue-800"
												: example.category === "Performance"
													? "bg-orange-100 text-orange-800"
													: "bg-gray-100 text-gray-800"
											}`}
									>
										{example.category}
									</span>
									<span
										className={`rounded px-2 py-1 font-medium text-xs ${example.difficulty === "初级"
												? "bg-green-100 text-green-800"
												: example.difficulty === "中级"
													? "bg-yellow-100 text-yellow-800"
													: "bg-red-100 text-red-800"
											}`}
									>
										{example.difficulty}
									</span>
								</div>
							</button>
						))}
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="rounded-lg border border-gray-200 bg-white p-6">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="font-semibold text-xl">{selectedExample.title}</h2>
								<div className="flex items-center gap-2">
									{selectedExample.icon}
									<span
										className={`rounded px-2 py-1 font-medium text-xs ${selectedExample.status === "completed"
												? "bg-green-100 text-green-800"
												: selectedExample.status === "in-progress"
													? "bg-yellow-100 text-yellow-800"
													: "bg-gray-100 text-gray-800"
											}`}
									>
										{selectedExample.status === "completed"
											? "已完成"
											: selectedExample.status === "in-progress"
												? "进行中"
												: "待完成"}
									</span>
								</div>
							</div>

							<p className="mb-6 text-gray-600">{selectedExample.description}</p>

							<div className="mb-6">
								<div className="mb-3 flex items-center justify-between">
									<h3 className="font-medium">示例代码</h3>
									<button
										onClick={() => handleCopyCode(selectedExample.codeSnippet)}
										className="flex items-center gap-1 rounded px-3 py-1 text-gray-600 text-sm hover:bg-gray-100"
									>
										<Code className="h-4 w-4" />
										{copiedCode === selectedExample.codeSnippet ? "已复制!" : "复制代码"}
									</button>
								</div>
								<div className="overflow-auto rounded-lg bg-gray-900 p-4">
									<pre className="text-gray-100 text-sm">
										<code>{selectedExample.codeSnippet}</code>
									</pre>
								</div>
							</div>

							{selectedExample.details && (
								<div className="mb-6">
									<h3 className="mb-3 font-medium">核心特性</h3>
									<ul className="list-inside list-disc space-y-1">
										{selectedExample.details.map((detail, index) => (
											<li key={index} className="text-gray-600">
												{detail}
											</li>
										))}
									</ul>
								</div>
							)}

							{selectedExample.useCases && (
								<div>
									<h3 className="mb-3 font-medium">使用场景</h3>
									<div className="flex flex-wrap gap-2">
										{selectedExample.useCases.map((useCase, index) => (
											<span key={index} className="rounded bg-blue-50 px-3 py-1 text-blue-800 text-sm">
												{useCase}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="space-y-6">
							<div className="rounded-lg border border-gray-200 bg-white p-6">
								<h3 className="mb-4 font-semibold">快速操作</h3>
								<div className="space-y-3">
									<button
										onClick={handleCacheToggle}
										className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
									>
										<Database className="mr-2 inline h-4 w-4" />
										模拟缓存操作
									</button>
									<button
										onClick={handleSearch}
										className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
									>
										<Target className="mr-2 inline h-4 w-4" />
										执行搜索
									</button>
									<button
										onClick={clearCache}
										className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
									>
										<Zap className="mr-2 inline h-4 w-4" />
										清空缓存
									</button>
								</div>
							</div>

							<div className="rounded-lg border border-gray-200 bg-white p-6">
								<h3 className="mb-4 font-semibold">官方示例</h3>
								<div className="space-y-4">
									{getOfficialExamples().map((example, index) => (
										<div key={index} className="border-gray-100 border-b pb-4 last:border-0">
											<h4 className="mb-2 font-medium text-sm">{example.title}</h4>
											<div className="overflow-auto rounded bg-gray-50 p-3">
												<pre className="text-gray-700 text-xs">
													<code>{example.code}</code>
												</pre>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
								<h3 className="mb-3 font-semibold text-blue-800">💡 提示</h3>
								<p className="text-blue-700 text-sm">
									Cache Signals 自动管理缓存依赖，当数据发生变化时会智能地更新相关组件， 确保 UI 始终显示最新的数据。
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12">
					<div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
						<h2 className="mb-4 font-bold text-2xl">开始使用 Cache Signals</h2>
						<div className="grid gap-6 md:grid-cols-3">
							<div className="text-center">
								<div className="mb-4 flex justify-center">
									<div className="rounded-full bg-blue-100 p-3">
										<Database className="h-6 w-6 text-blue-600" />
									</div>
								</div>
								<h3 className="mb-2 font-semibold">1. 定义缓存</h3>
								<p className="text-gray-600 text-sm">使用 cache.use() 定义需要缓存的数据和获取函数</p>
							</div>
							<div className="text-center">
								<div className="mb-4 flex justify-center">
									<div className="rounded-full bg-green-100 p-3">
										<Target className="h-6 w-6 text-green-600" />
									</div>
								</div>
								<h3 className="mb-2 font-semibold">2. 自动追踪</h3>
								<p className="text-gray-600 text-sm">Cache Signals 自动追踪数据依赖关系</p>
							</div>
							<div className="text-center">
								<div className="mb-4 flex justify-center">
									<div className="rounded-full bg-purple-100 p-3">
										<Zap className="h-6 w-6 text-purple-600" />
									</div>
								</div>
								<h3 className="mb-2 font-semibold">3. 智能更新</h3>
								<p className="text-gray-600 text-sm">当依赖数据变化时自动更新缓存</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// 基础缓存演示组件
function BasicCachingDemo() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [cacheHits, setCacheHits] = useState(0);

	const fetchData = useCallback(async (forceRefresh = false) => {
		setLoading(true);
		// 模拟 API 调用
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setData({
			id: 1,
			name: "Sample Data",
			timestamp: Date.now(),
			fromCache: !forceRefresh,
		});
		if (!forceRefresh) {
			setCacheHits((prev) => prev + 1);
		}
		setLoading(false);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<button
					onClick={() => fetchData()}
					disabled={loading}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "加载中..." : "加载数据"}
				</button>
				<button
					onClick={() => fetchData(true)}
					disabled={loading}
					className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
				>
					强制刷新
				</button>
			</div>

			{data && (
				<div className="rounded border border-gray-200 bg-white p-4">
					<h4 className="mb-2 font-medium">数据结果</h4>
					<p>ID: {data.id}</p>
					<p>名称: {data.name}</p>
					<p>时间戳: {new Date(data.timestamp).toLocaleTimeString()}</p>
					<p className="text-gray-600 text-sm">{data.fromCache ? "🎯 来自缓存" : "🌐 网络请求"}</p>
				</div>
			)}

			<div className="text-gray-600 text-sm">缓存命中次数: {cacheHits}</div>
		</div>
	);
}

// 依赖追踪演示组件
function DependencyTrackingDemo() {
	const [userId, setUserId] = useState(1);
	const [user, setUser] = useState<any>(null);
	const [posts, setPosts] = useState<any[]>([]);

	const fetchUser = useCallback(async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return { id, name: `User ${id}`, email: `user${id}@example.com` };
	}, []);

	const fetchUserPosts = useCallback(async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 800));
		return Array.from({ length: 3 }, (_, i) => ({
			id: i + 1,
			title: `Post ${i + 1} by User ${id}`,
			content: `Content for post ${i + 1}`,
		}));
	}, []);

	useEffect(() => {
		fetchUser(userId).then(setUser);
		fetchUserPosts(userId).then(setPosts);
	}, [userId, fetchUser, fetchUserPosts]);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<label>用户 ID:</label>
				<input
					type="number"
					value={userId}
					onChange={(e) => setUserId(Number(e.target.value))}
					className="rounded border border-gray-300 px-3 py-1"
					min="1"
				/>
			</div>

			{user && (
				<div className="rounded border border-blue-200 bg-blue-50 p-4">
					<h4 className="mb-2 font-medium">用户信息</h4>
					<p>ID: {user.id}</p>
					<p>姓名: {user.name}</p>
					<p>邮箱: {user.email}</p>
				</div>
			)}

			{posts.length > 0 && (
				<div className="rounded border border-green-200 bg-green-50 p-4">
					<h4 className="mb-2 font-medium">用户文章</h4>
					<div className="space-y-2">
						{posts.map((post) => (
							<div key={post.id} className="border-green-100 border-b pb-2">
								<h5 className="font-medium">{post.title}</h5>
								<p className="text-gray-600 text-sm">{post.content}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// 缓存策略演示组件
function CacheStrategiesDemo() {
	const [strategy, setStrategy] = useState("ttl");
	const [data, setData] = useState<any[]>([]);
	const [stats, setStats] = useState({ hits: 0, misses: 0, evictions: 0 });

	const strategies = [
		{ value: "ttl", label: "TTL (5秒过期)", description: "数据在5秒后自动过期" },
		{ value: "lru", label: "LRU (最近最少使用)", description: "最多保留10个最近使用的项目" },
		{ value: "size", label: "Size (大小限制)", description: "总数据大小不超过1KB" },
	];

	const addData = useCallback(() => {
		const newItem = {
			id: Date.now(),
			value: Math.random().toString(36).substring(7),
			timestamp: Date.now(),
			strategy,
		};

		setData((prev) => {
			const updated = [...prev, newItem];

			// 应用不同的缓存策略
			if (strategy === "ttl") {
				// TTL: 移除5秒前的数据
				const cutoff = Date.now() - 5000;
				return updated.filter((item) => item.timestamp > cutoff);
			} else if (strategy === "lru") {
				// LRU: 只保留最近的10个项目
				return updated.slice(-10);
			} else if (strategy === "size") {
				// Size: 简单的大小限制演示
				return updated.slice(-5);
			}

			return updated;
		});

		setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
	}, [strategy]);

	const clearData = useCallback(() => {
		setData([]);
		setStats({ hits: 0, misses: 0, evictions: 0 });
	}, []);

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h4 className="font-medium">选择缓存策略:</h4>
				<div className="grid gap-2">
					{strategies.map((s) => (
						<label key={s.value} className="flex items-center gap-2">
							<input
								type="radio"
								value={s.value}
								checked={strategy === s.value}
								onChange={(e) => setStrategy(e.target.value)}
							/>
							<div>
								<span className="font-medium">{s.label}</span>
								<p className="text-gray-600 text-sm">{s.description}</p>
							</div>
						</label>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				<button onClick={addData} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					添加数据
				</button>
				<button onClick={clearData} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					清空数据
				</button>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-blue-600 text-lg">{stats.hits}</div>
					<div className="text-gray-600 text-sm">缓存命中</div>
				</div>
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-lg text-orange-600">{stats.misses}</div>
					<div className="text-gray-600 text-sm">缓存未命中</div>
				</div>
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-lg text-red-600">{stats.evictions}</div>
					<div className="text-gray-600 text-sm">缓存淘汰</div>
				</div>
			</div>

			{data.length > 0 && (
				<div className="rounded border border-gray-200 bg-white p-4">
					<h4 className="mb-2 font-medium">缓存数据 ({data.length} 项)</h4>
					<div className="space-y-1">
						{data.map((item) => (
							<div key={item.id} className="flex justify-between text-sm">
								<span>{item.value}</span>
								<span className="text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// 高级应用演示组件
function AdvancedApplicationsDemo() {
	const [scenario, setScenario] = useState("realtime");
	const [connectionStatus, setConnectionStatus] = useState("disconnected");
	const [messages, setMessages] = useState<any[]>([]);

	// 计算缓存演示状态
	const [computing, setComputing] = useState(false);
	const [input, setInput] = useState("");
	const [computationResults, setComputationResults] = useState<any>({});
	const computationCache = React.useRef(new Map());

	const handleScenarioChange = useCallback((newScenario: string) => {
		setScenario(newScenario);
		setMessages([]);
	}, []);

	// 实时数据演示的连接逻辑
	const subscriptionRef = React.useRef<any>(null);

	const connect = useCallback(() => {
		setConnectionStatus("connected");
		subscriptionRef.current = Math.random().toString(36).substring(2, 11);

		// 模拟实时数据推送
		const interval = setInterval(() => {
			const message = {
				id: `msg-${Date.now()}`,
				text: `实时消息 ${Math.random().toString(36).substring(2, 7)}`,
				timestamp: new Date().toLocaleTimeString(),
				subscriptionId: subscriptionRef.current,
			};

			setMessages((prev) => [...prev.slice(-9), message]);
		}, 2000);

		setTimeout(() => {
			clearInterval(interval);
			setConnectionStatus("disconnected");
		}, 20000);
	}, []);

	const disconnect = useCallback(() => {
		setConnectionStatus("disconnected");
		subscriptionRef.current = null;
	}, []);

	// 计算缓存演示的函数
	const expensiveComputation = useCallback((value: string) => {
		const cacheKey = `compute-${value}`;

		if (computationCache.current.has(cacheKey)) {
			return computationCache.current.get(cacheKey);
		}

		// 模拟复杂计算
		const startTime = Date.now();
		let result = 0;
		for (let i = 0; i < 2000000; i++) {
			result += Math.sqrt(i) * Math.random();
		}

		const computationTime = Date.now() - startTime;

		const output = {
			input: value,
			result: result.toFixed(2),
			computationTime,
			timestamp: new Date().toLocaleTimeString(),
		};

		computationCache.current.set(cacheKey, output);
		return output;
	}, []);

	const compute = useCallback(() => {
		if (!input.trim()) return;

		setComputing(true);
		setTimeout(() => {
			const result = expensiveComputation(input);
			setComputationResults((prev: any) => ({ ...prev, [input]: result }));
			setComputing(false);
		}, 100);
	}, [input, expensiveComputation]);

	const clearComputationCache = useCallback(() => {
		computationCache.current.clear();
		setComputationResults({});
	}, []);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🚀 高级应用场景演示</h5>

			<div className="mb-4">
				<div className="flex gap-2">
					{[
						{ key: "realtime", label: "实时数据", icon: "📡" },
						{ key: "computation", label: "计算缓存", icon: "⚡" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => handleScenarioChange(key)}
							className={`rounded px-3 py-2 font-medium text-sm transition-colors ${scenario === key ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
								}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{scenario === "realtime" && (
				<div className="space-y-4">
					<div className="flex gap-4">
						<button
							onClick={connect}
							disabled={connectionStatus === "connected"}
							className="rounded bg-green-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50"
						>
							{connectionStatus === "connected" ? "🟢 已连接" : "📡 连接实时数据"}
						</button>
						<button
							onClick={disconnect}
							disabled={connectionStatus === "disconnected"}
							className="rounded bg-red-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
						>
							🔴 断开连接
						</button>
					</div>

					<div className="rounded border border-gray-200 bg-white p-3">
						<div className="mb-3">
							<h4 className="mb-2 font-medium text-gray-800 text-sm">实时消息流</h4>
							<span
								className={`rounded px-2 py-1 text-sm ${connectionStatus === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
									}`}
							>
								{connectionStatus === "connected" ? "🟢 已连接" : "🔴 已断开"}
							</span>
						</div>

						<div className="max-h-40 space-y-2 overflow-auto">
							{messages.length === 0 ? (
								<p className="text-center text-gray-500 text-sm">暂无消息...</p>
							) : (
								messages.map((msg) => (
									<div key={msg.id} className="rounded bg-gray-50 p-2 text-sm">
										<span className="text-gray-500">[{msg.timestamp}]</span> {msg.text}
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded border border-purple-200 bg-purple-50 p-3">
						<p className="text-purple-800 text-sm">
							💡 实时数据缓存确保在网络中断时仍能访问最新数据，提供更好的用户体验
						</p>
					</div>
				</div>
			)}

			{scenario === "computation" && (
				<div className="space-y-4">
					<div className="flex gap-2">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="输入计算值..."
							className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={compute}
							disabled={computing || !input.trim()}
							className="rounded bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
						>
							{computing ? "🔄 计算中..." : "🔢 开始计算"}
						</button>
						<button
							onClick={clearComputationCache}
							className="rounded bg-gray-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-700"
						>
							🗑️ 清除缓存
						</button>
					</div>

					<div className="rounded border border-gray-200 bg-white p-4">
						<h4 className="mb-3 font-medium text-gray-800 text-sm">⚡ 计算结果缓存</h4>
						<div className="space-y-2">
							{Object.entries(computationResults).length === 0 ? (
								<p className="text-gray-500 text-sm">暂无计算结果...</p>
							) : (
								Object.entries(computationResults).map(([key, value]: any) => (
									<div key={key} className="rounded border border-blue-200 bg-blue-50 p-3">
										<h4 className="mb-2 font-medium text-gray-800 text-sm">输入: {value.input}</h4>
										<p className="mb-1 text-gray-600 text-sm">结果: {value.result}</p>
										<p className="mb-1 text-gray-500 text-xs">计算时间: {value.computationTime}ms</p>
										<p className="text-gray-500 text-xs">
											时间戳: {value.timestamp}
											{computationCache.current.has(`compute-${key}`) && (
												<span className="ml-2 text-green-600">(✅ 已缓存)</span>
											)}
										</p>
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded border border-green-200 bg-green-50 p-3">
						<p className="text-green-800 text-sm">💡 计算结果缓存可以避免重复的复杂计算，显著提升性能</p>
					</div>
				</div>
			)}

			<div className="mt-4 rounded border border-orange-200 bg-orange-50 p-3">
				<p className="text-orange-800 text-sm">
					🚀 Cache Signals 支持多种高级应用场景，从实时数据同步到复杂计算缓存， 都能显著提升应用性能和用户体验。
				</p>
			</div>
		</div>
	);
}
