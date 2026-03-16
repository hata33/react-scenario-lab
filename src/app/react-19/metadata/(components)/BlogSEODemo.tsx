"use client";

import { useEffect, useState } from "react";

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

export default function BlogSEODemo() {
	const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
	const [seoScore, setSeoScore] = useState(0);

	const defaultPost: BlogPost = {
		title: "深入理解 React 19 的 use() Hook",
		description: "全面解析 React 19 中新引入的 use() Hook，了解其工作原理、使用场景和最佳实践。",
		author: "React 专家",
		publishDate: "2024-01-20T10:00:00Z",
		modifiedDate: "2024-01-22T15:30:00Z",
		category: "技术教程",
		tags: ["React", "React 19", "Hooks", "JavaScript", "Web开发"],
		readTime: 12,
		wordCount: 2500,
		language: "zh-CN",
		coverImage: "https://picsum.photos/seed/react-use-hook/1200/630.jpg",
		thumbnailImage: "https://picsum.photos/seed/react-use-thumb/600/300.jpg",
		featuredImage: "https://picsum.photos/seed/react-featured/800/400.jpg",
		altText: "React 19 use() Hook 代码示例",
		tableOfContents: ["什么是 use() Hook", "use() Hook 的工作原理", "使用场景和最佳实践", "常见问题和解决方案"],
		codeLanguages: ["JavaScript", "TypeScript", "JSX"],
		difficulty: "intermediate",
		estimatedReading: 12,
		authorBio: "资深前端工程师，专注于 React 生态技术研究和分享",
		authorTwitter: "@react_expert",
		canonicalUrl: "https://react19-lab.example.com/blog/use-hook-guide",
	};

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

	useEffect(() => {
		setBlogPost(defaultPost);
		calculateSeoScore(defaultPost);
	}, [calculateSeoScore]);

	const getScoreColor = (score: number) => {
		if (score >= 80) return "text-green-600";
		if (score >= 60) return "text-yellow-600";
		return "text-red-600";
	};

	const getScoreMessage = (score: number) => {
		if (score >= 80) return "SEO 优化优秀";
		if (score >= 60) return "SEO 优化良好";
		return "需要改进 SEO";
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900">📝 博客文章 SEO 演示</h3>
			<p className="mb-6 text-gray-600">博客文章的完整 SEO 优化，包括元数据、结构化数据和可读性优化。</p>

			{blogPost && (
				<div className="space-y-6">
					{/* SEO 分数 */}
					<div className="rounded-lg border bg-white p-6">
						<h4 className="mb-4 font-semibold">📊 SEO 优化评分</h4>
						<div className="flex items-center gap-4">
							<div className="text-center">
								<div className={`font-bold text-3xl ${getScoreColor(seoScore)}`}>{seoScore}/100</div>
								<div className={`text-sm ${getScoreColor(seoScore)}`}>{getScoreMessage(seoScore)}</div>
							</div>
							<div className="flex-1">
								<div className="h-4 rounded-full bg-gray-200">
									<div
										className={`h-4 rounded-full transition-all duration-500 ${
											seoScore >= 80 ? "bg-green-500" : seoScore >= 60 ? "bg-yellow-500" : "bg-red-500"
										}`}
										style={{ width: `${seoScore}%` }}
									></div>
								</div>
							</div>
						</div>

						<div className="mt-4 text-gray-600 text-sm">
							<div className="grid grid-cols-2 gap-2">
								<div>• 标题长度: {blogPost.title.length} 字符</div>
								<div>• 描述长度: {blogPost.description.length} 字符</div>
								<div>• 关键词数量: {blogPost.tags.length}</div>
								<div>• 阅读时间: {blogPost.readTime} 分钟</div>
							</div>
						</div>
					</div>

					{/* 文章预览 */}
					<div className="rounded-lg border bg-white p-6">
						<article>
							<header className="mb-6">
								<h1 className="mb-3 font-bold text-3xl">{blogPost.title}</h1>
								<p className="mb-4 text-gray-600 text-lg">{blogPost.description}</p>

								<div className="mb-4 flex items-center gap-4 text-gray-600 text-sm">
									<span>作者: {blogPost.author}</span>
									<span>发布时间: {new Date(blogPost.publishDate).toLocaleDateString()}</span>
									<span>分类: {blogPost.category}</span>
									<span>阅读时间: {blogPost.readTime} 分钟</span>
									<span>字数: {blogPost.wordCount}</span>
								</div>

								<div className="mb-4 flex gap-2">
									{blogPost.tags.map((tag) => (
										<span key={tag} className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
											{tag}
										</span>
									))}
								</div>

								<div className="mb-4 aspect-video">
									<img
										src={blogPost.coverImage}
										alt={blogPost.altText}
										className="h-full w-full rounded-lg object-cover"
									/>
								</div>
							</header>

							<section className="prose max-w-none">
								<p>{blogPost.description}</p>

								<h2>目录</h2>
								<ul>
									{blogPost.tableOfContents.map((item, index) => (
										<li key={index}>
											<a href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}>
												{index + 1}. {item}
											</a>
										</li>
									))}
								</ul>

								<p>
									这是文章的详细内容。在 React 19
									中，我们可以通过组件直接定义所有必要的元数据，确保搜索引擎能够准确理解和索引我们的内容。
								</p>

								<h3>技术细节</h3>
								<p>本文涉及的技术栈包括：</p>
								<ul>
									{blogPost.codeLanguages.map((lang) => (
										<li key={lang}>{lang}</li>
									))}
								</ul>

								<p>
									文章难度：<strong>{blogPost.difficulty}</strong>
								</p>
								<p>
									预计阅读时间：<strong>{blogPost.readTime} 分钟</strong>
								</p>
							</section>

							<footer className="mt-8 border-gray-200 border-t pt-6">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<span className="text-gray-600 text-sm">作者: {blogPost.author}</span>
										{blogPost.authorTwitter && (
											<a
												href={`https://twitter.com/${blogPost.authorTwitter}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-500 text-sm hover:text-blue-600"
											>
												@{blogPost.authorTwitter}
											</a>
										)}
									</div>
									<div className="text-gray-500 text-sm">
										最后更新: {new Date(blogPost.modifiedDate).toLocaleDateString()}
									</div>
								</div>
								{blogPost.authorBio && (
									<div className="mt-4 rounded bg-gray-50 p-4">
										<p className="text-gray-600 text-sm">
											<strong>关于作者:</strong> {blogPost.authorBio}
										</p>
									</div>
								)}
							</footer>
						</article>
					</div>

					{/* 元数据代码 */}
					<div className="rounded-md bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold">📝 完整的博客元数据</h4>
						<pre className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100 text-xs">
							<code>{`<!-- 文章基础元数据 -->
<title>${blogPost.title} - React 19 实验室</title>
<meta name="description" content="${blogPost.description}" />
<meta name="keywords" content="${blogPost.tags.join(", ")}" />
<meta name="author" content="${blogPost.author}" />
<meta name="author:twitter" content="${blogPost.authorTwitter}" />

<!-- 发布和修改时间 -->
<meta name="article:published_time" content="${blogPost.publishDate}" />
<meta name="article:modified_time" content="${blogPost.modifiedDate}" />

<!-- 文章类型和分类 -->
<meta name="article:section" content="${blogPost.category}" />
<meta name="article:tag" content="${blogPost.tags.join(", ")}" />

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

			<div className="mt-6 rounded-md bg-blue-50 p-4">
				<h4 className="mb-2 font-semibold text-blue-900">博客 SEO 的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm">
					<li>• 支持完整的文章元数据标准（article:published_time, article:tag 等）</li>
					<li>• 自动生成结构化数据，提升搜索结果展示效果</li>
					<li>• 支持多语言和国际化</li>
					<li>• 包含作者信息和社交媒体链接</li>
				</ul>
			</div>
		</div>
	);
}
