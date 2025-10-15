"use client";

import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useRef, useState } from "react";
import type { BpmnEditorProps } from "../types/bpmn.types";

// 导入属性面板相关模块
import PropertiesPanelModule from "@bpmn-io/properties-panel";
import BpmnPropertiesProvider from "bpmn-js-properties-panel/lib/provider/bpmn";
import CamundaPropertiesProvider from "bpmn-js-properties-panel/lib/provider/camunda";
import CamundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

// 默认的 BPMN XML (包含 Camunda 扩展)
const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                 xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                 xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                 xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                 xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                 id="Definitions_1"
                 targetNamespace="http://bpmn.io/schema/bpmn"
                 exporter="Camunda Modeler"
                 exporterVersion="1.16.0">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="开始">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="UserTask_1" name="用户任务">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
      <camunda:assignee>admin</camunda:assignee>
      <camunda:candidateGroups>managers</camunda:candidateGroups>
    </bpmn:userTask>
    <bpmn:serviceTask id="ServiceTask_1" name="服务任务" camunda:class="com.example.ServiceDelegate">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="EndEvent_1" name="结束">
      <bpmn:incoming>Flow_3</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="UserTask_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="UserTask_1" targetRef="ServiceTask_1" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="ServiceTask_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="99" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="176" y="142" width="42" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1_di" bpmnElement="UserTask_1">
        <dc:Bounds x="270" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ServiceTask_1_di" bpmnElement="ServiceTask_1">
        <dc:Bounds x="420" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="572" y="99" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="570" y="142" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="215" y="117" />
        <di:waypoint x="270" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="117" />
        <di:waypoint x="420" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="520" y="117" />
        <di:waypoint x="572" y="117" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export interface BpmnEditorWithPropertiesProps extends BpmnEditorProps {
	showPropertiesPanel?: boolean;
	propertiesPanelPosition?: "right" | "left";
}

