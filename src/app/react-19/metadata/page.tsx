"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function MetadataPage() {
  const [selectedDemo, setSelectedDemo] = useState('dynamic-seo');

  const demos = [
    {
      id: 'dynamic-seo',
      title: '动态 SEO',
      description: '动态设置页面标题、描述和元数据',
      emoji: '🔍',
      difficulty: '初级'
    },
    {
      id: 'social-sharing',
      title: '社交媒体分享',
      description: 'Open Graph 和 Twitter Card 优化',
      emoji: '📱',
      difficulty: '中级'
    },
    {
      id: 'product-metadata',
      title: '电商产品元数据',
      description: '产品页面的结构化数据优化',
      emoji: '🛒',
      difficulty: '中级'
    },
    {
      id: 'blog-seo',
      title: '博客文章 SEO',
      description: '文章页面的完整 SEO 优化',
      emoji: '📝',
      difficulty: '高级'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 max-w-7xl mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">📝</span>
            文档元数据标签
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            React 19 允许在组件树中直接使用 title、meta 等标签，自动提升到 head 中
          </p>
        </div>

        {/* 3W 法则解析 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">🎯 3W 法则解析</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                📋 What (是什么)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                文档元数据标签允许在 React 组件中直接使用 HTML 头部标签，如 title、meta、link 等，这些标签会自动提升到文档的 head 部分。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                🎯 Why (为什么)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                解决动态 SEO 管理复杂、社交媒体分享优化困难的问题。通过在组件中直接定义元数据，简化了 SEO 优化流程。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                ⏰ When (何时用)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                需要动态 SEO、社交媒体优化、页面元数据管理的场景。特别适合电商网站、博客平台、内容管理系统等。
              </p>
            </div>
          </div>
        </div>

        {/* 解决的问题 */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">❌ 解决的问题</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">传统方案的痛点</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>SEO 管理复杂</strong>：需要手动操作 DOM 或使用第三方库</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>社交媒体分享差</strong>：缺乏 Open Graph 和 Twitter Card 支持</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>代码分散</strong>：元数据定义与组件逻辑分离</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>维护困难</strong>：动态内容更新时需要手动同步元数据</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">React 19 的解决方案</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>组件内定义</strong>：直接在组件中声明元数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>自动提升</strong>：标签自动提升到 head 中</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>动态更新</strong>：数据变化时自动更新元数据</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>完整支持</strong>：支持所有标准 HTML 元数据标签</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo 选择器 */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDemo === demo.id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{demo.emoji}</span>
              {demo.title}
              <span className={`ml-2 text-xs px-2 py-1 rounded ${
                demo.difficulty === '初级' ? 'bg-green-100 text-green-800' :
                demo.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {demo.difficulty}
              </span>
            </button>
          ))}
        </div>

        {/* Demo 展示区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {selectedDemo === 'dynamic-seo' && <DynamicSEODemo />}
          {selectedDemo === 'social-sharing' && <SocialSharingDemo />}
          {selectedDemo === 'product-metadata' && <ProductMetadataDemo />}
          {selectedDemo === 'blog-seo' && <BlogSEODemo />}
        </div>
      </div>
    </Layout>
  );
}

// 动态 SEO Demo
function DynamicSEODemo() {
  type Article = {
    id: number;
    title: string;
    description: string;
    author: string;
    publishDate: string;
    category: string;
    tags: string[];
    readTime: string;
  };

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const articles: Article[] = [
    {
      id: 1,
      title: 'React 19 新特性完全指南',
      description: '深入了解 React 19 带来的革命性新特性，包括 Actions、use() Hook、服务端组件等。',
      author: '前端技术专家',
      publishDate: '2024-01-20',
      category: '技术教程',
      tags: ['React', 'JavaScript', 'Web开发'],
      readTime: '15分钟'
    },
    {
      id: 2,
      title: 'Next.js 15 最佳实践',
      description: '探索 Next.js 15 的最新功能和最佳实践，提升你的应用性能和开发体验。',
      author: '全栈开发者',
      publishDate: '2024-01-18',
      category: '框架教程',
      tags: ['Next.js', 'React', '全栈开发'],
      readTime: '12分钟'
    },
    {
      id: 3,
      title: 'TypeScript 高级技巧',
      description: '掌握 TypeScript 的高级特性和最佳实践，提升代码质量和开发效率。',
      author: 'TypeScript 专家',
      publishDate: '2024-01-15',
      category: '语言教程',
      tags: ['TypeScript', '类型系统', '编程语言'],
      readTime: '20分钟'
    }
  ];

  const handleArticleChange = async (article: Article) => {
    setIsUpdating(true);

    // 模拟元数据更新延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    setCurrentArticle(article);
    setIsUpdating(false);

    // 模拟更新页面标题和元数据
    document.title = `${article.title} - React 19 实验室`;

    // 更新描述 meta 标签
    const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (descriptionMeta) {
      descriptionMeta.content = article.description;
    }

    // 更新 keywords meta 标签
    const keywordsMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (keywordsMeta) {
      keywordsMeta.content = article.tags.join(', ');
    }
  };

  useEffect(() => {
    // 初始化时加载第一篇文章
    handleArticleChange(articles[0]);
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🔍 动态 SEO 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        React 19 允许在组件中直接定义动态元数据，自动提升到文档 head 中。
      </p>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">选择文章（查看元数据变化）：</h4>
        <div className="flex flex-wrap gap-2">
          {articles.map(article => (
            <button
              key={article.id}
              onClick={() => handleArticleChange(article)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentArticle?.id === article.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {article.title}
            </button>
          ))}
        </div>
      </div>

      {isUpdating && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">更新元数据中...</p>
        </div>
      )}

      {currentArticle && !isUpdating && (
        <div className="space-y-6">
          {/* 元数据预览 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h4 className="font-semibold mb-3">📄 当前页面元数据</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">标题:</span>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{currentArticle.title} - React 19 实验室</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">描述:</span>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{currentArticle.description}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">关键词:</span>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{currentArticle.tags.join(', ')}</code>
              </div>
            </div>
          </div>

          {/* 文章内容 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <article>
              <header className="mb-6">
                <h1 className="text-2xl font-bold mb-3">{currentArticle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>作者: {currentArticle.author}</span>
                  <span>发布时间: {currentArticle.publishDate}</span>
                  <span>分类: {currentArticle.category}</span>
                  <span>阅读时间: {currentArticle.readTime}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  {currentArticle.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <section className="prose dark:prose-invert max-w-none">
                <p>{currentArticle.description}</p>
                <p>这是文章的详细内容。在 React 19 中，我们可以直接在组件中定义元数据标签，这些标签会自动提升到文档的 head 部分。</p>
                <p>当文章内容发生变化时，相关的元数据也会自动更新，确保搜索引擎和社交媒体能够获取到最新、最准确的信息。</p>
                <h2>传统方式 vs React 19 方式</h2>
                <p>传统方式需要使用 document.title 或第三方库来动态更新元数据，而 React 19 让这个过程变得简单而直观。</p>
              </section>
            </article>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">动态 SEO 的优势：</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• 组件内定义元数据，逻辑集中</li>
          <li>• 自动提升到 head，无需手动 DOM 操作</li>
          <li>• 支持动态更新，数据变化时自动同步</li>
          <li>• 完整的 HTML5 元数据标签支持</li>
        </ul>
      </div>
    </div>
  );
}

// 社交媒体分享 Demo
function SocialSharingDemo() {
  type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    originalPrice: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    category: string;
    instructor: string;
    duration: string;
    students: number;
  };

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'React 19 完整课程',
      description: '从零开始学习 React 19，掌握最新特性和最佳实践',
      price: '￥299',
      originalPrice: '￥599',
      rating: 4.9,
      reviews: 256,
      imageUrl: 'https://picsum.photos/seed/react19-course/600/400.jpg',
      category: '编程课程',
      instructor: '前端专家',
      duration: '20小时',
      students: 15234
    },
    {
      id: 2,
      name: 'Next.js 全栈开发',
      description: '使用 Next.js 15 构建现代化的全栈 Web 应用',
      price: '￥399',
      originalPrice: '￥799',
      rating: 4.8,
      reviews: 189,
      imageUrl: 'https://picsum.photos/seed/nextjs-course/600/400.jpg',
      category: '框架课程',
      instructor: '全栈工程师',
      duration: '25小时',
      students: 12456
    },
    {
      id: 3,
      name: 'TypeScript 进阶教程',
      description: '深入学习 TypeScript 的高级特性和企业级应用',
      price: '￥199',
      originalPrice: '￥399',
      rating: 4.7,
      reviews: 142,
      imageUrl: 'https://picsum.photos/seed/typescript-course/600/400.jpg',
      category: '语言课程',
      instructor: 'TypeScript 专家',
      duration: '15小时',
      students: 8976
    }
  ];

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, []);

  const handleProductChange = (product: Product) => {
    setSelectedProduct(product);

    // 模拟更新 Open Graph 和 Twitter Card 元数据
    updateSocialMetadata(product);
  };

  const updateSocialMetadata = (product: Product) => {
    // Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) ogTitle.content = product.name;

    const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDescription) ogDescription.content = product.description;

    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (ogImage) ogImage.content = product.imageUrl;

    const ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    if (ogType) ogType.content = 'product';

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) ogUrl.content = `https://react19-lab.example.com/products/${product.id}`;

    // Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
    if (twitterTitle) twitterTitle.content = product.name;

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
    if (twitterDescription) twitterDescription.content = product.description;

    const twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
    if (twitterImage) twitterImage.content = product.imageUrl;

    const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
    if (twitterCard) twitterCard.content = 'summary_large_image';
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📱 社交媒体分享演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        优化 Open Graph 和 Twitter Card，提升社交媒体分享效果。
      </p>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">选择产品（查看社交分享元数据）：</h4>
        <div className="flex flex-wrap gap-2">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => handleProductChange(product)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedProduct?.id === product.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="space-y-6">
          {/* 社交媒体预览 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <h4 className="font-semibold mb-3">📘 Open Graph 预览</h4>
              <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                <div className="text-xs text-gray-500 mb-2">facebook.com</div>
                <div className="space-y-3">
                  <h5 className="font-bold text-lg">{selectedProduct.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {selectedProduct.description}
                  </p>
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600 font-semibold">￥{selectedProduct.price}</span>
                    <span className="text-xs text-gray-500 line-through">￥{selectedProduct.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <h4 className="font-semibold mb-3">🐦 Twitter Card 预览</h4>
              <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                <div className="text-xs text-gray-500 mb-2">twitter.com</div>
                <div className="space-y-3">
                  <h5 className="font-bold">{selectedProduct.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {selectedProduct.description}
                  </p>
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-semibold">￥{selectedProduct.price}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>⭐ {selectedProduct.rating}</span>
                      <span>({selectedProduct.reviews} 评价)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 产品详情 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedProduct.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-green-600">{selectedProduct.price}</span>
                  <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    50% OFF
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{selectedProduct.rating}</span>
                    <span className="text-sm text-gray-500">({selectedProduct.reviews} 评价)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedProduct.students} 名学生
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• 讲师: {selectedProduct.instructor}</p>
                  <p>• 时长: {selectedProduct.duration}</p>
                  <p>• 分类: {selectedProduct.category}</p>
                </div>

                <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  立即购买
                </button>
              </div>
            </div>
          </div>

          {/* 元数据代码示例 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <h4 className="font-semibold mb-3">💻 元数据代码示例</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
              <code>{`<title>${selectedProduct.name} - React 19 实验室</title>
<meta name="description" content="${selectedProduct.description}" />

<!-- Open Graph -->
<meta property="og:title" content="${selectedProduct.name}" />
<meta property="og:description" content="${selectedProduct.description}" />
<meta property="og:image" content="${selectedProduct.imageUrl}" />
<meta property="og:type" content="product" />
<meta property="og:url" content="https://react19-lab.example.com/products/${selectedProduct.id}" />

<!-- Twitter Card -->
<meta name="twitter:title" content="${selectedProduct.name}" />
<meta name="twitter:description" content="${selectedProduct.description}" />
<meta name="twitter:image" content="${selectedProduct.imageUrl}" />
<meta name="twitter:card" content="summary_large_image" />`}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">社交媒体优化的优势：</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• 自动生成 Open Graph 和 Twitter Card 元数据</li>
          <li>• 提升社交媒体分享的视觉效果</li>
          <li>• 支持动态内容，实时更新分享信息</li>
          <li>• 完整的社交平台兼容性</li>
        </ul>
      </div>
    </div>
  );
}

// 产品元数据 Demo
function ProductMetadataDemo() {
  type ProductData = {
    name: string;
    brand: string;
    price: string;
    currency: string;
    availability: string;
    condition: string;
    category: string;
    description: string;
    features: string[];
    specifications: {
      screen: string;
      battery: string;
      waterproof: string;
      connectivity: string;
    };
    images: string[];
    reviews: number;
    reviewCount: number;
    sku: string;
  };

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const defaultProduct: ProductData = {
    name: '智能手表 Pro Max',
    brand: 'TechBrand',
    price: '￥2,999',
    currency: 'CNY',
    availability: 'InStock',
    condition: 'New',
    category: 'Electronics',
    description: '最新一代智能手表，配备健康监测、运动追踪、智能通知等功能。',
    features: ['心率监测', 'GPS定位', '防水设计', '长续航'],
    specifications: {
      screen: '1.4英寸 AMOLED',
      battery: '7天续航',
      waterproof: 'IP68 防水',
      connectivity: '蓝牙5.0, WiFi'
    },
    images: [
      'https://picsum.photos/seed/watch1/600/400.jpg',
      'https://picsum.photos/seed/watch2/600/400.jpg'
    ],
    reviews: 4.6,
    reviewCount: 342,
    sku: 'TB-WATCH-PRO-MAX-2024'
  };

  useEffect(() => {
    setProductData(defaultProduct);
  }, []);

  const handleUpdate = async (updates: Partial<ProductData>) => {
    setIsEditing(true);

    // 模拟更新延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    setProductData((prev: ProductData | null) => prev ? { ...prev, ...updates } : null);
    setIsEditing(false);

    // 模拟更新结构化数据
    updateStructuredData(productData ? { ...productData, ...updates } : null);
  };

  const updateStructuredData = (data: ProductData | null) => {
    if (!data) return;

    // JSON-LD 结构化数据
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": data.name,
      "brand": {
        "@type": "Brand",
        "name": data.brand
      },
      "description": data.description,
      "category": data.category,
      "offers": {
        "@type": "Offer",
        "price": data.price.replace('￥', ''),
        "priceCurrency": data.currency,
        "availability": data.availability === 'InStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        "seller": {
          "@type": "Organization",
          "name": "React 19 实验室"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.reviews,
        "reviewCount": data.reviewCount
      }
    };

    // 创建或更新 JSON-LD script 标签
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  };

  if (!productData) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🛒 电商产品元数据演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        电商产品页面的完整 SEO 和结构化数据优化。
      </p>

      {/* 产品编辑器 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border mb-6">
        <h4 className="font-semibold mb-4">产品信息编辑器</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">产品名称</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => handleUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">价格</label>
            <input
              type="text"
              value={productData.price}
              onChange={(e) => handleUpdate({ price: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">库存状态</label>
            <select
              value={productData.availability}
              onChange={(e) => handleUpdate({ availability: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="InStock">有库存</option>
              <option value="OutOfStock">缺货</option>
              <option value="PreOrder">预售</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">评分</label>
            <input
              type="number"
              value={productData.reviews}
              onChange={(e) => handleUpdate({ reviews: parseFloat(e.target.value) })}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">更新元数据中...</p>
        </div>
      )}

      {/* 产品预览 */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-4">🛍️ 产品展示</h4>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">{productData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{productData.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-green-600">{productData.price}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                productData.availability === 'InStock'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {productData.availability === 'InStock' ? '有库存' : '缺货'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span>{productData.reviews}</span>
                <span className="text-gray-500">({productData.reviewCount} 评价)</span>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">产品特色：</p>
              <div className="flex flex-wrap gap-2">
                {productData.features.map((feature, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-semibold mb-4">📊 搜索引擎预览</h4>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <div className="text-green-600 mb-2">🔍 Google 搜索结果</div>
            <div className="space-y-2">
              <div className="text-blue-800 dark:text-blue-400 text-lg font-medium">
                {productData.name} - {productData.brand} | React 19 实验室
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {productData.description}
              </div>
              <div className="text-green-600 text-sm">
                {productData.price} - {productData.availability === 'InStock' ? '✅ 有库存' : '❌ 缺货'}
              </div>
              <div className="text-yellow-500 text-xs">
                ⭐ {productData.reviews}/5 ({productData.reviewCount} 评价)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 元数据代码 */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
        <h4 className="font-semibold mb-3">📝 生成的元数据代码</h4>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
          <code>{`<!-- 基本元数据 -->
<title>${productData.name} - ${productData.brand} | React 19 实验室</title>
<meta name="description" content="${productData.description}" />
<meta name="keywords" content="${productData.features.join(', ')}" />

<!-- 产品元数据 -->
<meta property="product:brand" content="${productData.brand}" />
<meta property="product:price:amount" content="${productData.price.replace('￥', '')}" />
<meta property="product:price:currency" content="${productData.currency}" />
<meta property="product:availability" content="${productData.availability.toLowerCase()}" />
<meta property="product:condition" content="${productData.condition.toLowerCase()}" />
<meta property="product:category" content="${productData.category}" />

<!-- 评分信息 -->
<meta property="product:rating:value" content="${productData.reviews}" />
<meta property="product:rating:count" content="${productData.reviewCount}" />

<!-- JSON-LD 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "${productData.name}",
  "brand": {
    "@type": "Brand",
    "name": "${productData.brand}"
  },
  "description": "${productData.description}",
  "offers": {
    "@type": "Offer",
    "price": "${productData.price.replace('￥', '')}",
    "priceCurrency": "${productData.currency}",
    "availability": "${productData.availability === 'InStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}"
  }
}
</script>`}</code>
        </pre>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">电商元数据的优势：</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• 支持 Schema.org 结构化数据，提升搜索结果展示</li>
          <li>• 自动生成商品、价格、库存等电商专用元数据</li>
          <li>• 动态更新价格和库存信息</li>
          <li>• 完整的电商 SEO 优化支持</li>
        </ul>
      </div>
    </div>
  );
}

// 博客 SEO Demo
function BlogSEODemo() {
  type BlogPost = {
    title: string;
    description: string;
    author: string;
    publishDate: string;
    modifiedDate: string;
    category: string;
    tags: string[];
    readTime: number;
    wordCount: number;
    language: string;
    coverImage: string;
    thumbnailImage: string;
    featuredImage: string;
    altText: string;
    tableOfContents: string[];
    codeLanguages: string[];
    difficulty: string;
    estimatedReading: number;
    authorBio: string;
    authorTwitter: string;
    canonicalUrl: string;
  };

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [seoScore, setSeoScore] = useState(0);

  const defaultPost: BlogPost = {
    title: '深入理解 React 19 的 use() Hook',
    description: '全面解析 React 19 中新引入的 use() Hook，了解其工作原理、使用场景和最佳实践。',
    author: 'React 专家',
    publishDate: '2024-01-20T10:00:00Z',
    modifiedDate: '2024-01-22T15:30:00Z',
    category: '技术教程',
    tags: ['React', 'React 19', 'Hooks', 'JavaScript', 'Web开发'],
    readTime: 12,
    wordCount: 2500,
    language: 'zh-CN',
    coverImage: 'https://picsum.photos/seed/react-use-hook/1200/630.jpg',
    thumbnailImage: 'https://picsum.photos/seed/react-use-thumb/600/300.jpg',
    featuredImage: 'https://picsum.photos/seed/react-featured/800/400.jpg',
    altText: 'React 19 use() Hook 代码示例',
    tableOfContents: [
      '什么是 use() Hook',
      'use() Hook 的工作原理',
      '使用场景和最佳实践',
      '常见问题和解决方案'
    ],
    codeLanguages: ['JavaScript', 'TypeScript', 'JSX'],
    difficulty: 'intermediate',
    estimatedReading: 12,
    authorBio: '资深前端工程师，专注于 React 生态技术研究和分享',
    authorTwitter: '@react_expert',
    canonicalUrl: 'https://react19-lab.example.com/blog/use-hook-guide'
  };

  useEffect(() => {
    setBlogPost(defaultPost);
    calculateSeoScore(defaultPost);
  }, []);

  const calculateSeoScore = (post: BlogPost) => {
    let score = 0;

    // 标题长度检查 (30-60 字符最佳)
    if (post.title.length >= 30 && post.title.length <= 60) score += 15;
    else if (post.title.length >= 20 && post.title.length <= 70) score += 10;

    // 描述长度检查 (120-160 字符最佳)
    if (post.description.length >= 120 && post.description.length <= 160) score += 15;
    else if (post.description.length >= 100 && post.description.length <= 200) score += 10;

    // 关键词数量 (3-5 个最佳)
    if (post.tags.length >= 3 && post.tags.length <= 5) score += 10;

    // 作者信息
    if (post.author) score += 10;
    if (post.authorBio) score += 5;
    if (post.authorTwitter) score += 5;

    // 图片 Alt 文本
    if (post.altText) score += 10;

    // 目录结构
    if (post.tableOfContents.length > 0) score += 10;

    // 阅读时间
    if (post.readTime > 0) score += 5;

    // 修改日期
    if (post.modifiedDate) score += 5;

    // 语言设置
    if (post.language) score += 5;

    // 规范 URL
    if (post.canonicalUrl) score += 10;

    setSeoScore(score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'SEO 优化优秀';
    if (score >= 60) return 'SEO 优化良好';
    return '需要改进 SEO';
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📝 博客文章 SEO 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        博客文章的完整 SEO 优化，包括元数据、结构化数据和可读性优化。
      </p>

      {blogPost && (
        <div className="space-y-6">
          {/* SEO 分数 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">📊 SEO 优化评分</h4>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>
                  {seoScore}/100
                </div>
                <div className={`text-sm ${getScoreColor(seoScore)}`}>
                  {getScoreMessage(seoScore)}
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${
                      seoScore >= 80 ? 'bg-green-500' :
                      seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${seoScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="grid grid-cols-2 gap-2">
                <div>• 标题长度: {blogPost.title.length} 字符</div>
                <div>• 描述长度: {blogPost.description.length} 字符</div>
                <div>• 关键词数量: {blogPost.tags.length}</div>
                <div>• 阅读时间: {blogPost.readTime} 分钟</div>
              </div>
            </div>
          </div>

          {/* 文章预览 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <article>
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-3">{blogPost.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {blogPost.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>作者: {blogPost.author}</span>
                  <span>发布时间: {new Date(blogPost.publishDate).toLocaleDateString()}</span>
                  <span>分类: {blogPost.category}</span>
                  <span>阅读时间: {blogPost.readTime} 分钟</span>
                  <span>字数: {blogPost.wordCount}</span>
                </div>

                <div className="flex gap-2 mb-4">
                  {blogPost.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="aspect-video mb-4">
                  <img
                    src={blogPost.coverImage}
                    alt={blogPost.altText}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </header>

              <section className="prose dark:prose-invert max-w-none">
                <p>{blogPost.description}</p>

                <h2>目录</h2>
                <ul>
                  {blogPost.tableOfContents.map((item, index) => (
                    <li key={index}>
                      <a href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}>
                        {index + 1}. {item}
                      </a>
                    </li>
                  ))}
                </ul>

                <p>这是文章的详细内容。在 React 19 中，我们可以通过组件直接定义所有必要的元数据，确保搜索引擎能够准确理解和索引我们的内容。</p>

                <h3>技术细节</h3>
                <p>本文涉及的技术栈包括：</p>
                <ul>
                  {blogPost.codeLanguages.map(lang => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>

                <p>文章难度：<strong>{blogPost.difficulty}</strong></p>
                <p>预计阅读时间：<strong>{blogPost.readTime} 分钟</strong></p>
              </section>

              <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      作者: {blogPost.author}
                    </span>
                    {blogPost.authorTwitter && (
                      <a
                        href={`https://twitter.com/${blogPost.authorTwitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-sm"
                      >
                        @{blogPost.authorTwitter}
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    最后更新: {new Date(blogPost.modifiedDate).toLocaleDateString()}
                  </div>
                </div>
                {blogPost.authorBio && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>关于作者:</strong> {blogPost.authorBio}
                    </p>
                  </div>
                )}
              </footer>
            </article>
          </div>

          {/* 元数据代码 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
            <h4 className="font-semibold mb-3">📝 完整的博客元数据</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
              <code>{`<!-- 文章基础元数据 -->
<title>${blogPost.title} - React 19 实验室</title>
<meta name="description" content="${blogPost.description}" />
<meta name="keywords" content="${blogPost.tags.join(', ')}" />
<meta name="author" content="${blogPost.author}" />
<meta name="author:twitter" content="${blogPost.authorTwitter}" />

<!-- 发布和修改时间 -->
<meta name="article:published_time" content="${blogPost.publishDate}" />
<meta name="article:modified_time" content="${blogPost.modifiedDate}" />

<!-- 文章类型和分类 -->
<meta name="article:section" content="${blogPost.category}" />
<meta name="article:tag" content="${blogPost.tags.join(', ')}" />

<!-- 阅读信息 -->
<meta name="article:reading_time" content="${blogPost.readTime}" />
<meta name="word_count" content="${blogPost.wordCount}" />
<meta name="language" content="${blogPost.language}" />

<!-- 图片元数据 -->
<meta name="image" content="${blogPost.coverImage}" />
<meta name="image:alt" content="${blogPost.altText}" />
<meta name="og:image" content="${blogPost.coverImage}" />
<meta name="og:image:alt" content="${blogPost.altText}" />
<meta name="twitter:image" content="${blogPost.coverImage}" />
<meta name="twitter:image" content="${blogPost.coverImage}" />

<!-- 规范 URL -->
<link rel="canonical" href="${blogPost.canonicalUrl}" />
<meta property="og:url" content="${blogPost.canonicalUrl}" />

<!-- 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${blogPost.title}",
  "description": "${blogPost.description}",
  "image": "${blogPost.coverImage}",
  "author": {
    "@type": "Person",
    "name": "${blogPost.author}",
    "url": "https://twitter.com/${blogPost.authorTwitter}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "React 19 实验室"
  },
  "datePublished": "${blogPost.publishDate}",
  "dateModified": "${blogPost.modifiedDate}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${blogPost.canonicalUrl}"
  }
}
</script>`}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">博客 SEO 的优势：</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• 支持完整的文章元数据标准（article:published_time, article:tag 等）</li>
          <li>• 自动生成结构化数据，提升搜索结果展示效果</li>
          <li>• 支持多语言和国际化</li>
          <li>• 包含作者信息和社交媒体链接</li>
        </ul>
      </div>
    </div>
  );
}