"use client";

import { Bug, Code, Layers, Zap } from "lucide-react";
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
import type { FeatureCard, WSection, OwnerStackExample } from "../(types)";
// Import demo components from index file
import {
	ComplexComponentTreeDemo,
	ErrorTrackingDemo,
	OwnerStackDemo,
	PerformanceAnalysisDemo,
} from "./(components)";

const ownerStackExamples: OwnerStackExample[] = [
	{
		id: "basic-debug",
		title: "基础调试演示",
		description: "Owner Stack 基础功能演示，展示组件层级关系和状态追踪",
		category: "调试工具",
		difficulty: "初级",
		status: "completed",
		icon: <Bug className="h-5 w-5" />,
		codeSnippet: `// 基础 Owner Stack 调试
const ownerStackInfo = [
	{ component: "App", props: { debugMode }, state: "initialized" },
	{ component: "ParentComponent", props: { mode: "demo" }, state: "ready" },
	{ component: "ChildComponent", props: { data: "test" }, state: "loading" },
];

function OwnerStackDemo() {
	const [debugMode, setDebugMode] = useState(false);

	// 模拟 Owner Stack 信息展示
	const ownerStackInfo = [
		{ component: "App", props: { debugMode }, state: componentState.app },
		{ component: "ParentComponent", props: { mode: "demo" }, state: componentState.parent },
		{ component: "ChildComponent", props: { data: "test" }, state: componentState.child },
	];

	return (
		<div>
			{debugMode && (
				<div className="rounded-lg bg-purple-50 p-4">
					<h4 className="mb-3 font-medium text-purple-800">🔍 Owner Stack 信息：</h4>
					<div className="space-y-2">
						{ownerStackInfo.map((owner, index) => (
							<div key={owner.component} className="flex items-center gap-2">
								<span className="font-mono text-purple-600">
									{"".padStart(index * 2, "→")}
								</span>
								<span className="font-medium text-gray-800">{owner.component}</span>
								<span className="text-gray-500 text-xs">state: {owner.state}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}`,
		benefits: [
			"清晰的组件层级关系展示",
			"实时的状态追踪和监控",
			"详细的 props 传递信息",
			"直观的调用链路可视化",
		],
		useCases: [
			"组件调试和状态分析",
			"性能瓶颈定位",
			"错误源头追踪",
			"组件结构优化",
		],
		problemsSolved: [
			{
				problem: "组件层级复杂难追踪",
				description: "传统调试方式在复杂的组件树中难以追踪组件间的关系和状态流动",
				solution: "Owner Stack 提供清晰的组件层级图谱，直观展示组件间的所有权关系和数据流向",
			},
			{
				problem: "状态传递路径不明确",
				description: "在多层组件嵌套中，难以追踪状态是如何传递和变化的",
				solution: "通过 Owner Stack 可以清晰地看到每个组件的状态信息和 props 传递路径",
			},
			{
				problem: "错误定位效率低下",
				description: "传统调试方式需要大量时间在控制台和代码中寻找错误源头",
				solution: "Owner Stack 提供直观的错误展示界面，让错误定位变得快速高效",
			},
			{
				problem: "组件关系理解困难",
				description: "在复杂应用中难以理解组件间的依赖关系和调用链路",
				solution: "通过可视化的组件层级关系，快速理解整个应用的架构结构",
			},
		],
	},
	{
		id: "complex-tree",
		title: "复杂组件树调试",
		description: "处理复杂嵌套组件结构的调试场景，展示路径高亮和组件信息分析",
		category: "高级调试",
		difficulty: "中级",
		status: "completed",
		icon: <Layers className="h-5 w-5" />,
		codeSnippet: `// 复杂组件树分析
const componentTree = {
	name: "App",
	children: [
		{ name: "Header", children: [...] },
		{ name: "MainContent", children: [...] }
	]
};

const getOwnerPath = (componentPath: string) => {
	return componentPath.split("/").slice(0, -1).join(" → ");
};

function ComplexComponentTreeDemo() {
	const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
	const [highlightPath, setHighlightPath] = useState(false);

	const renderComponentNode = (node: any, depth = 0, path = "") => {
		const currentPath = path ? \`\${path}/\${node.name}\` : node.name;
		const isSelected = selectedComponent === currentPath;

		return (
			<div key={currentPath} className="ml-4">
				<div
					className={\`mb-1 cursor-pointer rounded p-2 \$
						isSelected
							? "border-2 border-purple-500 bg-purple-200"
							: "bg-gray-100 hover:bg-gray-200"
					\`}
					onClick={() => setSelectedComponent(currentPath)}
				>
					<span className="font-medium text-gray-800 text-sm">
						{"".padStart(depth * 2, "→")} {node.name}
					</span>
				</div>
				{node.children.map((child: any) => renderComponentNode(child, depth + 1, currentPath))}
			</div>
		);
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<div className="rounded-xl bg-white p-6 shadow-lg">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">🌳 组件树结构</h3>
				<div className="max-h-96 overflow-auto rounded-lg bg-gray-50 p-4">
					{renderComponentNode(componentTree)}
				</div>
			</div>

			<div className="rounded-xl bg-white p-6 shadow-lg">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">📋 Owner Stack 信息</h3>
				{selectedComponent ? (
					<div className="space-y-4">
						<div className="rounded-lg bg-purple-50 p-4">
							<p className="font-mono text-purple-700">{selectedComponent}</p>
						</div>
					</div>
				) : (
					<div className="rounded-lg bg-gray-50 p-4 text-center">
						<p className="text-gray-500">点击左侧组件查看 Owner Stack 信息</p>
					</div>
				)}
			</div>
		</div>
	);
}`,
		benefits: [
			"支持大型应用组件树分析",
			"路径高亮和选择功能",
			"组件深度和关系分析",
			"实时性能数据展示",
		],
		useCases: [
			"大型应用架构分析",
			"组件依赖关系梳理",
			"性能瓶颈定位",
			"代码重构规划",
		],
		problemsSolved: [
			{
				problem: "大型应用组件关系复杂",
				description: "在包含数百个组件的大型应用中，难以理解组件间的依赖和调用关系",
				solution: "Owner Stack 的树形可视化功能帮助开发者快速理解整个应用的组件架构",
			},
			{
				problem: "组件深度嵌套调试困难",
				description: "深层嵌套的组件在调试时难以定位和理解其在整个应用中的位置",
				solution: "提供路径选择和高亮功能，让开发者能够快速定位和分析特定组件",
			},
			{
				problem: "组件层级理解不直观",
				description: "传统调试工具缺乏直观的组件层级关系展示",
				solution: "通过树形可视化界面，直观展示组件间的层级关系和依赖结构",
			},
			{
				problem: "性能分析缺乏上下文",
				description: "性能数据缺乏组件层级的上下文，难以定位性能瓶颈的具体位置",
				solution: "在组件树中直接展示性能数据，帮助快速定位性能问题",
			},
		],
	},
	{
		id: "performance-analysis",
		title: "性能分析优化",
		description: "基于 Owner Stack 的性能分析工具，监控组件渲染时间、重渲染次数和 Props 大小",
		category: "性能优化",
		difficulty: "高级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `// 性能指标分析
const performanceData = {
	renderTime: [
		{ component: "App", time: 5.2, status: "good" },
		{ component: "ArticleList", time: 15.3, status: "critical" }
	],
	reRenders: [
		{ component: "ArticleCard", count: 50, status: "critical" }
	],
	propsSize: [
		{ component: "MainContent", size: "8KB", status: "warning" }
	]
};

function PerformanceAnalysisDemo() {
	const [analysisMode, setAnalysisMode] = useState(false);
	const [selectedMetric, setSelectedMetric] = useState("render-time");

	const getStatusColor = (status: string) => {
		switch (status) {
			case "good": return "text-green-600";
			case "warning": return "text-yellow-600";
			case "critical": return "text-red-600";
			default: return "text-gray-600";
		}
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg">
			<div className="mb-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">⚡ 性能分析面板</h3>
				<button
					onClick={() => setAnalysisMode(!analysisMode)}
					className={\`rounded-lg px-4 py-2 transition-colors \$
						analysisMode ? "bg-purple-600 text-white" : "bg-gray-600 text-white"
					\`}
				>
					{analysisMode ? "关闭" : "开启"} 性能分析
				</button>
			</div>

			{analysisMode && (
				<div className="space-y-3">
					{performanceData[selectedMetric].map((item) => (
						<div key={item.component} className="rounded-lg p-3 bg-gray-50">
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-800">{item.component}</span>
								<span className={\`font-bold \${getStatusColor(item.status)}\`}>
									{selectedMetric === "render-time" ? \`\${item.time}ms\` :
									 selectedMetric === "re-renders" ? \`\${item.count}次\` : item.size}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}`,
		benefits: [
			"多维度性能指标监控",
			"性能瓶颈自动识别",
			"优化建议智能推荐",
			"实时性能数据更新",
		],
		useCases: [
			"应用性能优化",
			"渲染性能分析",
			"内存使用监控",
			"用户体验提升",
		],
		problemsSolved: [
			{
				problem: "性能瓶颈定位困难",
				description: "应用性能问题时，难以快速定位到具体的问题组件和原因",
				solution: "通过 Owner Stack 的性能分析功能，可以直观看到各组件的性能指标和潜在问题",
			},
			{
				problem: "优化缺乏针对性",
				description: "性能优化往往缺乏数据支撑，不知道从何处着手优化",
				solution: "提供详细的性能数据和建议，让优化工作更加有针对性和有效性",
			},
			{
				problem: "重渲染问题难发现",
				description: "不必要的组件重渲染是常见的性能问题，但难以快速识别",
				solution: "通过重渲染次数监控，快速识别需要优化的组件和渲染逻辑",
			},
			{
				problem: "Props 传递效率低",
				description: "大型 Props 对象传递会导致性能问题，但难以发现和优化",
				solution: "Props 大小监控帮助发现数据传递的效率问题，指导优化工作",
			},
		],
	},
	{
		id: "error-tracking",
		title: "错误追踪调试",
		description: "强大的错误追踪系统，通过 Owner Stack 快速定位错误源头和调试信息",
		category: "错误处理",
		difficulty: "中级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `// 错误追踪和定位
const errorScenarios = [
	{
		name: "Props 类型错误",
		component: "UserProfile",
		error: "TypeError: Cannot read property 'name' of undefined",
		owner: "App → Sidebar → UserProfile"
	},
	{
		name: "状态更新错误",
		component: "ArticleList",
		error: "Error: Invalid state update",
		owner: "App → MainContent → ArticleList"
	}
];

function ErrorTrackingDemo() {
	const [errorMode, setErrorMode] = useState(false);
	const [currentError, setCurrentError] = useState<string | null>(null);

	const simulateError = (errorId: string) => {
		const error = errorScenarios.find((e) => e.id === errorId);
		if (error) {
			setCurrentError(error.id);
			setTimeout(() => setCurrentError(null), 3000);
		}
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl">🐛 错误追踪与调试</h3>

			{errorMode && (
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						{errorScenarios.map((error) => (
							<button
								key={error.id}
								onClick={() => simulateError(error.id)}
								className={\`rounded-lg p-3 transition-colors \$
									currentError === error.id
										? "border-2 border-red-500 bg-red-100"
										: "bg-gray-100 hover:bg-gray-200"
								\`}
							>
								<p className="font-medium text-gray-800">{error.name}</p>
								<p className="text-gray-500 text-xs">{error.component}</p>
							</button>
						))}
					</div>

					{currentError && (
						<div className="rounded-lg bg-red-50 p-4">
							<h4 className="mb-3 font-medium text-red-800">🚨 错误详情 (Owner Stack 调试信息)：</h4>
							<div className="space-y-2">
								<div className="rounded border border-red-200 bg-white p-2">
									<span className="font-mono text-red-600 text-sm">
										{errorScenarios.find(e => e.id === currentError)?.owner}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}`,
		benefits: [
			"快速错误定位能力",
			"详细的错误上下文信息",
			"Owner 路径追踪功能",
			"智能调试建议推荐",
		],
		useCases: [
			"线上错误快速修复",
			"开发阶段调试",
			"错误模式分析",
			"代码质量提升",
		],
		problemsSolved: [
			{
				problem: "错误定位耗时费力",
				description: "传统的错误调试需要花费大量时间在日志和控制台中寻找错误信息",
				solution: "Owner Stack 提供直观的错误展示界面，让错误定位变得快速高效",
			},
			{
				problem: "错误上下文信息缺失",
				description: "错误发生时，往往缺乏足够的上下文信息来理解和解决问题",
				solution: "通过 Owner 路径和组件状态信息，提供完整的错误上下文，帮助开发者快速理解问题",
			},
			{
				problem: "调试效率低下",
				description: "在复杂应用中，错误调试往往需要反复试错和猜测，效率很低",
				solution: "提供精确的错误定位和上下文信息，大大提升调试效率和成功率",
			},
			{
				problem: "错误模式难以分析",
				description: "缺乏系统性的错误收集和分析，难以发现代码中的常见问题模式",
				solution: "通过系统化的错误追踪，帮助开发者识别和分析常见的错误模式，改进代码质量",
			},
		],
	},
];

export default function OwnerStackPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(ownerStackExamples[0]);

	const architectureFeatures: FeatureCard[] = [
		{
			icon: <Layers className="h-6 w-6 text-blue-600" />,
			title: "组件所有权",
			description: "清晰展示组件间的所有权关系",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Bug className="h-6 w-6 text-green-600" />,
			title: "智能调试",
			description: "快速定位错误和性能问题",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-purple-600" />,
			title: "性能分析",
			description: "多维度性能指标监控",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Code className="h-6 w-6 text-orange-600" />,
			title: "错误追踪",
			description: "详细的错误上下文信息",
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
				"Owner Stack 是 React 19 中革命性的调试机制，能够清晰显示组件的所有权关系，帮助开发者快速理解组件层级、状态传递和调用链路，提供全新的调试体验。",
			features: ["组件所有权关系可视化", "实时状态监控", "智能错误追踪", "多维度性能分析"],
		},
		{
			description:
				"解决传统调试中组件层级复杂、状态传递路径不清晰、错误追踪困难、性能瓶颈定位等问题，提供更直观、高效的调试体验，显著提升开发效率和代码质量。",
			features: ["简化调试流程", "提升开发效率", "增强代码质量", "改善用户体验"],
		},
		{
			description:
				"适合组件调试、性能分析、错误排查、状态追踪、架构优化等需要理解组件关系和调用链的场景，特别在复杂应用开发和维护中发挥巨大作用。",
			features: ["大型应用调试", "组件架构分析", "性能优化", "错误快速修复"],
		},
	];

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"basic-debug": [
				{
					title: "🔍 基础 Owner Stack 使用",
					code: `// React 19 - Owner Stack 基础调试
import { useOwnerStack } from 'react';

function MyComponent() {
	// Owner Stack 会自动显示组件信息
	const ownerStack = useOwnerStack();

	return (
		<div>
			<h1>组件内容</h1>
			{/* 开发环境会自动显示 Owner Stack 信息 */}
		</div>
	);
}

// 自动追踪组件层级和状态
// 无需额外配置，React 19 自动处理`,
					description: "React 19 最基础的 Owner Stack 调试方式",
				},
				{
					title: "📊 状态追踪演示",
					code: `// 状态和 Props 追踪
function ParentComponent() {
	const [state, setState] = useState("initial");

	return (
		<div>
			{/* Owner Stack 自动显示： */}
			{/* - 组件层级关系 */}
			{/* - Props 传递信息 */}
			{/* - 当前状态值 */}
			<ChildComponent
				data={state}
				onUpdate={setState}
			/>
		</div>
	);
}`,
					description: "实时追踪组件状态和 Props 传递",
				},
			],
			"complex-tree": [
				{
					title: "🌳 组件树可视化",
					code: `// 复杂组件树分析
function ComponentTreeDemo() {
	// Owner Stack 可视化显示
	const componentHierarchy = {
		App: {
			children: {
				Header: {},
				Main: {
					Content: {},
					Sidebar: {}
				}
			}
		}
	};

	// 自动生成组件层级图
	return (
		<div>
			<Header />
			<Main>
				<Content />
				<Sidebar />
			</Main>
		</div>
	);
}`,
					description: "大型应用的组件树结构可视化",
				},
				{
					title: "🔗 路径追踪功能",
					code: `// Owner 路径追踪
function TraceComponentPath() {
	// 自动生成组件路径
	// App → Header → Navigation → NavItem

	return (
		<App>
			<Header>
				<Navigation>
					<NavItem />
				</Navigation>
			</Header>
		</App>
	);
}`,
					description: "组件间的所有权路径追踪",
				},
			],
			"performance-analysis": [
				{
					title: "⚡ 性能监控面板",
					code: `// 性能指标实时监控
import { usePerformanceTrace } from 'react';

function PerformanceDemo() {
	const performance = usePerformanceTrace();

	// 实时显示：
	// - 渲染时间
	// - 重渲染次数
	// - Props 大小
	// - 内存使用

	return <div>{children}</div>;
}`,
					description: "多维度的组件性能监控",
				},
				{
					title: "📈 性能瓶颈识别",
					code: `// 自动性能分析
const performanceReport = {
	renderTime: {
		"ProductList": 15.3, // ms
		"ProductCard": 3.8,
		"Header": 2.1
	},
	reRenders: {
		"ProductCard": 50,
		"Header": 3
	},
	// 自动标记性能问题
	issues: [
		"ProductCard 渲染次数过多",
		"ProductList 渲染时间过长"
	]
};`,
					description: "自动识别性能瓶颈和优化建议",
				},
			],
			"error-tracking": [
				{
					title: "🐛 错误追踪系统",
					code: `// 错误自动追踪
function ErrorBoundary() {
	// Owner Stack 自动捕获错误上下文
	const [error, setError] = useState(null);

	const handleError = (error) => {
		// 自动显示：
		// - 错误发生的组件
		// - Owner 路径
		// - 相关 Props 和状态
		// - 调用堆栈
		console.log('Error context:', error);
	};

	return <ErrorBoundary />;
}`,
					description: "完整的错误上下文信息捕获",
				},
				{
					title: "🔧 智能调试建议",
					code: `// 调试建议系统
const debugSuggestions = {
	errorType: "TypeError",
	component: "UserProfile",
	suggestion: "检查 User 数据是否存在",
	solution: "添加 User 数据验证",
	relatedDocs: [
		"Props 类型检查",
		"组件生命周期",
		"错误边界处理"
	]
};`,
					description: "基于错误模式的智能调试建议",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "basic-debug":
				return [<OwnerStackDemo key="basic" />];
			case "complex-tree":
				return [<ComplexComponentTreeDemo key="tree" />];
			case "performance-analysis":
				return [<PerformanceAnalysisDemo key="performance" />];
			case "error-tracking":
				return [<ErrorTrackingDemo key="error" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Bug className="h-8 w-8 text-blue-600" />}
					title="React 19 Owner Stack"
					subtitle="组件所有权调试"
				/>

				{/* Owner Stack 架构概览 */}
				<ArchitectureOverview title="Owner Stack 调试生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 示例选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择调试功能:"
					examples={ownerStackExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = ownerStackExamples.find((ex) => ex.id === exampleId);
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