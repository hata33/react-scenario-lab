"use client";

import React, { useState } from "react";
import {
	ArrowLeft,
	Zap,
	Image as ImageIcon,
	Type,
	Code,
	Monitor,
	CheckCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface PerformanceExample {
	id: string;
	title: string;
	description: string;
	category: "Images" | "Fonts" | "Scripts" | "Code" | "Monitoring";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	metrics: {
		lcp: string;
		fid: string;
		cls: string;
		bundle: string;
	};
	demo?: React.ReactNode;
}

const performanceExamples: PerformanceExample[] = [
	{
		id: "next-image",
		title: "Next.js 图片优化",
		description: "使用 next/image 组件自动优化图片加载、格式和尺寸",
		category: "Images",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      // 自动优化
      priority // 预加载关键图片
      placeholder="blur" // 模糊占位符
      sizes="(max-width: 768px) 100vw, 50vw" // 响应式尺寸
      quality={85} // 压缩质量
    />
  );
}`,
		benefits: ["自动格式转换", "懒加载", "响应式图片", "CDN 优化"],
		metrics: {
			lcp: "提升 50%",
			fid: "提升 30%",
			cls: "减少 60%",
			bundle: "减少 20%",
		},
		demo: (
			<div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
				<Image
					src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
					alt="Performance demo"
					fill
					className="object-cover"
					priority
				/>
			</div>
		),
	},
	{
		id: "next-font",
		title: "Next.js 字体优化",
		description: "使用 next/font 自动优化字体加载，减少布局偏移",
		category: "Fonts",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `import { Inter, Roboto } from 'next/font/google';

// 自动优化字体加载
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // 字体显示策略
  preload: true, // 预加载字体
  fallback: ['system-ui', 'arial'] // 后备字体
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

function App() {
  return (
    <div className={\`\${inter.variable} \${roboto.variable}\`}>
      {/* 应用字体 */}
    </div>
  );
}`,
		benefits: ["自动字体优化", "减少 CLS", "预加载", "自托管"],
		metrics: {
			lcp: "提升 20%",
			fid: "提升 10%",
			cls: "减少 80%",
			bundle: "减少 5%",
		},
	},
	{
		id: "next-script",
		title: "Next.js 脚本优化",
		description: "使用 next/script 控制第三方脚本加载策略",
		category: "Scripts",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `import Script from 'next/script';

function AnalyticsPage() {
  return (
    <div>
      {/* 关键脚本 */}
      <Script
        src="https://cdn.example.com/analytics.js"
        strategy="afterInteractive" // 交互后加载
        onLoad={() => console.log('Script loaded')}
      />

      {/* 非关键脚本 */}
      <Script
        src="https://cdn.example.com/chat.js"
        strategy="lazyOnload" // 懒加载
      />

      {/* 关键功能脚本 */}
      <Script
        src="https://cdn.example.com/critical.js"
        strategy="beforeInteractive" // 交互前加载
      />
    </div>
  );
}`,
		benefits: ["智能加载策略", "减少阻塞", "提升性能", "更好的用户体验"],
		metrics: {
			lcp: "提升 25%",
			fid: "提升 40%",
			cls: "减少 20%",
			bundle: "减少 15%",
		},
	},
	{
		id: "code-splitting",
		title: "代码分割和懒加载",
		description: "动态导入组件和模块，减少初始包大小",
		category: "Code",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// 动态导入组件
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // 客户端渲染
});

// 路由级代码分割
const BlogPage = dynamic(() => import('./BlogPage'));

// 条件加载
function ConditionalComponent() {
  const [showChart, setShowChart] = useState(false);

  const Chart = showChart
    ? dynamic(() => import('./Chart'), { loading: () => <div>Loading chart...</div> })
    : null;

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      {Chart && <Chart />}
    </div>
  );
}`,
		benefits: ["减少初始包大小", "按需加载", "提升加载速度", "更好的用户体验"],
		metrics: {
			lcp: "提升 40%",
			fid: "提升 35%",
			cls: "减少 30%",
			bundle: "减少 50%",
		},
	},
	{
		id: "caching-strategies",
		title: "缓存策略",
		description: "实现多层缓存策略，优化数据获取和资源加载",
		category: "Code",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// 数据缓存
async function getData() {
  const response = await fetch('https://api.example.com/data', {
    next: {
      revalidate: 3600, // 1小时后重新验证
      tags: ['user-data'] // 缓存标签
    }
  });
  return response.json();
}

// 路由缓存
export const dynamic = 'force-static';
export const revalidate = 86400; // 1天

// 组件级缓存
const CachedComponent = React.memo(({ data }) => {
  return <div>{data.content}</div>;
});

// 客户端缓存
const useCache = (key: string, data: any, ttl: number = 3600000) => {
  const [cachedData, setCachedData] = useState(data);

  useEffect(() => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        setCachedData(data);
      }
    }
  }, [key, ttl]);

  return cachedData;
};`,
		benefits: ["减少 API 调用", "提升响应速度", "降低服务器负载", "离线支持"],
		metrics: {
			lcp: "提升 60%",
			fid: "提升 50%",
			cls: "减少 10%",
			bundle: "减少 10%",
		},
	},
	{
		id: "web-vitals",
		title: "性能监控",
		description: "使用 Web Vitals 监控和分析应用性能",
		category: "Monitoring",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `// app/_app.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function reportWebVitals(metric: any) {
  // 发送到分析服务
  analytics.track('web-vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    entries: metric.entries
  });

  // 控制台输出
  console.log(\`\${metric.name}:\`, metric.value);
}

// 自定义性能监控
function usePerformanceMonitoring() {
  useEffect(() => {
    // 监控核心 Web Vitals
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);

    // 自定义性能指标
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Performance Entry:', entry);
      }
    });

    observer.observe({ entryTypes: ['measure', 'resource'] });

    return () => observer.disconnect();
  }, []);
}`,
		benefits: ["实时性能监控", "问题快速定位", "性能趋势分析", "用户体验优化"],
		metrics: {
			lcp: "提升 15%",
			fid: "提升 20%",
			cls: "减少 25%",
			bundle: "增加 5%",
		},
	},
];

