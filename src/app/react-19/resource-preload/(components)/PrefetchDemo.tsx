"use client";

import { useState } from "react";

export default function PrefetchDemo() {
	const [isPrefetching, setIsPrefetching] = useState(false);
	const [prefetchedItems, setPrefetchedItems] = useState<string[]>([]);

	const items = [
		{ id: "about", name: "关于页面", priority: "low" },
		{ id: "contact", name: "联系方式", priority: "low" },
		{ id: "products", name: "产品列表", priority: "medium" },
		{ id: "blog", name: "博客文章", priority: "low" },
	];

	const handlePrefetch = async (itemName: string) => {
		setIsPrefetching(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setPrefetchedItems((prev) => [...prev, itemName]);
		setIsPrefetching(false);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">prefetch 演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<p className="text-gray-600 text-sm">悬停在链接上预加载页面资源:</p>
					<div className="grid gap-2">
						{items.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between rounded border p-2 transition-colors hover:bg-gray-50"
								onMouseEnter={() => !prefetchedItems.includes(item.name) && handlePrefetch(item.name)}
							>
								<span className="text-sm">{item.name}</span>
								<span
									className={`rounded px-2 py-1 text-xs ${
										prefetchedItems.includes(item.name) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
									}`}
								>
									{prefetchedItems.includes(item.name) ? "已预取" : "悬停预取"}
								</span>
							</div>
						))}
					</div>
					{isPrefetching && <div className="text-center text-blue-600 text-sm">正在预取资源...</div>}
				</div>
			</div>
		</div>
	);
}
