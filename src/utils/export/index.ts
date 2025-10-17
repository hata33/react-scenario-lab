/**
 * 导出功能工具类
 */

import { ExportConfig, ExportOptions, ExportFilter } from "@/types/export";

export class ExportUtils {
	/**
	 * 数据过滤器
	 */
	static filterData(data: any[], filters: ExportFilter[]): any[] {
		if (!filters || filters.length === 0) {
			return data;
		}

		return data.filter((item) => {
			return filters.every((filter) => {
				const value = item[filter.field];
				return this.applyFilter(value, filter.operator, filter.value);
			});
		});
	}

	/**
	 * 应用单个过滤器
	 */
	private static applyFilter(
		value: any,
		operator: string,
		filterValue: any,
	): boolean {
		switch (operator) {
			case "equals":
				return value === filterValue;
			case "contains":
				return String(value)
					.toLowerCase()
					.includes(String(filterValue).toLowerCase());
			case "startsWith":
				return String(value)
					.toLowerCase()
					.startsWith(String(filterValue).toLowerCase());
			case "endsWith":
				return String(value)
					.toLowerCase()
					.endsWith(String(filterValue).toLowerCase());
			case "greaterThan":
				return Number(value) > Number(filterValue);
			case "lessThan":
				return Number(value) < Number(filterValue);
			default:
				return true;
		}
	}

	/**
	 * 数据验证
	 */
	static validateData(data: any): { valid: boolean; message?: string } {
		if (data === null || data === undefined) {
			return { valid: false, message: "数据不能为空" };
		}

		if (typeof data === "object" && Object.keys(data).length === 0) {
			return { valid: false, message: "数据对象不能为空" };
		}

		if (Array.isArray(data) && data.length === 0) {
			return { valid: false, message: "数据数组不能为空" };
		}

		return { valid: true };
	}

