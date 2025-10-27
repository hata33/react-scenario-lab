"use client";

import { useEffect, useState } from "react";
import { cacheManager, StrategyFactory } from "@/lib/cache";

interface ExampleData {
	id: string;
	title: string;
	description: string;
	timestamp: number;
}

export default function StrategyExamples() {
	const [activeStrategy, setActiveStrategy] = useState<string>("TTL");
	const [testResults, setTestResults] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [exampleData, setExampleData] = useState<ExampleData[]>([]);

	const strategies = [
		{
			name: "TTL",
			description: "基于时间的缓存策略，数据在指定时间后自动过期",
			useCase: "用户配置、权限信息等需要定期更新的数据",
		},
		{
			name: "LRU",
			description: "最近最少使用策略，优先淘汰最久未访问的数据",
			useCase: "商品信息、文章内容等有容量限制的缓存",
		},
		{
			name: "LFU",
			description: "最少使用频率策略，优先淘汰访问次数最少的数据",
			useCase: "搜索结果、推荐内容等需要根据热度缓存的场景",
		},
		{
			name: "SizeBased",
			description: "基于数据大小的策略，超过限制的数据不缓存",
			useCase: "图片、视频等大文件的缓存控制",
		},
		{
			name: "TypeBased",
			description: "基于数据类型的策略，只缓存指定类型的数据",
			useCase: "API 响应缓存，排除错误信息或不需要缓存的数据",
		},
		{
			name: "PatternBased",
			description: "基于键名模式的策略，支持包含/排除模式匹配",
			useCase: "用户数据缓存、配置文件缓存等按功能分类的缓存",
		},
		{
			name: "Hybrid",
			description: "混合策略，组合多个策略的条件",
			useCase: "复杂的缓存场景，需要多重条件判断",
		},
		{
			name: "Adaptive",
			description: "自适应策略，根据访问模式动态调整缓存行为",
			useCase: "用户行为分析、个性化推荐等需要学习的缓存场景",
		},
	];

	useEffect(() => {
		// 初始化示例数据
		const initialData: ExampleData[] = [
			{
				id: "1",
				title: "用户配置",
				description: "用户的个性化设置和偏好",
				timestamp: Date.now(),
			},
			{
				id: "2",
				title: "热门商品",
				description: "当前热门的商品列表",
				timestamp: Date.now(),
			},
			{
				id: "3",
				title: "新闻资讯",
				description: "最新的新闻资讯内容",
				timestamp: Date.now(),
			},
		];
		setExampleData(initialData);
	}, []);

	const addResult = (message: string) => {
		setTestResults((prev) => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev].slice(0, 10));
	};

	const switchStrategy = (strategyName: string) => {
		let strategy;

		switch (strategyName) {
			case "TTL":
				strategy = StrategyFactory.createTTL(10000); // 10秒
				break;
			case "LRU":
				strategy = StrategyFactory.createLRU(5); // 最大5条
				break;
			case "LFU":
				strategy = StrategyFactory.createLFU(2); // 最少访问2次
				break;
			case "SizeBased":
				strategy = StrategyFactory.createSizeBased(100); // 最大100字节
				break;
			case "TypeBased":
				strategy = StrategyFactory.createTypeBased(["object", "string"]);
				break;
			case "PatternBased":
				strategy = StrategyFactory.createPatternBased([/^user:/], [/^temp:/]);
				break;
			case "Hybrid":
				strategy = StrategyFactory.createHybrid([StrategyFactory.createTTL(5000), StrategyFactory.createLRU(3)]);
				break;
			case "Adaptive":
				strategy = StrategyFactory.createAdaptive();
				break;
			default:
				strategy = StrategyFactory.createTTL();
		}

		cacheManager.setStrategy(strategy);
		setActiveStrategy(strategyName);
		addResult(`✅ 已切换到 ${strategyName} 策略`);
	};

	const testStrategy = async () => {
		setIsLoading(true);
		addResult(`🧪 开始测试 ${activeStrategy} 策略`);

		try {
			// 清空现有缓存
			await cacheManager.clearAll();
			addResult(`🗑️ 已清空所有缓存`);

			// 测试1: 设置缓存
			const testData = exampleData[0];
			const key = `test:${testData.id}`;

			await cacheManager.setAny(key, testData, {
				ttl: activeStrategy === "TTL" ? 5000 : undefined, // TTL策略下5秒过期
				storage: "memory",
			});
			addResult(`💾 已设置缓存: ${key}`);

			// 测试2: 立即获取（应该命中）
			const cached1 = await cacheManager.getAny(key);
			if (cached1) {
				addResult(`✅ 缓存命中: ${cached1.title}`);
			}

			// 测试3: 模拟访问
			for (let i = 0; i < 3; i++) {
				await cacheManager.getAny(key);
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
			addResult(`🔄 模拟了3次访问`);

			// 测试4: 添加更多数据测试容量限制
			if (activeStrategy === "LRU" || activeStrategy === "Hybrid") {
				for (let i = 2; i <= 7; i++) {
					const extraData = exampleData[i % exampleData.length];
					await cacheManager.setAny(`test:extra${i}`, extraData, { storage: "memory" });
				}
				addResult(`📦 添加了6个额外缓存项测试容量限制`);
			}

			// 测试5: 检查原数据是否还在
			const cached2 = await cacheManager.getAny(key);
			if (cached2) {
				addResult(`✅ 原缓存数据仍然存在`);
			} else {
				addResult(`❌ 原缓存数据已被淘汰`);
			}

			// 测试6: 显示统计信息
			const metrics = cacheManager.getMetrics();
			addResult(`📊 统计信息: 命中率${(metrics.memory.hitRate * 100).toFixed(1)}%, 总命中${metrics.memory.hits}次`);

			// TTL策略的特殊测试
			if (activeStrategy === "TTL") {
				addResult(`⏰ 等待5秒测试过期...`);
				await new Promise((resolve) => setTimeout(resolve, 5000));

				const expired = await cacheManager.getAny(key);
				if (expired) {
					addResult(`❌ 数据未过期（策略可能未生效）`);
				} else {
					addResult(`✅ 数据已按TTL过期`);
				}
			}
		} catch (error) {
			addResult(`❌ 测试失败: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	const simulateRealScenario = async (scenario: string) => {
		setIsLoading(true);
		addResult(`🎭 开始模拟场景: ${scenario}`);

		try {
			switch (scenario) {
				case "用户配置缓存": {
					// 使用TTL策略缓存用户配置
					switchStrategy("TTL");
					const userConfig = { theme: "dark", language: "zh-CN", notifications: true };
					await cacheManager.setAny("user:123:config", userConfig, { ttl: 60000 });
					addResult(`💾 已缓存用户配置（1分钟过期）`);

					const config = await cacheManager.getAny("user:123:config");
					addResult(`✅ 获取用户配置: ${JSON.stringify(config)}`);
					break;
				}

				case "商品列表缓存": {
					// 使用LRU策略缓存商品列表
					switchStrategy("LRU");
					const products = Array.from({ length: 10 }, (_, i) => ({
						id: `product${i + 1}`,
						name: `商品${i + 1}`,
						price: Math.floor(Math.random() * 1000),
					}));

					for (const product of products) {
						await cacheManager.setAny(`product:${product.id}`, product, { storage: "memory" });
					}
					addResult(`💾 已缓存10个商品（LRU策略，最大5个）`);

					// 检查缓存情况
					const cachedProducts = [];
					for (let i = 1; i <= 10; i++) {
						const cached = await cacheManager.getAny(`product:product${i}`);
						if (cached) cachedProducts.push(cached.id);
					}
					addResult(`✅ 缓存的商品: ${cachedProducts.join(", ")}`);
					break;
				}

				case "API响应缓存": {
					// 使用PatternBased策略缓存API响应
					switchStrategy("PatternBased");

					// 模拟API响应
					const apiResponse = {
						data: { users: ["user1", "user2"], count: 2 },
						status: "success",
					};

					await cacheManager.setAny("api:/users", apiResponse, { ttl: 30000 });
					await cacheManager.setAny("temp:/cache", { temp: true }, { ttl: 1000 });

					addResult(`💾 已缓存API响应（api:开头）`);
					addResult(`💾 已缓存临时数据（temp:开头，但被排除）`);

					const apiCached = await cacheManager.getAny("api:/users");
					const tempCached = await cacheManager.getAny("temp:/cache");

					addResult(`✅ API缓存: ${apiCached ? "存在" : "不存在"}`);
					addResult(`❌ 临时缓存: ${tempCached ? "存在（不应该存在）" : "不存在（正确排除）"}`);
					break;
				}

				case "大文件缓存控制": {
					// 使用SizeBased策略控制大文件缓存
					switchStrategy("SizeBased");

					const smallData = { text: "小文件数据" };
					const largeData = {
						text: "大文件数据",
						content: "x".repeat(200), // 超过100字节限制
					};

					await cacheManager.setAny("file:small", smallData);
					await cacheManager.setAny("file:large", largeData);

					addResult(`💾 尝试缓存小文件和大文件（限制100字节）`);

					const smallCached = await cacheManager.getAny("file:small");
					const largeCached = await cacheManager.getAny("file:large");

					addResult(`✅ 小文件缓存: ${smallCached ? "成功" : "失败"}`);
					addResult(`❌ 大文件缓存: ${largeCached ? "成功（不应该成功）" : "被正确拒绝"}`);
					break;
				}
			}

			const metrics = cacheManager.getMetrics();
			addResult(`📊 场景完成 - 当前策略: ${metrics.strategy}, 命中率: ${(metrics.memory.hitRate * 100).toFixed(1)}%`);
		} catch (error) {
			addResult(`❌ 场景模拟失败: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* 策略选择 */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-3 font-semibold">缓存策略选择</h3>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
					{strategies.map((strategy) => (
						<button
							key={strategy.name}
							onClick={() => switchStrategy(strategy.name)}
							className={`rounded border p-3 text-left transition-colors ${
								activeStrategy === strategy.name ? "border-blue-300 bg-blue-50 text-blue-700" : "hover:bg-gray-50"
							}`}
						>
							<div className="font-medium">{strategy.name}</div>
							<div className="mt-1 text-gray-600 text-xs">{strategy.description}</div>
							<div className="mt-1 text-gray-500 text-xs">适用: {strategy.useCase}</div>
						</button>
					))}
				</div>
			</div>

			{/* 控制按钮 */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-3 font-semibold">操作控制</h3>
				<div className="mb-4 flex flex-wrap gap-2">
					<button
						onClick={testStrategy}
						disabled={isLoading}
						className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
					>
						{isLoading ? "测试中..." : "测试当前策略"}
					</button>

					<button
						onClick={() => simulateRealScenario("用户配置缓存")}
						disabled={isLoading}
						className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
					>
						用户配置缓存
					</button>

					<button
						onClick={() => simulateRealScenario("商品列表缓存")}
						disabled={isLoading}
						className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
					>
						商品列表缓存
					</button>

					<button
						onClick={() => simulateRealScenario("API响应缓存")}
						disabled={isLoading}
						className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
					>
						API响应缓存
					</button>

					<button
						onClick={() => simulateRealScenario("大文件缓存控制")}
						disabled={isLoading}
						className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:opacity-50"
					>
						大文件缓存控制
					</button>

					<button
						onClick={() => {
							cacheManager.clearAll();
							setTestResults([]);
							addResult("🗑️ 已清空所有缓存和结果");
						}}
						disabled={isLoading}
						className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
					>
						清空缓存
					</button>
				</div>

				<div className="text-gray-600 text-sm">
					<p>
						<strong>当前策略:</strong> {activeStrategy}
					</p>
					<p>
						<strong>使用说明:</strong>
					</p>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>
							<strong>测试当前策略:</strong> 自动测试当前选择的策略特性
						</li>
						<li>
							<strong>用户配置缓存:</strong> 模拟用户设置的缓存场景（需要后端API支持）
						</li>
						<li>
							<strong>商品列表缓存:</strong> 模拟电商商品列表的容量限制缓存
						</li>
						<li>
							<strong>API响应缓存:</strong> 模拟API响应的模式匹配缓存
						</li>
						<li>
							<strong>大文件缓存控制:</strong> 模拟大文件的缓存大小控制
						</li>
					</ul>
				</div>
			</div>

			{/* 测试结果 */}
			<div className="rounded-lg border bg-gray-50 p-4">
				<h3 className="mb-3 font-semibold">测试结果</h3>
				<div className="max-h-96 space-y-1 overflow-y-auto">
					{testResults.length === 0 ? (
						<p className="text-gray-500 text-sm">暂无测试结果，请点击上方按钮开始测试</p>
					) : (
						testResults.map((result, index) => (
							<div
								key={index}
								className={`rounded p-2 text-sm ${
									result.includes("✅")
										? "bg-green-100 text-green-800"
										: result.includes("❌")
											? "bg-red-100 text-red-800"
											: result.includes("⏰")
												? "bg-yellow-100 text-yellow-800"
												: "bg-gray-100"
								}`}
							>
								{result}
							</div>
						))
					)}
				</div>
			</div>

			{/* 后端配置说明 */}
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h3 className="mb-3 font-semibold text-blue-800">🔧 后端配置说明</h3>
				<div className="space-y-3 text-blue-700 text-sm">
					<div>
						<h4 className="font-medium">1. Nginx 静态资源缓存配置</h4>
						<pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">
							{`# nginx.conf
location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header X-Cache-Status "STATIC";
}

location /api/ {
    # API 不缓存，或设置短时间缓存
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header X-Cache-Status "DYNAMIC";
}`}
						</pre>
					</div>

					<div>
						<h4 className="font-medium">2. 后端 API 缓存头设置</h4>
						<pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">
							{`// Node.js Express 示例
app.get('/api/users', (req, res) => {
    res.set({
        'Cache-Control': 'public, max-age=300', // 5分钟缓存
        'ETag': generateETag(users),
        'Last-Modified': new Date().toUTCString()
    });
    res.json(users);
});

// 支持条件请求
app.get('/api/users', (req, res) => {
    const ifNoneMatch = req.headers['if-none-match'];
    const etag = generateETag(users);

    if (ifNoneMatch === etag) {
        return res.status(304).end(); // Not Modified
    }

    res.set('ETag', etag);
    res.json(users);
});`}
						</pre>
					</div>

					<div>
						<h4 className="font-medium">3. CDN 缓存配置</h4>
						<pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">
							{`// CDN 缓存规则配置
{
    "rules": [
        {
            "path": "/static/*",
            "cacheTTL": 31536000, // 1年
            "browserCacheTTL": 86400 // 1天
        },
        {
            "path": "/api/public/*",
            "cacheTTL": 300, // 5分钟
            "browserCacheTTL": 60 // 1分钟
        }
    ]
}`}
						</pre>
					</div>

					<div>
						<h4 className="font-medium">4. 数据库查询缓存</h4>
						<pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">
							{`// Redis 缓存示例
const getCachedData = async (key, fetchFn, ttl = 300) => {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fetchFn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
};

// 使用示例
const users = await getCachedData('users:all', () =>
    User.findAll(), 600 // 10分钟
);`}
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
