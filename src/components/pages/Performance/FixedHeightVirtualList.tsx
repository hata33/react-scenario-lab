import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DATA = Array.from({ length: 100000 }).map((_, i) => ({
	id: i + 1,
	name: `用户 ${i + 1}`,
	email: `user${i + 1}@example.com`,
	role: ["管理员", "开发者", "设计师", "产品经理", "测试工程师"][i % 5],
	status: ["在线", "离线", "忙碌"][i % 3],
}));

export function FixedHeightVirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 48;
	const [scrollTop, setScrollTop] = useState(0);
	const [scrolling, setScrolling] = useState(false);
	const scrollTimeoutRef = useRef<any>(null);

	// 计算可视区域
	const containerHeight = 400;
	const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
	const totalHeight = DATA.length * rowHeight;

	const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
	const endIndex = Math.min(DATA.length, startIndex + visibleCount);
	const offsetY = startIndex * rowHeight;

	const visibleData = useMemo(
		() => DATA.slice(startIndex, endIndex),
		[startIndex, endIndex],
	);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		const scrollTop = e.currentTarget.scrollTop;
		setScrollTop(scrollTop);

		setScrolling(true);
		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current);
		}
		scrollTimeoutRef.current = setTimeout(() => {
			setScrolling(false);
		}, 150);
	}, []);

	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">固定高度虚拟列表</h3>
					<p className="text-muted-foreground text-sm">
						共 {DATA.length.toLocaleString()} 条数据，当前显示{" "}
						{visibleData.length} 条
					</p>
				</div>
				<div className="text-muted-foreground text-sm">
					{scrolling ? "滚动中..." : "已停止"}
				</div>
			</div>

			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="relative h-[400px] overflow-auto rounded border bg-background"
				style={{ height: `${containerHeight}px` }}
			>
				<div style={{ height: totalHeight }}>
					<div
						style={{ transform: `translateY(${offsetY}px)` }}
						className="relative"
					>
						{visibleData.map((item) => (
							<div
								key={item.id}
								className={`flex items-center gap-4 border-b px-4 transition-all hover:bg-muted/50 ${
									scrolling ? "opacity-90" : "opacity-100"
								}`}
								style={{ height: rowHeight }}
							>
								<div className="flex-1">
									<div className="font-medium">{item.name}</div>
									<div className="text-muted-foreground text-sm">
										{item.email}
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="rounded bg-muted px-2 py-1 text-sm">
										{item.role}
									</span>
									<span
										className={`rounded px-2 py-1 text-sm ${
											item.status === "在线"
												? "bg-green-100 text-green-800"
												: item.status === "忙碌"
													? "bg-yellow-100 text-yellow-800"
													: "bg-gray-100 text-gray-800"
										}`}
									>
										{item.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-sm">
				<div className="space-y-1">
					<span className="font-medium">性能优化</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 只渲染可视区域元素</li>
						<li>• 使用 transform 定位</li>
						<li>• 滚动节流优化</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">技术特点</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 固定行高 48px</li>
						<li>• 支持 10 万条数据</li>
						<li>• 平滑滚动体验</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">使用场景</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 用户列表</li>
						<li>• 数据表格</li>
						<li>• 消息列表</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
