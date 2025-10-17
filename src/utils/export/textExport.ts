/**
 * 文本格式导出功能
 */

import { ExportConfig, ExportOptions } from "@/types/export";

export class TextExporter {
	/**
	 * 导出为TXT格式
	 */
	static exportToTxt(data: any, options?: ExportOptions): string {
		const encoding = options?.encoding || "utf-8";
		let content = "";

		if (typeof data === "string") {
			content = data;
		} else if (Array.isArray(data)) {
			content = data.map((item) => JSON.stringify(item, null, 2)).join("\n\n");
		} else if (typeof data === "object") {
			content = JSON.stringify(data, null, 2);
		} else {
			content = String(data);
		}

		return content;
	}

	/**
	 * 导出为CSV格式
	 */
	static exportToCsv(data: any[], options?: ExportOptions): string {
		if (!Array.isArray(data) || data.length === 0) {
			return "";
		}

		const delimiter = options?.delimiter || ",";
		const includeHeaders = options?.includeHeaders !== false;

		// 获取表头
		const headers = Object.keys(data[0]);
		let csv = "";

		// 添加BOM头以支持中文
		if (options?.encoding === "utf-8") {
			csv += "\uFEFF";
		}

		// 添加表头
		if (includeHeaders) {
			csv +=
				headers.map((header) => this.escapeCsvValue(header)).join(delimiter) +
				"\n";
		}

		// 添加数据行
		data.forEach((row) => {
			const values = headers.map((header) => {
				const value = row[header];
				return this.escapeCsvValue(value);
			});
			csv += values.join(delimiter) + "\n";
		});

		return csv;
	}

	/**
	 * 导出为JSON格式
	 */
	static exportToJson(data: any, options?: ExportOptions): string {
		const formatJson = options?.template !== "minified";

		if (formatJson) {
			return JSON.stringify(data, null, 2);
		} else {
			return JSON.stringify(data);
		}
	}

	/**
	 * 导出为XML格式
	 */
	static exportToXml(data: any, options?: ExportOptions): string {
		const rootName = options?.sheetName || "data";
		let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
		xml += `<${rootName}>\n`;

		if (Array.isArray(data)) {
			data.forEach((item, index) => {
				xml += this.objectToXml(item, `item${index + 1}`, 1);
			});
		} else if (typeof data === "object") {
			xml += this.objectToXml(data, "root", 1);
		} else {
			xml += `  <value>${this.escapeXml(String(data))}</value>\n`;
		}

		xml += `</${rootName}>`;
		return xml;
	}

	/**
	 * 对象转XML
	 */
	private static objectToXml(
		obj: any,
		tagName: string,
		indent: number,
	): string {
		const spaces = "  ".repeat(indent);
		let xml = `${spaces}<${tagName}>\n`;

		Object.keys(obj).forEach((key) => {
			const value = obj[key];
			if (value === null || value === undefined) {
				return;
			}

			if (typeof value === "object") {
				if (Array.isArray(value)) {
					value.forEach((item, index) => {
						if (typeof item === "object") {
							xml += this.objectToXml(item, `${key}_${index + 1}`, indent + 1);
						} else {
							xml += `${spaces}  <${key}_${index + 1}>${this.escapeXml(String(item))}</${key}_${index + 1}>\n`;
						}
					});
				} else {
					xml += this.objectToXml(value, key, indent + 1);
				}
			} else {
				xml += `${spaces}  <${key}>${this.escapeXml(String(value))}</${key}>\n`;
			}
		});

		xml += `${spaces}</${tagName}>\n`;
		return xml;
	}

	/**
	 * CSV值转义
	 */
	private static escapeCsvValue(value: any): string {
		if (value === null || value === undefined) {
			return "";
		}

		const str = String(value);

		// 如果包含逗号、换行符或双引号，需要用双引号包围
		if (str.includes(",") || str.includes("\n") || str.includes('"')) {
			return `"${str.replace(/"/g, '""')}"`;
		}

		return str;
	}

	/**
	 * XML转义
	 */
	private static escapeXml(value: string): string {
		return value
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}
}
