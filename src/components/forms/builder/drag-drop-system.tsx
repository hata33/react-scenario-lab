"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 拖拽项类型
export const ItemType = {
	FIELD: "field",
	COMPONENT: "component",
	SECTION: "section",
};

// 拖拽项接口
export interface DragItem {
	id: string;
	type: typeof ItemType.FIELD | typeof ItemType.COMPONENT | typeof ItemType.SECTION;
	fieldType?: string;
	componentType?: string;
	data?: any;
}

// 拖拽上下文
export interface DragContext {
	draggedItem: DragItem | null;
	dropTarget: string | null;
	dragPosition: { x: number; y: number } | null;
}

// 可拖拽的组件项
export interface DraggableComponentItem {
	id: string;
	type: string;
	label: string;
	icon: React.ReactNode;
	category: string;
	defaultProps: Record<string, any>;
	configSchema?: any;
}

// 组件面板
export const COMPONENT_PALETTE: DraggableComponentItem[] = [
	// 基础输入组件
	{
		id: "text-input",
		type: "text",
		label: "文本输入",
		icon: <span className="text-lg">📝</span>,
		category: "基础输入",
		defaultProps: {
			placeholder: "请输入文本",
			required: false,
		},
	},
	{
		id: "number-input",
		type: "number",
		label: "数字输入",
		icon: <span className="text-lg">🔢</span>,
		category: "基础输入",
		defaultProps: {
			placeholder: "请输入数字",
			min: 0,
			max: 100,
		},
	},
	{
		id: "email-input",
		type: "email",
		label: "邮箱输入",
		icon: <span className="text-lg">📧</span>,
		category: "基础输入",
		defaultProps: {
			placeholder: "请输入邮箱地址",
			required: true,
		},
	},
	{
		id: "password-input",
		type: "password",
		label: "密码输入",
		icon: <span className="text-lg">🔒</span>,
		category: "基础输入",
		defaultProps: {
			placeholder: "请输入密码",
			required: true,
			minLength: 6,
		},
	},
	{
		id: "textarea",
		type: "textarea",
		label: "多行文本",
		icon: <span className="text-lg">📄</span>,
		category: "基础输入",
		defaultProps: {
			placeholder: "请输入内容",
			rows: 4,
		},
	},

	// 选择组件
	{
		id: "select",
		type: "select",
		label: "下拉选择",
		icon: <span className="text-lg">📋</span>,
		category: "选择组件",
		defaultProps: {
			placeholder: "请选择",
			options: [
				{ value: "option1", label: "选项1" },
				{ value: "option2", label: "选项2" },
			],
		},
	},
	{
		id: "checkbox",
		type: "checkbox",
		label: "复选框",
		icon: <span className="text-lg">☑️</span>,
		category: "选择组件",
		defaultProps: {
			label: "同意条款",
			required: false,
		},
	},
	{
		id: "radio",
		type: "radio",
		label: "单选框",
		icon: <span className="text-lg">⭕</span>,
		category: "选择组件",
		defaultProps: {
			options: [
				{ value: "male", label: "男" },
				{ value: "female", label: "女" },
			],
			required: true,
		},
	},

	// 特殊组件
	{
		id: "date-picker",
		type: "date",
		label: "日期选择",
		icon: <span className="text-lg">📅</span>,
		category: "特殊组件",
		defaultProps: {
			placeholder: "请选择日期",
		},
	},
	{
		id: "file-upload",
		type: "file",
		label: "文件上传",
		icon: <span className="text-lg">📎</span>,
		category: "特殊组件",
		defaultProps: {
			accept: "*/*",
			multiple: false,
		},
	},
];

// 可拖拽的组件项组件
export function DraggablePaletteItem({ item }: { item: DraggableComponentItem }) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemType.COMPONENT,
		item: {
			id: item.id,
			type: ItemType.COMPONENT,
			componentType: item.type,
			data: {
				defaultProps: item.defaultProps,
				configSchema: item.configSchema,
			},
		} as DragItem,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={drag as any}
			className={`flex cursor-move items-center gap-2 rounded border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 ${
				isDragging ? "opacity-50" : ""
			}`}
		>
			<div className="flex-shrink-0">{item.icon}</div>
			<div className="min-w-0 flex-1">
				<div className="truncate font-medium text-gray-900 text-sm">{item.label}</div>
			</div>
		</div>
	);
}

