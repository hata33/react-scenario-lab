import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { FixedHeightVirtualList } from "./FixedHeightVirtualList";
import { DynamicHeightVirtualList } from "./DynamicHeightVirtualList";
import { SearchFilterVirtualList } from "./SearchFilterVirtualList";
import { GroupedVirtualList } from "./GroupedVirtualList";
import { InfiniteScrollVirtualList } from "./InfiniteScrollVirtualList";

export type VirtualListType =
	| "fixed"
	| "dynamic"
	| "search"
	| "grouped"
	| "infinite";

const listTypes = [
	{ id: "fixed", name: "固定高度", description: "基础虚拟列表，固定行高" },
	{ id: "dynamic", name: "动态高度", description: "支持动态行高的虚拟列表" },
	{ id: "search", name: "搜索过滤", description: "带搜索和过滤功能的虚拟列表" },
	{
		id: "grouped",
		name: "分组列表",
		description: "支持分组展开/折叠的虚拟列表",
	},
	{
		id: "infinite",
		name: "无限滚动",
		description: "支持无限滚动加载的虚拟列表",
	},
];

export default function VirtualListDemo() {
	const [activeType, setActiveType] = useState<VirtualListType>("fixed");

	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-4 font-semibold text-2xl">虚拟列表演示</h2>
				<p className="mb-6 text-muted-foreground">
					选择不同的虚拟列表实现方式，体验各种场景下的性能优化
				</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{listTypes.map((type) => (
					<button
						key={type.id}
						onClick={() => setActiveType(type.id as VirtualListType)}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
							activeType === type.id
								? "bg-primary text-primary-foreground"
								: "bg-muted text-muted-foreground hover:bg-muted/80"
						}`}
					>
						<div>{type.name}</div>
						<div className="text-xs opacity-80">{type.description}</div>
					</button>
				))}
			</div>

			<div className="mt-6">
				{activeType === "fixed" && <FixedHeightVirtualList />}
				{activeType === "dynamic" && <DynamicHeightVirtualList />}
				{activeType === "search" && <SearchFilterVirtualList />}
				{activeType === "grouped" && <GroupedVirtualList />}
				{activeType === "infinite" && <InfiniteScrollVirtualList />}
			</div>
		</div>
	);
}