export default function BpmnEditorWithProperties({
	xml = defaultBpmnXml,
	readonly = false,
	onLoad,
	onError,
	className = "",
	style,
	showPropertiesPanel = true,
	propertiesPanelPosition = "right",
}: BpmnEditorWithPropertiesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const propertiesRef = useRef<HTMLDivElement>(null);
	const modelerRef = useRef<BpmnModeler | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedElement, setSelectedElement] = useState<any>(null);
	const [warnings, setWarnings] = useState<string[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		// 创建 BPMN 建模器实例，包含属性面板
		const modeler = new BpmnModeler({
			container: containerRef.current,
			keyboard: {
				bindTo: window,
			},
			propertiesPanel: {
				parent: propertiesRef.current || undefined,
			},
			additionalModules: showPropertiesPanel ? [
				PropertiesPanelModule,
				BpmnPropertiesProvider,
				CamundaPropertiesProvider,
			] : [],
			moddleExtensions: {
				camunda: CamundaModdleDescriptor,
			},
		});

		modelerRef.current = modeler;

		// 监听选择事件
		const eventBus = modeler.get("eventBus");
		eventBus.on("selection.changed", (event: any) => {
			const newSelection = event.newSelection;
			setSelectedElement(newSelection[0] || null);
		});

		// 导入 BPMN XML
		modeler
			.importXML(xml)
			.then((result: any) => {
				setIsLoaded(true);
				setWarnings(result.warnings || []);

				// 如果是只读模式，禁用编辑功能
				if (readonly) {
					const canvas = modeler.get("canvas");

					// 禁用拖拽
					eventBus.on("element.click", (event: any) => {
						event.preventDefault();
					});

					// 禁用右键菜单
					eventBus.on("element.contextmenu", (event: any) => {
						event.preventDefault();
					});
				}
				onLoad?.();
			})
			.catch((error: Error) => {
				console.error("Failed to load BPMN diagram:", error);
				onError?.(error);
			});

		// 清理函数
		return () => {
			modeler.destroy();
		};
	}, [xml, readonly, onLoad, onError, showPropertiesPanel]);

	// 动态附加/分离功能
	const attachTo = (element: HTMLElement) => {
		if (modelerRef.current && element) {
			modelerRef.current.attachTo(element);
		}
	};

	const detach = () => {
		if (modelerRef.current) {
			modelerRef.current.detach();
		}
	};

	// 获取 BPMN XML
	const getXml = async (): Promise<string> => {
		if (!modelerRef.current) return xml;

		try {
			const { xml } = await modelerRef.current.saveXML({ format: true });
			return xml;
		} catch (error) {
			console.error("Failed to save BPMN diagram:", error);
			return xml;
		}
	};

	// 验证 BPMN 图表
	const validateDiagram = async (): Promise<string[]> => {
		if (!modelerRef.current) return [];

		try {
			const { warnings } = await modelerRef.current.importXML(xml);
			setWarnings(warnings || []);
			return warnings || [];
		} catch (error) {
			console.error("Failed to validate BPMN diagram:", error);
			return [];
		}
	};

	// 缩放控制
	const handleZoomIn = () => {
		if (!modelerRef.current) return;
		const canvas = modelerRef.current.get("canvas");
		const currentZoom = canvas.zoom();
		canvas.zoom(currentZoom + 0.1);
	};

	const handleZoomOut = () => {
		if (!modelerRef.current) return;
		const canvas = modelerRef.current.get("canvas");
		const currentZoom = canvas.zoom();
		canvas.zoom(currentZoom - 0.1);
	};

	const handleZoomReset = () => {
		if (!modelerRef.current) return;
		const canvas = modelerRef.current.get("canvas");
		canvas.zoom("fit-viewport");
	};

	// 暴露方法到 window 对象（用于调试和外部调用）
	useEffect(() => {
		(window as any).bpmnEditorAdvanced = {
			getXml,
			validateDiagram,
			attachTo,
			detach,
			getModeler: () => modelerRef.current,
		};
	}, []);

	return (
		<div className={`bpmn-editor-with-properties flex ${className}`} style={style}>
			{/* 属性面板在左侧 */}
			{showPropertiesPanel && propertiesPanelPosition === "left" && !readonly && (
				<div className="w-80 bg-gray-50 border-r border-gray-200">
					<div ref={propertiesRef} style={{ width: "100%", height: "100%" }} />
				</div>
			)}

			{/* 主编辑器区域 */}
			<div className="flex-1 relative">
				<div
					ref={containerRef}
					style={{ width: "100%", height: "100%", minHeight: "600px" }}
				/>
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
						<div className="text-gray-500 text-lg">正在加载 BPMN 编辑器...</div>
					</div>
				)}

				{/* 工具栏 */}
				<div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
					<button
						onClick={handleZoomIn}
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
						onClick={handleZoomOut}
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
						onClick={handleZoomReset}
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
				</div>

				{/* 状态栏 */}
				<div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg px-3 py-2">
					<div className="flex items-center space-x-4 text-sm text-gray-600">
						{selectedElement && (
							<span>
								选中: <strong>{selectedElement.businessObject?.name || selectedElement.id}</strong>
							</span>
						)}
						{warnings.length > 0 && (
							<span className="text-orange-600">
								⚠️ {warnings.length} 个警告
							</span>
						)}
					</div>
				</div>
			</div>

			{/* 属性面板在右侧 */}
			{showPropertiesPanel && propertiesPanelPosition === "right" && !readonly && (
				<div className="w-80 bg-gray-50 border-l border-gray-200">
					<div ref={propertiesRef} style={{ width: "100%", height: "100%" }} />
				</div>
			)}

			{/* 只读模式或隐藏属性面板时的简单信息面板 */}
			{(!showPropertiesPanel || readonly) && (
				<div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
					<h3 className="text-lg font-semibold text-gray-800 mb-4">元素信息</h3>

					{selectedElement ? (
						<div className="space-y-3">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									元素ID
								</label>
								<div className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
									{selectedElement.id}
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									元素类型
								</label>
								<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
									{selectedElement.type}
								</div>
							</div>

							{selectedElement.businessObject?.name && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										名称
									</label>
									<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
										{selectedElement.businessObject.name}
									</div>
								</div>
							)}

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									位置
								</label>
								<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
									X: {Math.round(selectedElement.x || 0)}, Y: {Math.round(selectedElement.y || 0)}
								</div>
							</div>

							{selectedElement.width && selectedElement.height && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										尺寸
									</label>
									<div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
										{Math.round(selectedElement.width)} × {Math.round(selectedElement.height)}
									</div>
								</div>
							)}

							{/* 警告信息 */}
							{warnings.length > 0 && (
								<div className="mt-4">
									<h4 className="text-sm font-medium text-red-700 mb-2">
										警告信息 ({warnings.length})
									</h4>
									<div className="space-y-1 max-h-32 overflow-y-auto">
										{warnings.map((warning, index) => (
											<div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
												{warning}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="text-sm text-gray-500">
							选择一个元素查看其信息
						</div>
					)}

					{/* 操作按钮 */}
					<div className="mt-6 space-y-2">
						<button
							onClick={validateDiagram}
							className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
						>
							验证图表
						</button>
						<button
							onClick={() => {
								if (modelerRef.current) {
									detach();
									setTimeout(() => {
										attachTo(containerRef.current!);
									}, 100);
								}
							}}
							className="w-full px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
						>
							测试动态分离/附加
						</button>
					</div>
				</div>
			)}
		</div>
	);
}