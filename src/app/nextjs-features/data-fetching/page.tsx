"use client";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Cloud,
  Database,
  RefreshCw,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "@/components/Layout";

interface DataFetchingExample {
  id: string;
  title: string;
  description: string;
  method: "SSG" | "SSR" | "ISR" | "CSR";
  difficulty: "初级" | "中级" | "高级";
  status: "completed" | "in-progress" | "planned";
  codeSnippet: string;
  benefits: string[];
  useCases: string[];
  performance: {
    loadTime: string;
    tti: string;
    scalability: string;
  };
}

const dataFetchingExamples: DataFetchingExample[] = [
  {
    id: "static-site-generation",
    title: "静态站点生成 (SSG)",
    description: "在构建时预渲染页面，提供最快的加载速度和最佳的安全性",
    method: "SSG",
    difficulty: "初级",
    status: "completed",
    codeSnippet: `// app/blog/[slug]/page.tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}`,
    benefits: ["极快加载速度", "CDN 友好", "安全性高", "SEO 优秀"],
    useCases: ["博客文章", "产品页面", "文档", "营销页面"],
    performance: {
      loadTime: "< 100ms",
      tti: "即时",
      scalability: "极高",
    },
  },
  {
    id: "server-side-rendering",
    title: "服务端渲染 (SSR)",
    description: "每个请求都在服务端渲染，适合动态内容页面",
    method: "SSR",
    difficulty: "初级",
    status: "completed",
    codeSnippet: `// app/dashboard/page.tsx
async function DashboardPage() {
  // 每次请求都会重新获取数据
  const user = await getCurrentUser();
  const analytics = await getUserAnalytics(user.id);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <AnalyticsChart data={analytics} />
    </div>
  );
}`,
    benefits: ["实时数据", "个性化内容", "安全性好", "SEO 友好"],
    useCases: ["用户仪表板", "个人资料", "实时数据", "电商页面"],
    performance: {
      loadTime: "200-500ms",
      tti: "1-2s",
      scalability: "中等",
    },
  },
  {
    id: "incremental-static-regeneration",
    title: "增量静态生成 (ISR)",
    description: "静态页面按需重新生成，平衡性能和实时性",
    method: "ISR",
    difficulty: "中级",
    status: "in-progress",
    codeSnippet: `// app/products/page.tsx
async function ProductsPage() {
  const res = await fetch('https://api.example.com/products', {
    next: {
      revalidate: 60 // 60秒后重新验证
    }
  });

  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}`,
    benefits: ["快速响应", "自动更新", "减少服务器负载", "CDN 缓存"],
    useCases: ["产品目录", "新闻列表", "电商页面", "内容聚合"],
    performance: {
      loadTime: "100-200ms",
      tti: "< 1s",
      scalability: "高",
    },
  },
  {
    id: "client-side-rendering",
    title: "客户端渲染 (CSR)",
    description: "在客户端获取和渲染数据，适合高度交互的页面",
    method: "CSR",
    difficulty: "初级",
    status: "completed",
    codeSnippet: `"use client";

import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}`,
    benefits: ["高度交互", "实时更新", "离线支持", "丰富用户体验"],
    useCases: ["聊天应用", "实时编辑器", "游戏", "复杂表单"],
    performance: {
      loadTime: "500-1000ms",
      tti: "2-5s",
      scalability: "中等",
    },
  },
  {
    id: "streaming-ssr",
    title: "流式 SSR",
    description: "使用 Suspense 流式渲染页面，逐步加载内容",
    method: "SSR",
    difficulty: "高级",
    status: "planned",
    codeSnippet: `// app/analytics/page.tsx
import { Suspense } from 'react';

async function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <RevenueChart />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <UserActivity />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <PerformanceMetrics />
      </Suspense>
    </div>
  );
}`,
    benefits: [
      "更快的首次渲染",
      "渐进式加载",
      "更好的用户体验",
      "并行数据获取",
    ],
    useCases: ["分析仪表板", "数据密集型应用", "大型页面", "实时监控"],
    performance: {
      loadTime: "300-600ms",
      tti: "1-3s",
      scalability: "高",
    },
  },
  {
    id: "parallel-data-fetching",
    title: "并行数据获取",
    description: "同时获取多个数据源，减少总加载时间",
    method: "SSR",
    difficulty: "中级",
    status: "in-progress",
    codeSnippet: `// app/dashboard/page.tsx
async function DashboardPage() {
  // 并行获取数据
  const [user, analytics, notifications] = await Promise.all([
    fetchUser(),
    fetchAnalytics(),
    fetchNotifications()
  ]);

  return (
    <DashboardLayout
      user={user}
      analytics={analytics}
      notifications={notifications}
    />
  );
}`,
    benefits: ["减少总加载时间", "更好的用户体验", "高效资源利用", "简化代码"],
    useCases: ["仪表板", "个人主页", "管理后台", "数据聚合页面"],
    performance: {
      loadTime: "150-400ms",
      tti: "1-2s",
      scalability: "高",
    },
  },
];

