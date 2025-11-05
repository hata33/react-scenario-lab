import { useCallback, useMemo, useRef, useState } from "react";

interface GroupItem {
	id: number;
	name: string;
	email: string;
	role: string;
	status: "在线" | "离线" | "忙碌";
}

interface Group {
	id: string;
	name: string;
	count: number;
	items: GroupItem[];
	collapsed: boolean;
}

const generateGroupData = (): Group[] => {
	const departments = ["技术部", "产品部", "设计部", "运营部", "市场部"];
	const roles = ["前端工程师", "后端工程师", "产品经理", "UI设计师", "运营专员"];
	const names = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"];

	return departments.map((dept, deptIndex) => {
		const itemCount = Math.floor(Math.random() * 50) + 20; // 20-70个成员
		const items: GroupItem[] = [];

		for (let i = 0; i < itemCount; i++) {
			items.push({
				id: deptIndex * 1000 + i,
				name: names[Math.floor(Math.random() * names.length)] + (i + 1),
				email: `${dept.toLowerCase()}-${i + 1}@company.com`,
				role: roles[Math.floor(Math.random() * roles.length)],
				status: ["在线", "离线", "忙碌"][Math.floor(Math.random() * 3)] as "在线" | "离线" | "忙碌",
			});
		}

		return {
			id: dept,
			name: dept,
			count: itemCount,
			items,
			collapsed: false,
		};
	});
};

const GROUP_DATA = generateGroupData();

export function GroupedVirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 40;
	const groupHeaderHeight = 48;
	const [scrollTop, setScrollTop] = useState(0);
	const [groups, setGroups] = useState(GROUP_DATA);

	// 切换分组展开/折叠
	const toggleGroup = useCallback((groupId: string) => {
		setGroups((prev) =>
			prev.map((group) => (group.id === groupId ? { ...group, collapsed: !group.collapsed } : group)),
		);
	}, []);

	// 展开所有分组
	const expandAll = useCallback(() => {
		setGroups((prev) => prev.map((group) => ({ ...group, collapsed: false })));
	}, []);

	// 折叠所有分组
	const collapseAll = useCallback(() => {
		setGroups((prev) => prev.map((group) => ({ ...group, collapsed: true })));
	}, []);

	// 计算总高度和可见项目
	const { totalHeight, visibleItems } = useMemo(() => {
		const containerHeight = 400;
		let currentHeight = 0;
		const _startIndex = 0;
		const _endIndex = 0;
		const visibleItems: Array<{
			type: "group" | "item";
			data: any;
			offsetY: number;
			height: number;
		}> = [];

		// 计算总高度并找到可见区域
		groups.forEach((group) => {
			const groupHeight = groupHeaderHeight + (group.collapsed ? 0 : group.items.length * rowHeight);

			// 检查是否在可见区域
			if (currentHeight + groupHeight > scrollTop && currentHeight < scrollTop + containerHeight) {
				// 添加分组头
				visibleItems.push({
					type: "group",
					data: group,
					offsetY: currentHeight,
					height: groupHeaderHeight,
				});

				// 如果展开，添加项目
				if (!group.collapsed) {
					group.items.forEach((item) => {
						visibleItems.push({
							type: "item",
							data: item,
							offsetY: currentHeight + groupHeaderHeight + item.id * rowHeight,
							height: rowHeight,
						});
					});
				}
			}

			currentHeight += groupHeight;
		});

		return { totalHeight: currentHeight, visibleItems };
	}, [groups, scrollTop]);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
	}, []);

	// 统计信息
	const totalGroups = groups.length;
	const _expandedGroups = groups.filter((g) => !g.collapsed).length;
	const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
	const visibleItemsCount = groups.reduce((sum, group) => sum + (group.collapsed ? 0 : group.items.length), 0);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">分组虚拟列表</h3>
					<p className="text-muted-foreground text-sm">
						{totalGroups} 个分组，{totalItems} 个成员，显示 {visibleItemsCount} 个
					</p>
				</div>
				<div className="flex gap-2">
					<button type="button" onClick={expandAll} className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80">
						展开全部
					</button>
					<button type="button" onClick={collapseAll} className="rounded bg-muted px-3 py-1 text-sm hover:bg-muted/80">
						折叠全部
					</button>
				</div>
			</div>

			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="relative h-[400px] overflow-auto rounded border bg-background"
			>
				<div style={{ height: totalHeight }}>
					{visibleItems.map((item, _index) => {
						if (item.type === "group") {
							const group = item.data as Group;
							return (
								<div
									key={`group-${group.id}`}
									className="absolute right-0 left-0 cursor-pointer border-primary/20 border-b bg-primary/5 transition-colors hover:bg-primary/10"
									style={{
										top: `${item.offsetY}px`,
										height: `${item.height}px`,
									}}
									onClick={() => toggleGroup(group.id)}
								>
									<div className="flex h-full items-center justify-between px-4">
										<div className="flex items-center gap-3">
											<span className="text-lg">{group.collapsed ? "▶" : "▼"}</span>
											<span className="font-medium">{group.name}</span>
											<span className="text-muted-foreground text-sm">{group.count} 成员</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-muted-foreground text-xs">{group.collapsed ? "已折叠" : "已展开"}</span>
											<div className="-space-x-2 flex">
												{group.items.slice(0, 3).map((member, _idx) => (
													<div
														key={member.id}
														className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-xs"
													>
														{member.name[0]}
													</div>
												))}
												{group.items.length > 3 && (
													<div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
														+{group.items.length - 3}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						} else {
							const itemData = item.data as GroupItem;
							return (
								<div
									key={`item-${itemData.id}`}
									className="absolute right-0 left-0 flex items-center gap-4 border-b px-6 py-2 transition-all hover:bg-muted/50"
									style={{
										top: `${item.offsetY}px`,
										height: `${item.height}px`,
									}}
								>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<span className="font-medium text-sm">{itemData.name}</span>
											<span className="text-muted-foreground text-xs">{itemData.email}</span>
											<span className="rounded bg-muted px-2 py-1 text-xs">{itemData.role}</span>
										</div>
									</div>
									<div>
										<span
											className={`rounded px-2 py-1 text-xs ${
												itemData.status === "在线"
													? "bg-green-100 text-green-800"
													: itemData.status === "忙碌"
														? "bg-yellow-100 text-yellow-800"
														: "bg-gray-100 text-gray-800"
											}`}
										>
											{itemData.status}
										</span>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 text-sm">
				<div className="space-y-1">
					<span className="font-medium">核心功能</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 分组展开/折叠</li>
						<li>• 虚拟滚动优化</li>
						<li>• 分组统计信息</li>
						<li>• 批量操作支持</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">技术特点</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 动态高度计算</li>
						<li>• 可见区域优化</li>
						<li>• 状态管理优化</li>
						<li>• 渲染性能优化</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">适用场景</span>
					<ul className="space-y-1 text-muted-foreground">
						<li>• 组织架构展示</li>
						<li>• 文件目录结构</li>
						<li>• 分类数据展示</li>
						<li>• 层级信息管理</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