// 拖拽区域组件
export function DroppableCanvas({
	children,
	onDrop,
	className = "",
}: {
	children: React.ReactNode;
	onDrop: (item: DragItem, position: { x: number; y: number }) => void;
	className?: string;
}) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: [ItemType.FIELD, ItemType.COMPONENT, ItemType.SECTION],
		drop: (item: DragItem, monitor) => {
			const offset = monitor.getClientOffset();
			if (offset) {
				const canvasElement = document.getElementById("form-canvas");
				if (canvasElement) {
					const rect = canvasElement.getBoundingClientRect();
					const position = {
						x: offset.x - rect.left,
						y: offset.y - rect.top,
					};
					onDrop(item, position);
				}
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<div
			id="form-canvas"
			ref={drop as any}
			className={`relative min-h-full border-2 border-dashed bg-gray-50 ${
				isOver && canDrop ? "border-blue-400 bg-blue-50" : "border-gray-300"
			} ${className}`}
		>
			{children}

			{/* 拖拽提示 */}
			{isOver && canDrop && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg">释放以添加组件</div>
				</div>
			)}
		</div>
	);
}

// 可拖拽的表单字段组件
export function DraggableField({
	field,
	onMove,
	onRemove,
	onSelect,
}: {
	field: any;
	onMove: (fromIndex: number, toIndex: number) => void;
	onRemove: (fieldId: string) => void;
	onSelect: (field: any) => void;
}) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemType.FIELD,
		item: {
			id: field.id,
			type: ItemType.FIELD,
			fieldType: field.type,
			data: field,
		} as DragItem,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ isOver }, drop] = useDrop({
		accept: ItemType.FIELD,
		drop: (item: DragItem, monitor) => {
			if (item.id !== field.id) {
				// 实现字段移动逻辑
				console.log("Move field:", item.id, "to position of", field.id);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<div
			ref={(node) => {
				drag(drop(node));
			}}
			className={`cursor-move rounded-lg border border-gray-200 bg-white p-4 ${
				isDragging ? "opacity-50" : ""
			} ${isOver ? "border-blue-400" : ""} transition-all hover:shadow-md`}
			onClick={() => onSelect(field)}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="cursor-move text-gray-400">
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M7 2a2 2 0 1 0 .001 4h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.582l1.414 1.414A2 2 0 0 0 12.582 18H14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2a2 2 0 1 0-.001-4h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.582a2 2 0 0 1-1.414-.586L8 17.582A2 2 0 0 0 6.418 18H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2z" />
						</svg>
					</div>
					<div>
						<div className="font-medium text-gray-900">{field.label}</div>
						<div className="text-gray-500 text-sm">{field.type}</div>
					</div>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation();
						onRemove(field.id);
					}}
					className="p-1 text-red-500 hover:text-red-700"
				>
					<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

// 拖拽管理器Hook
export function useDragDropManager() {
	const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
	const [dropTarget, setDropTarget] = useState<string | null>(null);
	const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

	const handleDragStart = useCallback((item: DragItem) => {
		setDraggedItem(item);
	}, []);

	const handleDragEnd = useCallback(() => {
		setDraggedItem(null);
		setDropTarget(null);
		setDragPosition(null);
	}, []);

	const handleDrop = useCallback((target: string, position: { x: number; y: number }) => {
		setDropTarget(target);
		setDragPosition(position);
	}, []);

	return {
		draggedItem,
		dropTarget,
		dragPosition,
		handleDragStart,
		handleDragEnd,
		handleDrop,
	};
}

// 碰撞检测算法
export class CollisionDetector {
	static checkCollision(
		rect1: { x: number; y: number; width: number; height: number },
		rect2: { x: number; y: number; width: number; height: number },
	): boolean {
		return !(
			rect1.x + rect1.width < rect2.x ||
			rect2.x + rect2.width < rect1.x ||
			rect1.y + rect1.height < rect2.y ||
			rect2.y + rect2.height < rect1.y
		);
	}

	static findNearestDropTarget(
		position: { x: number; y: number },
		dropTargets: Array<{ id: string; rect: DOMRect }>,
	): string | null {
		let nearestTarget = null;
		let minDistance = Infinity;

		for (const target of dropTargets) {
			const centerX = target.rect.left + target.rect.width / 2;
			const centerY = target.rect.top + target.rect.height / 2;
			const distance = Math.sqrt((position.x - centerX) ** 2 + (position.y - centerY) ** 2);

			if (distance < minDistance) {
				minDistance = distance;
				nearestTarget = target.id;
			}
		}

		return nearestTarget;
	}

	static calculateDropPosition(
		mousePosition: { x: number; y: number },
		containerRect: DOMRect,
	): { x: number; y: number } {
		return {
			x: mousePosition.x - containerRect.left,
			y: mousePosition.y - containerRect.top,
		};
	}
}

// 性能优化的拖拽提供者
export function OptimizedDndProvider({ children }: { children: React.ReactNode }) {
	return (
		<DndProvider
			backend={HTML5Backend}
			options={{
				enableMouseEvents: true,
				enableTouchEvents: true,
				enableHoverOutsideTarget: false,
			}}
		>
			{children}
		</DndProvider>
	);
}