export default function DataFetchingFeaturePage() {
  const [selectedExample, setSelectedExample] =
    useState<DataFetchingExample | null>(null);

  const getMethodColor = (method: DataFetchingExample["method"]) => {
    switch (method) {
      case "SSG":
        return "text-green-600 bg-green-100";
      case "SSR":
        return "text-blue-600 bg-blue-100";
      case "ISR":
        return "text-purple-600 bg-purple-100";
      case "CSR":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyColor = (
    difficulty: DataFetchingExample["difficulty"],
  ) => {
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

  const getStatusColor = (status: DataFetchingExample["status"]) => {
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

  const getStatusText = (status: DataFetchingExample["status"]) => {
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
                <Database className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    数据获取特性
                  </h1>
                  <p className="text-gray-600">
                    Next.js 完整数据获取方案：SSG、SSR、ISR、CSR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 方法对比 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              数据获取方法对比
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">SSG</h3>
                <p className="text-sm text-green-700">构建时预渲染</p>
                <div className="mt-2 text-xs text-green-600">
                  <div>⚡ 极快加载</div>
                  <div>🔒 安全性高</div>
                  <div>📱 SEO 优秀</div>
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">SSR</h3>
                <p className="text-sm text-blue-700">请求时渲染</p>
                <div className="mt-2 text-xs text-blue-600">
                  <div>🔄 实时数据</div>
                  <div>👤 个性化</div>
                  <div>🛡️ 安全性好</div>
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">ISR</h3>
                <p className="text-sm text-purple-700">增量更新</p>
                <div className="mt-2 text-xs text-purple-600">
                  <div>⚖️ 平衡性能</div>
                  <div>🔄 自动更新</div>
                  <div>📊 减少负载</div>
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-900 mb-2">CSR</h3>
                <p className="text-sm text-orange-700">客户端渲染</p>
                <div className="mt-2 text-xs text-orange-600">
                  <div>🎮 高度交互</div>
                  <div>📱 实时更新</div>
                  <div>🎯 丰富体验</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特性示例 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">实现示例</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：示例列表 */}
            <div className="space-y-4">
              {dataFetchingExamples.map((example) => (
                <div
                  key={example.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer ${selectedExample?.id === example.id
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
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(example.method)}`}
                          >
                            {example.method}
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
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <span>⏱️ {example.performance.loadTime}</span>
                        <span>🚀 {example.performance.tti}</span>
                      </div>
                      <span>📈 {example.performance.scalability}</span>
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
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(selectedExample.method)}`}
                        >
                          {selectedExample.method}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {selectedExample.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-medium text-gray-900">
                          加载时间
                        </div>
                        <div className="text-gray-600">
                          {selectedExample.performance.loadTime}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-medium text-gray-900">
                          可交互时间
                        </div>
                        <div className="text-gray-600">
                          {selectedExample.performance.tti}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-medium text-gray-900">
                          可扩展性
                        </div>
                        <div className="text-gray-600">
                          {selectedExample.performance.scalability}
                        </div>
                      </div>
                    </div>
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

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">
                        适用场景
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExample.useCases.map((useCase, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedExample.status === "completed" && (
                    <div className="p-6 bg-green-50 border-t border-green-200">
                      <div className="flex items-center space-x-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">该示例已完成并可用</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    选择一个示例
                  </h3>
                  <p className="text-gray-600">
                    点击左侧的示例查看详细信息和代码示例
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
