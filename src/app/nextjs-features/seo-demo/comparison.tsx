"use client";

import React, { useState } from 'react';
import { Code, Search, Eye, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  nextjs: {
    status: 'good' | 'excellent' | 'perfect';
    description: string;
    example: string;
  };
  reactSPA: {
    status: 'poor' | 'limited' | 'requires-workaround';
    description: string;
    example: string;
  };
}

const comparisonData: ComparisonItem[] = [
  {
    feature: "搜索引擎可见性",
    nextjs: {
      status: 'perfect',
      description: "搜索引擎直接获取完整的HTML内容",
      example: `<h1>Next.js SEO 优化实战</h1>
<p>深入展示 Next.js 相比 React SPA 的 SEO 优势...</p>
<article>
  <h2>Next.js 15 新特性详解</h2>
  <p>深入了解 Next.js 15 带来的革命性变化...</p>
</article>`
    },
    reactSPA: {
      status: 'poor',
      description: "搜索引擎只能看到空的HTML容器",
      example: `<div id="root"></div>
<script src="bundle.js"></script>
<!-- 内容需要JavaScript渲染 -->`
    }
  },
  {
    feature: "页面元数据管理",
    nextjs: {
      status: 'perfect',
      description: "自动生成完整的head标签",
      example: `<title>Next.js SEO 优化实战 - 完整指南</title>
<meta name="description" content="深入展示 Next.js 的 SEO 优势...">
<meta property="og:title" content="Next.js SEO 优化实战">
<meta property="og:description" content="深入展示 Next.js 的 SEO 优势...">`
    },
    reactSPA: {
      status: 'requires-workaround',
      description: "需要额外的库和复杂的客户端更新",
      example: `<title>我的应用</title>
<!-- 需要react-helmet等库在客户端更新 -->
<script>
  // JavaScript运行后才更新meta标签
  document.title = "动态标题";
</script>`
    }
  },
  {
    feature: "首次内容绘制时间",
    nextjs: {
      status: 'excellent',
      description: "用户立即看到内容，无需等待JavaScript",
      example: `服务器响应 → 用户看到内容: ~200ms
✅ 即时可见的文本和图片`
    },
    reactSPA: {
      status: 'limited',
      description: "需要下载、解析、执行JavaScript后才能看到内容",
      example: `下载HTML → 下载JS → 执行JS → 渲染内容: ~1-3s
⏳ 用户看到空白或加载动画`
    }
  },
  {
    feature: "URL结构和导航",
    nextjs: {
      status: 'perfect',
      description: "基于文件系统的清晰URL结构",
      example: `/blog/[slug] → /blog/nextjs-15-features
✅ 搜索引擎友好的URL
✅ 自动生成sitemap`
    },
    reactSPA: {
      status: 'limited',
      description: "客户端路由，需要额外配置",
      example: `/#/blog/nextjs-15-features
❌ Hash URL对SEO不友好
❌ 需要手动配置history API`
    }
  },
  {
    feature: "图片和资源优化",
    nextjs: {
      status: 'excellent',
      description: "自动优化图片、懒加载、WebP支持",
      example: `<img src="image.webp"
     srcset="image-300w.webp 300w, image-600w.webp 600w"
     loading="lazy"
     alt="描述文字">
✅ 自动响应式图片
✅ 懒加载优化`
    },
    reactSPA: {
      status: 'requires-workaround',
      description: "需要手动实现或使用额外库",
      example: `<img src="image.jpg">
❌ 可能加载过大图片
❌ 需要手动实现懒加载`
    }
  },
  {
    feature: "结构化数据",
    nextjs: {
      status: 'perfect',
      description: "服务端生成JSON-LD结构化数据",
      example: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Next.js SEO 优化实战"
}
</script>
✅ 搜索引擎立即获取结构化数据`
    },
    reactSPA: {
      status: 'requires-workaround',
      description: "需要客户端动态生成",
      example: `<script id="structured-data"></script>
<script>
  // JavaScript运行后才生成结构化数据
  document.getElementById('structured-data').textContent = '...';
</script>`
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'perfect':
      return 'text-green-600 bg-green-100 border-green-200';
    case 'excellent':
      return 'text-blue-600 bg-blue-100 border-blue-200';
    case 'good':
      return 'text-green-600 bg-green-100 border-green-200';
    case 'limited':
      return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    case 'poor':
      return 'text-red-600 bg-red-100 border-red-200';
    case 'requires-workaround':
      return 'text-orange-600 bg-orange-100 border-orange-200';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'perfect':
      return <CheckCircle className="w-4 h-4" />;
    case 'excellent':
      return <CheckCircle className="w-4 h-4" />;
    case 'good':
      return <CheckCircle className="w-4 h-4" />;
    case 'limited':
      return <AlertCircle className="w-4 h-4" />;
    case 'poor':
      return <XCircle className="w-4 h-4" />;
    case 'requires-workaround':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'perfect':
      return '完美';
    case 'excellent':
      return '优秀';
    case 'good':
      return '良好';
    case 'limited':
      return '有限';
    case 'poor':
      return '差';
    case 'requires-workaround':
      return '需要变通';
    default:
      return '一般';
  }
};

export default function SEOComparison() {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'html' | 'explain'>('html');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Next.js vs React SPA - SEO 对比
        </h2>
        <p className="text-gray-600 mb-6">
          你看到的页面源代码已经证明了 Next.js 的 SEO 优势。下面是更详细的对比：
        </p>

        {/* 视图切换 */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setViewMode('html')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'html'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            HTML 源码对比
          </button>
          <button
            onClick={() => setViewMode('explain')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'explain'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            详细说明
          </button>
        </div>

        {/* 特性选择器 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {comparisonData.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedFeature(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFeature === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {item.feature}
            </button>
          ))}
        </div>
      </div>

      {/* 对比内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next.js 列 */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-green-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-900">
                Next.js (服务端渲染)
              </h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comparisonData[selectedFeature].nextjs.status)}`}>
                {getStatusIcon(comparisonData[selectedFeature].nextjs.status)}
                <span className="ml-1">{getStatusText(comparisonData[selectedFeature].nextjs.status)}</span>
              </span>
            </div>
            <p className="text-green-800 mt-2">
              {comparisonData[selectedFeature].nextjs.description}
            </p>
          </div>

          <div className="p-6">
            {viewMode === 'html' ? (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">搜索引擎看到的 HTML:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{comparisonData[selectedFeature].nextjs.example}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">优势说明:</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>搜索引擎友好:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        搜索引擎爬虫可以立即获取和理解页面内容，无需执行JavaScript
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>更好的用户体验:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        用户可以立即看到内容，不需要等待JavaScript加载和执行
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>自动化优化:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        Next.js 自动处理元数据、结构化数据、图片优化等SEO相关功能
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* React SPA 列 */}
        <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-red-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-red-900">
                React SPA (客户端渲染)
              </h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comparisonData[selectedFeature].reactSPA.status)}`}>
                {getStatusIcon(comparisonData[selectedFeature].reactSPA.status)}
                <span className="ml-1">{getStatusText(comparisonData[selectedFeature].reactSPA.status)}</span>
              </span>
            </div>
            <p className="text-red-800 mt-2">
              {comparisonData[selectedFeature].reactSPA.description}
            </p>
          </div>

          <div className="p-6">
            {viewMode === 'html' ? (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">搜索引擎看到的 HTML:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{comparisonData[selectedFeature].reactSPA.example}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">限制说明:</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>SEO不友好:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        搜索引擎只能看到基本的HTML结构，内容完全依赖JavaScript渲染
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>用户体验问题:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        用户需要等待JavaScript加载才能看到内容，增加跳出率
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>需要额外工具:</strong>
                      <p className="text-gray-700 text-sm mt-1">
                        需要SSR解决方案(如Next.js)来改善SEO，但这又回到了起点
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 关键结论 */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              为什么SEO是Next.js的核心优势？
            </h3>
            <div className="text-blue-800 space-y-2">
              <p>
                <strong>1. 根本性差异:</strong> Next.js在服务器端生成完整的HTML，React SPA在客户端渲染内容。这是一个架构层面的根本区别。
              </p>
              <p>
                <strong>2. 不可替代的优势:</strong> 虽然其他特性(如路由、状态管理)都有替代方案，但服务端渲染带来的SEO优势是React SPA难以替代的。
              </p>
              <p>
                <strong>3. 搜索引擎的依赖:</strong> 在搜索引擎主导的互联网时代，SEO直接决定了网站的流量和可见性。
              </p>
              <p>
                <strong>4. 用户体验与SEO的统一:</strong> Next.js同时改善了SEO和用户体验，实现了双赢。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}