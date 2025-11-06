"use client";

import { useState } from "react";

export default function ServerFunctionsSearchDemo() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Array<{ id: number; title: string; description: string }>>([]);
	const [isSearching, setIsSearching] = useState(false);

	const searchData = async (searchQuery: string) => {
		// 模拟 Server Function 搜索
		await new Promise((resolve) => setTimeout(resolve, 1200));

		if (!searchQuery.trim()) {
			return [];
		}

		// 模拟搜索结果
		const mockData = [
			{ id: 1, title: "React 19 完整指南", description: "深入学习 React 19 的新特性和最佳实践" },
			{ id: 2, title: "现代前端开发", description: "掌握现代前端开发的核心技术和工具" },
			{ id: 3, title: "TypeScript 高级用法", description: "探索 TypeScript 的高级类型系统和应用" },
			{ id: 4, title: "性能优化实战", description: "学习 Web 应用性能优化的实用技巧" },
		];

		return mockData.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	};

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSearching(true);

		const searchResults = await searchData(query);
		setResults(searchResults);
		setIsSearching(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔍 服务端数据搜索</h5>
			<form onSubmit={handleSearch} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">搜索关键词</label>
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						disabled={isSearching}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="输入搜索关键词..."
					/>
				</div>

				<button
					type="submit"
					disabled={isSearching || !query.trim()}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isSearching || !query.trim()
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isSearching ? "搜索中..." : "🔍 搜索"}
				</button>

				{results.length > 0 && (
					<div className="mt-4 space-y-2">
						<h6 className="font-medium text-gray-900">搜索结果：</h6>
						{results.map((result) => (
							<div key={result.id} className="rounded-md border border-gray-200 bg-white p-3">
								<h6 className="font-medium text-gray-900">{result.title}</h6>
								<p className="text-gray-600 text-sm">{result.description}</p>
							</div>
						))}
					</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：试试搜索 "React" 或 "TypeScript"</div>
			</form>
		</div>
	);
}
