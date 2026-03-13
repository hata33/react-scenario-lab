"use client";

interface FilterBarProps {
	categories: string[];
	selectedCategory: string;
	searchQuery: string;
	onCategoryChange: (category: string) => void;
	onSearchChange: (query: string) => void;
}

/**
 * 过滤器栏内容块
 * 包含分类按钮和搜索框
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FilterBar({
	categories,
	selectedCategory,
	searchQuery,
	onCategoryChange,
	onSearchChange,
}: FilterBarProps) {
	return (
		<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<div className="flex flex-wrap gap-2">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => onCategoryChange(category)}
						className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 font-medium text-sm transition-all active:scale-95 md:px-4 ${
							selectedCategory === category
								? "bg-blue-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-100"
						}`}
					>
						{category}
					</button>
				))}
			</div>
			<div className="relative w-full sm:w-auto">
				<input
					type="text"
					placeholder="搜索特性..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="min-h-[44px] w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:w-64"
				/>
				<svg
					className="absolute top-3 left-3 h-5 w-5 text-gray-400 sm:top-2.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
		</div>
	);
}
