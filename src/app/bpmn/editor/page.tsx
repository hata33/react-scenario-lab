"use client";

import { useState } from "react";
import BpmnEditor from "@/components/bpmn/editor/BpmnEditor";
import Layout from "@/components/Layout";

export default function BpmnEditorPage() {
	const [isReadonly, setIsReadonly] = useState(false);

	const handleLoad = () => {
		console.log("BPMN 编辑器已加载");
	};

	const handleError = (error: Error) => {
		console.error("BPMN 编辑器加载失败:", error);
	};

	const handleExport = async () => {
		if ((window as any).getBpmnXml) {
			try {
				const exportedXml = await (window as any).getBpmnXml();
				if (exportedXml) {
					// 下载 XML 文件
					const blob = new Blob([exportedXml], { type: "text/xml" });
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = "bpmn-diagram.bpmn";
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				}
			} catch (error) {
				console.error("导出失败:", error);
			}
		}
	};

	return (
		<Layout>
			<div className="flex h-screen flex-col">
				{/* 顶部工具栏 */}
				<div className="flex h-16 shrink-0 items-center justify-between border-gray-200 border-b bg-white px-6">
					<h1 className="font-bold text-xl">BPMN 流程编辑器</h1>
					<div className="flex gap-3">
						<button
							onClick={() => setIsReadonly(!isReadonly)}
							className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
						>
							{isReadonly ? "启用编辑" : "只读模式"}
						</button>
						<button
							onClick={handleExport}
							className="rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600"
						>
							导出 XML
						</button>
					</div>
				</div>

				{/* BPMN 编辑器容器 */}
				<div className="flex-1 bg-gray-50">
					<BpmnEditor readonly={isReadonly} onLoad={handleLoad} onError={handleError} className="h-full w-full" />
				</div>
			</div>
		</Layout>
	);
}
