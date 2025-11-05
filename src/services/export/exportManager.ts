/**
 * 导出管理器 - 统一的导出功能入口
 */

import { saveAs } from "file-saver";
import type { ExportConfig, ExportFormat, ExportHistory, ExportOptions, ExportProgress } from "@/types/export";
import { DocumentExporter } from "@/utils/export/documentExport";
import { ImageExporter } from "@/utils/export/imageExport";
import { TableExporter } from "@/utils/export/tableExport";
import { TextExporter } from "@/utils/export/textExport";

export class ExportManager {
	private static instance: ExportManager;
	private progressCallbacks: Map<string, (progress: ExportProgress) => void> = new Map();
	private exportHistory: ExportHistory[] = [];

	private constructor() {
		// 私有构造函数，确保单例
	}

	static getInstance(): ExportManager {
		if (!ExportManager.instance) {
			ExportManager.instance = new ExportManager();
		}
		return ExportManager.instance;
	}

	/**
	 * 主导出方法
	 */
	async export(config: ExportConfig): Promise<void> {
		const exportId = this.generateExportId();
		const startTime = new Date();

		try {
			// 初始化进度
			this.updateProgress(exportId, {
				id: exportId,
				filename: config.filename,
				format: config.format,
				progress: 0,
				status: "pending",
				startTime,
			});

			// 根据格式选择导出方法
			let content: string | Blob;

			switch (config.format) {
				case "txt":
					content = TextExporter.exportToTxt(config.data, config.options);
					break;
				case "csv":
					content = TextExporter.exportToCsv(config.data, config.options);
					break;
				case "json":
					content = TextExporter.exportToJson(config.data, config.options);
					break;
				case "xml":
					content = TextExporter.exportToXml(config.data, config.options);
					break;
				case "xlsx":
				case "xls":
					this.updateProgress(exportId, { status: "processing", progress: 20 });
					content = await TableExporter.exportToExcel(config.data, config.options);
					break;
				case "pdf":
					this.updateProgress(exportId, { status: "processing", progress: 20 });
					content = await DocumentExporter.exportToPdf(config.data, config.options);
					break;
				case "docx":
					this.updateProgress(exportId, { status: "processing", progress: 20 });
					content = await DocumentExporter.exportToDocx(config.data, config.options);
					break;
				case "markdown":
					content = DocumentExporter.exportToMarkdown(config.data, config.options);
					break;
				case "png":
				case "jpg":
				case "svg":
					if (config.data instanceof HTMLElement) {
						this.updateProgress(exportId, {
							status: "processing",
							progress: 20,
						});
						content = await this.exportImage(config.data as HTMLElement, config.format, config.options);
					} else {
						throw new Error("图片导出需要HTMLElement作为数据源");
					}
					break;
				default:
					throw new Error(`不支持的导出格式: ${config.format}`);
			}

			this.updateProgress(exportId, { status: "processing", progress: 80 });

			// 生成文件名
			const filename = this.generateFilename(config.filename, config.format);

			// 保存文件
			if (typeof content === "string") {
				const blob = new Blob([content], {
					type: this.getMimeType(config.format),
				});
				saveAs(blob, filename);
			} else {
				saveAs(content, filename);
			}

			// 记录历史
			const history: ExportHistory = {
				id: exportId,
				filename,
				format: config.format,
				timestamp: new Date(),
				fileSize: typeof content === "string" ? content.length : content.size,
				status: "success",
				config,
			};
			this.addToHistory(history);

			// 完成进度
			this.updateProgress(exportId, {
				status: "completed",
				progress: 100,
				endTime: new Date(),
				fileSize: typeof content === "string" ? content.length : content.size,
			});
		} catch (error) {
			console.error("导出失败:", error);

			// 记录失败历史
			const history: ExportHistory = {
				id: exportId,
				filename: config.filename,
				format: config.format,
				timestamp: new Date(),
				fileSize: 0,
				status: "failed",
				config,
			};
			this.addToHistory(history);

			// 更新进度为错误
			this.updateProgress(exportId, {
				status: "error",
				progress: 0,
				message: error instanceof Error ? error.message : "导出失败",
				endTime: new Date(),
			});

			throw error;
		}
	}

	/**
	 * 批量导出
	 */
	async batchExport(configs: ExportConfig[]): Promise<void> {
		const exportId = this.generateExportId();
		const startTime = new Date();

		try {
			this.updateProgress(exportId, {
				id: exportId,
				filename: `batch_export_${Date.now()}`,
				format: "zip",
				progress: 0,
				status: "pending",
				startTime,
			});

			const results: Blob[] = [];
			const total = configs.length;

			for (let i = 0; i < configs.length; i++) {
				const config = configs[i];
				const progress = Math.round((i / total) * 90);

				this.updateProgress(exportId, {
					status: "processing",
					progress,
					message: `正在导出 ${config.filename} (${i + 1}/${total})`,
				});

				const content = await this.getExportContent(config);
				results.push(content);
			}

			// 创建ZIP文件
			const zipBlob = await this.createZip(results, configs);
			const filename = `batch_export_${Date.now()}.zip`;

			saveAs(zipBlob, filename);

			// 记录历史
			const history: ExportHistory = {
				id: exportId,
				filename,
				format: "zip",
				timestamp: new Date(),
				fileSize: zipBlob.size,
				status: "success",
				config: configs[0], // 使用第一个配置作为代表
			};
			this.addToHistory(history);

			this.updateProgress(exportId, {
				status: "completed",
				progress: 100,
				endTime: new Date(),
				fileSize: zipBlob.size,
			});
		} catch (error) {
			this.updateProgress(exportId, {
				status: "error",
				progress: 0,
				message: error instanceof Error ? error.message : "批量导出失败",
				endTime: new Date(),
			});
			throw error;
		}
	}

