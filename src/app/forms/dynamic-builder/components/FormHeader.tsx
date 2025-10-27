"use client";

import { ArrowLeft, Download, Eye, Upload } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { BuilderMode } from "../types";

interface FormHeaderProps {
	mode: BuilderMode;
	onModeToggle: () => void;
	onExport: () => void;
	onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	performanceMetrics?: Record<string, any>;
	isVirtualMode?: boolean;
	onToggleVirtualMode?: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({
	mode,
	onModeToggle,
	onExport,
	onImport,
	fileInputRef,
	performanceMetrics,
	isVirtualMode,
	onToggleVirtualMode,
}) => {
	return (
		<header className="border-b bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link href="/forms" className="flex items-center text-gray-600 hover:text-gray-900">
							<ArrowLeft className="mr-2 h-5 w-5" />
							返回表单列表
						</Link>
						<h1 className="font-semibold text-gray-900 text-xl">动态表单构建器</h1>
					</div>

					<div className="flex items-center space-x-2">
						<button
							onClick={onModeToggle}
							className={`rounded-lg px-4 py-2 font-medium transition-colors ${
								mode === "preview" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							<Eye className="mr-2 inline h-4 w-4" />
							{mode === "preview" ? "预览模式" : "编辑模式"}
						</button>

						<button
							onClick={onExport}
							className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
						>
							<Download className="mr-2 inline h-4 w-4" />
							导出配置
						</button>

						<label className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700">
							<Upload className="mr-2 inline h-4 w-4" />
							导入配置
							<input ref={fileInputRef} type="file" accept=".json" onChange={onImport} className="hidden" />
						</label>

						{onToggleVirtualMode && (
							<button
								onClick={onToggleVirtualMode}
								className={`rounded-lg px-4 py-2 font-medium transition-colors ${
									isVirtualMode ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{isVirtualMode ? "虚拟渲染" : "标准渲染"}
							</button>
						)}

						{performanceMetrics && (
							<div className="px-2 py-1 text-gray-500 text-xs">
								字段: {performanceMetrics.totalFields} | 复杂度: {performanceMetrics.isComplex ? "高" : "低"}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default FormHeader;
