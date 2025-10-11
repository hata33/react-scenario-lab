"use client";

import React, { useState } from 'react';
import { ArrowLeft, Server, Code, Database, Zap, Shield, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface ServerComponentExample {
  id: string;
  title: string;
  description: string;
  difficulty: '初级' | '中级' | '高级';
  status: 'completed' | 'in-progress' | 'planned';
  demoPath: string;
  serverCode: string;
  clientCode?: string;
  benefits: string[];
  useCases: string[];
}

const serverComponentExamples: ServerComponentExample[] = [
  {
    id: 'basic-server-component',
    title: '基础服务端组件',
    description: '创建和使用基础的服务端组件，理解服务端渲染的工作原理',
    difficulty: '初级',
    status: 'completed',
    demoPath: '/nextjs-features/server-components/basic-demo',
    serverCode: `// app/components/ServerComponent.tsx
async function ServerComponent({ id }: { id: string }) {
  // 服务端数据获取
  const data = await fetchData(id);

  return (
    <div className="server-component">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}`,
    benefits: ['零客户端 JavaScript', '直接访问数据库', '更好的 SEO'],
    useCases: ['静态内容', '数据获取', 'SEO 敏感页面']
  },
  {
    id: 'data-fetching',
    title: '服务端数据获取',
    description: '在服务端组件中获取数据，避免客户端的 loading 状态',
    difficulty: '初级',
    status: 'completed',
    demoPath: '/nextjs-features/server-components/data-fetching-demo',
    serverCode: `// app/products/page.tsx
async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // 默认缓存
  }).then(res => res.json());

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}`,
    benefits: ['减少客户端加载状态', '自动数据缓存', '更好的性能'],
    useCases: ['产品列表', '博客文章', '用户数据']
  },
  {
    id: 'client-components',
    title: '客户端组件',
    description: '在服务端组件中使用客户端组件，处理交互和状态',
    difficulty: '中级',
    status: 'in-progress',
    demoPath: '/nextjs-features/server-components/client-demo',
    serverCode: `// app/components/UserProfile.tsx
import { ClientComponent } from './ClientComponent';

async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <ClientComponent initialData={user} />
    </div>
  );
}`,
    clientCode: `"use client";

import { useState } from 'react';

function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EditForm data={data} onSave={setData} />
      ) : (
        <Display data={data} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}`,
    benefits: ['最佳的两世界', '状态管理', '事件处理'],
    useCases: ['表单', '交互式 UI', '状态管理']
  },
  {
    id: 'streaming',
    title: '流式渲染',
    description: '使用 Suspense 和流式渲染，逐步加载页面内容',
    difficulty: '高级',
    status: 'planned',
    demoPath: '/nextjs-features/server-components/streaming-demo',
    serverCode: `// app/dashboard/page.tsx
import { Suspense } from 'react';

async function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <Analytics />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

async function Analytics() {
  const analytics = await getAnalytics(); // 慢速数据获取
  return <AnalyticsChart data={analytics} };
}`,
    benefits: ['更快的首次渲染', '渐进式加载', '更好的用户体验'],
    useCases: ['仪表板', '数据分析', '大型页面']
  },
  {
    id: 'server-actions',
    title: 'Server Actions',
    description: '在服务端组件中定义可被客户端调用的函数',
    difficulty: '高级',
    status: 'planned',
    demoPath: '/nextjs-features/server-components/actions-demo',
    serverCode: `"use server";

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await db.post.create({
    data: { title, content }
  });

  revalidatePath('/posts');
}

// 客户端组件中使用
function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create Post</button>
    </form>
  );
}`,
    benefits: ['更简单的表单处理', '类型安全', '减少 API 路由'],
    useCases: ['表单提交', '数据变更', '用户交互']
  },
  {
    id: 'performance-optimization',
    title: '性能优化',
    description: '使用服务端组件优化应用性能，减少 JavaScript 包大小',
    difficulty: '中级',
    status: 'in-progress',
    demoPath: '/nextjs-features/server-components/performance-demo',
    serverCode: `// app/blog/page.tsx
async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <BlogHeader />
      <BlogList posts={posts} />
      <BlogSidebar />
    </div>
  );
}

// 所有组件都在服务端渲染
// 客户端只需要很少的 JavaScript`,
    benefits: ['减少包大小', '更快的加载', '更好的性能指标'],
    useCases: ['内容网站', '博客', '电商网站']
  }
];

export default function ServerComponentsFeaturePage() {
  const [selectedExample, setSelectedExample] = useState<ServerComponentExample | null>(null);

  const getDifficultyColor = (difficulty: ServerComponentExample['difficulty']) => {
    switch (difficulty) {
      case '初级':
        return 'text-green-600 bg-green-100';
      case '中级':
        return 'text-yellow-600 bg-yellow-100';
      case '高级':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: ServerComponentExample['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'planned':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: ServerComponentExample['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'planned':
        return '计划中';
      default:
        return '未知';
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
                <Server className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Server Components 特性
                  </h1>
                  <p className="text-gray-600">
                    Next.js 服务端组件完整指南和最佳实践
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 概述 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">什么是 Server Components？</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                React Server Components (RSC) 是一种新的组件类型，允许您在服务端渲染组件。
                与传统组件不同，服务端组件：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>在服务端运行</strong>：不会在客户端下载或执行</li>
                <li><strong>直接访问数据源</strong>：可以直接查询数据库或调用 API</li>
                <li><strong>零客户端 JavaScript</strong>：不增加客户端包大小</li>
                <li><strong>保持服务端状态</strong>：可以使用服务端专用功能</li>
                <li><strong>自动缓存</strong>：支持数据缓存和重新验证</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 主要优势 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">主要优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">性能优化</h3>
              </div>
              <p className="text-gray-600">
                减少客户端 JavaScript 包大小，提高页面加载速度
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">数据获取</h3>
              </div>
              <p className="text-gray-600">
                直接在服务端获取数据，避免客户端 loading 状态
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">安全性</h3>
              </div>
              <p className="text-gray-600">
                敏感数据和逻辑保留在服务端，提高安全性
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">开发体验</h3>
              </div>
              <p className="text-gray-600">
                简化数据获取和状态管理，提高开发效率
              </p>
            </div>
          </div>
        </div>

        {/* 特性示例 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">功能示例</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：示例列表 */}
            <div className="space-y-4">
              {serverComponentExamples.map(example => (
                <div
                  key={example.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
                    selectedExample?.id === example.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedExample(example)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {example.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                          {example.difficulty}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(example.status)}`}>
                          {getStatusText(example.status)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {example.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {example.benefits.slice(0, 3).map((benefit, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                        >
                          {benefit}
                        </span>
                      ))}
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
                      {selectedExample.status === 'completed' && (
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          <Code className="w-4 h-4" />
                          <span>查看演示</span>
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {selectedExample.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>难度: {selectedExample.difficulty}</span>
                      <span>状态: {getStatusText(selectedExample.status)}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">服务端代码</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{selectedExample.serverCode}</code>
                        </pre>
                      </div>
                    </div>

                    {selectedExample.clientCode && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">客户端代码</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{selectedExample.clientCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedExample.status === 'completed' && (
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
                  <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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