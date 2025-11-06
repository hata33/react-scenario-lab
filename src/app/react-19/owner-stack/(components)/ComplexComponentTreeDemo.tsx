"use client";

import { useState } from "react";

export default function ComplexComponentTreeDemo() {
	const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
	const [highlightPath, setHighlightPath] = useState(false);

	// 模拟复杂的组件树结构
	const componentTree = {
		name: "App",
		children: [
			{
				name: "Header",
				children: [
					{ name: "Logo", children: [] },
					{
						name: "Navigation",
						children: [
							{ name: "NavItem", children: [] },
							{ name: "NavItem", children: [] },
						],
					},
				],
			},
			{
				name: "MainContent",
				children: [
					{
						name: "Sidebar",
						children: [
							{ name: "UserProfile", children: [] },
							{ name: "MenuList", children: [] },
						],
					},
					{
						name: "ContentArea",
						children: [
							{
								name: "ArticleList",
								children: [
									{ name: "ArticleCard", children: [] },
									{ name: "ArticleCard", children: [] },
								],
							},
							{ name: "Footer", children: [] },
						],
					},
				],
			},
		],
	};

	const renderComponentNode = (node: any, depth = 0, path = "") => {
		const currentPath = path ? `${path}/${node.name}` : node.name;
		const isSelected = selectedComponent === currentPath;
		const isInPath = highlightPath && currentPath.includes(selectedComponent || "");

		return (
			<div key={currentPath} className="ml-4">
				<div
					className={`mb-1 cursor-pointer rounded p-2 transition-colors ${
						isSelected
							? "border-2 border-purple-500 bg-purple-200"
							: isInPath
								? "border-2 border-purple-300 bg-purple-100"
								: "bg-gray-100 hover:bg-gray-200"
					}`}
					onClick={() => setSelectedComponent(currentPath)}
				>
					<span className="font-medium text-gray-800 text-sm">
						{"".padStart(depth * 2, "→")} {node.name}
					</span>
				</div>
				{node.children.map((child: any) => renderComponentNode(child, depth + 1, currentPath))}
			</div>
		);
	};

	const getOwnerPath = (componentPath: string) => {
		return componentPath.split("/").slice(0, -1).join(" → ");
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<div className="rounded-xl bg-white p-6 shadow-lg">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">🌳 组件树结构</h3>
				<div className="mb-4">
					<button
						onClick={() => setHighlightPath(!highlightPath)}
						className={`rounded px-3 py-1 text-sm transition-colors ${
							highlightPath
								? "bg-purple-600 text-white hover:bg-purple-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{highlightPath ? "关闭" : "开启"} 路径高亮
					</button>
				</div>
				<div className="max-h-96 overflow-auto rounded-lg bg-gray-50 p-4">
					{renderComponentNode(componentTree)}
				</div>
			</div>

			<div className="rounded-xl bg-white p-6 shadow-lg">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">📋 Owner Stack 信息</h3>
				{selectedComponent ? (
					<div className="space-y-4">
						<div className="rounded-lg bg-purple-50 p-4">
							<h4 className="mb-2 font-medium text-purple-800">选中组件：</h4>
							<p className="font-mono text-purple-700">{selectedComponent}</p>
						</div>

						<div className="rounded-lg bg-blue-50 p-4">
							<h4 className="mb-2 font-medium text-blue-800">Owner 路径：</h4>
							<p className="font-mono text-blue-700 text-sm">
								{getOwnerPath(selectedComponent) || "根组件"}
							</p>
						</div>

						<div className="rounded-lg bg-green-50 p-4">
							<h4 className="mb-2 font-medium text-green-800">组件信息：</h4>
							<ul className="space-y-1 text-green-700 text-sm">
								<li>• 深度: {selectedComponent.split("/").length - 1}</li>
								<li>• 父组件: {selectedComponent.split("/").slice(-2, -1)[0] || "无"}</li>
								<li>• 子组件数量: {selectedComponent.includes("Article") ? 0 : "N/A"}</li>
								<li>• 渲染时间: {(Math.random() * 10 + 1) | 0}ms</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="rounded-lg bg-gray-50 p-4 text-center">
						<p className="text-gray-500">点击左侧组件查看 Owner Stack 信息</p>
					</div>
				)}
			</div>
		</div>
	);
}