import { useState } from "react";
import { DynamicHeightVirtualList } from "./DynamicHeightVirtualList";
import { FixedHeightVirtualList } from "./FixedHeightVirtualList";
import { GroupedVirtualList } from "./GroupedVirtualList";
import { InfiniteScrollVirtualList } from "./InfiniteScrollVirtualList";
import { SearchFilterVirtualList } from "./SearchFilterVirtualList";

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
						type="button"
						onClick={() => setActiveType(type.id as VirtualListType)}
						className={`relative transform overflow-hidden rounded-lg px-4 py-2 font-medium text-sm transition-all duration-200 hover:scale-105 ${activeType === type.id
								? "bg-primary text-primary-foreground shadow-lg"
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

			<div className="mt-8 rounded-lg border bg-muted/30 p-6">
				<h3 className="mb-3 font-semibold text-lg">虚拟滚动原理要点</h3>
				<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
					<div className="space-y-2">
						<h4 className="font-medium">核心原理</h4>
						<ul className="space-y-1 text-muted-foreground">
							<li>• 只渲染可见区域的项目，大幅减少DOM节点数量</li>
							<li>• 通过计算scrollTop确定起始和结束索引</li>
							<li>• 使用绝对定位将可见项目放置在正确位置</li>
							<li>• 设置容器总高度以保持滚动条正确</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium">性能优化</h4>
						<ul className="space-y-1 text-muted-foreground">
							<li>• 使用useMemo缓存计算结果，避免重复计算</li>
							<li>• 使用useCallback缓存事件处理函数</li>
							<li>• 避免在渲染过程中创建新对象</li>
							<li>• 使用transform代替top/left属性提升性能</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium">当前实现特点</h4>
						<ul className="space-y-1 text-muted-foreground">
							<li>• 固定高度：简单高效，适用于高度一致的列表</li>
							<li>• 动态高度：支持不同高度的列表项</li>
							<li>• 分组列表：支持展开/折叠的层级数据</li>
							<li>• 搜索过滤：实时搜索与虚拟滚动结合</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium">适用场景</h4>
						<ul className="space-y-1 text-muted-foreground">
							<li>• 大数据量列表（1000+项目）</li>
							<li>• 长页面滚动优化</li>
							<li>• 复杂列表项渲染</li>
							<li>• 移动端性能优化</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
