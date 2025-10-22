"use client";

import React, { useEffect, useRef, useState } from "react";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { commonmark } from "@milkdown/preset-commonmark";
import "@milkdown/theme-nord/style.css";

const MilkdownEditorPage = () => {
	// 添加内联样式以确保编辑器正确显示
	useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
			.milkdown-editor {
				min-height: 500px;
				padding: 16px;
				outline: none;
			}
			.milkdown-editor .editor {
				min-height: 500px;
			}
			.milkdown-editor .milkdown {
				min-height: 500px;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	const [content, setContent] = useState("# Milkdown 编辑器\n\n欢迎使用 **Milkdown** 编辑器！\n\n## 特性\n\n- 🎨 美观的主题\n- ⚡ 实时渲染\n- 🔧 可扩展插件\n\n试试编辑一些内容吧！");
	const editorRef = useRef<HTMLDivElement>(null);
	const editorInstanceRef = useRef<any>(null);

	useEffect(() => {
		if (editorRef.current && !editorInstanceRef.current) {
			const editor = Editor.make()
				.config((ctx) => {
					ctx.set(rootCtx, editorRef.current);
					ctx.set(defaultValueCtx, content);
				})
				.use(nord as any)
				.use(commonmark);

			editor.create().then((editorInstance: any) => {
				editorInstanceRef.current = editorInstance;
			}).catch((error: Error) => {
				console.error("Milkdown editor creation failed:", error);
			});
		}

		return () => {
			if (editorInstanceRef.current) {
				try {
					editorInstanceRef.current.destroy();
				} catch (error) {
					console.error("Error destroying editor:", error);
				}
				editorInstanceRef.current = null;
			}
		};
	}, [content]);

	const handleExport = () => {
		if (!editorInstanceRef.current) return;

		try {
			const markdown = editorInstanceRef.current.action((ctx: any) => {
				return ctx.get(defaultValueCtx);
			});

			const blob = new Blob([markdown || content], { type: "text/markdown" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "milkdown-document.md";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export failed:", error);
			// Fallback to original content
			const blob = new Blob([content], { type: "text/markdown" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "milkdown-document.md";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					Milkdown 编辑器
				</h1>
				<p className="text-lg text-gray-600">
					基于 Milkdown 的现代 Markdown 编辑器，提供优秀的编辑体验
				</p>
			</div>

			{/* 工具栏 */}
			<div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<h2 className="text-lg font-semibold text-gray-800">编辑器</h2>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span>实时预览</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={handleExport}
						className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						导出 Markdown
					</button>
				</div>
			</div>

			{/* 编辑器容器 */}
			<div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
				<div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<svg
							className="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M14.857 17.082l-1.714-1.714a6.001 6.001 0 01-8.485-8.485l1.714 1.714a6.001 6.001 0 018.485 8.485zm-6.714-6.714l-1.714-1.714a6.001 6.001 0 00-8.485 8.485l1.714 1.714a6.001 6.001 0 008.485-8.485zm4.243 2.828l-1.414 1.414-1.414-1.414-1.414 1.414-1.414-1.414 1.414-1.414-1.414-1.414 1.414-1.414 1.414 1.414 1.414-1.414 1.414 1.414-1.414 1.414z" />
						</svg>
						<span>Milkdown 编辑器 - 支持 CommonMark 语法</span>
					</div>
				</div>
				<div className="min-h-[500px]">
					<div ref={editorRef} className="milkdown-editor" />
				</div>
			</div>

			{/* 使用说明 */}
			<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-blue-900 mb-3">使用说明</h3>
				<div className="space-y-2 text-sm text-blue-800">
					<p>• 支持标准 Markdown 语法，包括标题、粗体、斜体、链接等</p>
					<p>• 实时渲染，输入即所见</p>
					<p>• 使用 Nord 主题，提供舒适的视觉体验</p>
					<p>• 支持导出为 Markdown 文件</p>
				</div>
			</div>
		</div>
	);
};

export default MilkdownEditorPage;