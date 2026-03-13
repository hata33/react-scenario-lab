import type { ReactNode } from "react";

export interface ThoughtArticle {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	content: ReactNode;
}

export const thoughtsArticles: ThoughtArticle[] = [
	{
		slug: "react-server-components",
		title: "React Server Components 深度解析",
		description: "探索 React Server Components 的核心概念、使用场景以及与客户端组件的区别。",
		category: "React",
		tags: ["React 19", "RSC", "服务端渲染"],
		date: "2025-01-15",
		content: null, // 待添加内容
	},
	{
		slug: "nextjs-app-router",
		title: "Next.js App Router 架构设计",
		description: "深入理解 Next.js App Router 的路由系统、数据获取和渲染策略。",
		category: "Next.js",
		tags: ["Next.js 15", "App Router", "路由"],
		date: "2025-01-10",
		content: null,
	},
	{
		slug: "tailwind-css-4",
		title: "Tailwind CSS 4 新特性解析",
		description: "了解 Tailwind CSS 4 带来的重大变化，包括新的配置方式和性能优化。",
		category: "CSS",
		tags: ["Tailwind CSS", "样式", "性能"],
		date: "2025-01-05",
		content: null,
	},
	{
		slug: "react-compiler",
		title: "React Compiler 自动优化原理",
		description: "解析 React Compiler 如何自动优化组件渲染，减少 useMemo 和 useCallback 的使用。",
		category: "React",
		tags: ["React 19", "Compiler", "性能优化"],
		date: "2024-12-28",
		content: null,
	},
	{
		slug: "web-performance",
		title: "现代 Web 性能优化实践",
		description: "从 Core Web Vitals 到代码分割，全面了解 Web 性能优化的最佳实践。",
		category: "性能",
		tags: ["性能", "优化", "Web Vitals"],
		date: "2024-12-20",
		content: null,
	},
	{
		slug: "typescript-advanced",
		title: "TypeScript 高级类型技巧",
		description: "掌握 TypeScript 的高级类型系统，提升代码的类型安全和开发体验。",
		category: "TypeScript",
		tags: ["TypeScript", "类型系统", "高级技巧"],
		date: "2024-12-15",
		content: null,
	},
];

export async function getArticle(slug: string): Promise<ThoughtArticle | null> {
	return thoughtsArticles.find((article) => article.slug === slug) || null;
}

export async function getAllArticles(): Promise<ThoughtArticle[]> {
	return thoughtsArticles;
}

export async function getArticlesByCategory(category: string): Promise<ThoughtArticle[]> {
	return thoughtsArticles.filter((article) => article.category === category);
}

export async function getArticlesByTag(tag: string): Promise<ThoughtArticle[]> {
	return thoughtsArticles.filter((article) => article.tags.includes(tag));
}

export function getAllCategories(): string[] {
	return Array.from(new Set(thoughtsArticles.map((article) => article.category)));
}

export function getAllTags(): string[] {
	return Array.from(new Set(thoughtsArticles.flatMap((article) => article.tags)));
}