	/**
	 * 获取导出内容
	 */
	private async getExportContent(config: ExportConfig): Promise<Blob> {
		let content: string | Blob;

		switch (config.format) {
			case "txt":
				content = TextExporter.exportToTxt(config.data, config.options);
				break;
			case "csv":
				content = TextExporter.exportToCsv(config.data, config.options);
				break;
			case "json":
				content = TextExporter.exportToJson(config.data, config.options);
				break;
			case "xml":
				content = TextExporter.exportToXml(config.data, config.options);
				break;
			case "xlsx":
			case "xls":
				content = await TableExporter.exportToExcel(config.data, config.options);
				break;
			case "pdf":
				content = await DocumentExporter.exportToPdf(config.data, config.options);
				break;
			case "docx":
				content = await DocumentExporter.exportToDocx(config.data, config.options);
				break;
			case "markdown":
				content = DocumentExporter.exportToMarkdown(config.data, config.options);
				break;
			default:
				throw new Error(`不支持的导出格式: ${config.format}`);
		}

		return typeof content === "string" ? new Blob([content], { type: this.getMimeType(config.format) }) : content;
	}

	/**
	 * 导出图片
	 */
	private async exportImage(
		element: HTMLElement,
		format: "png" | "jpg" | "svg",
		options?: ExportOptions,
	): Promise<Blob> {
		switch (format) {
			case "png":
				return ImageExporter.exportToPng(element, options);
			case "jpg":
				return ImageExporter.exportToJpg(element, options);
			case "svg": {
				const svgContent = ImageExporter.exportToSvg(element, options);
				return new Blob([svgContent], { type: "image/svg+xml" });
			}
			default:
				throw new Error(`不支持的图片格式: ${format}`);
		}
	}

	/**
	 * 创建ZIP文件
	 */
	private async createZip(blobs: Blob[], configs: ExportConfig[]): Promise<Blob> {
		// 这里需要使用JSZip库
		const JSZip = await import("jszip");
		const zip = new JSZip.default();

		blobs.forEach((blob, index) => {
			const config = configs[index];
			const filename = this.generateFilename(config.filename, config.format);
			zip.file(filename, blob);
		});

		return zip.generateAsync({ type: "blob" });
	}

	/**
	 * 生成导出ID
	 */
	private generateExportId(): string {
		return `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * 生成文件名
	 */
	private generateFilename(baseName: string, format: ExportFormat): string {
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		return `${baseName}_${timestamp}.${format}`;
	}

	/**
	 * 获取MIME类型
	 */
	private getMimeType(format: ExportFormat): string {
		const mimeTypes: Record<ExportFormat, string> = {
			txt: "text/plain",
			csv: "text/csv",
			json: "application/json",
			xml: "application/xml",
			xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			xls: "application/vnd.ms-excel",
			pdf: "application/pdf",
			docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			png: "image/png",
			jpg: "image/jpeg",
			svg: "image/svg+xml",
			markdown: "text/markdown",
			zip: "application/zip",
			tar: "application/x-tar",
			gzip: "application/gzip",
		};

		return mimeTypes[format] || "application/octet-stream";
	}

	/**
	 * 更新进度
	 */
	private updateProgress(exportId: string, update: Partial<ExportProgress>): void {
		const callback = this.progressCallbacks.get(exportId);
		if (callback) {
			callback({
				id: exportId,
				filename: update.filename || "",
				format: update.format || "txt",
				progress: update.progress || 0,
				status: update.status || "pending",
				message: update.message,
				startTime: update.startTime,
				endTime: update.endTime,
				fileSize: update.fileSize,
			} as ExportProgress);
		}
	}

	/**
	 * 添加到历史记录
	 */
	private addToHistory(history: ExportHistory): void {
		this.exportHistory.unshift(history);

		// 限制历史记录数量
		if (this.exportHistory.length > 100) {
			this.exportHistory = this.exportHistory.slice(0, 100);
		}

		// 保存到localStorage
		this.saveHistoryToStorage();
	}

	/**
	 * 保存历史记录到localStorage
	 */
	private saveHistoryToStorage(): void {
		if (typeof localStorage !== "undefined") {
			try {
				localStorage.setItem("export_history", JSON.stringify(this.exportHistory));
			} catch (error) {
				console.error("保存导出历史失败:", error);
			}
		}
	}

	/**
	 * 获取导出历史
	 */
	getHistory(): ExportHistory[] {
		return [...this.exportHistory];
	}

	/**
	 * 清除历史记录
	 */
	clearHistory(): void {
		this.exportHistory = [];
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem("export_history");
		}
	}

	/**
	 * 注册进度回调
	 */
	registerProgressCallback(exportId: string, callback: (progress: ExportProgress) => void): void {
		this.progressCallbacks.set(exportId, callback);
	}

	/**
	 * 取消进度回调
	 */
	unregisterProgressCallback(exportId: string): void {
		this.progressCallbacks.delete(exportId);
	}
}
