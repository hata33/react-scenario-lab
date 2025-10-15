"use client";

import BpmnModeler from "bpmn-js/lib/Modeler";
import { useCallback, useEffect, useRef, useState } from "react";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import Layout from "@/components/Layout";

// 组件属性类型定义
export interface BpmnEditorProps {
  xml?: string;
  readonly?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onSave?: (xml: string) => void;
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
}

// 默认的BPMN XML模板
const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="处理任务">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1_di" bpmnElement="Activity_1">
        <dc:Bounds x="280" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="450" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="280" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="380" y="120" />
        <di:waypoint x="450" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default function BpmnEditor({
  xml = defaultBpmnXml,
  readonly = false,
  onLoad,
  onError,
  onSave,
  className = "",
  style,
  height = "600px",
}: BpmnEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentXml, setCurrentXml] = useState(xml);

  // 初始化BPMN模型器
  useEffect(() => {
    if (!containerRef.current) return;

    // 创建模型器实例:cite[5]
    const modeler = new BpmnModeler({
      container: containerRef.current,
    });

    modelerRef.current = modeler;

    // 加载BPMN图表:cite[6]
    const loadDiagram = async () => {
      try {
        const { warnings } = await modeler.importXML(currentXml);
        console.log("BPMN图表加载成功", warnings);

        setIsLoaded(true);
        onLoad?.();

        // 只读模式下禁用编辑功能:cite[8]
        if (readonly) {
          const canvas = modeler.get("canvas");
          canvas.zoom("fit-viewport");

          // 禁用交互
          const eventBus = modeler.get("eventBus");
          eventBus.on("element.click", 2000, (e: any) => {
            e.preventDefault();
            e.stopPropagation();
          });
        }
      } catch (err) {
        console.error("加载BPMN图表失败:", err);
        onError?.(err as Error);
      }
    };

    loadDiagram();

    // 清理函数
    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
      }
    };
  }, [readonly]);

  // XML变化时重新加载
  useEffect(() => {
    if (modelerRef.current && isLoaded && xml !== currentXml) {
      modelerRef.current
        .importXML(xml)
        .then(({ warnings }) => {
          setCurrentXml(xml);
          console.log("BPMN图表更新成功", warnings);
        })
        .catch((err: Error) => {
          console.error("更新BPMN图表失败:", err);
          onError?.(err);
        });
    }
  }, [xml, isLoaded]);

  // 保存BPMN图表为XML:cite[2]
  const saveDiagram = useCallback(async () => {
    if (!modelerRef.current) return;

    try {
      const { xml: savedXml } = await modelerRef.current.saveXML({
        format: true,
      });
      setCurrentXml(savedXml);
      onSave?.(savedXml);

      // 创建下载链接
      const blob = new Blob([savedXml], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.bpmn";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return savedXml;
    } catch (err) {
      console.error("保存BPMN图表失败:", err);
      throw err;
    }
  }, [onSave]);

  // 导出为SVG
  const exportSVG = useCallback(async () => {
    if (!modelerRef.current) return;

    try {
      const { svg } = await modelerRef.current.saveSVG();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("导出SVG失败:", err);
    }
  }, []);

  // 缩放控制
  const zoomIn = useCallback(() => {
    if (modelerRef.current) {
      const canvas = modelerRef.current.get("canvas");
      const zoom = canvas.zoom();
      canvas.zoom(zoom * 1.2);
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (modelerRef.current) {
      const canvas = modelerRef.current.get("canvas");
      const zoom = canvas.zoom();
      canvas.zoom(zoom / 1.2);
    }
  }, []);

  const zoomFit = useCallback(() => {
    if (modelerRef.current) {
      const canvas = modelerRef.current.get("canvas");
      canvas.zoom("fit-viewport");
    }
  }, []);

  // 重置图表
  const resetDiagram = useCallback(() => {
    if (modelerRef.current) {
      modelerRef.current
        .importXML(defaultBpmnXml)
        .then(({ warnings }) => {
          setCurrentXml(defaultBpmnXml);
          console.log("图表重置成功", warnings);
        })
        .catch((err: Error) => {
          console.error("重置图表失败:", err);
        });
    }
  }, []);

  return (
    <Layout>
      <div className={`bpmn-editor-container ${className}`} style={style}>
      {/* 工具栏 */}
      {!readonly && (
        <div
          className="bpmn-toolbar"
          style={{
            padding: "10px",
            borderBottom: "1px solid #e8e8e8",
            backgroundColor: "#fafafa",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={saveDiagram}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#1890ff",
              color: "white",
              cursor: "pointer",
            }}
          >
            保存BPMN
          </button>
          <button
            onClick={exportSVG}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#52c41a",
              color: "white",
              cursor: "pointer",
            }}
          >
            导出SVG
          </button>
          <button
            onClick={zoomIn}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            放大
          </button>
          <button
            onClick={zoomOut}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            缩小
          </button>
          <button
            onClick={zoomFit}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            适应屏幕
          </button>
          <button
            onClick={resetDiagram}
            style={{
              padding: "6px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#ff4d4f",
              color: "white",
              cursor: "pointer",
            }}
          >
            重置
          </button>
          <span style={{ marginLeft: "auto", color: "#666", fontSize: "14px" }}>
            {readonly ? "查看模式" : "编辑模式"}
          </span>
        </div>
      )}

      {/* 编辑器容器 */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: height,
          minHeight: "400px",
          background: readonly ? "#f5f5f5" : "white",
        }}
        className={readonly ? "bpmn-viewer" : "bpmn-modeler"}
      />

      {/* 加载状态 */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: readonly ? "50%" : "calc(50% + 25px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "4px",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center", color: "#666" }}>
            正在加载BPMN编辑器...
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
}
