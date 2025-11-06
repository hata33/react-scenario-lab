"use client";

import { AlertCircle, Clock, Target, Zap } from "lucide-react";
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
import type { ActionExample, WSection } from "../(types)";
// Import demo components from index file
import { BasicSuspenseDemo, ConcurrentRenderingDemo, ErrorBoundaryDemo, StreamingDemo } from "./(components)";

const suspenseExamples: ActionExample[] = [
	{
		id: "basic-suspense",
		title: "基础 Suspense",
		description: "优雅处理异步组件加载，提供流畅的用户体验",
		category: "Core Features",
		difficulty: "初级",
		status: "completed",
		icon: <Clock className="h-5 w-5" />,
		codeSnippet: `import { Suspense } from 'react';

function UserProfile({ userId }) {
  return (
    <div>
      <h1>用户资料</h1>
      <Suspense fallback={<Loading />}>
        <UserDetails userId={userId} />
      </Suspense>
    </div>
  );
}`,
		benefits: ["优雅加载状态", "防止布局偏移", "代码简洁", "用户体验提升"],
		useCases: ["数据加载", "图片懒加载", "异步组件", "路由切换"],
		problemsSolved: [
			{
				problem: "加载状态处理复杂",
				description: "传统方式需要手动管理loading状态，容易出现布局偏移",
				solution: "Suspense自动处理加载状态，提供流畅的过渡体验",
			},
		],
	},
	{
		id: "streaming",
		title: "流式渲染",
		description: "逐步发送HTML到客户端，用户可以更快看到页面内容",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `import { Suspense } from 'react';

function StreamingPage() {
  return (
    <html>
      <body>
        <Header /> {/* 立即渲染 */}
        <Suspense fallback={<MainLoading />}>
          <MainContent /> {/* 流式渲染 */}
        </Suspense>
        <Footer /> {/* 立即渲染 */}
      </body>
    </html>
  );
}`,
		benefits: ["更快首屏显示", "渐进式加载", "改善感知性能", "更好的用户体验"],
		useCases: ["长页面", "数据密集页面", "电商产品页", "仪表板"],
		problemsSolved: [
			{
				problem: "首屏加载时间长",
				description: "传统方式需要等待所有内容加载完成才能显示页面",
				solution: "流式渲染先显示已准备好的内容，其余内容逐步加载",
			},
		],
	},
	{
		id: "error-boundaries",
		title: "错误边界",
		description: "优雅处理组件错误，提供错误恢复机制",
		category: "Error Handling",
		difficulty: "中级",
		status: "completed",
		icon: <AlertCircle className="h-5 w-5" />,
		codeSnippet: `import { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  );
}`,
		benefits: ["优雅错误处理", "错误恢复机制", "防止应用崩溃", "用户体验保护"],
		useCases: ["数据获取失败", "组件渲染错误", "网络异常", "运行时错误"],
		problemsSolved: [
			{
				problem: "错误处理不完善",
				description: "组件出错时整个应用可能崩溃，用户体验差",
				solution: "错误边界捕获组件错误，提供优雅的降级体验",
			},
		],
	},
	{
		id: "concurrent-rendering",
		title: "并发渲染",
		description: "非阻塞式渲染，保持界面响应性和流畅性",
		category: "Performance",
		difficulty: "高级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `import { Suspense, useTransition } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value); // 立即更新输入

    startTransition(() => {
      // 在后台执行搜索，不阻塞 UI
      performSearch(value).then(setResults);
    });
  };

  return (
    <div>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <div>搜索中...</div>}
      <Suspense fallback={<ResultsLoading />}>
        <SearchResults results={results} />
      </Suspense>
    </div>
  );
}`,
		benefits: ["非阻塞渲染", "保持响应性", "流畅交互", "性能优化"],
		useCases: ["搜索功能", "数据过滤", "大量数据处理", "实时更新"],
		problemsSolved: [
			{
				problem: "界面阻塞严重",
				description: "大量渲染操作导致界面冻结，用户无法进行其他操作",
				solution: "并发渲染将更新标记为过渡，在后台执行，保持界面响应性",
			},
		],
	},
];

export default function SuspenseEnhancedPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(suspenseExamples[0]);

	const architectureFeatures = [
		{
			icon: <Clock className="h-6 w-6 text-blue-600" />,
			title: "优雅加载",
			description: "流畅的异步状态处理",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-green-600" />,
			title: "流式渲染",
			description: "渐进式内容展示",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <AlertCircle className="h-6 w-6 text-purple-600" />,
			title: "错误处理",
			description: "优雅的错误恢复",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Target className="h-6 w-6 text-orange-600" />,
			title: "并发渲染",
			description: "非阻塞式更新",
			bgColor: "bg-orange-50",
			iconColor: "text-orange-600",
			titleColor: "text-orange-900",
			descriptionColor: "text-orange-700",
		},
	];

	const threeWSections: WSection[] = [
		{
			description:
				"增强的 Suspense 是 React 19 中改进的异步渲染机制，提供更好的加载状态管理、错误边界处理和并发渲染支持。",
			features: ["优雅加载状态", "流式渲染", "错误边界", "并发渲染"],
		},
		{
			description:
				"解决传统异步加载体验差、加载状态管理复杂、错误处理不完善、并发渲染支持不足等问题。通过统一的 Suspense 机制，大幅提升异步用户体验。",
			features: ["统一异步处理", "改善用户体验", "简化开发复杂度", "提升应用性能"],
		},
		{
			description:
				"适用于数据获取、代码分割、图片加载、异步组件渲染等需要优雅处理加载状态的场景。特别适合复杂的单页应用和数据密集型应用。",
			features: ["数据加载", "代码分割", "图片懒加载", "复杂组件渲染"],
		},
	];

	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"basic-suspense": [
				{
					title: "📄 用户资料加载",
					code: `function UserProfile({ userId }) {
  return (
    <div>
      <h1>用户资料</h1>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserDetails userId={userId} />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </div>
  );
}`,
					description: "使用多个 Suspense 边界处理不同部分的加载",
				},
			],
			streaming: [
				{
					title: "🌊 流式页面渲染",
					code: `function StreamingApp() {
  return (
    <html>
      <body>
        <Shell />
        <Suspense fallback={<Loading />}>
          <Page />
        </Suspense>
      </body>
    </html>
  );
}`,
					description: "使用 React 18+ 的流式 SSR 渲染",
				},
			],
			"error-boundaries": [
				{
					title: "🛡️ 错误边界处理",
					code: `function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}`,
					description: "错误边界与 Suspense 的组合使用",
				},
			],
			"concurrent-rendering": [
				{
					title: "⚡ 并发搜索",
					code: `function SearchApp() {
  const [isPending, startTransition] = useTransition();

  const handleSearch = (query) => {
    startTransition(() => {
      setSearchResults(search(query));
    });
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      {isPending && <Spinner />}
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}`,
					description: "使用 useTransition 实现并发搜索",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "basic-suspense":
				return [<BasicSuspenseDemo key="basic-suspense" />];
			case "streaming":
				return [<StreamingDemo key="streaming" />];
			case "error-boundaries":
				return [<ErrorBoundaryDemo key="error-boundaries" />];
			case "concurrent-rendering":
				return [<ConcurrentRenderingDemo key="concurrent-rendering" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Clock className="h-8 w-8 text-blue-600" />}
					title="React 19 增强 Suspense"
					subtitle="优雅的异步渲染新时代"
				/>

				{/* Suspense 架构概览 */}
				<ArchitectureOverview title="增强 Suspense 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 功能选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择功能:"
					examples={suspenseExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = suspenseExamples.find((ex) => ex.id === exampleId);
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
