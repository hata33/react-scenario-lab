"use client";

import { useEffect, useRef, useState } from "react";
import BpmnViewer from "bpmn-js/lib/Viewer";

export interface BpmnNavigationProps {
	viewer: BpmnViewer | null;
	className?: string;
}

export default function BpmnNavigation({
	viewer,
	className = ""
}: BpmnNavigationProps) {
	const [zoom, setZoom] = useState(1);
	const [canZoomIn, setCanZoomIn] = useState(true);
	const [canZoomOut, setCanZoomOut] = useState(true);
	const [elements, setElements] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(-1);

	useEffect(() => {
		if (!viewer) return;

		// 监听缩放变化
		const eventBus = viewer.get("eventBus");
		const handleZoomChanged = (event: any) => {
			setZoom(event.newZoom || 1);
			setCanZoomIn((event.newZoom || 1) < 4);
			setCanZoomOut((event.newZoom || 1) > 0.1);
		};

		eventBus.on("canvas.zoom", handleZoomChanged);

		// 获取所有元素
		const elementRegistry = viewer.get("elementRegistry");
		const allElements = elementRegistry.getAll();
		setElements(allElements.filter(el => el.type !== "label" && !el.labelTarget));

		return () => {
			eventBus.off("canvas.zoom", handleZoomChanged);
		};
	}, [viewer]);

	// 缩放控制
	const handleZoomIn = () => {
		if (!viewer || !canZoomIn) return;
		const canvas = viewer.get("canvas");
		const currentZoom = canvas.zoom();
		canvas.zoom(currentZoom + 0.1);
	};

	const handleZoomOut = () => {
		if (!viewer || !canZoomOut) return;
		const canvas = viewer.get("canvas");
		const currentZoom = canvas.zoom();
		canvas.zoom(currentZoom - 0.1);
	};

	const handleZoomReset = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		canvas.zoom("fit-viewport");
	};

	const handleZoomFit = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		canvas.zoom("fit-viewport");
	};

	// 导航控制
	const handlePanUp = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		const viewbox = canvas.viewbox();
		const newViewbox = {
			...viewbox,
			y: viewbox.y + 50,
		};
		canvas.viewbox(newViewbox);
	};

	const handlePanDown = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		const viewbox = canvas.viewbox();
		const newViewbox = {
			...viewbox,
			y: viewbox.y - 50,
		};
		canvas.viewbox(newViewbox);
	};

	const handlePanLeft = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		const viewbox = canvas.viewbox();
		const newViewbox = {
			...viewbox,
			x: viewbox.x + 50,
		};
		canvas.viewbox(newViewbox);
	};

	const handlePanRight = () => {
		if (!viewer) return;
		const canvas = viewer.get("canvas");
		const viewbox = canvas.viewbox();
		const newViewbox = {
			...viewbox,
			x: viewbox.x - 50,
		};
		canvas.viewbox(newViewbox);
	};

	// 元素导航
	const handleElementClick = (element: any, index: number) => {
		if (!viewer) return;

		setSelectedIndex(index);
		const canvas = viewer.get("canvas");
		const elementRegistry = viewer.get("elementRegistry");

		// 选中元素
		const selection = viewer.get("selection");
		selection.select([element]);

		// 滚动到元素
		canvas.scrollViewportIntoView({ element });
	};

	// 搜索过滤
	const filteredElements = elements.filter(element => {
		if (!searchTerm) return true;
		const name = element.businessObject?.name || element.id || "";
		return name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	// 获取元素类型显示名称
	const getElementTypeName = (type: string) => {
		const typeMap: Record<string, string> = {
			"bpmn:Process": "流程",
			"bpmn:StartEvent": "开始事件",
			"bpmn:EndEvent": "结束事件",
			"bpmn:Task": "任务",
			"bpmn:UserTask": "用户任务",
			"bpmn:ServiceTask": "服务任务",
			"bpmn:ExclusiveGateway": "排他网关",
			"bpmn:ParallelGateway": "并行网关",
			"bpmn:SequenceFlow": "序列流",
		};
		return typeMap[type] || type;
	};

	// 获取元素图标
	const getElementIcon = (type: string) => {
		if (type.includes("Event")) return "⭕";
		if (type.includes("Task")) return "📋";
		if (type.includes("Gateway")) return "🔀";
		if (type.includes("Flow")) return "➡️";
		return "📦";
	};

	return (
		<div className={`bpmn-navigation bg-white border border-gray-200 rounded-lg shadow-lg ${className}`}>
			{/* 缩放控制 */}
			<div className="border-b border-gray-200 p-4">
				<h3 className="text-sm font-semibold text-gray-800 mb-3">缩放控制</h3>
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm text-gray-600">当前缩放: {Math.round(zoom * 100)}%</span>
					<div className="flex items-center space-x-1">
						<button
							onClick={handleZoomOut}
							disabled={!canZoomOut}
							className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							title="缩小"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
								<line x1="8" y1="11" x2="14" y2="11" />
							</svg>
						</button>
						<button
							onClick={handleZoomReset}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="重置缩放"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
								<path d="M3 3v5h5" />
							</svg>
						</button>
						<button
							onClick={handleZoomIn}
							disabled={!canZoomIn}
							className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							title="放大"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
								<line x1="11" y1="8" x2="11" y2="14" />
								<line x1="8" y1="11" x2="14" y2="11" />
							</svg>
						</button>
						<button
							onClick={handleZoomFit}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="适应视图"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
							</svg>
						</button>
					</div>
				</div>

				{/* 导航控制 */}
				<div className="flex justify-center">
					<div className="grid grid-cols-3 gap-1 w-24">
						<div />
						<button
							onClick={handlePanUp}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="向上移动"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="18 15 12 9 6 15" />
							</svg>
						</button>
						<div />
						<button
							onClick={handlePanLeft}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="向左移动"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>
						<button
							onClick={handleZoomReset}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="居中"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="3" />
							</svg>
						</button>
						<button
							onClick={handlePanRight}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="向右移动"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>
						<div />
						<button
							onClick={handlePanDown}
							className="p-1 hover:bg-gray-100 rounded transition-colors"
							title="向下移动"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
						<div />
					</div>
				</div>
			</div>

			{/* 元素导航 */}
			<div className="p-4">
				<h3 className="text-sm font-semibold text-gray-800 mb-3">元素导航</h3>

				{/* 搜索框 */}
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="搜索元素..."
					className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
				/>

				{/* 元素列表 */}
				<div className="max-h-64 overflow-y-auto">
					{filteredElements.length === 0 ? (
						<div className="text-sm text-gray-500 text-center py-4">
							{searchTerm ? "未找到匹配的元素" : "暂无元素"}
						</div>
					) : (
						<div className="space-y-1">
							{filteredElements.map((element, index) => (
								<div
									key={element.id}
									onClick={() => handleElementClick(element, index)}
									className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors text-sm ${
										selectedIndex === index
											? "bg-blue-100 text-blue-800"
											: "hover:bg-gray-100"
									}`}
								>
									<span className="text-base">{getElementIcon(element.type)}</span>
									<div className="flex-1 min-w-0">
										<div className="font-medium truncate">
											{element.businessObject?.name || element.id}
										</div>
										<div className="text-xs text-gray-500">
											{getElementTypeName(element.type)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* 统计信息 */}
				<div className="mt-4 pt-3 border-t border-gray-200">
					<div className="text-xs text-gray-500">
						共 {filteredElements.length} 个元素
						{searchTerm && ` (搜索结果)`}
					</div>
				</div>
			</div>
		</div>
	);
}