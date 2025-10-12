import { Metadata } from 'next';
import { ArrowLeft, Search, Code, CheckCircle, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import SEOComparison from './comparison';
import SEOAdvancedFeatures from './seo-advanced';
import { generateBreadcrumbSchema } from './metadata';

// 1. 静态元数据 - 在构建时就确定
export const metadata: Metadata = {
  title: 'Next.js SEO 优化实战 - 完整指南',
  description: '深入展示 Next.js 相比 React SPA 的 SEO 优势，包括静态生成、服务端渲染、元数据管理等核心特性',
  keywords: ['Next.js', 'SEO', 'React', '服务端渲染', '静态生成', '优化'],
  authors: [{ name: 'Next.js 实验室' }],
  openGraph: {
    title: 'Next.js SEO 优化实战',
    description: '深入展示 Next.js 的 SEO 优势',
    type: 'article',
    url: 'https://your-domain.com/nextjs-features/seo-demo',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js SEO 优化',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SEO 优化实战',
    description: '深入展示 Next.js 的 SEO 优势',
    images: ['https://your-domain.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

// 模拟数据库数据
const posts = [
  {
    id: 1,
    title: 'Next.js 15 新特性详解',
    slug: 'nextjs-15-features',
    excerpt: '深入了解 Next.js 15 带来的革命性变化，包括 App Router、Server Components 等核心特性。',
    content: 'Next.js 15 是一个重要的版本更新...',
    publishDate: '2024-01-15',
    category: '技术分享',
    readTime: '5分钟',
    tags: ['Next.js', 'React', '前端框架'],
  },
  {
    id: 2,
    title: 'React Server Components 最佳实践',
    slug: 'react-server-components',
    excerpt: '探索 React Server Components 的使用场景和最佳实践，提升应用性能。',
    content: 'React Server Components 改变了我们思考组件的方式...',
    publishDate: '2024-01-10',
    category: '技术教程',
    readTime: '8分钟',
    tags: ['React', 'Server Components', '性能优化'],
  },
  {
    id: 3,
    title: '网站性能优化完全指南',
    slug: 'performance-optimization',
    excerpt: '从图片优化到代码分割，全面介绍网站性能优化的各种技巧。',
    content: '性能优化是现代 Web 开发的重要组成部分...',
    publishDate: '2024-01-05',
    category: '优化指南',
    readTime: '12分钟',
    tags: ['性能', '优化', 'Web Vitals'],
  },
];

// 2. 动态生成 sitemap
export async function generateSitemap() {
  const baseUrl = 'https://your-domain.com';

  const posts = [
    { slug: 'nextjs-15-features', lastModified: new Date('2024-01-15') },
    { slug: 'react-server-components', lastModified: new Date('2024-01-10') },
    { slug: 'performance-optimization', lastModified: new Date('2024-01-05') },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/nextjs-features/seo-demo</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastModified.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
}

// 3. 结构化数据 (JSON-LD)
function generateStructuredData() {
  const currentDate = new Date();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Next.js SEO 优化实战",
    "description": "深入展示 Next.js 相比 React SPA 的 SEO 优势",
    "image": "https://your-domain.com/nextjs-seo-og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "Next.js 实验室",
      "url": "https://your-domain.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Next.js 实验室",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/logo.jpg"
      }
    },
    "datePublished": "2024-01-15T00:00:00+00:00",
    "dateModified": currentDate.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://your-domain.com/nextjs-features/seo-demo"
    }
  };
}

export default function SEODemoPage() {
  return (
    <>
      {/* 4. 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* 5. 面包屑结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: '首页', url: 'https://your-domain.com' },
              { name: 'Next.js 特性', url: 'https://your-domain.com/nextjs-features' },
              { name: 'SEO 优化实战', url: 'https://your-domain.com/nextjs-features/seo-demo' }
            ])
          ),
        }}
      />

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
                <Search className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Next.js SEO 优化实战
                  </h1>
                  <p className="text-gray-600">
                    展示 Next.js 相比 React SPA 的核心 SEO 优势
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 语义化 HTML 结构 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 文章列表 - 模拟博客 */}
          <section aria-labelledby="posts-heading">
            <header className="mb-8">
              <h2 id="posts-heading" className="text-2xl font-bold text-gray-900 mb-2">
                最新技术文章
              </h2>
              <p className="text-gray-600">
                这些内容由服务端渲染，搜索引擎可以直接抓取和索引
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <header className="p-6 pb-3">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      发布时间: {post.publishDate}
                    </p>
                  </header>

                  <div className="px-6 pb-3">
                    <p className="text-gray-700 mb-4">
                      {post.excerpt}
                    </p>

                    <footer className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        阅读全文 →
                      </Link>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SEO 优势对比组件 */}
          <section aria-labelledby="comparison-component-heading">
            <header className="mb-8">
              <h2 id="comparison-component-heading" className="text-2xl font-bold text-gray-900 mb-2">
                交互式 SEO 对比分析
              </h2>
              <p className="text-gray-600">
                切换不同的SEO特性，查看Next.js与React SPA的具体差异
              </p>
            </header>

            <SEOComparison />
          </section>

          {/* 传统 SEO 优势对比 */}
          <section aria-labelledby="comparison-heading">
            <header className="mb-8">
              <h2 id="comparison-heading" className="text-2xl font-bold text-gray-900 mb-2">
                Next.js vs React SPA - SEO 优势对比
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-900">
                    Next.js (服务端渲染)
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>完全的搜索引擎可见性</strong>
                      <p className="text-green-700 text-sm">搜索引擎直接获取完整的 HTML 内容</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>更快的首次内容绘制</strong>
                      <p className="text-green-700 text-sm">用户立即看到内容，提升用户体验指标</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>动态元数据管理</strong>
                      <p className="text-green-700 text-sm">每个页面都有独特的标题、描述和 Open Graph 标签</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>自动生成 sitemap 和 robots.txt</strong>
                      <p className="text-green-700 text-sm">搜索引擎更容易发现和索引所有页面</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-red-900">
                    React SPA (客户端渲染)
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <strong>SEO 友好性差</strong>
                      <p className="text-red-700 text-sm">搜索引擎只能获取空的 HTML div，内容需要 JavaScript 渲染</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <strong>较慢的首次内容绘制</strong>
                      <p className="text-red-700 text-sm">需要先加载 JavaScript，然后渲染内容</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <strong>复杂的元数据管理</strong>
                      <p className="text-red-700 text-sm">需要额外的库如 react-helmet 来管理头部标签</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <strong>依赖搜索引擎的 JavaScript 执行</strong>
                      <p className="text-red-700 text-sm">不是所有搜索引擎都能完美执行 JavaScript</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 实际效果演示 */}
          <section aria-labelledby="demo-heading">
            <header className="mb-8">
              <h2 id="demo-heading" className="text-2xl font-bold text-gray-900 mb-2">
                查看 SEO 优化效果
              </h2>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                如何验证这些 SEO 优化：
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">开发者工具检查</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>1. 右键 → 查看页面源代码</li>
                    <li>2. 观察完整的 HTML 内容（而非空 div）</li>
                    <li>3. 检查 title、meta description、og:title 等标签</li>
                    <li>4. 查看 JSON-LD 结构化数据</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">SEO 工具验证</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Google Search Console</li>
                    <li>• Facebook 调试工具 (Open Graph)</li>
                    <li>• Twitter Card 验证器</li>
                    <li>• Schema.org 标记验证工具</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">关键区别</h5>
                    <p className="text-blue-800 text-sm">
                      使用 Next.js，当搜索引擎爬虫访问这个页面时，立即获得包含所有内容的完整 HTML。
                      而在 React SPA 中，爬虫只能得到空的 HTML，需要等待并执行 JavaScript 才能看到内容。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 高级 SEO 优化功能 */}
          <section aria-labelledby="advanced-heading">
            <header className="mb-8">
              <h2 id="advanced-heading" className="text-2xl font-bold text-gray-900 mb-2">
                更多 SEO 优化功能
              </h2>
              <p className="text-gray-600">
                深入探索更多高级 SEO 优化技术和最佳实践
              </p>
            </header>

            <SEOAdvancedFeatures />
          </section>
        </main>

        {/* 6. 额外的 SEO 元素 */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                这个页面展示了 Next.js 在 SEO 方面的核心优势
              </p>
              <p className="text-sm text-gray-500 mt-2">
                包含完整的 HTML 结构、语义化标签、结构化数据和优化的元信息
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}