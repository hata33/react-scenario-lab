"use client";

import { Clock, Download, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { copyWithFeedback } from "@/utils";
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
import { PrefetchDemo, PreinitDemo, PreloadDemo } from "./(components)";

const resourceExamples: Example[] = [
	{
		id: "preload",
		title: "preload",
		icon: <Download className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "prefetch",
		title: "prefetch",
		icon: <Zap className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "preinit",
		title: "preinit",
		icon: <Target className="h-5 w-5" />,
		difficulty: "中级",
	},
];

const exampleDetails: Record<string, ExampleDetail> = {
	preload: {
		title: "preload",
		icon: <Download className="h-5 w-5" />,
		description: "预加载关键资源，确保资源在需要时已经可用",
		codeSnippet: `"use client";
import { preload } from "react";

function MyComponent() {
  const handleClick = () => {
    // 预加载关键资源
    preload("https://example.com/api/data", {
      as: "fetch",
      method: "GET"
    });

    preload("https://example.com/styles.css", {
      as: "style"
    });
  };

  return <button onClick={handleClick}>预加载资源</button>;
}`,
		benefits: ["关键资源优先", "减少加载延迟", "提升性能", "用户体验优化"],
		useCases: ["关键CSS", "重要数据", "字体文件", "图片资源"],
		problemsSolved: [
			{
				problem: "资源加载延迟",
				description: "关键资源在需要时才开始加载，导致用户等待",
				solution: "preload 提前加载关键资源，确保在需要时立即可用",
			},
		],
		status: "completed",
	},
	prefetch: {
		title: "prefetch",
		icon: <Zap className="h-5 w-5" />,
		description: "预取可能需要的资源，在空闲时间加载",
		codeSnippet: `"use client";
import { prefetch } from "react";

function NavigationComponent() {
  const handleHover = () => {
    // 预取可能的页面资源
    prefetch("/about/data.json", {
      as: "fetch"
    });
  };

  return (
    <Link to="/about" onMouseEnter={handleHover}>
      关于我们
    </Link>
  );
}`,
		benefits: ["空闲时间利用", "预测性加载", "带宽优化", "体验提升"],
		useCases: ["导航页面", "图片懒加载", "数据预取", "路由预加载"],
		problemsSolved: [
			{
				problem: "带宽浪费",
				description: "过早加载不需要的资源，浪费网络带宽",
				solution: "prefetch 在空闲时间加载，优先级较低，不影响关键资源",
			},
		],
		status: "completed",
	},
	preinit: {
		title: "preinit",
		icon: <Target className="h-5 w-5" />,
		description: "预初始化资源连接，提前建立网络连接",
		codeSnippet: `"use client";
import { preinit } from "react";

function App() {
  // 预初始化关键连接
  preinit("https://api.example.com", {
    as: "fetch",
    crossOrigin: "anonymous"
  });

  preinit("https://fonts.googleapis.com", {
    as: "font"
  });

  return <div>App Content</div>;
}`,
		benefits: ["连接预热", "DNS预解析", "减少连接时间", "网络优化"],
		useCases: ["API连接", "CDN资源", "字体服务", "第三方服务"],
		problemsSolved: [
			{
				problem: "连接建立延迟",
				description: "每次请求都需要建立新的网络连接，增加延迟",
				solution: "preinit 提前建立连接，后续请求直接使用已建立的连接",
			},
		],
		status: "completed",
	},
};

const architectureFeatures = [
	{
		icon: <Download className="h-6 w-6 text-blue-600" />,
		title: "资源预加载",
		description: "关键资源优先加载",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		titleColor: "text-blue-900",
		descriptionColor: "text-blue-700",
	},
	{
		icon: <Zap className="h-6 w-6 text-green-600" />,
		title: "预测性加载",
		description: "空闲时间智能预取",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
		titleColor: "text-green-900",
		descriptionColor: "text-green-700",
	},
	{
		icon: <Target className="h-6 w-6 text-purple-600" />,
		title: "连接预热",
		description: "提前建立网络连接",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		titleColor: "text-purple-900",
		descriptionColor: "text-purple-700",
	},
	{
		icon: <Clock className="h-6 w-6 text-orange-600" />,
		title: "性能优化",
		description: "减少加载等待时间",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
		titleColor: "text-orange-900",
		descriptionColor: "text-orange-700",
	},
];

const threeWSections = [
	{
		description:
			"资源预加载 API 是 React 19 中用于提前加载关键资源的新机制，包括 preload、prefetch、preinit 等方法，形成完整的资源管理生态系统。",
		features: ["关键资源优先", "预测性加载", "连接预热", "性能优化"],
	},
	{
		description:
			"解决传统资源加载时机不可控、关键资源延迟加载、用户体验等待等问题。通过主动预加载策略，显著减少用户等待时间，提升应用响应速度。",
		features: ["减少加载延迟", "提升用户体验", "网络优化", "带宽智能利用"],
	},
	{
		description:
			"适用于关键CSS、重要数据、字体文件、图片资源等需要提前加载的场景。特别适合性能敏感的应用，如电商网站、新闻门户、社交平台等。",
		features: ["关键资源加载", "导航预加载", "数据预取", "连接预热"],
	},
];

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		preload: [
			{
				title: "🎯 关键CSS预加载",
				code: `function App() {
  return (
    <div>
      {preload("/critical.css", { as: "style" })}
      <h1>页面内容</h1>
    </div>
  );
}`,
				description: "确保关键样式在渲染前已加载",
			},
		],
		prefetch: [
			{
				title: "🔄 路由预加载",
				code: `function Navigation() {
  return (
    <nav>
      <Link
        to="/dashboard"
        onMouseEnter={() => prefetch("/dashboard/data")}
      >
        仪表板
      </Link>
    </nav>
  );
}`,
				description: "用户悬停时预加载页面数据",
			},
		],
		preinit: [
			{
				title: "🌐 API连接预热",
				code: `function App() {
  preinit("https://api.example.com", {
    as: "fetch",
    crossOrigin: "anonymous"
  });

  return <MainComponent />;
}`,
				description: "应用启动时预热关键API连接",
			},
		],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
		case "preload":
			return [<PreloadDemo key="preload" />];
		case "prefetch":
			return [<PrefetchDemo key="prefetch" />];
		case "preinit":
			return [<PreinitDemo key="preinit" />];
		default:
			return [];
	}
};

export default function ResourcePreloadPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(resourceExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<Download className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
					title="React 19 资源预加载"
					subtitle="现代 React 应用的资源管理生态系统"
				/>

				<FeatureContent className="space-y-4">
					<FeatureOverview title="资源预加载生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>

				<FeatureExampleSelector
					label="选择 API:"
					examples={resourceExamples}
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
