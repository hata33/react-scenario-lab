"use client";

import React, { useState, useRef } from "react";
import {
	FileText,
	FileSpreadsheet,
	File,
	Image,
	Download,
	Eye,
	Loader2,
} from "lucide-react";
import { ExportButton, ExportHistoryComponent } from "@/components/export";
import { useExport } from "@/hooks/export/useExport";

// 示例数据
const sampleData = [
	{
		id: 1,
		name: "张三",
		age: 25,
		email: "zhangsan@example.com",
		department: "技术部",
		salary: 8000,
	},
	{
		id: 2,
		name: "李四",
		age: 30,
		email: "lisi@example.com",
		department: "市场部",
		salary: 6000,
	},
	{
		id: 3,
		name: "王五",
		age: 28,
		email: "wangwu@example.com",
		department: "财务部",
		salary: 7000,
	},
	{
		id: 4,
		name: "赵六",
		age: 35,
		email: "zhaoliu@example.com",
		department: "人事部",
		salary: 6500,
	},
	{
		id: 5,
		name: "钱七",
		age: 26,
		email: "qianqi@example.com",
		department: "技术部",
		salary: 8500,
	},
];

const sampleObjectData = {
	company: "示例公司",
	address: "北京市朝阳区",
	employees: sampleData.length,
	departments: ["技术部", "市场部", "财务部", "人事部"],
	established: "2020-01-01",
	website: "https://example.com",
};

const sampleTextData = `
# 示例文档

这是一个示例文本内容，包含：

## 功能特性
- 支持多种格式导出
- 用户友好的界面
- 实时进度反馈
- 历史记录管理

## 使用方法
1. 选择导出格式
2. 设置文件名
3. 点击导出按钮
4. 等待导出完成

## 注意事项
- 请确保浏览器支持相关功能
- 大文件导出可能需要较长时间
- 导出历史会保存在本地存储中
`;

