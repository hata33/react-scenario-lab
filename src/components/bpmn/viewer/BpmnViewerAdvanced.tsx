"use client";

import { useEffect, useRef, useState } from "react";
import BpmnViewer from "bpmn-js/lib/Viewer";
import type { BpmnViewerProps } from "../types/bpmn.types";
import BpmnNavigation from "../navigation/BpmnNavigation";

// 默认的 BPMN XML
const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.16.0">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="开始">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="查看流程">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="结束">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="99" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="176" y="142" width="42" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1_di" bpmnElement="Activity_1">
        <dc:Bounds x="270" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="432" y="99" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="430" y="142" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="215" y="117" />
        <di:waypoint x="270" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="117" />
        <di:waypoint x="432" y="117" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default function BpmnViewerAdvanced({
	xml = defaultBpmnXml,
	zoom = 1,
	center = true,
	onLoad,
	onError,
	className = "",
	style,
	showNavigation = true,
}: BpmnViewerProps & { showNavigation?: boolean }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewerRef = useRef<BpmnViewer | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentZoom, setCurrentZoom] = useState(zoom);

	useEffect(() => {
		if (!containerRef.current) return;

		// 创建 BPMN 查看器实例
		const viewer = new BpmnViewer({
			container: containerRef.current,
		});

		viewerRef.current = viewer;

		// 导入 BPMN XML
		viewer
			.importXML(xml)
			.then(() => {
				setIsLoaded(true);

				// 居中显示
				if (center) {
					const canvas = viewer.get("canvas");
					canvas.zoom("fit-viewport");
				} else if (zoom !== 1) {
					const canvas = viewer.get("canvas");
					canvas.zoom(zoom);
				}

				// 监听缩放变化
				const eventBus = viewer.get("eventBus");
				eventBus.on("canvas.zoom", (event: any) => {
					setCurrentZoom(event.newZoom || 1);
				});

				onLoad?.();
			})
			.catch((error: Error) => {
				console.error("Failed to load BPMN diagram:", error);
				onError?.(error);
			});

		// 清理函数
		return () => {
			viewer.destroy();
		};
	}, [xml, zoom, center, onLoad, onError]);

	// 动态附加/分离功能
	const attachTo = (element: HTMLElement) => {
		if (viewerRef.current && element) {
			viewerRef.current.attachTo(element);
		}
	};

	const detach = () => {
		if (viewerRef.current) {
			viewerRef.current.detach();
		}
	};

	// 暴露方法到 window 对象（用于调试和外部调用）
	useEffect(() => {
		(window as any).bpmnViewer = {
			getViewer: () => viewerRef.current,
			attachTo,
			detach,
			getZoom: () => currentZoom,
		};
	}, [currentZoom]);

	return (
		<div className={`bpmn-viewer-advanced flex ${className}`} style={style}>
			{/* 主查看器区域 */}
			<div className="flex-1 relative">
				<div
					ref={containerRef}
					style={{ width: "100%", height: "100%", minHeight: "400px" }}
				/>

				{/* 加载状态 */}
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
						<div className="text-gray-500 text-lg">正在加载 BPMN 查看器...</div>
					</div>
				)}

				{/* 快速缩放控制 */}
				<div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
					<button
						onClick={() => {
							if (viewerRef.current) {
								const canvas = viewerRef.current.get("canvas");
								const newZoom = Math.min(currentZoom + 0.1, 4);
								canvas.zoom(newZoom);
							}
						}}
						className="p-2 hover:bg-gray-100 rounded transition-colors"
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
						onClick={() => {
							if (viewerRef.current) {
								const canvas = viewerRef.current.get("canvas");
								const newZoom = Math.max(currentZoom - 0.1, 0.1);
								canvas.zoom(newZoom);
							}
						}}
						className="p-2 hover:bg-gray-100 rounded transition-colors"
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
						onClick={() => {
							if (viewerRef.current) {
								const canvas = viewerRef.current.get("canvas");
								if (center) {
									canvas.zoom("fit-viewport");
								} else {
									canvas.zoom(1);
								}
							}
						}}
						className="p-2 hover:bg-gray-100 rounded transition-colors"
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
					<div className="text-sm text-gray-600 font-mono px-2">
						{Math.round(currentZoom * 100)}%
					</div>
				</div>
			</div>

			{/* 导航面板 */}
			{showNavigation && viewerRef.current && (
				<div className="w-80 border-l border-gray-200">
					<BpmnNavigation viewer={viewerRef.current} />
				</div>
			)}
		</div>
	);
}