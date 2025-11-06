"use client";

import { AlertCircle, ArrowLeft, CheckCircle, Clock, Code, Copy, Target, Zap } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";

// 示例接口定义
interface ServerComponentExample {
	id: string;
	title: string;
	description: string;
	category: "State Management" | "UI Enhancement" | "Form Handling" | "Performance";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

// 示例数据
const serverComponentExamples: ServerComponentExample[] = [
	{
		id: "basic-rsc",
		title: "基础服务端组件",
		description: "在服务端渲染组件，零JavaScript发送到客户端",
		category: "State Management",
		difficulty: "初级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
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
		benefits: ["零客户端JavaScript", "完美SEO支持", "更快首屏加载", "减少包体积", "适合低端设备"],
		useCases: ["内容展示", "产品页面", "博客文章", "文档站点", "企业应用"],
		problemsSolved: [
			{
				problem: "首屏加载速度慢",
				description: "需要下载大量JavaScript文件才能显示内容，用户体验差",
				solution: "服务端组件在服务端生成HTML，客户端直接接收渲染结果，无需下载额外JavaScript",
			},
			{
				problem: "SEO效果差",
				description: "搜索引擎难以获取动态内容，影响搜索排名",
				solution: "服务端组件生成完整的HTML结构，搜索引擎可以直接抓取和索引内容",
			},
			{
				problem: "客户端性能压力大",
				description: "低端设备JavaScript执行能力弱，导致页面卡顿",
				solution: "将计算密集型工作移到服务端，客户端只负责展示，大幅降低性能要求",
			},
		],
	},
	{
		id: "data-fetching",
		title: "数据获取优化",
		description: "在服务端直接访问数据库和API，提升性能",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `// 并行数据获取
async function UserDashboard({ userId }) {
  const [user, posts, comments, analytics] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
    getUserComments(userId),
    getUserAnalytics(userId)
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
      <UserComments comments={comments} />
      <Analytics data={analytics} />
    </div>
  );
}`,
		benefits: ["并行数据获取", "减少网络延迟", "服务端缓存", "安全性提升", "更好的数据一致性"],
		useCases: ["用户仪表板", "数据分析", "后台管理系统", "API聚合", "实时数据展示"],
		problemsSolved: [
			{
				problem: "多次API调用",
				description: "客户端需要多次请求获取不同数据，增加网络延迟和复杂度",
				solution: "服务端组件支持并行数据获取，一次请求获取所有需要的数据",
			},
			{
				problem: "数据安全风险",
				description: "敏感数据通过API暴露给客户端，存在安全隐患",
				solution: "在服务端直接处理敏感数据，只返回安全的展示数据",
			},
			{
				problem: "缓存管理复杂",
				description: "客户端缓存策略复杂，难以管理和维护",
				solution: "利用服务端缓存机制，提供更可靠和高效的数据缓存",
			},
		],
	},
	{
		id: "mixed-rendering",
		title: "混合渲染策略",
		description: "合理结合服务端和客户端组件的优势",
		category: "UI Enhancement",
		difficulty: "高级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `// 混合渲染架构
// 服务端组件 - 静态内容
function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>¥{product.price}</span>

      {/* 客户端组件 - 交互功能 */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// 客户端组件
'use client';
function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };

  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? '添加中...' : '加入购物车'}
    </button>
  );
}`,
		benefits: ["智能边界划分", "性能体验平衡", "灵活架构设计", "渐进增强", "维护性好"],
		useCases: ["电商平台", "社交应用", "内容管理", "企业应用", "复杂交互界面"],
		problemsSolved: [
			{
				problem: "性能与体验难以平衡",
				description: "过于偏重服务端渲染导致交互差，过于偏重客户端导致性能差",
				solution: "合理划分组件边界，静态内容服务端渲染，交互功能客户端处理",
			},
			{
				problem: "组件职责混乱",
				description: "组件边界不清晰，渲染责任划分不明确，维护困难",
				solution: "建立清晰的组件边界规则，明确服务端和客户端的职责分工",
			},
			{
				problem: "状态管理复杂",
				description: "复杂状态在客户端管理造成性能问题，难以维护",
				solution: "分层状态管理，数据获取在服务端，UI状态在客户端",
			},
		],
	},
	{
		id: "performance-optimization",
		title: "性能优化策略",
		description: "利用服务端组件实现极致的性能优化",
		category: "Performance",
		difficulty: "高级",
		status: "completed",
		icon: <Clock className="h-5 w-5" />,
		codeSnippet: `// 流式渲染优化
import { Suspense } from 'react';

