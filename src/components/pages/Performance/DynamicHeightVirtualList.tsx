import { useCallback, useMemo, useRef, useState } from "react";

const generateRandomText = (minWords: number, maxWords: number) => {
	const words = [
		"React",
		"Vue",
		"Angular",
		"Svelte",
		"Next.js",
		"Nuxt.js",
		"TypeScript",
		"JavaScript",
		"虚拟列表",
		"性能优化",
		"前端开发",
		"组件设计",
		"用户体验",
		"响应式设计",
		"状态管理",
		"路由管理",
		"样式系统",
		"构建工具",
		"测试框架",
		"部署方案",
		"代码规范",
		"项目架构",
		"设计模式",
		"算法优化",
		"数据结构",
		"网络请求",
	];

	const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
	const selectedWords = [];

	for (let i = 0; i < wordCount; i++) {
		selectedWords.push(words[Math.floor(Math.random() * words.length)]);
	}

	return `${selectedWords.join("，")}。`;
};

const DATA = Array.from({ length: 5000 }).map((_, i) => ({
	id: i + 1,
	title: `动态内容 ${i + 1}`,
	content: generateRandomText(3, 15),
	author: ["张三", "李四", "王五", "赵六", "钱七"][i % 5],
	timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

export function DynamicHeightVirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [itemHeights, setItemHeights] = useState<Record<number, number>>({});
	const [measuredItems, setMeasuredItems] = useState<Set<number>>(new Set());
	const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

	// 计算总高度
	const totalHeight = useMemo(() => {
		return DATA.reduce((total, item) => {
			return total + (itemHeights[item.id] || 80); // 默认高度 80px
		}, 0);
	}, [itemHeights]);

	// 计算可见项目
	const visibleItems = useMemo(() => {
		const containerHeight = 400;
		let currentHeight = 0;
		let startIndex = 0;
		let endIndex = 0;

		// 找到起始位置
		for (let i = 0; i < DATA.length; i++) {
			const itemHeight = itemHeights[DATA[i].id] || 80;
			if (currentHeight + itemHeight > scrollTop) {
				startIndex = Math.max(0, i - 2); // 预渲染2个
				break;
			}
			currentHeight += itemHeight;
		}

		// 找到结束位置
		currentHeight = 0;
		for (let i = 0; i < DATA.length; i++) {
			const itemHeight = itemHeights[DATA[i].id] || 80;
			if (currentHeight > scrollTop + containerHeight) {
				endIndex = Math.min(DATA.length, i + 2); // 预渲染2个
				break;
			}
			currentHeight += itemHeight;
		}

		if (endIndex === 0) endIndex = DATA.length;

		const items = [];
		let offsetY = 0;

		for (let i = 0; i < startIndex; i++) {
			offsetY += itemHeights[DATA[i].id] || 80;
		}

		for (let i = startIndex; i < endIndex; i++) {
			const item = DATA[i];
			const height = itemHeights[item.id] || 80;
			items.push({ ...item, offsetY, height });
			offsetY += height;
		}

		return items;
	}, [scrollTop, itemHeights]);

	const measureItem = useCallback(
		(id: number, element: HTMLDivElement | null) => {
			if (element && !measuredItems.has(id)) {
				const height = element.getBoundingClientRect().height;
				setItemHeights((prev) => ({ ...prev, [id]: height }));
				setMeasuredItems((prev) => new Set([...prev, id]));
			}
		},
		[measuredItems],
	);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">动态高度虚拟列表</h3>
					<p className="text-muted-foreground text-sm">
						共 {DATA.length.toLocaleString()} 条数据，已测量 {measuredItems.size} 项高度
					</p>
				</div>
				<div className="text-muted-foreground text-sm">总高度: {Math.round(totalHeight)}px</div>
			</div>

			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="relative h-[400px] overflow-auto rounded border bg-background"
			>
				<div style={{ height: totalHeight }}>
					{visibleItems.map((item) => (
						<div
							key={item.id}
							ref={(el) => {
								itemRefs.current[item.id] = el;
								measureItem(item.id, el);
							}}
							className="absolute right-0 left-0 border-b px-4 py-3 transition-all hover:bg-muted/50"
							style={{ top: `${item.offsetY}px` }}
						>
							<div className="mb-2 flex items-start justify-between">
								<h4 className="font-medium">{item.title}</h4>
								<span className="text-muted-foreground text-xs">{new Date(item.timestamp).toLocaleDateString()}</span>
							</div>
							<p className="mb-2 text-muted-foreground text-sm leading-relaxed">{item.content}</p>
							<div className="flex items-center justify-between">
								<span className="rounded bg-muted px-2 py-1 text-xs">作者: {item.author}</span>
								<span className="text-muted-foreground text-xs">高度: {Math.round(item.height)}px</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-sm">
				<div className="space-y-1">
					<span className="font-medium">技术挑战</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 动态测量项目高度</li>
						<li>• 缓存已测量高度</li>
						<li>• 避免重复测量</li>
						<li>• 精确计算位置</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">优化策略</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 首次渲染默认高度</li>
						<li>• 渐进式测量</li>
						<li>• 预渲染缓冲项目</li>
						<li>• 滚动位置缓存</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">适用场景</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 动态内容列表</li>
						<li>• 评论系统</li>
						<li>• 社交媒体</li>
						<li>• 消息应用</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
