"use client";

import { Download, Eye, File, FileSpreadsheet, FileText, Image, Loader2, Settings, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ExportManager } from "@/services/export/exportManager";
import type { ExportConfig, ExportFormat, ExportOptions, ExportProgress } from "@/types/export";

export interface ExportButtonProps {
	data: any;
	filename?: string;
	availableFormats?: ExportFormat[];
	className?: string;
	children?: React.ReactNode;
	onExportStart?: () => void;
	onExportComplete?: () => void;
	onExportError?: (error: Error) => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
	data,
	filename = "export",
	availableFormats = ["txt", "csv", "json", "xlsx", "pdf", "docx"],
	className,
	children,
	onExportStart,
	onExportComplete,
	onExportError,
}) => {
	const [visible, setVisible] = useState(false);
	const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(availableFormats[0]);
	const [customFilename, setCustomFilename] = useState(filename);
	const [exporting, setExporting] = useState(false);
	const [progress, setProgress] = useState<ExportProgress | null>(null);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewData, setPreviewData] = useState<string>("");

	const exportManager = ExportManager.getInstance();

	const formatOptions = [
		{ value: "txt", label: "文本文件", icon: FileText },
		{ value: "csv", label: "CSV文件", icon: FileSpreadsheet },
		{ value: "json", label: "JSON文件", icon: FileText },
		{ value: "xlsx", label: "Excel文件", icon: FileSpreadsheet },
		{ value: "pdf", label: "PDF文件", icon: File },
		{ value: "docx", label: "Word文件", icon: File },
		{ value: "png", label: "PNG图片", icon: Image },
		{ value: "jpg", label: "JPG图片", icon: Image },
		{ value: "markdown", label: "Markdown", icon: FileText },
	];

	const handleExport = async () => {
		try {
			setExporting(true);
			onExportStart?.();

			const config: ExportConfig = {
				filename: customFilename,
				format: selectedFormat,
				data,
				options: getExportOptions(),
			};

			// 注册进度回调
			const exportId = `export_${Date.now()}`;
			exportManager.registerProgressCallback(exportId, setProgress);

			await exportManager.export(config);

			setExporting(false);
			onExportComplete?.();
			setVisible(false);

			// 清理进度回调
			exportManager.unregisterProgressCallback(exportId);
		} catch (error) {
			setExporting(false);
			const err = error instanceof Error ? error : new Error("导出失败");
			onExportError?.(err);
		}
	};

	const getExportOptions = (): ExportOptions => {
		const baseOptions: ExportOptions = {
			encoding: "utf-8",
			includeHeaders: true,
			quality: 0.9,
		};

		// 根据格式添加特定选项
		switch (selectedFormat) {
			case "xlsx":
			case "xls":
				return {
					...baseOptions,
					sheetName: "Sheet1",
				};
			case "pdf":
				return {
					...baseOptions,
					pageSize: "A4",
					orientation: "portrait",
				};
			case "png":
			case "jpg":
				return {
					...baseOptions,
					scale: 2,
					quality: 0.9,
				};
			default:
				return baseOptions;
		}
	};

	const handlePreview = async () => {
		try {
			// 生成预览数据
			let preview = "";

			switch (selectedFormat) {
				case "txt":
					preview = JSON.stringify(data, null, 2).substring(0, 1000);
					break;
				case "csv":
					if (Array.isArray(data) && data.length > 0) {
						const headers = Object.keys(data[0]);
						preview = headers.join(",") + "\n";
						preview += Object.values(data[0]).join(",");
					}
					break;
				case "json":
					preview = JSON.stringify(data, null, 2).substring(0, 1000);
					break;
				case "markdown":
					if (Array.isArray(data)) {
						preview = "| " + Object.keys(data[0] || {}).join(" | ") + " |\n";
						preview +=
							"|" +
							Object.keys(data[0] || {})
								.map(() => "---")
								.join("|") +
							"|\n";
					}
					break;
				default:
					preview = "预览功能暂不支持此格式";
			}

			setPreviewData(preview);
			setPreviewVisible(true);
		} catch (error) {
			console.error("生成预览失败:", error);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "error":
				return "bg-red-500";
			case "processing":
				return "bg-blue-500";
			default:
				return "bg-gray-300";
		}
	};

	const IconComponent = formatOptions.find((opt) => opt.value === selectedFormat)?.icon || FileText;

	return (
		<>
			<button
				onClick={() => setVisible(true)}
				className={`inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 ${className}`}
			>
				<Download className="mr-2 h-4 w-4" />
				{children || "导出"}
			</button>

			{/* 导出设置模态框 */}
			{visible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="font-semibold text-xl">导出设置</h2>
							<button onClick={() => setVisible(false)} className="rounded p-1 hover:bg-gray-100">
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="space-y-6">
							{/* 文件名设置 */}
							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">文件名</label>
								<input
									type="text"
									value={customFilename}
									onChange={(e) => setCustomFilename(e.target.value)}
									placeholder="请输入文件名"
									className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* 格式选择 */}
							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">导出格式</label>
								<select
									value={selectedFormat}
									onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
									className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{formatOptions
										.filter((option) => availableFormats.includes(option.value as ExportFormat))
										.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
								</select>
							</div>

							{/* 预览按钮 */}
							<button
								onClick={handlePreview}
								disabled={!data}
								className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<Eye className="mr-2 h-4 w-4" />
								预览
							</button>

							{/* 进度显示 */}
							{progress && (
								<div className="rounded-lg bg-gray-50 p-4">
									<div className="mb-2 flex items-center justify-between">
										<span className="font-medium text-sm">导出进度: {progress.progress}%</span>
										{progress.message && <span className="text-gray-600 text-sm">({progress.message})</span>}
									</div>
									<div className="h-2 w-full rounded-full bg-gray-200">
										<div
											className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(progress.status)}`}
											style={{ width: `${progress.progress}%` }}
										/>
									</div>
									{progress.status === "error" && (
										<div className="mt-2 rounded border border-red-300 bg-red-100 p-2 text-red-700 text-sm">
											<strong>导出失败:</strong> {progress.message}
										</div>
									)}
								</div>
							)}

							{/* 操作按钮 */}
							<div className="flex justify-end space-x-3">
								<button
									onClick={() => setVisible(false)}
									className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
								>
									取消
								</button>
								<button
									onClick={handleExport}
									disabled={exporting || !data}
									className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{exporting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											导出中...
										</>
									) : (
										<>
											<Download className="mr-2 h-4 w-4" />
											开始导出
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 预览模态框 */}
			{previewVisible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-semibold text-lg">导出预览</h3>
							<button onClick={() => setPreviewVisible(false)} className="rounded p-1 hover:bg-gray-100">
								<X className="h-5 w-5" />
							</button>
						</div>
						<textarea
							value={previewData}
							readOnly
							rows={10}
							className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm"
						/>
					</div>
				</div>
			)}
		</>
	);
};