async function ProductPage({ id }) {
  return (
    <div>
      {/* 立即渲染的关键内容 */}
      <ProductHeader id={id} />

      {/* 流式加载的次要内容 */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails id={id} />
      </Suspense>

      {/* 延迟加载的推荐内容 */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <ProductRecommendations id={id} />
      </Suspense>
    </div>
  );
}`,
		benefits: ["流式渲染", "智能代码分割", "服务端缓存", "选择性渲染", "极致性能"],
		useCases: ["高流量站点", "电商平台", "新闻媒体", "企业门户", "性能敏感应用"],
		problemsSolved: [
			{
				problem: "首屏加载时间过长",
				description: "用户需要等待所有内容加载完成才能看到页面，体验极差",
				solution: "流式渲染让关键内容立即显示，次要内容逐步加载，大幅改善感知性能",
			},
			{
				problem: "包体积过大",
				description: "JavaScript包体积过大，下载时间长，影响加载速度",
				solution: "智能代码分割，按需加载，大幅减少初始包体积",
			},
			{
				problem: "重复渲染浪费",
				description: "不必要的重复渲染消耗资源，影响性能",
				solution: "服务端缓存和选择性重新渲染，避免不必要的计算和渲染",
			},
		],
	},
];

export default function ServerComponentsPage() {
	const [selectedExample, setSelectedExample] = useState(serverComponentExamples[0]);
	const [copiedCode, setCopiedCode] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedCode(true);
			setTimeout(() => setCopiedCode(false), 2000);
		} catch (error) {
			console.error("复制失败:", error);
		}
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "State Management":
				return "text-blue-600 bg-blue-100";
			case "UI Enhancement":
				return "text-green-600 bg-green-100";
			case "Form Handling":
				return "text-purple-600 bg-purple-100";
			case "Performance":
				return "text-orange-600 bg-orange-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	// 恢复选中状态
	useEffect(() => {
		const savedExample = sessionStorage.getItem("selectedServerComponentExample");
		if (savedExample) {
			const example = serverComponentExamples.find((ex) => ex.id === savedExample);
			if (example) {
				setSelectedExample(example);
			}
		}
	}, []);

	// 保存选中状态
	useEffect(() => {
		if (selectedExample) {
			sessionStorage.setItem("selectedServerComponentExample", selectedExample.id);
		}
	}, [selectedExample]);

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"basic-rsc": [
				{
					title: "🚀 基础服务端组件",
					code: `// 服务端组件 - 零客户端JavaScript
async function ProductPage({ id }) {
  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>¥{product.price}</span>
    </div>
  );
}`,
					description: "服务端组件在服务端渲染，零JavaScript发送到客户端",
				},
				{
					title: "📄 完美SEO支持",
					code: `// 生成元数据
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
  };
}`,
					description: "服务端组件支持完美的SEO，搜索引擎可以直接获取内容",
				},
			],
			"data-fetching": [
				{
					title: "📊 并行数据获取",
					code: `async function UserDashboard({ userId }) {
  const [user, posts, comments] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
    getUserComments(userId)
  ]);

  return <Dashboard user={user} posts={posts} comments={comments} />;
}`,
					description: "服务端组件支持并行数据获取，减少网络延迟",
				},
			],
			"mixed-rendering": [
				{
					title: "🎯 混合渲染架构",
					code: `// 服务端组件 - 静态内容
function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// 客户端组件 - 交互功能
'use client';
function AddToCartButton({ productId }) {
  return <button onClick={() => addToCart(productId)}>
    加入购物车
  </button>;
}`,
					description: "合理划分服务端和客户端组件边界",
				},
			],
			"performance-optimization": [
				{
					title: "⚡ 流式渲染",
					code: `import { Suspense } from 'react';