export default function PerformanceFeaturePage() {
	const [selectedExample, setSelectedExample] =
		useState<PerformanceExample | null>(null);

	const getCategoryColor = (category: PerformanceExample["category"]) => {
		switch (category) {
			case "Images":
				return "text-blue-600 bg-blue-100";
			case "Fonts":
				return "text-green-600 bg-green-100";
			case "Scripts":
				return "text-purple-600 bg-purple-100";
			case "Code":
				return "text-orange-600 bg-orange-100";
			case "Monitoring":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: PerformanceExample["difficulty"]) => {
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

	const getStatusColor = (status: PerformanceExample["status"]) => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: PerformanceExample["status"]) => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Zap className="w-8 h-8 text-blue-600" />
								<div>
									<h1 className="text-3xl font-bold text-gray-900">
										性能优化特性
									</h1>
									<p className="text-gray-600">
										Next.js 内置性能优化工具和最佳实践
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 性能指标概览 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							核心 Web Vitals
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
								<h3 className="font-semibold text-blue-900 mb-1">LCP</h3>
								<p className="text-sm text-blue-700 mb-2">最大内容绘制</p>
								<p className="text-xs text-blue-600">目标: &lt; 2.5s</p>
								<p className="text-lg font-bold text-blue-900">优化 40%</p>
							</div>
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
								<h3 className="font-semibold text-green-900 mb-1">FID</h3>
								<p className="text-sm text-green-700 mb-2">首次输入延迟</p>
								<p className="text-xs text-green-600">目标: &lt; 100ms</p>
								<p className="text-lg font-bold text-green-900">优化 35%</p>
							</div>
							<div className="text-center p-4 bg-yellow-50 rounded-lg">
								<ImageIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
								<h3 className="font-semibold text-yellow-900 mb-1">CLS</h3>
								<p className="text-sm text-yellow-700 mb-2">累积布局偏移</p>
								<p className="text-xs text-yellow-600">目标: &lt; 0.1</p>
								<p className="text-lg font-bold text-yellow-900">减少 60%</p>
							</div>
							<div className="text-center p-4 bg-purple-50 rounded-lg">
								<Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
								<h3 className="font-semibold text-purple-900 mb-1">
									Bundle Size
								</h3>
								<p className="text-sm text-purple-700 mb-2">包大小</p>
								<p className="text-xs text-purple-600">目标: 最小化</p>
								<p className="text-lg font-bold text-purple-900">减少 45%</p>
							</div>
						</div>
					</div>
				</div>

				{/* 优化示例 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">优化示例</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{performanceExamples.map((example) => (
								<div
									key={example.id}
									className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
										selectedExample?.id === example.id
											? "ring-2 ring-blue-500"
											: ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="flex items-start justify-between mb-3">
											<div>
												<h3 className="text-lg font-semibold text-gray-900 mb-1">
													{example.title}
												</h3>
												<div className="flex items-center space-x-2 mb-2">
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(example.category)}`}
													>
														{example.category}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="text-gray-600 mb-4">{example.description}</p>
										<div className="grid grid-cols-4 gap-2 text-xs text-gray-500">
											<div className="text-center p-1 bg-gray-50 rounded">
												<div className="font-medium">LCP</div>
												<div>{example.metrics.lcp}</div>
											</div>
											<div className="text-center p-1 bg-gray-50 rounded">
												<div className="font-medium">FID</div>
												<div>{example.metrics.fid}</div>
											</div>
											<div className="text-center p-1 bg-gray-50 rounded">
												<div className="font-medium">CLS</div>
												<div>{example.metrics.cls}</div>
											</div>
											<div className="text-center p-1 bg-gray-50 rounded">
												<div className="font-medium">Bundle</div>
												<div>{example.metrics.bundle}</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200">
									<div className="p-6 border-b border-gray-200">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-xl font-semibold text-gray-900">
												{selectedExample.title}
											</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedExample.category)}`}
												>
													{selectedExample.category}
												</span>
											</div>
										</div>
										<p className="text-gray-600 mb-4">
											{selectedExample.description}
										</p>

										{/* 性能提升指标 */}
										<div className="grid grid-cols-4 gap-2 mb-4">
											<div className="text-center p-2 bg-blue-50 rounded">
												<div className="text-xs text-blue-600 font-medium">
													LCP
												</div>
												<div className="text-sm font-bold text-blue-900">
													{selectedExample.metrics.lcp}
												</div>
											</div>
											<div className="text-center p-2 bg-green-50 rounded">
												<div className="text-xs text-green-600 font-medium">
													FID
												</div>
												<div className="text-sm font-bold text-green-900">
													{selectedExample.metrics.fid}
												</div>
											</div>
											<div className="text-center p-2 bg-yellow-50 rounded">
												<div className="text-xs text-yellow-600 font-medium">
													CLS
												</div>
												<div className="text-sm font-bold text-yellow-900">
													{selectedExample.metrics.cls}
												</div>
											</div>
											<div className="text-center p-2 bg-purple-50 rounded">
												<div className="text-xs text-purple-600 font-medium">
													Bundle
												</div>
												<div className="text-sm font-bold text-purple-900">
													{selectedExample.metrics.bundle}
												</div>
											</div>
										</div>

										{/* 演示区域 */}
										{selectedExample.demo && (
											<div className="mb-4">
												<h4 className="text-sm font-medium text-gray-900 mb-2">
													演示
												</h4>
												{selectedExample.demo}
											</div>
										)}
									</div>

									<div className="p-6">
										<h4 className="font-semibold text-gray-900 mb-3">
											代码示例
										</h4>
										<div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
											<h5 className="font-medium text-gray-900 mb-2">
												主要优势
											</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="p-6 bg-green-50 border-t border-green-200">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="w-5 h-5" />
												<span className="font-medium">该优化已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
									<Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										选择一个优化方案
									</h3>
									<p className="text-gray-600">
										点击左侧的优化示例查看详细信息和代码示例
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
