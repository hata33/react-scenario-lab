"use client";

import { useEffect, useState } from "react";

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

export default function DynamicSEODemo() {
	const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	const articles: Article[] = [
		{
			id: 1,
			title: "React 19 新特性完全指南",
			description: "深入了解 React 19 带来的革命性新特性，包括 Actions、use() Hook、服务端组件等。",
			author: "前端技术专家",
			publishDate: "2024-01-20",
			category: "技术教程",
			tags: ["React", "JavaScript", "Web开发"],
			readTime: "15分钟",
		},
		{
			id: 2,
			title: "Next.js 15 最佳实践",
			description: "探索 Next.js 15 的最新功能和最佳实践，提升你的应用性能和开发体验。",
			author: "全栈开发者",
			publishDate: "2024-01-18",
			category: "框架教程",
			tags: ["Next.js", "React", "全栈开发"],
			readTime: "12分钟",
		},
		{
			id: 3,
			title: "TypeScript 高级技巧",
			description: "掌握 TypeScript 的高级特性和最佳实践，提升代码质量和开发效率。",
			author: "TypeScript 专家",
			publishDate: "2024-01-15",
			category: "语言教程",
			tags: ["TypeScript", "类型系统", "编程语言"],
			readTime: "20分钟",
		},
	];

	const handleArticleChange = async (article: Article) => {
		setIsUpdating(true);

		// 模拟元数据更新延迟
		await new Promise((resolve) => setTimeout(resolve, 500));

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
			keywordsMeta.content = article.tags.join(", ");
		}
	};

	useEffect(() => {
		// 初始化时加载第一篇文章
		handleArticleChange(articles[0]);
	}, []);

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900">🔍 动态 SEO 演示</h3>
			<p className="mb-6 text-gray-600">
				React 19 允许在组件中直接定义动态元数据，自动提升到文档 head 中。
			</p>

			<div className="mb-6">
				<h4 className="mb-3 font-semibold">选择文章（查看元数据变化）：</h4>
				<div className="flex flex-wrap gap-2">
					{articles.map((article) => (
						<button
							key={article.id}
							onClick={() => handleArticleChange(article)}
							className={`rounded-md px-4 py-2 transition-colors ${
								currentArticle?.id === article.id
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{article.title}
						</button>
					))}
				</div>
			</div>

			{isUpdating && (
				<div className="py-4 text-center">
					<div className="mx-auto h-6 w-6 animate-spin rounded-full border-blue-600 border-b-2"></div>
					<p className="mt-2 text-gray-500 text-sm">更新元数据中...</p>
				</div>
			)}

			{currentArticle && !isUpdating && (
				<div className="space-y-6">
					{/* 元数据预览 */}
					<div className="rounded-md bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold">📄 当前页面元数据</h4>
						<div className="space-y-2 text-sm">
							<div className="flex items-center gap-2">
								<span className="font-medium">标题:</span>
								<code className="rounded bg-white px-2 py-1">
									{currentArticle.title} - React 19 实验室
								</code>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">描述:</span>
								<code className="rounded bg-white px-2 py-1">{currentArticle.description}</code>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium">关键词:</span>
								<code className="rounded bg-white px-2 py-1">{currentArticle.tags.join(", ")}</code>
							</div>
						</div>
					</div>

					{/* 文章内容 */}
					<div className="rounded-lg border bg-white p-6">
						<article>
							<header className="mb-6">
								<h1 className="mb-3 font-bold text-2xl">{currentArticle.title}</h1>
								<div className="flex items-center gap-4 text-gray-600 text-sm">
									<span>作者: {currentArticle.author}</span>
									<span>发布时间: {currentArticle.publishDate}</span>
									<span>分类: {currentArticle.category}</span>
									<span>阅读时间: {currentArticle.readTime}</span>
								</div>
								<div className="mt-3 flex gap-2">
									{currentArticle.tags.map((tag) => (
										<span
											key={tag}
											className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs"
										>
											{tag}
										</span>
									))}
								</div>
							</header>

							<section className="prose max-w-none">
								<p>{currentArticle.description}</p>
								<p>
									这是文章的详细内容。在 React 19 中，我们可以直接在组件中定义元数据标签，这些标签会自动提升到文档的
									head 部分。
								</p>
								<p>
									当文章内容发生变化时，相关的元数据也会自动更新，确保搜索引擎和社交媒体能够获取到最新、最准确的信息。
								</p>
								<h2>传统方式 vs React 19 方式</h2>
								<p>
									传统方式需要使用 document.title 或第三方库来动态更新元数据，而 React 19 让这个过程变得简单而直观。
								</p>
							</section>
						</article>
					</div>
				</div>
			)}

			<div className="mt-6 rounded-md bg-blue-50 p-4">
				<h4 className="mb-2 font-semibold text-blue-900">动态 SEO 的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm">
					<li>• 组件内定义元数据，逻辑集中</li>
					<li>• 自动提升到 head，无需手动 DOM 操作</li>
					<li>• 支持动态更新，数据变化时自动同步</li>
					<li>• 完整的 HTML5 元数据标签支持</li>
				</ul>
			</div>
		</div>
	);
}