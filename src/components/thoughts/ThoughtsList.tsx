"use client";

import Link from "next/link";
import type { FC } from "react";
import { thoughtsArticles } from "@/data/thoughts";

interface ThoughtsListProps {
	category?: string;
	tag?: string;
}

const ThoughtsList: FC<ThoughtsListProps> = ({ category, tag }) => {
	let filteredArticles = thoughtsArticles;

	if (category) {
		filteredArticles = filteredArticles.filter((article) => article.category === category);
	}

	if (tag) {
		filteredArticles = filteredArticles.filter((article) => article.tags.includes(tag));
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{filteredArticles.map((article) => (
				<Link
					key={article.slug}
					href={`/thoughts/${article.slug}`}
					className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg active:scale-[0.99]"
				>
					<div className="flex flex-1 flex-col p-6">
						{/* 分类标签 */}
						<div className="mb-3">
							<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-xs">
								{article.category}
							</span>
						</div>

						{/* 标题 */}
						<h3 className="mb-3 font-semibold text-gray-900 text-lg transition-colors group-hover:text-blue-600 md:text-xl">
							{article.title}
						</h3>

						{/* 描述 */}
						<p className="mb-4 flex-1 break-words text-gray-600 text-sm md:text-base">{article.description}</p>

						{/* 标签 */}
						<div className="mb-4 flex flex-wrap gap-2">
							{article.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-600 text-xs"
								>
									{tag}
								</span>
							))}
						</div>

						{/* 底部信息 */}
						<div className="flex items-center justify-between border-gray-100 border-t pt-4">
							<span className="text-gray-500 text-xs">{article.date}</span>
							<span className="flex items-center font-medium text-blue-600 text-sm transition-transform group-hover:translate-x-1">
								阅读更多
								<span className="ml-1">→</span>
							</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ThoughtsList;