export function ExportDemoPage() {
	const [activeTab, setActiveTab] = useState("table");
	const contentRef = useRef<HTMLDivElement>(null);

	const { exporting, progress, quickExport, preview } = useExport({
		defaultFilename: "export_demo",
		defaultFormat: "xlsx",
	});

	const handleExportComplete = () => {
		console.log("导出完成");
	};

	const handleExportError = (error: Error) => {
		console.error("导出失败:", error);
	};

	const columns = [
		{ title: "ID", key: "id", render: (_: any, record: any) => record.id },
		{
			title: "姓名",
			key: "name",
			render: (_: any, record: any) => record.name,
		},
		{ title: "年龄", key: "age", render: (_: any, record: any) => record.age },
		{
			title: "邮箱",
			key: "email",
			render: (_: any, record: any) => record.email,
		},
		{
			title: "部门",
			key: "department",
			render: (_: any, record: any) => record.department,
		},
		{
			title: "薪资",
			key: "salary",
			render: (_: any, record: any) => `¥${record.salary}`,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						导出功能演示
					</h1>
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<FileText className="h-5 w-5 text-blue-400" />
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-blue-800">
									导出功能演示
								</h3>
								<div className="mt-2 text-sm text-blue-700">
									此页面演示了多种导出格式的使用方法，包括表格数据、对象数据和文本数据的导出。
								</div>
							</div>
						</div>
					</div>

					{/* 标签页导航 */}
					<div className="border-b border-gray-200 mb-6">
						<nav className="-mb-px flex space-x-8">
							{[
								{ key: "table", label: "表格数据导出" },
								{ key: "object", label: "对象数据导出" },
								{ key: "text", label: "文本数据导出" },
								{ key: "page", label: "页面内容导出" },
							].map((tab) => (
								<button
									key={tab.key}
									onClick={() => setActiveTab(tab.key)}
									className={`py-2 px-1 border-b-2 font-medium text-sm ${
										activeTab === tab.key
											? "border-blue-500 text-blue-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}
								>
									{tab.label}
								</button>
							))}
						</nav>
					</div>

					{/* 表格数据导出 */}
					{activeTab === "table" && (
						<div className="space-y-6">
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									员工数据表格
								</h3>
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												{columns.map((column) => (
													<th
														key={column.key}
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														{column.title}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{sampleData.map((row, index) => (
												<tr key={index} className="hover:bg-gray-50">
													{columns.map((column) => (
														<td
															key={column.key}
															className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
														>
															{column.render?.(null, row) ||
																(row as any)[column.key]}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div className="mt-6 flex flex-wrap gap-3">
									<ExportButton
										data={sampleData}
										filename="employee_data"
										availableFormats={["xlsx", "csv", "json", "pdf"]}
										onExportStart={() => console.log("开始导出表格数据")}
										onExportComplete={handleExportComplete}
										onExportError={handleExportError}
									>
										导出表格数据
									</ExportButton>

									<button
										onClick={() =>
											quickExport(sampleData, "quick_export", "xlsx")
										}
										disabled={exporting}
										className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{exporting ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												导出中...
											</>
										) : (
											<>
												<Download className="w-4 h-4 mr-2" />
												快速导出Excel
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					)}

					{/* 对象数据导出 */}
					{activeTab === "object" && (
						<div className="space-y-6">
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									公司信息
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
									{Object.entries(sampleObjectData).map(([key, value]) => (
										<div key={key} className="bg-gray-50 p-3 rounded-lg">
											<span className="font-medium text-gray-700">{key}:</span>
											<span className="ml-2 text-gray-900">
												{String(value)}
											</span>
										</div>
									))}
								</div>

								<div className="flex flex-wrap gap-3">
									<ExportButton
										data={sampleObjectData}
										filename="company_info"
										availableFormats={["json", "xml", "pdf", "docx"]}
									>
										导出对象数据
									</ExportButton>

									<button
										onClick={() =>
											quickExport(sampleObjectData, "company_data", "json")
										}
										disabled={exporting}
										className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{exporting ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												导出中...
											</>
										) : (
											<>
												<Download className="w-4 h-4 mr-2" />
												导出JSON
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					)}

					{/* 文本数据导出 */}
					{activeTab === "text" && (
						<div className="space-y-6">
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									示例文档
								</h3>
								<div
									ref={contentRef}
									className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap font-mono text-sm"
								>
									{sampleTextData}
								</div>

								<div className="mt-6 flex flex-wrap gap-3">
									<ExportButton
										data={sampleTextData}
										filename="sample_document"
										availableFormats={["txt", "markdown", "pdf", "docx"]}
									>
										导出文本文档
									</ExportButton>

									<button
										onClick={() =>
											quickExport(sampleTextData, "document", "markdown")
										}
										disabled={exporting}
										className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{exporting ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												导出中...
											</>
										) : (
											<>
												<Download className="w-4 h-4 mr-2" />
												导出Markdown
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					)}

					{/* 页面内容导出 */}
					{activeTab === "page" && (
						<div className="space-y-6">
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									页面内容截图
								</h3>
								<div
									ref={contentRef}
									className="p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg"
								>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										页面内容示例
									</h3>
									<p className="text-gray-600 mb-6">
										这是一个可以被导出为图片的页面内容区域。
									</p>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
										<div className="bg-blue-50 p-4 rounded-lg">
											<h4 className="font-semibold text-blue-900 mb-2">
												统计信息1
											</h4>
											<p className="text-blue-700">数据项：100</p>
											<p className="text-blue-700">完成率：85%</p>
										</div>
										<div className="bg-green-50 p-4 rounded-lg">
											<h4 className="font-semibold text-green-900 mb-2">
												统计信息2
											</h4>
											<p className="text-green-700">用户数：1,234</p>
											<p className="text-green-700">增长率：12%</p>
										</div>
										<div className="bg-yellow-50 p-4 rounded-lg">
											<h4 className="font-semibold text-yellow-900 mb-2">
												统计信息3
											</h4>
											<p className="text-yellow-700">收入：¥50,000</p>
											<p className="text-yellow-700">成本：¥30,000</p>
										</div>
									</div>
								</div>

								<div className="mt-6">
									<ExportButton
										data={contentRef.current}
										filename="page_screenshot"
										availableFormats={["png", "jpg"]}
									>
										导出页面截图
									</ExportButton>
								</div>
							</div>
						</div>
					)}

					{/* 导出进度显示 */}
					{progress && (
						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								导出进度
							</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-700">
										状态：
									</span>
									<span
										className={`px-2 py-1 text-xs rounded-full ${
											progress.status === "completed"
												? "text-green-600 bg-green-100"
												: progress.status === "error"
													? "text-red-600 bg-red-100"
													: "text-blue-600 bg-blue-100"
										}`}
									>
										{progress.status === "completed"
											? "已完成"
											: progress.status === "error"
												? "失败"
												: "进行中"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-700">
										进度：
									</span>
									<span className="text-sm text-gray-900">
										{progress.progress}%
									</span>
								</div>
								{progress.message && (
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-700">
											信息：
										</span>
										<span className="text-sm text-gray-600">
											{progress.message}
										</span>
									</div>
								)}
								{progress.fileSize && (
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-700">
											文件大小：
										</span>
										<span className="text-sm text-gray-900">
											{(progress.fileSize / 1024).toFixed(2)} KB
										</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* 导出历史记录 */}
				<ExportHistoryComponent />
			</div>
		</div>
	);
}
