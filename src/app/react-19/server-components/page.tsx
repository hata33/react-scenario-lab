"use client";

import { Clock, Code, Server, Target, Zap } from "lucide-react";
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
import { BasicRSCDemo, DataFetchingDemo, StreamingDemo, SuspenseDemo } from "./(components)";

const serverComponentExamples: Example[] = [
	{
		id: "basic-rsc",
		title: "基础服务端组件",
		icon: <Code className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "streaming",
		title: "流式渲染",
		icon: <Zap className="h-5 w-5" />,
		difficulty: "中级",
	},
	{
		id: "data-fetching",
		title: "服务端数据获取",
		icon: <Server className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "suspense",
		title: "Suspense 边界",
		icon: <Target className="h-5 w-5" />,
		difficulty: "中级",
	},
];

const exampleDetails: Record<string, ExampleDetail> = {
	"basic-rsc": {
		title: "基础服务端组件",
		icon: <Code className="h-5 w-5" />,
		description: "在服务端渲染组件，零JavaScript发送到客户端",
		codeSnippet: `// 服务端组件
async function ProductPage({ id }) {
  const product = await getProduct(id); // 直接访问数据库

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>¥{product.price}</span>
    </div>
  );
}`,
		benefits: ["零客户端JavaScript", "完美SEO支持", "更快首屏加载", "减少包体积"],
		useCases: ["内容展示", "产品页面", "博客文章", "文档站点"],
		problemsSolved: [
			{
				problem: "客户端JavaScript过多",
				description: "传统React应用需要大量JavaScript在客户端运行，影响性能和SEO",
				solution: "服务端组件在服务端渲染，只发送HTML到客户端，实现零JavaScript",
			},
		],
		status: "completed",
	},
	streaming: {
		title: "流式渲染",
		icon: <Zap className="h-5 w-5" />,
		description: "逐步发送HTML到客户端，用户可以更快看到页面内容",
		codeSnippet: `// 流式渲染
import { Suspense } from 'react';

function Page() {
  return (
    <div>
      <Header /> {/* 立即渲染 */}
      <Suspense fallback={<Loading />}>
        <MainContent /> {/* 异步渲染 */}
      </Suspense>
      <Footer /> {/* 立即渲染 */}
    </div>
  );
}`,
		benefits: ["更快首屏显示", "渐进式内容加载", "改善感知性能", "更好的用户体验"],
		useCases: ["长页面", "数据密集型页面", "电商产品页", "仪表板"],
		problemsSolved: [
			{
				problem: "首屏加载时间长",
				description: "传统方式需要等待所有内容渲染完成才能显示页面",
				solution: "流式渲染先显示已准备好的内容，其余内容逐步加载",
			},
		],
		status: "completed",
	},
	"data-fetching": {
		title: "服务端数据获取",
		icon: <Server className="h-5 w-5" />,
		description: "在服务端组件中直接访问数据库和API，无需客户端请求",
		codeSnippet: `// 服务端数据获取
async function UserProfile({ userId }) {
  // 直接在服务端访问数据库
  const user = await db.users.findUnique({
    where: { id: userId }
  });

  const posts = await db.posts.findMany({
    where: { authorId: userId }
  });

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}`,
		benefits: ["直接数据库访问", "减少网络请求", "更好的数据安全", "简化架构"],
		useCases: ["用户资料", "产品详情", "文章内容", "数据报表"],
		problemsSolved: [
			{
				problem: "客户端数据获取复杂",
				description: "需要创建API端点，客户端多次请求，增加复杂性",
				solution: "服务端组件直接访问数据源，一次渲染获取所有数据",
			},
		],
		status: "completed",
	},
	suspense: {
		title: "Suspense 边界",
		icon: <Target className="h-5 w-5" />,
		description: "优雅处理异步组件加载，提供流畅的加载体验",
		codeSnippet: `// Suspense 边界
import { Suspense } from 'react';

function Dashboard() {
  return (
    <div>
      <h1>仪表板</h1>
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats /> {/* 异步加载 */}
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart /> {/* 异步加载 */}
      </Suspense>
    </div>
  );
}`,
		benefits: ["优雅加载状态", "防止布局偏移", "提升用户体验", "代码简洁"],
		useCases: ["数据加载", "图片懒加载", "异步组件", "路由切换"],
		problemsSolved: [
			{
				problem: "加载状态处理复杂",
				description: "传统方式需要手动管理加载状态，容易出现布局偏移",
				solution: "Suspense自动处理加载状态，提供流畅的过渡体验",
			},
		],
		status: "completed",
	},
};

