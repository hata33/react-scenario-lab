"use client";

import BpmnJS from "bpmn-js";
import { useEffect, useRef, useState } from "react";
import type { BpmnEditorProps } from "../types/bpmn.types";

// 默认的 BPMN XML
const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.16.0">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="开始">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="处理任务">
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

export default function BpmnEditor({
	xml = defaultBpmnXml,
	readonly = false,
	onLoad,
	onError,
	className = "",
	style,
}: BpmnEditorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewerRef = useRef<BpmnJS | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!containerRef.current) return;

		// 创建 BPMN 实例
		const viewer = new BpmnJS({
			container: containerRef.current,
		});

		viewerRef.current = viewer;

		// 导入 BPMN XML
		viewer
			.importXML(xml)
			.then(({ warnings }) => {
				setIsLoaded(true);
				// 如果是只读模式，禁用编辑功能
				if (readonly) {
					const _canvas = viewer.get("canvas");
					const eventBus = viewer.get("eventBus") as any;

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
			viewer.destroy();
		};
	}, [xml, readonly, onLoad, onError]);

	// 获取 BPMN XML
	const getXml = async (): Promise<string> => {
		if (!viewerRef.current) return xml;

		try {
			const { xml: savedXml } = await viewerRef.current.saveXML({ format: true });
			return savedXml ?? xml;
		} catch (error) {
			console.error("Failed to save BPMN diagram:", error);
			return xml;
		}
	};

	// 暴露获取 XML 的方法到 window 对象（用于调试）
	useEffect(() => {
		(window as any).getBpmnXml = getXml;
	}, [getXml]);

	return (
		<div className={`bpmn-editor relative ${className}`} style={style}>
			<div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "600px" }} />
			{!isLoaded && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-90">
					<div className="text-gray-500 text-lg">正在加载 BPMN 编辑器...</div>
				</div>
			)}
		</div>
	);
}