	/**
	 * 文件名安全化
	 */
	static sanitizeFilename(filename: string): string {
		return filename
			.replace(/[\\/:*?"<>|]/g, "_")
			.replace(/\s+/g, "_")
			.replace(/^\.+/, "")
			.replace(/\.+$/, "");
	}

	/**
	 * 估算文件大小
	 */
	static estimateFileSize(data: any, format: string): number {
		let content: string;

		switch (format) {
			case "txt":
				content = JSON.stringify(data);
				break;
			case "csv":
				if (Array.isArray(data) && data.length > 0) {
					const headers = Object.keys(data[0]);
					content = headers.join(",") + "\n";
					content += data
						.map((row) => headers.map((h) => row[h]).join(","))
						.join("\n");
				} else {
					content = "";
				}
				break;
			case "json":
				content = JSON.stringify(data);
				break;
			case "xml":
				content =
					'<?xml version="1.0" encoding="UTF-8"?>\n<data>\n' +
					JSON.stringify(data, null, 2) +
					"\n</data>";
				break;
			default:
				content = JSON.stringify(data);
		}

		// 估算UTF-8编码后的字节数
		return new Blob([content]).size;
	}

	/**
	 * 估算导出时间
	 */
	static estimateExportTime(dataSize: number, format: string): number {
		// 基础时间（毫秒）
		const baseTime = 100;

		// 根据格式调整
		const formatMultiplier = {
			txt: 1,
			csv: 1.2,
			json: 1.5,
			xml: 2,
			xlsx: 5,
			pdf: 8,
			docx: 6,
			png: 10,
			jpg: 10,
			svg: 3,
		};

		const multiplier =
			formatMultiplier[format as keyof typeof formatMultiplier] || 1;

		// 根据数据大小调整
		const sizeMultiplier = Math.max(1, dataSize / 1024 / 1024); // MB

		return baseTime * multiplier * sizeMultiplier;
	}

	/**
	 * 格式化文件大小
	 */
	static formatFileSize(bytes: number): string {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	}

	/**
	 * 格式化时间
	 */
	static formatTime(milliseconds: number): string {
		if (milliseconds < 1000) {
			return `${Math.round(milliseconds)}ms`;
		} else if (milliseconds < 60000) {
			return `${(milliseconds / 1000).toFixed(1)}s`;
		} else {
			return `${(milliseconds / 60000).toFixed(1)}min`;
		}
	}

	/**
	 * 获取支持的格式
	 */
	static getSupportedFormats(): Array<{
		value: string;
		label: string;
		description: string;
		extension: string;
		mimeType: string;
	}> {
		return [
			{
				value: "txt",
				label: "文本文件",
				description: "纯文本格式，适用于简单的文本数据",
				extension: ".txt",
				mimeType: "text/plain",
			},
			{
				value: "csv",
				label: "CSV文件",
				description: "逗号分隔值，适用于表格数据",
				extension: ".csv",
				mimeType: "text/csv",
			},
			{
				value: "json",
				label: "JSON文件",
				description: "JavaScript对象表示法，适用于结构化数据",
				extension: ".json",
				mimeType: "application/json",
			},
			{
				value: "xml",
				label: "XML文件",
				description: "可扩展标记语言，适用于结构化数据",
				extension: ".xml",
				mimeType: "application/xml",
			},
			{
				value: "xlsx",
				label: "Excel文件",
				description: "Microsoft Excel格式，支持多工作表",
				extension: ".xlsx",
				mimeType:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			},
			{
				value: "pdf",
				label: "PDF文件",
				description: "便携式文档格式，适用于打印和分享",
				extension: ".pdf",
				mimeType: "application/pdf",
			},
			{
				value: "docx",
				label: "Word文档",
				description: "Microsoft Word格式，支持富文本",
				extension: ".docx",
				mimeType:
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
			{
				value: "png",
				label: "PNG图片",
				description: "便携式网络图形，无损压缩",
				extension: ".png",
				mimeType: "image/png",
			},
			{
				value: "jpg",
				label: "JPG图片",
				description: "JPEG图片，有损压缩",
				extension: ".jpg",
				mimeType: "image/jpeg",
			},
			{
				value: "svg",
				label: "SVG图片",
				description: "可缩放矢量图形",
				extension: ".svg",
				mimeType: "image/svg+xml",
			},
			{
				value: "markdown",
				label: "Markdown",
				description: "轻量级标记语言，适用于文档",
				extension: ".md",
				mimeType: "text/markdown",
			},
		];
	}

	/**
	 * 检查浏览器支持
	 */
	static checkBrowserSupport(): {
		blobSupport: boolean;
		fileReaderSupport: boolean;
		canvasSupport: boolean;
		webWorkerSupport: boolean;
		localStorageSupport: boolean;
	} {
		return {
			blobSupport: typeof Blob !== "undefined",
			fileReaderSupport: typeof FileReader !== "undefined",
			canvasSupport: typeof HTMLCanvasElement !== "undefined",
			webWorkerSupport: typeof Worker !== "undefined",
			localStorageSupport: typeof localStorage !== "undefined",
		};
	}

	/**
	 * 生成唯一ID
	 */
	static generateId(prefix: string = "export"): string {
		return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * 深度克隆数据
	 */
	static deepClone<T>(data: T): T {
		if (data === null || typeof data !== "object") {
			return data;
		}

		if (data instanceof Date) {
			return new Date(data.getTime()) as unknown as T;
		}

		if (Array.isArray(data)) {
			return data.map((item) => this.deepClone(item)) as unknown as T;
		}

		const cloned = {} as T;
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				cloned[key] = this.deepClone(data[key]);
			}
		}

		return cloned;
	}

	/**
	 * 错误处理
	 */
	static handleError(error: any): string {
		if (error instanceof Error) {
			return error.message;
		}

		if (typeof error === "string") {
			return error;
		}

		return "发生未知错误";
	}

	/**
	 * 日志记录
	 */
	static log(
		level: "info" | "warn" | "error",
		message: string,
		data?: any,
	): void {
		const timestamp = new Date().toISOString();
		const logEntry = {
			timestamp,
			level,
			message,
			data,
		};

		if (level === "error") {
			console.error(logEntry);
		} else if (level === "warn") {
			console.warn(logEntry);
		} else {
			console.log(logEntry);
		}
	}
}
