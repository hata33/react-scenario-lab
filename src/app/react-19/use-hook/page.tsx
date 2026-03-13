"use client";

import { Database, Play, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { copyWithFeedback } from "@/utils";
// Import showcase components
import {
	FeatureContainer,
	FeatureContent,
	FeatureHeader,
	FeatureOverview,
	FeatureThreeWRule,
	FeatureExampleSelector,
	FeatureExampleDetail,
	FeatureOfficialExamples,
	type Example,
	type ExampleDetail,
	type OfficialExample,
} from "@/components/showcase";
// Import demo components from index file
import {
	AsyncRenderingDemo,
	ContextIntegrationDemo,
	PerformanceOptimizationDemo,
	PromiseConsumptionDemo,
} from "./(components)";

const useHookExamples: Example[] = [
	{
		id: "promise-consumption",
		title: "Promise 消费",
		icon: <Database className="h-5 w-5" />,
		difficulty: "中级",
	},
	{
		id: "context-integration",
		title: "Context 集成",
		icon: <Play className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "async-rendering",
		title: "异步渲染",
		icon: <Zap className="h-5 w-5" />,
		difficulty: "高级",
	},
	{
		id: "performance-optimization",
		title: "性能优化",
		icon: <Target className="h-5 w-5" />,
		difficulty: "高级",
	},
];

const exampleDetails: Record<string, ExampleDetail> = {
	"promise-consumption": {
		title: "Promise 消费",
		icon: <Database className="h-5 w-5" />,
		description: "优雅地消费 Promise，支持竞态条件和自动取消",
		codeSnippet: `import { use } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ 使用 use 消费 Promise
  const userPromise = use(fetchUser(userId));

  if (userPromise.status === 'pending') {
    return <div>Loading user...</div>;
  }

  if (userPromise.status === 'error') {
    return <div>Error: {userPromise.error.message}</div>;
  }

  return <div>Welcome {userPromise.value.name}!</div>;
}`,
		benefits: ["优雅的异步状态", "自动取消", "竞态条件处理", "错误边界集成"],
		useCases: ["数据获取", "API 调用", "文件上传", "WebSocket 连接"],
		problemsSolved: [
			{
				problem: "Promise 消费复杂",
				description: "传统方式需要手动处理 loading、error、success 状态，代码冗余且容易出错",
				solution: "use Hook 自动管理 Promise 状态，提供统一的消费接口",
			},
		],
		status: "completed",
	},
	"context-integration": {
		title: "Context 集成",
		icon: <Play className="h-5 w-5" />,
		description: "简化 Context 的消费，提供默认值和类型安全",
		codeSnippet: `import { use } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeButton() {
  // ✅ 使用 use 消费 Context
  const theme = use(ThemeContext, 'light');

  return (
    <button className={\`btn btn-\${theme}\`}>
      Current theme: {theme}
    </button>
  );
}`,
		benefits: ["简化 Context 使用", "默认值支持", "类型安全", "性能优化"],
		useCases: ["主题切换", "用户认证", "配置管理", "国际化"],
		problemsSolved: [
			{
				problem: "Context 消费复杂",
				description: "useContext 需要检查 undefined，且每次 Context 变化都会触发重新渲染",
				solution: "use Hook 提供默认值和优化，简化使用方式",
			},
		],
		status: "completed",
	},
	"async-rendering": {
		title: "异步渲染",
		icon: <Zap className="h-5 w-5" />,
		description: "支持异步组件渲染，提供优雅的加载状态",
		codeSnippet: `import { use } from 'react';

function AsyncImage({ src, alt }) {
  // ✅ 使用 use 支持异步渲染
  const blob = use(fetch(src).then(res => res.blob()));
  const url = blob.status === 'pending' ? '' : URL.createObjectURL(blob.value);

  return <img src={url} alt={alt} />;
}

function Gallery({ images }) {
  return (
    <div>
      {images.map(src => (
        <AsyncImage key={src} src={src} alt="Gallery image" />
      ))}
    </div>
  );
}`,
		benefits: ["异步渲染支持", "优雅降级", "自动清理资源", "防止布局偏移"],
		useCases: ["图片加载", "代码分割", "数据流", "懒加载"],
		problemsSolved: [
			{
				problem: "异步组件渲染困难",
				description: "传统方式需要复杂的状态管理和 fallback 处理，容易出现布局偏移",
				solution: "use Hook 自动处理异步渲染状态，提供优雅的 fallback 支持",
			},
		],
		status: "completed",
	},
	"performance-optimization": {
		title: "性能优化",
		icon: <Target className="h-5 w-5" />,
		description: "内置缓存和依赖优化，避免不必要的重新计算",
		codeSnippet: `import { use } from 'react';

function ExpensiveComponent({ data, filter }) {
  // ✅ use Hook 自动缓存结果
  const filteredData = use(() => {
    console.log('Computing filtered data...');
    return data.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
		benefits: ["智能缓存", "依赖优化", "性能提升", "代码简洁"],
		useCases: ["数据过滤", "复杂计算", "数据转换", "列表处理"],
		problemsSolved: [
			{
				problem: "重复计算性能问题",
				description: "useMemo 需要手动管理依赖项，容易出现遗漏或过度优化",
				solution: "use Hook 自动追踪依赖，智能缓存计算结果",
			},
		],
		status: "completed",
	},
};

const architectureFeatures = [
	{
		icon: <Database className="h-6 w-6 text-blue-600" />,
		title: "Promise 消费",
		description: "优雅的异步状态管理",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		titleColor: "text-blue-900",
		descriptionColor: "text-blue-700",
	},
	{
		icon: <Play className="h-6 w-6 text-green-600" />,
		title: "Context 集成",
		description: "简化的状态消费",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
		titleColor: "text-green-900",
		descriptionColor: "text-green-700",
	},
	{
		icon: <Zap className="h-6 w-6 text-purple-600" />,
		title: "异步渲染",
		description: "非阻塞式组件渲染",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		titleColor: "text-purple-900",
		descriptionColor: "text-purple-700",
	},
	{
		icon: <Target className="h-6 w-6 text-orange-600" />,
		title: "性能优化",
		description: "智能缓存和依赖优化",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
		titleColor: "text-orange-900",
		descriptionColor: "text-orange-700",
	},
];

const threeWSections = [
	{
		description: "use Hook 是 React 19 中统一资源消费的新 Hook，提供了 Promise、Context、异步渲染等多种使用场景的统一接口。",
		features: ["Promise 消费", "Context 集成", "异步渲染", "性能优化"],
	},
	{
		description: "解决传统异步处理、Context 使用复杂、性能优化困难等问题。通过统一的 Hook 接口，简化开发复杂度，提升代码质量。",
		features: ["统一接口", "类型安全", "性能优化", "开发效率"],
	},
	{
		description: "适用于数据获取、状态管理、异步渲染、性能优化等需要资源消费的场景。特别适合复杂的现代 Web 应用。",
		features: ["API 调用", "状态管理", "懒加载", "缓存策略"],
	},
];

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		"promise-consumption": [
			{
				title: "🔄 数据获取",
				code: `function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  switch (user.status) {
    case 'pending':
      return <div>Loading user profile...</div>;
    case 'error':
      return <div>Error: {user.error.message}</div>;
    case 'success':
      return <div>{user.value.name}</div>;
  }
}

function App() {
  return (
    <div>
      <UserProfile userId={123} />
      <UserProfile userId={456} />
    </div>
  );
}`,
				description: "使用 use Hook 获取用户数据，自动处理加载状态",
			},
		],
		"context-integration": [
			{
				title: "🎨 主题切换",
				code: `function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const useTheme = use(context(ThemeContext), 'light');
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useTheme();
  return <button className={\`btn btn-\${theme}\`}>
    Theme: {theme}
  </button>;
}`,
				description: "使用 use Hook 消费 Context，支持默认值",
			},
		],
		"async-rendering": [
			{
				title: "🖼️ 图片懒加载",
				code: `function LazyImage({ src, alt }) {
  const blob = use(fetch(src).then(res => res.blob()));

  if (blob.status === 'pending') {
    return <div className="placeholder">Loading...</div>;
  }

  return <img src={blob.value} alt={alt} />;
}

function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map(src => (
        <LazyImage key={src} src={src} alt="Gallery image" />
      ))}
    </div>
  );
}`,
				description: "异步加载图片，提供优雅的加载状态",
			},
		],
		"performance-optimization": [
			{
				title: "⚡ 数据过滤",
				code: `function FilteredList({ items, filter }) {
  const filteredItems = use(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
				description: "使用 use Hook 自动缓存过滤结果",
			},
		],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
		case "promise-consumption":
			return [<PromiseConsumptionDemo key="promise-consumption" />];
		case "context-integration":
			return [<ContextIntegrationDemo key="context-integration" />];
		case "async-rendering":
			return [<AsyncRenderingDemo key="async-rendering" />];
		case "performance-optimization":
			return [<PerformanceOptimizationDemo key="performance-optimization" />];
		default:
			return [];
	}
};

export default function UseHookPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(useHookExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<Database className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
					title="React 19 use Hook"
					subtitle="统一资源消费的优雅方案"
				/>

				<FeatureContent className="space-y-4">
					<FeatureOverview title="use Hook 生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>

				<FeatureExampleSelector
					label="选择功能:"
					examples={useHookExamples}
					selectedExampleId={selectedExampleId}
					onSelectExample={setSelectedExampleId}
				/>

				<FeatureContent>
					<FeatureExampleDetail
						example={selectedExample}
						demoComponents={getDemoComponents(selectedExampleId)}
						onCopyCode={handleCopyCode}
						copiedCode={copiedCode}
					/>
				</FeatureContent>

				<FeatureContent>
					<FeatureOfficialExamples
						title={`📚 ${selectedExample?.title} 官方示例`}
						description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
						examples={getOfficialExamples(selectedExampleId)}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
