"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";

export default function CacheSignalsPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">Cache Signals - React 19 新特性</h1>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-white">💾 3W 法则解析</h2>
							<div className="grid gap-6 md:grid-cols-3">
								<div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
									<h3 className="mb-2 font-bold text-lg text-teal-800 dark:text-teal-300">What - 它是什么？</h3>
									<p className="font-medium text-gray-800 dark:text-gray-300">
										Cache Signals 是 React 19
										中用于智能缓存管理的新机制，能够自动追踪数据依赖关系，实现精确的缓存失效和更新。
									</p>
								</div>
								<div className="rounded-lg bg-cyan-50 p-4 dark:bg-cyan-900/20">
									<h3 className="mb-2 font-bold text-cyan-800 text-lg dark:text-cyan-300">Why - 为什么需要？</h3>
									<p className="font-medium text-gray-800 dark:text-gray-300">
										解决传统缓存管理中的过度失效、缓存穿透、数据一致性问题，以及手动管理缓存的复杂性。
									</p>
								</div>
								<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
									<h3 className="mb-2 font-bold text-blue-800 text-lg dark:text-blue-300">When - 何时使用？</h3>
									<p className="font-medium text-gray-800 dark:text-gray-300">
										数据获取、状态管理、计算缓存、API 响应缓存等需要智能缓存管理的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* 基础缓存演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">基础缓存功能演示</h2>
						<div className="grid gap-6 lg:grid-cols-2">
							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">🚫 传统缓存管理的问题</h3>
								<div className="space-y-4">
									<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
										<p className="mb-2 text-gray-600 text-sm dark:text-gray-300">传统缓存问题：</p>
										<ul className="space-y-2 text-gray-700 text-sm dark:text-gray-300">
											<li>• 手动管理缓存键</li>
											<li>• 过度失效问题</li>
											<li>• 缓存穿透风险</li>
											<li>• 数据一致性难以保证</li>
										</ul>
									</div>
									<div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
										<p className="font-medium text-red-800 text-sm dark:text-red-300">❌ 常见问题：</p>
										<ul className="mt-2 text-red-700 text-sm dark:text-red-400">
											<li>• 缓存雪崩</li>
											<li>• 缓存击穿</li>
											<li>• 数据过期</li>
											<li>• 内存泄漏</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">
									✅ Cache Signals 的优势
								</h3>
								<div className="space-y-4">
									<BasicCacheDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 智能依赖追踪 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">智能依赖追踪</h2>
						<DependencyTrackingDemo />
					</div>

					{/* 缓存策略演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">缓存策略与优化</h2>
						<CacheStrategiesDemo />
					</div>

					{/* 高级应用演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">高级应用场景</h2>
						<AdvancedCacheDemo />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">Cache Signals 最佳实践</h2>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">✅ 推荐做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">合理设置缓存策略</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">利用自动依赖追踪</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">设置合适的过期时间</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">监控缓存命中率</span>
										</li>
									</ul>
								</div>
								<div>
									<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">❌ 避免做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">过度依赖缓存</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">忽略缓存大小限制</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">缓存敏感数据</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">忽视缓存清理</span>
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

// 基础缓存演示组件
function BasicCacheDemo() {
	const [cacheEnabled, setCacheEnabled] = useState(true);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [cacheStats, setCacheStats] = useState({
		hits: 0,
		misses: 0,
		size: 0,
	});

	// 模拟 Cache Signals 的缓存机制
	const cache = useRef(new Map());
	const dependencies = useRef(new Map());

	// 模拟数据获取函数
	const fetchData = useCallback(
		async (searchQuery: string) => {
			const cacheKey = `search-${searchQuery}`;

			// 检查缓存
			if (cacheEnabled && cache.current.has(cacheKey)) {
				setCacheStats((prev) => ({
					...prev,
					hits: prev.hits + 1,
				}));
				return cache.current.get(cacheKey);
			}

			// 模拟 API 调用
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const mockData = Array.from({ length: 5 }, (_, i) => ({
				id: `${searchQuery}-${i}`,
				title: `${searchQuery} 结果 ${i + 1}`,
				description: `这是关于 ${searchQuery} 的搜索结果 ${i + 1}`,
				timestamp: Date.now(),
			}));

			// 缓存结果
			if (cacheEnabled) {
				cache.current.set(cacheKey, mockData);
				dependencies.current.set(cacheKey, [searchQuery]);

				setCacheStats((prev) => ({
					...prev,
					misses: prev.misses + 1,
					size: cache.current.size,
				}));
			}

			return mockData;
		},
		[cacheEnabled],
	);

	// 智能缓存失效
	const invalidateCache = useCallback((changedQuery: string) => {
		for (const [key, deps] of dependencies.current.entries()) {
			if (deps.includes(changedQuery)) {
				cache.current.delete(key);
				dependencies.current.delete(key);
			}
		}

		setCacheStats((prev) => ({
			...prev,
			size: cache.current.size,
		}));
	}, []);

	const handleSearch = async () => {
		if (!query.trim()) return;

		const data = await fetchData(query);
		setResults(data);
	};

	const clearCache = () => {
		cache.current.clear();
		dependencies.current.clear();
		setCacheStats({ hits: 0, misses: 0, size: 0 });
		setResults([]);
	};

	const handleQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		// 智能失效相关缓存
		invalidateCache(newQuery);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setCacheEnabled(!cacheEnabled)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						cacheEnabled ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{cacheEnabled ? "缓存已启用" : "缓存已禁用"}
				</button>

				<button
					onClick={clearCache}
					className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					清除缓存
				</button>
			</div>

			<div className="flex gap-2">
				<input
					type="text"
					value={query}
					onChange={(e) => handleQueryChange(e.target.value)}
					placeholder="搜索内容..."
					className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
				/>
				<button
					onClick={handleSearch}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					搜索
				</button>
			</div>

			{/* 缓存统计 */}
			<div className="grid grid-cols-3 gap-4">
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存命中</p>
					<p className="font-bold text-green-600 text-lg dark:text-green-400">{cacheStats.hits}</p>
				</div>
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存未命中</p>
					<p className="font-bold text-lg text-red-600 dark:text-red-400">{cacheStats.misses}</p>
				</div>
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存大小</p>
					<p className="font-bold text-blue-600 text-lg dark:text-blue-400">{cacheStats.size}</p>
				</div>
			</div>

			{/* 搜索结果 */}
			{results.length > 0 && (
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">搜索结果:</h4>
					<div className="space-y-2">
						{results.map((result) => (
							<div
								key={result.id}
								className="rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800"
							>
								<p className="font-medium text-gray-800 dark:text-white">{result.title}</p>
								<p className="text-gray-600 text-sm dark:text-gray-400">{result.description}</p>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
				<p className="mb-2 font-medium text-sm text-teal-800 dark:text-teal-300">🎯 Cache Signals 的优势：</p>
				<ul className="space-y-1 text-sm text-teal-700 dark:text-teal-400">
					<li>• 自动依赖追踪和失效</li>
					<li>• 智能缓存管理</li>
					<li>• 减少重复计算</li>
					<li>• 提升应用性能</li>
				</ul>
			</div>
		</div>
	);
}

// 依赖追踪演示组件
function DependencyTrackingDemo() {
	const [activeTab, setActiveTab] = useState<"auto" | "manual">("auto");
	const [user, setUser] = useState({ id: 1, name: "张三", email: "zhangsan@example.com" });
	const [posts, setPosts] = useState<any[]>([]);
	const [comments, setComments] = useState<any[]>([]);

	// 模拟 Cache Signals 的自动依赖追踪
	const autoCache = useRef(new Map());
	const manualCache = useRef(new Map());
	const dependencies = useRef(new Map());

	// 自动依赖追踪的数据获取
	const fetchWithAutoTracking = useCallback(async (type: string, id: any) => {
		const cacheKey = `${type}-${id}`;

		// 自动检查缓存和依赖
		if (autoCache.current.has(cacheKey)) {
			return autoCache.current.get(cacheKey);
		}

		// 模拟 API 调用
		await new Promise((resolve) => setTimeout(resolve, 500));

		let data;
		switch (type) {
			case "user":
				data = { id, name: `用户${id}`, email: `user${id}@example.com` };
				break;
			case "posts":
				data = Array.from({ length: 3 }, (_, i) => ({
					id: `post-${id}-${i}`,
					title: `文章 ${i + 1}`,
					authorId: id,
				}));
				break;
			case "comments":
				data = Array.from({ length: 5 }, (_, i) => ({
					id: `comment-${id}-${i}`,
					content: `评论 ${i + 1}`,
					postId: `post-${id}-0`,
				}));
				break;
		}

		// 自动记录依赖关系
		const deps = [type, id];
		dependencies.current.set(cacheKey, deps);
		autoCache.current.set(cacheKey, data);

		return data;
	}, []);

	// 手动缓存管理
	const fetchWithManualCache = useCallback(async (type: string, id: any) => {
		const cacheKey = `${type}-${id}`;

		if (manualCache.current.has(cacheKey)) {
			return manualCache.current.get(cacheKey);
		}

		await new Promise((resolve) => setTimeout(resolve, 500));

		let data;
		switch (type) {
			case "user":
				data = { id, name: `用户${id}`, email: `user${id}@example.com` };
				break;
			case "posts":
				data = Array.from({ length: 3 }, (_, i) => ({
					id: `post-${id}-${i}`,
					title: `文章 ${i + 1}`,
					authorId: id,
				}));
				break;
			case "comments":
				data = Array.from({ length: 5 }, (_, i) => ({
					id: `comment-${id}-${i}`,
					content: `评论 ${i + 1}`,
					postId: `post-${id}-0`,
				}));
				break;
		}

		manualCache.current.set(cacheKey, data);
		return data;
	}, []);

	const loadUserData = async () => {
		if (activeTab === "auto") {
			const userData = await fetchWithAutoTracking("user", user.id);
			setUser(userData);

			const postsData = await fetchWithAutoTracking("posts", user.id);
			setPosts(postsData);

			const commentsData = await fetchWithAutoTracking("comments", user.id);
			setComments(commentsData);
		} else {
			const userData = await fetchWithManualCache("user", user.id);
			setUser(userData);

			const postsData = await fetchWithManualCache("posts", user.id);
			setPosts(postsData);

			const commentsData = await fetchWithManualCache("comments", user.id);
			setComments(commentsData);
		}
	};

	// 智能缓存失效（仅自动模式）
	const smartInvalidate = useCallback(
		(changedType: string, changedId: any) => {
			if (activeTab === "auto") {
				for (const [key, deps] of dependencies.current.entries()) {
					if (deps.includes(changedType) && deps.includes(changedId)) {
						autoCache.current.delete(key);
						dependencies.current.delete(key);
					}
				}
			} else {
				// 手动模式需要手动清理所有相关缓存
				manualCache.current.clear();
			}
		},
		[activeTab],
	);

	const changeUser = () => {
		const newUserId = user.id + 1;
		smartInvalidate("user", user.id);
		setUser({ id: newUserId, name: `用户${newUserId}`, email: `user${newUserId}@example.com` });
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🔍 智能依赖追踪</h3>

			<div className="mb-6">
				<div className="mb-4 flex gap-2">
					<button
						onClick={() => setActiveTab("auto")}
						className={`rounded-lg px-4 py-2 transition-colors ${
							activeTab === "auto"
								? "bg-teal-600 text-white"
								: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
						}`}
					>
						🤖 自动追踪
					</button>
					<button
						onClick={() => setActiveTab("manual")}
						className={`rounded-lg px-4 py-2 transition-colors ${
							activeTab === "manual"
								? "bg-orange-600 text-white"
								: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
						}`}
					>
						🔧 手动管理
					</button>
				</div>

				<div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">
						{activeTab === "auto"
							? "🤖 自动模式：Cache Signals 自动追踪数据依赖关系，实现精确的缓存失效"
							: "🔧 手动模式：需要手动管理缓存键和失效策略"}
					</p>
				</div>
			</div>

			<div className="mb-6 flex gap-4">
				<button
					onClick={loadUserData}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					加载数据
				</button>

				<button
					onClick={changeUser}
					className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
				>
					切换用户 (ID: {user.id})
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">用户信息</h4>
					{user.name ? (
						<div className="space-y-2">
							<p className="text-sm">
								<span className="font-medium">姓名:</span> {user.name}
							</p>
							<p className="text-sm">
								<span className="font-medium">邮箱:</span> {user.email}
							</p>
						</div>
					) : (
						<p className="text-gray-500 text-sm">暂无数据</p>
					)}
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">文章列表</h4>
					{posts.length > 0 ? (
						<ul className="space-y-2">
							{posts.map((post) => (
								<li key={post.id} className="text-sm">
									{post.title}
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-sm">暂无数据</p>
					)}
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">评论列表</h4>
					{comments.length > 0 ? (
						<ul className="space-y-2">
							{comments.slice(0, 3).map((comment) => (
								<li key={comment.id} className="text-sm">
									{comment.content}
								</li>
							))}
							{comments.length > 3 && <li className="text-gray-500 text-sm">...还有 {comments.length - 3} 条评论</li>}
						</ul>
					) : (
						<p className="text-gray-500 text-sm">暂无数据</p>
					)}
				</div>
			</div>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
					<h4 className="mb-2 font-medium text-teal-800 dark:text-teal-300">自动追踪优势：</h4>
					<ul className="space-y-1 text-sm text-teal-700 dark:text-teal-400">
						<li>• 自动发现数据依赖关系</li>
						<li>• 精确的缓存失效</li>
						<li>• 减少不必要的网络请求</li>
						<li>• 简化缓存管理逻辑</li>
					</ul>
				</div>

				<div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
					<h4 className="mb-2 font-medium text-orange-800 dark:text-orange-300">手动管理挑战：</h4>
					<ul className="space-y-1 text-orange-700 text-sm dark:text-orange-400">
						<li>• 需要手动定义缓存键</li>
						<li>• 复杂的失效策略</li>
						<li>• 容易出现过度失效</li>
						<li>• 维护成本高</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

// 缓存策略演示组件
function CacheStrategiesDemo() {
	const [strategy, setStrategy] = useState<"lru" | "ttl" | "size-based">("lru");
	const [data, setData] = useState<any[]>([]);
	const [stats, setStats] = useState({
		evictions: 0,
		hits: 0,
		misses: 0,
	});

	// 模拟不同的缓存策略
	const lruCache = useRef(new Map());
	const ttlCache = useRef(new Map());
	const sizeBasedCache = useRef(new Map());
	const accessOrder = useRef<string[]>([]);
	const timestamps = useRef(new Map());

	const addToCache = useCallback(
		(key: string, value: any) => {
			switch (strategy) {
				case "lru":
					// LRU 策略
					if (lruCache.current.size >= 3) {
						const lruKey = accessOrder.current.shift()!;
						lruCache.current.delete(lruKey);
						setStats((prev) => ({ ...prev, evictions: prev.evictions + 1 }));
					}
					lruCache.current.set(key, value);
					accessOrder.current.push(key);
					break;

				case "ttl": {
					// TTL 策略 (5秒过期)
					const now = Date.now();
					const expireTime = now + 5000;

					// 清理过期项
					for (const [cacheKey, timestamp] of timestamps.current.entries()) {
						if (timestamp < now) {
							ttlCache.current.delete(cacheKey);
							timestamps.current.delete(cacheKey);
							setStats((prev) => ({ ...prev, evictions: prev.evictions + 1 }));
						}
					}

					ttlCache.current.set(key, value);
					timestamps.current.set(key, expireTime);
					break;
				}

				case "size-based": {
					// 基于大小的策略
					const currentSize = Array.from(sizeBasedCache.current.values()).reduce(
						(total, item) => total + JSON.stringify(item).length,
						0,
					);

					if (currentSize > 100) {
						// 100 字节限制
						const firstKey = sizeBasedCache.current.keys().next().value;
						sizeBasedCache.current.delete(firstKey);
						setStats((prev) => ({ ...prev, evictions: prev.evictions + 1 }));
					}

					sizeBasedCache.current.set(key, value);
					break;
				}
			}
		},
		[strategy],
	);

	const getFromCache = useCallback(
		(key: string) => {
			switch (strategy) {
				case "lru":
					if (lruCache.current.has(key)) {
						// 更新访问顺序
						const index = accessOrder.current.indexOf(key);
						if (index > -1) {
							accessOrder.current.splice(index, 1);
							accessOrder.current.push(key);
						}
						setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
						return lruCache.current.get(key);
					}
					break;

				case "ttl": {
					const now = Date.now();
					if (ttlCache.current.has(key) && timestamps.current.get(key)! > now) {
						setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
						return ttlCache.current.get(key);
					} else if (ttlCache.current.has(key)) {
						ttlCache.current.delete(key);
						timestamps.current.delete(key);
						setStats((prev) => ({ ...prev, evictions: prev.evictions + 1 }));
					}
					break;
				}

				case "size-based":
					if (sizeBasedCache.current.has(key)) {
						setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
						return sizeBasedCache.current.get(key);
					}
					break;
			}

			setStats((prev) => ({ ...prev, misses: prev.misses + 1 }));
			return null;
		},
		[strategy],
	);

	const generateData = useCallback(() => {
		const id = Math.random().toString(36).substr(2, 9);
		const item = {
			id,
			data: `数据块 ${Math.random().toString(36).substr(2, 5)}`.repeat(10),
			timestamp: Date.now(),
		};

		// 先检查缓存
		const cached = getFromCache(id);
		if (cached) {
			setData((prev) => [...prev, cached]);
		} else {
			// 模拟数据生成
			setTimeout(() => {
				addToCache(id, item);
				setData((prev) => [...prev, item]);
			}, 200);
		}
	}, [getFromCache, addToCache]);

	const clearStats = () => {
		setStats({ evictions: 0, hits: 0, misses: 0 });
		setData([]);
		lruCache.current.clear();
		ttlCache.current.clear();
		sizeBasedCache.current.clear();
		accessOrder.current = [];
		timestamps.current.clear();
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">📊 缓存策略与优化</h3>

			<div className="mb-6">
				<div className="mb-4 flex gap-2">
					{[
						{ key: "lru", label: "LRU", desc: "最近最少使用" },
						{ key: "ttl", label: "TTL", desc: "生存时间" },
						{ key: "size-based", label: "Size", desc: "基于大小" },
					].map(({ key, label, desc }) => (
						<button
							key={key}
							onClick={() => {
								setStrategy(key as any);
								clearStats();
							}}
							className={`rounded-lg px-4 py-2 transition-colors ${
								strategy === key
									? "bg-teal-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{label} - {desc}
						</button>
					))}
				</div>

				<div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">
						当前策略:{" "}
						<span className="font-medium">
							{strategy === "lru" && "LRU (最近最少使用) - 移除最长时间未访问的项"}
							{strategy === "ttl" && "TTL (生存时间) - 5秒后自动过期"}
							{strategy === "size-based" && "基于大小 - 超过100字节时移除最旧的项"}
						</span>
					</p>
				</div>
			</div>

			<div className="mb-6 flex gap-4">
				<button
					onClick={generateData}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					生成数据
				</button>

				<button
					onClick={clearStats}
					className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					清空缓存
				</button>
			</div>

			<div className="mb-6 grid gap-4 md:grid-cols-4">
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存命中</p>
					<p className="font-bold text-green-600 text-lg dark:text-green-400">{stats.hits}</p>
				</div>
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存未命中</p>
					<p className="font-bold text-lg text-red-600 dark:text-red-400">{stats.misses}</p>
				</div>
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">缓存淘汰</p>
					<p className="font-bold text-lg text-orange-600 dark:text-orange-400">{stats.evictions}</p>
				</div>
				<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">命中率</p>
					<p className="font-bold text-blue-600 text-lg dark:text-blue-400">
						{stats.hits + stats.misses > 0 ? `${Math.round((stats.hits / (stats.hits + stats.misses)) * 100)}%` : "0%"}
					</p>
				</div>
			</div>

			{data.length > 0 && (
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">缓存数据:</h4>
					<div className="max-h-40 space-y-2 overflow-auto">
						{data.map((item, index) => (
							<div key={item.id} className="rounded bg-white p-2 text-xs dark:bg-gray-800">
								<span className="font-medium">#{index + 1}:</span> {item.data.substring(0, 50)}...
							</div>
						))}
					</div>
				</div>
			)}

			<div className="mt-6 rounded-lg bg-cyan-50 p-4 dark:bg-cyan-900/20">
				<p className="text-cyan-800 text-sm dark:text-cyan-300">
					💡 <strong>缓存策略选择：</strong>
					不同的应用场景适合不同的缓存策略。LRU 适合通用场景，TTL 适合有时效性的数据，
					基于大小的策略适合内存受限的环境。
				</p>
			</div>
		</div>
	);
}

// 高级缓存应用演示组件
function AdvancedCacheDemo() {
	const [scenario, setScenario] = useState<"pagination" | "realtime" | "computed">("pagination");
	const [cacheState, setCacheState] = useState<any>({});

	// 分页缓存演示
	const PaginationDemo = () => {
		const [currentPage, setCurrentPage] = useState(1);
		const [pages, setPages] = useState<Record<number, any>>({});
		const paginationCache = useRef(new Map());

		const loadPage = useCallback(async (page: number) => {
			const cacheKey = `page-${page}`;

			if (paginationCache.current.has(cacheKey)) {
				setPages((prev: Record<number, any>) => ({ ...prev, [page]: paginationCache.current.get(cacheKey) }));
				return;
			}

			// 模拟 API 调用
			await new Promise((resolve) => setTimeout(resolve, 800));

			const pageData = {
				page,
				data: Array.from({ length: 10 }, (_, i) => ({
					id: `item-${page}-${i}`,
					title: `项目 ${page}-${i + 1}`,
					content: `这是第 ${page} 页的第 ${i + 1} 个项目`,
				})),
			};

			paginationCache.current.set(cacheKey, pageData);
			setPages((prev: Record<number, any>) => ({ ...prev, [page]: pageData }));
		}, []);

		useEffect(() => {
			loadPage(currentPage);
		}, [currentPage, loadPage]);

		return (
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						disabled={currentPage === 1}
						className="rounded bg-gray-600 px-3 py-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						上一页
					</button>

					{[1, 2, 3, 4, 5].map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`rounded px-3 py-1 transition-colors ${
								currentPage === page
									? "bg-teal-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{page}
						</button>
					))}

					<button
						onClick={() => setCurrentPage((prev) => Math.min(5, prev + 1))}
						disabled={currentPage === 5}
						className="rounded bg-gray-600 px-3 py-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						下一页
					</button>
				</div>

				{pages[currentPage] && (
					<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-medium text-gray-800 dark:text-white">第 {currentPage} 页内容 (已缓存)</h4>
						<div className="grid grid-cols-2 gap-2">
							{pages[currentPage].data.map((item: any) => (
								<div key={item.id} className="rounded bg-white p-2 text-sm dark:bg-gray-800">
									{item.title}
								</div>
							))}
						</div>
					</div>
				)}

				<div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
					<p className="text-blue-800 text-sm dark:text-blue-300">
						💡 分页缓存可以显著提升用户体验，切换页面时无需重新加载已访问的页面
					</p>
				</div>
			</div>
		);
	};

	// 实时数据缓存演示
	const RealtimeDemo = () => {
		const [messages, setMessages] = useState<any[]>([]);
		const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
		const realtimeCache = useRef(new Map());
		const subscriptionId = useRef<string | null>(null);

		const connect = () => {
			setConnectionStatus("connected");
			subscriptionId.current = Math.random().toString(36).substr(2, 9);

			// 模拟实时数据推送
			const interval = setInterval(() => {
				const message = {
					id: `msg-${Date.now()}`,
					text: `实时消息 ${Math.random().toString(36).substr(2, 5)}`,
					timestamp: new Date().toLocaleTimeString(),
					subscriptionId: subscriptionId.current,
				};

				// 缓存最新消息
				realtimeCache.current.set("latest", message);
				setMessages((prev) => [...prev.slice(-9), message]);
			}, 2000);

			setTimeout(() => {
				clearInterval(interval);
				setConnectionStatus("disconnected");
			}, 20000);
		};

		const disconnect = () => {
			setConnectionStatus("disconnected");
			subscriptionId.current = null;
		};

		const replayLatest = () => {
			const latest = realtimeCache.current.get("latest");
			if (latest) {
				setMessages((prev) => [...prev, { ...latest, text: latest.text + " (重播)" }]);
			}
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={connect}
						disabled={connectionStatus === "connected"}
						className="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						{connectionStatus === "connected" ? "已连接" : "连接实时数据"}
					</button>

					<button
						onClick={disconnect}
						disabled={connectionStatus === "disconnected"}
						className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						断开连接
					</button>

					<button
						onClick={replayLatest}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						重播最新消息
					</button>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<div className="mb-3 flex items-center justify-between">
						<h4 className="font-medium text-gray-800 dark:text-white">实时消息流</h4>
						<span
							className={`rounded px-2 py-1 text-sm ${
								connectionStatus === "connected"
									? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
									: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
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
								<div key={msg.id} className="rounded bg-white p-2 text-sm dark:bg-gray-800">
									<span className="text-gray-500">[{msg.timestamp}]</span> {msg.text}
								</div>
							))
						)}
					</div>
				</div>

				<div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
					<p className="text-purple-800 text-sm dark:text-purple-300">
						💡 实时数据缓存确保在网络中断时仍能访问最新数据，提供更好的用户体验
					</p>
				</div>
			</div>
		);
	};

	// 计算结果缓存演示
	const ComputedDemo = () => {
		const [input, setInput] = useState("");
		const [results, setResults] = useState<Record<string, any>>({});
		const computedCache = useRef(new Map());

		const expensiveComputation = useCallback((value: string) => {
			const cacheKey = `compute-${value}`;

			if (computedCache.current.has(cacheKey)) {
				return computedCache.current.get(cacheKey);
			}

			// 模拟复杂计算
			const startTime = Date.now();
			let result = 0;
			for (let i = 0; i < 1000000; i++) {
				result += Math.sqrt(i) * Math.random();
			}

			const computationTime = Date.now() - startTime;

			const output = {
				input: value,
				result: result.toFixed(2),
				computationTime,
				timestamp: new Date().toLocaleTimeString(),
			};

			computedCache.current.set(cacheKey, output);
			return output;
		}, []);

		const compute = () => {
			if (!input.trim()) return;

			const result = expensiveComputation(input);
			setResults((prev: Record<string, any>) => ({ ...prev, [input]: result }));
		};

		const clearCache = () => {
			computedCache.current.clear();
			setResults({});
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="输入计算参数..."
						className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
					/>
					<button
						onClick={compute}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						计算
					</button>
					<button
						onClick={clearCache}
						className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					>
						清空缓存
					</button>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{Object.entries(results).map(([key, value]: [string, any]) => (
						<div key={key} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
							<h4 className="mb-2 font-medium text-gray-800 dark:text-white">输入: {value.input}</h4>
							<p className="mb-1 text-gray-600 text-sm dark:text-gray-400">结果: {value.result}</p>
							<p className="mb-1 text-gray-500 text-xs dark:text-gray-400">计算时间: {value.computationTime}ms</p>
							<p className="text-gray-500 text-xs dark:text-gray-400">
								时间戳: {value.timestamp}
								{computedCache.current.has(`compute-${key}`) && (
									<span className="ml-2 text-green-600 dark:text-green-400">(已缓存)</span>
								)}
							</p>
						</div>
					))}
				</div>

				<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
					<p className="text-green-800 text-sm dark:text-green-300">
						💡 计算结果缓存可以避免重复的复杂计算，显著提升性能
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🚀 高级应用场景</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "pagination", label: "分页缓存", icon: "📄" },
						{ key: "realtime", label: "实时数据", icon: "📡" },
						{ key: "computed", label: "计算缓存", icon: "🧮" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setScenario(key as any)}
							className={`rounded-lg px-4 py-2 transition-colors ${
								scenario === key
									? "bg-teal-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{scenario === "pagination" && <PaginationDemo />}
			{scenario === "realtime" && <RealtimeDemo />}
			{scenario === "computed" && <ComputedDemo />}

			<div className="mt-6 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 p-4 dark:from-teal-900/20 dark:to-cyan-900/20">
				<p className="text-sm text-teal-800 dark:text-teal-300">
					🎯 <strong>高级应用总结：</strong>
					Cache Signals 在各种复杂场景中都能提供智能的缓存管理，从分页数据到实时流，
					从复杂计算到用户交互，都能显著提升应用性能和用户体验。
				</p>
			</div>
		</div>
	);
}