async function ProductPage({ id }) {
  return (
    <div>
      <ProductHeader id={id} />
      <Suspense fallback={<DetailsSkeleton />}>
        <ProductDetails id={id} />
      </Suspense>
    </div>
  );
}`,
					description: "流式渲染让关键内容立即显示",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-3">
								<Code className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">服务端组件 (RSC)</h1>
									<p className="text-gray-600">
										React 19 服务端组件生态系统，在服务端渲染组件，零JavaScript发送到客户端
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* RSC 架构概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">RSC 生态系统</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Code className="mx-auto mb-2 h-6 w-6 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">基础组件</h3>
								<p className="text-blue-700 text-sm">零JavaScript渲染</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<Zap className="mx-auto mb-2 h-6 w-6 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">数据获取</h3>
								<p className="text-green-700 text-sm">服务端直接访问</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Target className="mx-auto mb-2 h-6 w-6 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">混合渲染</h3>
								<p className="text-purple-700 text-sm">性能与体验平衡</p>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<Clock className="mx-auto mb-2 h-6 w-6 text-orange-600" />
								<h3 className="mb-1 font-semibold text-orange-900">性能优化</h3>
								<p className="text-orange-700 text-sm">极致加载速度</p>
							</div>
						</div>
					</div>
				</div>

				{/* 3W 法则解析 */}
				<div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
						<h2 className="mb-6 font-bold text-2xl text-blue-800">🎯 3W 法则解析</h2>
						<div className="grid gap-6 md:grid-cols-3">
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">📋 What (是什么)</h3>
								<p className="font-medium text-gray-800">
									服务端组件允许在服务端渲染组件，只将必要的 JavaScript 发送到客户端。通过特殊的组件架构，实现零客户端
									JavaScript 的组件渲染，大幅提升应用性能。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">🎯 Why (为什么)</h3>
								<p className="font-medium text-gray-800">
									解决首屏加载慢、客户端包体积大、SEO 效果差的问题。通过在服务端完成大部分渲染工作，减少客户端
									JavaScript 负担，实现更快的首屏渲染和更好的用户体验。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">⏰ When (何时用)</h3>
								<p className="font-medium text-gray-800">
									内容展示网站、SEO
									要求高、性能敏感的应用。特别适合博客、电商产品页、文档站点等以内容展示为主的场景，以及需要处理敏感数据的企业级应用。
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Hook 选择器 - 吸顶区域 */}
				<div className="sticky top-0 z-10 border-gray-200 border-b bg-white">
					<div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
							<h2 className="font-semibold text-gray-900 text-sm">选择功能:</h2>
							<div className="flex flex-wrap justify-center gap-2">
								{serverComponentExamples.map((example) => (
									<button
										key={example.id}
										onClick={() => setSelectedExample(example)}
										className={`rounded-lg px-3 py-1.5 font-medium text-sm transition-all ${selectedExample?.id === example.id
												? "bg-blue-500 text-white shadow-sm"
												: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											}`}
									>
										<span className="mr-1">{example.icon}</span>
										<span>{example.title}</span>
										<span
											className={`ml-1.5 rounded px-1.5 py-0.5 text-xs ${example.difficulty === "初级"
													? "bg-green-100 text-green-700"
													: example.difficulty === "中级"
														? "bg-yellow-100 text-yellow-700"
														: "bg-red-100 text-red-700"
												}`}
										>
											{example.difficulty}
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{selectedExample && (
					<>
						{/* 详细展示区域 - 下方内容 */}
						<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
							<div className="space-y-8">
								{/* Hook 详细信息 */}
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-6">
										<div className="flex items-center space-x-4">
											<div className="rounded-lg bg-blue-100 p-3 text-blue-600">{selectedExample.icon}</div>
											<div>
												<h3 className="font-semibold text-2xl text-gray-900">{selectedExample.title}</h3>
												<p className="text-gray-600">{selectedExample.description}</p>
											</div>
										</div>
									</div>

									<div className="p-6">
										<div className="mb-6">
											<h4 className="mb-3 font-semibold text-gray-900">🎮 交互式演示</h4>
											<div className="space-y-6">
												{selectedExample.id === "basic-rsc" && <BasicRSCDemo />}
												{selectedExample.id === "data-fetching" && <DataFetchingDemo />}
												{selectedExample.id === "mixed-rendering" && <MixedRenderingDemo />}
												{selectedExample.id === "performance-optimization" && <PerformanceOptimizationDemo />}
											</div>
										</div>

										<div className="mb-6">
											<div className="mb-3 flex items-center justify-between">
												<h4 className="font-semibold text-gray-900">📝 代码示例</h4>
												<button
													onClick={() => copyToClipboard(selectedExample.codeSnippet)}
													className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-900"
												>
													<Copy className="h-4 w-4" />
													<span>{copiedCode ? "已复制" : "复制"}</span>
												</button>
											</div>
											<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
												<pre className="text-sm">
													<code>{selectedExample.codeSnippet}</code>
												</pre>
											</div>
										</div>

										{/* 主要优势和使用场景 */}
										<div className="grid gap-6 md:grid-cols-2">
											<div>
												<h5 className="mb-3 font-medium text-gray-900">✨ 主要优势</h5>
												<div className="flex flex-wrap gap-2">
													{selectedExample.benefits.map((benefit, index) => (
														<span
															key={index}
															className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
														>
															{benefit}
														</span>
													))}
												</div>
											</div>

											<div>
												<h5 className="mb-3 font-medium text-gray-900">🎯 使用场景</h5>
												<div className="flex flex-wrap gap-2">
													{selectedExample.useCases.map((useCase, index) => (
														<span
															key={index}
															className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
														>
															{useCase}
														</span>
													))}
												</div>
											</div>
										</div>

										{/* 解决的具体问题 */}
										<div className="border-gray-200 border-t pt-6">
											<h5 className="mb-4 font-medium text-gray-900">🔧 解决的具体问题</h5>
											<div className="space-y-4">
												{selectedExample.problemsSolved.map((item, index) => (
													<div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
														<div className="mb-2 flex items-start justify-between">
															<div className="flex items-center space-x-2">
																<span className="inline-flex items-center rounded bg-red-100 px-2 py-1 font-medium text-red-700 text-xs">
																	问题
																</span>
																<strong className="text-red-800 text-sm">{item.problem}</strong>
															</div>
														</div>
														<p className="mb-3 text-gray-600 text-sm">{item.description}</p>
														<div className="rounded border border-green-200 bg-green-50 p-3">
															<div className="mb-1 flex items-center space-x-2">
																<span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">
																	解决方案
																</span>
																<strong className="text-green-800">React 19 RSC</strong>
															</div>
															<p className="text-gray-700 text-sm">{item.solution}</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该功能已在 React 19 中正式发布</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* 官方代码示例 */}
						<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
							<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
								<h2 className="mb-6 font-bold text-2xl text-gray-900">📚 {selectedExample?.title} 官方示例</h2>
								<p className="mb-6 text-gray-600">
									以下示例来自 React 官方文档，展示了 {selectedExample?.title} 的最佳实践
								</p>

								{selectedExample && getOfficialExamples(selectedExample.id).length > 0 ? (
									<div className="grid gap-6 lg:grid-cols-2">
										{getOfficialExamples(selectedExample.id).map((example, index) => (
											<div key={index} className="rounded-lg border border-gray-200 p-4">
												<h3 className="mb-3 font-semibold text-gray-800">{example.title}</h3>
												<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
													{example.code}
												</pre>
												<p className="text-gray-600 text-xs">{example.description}</p>
											</div>
										))}
									</div>
								) : (
									<div className="py-12 text-center">
										<Code className="mx-auto mb-4 h-16 w-16 text-gray-400" />
										<h3 className="mb-2 font-semibold text-gray-900 text-lg">暂无官方示例</h3>
										<p className="text-gray-600">{selectedExample?.title} 的官方代码示例正在整理中，敬请期待</p>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}

// 基础RSC演示组件
function BasicRSCDemo() {
	const [renderMode, setRenderMode] = useState("server");
	const [loading, setLoading] = useState(false);

	const handleRenderModeChange = useCallback((mode: string) => {
		setLoading(true);
		setRenderMode(mode);

		// 模拟渲染过程
		setTimeout(
			() => {
				setLoading(false);
			},
			mode === "server" ? 300 : 1500,
		);
	}, []);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🖥️ 基础服务端组件演示</h5>

			<div className="mb-4">
				<div className="flex gap-2">
					<button
						onClick={() => handleRenderModeChange("server")}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${renderMode === "server" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						服务端渲染 (RSC)
					</button>
					<button
						onClick={() => handleRenderModeChange("client")}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${renderMode === "client" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						客户端渲染 (CSR)
					</button>
				</div>
			</div>

			{loading ? (
				<div className="py-8 text-center">
					<div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-blue-500 border-b-2"></div>
					<p className="text-gray-600 text-sm">{renderMode === "server" ? "服务端渲染中..." : "客户端渲染中..."}</p>
				</div>
			) : (
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-md border border-gray-200 bg-white p-3">
							<h4 className="mb-2 font-semibold text-gray-800 text-sm">
								{renderMode === "server" ? "服务端组件" : "客户端组件"}
							</h4>
							{renderMode === "server" ? <ServerProductCard /> : <ClientProductCard />}
							<div className="mt-3">
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${renderMode === "server" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
										}`}
								>
									{renderMode === "server" ? "✅ 零JavaScript" : "⚠️ 需要JavaScript"}
								</span>
							</div>
						</div>

						<div className="rounded-md border border-gray-200 bg-white p-3">
							<h4 className="mb-2 font-semibold text-gray-800 text-sm">性能指标</h4>
							<PerformanceMetrics renderMode={renderMode} />
						</div>
					</div>

					<div className="rounded-md border border-blue-200 bg-blue-50 p-3">
						<h4 className="mb-2 font-semibold text-blue-800 text-sm">
							{renderMode === "server" ? "服务端组件优势" : "客户端组件特点"}
						</h4>
						<ul className="space-y-1 text-blue-700 text-xs">
							{renderMode === "server" ? (
								<>
									<li>• 零客户端JavaScript，加载速度快</li>
									<li>• 更好的SEO，搜索引擎可直接获取内容</li>
									<li>• 减少客户端计算压力，适合低端设备</li>
									<li>• 更小的包体积，只发送必要的交互代码</li>
								</>
							) : (
								<>
									<li>• 支持丰富的用户交互和状态管理</li>
									<li>• 可以访问浏览器API和用户设备</li>
									<li>• 实时数据更新和动态内容</li>
									<li>• 更好的用户交互体验</li>
								</>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

// 服务端产品卡片组件
function ServerProductCard() {
	const product = {
		id: 1,
		name: "React 19 完全指南",
		price: "¥99",
		rating: 4.8,
		description: "深入学习 React 19 的新特性和最佳实践",
		features: ["服务端组件", "Actions", "use() Hook", "React Compiler"],
		reviews: 128,
		instructor: "前端专家",
	};

	return (
		<div className="rounded-md border border-gray-100 bg-gray-50 p-3">
			<div className="mb-2 flex items-center gap-2">
				<div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white text-xs">
					R19
				</div>
				<div>
					<h6 className="font-semibold text-gray-800 text-sm">{product.name}</h6>
					<p className="text-gray-600 text-xs">{product.instructor}</p>
				</div>
			</div>

			<p className="mb-2 text-gray-600 text-xs">{product.description}</p>

			<div className="mb-3 flex items-center justify-between">
				<span className="font-bold text-green-600 text-lg">{product.price}</span>
				<div className="flex items-center gap-1">
					<span className="text-xs text-yellow-500">⭐</span>
					<span className="font-medium text-xs">{product.rating}</span>
					<span className="text-gray-500 text-xs">({product.reviews})</span>
				</div>
			</div>

			<div className="mb-3">
				<p className="mb-1 font-medium text-xs">包含内容：</p>
				<div className="flex flex-wrap gap-1">
					{product.features.map((feature, index) => (
						<span key={index} className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
							{feature}
						</span>
					))}
				</div>
			</div>

			<button className="w-full rounded-md bg-blue-500 py-2 text-sm text-white transition-colors hover:bg-blue-600">
				立即购买
			</button>
		</div>
	);
}

// 客户端产品卡片组件
function ClientProductCard() {
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState<any>(null);

	useEffect(() => {
		// 模拟客户端数据获取
		const timer = setTimeout(() => {
			setProduct({
				id: 1,
				name: "React 19 完全指南",
				price: "¥99",
				rating: 4.8,
				description: "深入学习 React 19 的新特性和最佳实践",
				features: ["服务端组件", "Actions", "use() Hook", "React Compiler"],
				reviews: 128,
				instructor: "前端专家",
			});
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return (
			<div className="rounded-md border border-gray-100 bg-gray-50 p-3">
				<div className="animate-pulse">
					<div className="mb-2 h-3 rounded bg-gray-300"></div>
					<div className="mb-2 h-2 rounded bg-gray-300"></div>
					<div className="h-2 w-3/4 rounded bg-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-md border border-gray-100 bg-gray-50 p-3">
			<div className="mb-2 flex items-center gap-2">
				<div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white text-xs">
					C19
				</div>
				<div>
					<h6 className="font-semibold text-gray-800 text-sm">{product.name}</h6>
					<p className="text-gray-600 text-xs">{product.instructor}</p>
				</div>
			</div>

			<p className="mb-2 text-gray-600 text-xs">{product.description}</p>

			<div className="mb-3 flex items-center justify-between">
				<span className="font-bold text-green-600 text-lg">{product.price}</span>
				<div className="flex items-center gap-1">
					<span className="text-xs text-yellow-500">⭐</span>
					<span className="font-medium text-xs">{product.rating}</span>
					<span className="text-gray-500 text-xs">({product.reviews})</span>
				</div>
			</div>

			<div className="mb-3">
				<p className="mb-1 font-medium text-xs">包含内容：</p>
				<div className="flex flex-wrap gap-1">
					{product.features.map((feature: string, index: number) => (
						<span key={index} className="rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs">
							{feature}
						</span>
					))}
				</div>
			</div>

			<button className="w-full rounded-md bg-purple-500 py-2 text-sm text-white transition-colors hover:bg-purple-600">
				立即购买
			</button>
		</div>
	);
}

// 性能指标组件
function PerformanceMetrics({ renderMode }: { renderMode: string }) {
	const metrics =
		renderMode === "server"
			? {
				bundleSize: "0KB",
				timeToInteractive: "0.8s",
				firstContentfulPaint: "0.3s",
				javascriptSize: "0KB",
			}
			: {
				bundleSize: "245KB",
				timeToInteractive: "2.1s",
				firstContentfulPaint: "1.2s",
				javascriptSize: "198KB",
			};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">包大小:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.bundleSize}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">可交互时间:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.timeToInteractive}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">首次内容绘制:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.firstContentfulPaint}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">JavaScript大小:</span>
				<span className={`font-bold text-sm ${renderMode === "server" ? "text-green-600" : "text-red-600"}`}>
					{metrics.javascriptSize}
				</span>
			</div>
		</div>
	);
}

// 数据获取演示组件
function DataFetchingDemo() {
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [fetchMode, setFetchMode] = useState("server");

	const loadUserData = useCallback(
		async (userId: number) => {
			setLoading(true);

			// 模拟数据获取延迟
			await new Promise((resolve) => setTimeout(resolve, fetchMode === "server" ? 500 : 1200));

			const userData = {
				id: userId,
				name: `用户 ${userId}`,
				email: `user${userId}@example.com`,
				role: userId % 2 === 0 ? "Admin" : "User",
				joinDate: "2024-01-15",
				posts: userId * 15,
				followers: userId * 127,
				avatar: `https://picsum.photos/seed/user${userId}/100/100.jpg`,
			};

			setSelectedUser(userData);
			setLoading(false);
		},
		[fetchMode],
	);

	const handleFetchModeChange = useCallback((mode: string) => {
		setFetchMode(mode);
	}, []);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📊 数据获取演示</h5>

			<div className="mb-4">
				<div className="mb-3 flex gap-2">
					<button
						onClick={() => handleFetchModeChange("server")}
						className={`rounded-md px-3 py-2 font-medium text-sm transition-colors ${fetchMode === "server" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						服务端获取
					</button>
					<button
						onClick={() => handleFetchModeChange("client")}
						className={`rounded-md px-3 py-2 font-medium text-sm transition-colors ${fetchMode === "client" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						客户端获取
					</button>
				</div>

				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((id) => (
						<button
							key={id}
							onClick={() => loadUserData(id)}
							disabled={loading}
							className="rounded-md bg-emerald-500 px-3 py-2 text-sm text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
						>
							用户 {id}
						</button>
					))}
				</div>
			</div>

			{loading && (
				<div className="py-6 text-center">
					<div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-blue-500 border-b-2"></div>
					<p className="text-gray-600 text-sm">
						{fetchMode === "server" ? "服务端获取数据中..." : "客户端请求API中..."}
					</p>
				</div>
			)}

			{selectedUser && !loading && (
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-md border border-gray-200 bg-white p-3">
							<h4 className="mb-2 font-semibold text-gray-800 text-sm">服务端数据获取</h4>
							<ServerUserProfile user={selectedUser} />
							<div className="mt-3">
								<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
									✅ 直接访问数据库
								</span>
							</div>
						</div>

						<div className="rounded-md border border-gray-200 bg-white p-3">
							<h4 className="mb-2 font-semibold text-gray-800 text-sm">客户端数据获取</h4>
							<ClientUserProfile userId={selectedUser.id} />
							<div className="mt-3">
								<span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 font-medium text-xs text-yellow-800">
									⚠️ 需要API调用
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-md border border-blue-200 bg-blue-50 p-3">
						<h4 className="mb-2 font-semibold text-blue-800 text-sm">数据获取对比</h4>
						<ul className="space-y-1 text-blue-700 text-xs">
							<li>
								• <strong>服务端</strong>：直接访问数据库，减少网络延迟，更好的安全性
							</li>
							<li>
								• <strong>客户端</strong>：需要API层，增加网络请求，但有更好的实时性
							</li>
							<li>
								• <strong>建议</strong>：静态数据使用服务端获取，动态数据使用客户端获取
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

// 服务端用户资料组件
function ServerUserProfile({ user }: { user: any }) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4">
			<div className="mb-4 flex items-center gap-3">
				<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
				<div>
					<h5 className="font-semibold text-gray-900">{user.name}</h5>
					<p className="text-gray-600 text-sm">{user.email}</p>
					<span className="inline-block rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">{user.role}</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.posts}</div>
					<div className="text-gray-500 text-xs">文章</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.followers}</div>
					<div className="text-gray-500 text-xs">关注者</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.joinDate}</div>
					<div className="text-gray-500 text-xs">加入时间</div>
				</div>
			</div>
		</div>
	);
}

// 客户端用户资料组件
function ClientUserProfile({ userId }: { userId: number }) {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 模拟客户端API请求
		const timer = setTimeout(() => {
			setUser({
				id: userId,
				name: `用户 ${userId}`,
				email: `user${userId}@example.com`,
				role: userId % 2 === 0 ? "Admin" : "User",
				joinDate: "2024-01-15",
				posts: userId * 15,
				followers: userId * 127,
				avatar: `https://picsum.photos/seed/user${userId}/100/100.jpg`,
			});
			setLoading(false);
		}, 800);

		return () => clearTimeout(timer);
	}, [userId]);

	if (loading) {
		return (
			<div className="rounded-lg border border-gray-200 bg-white p-4">
				<div className="animate-pulse">
					<div className="mb-3 h-4 rounded bg-gray-300"></div>
					<div className="mb-2 h-3 rounded bg-gray-300"></div>
					<div className="h-3 w-3/4 rounded bg-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4">
			<div className="mb-4 flex items-center gap-3">
				<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
				<div>
					<h5 className="font-semibold text-gray-900">{user.name}</h5>
					<p className="text-gray-600 text-sm">{user.email}</p>
					<span className="inline-block rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs">{user.role}</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.posts}</div>
					<div className="text-gray-500 text-xs">文章</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.followers}</div>
					<div className="text-gray-500 text-xs">关注者</div>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-lg">{user.joinDate}</div>
					<div className="text-gray-500 text-xs">加入时间</div>
				</div>
			</div>
		</div>
	);
}

