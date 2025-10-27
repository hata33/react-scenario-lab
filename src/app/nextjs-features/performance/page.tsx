"use client";

import { ArrowLeft, CheckCircle, Code, Image as ImageIcon, Monitor, Type, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";

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
			<div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
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
		codeSnippet: `// 方式1：使用 next/font (需要网络连接)
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
});

// 方式2：使用本地字体 (推荐用于生产环境)
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/my-font.woff2',
  variable: '--font-my-font',
  display: 'swap'
});

// 方式3：使用系统字体 (最可靠)
function App() {
  return (
    <div className="font-sans">
      {/* 使用 Tailwind 的系统字体堆栈 */}
      {/* font-family: ui-sans-serif, system-ui, sans-serif */}
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
	const [selectedExample, setSelectedExample] = useState<PerformanceExample | null>(null);

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
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
							>
								<ArrowLeft className="mr-2 h-5 w-5" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Zap className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">性能优化特性</h1>
									<p className="text-gray-600">Next.js 内置性能优化工具和最佳实践</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 性能指标概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">核心 Web Vitals</h2>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Monitor className="mx-auto mb-2 h-8 w-8 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">LCP</h3>
								<p className="mb-2 text-blue-700 text-sm">最大内容绘制</p>
								<p className="text-blue-600 text-xs">目标: &lt; 2.5s</p>
								<p className="font-bold text-blue-900 text-lg">优化 40%</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<Zap className="mx-auto mb-2 h-8 w-8 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">FID</h3>
								<p className="mb-2 text-green-700 text-sm">首次输入延迟</p>
								<p className="text-green-600 text-xs">目标: &lt; 100ms</p>
								<p className="font-bold text-green-900 text-lg">优化 35%</p>
							</div>
							<div className="rounded-lg bg-yellow-50 p-4 text-center">
								<ImageIcon className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
								<h3 className="mb-1 font-semibold text-yellow-900">CLS</h3>
								<p className="mb-2 text-sm text-yellow-700">累积布局偏移</p>
								<p className="text-xs text-yellow-600">目标: &lt; 0.1</p>
								<p className="font-bold text-lg text-yellow-900">减少 60%</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Code className="mx-auto mb-2 h-8 w-8 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">Bundle Size</h3>
								<p className="mb-2 text-purple-700 text-sm">包大小</p>
								<p className="text-purple-600 text-xs">目标: 最小化</p>
								<p className="font-bold text-lg text-purple-900">减少 45%</p>
							</div>
						</div>
					</div>
				</div>

				{/* 优化示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">优化示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{performanceExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-blue-500" : ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="mb-3 flex items-start justify-between">
											<div>
												<h3 className="mb-1 font-semibold text-gray-900 text-lg">{example.title}</h3>
												<div className="mb-2 flex items-center space-x-2">
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getCategoryColor(example.category)}`}
													>
														{example.category}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getDifficultyColor(example.difficulty)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{example.description}</p>
										<div className="grid grid-cols-4 gap-2 text-gray-500 text-xs">
											<div className="rounded bg-gray-50 p-1 text-center">
												<div className="font-medium">LCP</div>
												<div>{example.metrics.lcp}</div>
											</div>
											<div className="rounded bg-gray-50 p-1 text-center">
												<div className="font-medium">FID</div>
												<div>{example.metrics.fid}</div>
											</div>
											<div className="rounded bg-gray-50 p-1 text-center">
												<div className="font-medium">CLS</div>
												<div>{example.metrics.cls}</div>
											</div>
											<div className="rounded bg-gray-50 p-1 text-center">
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
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-6">
										<div className="mb-4 flex items-center justify-between">
											<h3 className="font-semibold text-gray-900 text-xl">{selectedExample.title}</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm ${getCategoryColor(selectedExample.category)}`}
												>
													{selectedExample.category}
												</span>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{selectedExample.description}</p>

										{/* 性能提升指标 */}
										<div className="mb-4 grid grid-cols-4 gap-2">
											<div className="rounded bg-blue-50 p-2 text-center">
												<div className="font-medium text-blue-600 text-xs">LCP</div>
												<div className="font-bold text-blue-900 text-sm">{selectedExample.metrics.lcp}</div>
											</div>
											<div className="rounded bg-green-50 p-2 text-center">
												<div className="font-medium text-green-600 text-xs">FID</div>
												<div className="font-bold text-green-900 text-sm">{selectedExample.metrics.fid}</div>
											</div>
											<div className="rounded bg-yellow-50 p-2 text-center">
												<div className="font-medium text-xs text-yellow-600">CLS</div>
												<div className="font-bold text-sm text-yellow-900">{selectedExample.metrics.cls}</div>
											</div>
											<div className="rounded bg-purple-50 p-2 text-center">
												<div className="font-medium text-purple-600 text-xs">Bundle</div>
												<div className="font-bold text-purple-900 text-sm">{selectedExample.metrics.bundle}</div>
											</div>
										</div>

										{/* 演示区域 */}
										{selectedExample.demo && (
											<div className="mb-4">
												<h4 className="mb-2 font-medium text-gray-900 text-sm">演示</h4>
												{selectedExample.demo}
											</div>
										)}
									</div>

									<div className="p-6">
										<h4 className="mb-3 font-semibold text-gray-900">代码示例</h4>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
											<h5 className="mb-2 font-medium text-gray-900">主要优势</h5>
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
									</div>

									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该优化已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<Zap className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个优化方案</h3>
									<p className="text-gray-600">点击左侧的优化示例查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
