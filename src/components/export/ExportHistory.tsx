"use client";

import React, { useState, useEffect } from "react";
import {
	History,
	Download,
	Trash2,
	Eye,
	FileText,
	FileSpreadsheet,
	File,
	Image,
	RefreshCw,
} from "lucide-react";
import type { ExportHistory } from "@/types/export";
import { ExportManager } from "@/services/export/exportManager";

interface ExportHistoryProps {
	className?: string;
	onRefresh?: () => void;
}

export const ExportHistoryComponent: React.FC<ExportHistoryProps> = ({
	className,
	onRefresh,
}) => {
	const [history, setHistory] = useState<ExportHistory[]>([]);
	const [loading, setLoading] = useState(false);

	const exportManager = ExportManager.getInstance();

	useEffect(() => {
		loadHistory();
	}, []);

	const loadHistory = async () => {
		setLoading(true);
		try {
			const exportHistory = exportManager.getHistory();
			setHistory(exportHistory);
		} catch (error) {
			console.error("加载导出历史失败:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = () => {
		loadHistory();
		onRefresh?.();
	};

	const handleClearHistory = () => {
		exportManager.clearHistory();
		setHistory([]);
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatTime = (timestamp: Date): string => {
		return new Date(timestamp).toLocaleString("zh-CN");
	};

	const getFormatIcon = (format: string) => {
		switch (format) {
			case "txt":
			case "json":
			case "xml":
			case "markdown":
				return FileText;
			case "csv":
			case "xlsx":
			case "xls":
				return FileSpreadsheet;
			case "pdf":
			case "docx":
				return File;
			case "png":
			case "jpg":
			case "svg":
				return Image;
			default:
				return FileText;
		}
	};

	const getStatusTag = (status: string) => {
		const color =
			status === "success"
				? "text-green-600 bg-green-100"
				: "text-red-600 bg-red-100";
		const text = status === "success" ? "成功" : "失败";
		return (
			<span className={`px-2 py-1 text-xs rounded-full ${color}`}>{text}</span>
		);
	};

	const showHistoryDetail = (record: ExportHistory) => {
		const detailContent = (
			<div className="space-y-3">
				<p>
					<strong>文件名:</strong> {record.filename}
				</p>
				<p>
					<strong>格式:</strong> {record.format.toUpperCase()}
				</p>
				<p>
					<strong>状态:</strong> {record.status === "success" ? "成功" : "失败"}
				</p>
				<p>
					<strong>文件大小:</strong> {formatFileSize(record.fileSize)}
				</p>
				<p>
					<strong>导出时间:</strong> {formatTime(record.timestamp)}
				</p>
				<div>
					<strong>配置信息:</strong>
					<pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
						{JSON.stringify(record.config, null, 2)}
					</pre>
				</div>
			</div>
		);

		showDetailModal("导出详情", detailContent);
	};

	const showDetailModal = (title: string, content: React.ReactNode) => {
		const modalContainer = document.createElement("div");
		modalContainer.className =
			"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
		modalContainer.innerHTML = `
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">${title}</h3>
          <button class="p-1 hover:bg-gray-100 rounded close-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="modal-content"></div>
      </div>
    `;

		document.body.appendChild(modalContainer);

		const closeBtn = modalContainer.querySelector(".close-btn");
		closeBtn?.addEventListener("click", () => {
			document.body.removeChild(modalContainer);
		});

		const contentDiv = modalContainer.querySelector(".modal-content");
		if (contentDiv) {
			// Convert React nodes to string (simplified)
			contentDiv.innerHTML = content as string;
		}

		// Close on outside click
		modalContainer.addEventListener("click", (e) => {
			if (e.target === modalContainer) {
				document.body.removeChild(modalContainer);
			}
		});
	};

	const handleDeleteRecord = (recordId: string) => {
		if (confirm("确定要删除这条记录吗？")) {
			const updatedHistory = history.filter((record) => record.id !== recordId);
			setHistory(updatedHistory);

			try {
				if (typeof localStorage !== "undefined") {
					localStorage.setItem(
						"export_history",
						JSON.stringify(updatedHistory),
					);
				}
			} catch (error) {
				console.error("删除记录失败:", error);
			}
		}
	};

	return (
		<div className={`bg-white rounded-lg shadow ${className}`}>
			<div className="px-6 py-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<History className="w-5 h-5" />
						<h3 className="text-lg font-semibold">导出历史记录</h3>
					</div>
					<div className="flex space-x-2">
						<button
							onClick={handleRefresh}
							disabled={loading}
							className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
						>
							<RefreshCw
								className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`}
							/>
							刷新
						</button>
						<button
							onClick={handleClearHistory}
							className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
						>
							<Trash2 className="w-4 h-4 mr-1" />
							清除历史
						</button>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				{loading ? (
					<div className="flex justify-center items-center h-32">
						<RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
					</div>
				) : history.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						<History className="w-12 h-12 mx-auto mb-2 opacity-50" />
						<p>暂无导出历史记录</p>
					</div>
				) : (
					<table className="w-full">
						<thead className="bg-gray-50 border-b border-gray-200">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									文件名
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									格式
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									状态
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									文件大小
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									导出时间
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									操作
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{history.map((record) => {
								const IconComponent = getFormatIcon(record.format);
								return (
									<tr key={record.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<IconComponent className="w-4 h-4 mr-2 text-gray-400" />
												<span className="text-sm font-medium text-gray-900 truncate max-w-xs">
													{record.filename}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
												{record.format.toUpperCase()}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusTag(record.status)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatFileSize(record.fileSize)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatTime(record.timestamp)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex space-x-2">
												{record.downloadUrl && (
													<button
														onClick={() =>
															window.open(record.downloadUrl, "_blank")
														}
														className="text-blue-600 hover:text-blue-900"
														title="下载文件"
													>
														<Download className="w-4 h-4" />
													</button>
												)}
												<button
													onClick={() => showHistoryDetail(record)}
													className="text-gray-600 hover:text-gray-900"
													title="查看详情"
												>
													<Eye className="w-4 h-4" />
												</button>
												<button
													onClick={() => handleDeleteRecord(record.id)}
													className="text-red-600 hover:text-red-900"
													title="删除记录"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};
