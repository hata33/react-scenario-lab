"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Download, Upload } from "lucide-react";
import { BuilderMode } from "../types";

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
		<header className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Link
							href="/forms"
							className="flex items-center text-gray-600 hover:text-gray-900"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							返回表单列表
						</Link>
						<h1 className="text-xl font-semibold text-gray-900">
							动态表单构建器
						</h1>
					</div>

					<div className="flex items-center space-x-2">
						<button
							onClick={onModeToggle}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								mode === "preview"
									? "bg-green-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							<Eye className="w-4 h-4 mr-2 inline" />
							{mode === "preview" ? "预览模式" : "编辑模式"}
						</button>

						<button
							onClick={onExport}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
						>
							<Download className="w-4 h-4 mr-2 inline" />
							导出配置
						</button>

						<label className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors cursor-pointer">
							<Upload className="w-4 h-4 mr-2 inline" />
							导入配置
							<input
								ref={fileInputRef}
								type="file"
								accept=".json"
								onChange={onImport}
								className="hidden"
							/>
						</label>

						{onToggleVirtualMode && (
							<button
								onClick={onToggleVirtualMode}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									isVirtualMode
										? "bg-purple-600 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{isVirtualMode ? "虚拟渲染" : "标准渲染"}
							</button>
						)}

						{performanceMetrics && (
							<div className="text-xs text-gray-500 px-2 py-1">
								字段: {performanceMetrics.totalFields} |
								复杂度: {performanceMetrics.isComplex ? '高' : '低'}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default FormHeader;
