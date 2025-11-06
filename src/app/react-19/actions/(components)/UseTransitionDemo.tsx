"use client";

import { useState } from "react";

type SearchResult = { id: number; title: string; description: string; category: string };

export default function UseTransitionDemo() {
	const [isPending, setIsPending] = useState(false);
	const [input, setInput] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState("");

	const handleSearch = (value: string) => {
		setInput(value);

		// 使用 transition 模拟非阻塞更新
		setIsPending(true);
		setQuery(value);

		setTimeout(async () => {
			if (!value.trim()) {
				setResults([]);
				setIsPending(false);
				return;
			}

			// 模拟大量数据搜索
			await new Promise((resolve) => setTimeout(resolve, 800));

			// 生成模拟搜索结果
			const mockResults = Array.from({ length: 5 }, (_, i) => ({
				id: i + 1,
				title: `搜索结果 ${i + 1}: ${value}`,
				description: `这是关于 "${value}" 的详细描述内容`,
				category: ["技术", "教程", "文档", "示例"][Math.floor(Math.random() * 4)],
			}));

			setResults(mockResults);
			setIsPending(false);
		}, 100);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<div className="mb-4">
				<input
					type="text"
					value={input}
					onChange={(e) => handleSearch(e.target.value)}
					className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
						isPending ? "border-blue-500" : "border-gray-300"
					}`}
					placeholder="搜索大量数据..."
				/>
				{isPending && (
					<div className="mt-2 flex items-center text-blue-600 text-sm">
						<div className="mr-2 h-4 w-4 animate-spin rounded-full border-blue-600 border-b-2"></div>
						正在搜索...
					</div>
				)}
			</div>

			<div
				className={`max-h-64 space-y-2 overflow-y-auto transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
			>
				{results.length > 0 ? (
					<>
						<p className="text-gray-600 text-sm">
							找到 {results.length} 个结果 for "{query}"
						</p>
						{results.map((result) => (
							<div
								key={result.id}
								className="rounded-md border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
							>
								<h4 className="font-medium text-gray-900">{result.title}</h4>
								<p className="mt-1 text-gray-600 text-sm">{result.description}</p>
								<span className="mt-2 inline-block rounded-md bg-blue-100 px-2 py-1 text-blue-800 text-xs">
									{result.category}
								</span>
							</div>
						))}
					</>
				) : (
					<p className="py-8 text-center text-gray-500">{query ? "没有找到相关结果" : "输入关键词开始搜索"}</p>
				)}
			</div>

			<div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-3">
				<p className="text-orange-700 text-xs">
					⚡ 注意：输入框立即响应，搜索在后台进行。这就是 useTransition 的并发渲染效果！
				</p>
			</div>
		</div>
	);
}
