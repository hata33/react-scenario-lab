"use client";

import { useState } from "react";
import { useTransition } from "./hooks";

export default function UseTransitionFilterDemo() {
	const [isPending, startTransition] = useTransition();
	const [products] = useState([
		{ id: 1, name: "React 19 完全指南", price: 89, category: "前端" },
		{ id: 2, name: "TypeScript 高级编程", price: 128, category: "前端" },
		{ id: 3, name: "Node.js 实战", price: 98, category: "后端" },
		{ id: 4, name: "Vue 3 深入浅出", price: 76, category: "前端" },
		{ id: 5, name: "Python 数据分析", price: 118, category: "数据" },
		{ id: 6, name: "Docker 容器技术", price: 108, category: "运维" },
	]);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [selectedCategory, setSelectedCategory] = useState("全部");

	const filterProducts = (category: string) => {
		setSelectedCategory(category);

		startTransition(() => {
			// 模拟大量数据过滤
			setTimeout(() => {
				if (category === "全部") {
					setFilteredProducts(products);
				} else {
					setFilteredProducts(products.filter((p) => p.category === category));
				}
			}, 500);
		});
	};

	const categories = ["全部", "前端", "后端", "数据", "运维"];

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🏷️ 产品分类过滤</h5>

			<div className="mb-4">
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => filterProducts(category)}
							className={`rounded-full px-3 py-1 font-medium text-sm transition-colors ${
								selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{category}
						</button>
					))}
				</div>
				{isPending && (
					<div className="mt-2 flex items-center text-blue-600 text-sm">
						<div className="mr-2 h-4 w-4 animate-spin rounded-full border-blue-600 border-b-2"></div>
						筛选中...
					</div>
				)}
			</div>

			<div className={`space-y-2 transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}>
				{filteredProducts.map((product) => (
					<div key={product.id} className="rounded-md border border-gray-200 bg-white p-3">
						<div className="flex items-start justify-between">
							<div>
								<h6 className="font-medium text-gray-900">{product.name}</h6>
								<span className="text-gray-500 text-xs">{product.category}</span>
							</div>
							<span className="font-medium text-blue-600">¥{product.price}</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
				<p className="text-blue-700 text-xs">⚡ 注意：分类按钮立即响应，数据筛选在后台进行，界面不会卡顿！</p>
			</div>
		</div>
	);
}