const architectureFeatures = [
	{
		icon: <Server className="h-6 w-6 text-blue-600" />,
		title: "服务端渲染",
		description: "零客户端JavaScript",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		titleColor: "text-blue-900",
		descriptionColor: "text-blue-700",
	},
	{
		icon: <Zap className="h-6 w-6 text-green-600" />,
		title: "流式渲染",
		description: "渐进式内容加载",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
		titleColor: "text-green-900",
		descriptionColor: "text-green-700",
	},
	{
		icon: <Target className="h-6 w-6 text-purple-600" />,
		title: "数据获取",
		description: "直接访问数据库",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		titleColor: "text-purple-900",
		descriptionColor: "text-purple-700",
	},
	{
		icon: <Clock className="h-6 w-6 text-orange-600" />,
		title: "性能优化",
		description: "更快首屏加载",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
		titleColor: "text-orange-900",
		descriptionColor: "text-orange-700",
	},
];

const threeWSections = [
	{
		description:
			"服务端组件是React 19中的重要特性，允许组件在服务端渲染，直接访问数据源，实现零JavaScript的客户端体验。",
		features: ["服务端渲染", "流式传输", "数据获取", "性能优化"],
	},
	{
		description:
			"解决传统React应用中客户端JavaScript过多、首屏加载慢、SEO不友好等问题。通过在服务端处理渲染和数据获取，大幅提升应用性能。",
		features: ["减少包体积", "提升SEO", "改善性能", "简化架构"],
	},
	{
		description: "适用于内容展示网站、电商应用、博客系统、企业官网等场景。特别适合对性能和SEO要求较高的应用。",
		features: ["内容站点", "电商平台", "博客系统", "企业应用"],
	},
];

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		"basic-rsc": [
			{
				title: "📄 产品页面组件",
				code: `async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Price price={product.price} />
    </div>
  );
}`,
				description: "服务端组件直接获取产品数据",
			},
		],
		streaming: [
			{
				title: "🌊 流式页面渲染",
				code: `function StreamingPage() {
  return (
    <html>
      <body>
        <Header />
        <Suspense fallback={<Loading />}>
          <MainContent />
        </Suspense>
      </body>
    </html>
  );
}`,
				description: "使用Suspense实现流式渲染",
			},
		],
		"data-fetching": [
			{
				title: "🗄️ 数据库直接访问",
				code: `async function UserDashboard({ userId }) {
  const user = await db.user.findUnique(userId);
  const posts = await db.post.findMany({
    where: { authorId: userId }
  });

  return <Dashboard user={user} posts={posts} />;
}`,
				description: "服务端组件直接查询数据库",
			},
		],
		suspense: [
			{
				title: "⏳ 异步组件加载",
				code: `function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<PostsLoading />}>
        <Posts />
      </Suspense>
    </div>
  );
}`,
				description: "使用Suspense处理异步组件",
			},
		],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
		case "basic-rsc":
			return [<BasicRSCDemo key="basic-rsc" />];
		case "streaming":
			return [<StreamingDemo key="streaming" />];
		case "data-fetching":
			return [<DataFetchingDemo key="data-fetching" />];
		case "suspense":
			return [<SuspenseDemo key="suspense" />];
		default:
			return [];
	}
};

export default function ServerComponentsPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(serverComponentExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<Server className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
					title="React 19 服务端组件"
					subtitle="零JavaScript的服务端渲染新时代"
				/>
				<FeatureContent className="space-y-4">
					<FeatureOverview title="服务端组件生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>
				<FeatureExampleSelector
					label="选择组件:"
					examples={serverComponentExamples}
					selectedId={selectedExampleId}
					onSelect={setSelectedExampleId}
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