// 混合渲染演示组件
function MixedRenderingDemo() {
	const [renderStrategy, setRenderStrategy] = useState("balanced");

	const handleStrategyChange = useCallback((strategy: string) => {
		setRenderStrategy(strategy);
	}, []);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔄 混合渲染演示</h5>

			<div className="mb-4">
				<div className="flex gap-2">
					<button
						onClick={() => handleStrategyChange("server")}
						className={`rounded-md px-3 py-2 font-medium text-sm transition-colors ${renderStrategy === "server" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						服务端优先
					</button>
					<button
						onClick={() => handleStrategyChange("balanced")}
						className={`rounded-md px-3 py-2 font-medium text-sm transition-colors ${renderStrategy === "balanced"
								? "bg-emerald-500 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						混合平衡
					</button>
					<button
						onClick={() => handleStrategyChange("client")}
						className={`rounded-md px-3 py-2 font-medium text-sm transition-colors ${renderStrategy === "client" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						客户端优先
					</button>
				</div>
			</div>

			<div className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-md border border-gray-200 bg-white p-3">
						<h4 className="mb-2 font-semibold text-gray-800 text-sm">渲染架构分析</h4>
						<RenderArchitectureAnalysis strategy={renderStrategy} />
					</div>

					<div className="rounded-md border border-gray-200 bg-white p-3">
						<h4 className="mb-2 font-semibold text-gray-800 text-sm">交互演示</h4>
						<ClientInteractiveDemo strategy={renderStrategy} />
					</div>
				</div>

				<div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
					<h4 className="mb-2 font-semibold text-emerald-800 text-sm">最佳实践建议</h4>
					<ul className="space-y-1 text-emerald-700 text-xs">
						{renderStrategy === "server" && (
							<>
								<li>• 静态内容优先使用服务端组件</li>
								<li>• 只在必要时添加客户端交互</li>
								<li>• 适合内容展示为主的网站</li>
								<li>• 关注SEO和首屏性能</li>
							</>
						)}
						{renderStrategy === "balanced" && (
							<>
								<li>• 合理划分服务端和客户端边界</li>
								<li>• 静态内容服务端渲染，交互功能客户端处理</li>
								<li>• 适合大多数Web应用</li>
								<li>• 平衡性能和用户体验</li>
							</>
						)}
						{renderStrategy === "client" && (
							<>
								<li>• 复杂交互应用优先使用客户端组件</li>
								<li>• 将非关键内容降级到客户端</li>
								<li>• 适合SPA和复杂交互应用</li>
								<li>• 关注用户体验和功能丰富性</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

// 渲染架构分析组件
function RenderArchitectureAnalysis({ strategy }: { strategy: string }) {
	const strategies = {
		server: {
			serverRatio: 85,
			clientRatio: 15,
			description: "绝大部分内容在服务端渲染，只有最小化的交互功能在客户端",
		},
		balanced: {
			serverRatio: 60,
			clientRatio: 40,
			description: "静态内容服务端渲染，交互功能客户端处理，实现最佳平衡",
		},
		client: {
			serverRatio: 25,
			clientRatio: 75,
			description: "主要逻辑在客户端，服务端只负责初始数据加载",
		},
	};

	const config = strategies[strategy as keyof typeof strategies];

	return (
		<div className="space-y-4">
			<div>
				<div className="mb-2 flex justify-between text-sm">
					<span>服务端渲染</span>
					<span>{config.serverRatio}%</span>
				</div>
				<div className="h-2 w-full rounded-full bg-gray-200">
					<div className="h-2 rounded-full bg-blue-600" style={{ width: `${config.serverRatio}%` }}></div>
				</div>
			</div>

			<div>
				<div className="mb-2 flex justify-between text-sm">
					<span>客户端渲染</span>
					<span>{config.clientRatio}%</span>
				</div>
				<div className="h-2 w-full rounded-full bg-gray-200">
					<div className="h-2 rounded-full bg-purple-600" style={{ width: `${config.clientRatio}%` }}></div>
				</div>
			</div>

			<p className="mt-4 text-gray-600 text-sm">{config.description}</p>
		</div>
	);
}

// 客户端交互演示组件
function ClientInteractiveDemo({ strategy }: { strategy: string }) {
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState<any[]>([]);
	const [newComment, setNewComment] = useState("");
	const [showInteraction, setShowInteraction] = useState(strategy !== "server");

	useEffect(() => {
		setShowInteraction(strategy !== "server");
	}, [strategy]);

	const handleLike = useCallback(() => {
		setLikes((prev) => prev + 1);
	}, []);

	const handleAddComment = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (newComment.trim()) {
				setComments((prev) => [
					...prev,
					{
						id: Date.now(),
						text: newComment,
						time: new Date().toLocaleTimeString(),
					},
				]);
				setNewComment("");
			}
		},
		[newComment],
	);

	if (!showInteraction) {
		return (
			<div className="py-8 text-center">
				<span className="text-gray-500">服务端优先策略下，最小化客户端交互</span>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-4 flex gap-2">
				<button onClick={handleLike} className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700">
					❤️ {likes}
				</button>
				<span className="self-center text-gray-500 text-sm">点击点赞</span>
			</div>

			<form onSubmit={handleAddComment} className="mb-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="添加评论..."
						className="flex-1 rounded-lg border px-2 py-1 text-sm"
					/>
					<button type="submit" className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
						发送
					</button>
				</div>
			</form>

			{comments.length > 0 && (
				<div className="space-y-2">
					{comments.map((comment) => (
						<div key={comment.id} className="rounded-lg bg-gray-100 p-2 text-sm">
							<div className="font-medium">{comment.text}</div>
							<div className="text-gray-500 text-xs">{comment.time}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// 性能优化演示组件
function PerformanceOptimizationDemo() {
	const [optimizationLevel, setOptimizationLevel] = useState("basic");
	const [metrics, setMetrics] = useState({
		lcp: "2.8s",
		fid: "180ms",
		cls: "0.15",
		ttfb: "0.5s",
		fcp: "1.6s",
		si: "3.2s",
	});

	const handleOptimizationChange = useCallback((level: string) => {
		setOptimizationLevel(level);

		// 根据优化级别更新性能指标
		const newMetrics = {
			basic: { lcp: "2.8s", fid: "180ms", cls: "0.15", ttfb: "0.5s", fcp: "1.6s", si: "3.2s" },
			optimized: { lcp: "1.8s", fid: "120ms", cls: "0.08", ttfb: "0.3s", fcp: "1.0s", si: "2.1s" },
			advanced: { lcp: "1.2s", fid: "50ms", cls: "0.05", ttfb: "0.3s", fcp: "0.4s", si: "1.3s" },
		};

		setMetrics(newMetrics[level as keyof typeof newMetrics]);
	}, []);

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg">
			<h3 className="mb-6 font-bold text-gray-900 text-xl">⚡ 性能优化演示</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					<button
						onClick={() => handleOptimizationChange("basic")}
						className={`rounded-lg px-4 py-2 font-medium transition-colors ${optimizationLevel === "basic" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						基础优化
					</button>
					<button
						onClick={() => handleOptimizationChange("optimized")}
						className={`rounded-lg px-4 py-2 font-medium transition-colors ${optimizationLevel === "optimized"
								? "bg-blue-600 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						服务端优化
					</button>
					<button
						onClick={() => handleOptimizationChange("advanced")}
						className={`rounded-lg px-4 py-2 font-medium transition-colors ${optimizationLevel === "advanced"
								? "bg-emerald-600 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
					>
						高级优化
					</button>
				</div>
			</div>

			<div className="space-y-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-lg bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold text-gray-900">性能指标</h4>
						<PerformanceMetricsDisplay metrics={metrics} optimizationLevel={optimizationLevel} />
					</div>

					<div className="rounded-lg bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold text-gray-900">优化策略</h4>
						<OptimizationStrategies level={optimizationLevel} />
					</div>
				</div>

				<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
					<h4 className="mb-2 font-semibold text-emerald-900">性能提升效果</h4>
					<PerformanceImprovement currentLevel={optimizationLevel} />
				</div>
			</div>
		</div>
	);
}

// 性能指标显示组件
function PerformanceMetricsDisplay({ metrics, optimizationLevel }: { metrics: any; optimizationLevel: string }) {
	const metricNames = {
		lcp: "Largest Contentful Paint",
		fid: "First Input Delay",
		cls: "Cumulative Layout Shift",
		ttfb: "Time to First Byte",
		fcp: "First Contentful Paint",
		si: "Speed Index",
	};

	const getPerformanceColor = (metric: string, value: string) => {
		const numValue = parseFloat(value);

		if (metric === "fid") {
			return numValue < 100 ? "text-green-600" : numValue < 300 ? "text-yellow-600" : "text-red-600";
		} else if (metric === "cls") {
			return numValue < 0.1 ? "text-green-600" : numValue < 0.25 ? "text-yellow-600" : "text-red-600";
		} else {
			// 时间相关指标（以秒为单位）
			return numValue < 1 ? "text-green-600" : numValue < 2.5 ? "text-yellow-600" : "text-red-600";
		}
	};

	return (
		<div className="space-y-3">
			{Object.entries(metrics).map(([key, value]) => (
				<div key={key} className="flex items-center justify-between">
					<span className="font-medium text-gray-600 text-sm">{metricNames[key as keyof typeof metricNames]}</span>
					<span className={`font-bold text-sm ${getPerformanceColor(key, value as string)}`}>{value as string}</span>
				</div>
			))}

			<div className="mt-4 border-gray-200 border-t pt-3">
				<div className="flex items-center justify-between">
					<span className="font-medium text-sm">优化级别</span>
					<span
						className={`font-bold text-sm ${optimizationLevel === "basic"
								? "text-gray-600"
								: optimizationLevel === "optimized"
									? "text-blue-600"
									: "text-emerald-600"
							}`}
					>
						{optimizationLevel === "basic" ? "基础" : optimizationLevel === "optimized" ? "服务端优化" : "高级优化"}
					</span>
				</div>
			</div>
		</div>
	);
}

// 优化策略组件
function OptimizationStrategies({ level }: { level: string }) {
	const strategies = {
		basic: ["• 基础代码分割", "• 图片优化", "• CSS压缩", "• 基础缓存"],
		optimized: ["• 服务端组件渲染", "• 流式SSR", "• 数据预获取", "• 智能缓存策略", "• 服务端数据聚合"],
		advanced: [
			"• 边缘计算渲染",
			"• 预测性预加载",
			"• 增量静态再生",
			"• 自适应图片优化",
			"• 服务端组件缓存",
			"• 客户端状态优化",
		],
	};

	return (
		<div className="space-y-2">
			{strategies[level as keyof typeof strategies].map((strategy, index) => (
				<div key={index} className="flex items-start space-x-2">
					<span className="mt-1 text-emerald-500">✓</span>
					<span className="text-gray-700 text-sm">{strategy}</span>
				</div>
			))}
		</div>
	);
}

// 性能提升效果组件
function PerformanceImprovement({ currentLevel }: { currentLevel: string }) {
	const improvements = {
		optimized: {
			lcp: "36%",
			fid: "33%",
			cls: "47%",
			ttfb: "40%",
			fcp: "38%",
			si: "34%",
		},
		advanced: {
			lcp: "57%",
			fid: "72%",
			cls: "67%",
			ttfb: "40%",
			fcp: "75%",
			si: "59%",
		},
	};

	const currentImprovements = currentLevel === "advanced" ? improvements.advanced : improvements.optimized;

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
				{Object.entries(currentImprovements).map(([metric, improvement]) => (
					<div key={metric} className="rounded-md border border-gray-200 bg-white p-3">
						<div className="text-center">
							<div className="font-bold text-2xl text-blue-600">{improvement}</div>
							<div className="text-gray-600 text-xs">{metric.toUpperCase()} 提升</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
