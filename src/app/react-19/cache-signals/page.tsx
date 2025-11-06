"use client";

import { CheckCircle, Clock, Code, Copy, Database, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
// Import utils
import { copyWithFeedback } from "@/utils";

// Import extracted components from index files
import {
	ArchitectureOverview,
	ExampleDetail,
	ExampleSelector,
	Header,
	OfficialExamples,
	ThreeWRule,
} from "../(components)";
// Import types
import type { CacheSignalExample, FeatureCard, WSection } from "../(types)";
// Import demo components from index file
import {
	AdvancedApplicationsDemo,
	BasicCachingDemo,
	CacheStrategiesDemo,
	DependencyTrackingDemo,
} from "./(components)";

const cacheSignalExamples: CacheSignalExample[] = [
	{
		id: "basic-caching",
		title: "基础缓存机制",
		description: "展示 Cache Signals 的基本缓存功能，包括数据的存储、获取和失效机制",
		category: "State Management",
		difficulty: "初级",
		status: "completed",
		icon: <Database className="h-5 w-5" />,
		codeSnippet: `"use client";
import { cache } from "react";

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
		benefits: ["自动缓存数据，避免重复请求", "依赖追踪，智能失效", "支持异步数据获取", "减少网络请求"],
		useCases: ["用户信息缓存", "API 响应缓存", "计算结果缓存", "静态资源缓存"],
		problemsSolved: [
			{
				problem: "重复请求浪费",
				description: "相同数据被多次请求，浪费网络资源和服务器性能",
				solution: "Cache Signals 自动缓存数据，避免重复请求，提升应用性能",
			},
			{
				problem: "缓存失效困难",
				description: "手动管理缓存失效时机复杂，容易导致数据不一致",
				solution: "自动追踪数据依赖，智能判断缓存失效时机，确保数据一致性",
			},
			{
				problem: "状态管理复杂",
				description: "缓存状态需要手动维护，代码冗余且容易出错",
				solution: "内置状态管理，自动处理加载、错误、成功状态，简化开发复杂度",
			},
			{
				problem: "用户体验差",
				description: "网络延迟导致页面加载慢，用户等待时间长",
				solution: "缓存机制提供即时响应，大幅提升用户体验和感知性能",
			},
		],
	},
	{
		id: "dependency-tracking",
		title: "智能依赖追踪",
		description: "演示 Cache Signals 如何自动追踪数据依赖关系，实现精确的缓存失效",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `"use client";
import { cache } from "react";

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
		benefits: ["自动建立依赖图", "级联缓存失效", "最小化重新渲染", "精确更新控制"],
		useCases: ["复杂数据关系", "组件间数据共享", "级联更新场景", "嵌套数据结构"],
		problemsSolved: [
			{
				problem: "依赖关系维护困难",
				description: "数据间的依赖关系需要手动维护，容易出现遗漏或错误",
				solution: "自动追踪数据访问模式，构建依赖图，智能管理缓存关系",
			},
			{
				problem: "过度渲染严重",
				description: "数据变化时无关组件也被重新渲染，影响性能",
				solution: "精确的依赖追踪，只更新真正受影响的组件，最小化重新渲染",
			},
			{
				problem: "缓存一致性难以保证",
				description: "相关缓存不能同步更新，导致数据不一致的问题",
				solution: "级联失效机制，相关数据自动同步更新，确保数据一致性",
			},
			{
				problem: "性能优化困难",
				description: "无法精确控制更新范围，优化效果有限",
				solution: "细粒度的依赖管理，实现精确的更新控制，最大化性能优化效果",
			},
		],
	},
	{
		id: "cache-strategies",
		title: "缓存策略管理",
		description: "展示不同的缓存策略，包括 TTL、LRU 和自定义失效策略",
		category: "Performance",
		difficulty: "高级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `"use client";
import { cache } from "react";

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
		benefits: ["TTL (生存时间) 策略", "LRU (最近最少使用) 策略", "自定义失效策略", "策略动态切换"],
		useCases: ["实时数据缓存", "大量数据管理", "性能优化场景", "内存使用控制"],
		problemsSolved: [
			{
				problem: "缓存策略单一",
				description: "固定缓存策略无法适应不同场景的需求，性能不理想",
				solution: "提供多种缓存策略，支持动态切换，满足不同场景的优化需求",
			},
			{
				problem: "内存管理困难",
				description: "缓存数据无限增长，容易导致内存溢出和性能下降",
				solution: "LRU 等策略自动管理缓存大小，防止内存溢出，保持系统稳定",
			},
			{
				problem: "数据时效性控制",
				description: "无法控制缓存数据的时效性，可能使用过期数据",
				solution: "TTL 策略自动处理数据过期，确保使用最新有效数据",
			},
			{
				problem: "策略配置复杂",
				description: "不同策略的配置和使用方式复杂，学习成本高",
				solution: "统一的 API 接口，简化策略配置，降低使用门槛和学习成本",
			},
		],
	},
	{
		id: "advanced-applications",
		title: "高级应用场景",
		description: "展示 Cache Signals 在复杂场景中的应用，包括实时数据、计算缓存等",
		category: "Advanced",
		difficulty: "高级",
		status: "completed",
		icon: <Clock className="h-5 w-5" />,
		codeSnippet: `"use client";
import { cache } from "react";

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
		benefits: ["实时数据同步", "计算结果缓存", "离线数据支持", "网络状态感知"],
		useCases: ["实时聊天应用", "复杂计算缓存", "离线优先应用", "数据密集型应用"],
		problemsSolved: [
			{
				problem: "实时数据处理复杂",
				description: "实时数据的缓存和同步逻辑复杂，实现困难",
				solution: "内置实时数据支持，自动处理连接管理和数据同步，简化实现",
			},
			{
				problem: "计算资源浪费",
				description: "复杂计算重复执行，浪费 CPU 资源和用户等待时间",
				solution: "计算结果缓存，避免重复计算，显著提升性能和响应速度",
			},
			{
				problem: "离线体验差",
				description: "网络中断时无法访问数据，用户体验差",
				solution: "离线数据缓存，确保网络不稳定时仍能提供基本功能",
			},
			{
				problem: "网络状态管理",
				description: "网络状态变化时需要手动调整缓存策略，代码复杂",
				solution: "自动网络状态感知，动态调整缓存策略，优化用户体验",
			},
		],
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
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(cacheSignalExamples[0]);

	const architectureFeatures: FeatureCard[] = [
		{
			icon: <Database className="h-6 w-6 text-blue-600" />,
			title: "智能缓存",
			description: "自动管理数据缓存",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Target className="h-6 w-6 text-green-600" />,
			title: "依赖追踪",
			description: "精确追踪数据关系",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-purple-600" />,
			title: "智能失效",
			description: "自动失效过期缓存",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Clock className="h-6 w-6 text-orange-600" />,
			title: "性能优化",
			description: "减少重复渲染",
			bgColor: "bg-orange-50",
			iconColor: "text-orange-600",
			titleColor: "text-orange-900",
			descriptionColor: "text-orange-700",
		},
	];

	// 3W Rule data
	const threeWSections: WSection[] = [
		{
			description:
				"Cache Signals 是 React 19 引入的智能缓存系统，自动追踪组件间的数据依赖关系，并在数据发生变化时智能地更新相关缓存，提供高效且易用的状态管理解决方案。",
			features: ["自动依赖追踪", "智能缓存失效", "精确更新机制", "性能优化"],
		},
		{
			description:
				"解决传统缓存方案手动管理依赖关系的痛点，通过自动化依赖追踪和智能更新机制，减少过度渲染，确保缓存及时失效，让开发者专注于业务逻辑而不用担忧性能问题。",
			features: ["减少不必要渲染", "避免缓存失效延迟", "简化状态管理逻辑", "提升应用响应速度"],
		},
		{
			description:
				"适合处理复杂数据依赖关系、频繁数据更新或需要优化性能的场景，特别是数据密集型应用、实时数据同步、需要精确控制缓存失效策略的性能敏感型应用。",
			features: ["复杂数据依赖关系", "实时数据同步", "大数据量缓存", "性能敏感型应用"],
		},
	];

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"basic-caching": [
				{
					title: "🚀 基础缓存使用",
					code: `"use client";
import { cache } from "react";

function UserProfile({ userId }) {
  const user = cache.use(\`user-\${userId}\`, async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  });

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
					description: "最基础的缓存使用方式",
				},
				{
					title: "⚡ 缓存失效控制",
					code: `// 手动控制缓存失效
function updateUser(userId, userData) {
  // 更新数据
  const updatedUser = await updateUserApi(userId, userData);

  // 失效相关缓存
  cache.invalidate(\`user-\${userId}\`);
  cache.invalidate(\`user-posts-\${userId}\`);

  return updatedUser;
}`,
					description: "精确控制缓存失效时机",
				},
			],
			"dependency-tracking": [
				{
					title: "🔗 自动依赖追踪",
					code: `function UserDashboard({ userId }) {
  const user = cache.use(\`user-\${userId}\`, () => fetchUser(userId));
  const posts = cache.use(\`posts-\${userId}\`, () => fetchUserPosts(userId));

  // 当 user 变化时，posts 缓存会自动失效
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
}`,
					description: "自动追踪数据依赖关系",
				},
			],
			"cache-strategies": [
				{
					title: "⏰ TTL 缓存策略",
					code: `function DataComponent() {
  const data = cache.use("api-data", fetchData, {
    ttl: 5000, // 5秒后自动过期
  });

  return <div>{data?.content}</div>;
}`,
					description: "设置缓存生存时间",
				},
				{
					title: "📚 LRU 缓存策略",
					code: `function DataComponent() {
  const data = cache.use("api-data", fetchData, {
    strategy: "lru",
    maxSize: 100, // 最多缓存100项
  });

  return <div>{data?.content}</div>;
}`,
					description: "最近最少使用策略",
				},
			],
			"advanced-applications": [
				{
					title: "🔄 实时数据缓存",
					code: `function useRealtimeData(channel) {
  return cache.use(\`realtime-\${channel}\`, async () => {
    const subscription = createSubscription(channel, {
      onData: (newData) => {
        cache.update(\`realtime-\${channel}\`, newData);
      },
    });
    return { data: initialData, subscription };
  }, {
    realtime: true,
    autoReconnect: true,
  });
}`,
					description: "实时数据的缓存管理",
				},
				{
					title: "💾 计算结果缓存",
					code: `function useExpensiveComputation(input) {
  return cache.use(\`compute-\${input}\`, () => {
    // 复杂计算逻辑
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * Math.random();
    }
    return result;
  }, {
    strategy: "lru",
    maxSize: 50,
  });
}`,
					description: "缓存复杂计算结果",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "basic-caching":
				return [<BasicCachingDemo key="basic" />];
			case "dependency-tracking":
				return [<DependencyTrackingDemo key="dependency" />];
			case "cache-strategies":
				return [<CacheStrategiesDemo key="strategies" />];
			case "advanced-applications":
				return [<AdvancedApplicationsDemo key="advanced" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Database className="h-8 w-8 text-blue-600" />}
					title="React 19 Cache Signals"
					subtitle="智能缓存与依赖追踪系统"
				/>

				{/* Cache Signals 架构概览 */}
				<ArchitectureOverview title="Cache Signals 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 示例选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择示例:"
					examples={cacheSignalExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = cacheSignalExamples.find((ex) => ex.id === exampleId);
						if (example) setSelectedExample(example);
					}}
				/>

				{/* 详细展示区域 - 下方内容 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					{selectedExample && (
						<ExampleDetail
							example={selectedExample}
							demoComponents={getDemoComponents()}
							onCopyCode={(code) => copyWithFeedback(code, setCopiedCode)}
							copiedCode={copiedCode}
						/>
					)}
				</div>

				{/* 官方代码示例 */}
				<OfficialExamples
					title={`📚 ${selectedExample?.title} 官方示例`}
					description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
					examples={getOfficialExamples(selectedExample?.id || "")}
				/>
			</div>
		</Layout>
	);
}
