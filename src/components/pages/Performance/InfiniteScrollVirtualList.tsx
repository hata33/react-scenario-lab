import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface NewsItem {
	id: number;
	title: string;
	content: string;
	author: string;
	category: string;
	likes: number;
	comments: number;
	timestamp: string;
	imageUrl?: string;
}

const generateNewsData = (page: number, pageSize: number = 20): NewsItem[] => {
	const categories = [
		"科技",
		"体育",
		"娱乐",
		"财经",
		"教育",
		"健康",
		"旅游",
		"美食",
	];
	const authors = [
		"张记者",
		"李编辑",
		"王评论员",
		"赵主播",
		"钱分析师",
		"孙专家",
	];

	return Array.from({ length: pageSize }, (_, i) => {
		const index = (page - 1) * pageSize + i;
		const category = categories[index % categories.length];
		const author = authors[index % authors.length];

		return {
			id: index + 1,
			title: `${category}新闻：第${index + 1}条重要资讯发布`,
			content: `这是第${index + 1}条新闻的详细内容。本条新闻由${author}报道，主要介绍了${category}领域的最新动态和发展趋势。新闻内容包含了深入的分析和专业的观点，为读者提供了有价值的信息。`,
			author,
			category,
			likes: Math.floor(Math.random() * 1000),
			comments: Math.floor(Math.random() * 200),
			timestamp: new Date(
				Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
			).toISOString(),
			imageUrl:
				index % 3 === 0
					? `https://picsum.photos/seed/news${index}/100/80.jpg`
					: undefined,
		};
	});
};

export function InfiniteScrollVirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 120;
	const [scrollTop, setScrollTop] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [items, setItems] = useState<NewsItem[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	// 初始化数据
	useEffect(() => {
		const initialData = generateNewsData(1, 20);
		setItems(initialData);
	}, []);

	// 过滤数据
	const filteredItems = useMemo(() => {
		if (!selectedCategory) return items;
		return items.filter((item) => item.category === selectedCategory);
	}, [items, selectedCategory]);

	// 获取所有分类
	const categories = useMemo(() => {
		return [...new Set(items.map((item) => item.category))];
	}, [items]);

	// 加载更多数据
	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);

		// 模拟API调用延迟
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const nextPage = currentPage + 1;
		const newData = generateNewsData(nextPage, 20);

		setItems((prev) => [...prev, ...newData]);
		setCurrentPage(nextPage);

		// 模拟数据加载完成
		if (nextPage >= 10) {
			setHasMore(false);
		}

		setLoading(false);
	}, [currentPage, loading, hasMore]);

	// 检测滚动到底部
	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLDivElement>) => {
			const scrollTop = e.currentTarget.scrollTop;
			const scrollHeight = e.currentTarget.scrollHeight;
			const clientHeight = e.currentTarget.clientHeight;

			setScrollTop(scrollTop);

			// 检测是否滚动到底部（距离底部100px时触发）
			if (
				scrollHeight - scrollTop - clientHeight < 100 &&
				!loading &&
				hasMore
			) {
				loadMore();
			}
		},
		[loadMore, loading, hasMore],
	);

	// 计算可见区域
	const containerHeight = 400;
	const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
	const totalHeight = filteredItems.length * rowHeight;

	const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
	const endIndex = Math.min(filteredItems.length, startIndex + visibleCount);
	const offsetY = startIndex * rowHeight;

	const visibleItems = useMemo(
		() => filteredItems.slice(startIndex, endIndex),
		[startIndex, endIndex, filteredItems],
	);

	// 重置数据
	const resetData = useCallback(() => {
		setItems(generateNewsData(1, 20));
		setCurrentPage(1);
		setHasMore(true);
		setLoading(false);
		setScrollTop(0);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">无限滚动虚拟列表</h3>
					<p className="text-muted-foreground text-sm">
						已加载 {items.length} 条新闻，显示 {visibleItems.length} 条
						{selectedCategory && ` (筛选: ${selectedCategory})`}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="rounded border px-3 py-1 text-sm"
					>
						<option value="">所有分类</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					<button
						onClick={resetData}
						className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80"
					>
						重置
					</button>
				</div>
			</div>

			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="relative h-[400px] overflow-auto rounded border bg-background"
			>
				<div style={{ height: totalHeight }}>
					<div style={{ transform: `translateY(${offsetY}px)` }}>
						{visibleItems.map((item) => (
							<div
								key={item.id}
								className="flex gap-4 border-b px-4 py-3 transition-all hover:bg-muted/50"
								style={{ height: rowHeight }}
							>
								{item.imageUrl && (
									<div className="flex-shrink-0">
										<img
											src={item.imageUrl}
											alt={item.title}
											className="h-16 w-20 rounded object-cover"
										/>
									</div>
								)}
								<div className="min-w-0 flex-1">
									<h4 className="mb-1 line-clamp-1 font-medium text-sm">
										{item.title}
									</h4>
									<p className="mb-2 line-clamp-2 text-muted-foreground text-xs">
										{item.content}
									</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3 text-muted-foreground text-xs">
											<span>{item.author}</span>
											<span className="rounded bg-muted px-2 py-0.5">
												{item.category}
											</span>
											<span>
												{new Date(item.timestamp).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center gap-3 text-xs">
											<span className="flex items-center gap-1">
												❤️ {item.likes}
											</span>
											<span className="flex items-center gap-1">
												💬 {item.comments}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 加载状态 */}
				{loading && (
					<div className="absolute right-0 bottom-0 left-0 border-t bg-background/90 p-4 backdrop-blur-sm">
						<div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
							正在加载更多内容...
						</div>
					</div>
				)}

				{/* 没有更多数据 */}
				{!hasMore && !loading && (
					<div className="absolute right-0 bottom-0 left-0 border-t bg-background/90 p-4 backdrop-blur-sm">
						<div className="text-center text-muted-foreground text-sm">
							已经到底了，没有更多内容了
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-3 gap-4 text-sm">
				<div className="space-y-1">
					<span className="font-medium">核心功能</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 无限滚动加载</li>
						<li>• 滚动位置检测</li>
						<li>• 分页数据管理</li>
						<li>• 分类筛选支持</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">性能优化</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 虚拟滚动渲染</li>
						<li>• 分页数据缓存</li>
						<li>• 防抖滚动处理</li>
						<li>• 懒加载优化</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">适用场景</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 社交媒体</li>
						<li>• 新闻资讯</li>
						<li>• 商品列表</li>
						<li>• 图片瀑布流</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
