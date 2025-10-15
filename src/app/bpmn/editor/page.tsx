"use client";

import { useState } from "react";
import BpmnEditor from "@/components/bpmn/editor/BpmnEditor";

export default function BpmnEditorPage() {
	const [bpmnXml, setBpmnXml] = useState("");

	const handleLoad = () => {
		console.log("BPMN 编辑器加载完成");
	};

	const handleError = (error: Error) => {
		console.error("BPMN 编辑器加载失败:", error);
	};

	const handleExport = async () => {
		// 从全局对象获取 XML
		if ((window as any).getBpmnXml) {
			try {
				const xml = await (window as any).getBpmnXml();
				setBpmnXml(xml);

				// 创建下载链接
				const blob = new Blob([xml], { type: "text/xml" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "diagram.bpmn";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error("导出失败:", error);
			}
		}
	};

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					BPMN 流程编辑器
				</h1>
				<p className="text-gray-600">
					使用 bpmn-js 创建和编辑 BPMN 流程图。支持拖拽元素、创建连接、编辑属性等功能。
				</p>
			</div>

			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				{/* 工具栏 */}
				<div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<h2 className="text-lg font-semibold text-gray-800">
								流程设计器
							</h2>
							<span className="text-sm text-gray-500">
								拖拽左侧元素面板中的组件到画布上
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<button
								onClick={handleExport}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								导出 BPMN
							</button>
						</div>
					</div>
				</div>

				{/* BPMN 编辑器 */}
				<div className="relative h-[600px]">
					<BpmnEditor
						onLoad={handleLoad}
						onError={handleError}
						className="w-full h-full"
					/>
				</div>
			</div>

			{/* 使用说明 */}
			<div className="mt-6 bg-blue-50 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-blue-800 mb-3">
					使用说明
				</h3>
				<div className="space-y-2 text-sm text-blue-700">
					<p>• 从左侧元素面板拖拽任务、网关、事件等组件到画布</p>
					<p>• 拖拽元素的边缘点来创建连接线</p>
					<p>• 双击元素可以编辑名称和属性</p>
					<p>• 使用 Ctrl+Z 撤销，Ctrl+Y 重做操作</p>
					<p>• 使用鼠标滚轮或按钮进行缩放</p>
					<p>• 右键点击元素可以查看更多操作选项</p>
					<p>• 点击导出按钮可以下载 BPMN XML 文件</p>
				</div>
			</div>
		</div>
	);
}