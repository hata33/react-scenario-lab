/**
 * 文档格式导出功能
 */

import { ExportConfig, ExportOptions } from "@/types/export";

// 动态导入库
const importJsPDF = async () => {
	// 暂时禁用PDF导出功能
	throw new Error("PDF导出功能暂时禁用");
};

const importDocx = async () => {
	// 暂时禁用docx导出功能
	throw new Error("Word导出功能暂时禁用");
};

export class DocumentExporter {
	/**
	 * 导出为PDF格式
	 */
	static async exportToPdf(data: any, options?: ExportOptions): Promise<Blob> {
		try {
			const { jsPDF, autoTable } = await importJsPDF();

			const doc = new (jsPDF as any)({
				orientation: options?.orientation || "portrait",
				unit: "mm",
				format: options?.pageSize || "A4",
			});

			// 设置字体
			doc.setFont("helvetica");

			// 添加水印
			if (options?.watermark) {
				this.addWatermark(doc, options.watermark);
			}

			// 根据数据类型处理
			if (Array.isArray(data)) {
				this.exportTableToPdf(doc, data, options, autoTable);
			} else if (typeof data === "object") {
				this.exportObjectToPdf(doc, data, options, autoTable);
			} else {
				this.exportTextToPdf(doc, String(data), options);
			}

			return new Blob([doc.output("blob")], { type: "application/pdf" });
		} catch (error) {
			throw new Error("PDF导出功能暂时禁用");
		}
	}

	/**
	 * 导出为Word格式
	 */
	static async exportToDocx(data: any, options?: ExportOptions): Promise<Blob> {
		try {
			const {
				Document,
				Packer,
				Paragraph,
				TextRun,
				Table,
				TableRow,
				TableCell,
			} = await importDocx();

			let doc: any;

			if (Array.isArray(data)) {
				doc = this.createTableDocument(data, options);
			} else if (typeof data === "object") {
				doc = this.createObjectDocument(data, options);
			} else {
				doc = this.createTextDocument(String(data), options);
			}

			const blob = await (Packer as any).toBlob(doc);
			return blob;
		} catch (error) {
			throw new Error("Word导出功能暂时禁用");
		}
	}

	/**
	 * 导出为Markdown格式
	 */
	static exportToMarkdown(data: any, options?: ExportOptions): string {
		if (Array.isArray(data)) {
			return this.exportTableToMarkdown(data, options);
		} else if (typeof data === "object") {
			return this.exportObjectToMarkdown(data, options);
		} else {
			return this.exportTextToMarkdown(String(data), options);
		}
	}

	/**
	 * 添加水印到PDF
	 */
	private static addWatermark(doc: any, watermark: string): void {
		const pageCount = doc.getNumberOfPages();
		for (let i = 1; i <= pageCount; i++) {
			doc.setPage(i);
			doc.saveGraphicsState();
			doc.setGState({ opacity: 0.1 });
			doc.setFontSize(60);
			doc.setTextColor(200, 200, 200);
			doc.text(watermark, 105, 150, { angle: 45, align: "center" });
			doc.restoreGraphicsState();
		}
	}

	/**
	 * 导出表格到PDF
	 */
	private static exportTableToPdf(
		doc: any,
		data: any[],
		options?: ExportOptions,
		autoTable?: any,
	): void {
		if (!autoTable) return;

		const headers = Object.keys(data[0] || {});
		const rows = data.map((row) => headers.map((header) => row[header]));

		doc.autoTable({
			head: [headers],
			body: rows,
			theme: "grid",
			styles: {
				font: "helvetica",
				fontSize: 10,
				cellPadding: 3,
			},
			headStyles: {
				fillColor: [64, 64, 64],
				textColor: 255,
			},
			alternateRowStyles: {
				fillColor: [245, 245, 245],
			},
		});
	}

	/**
	 * 导出对象到PDF
	 */
	private static exportObjectToPdf(
		doc: any,
		data: any,
		options?: ExportOptions,
		autoTable?: any,
	): void {
		const entries = Object.entries(data);

		if (autoTable && entries.length > 0) {
			const headers = ["Property", "Value"];
			const rows = entries.map(([key, value]) => [key, String(value)]);

			doc.autoTable({
				head: [headers],
				body: rows,
				theme: "grid",
				styles: {
					font: "helvetica",
					fontSize: 10,
					cellPadding: 3,
				},
			});
		} else {
			doc.setFontSize(12);
			let y = 20;
			entries.forEach(([key, value]) => {
				doc.text(`${key}: ${value}`, 20, y);
				y += 10;
			});
		}
	}

	/**
	 * 导出文本到PDF
	 */
	private static exportTextToPdf(
		doc: any,
		text: string,
		options?: ExportOptions,
	): void {
		doc.setFontSize(12);
		const lines = doc.splitTextToSize(text, 170);
		doc.text(lines, 20, 20);
	}

	/**
	 * 创建Word表格文档
	 */
	private static createTableDocument(
		data: any[],
		options?: ExportOptions,
	): any {
		const {
			Document,
			Paragraph,
			TextRun,
			Table,
			TableRow,
			TableCell,
		} = require("docx");

		const headers = Object.keys(data[0] || {});
		const headerRow = new TableRow({
			children: headers.map(
				(header) =>
					new TableCell({
						children: [new Paragraph({ text: header })],
					}),
			),
		});

		const dataRows = data.map(
			(row) =>
				new TableRow({
					children: headers.map(
						(header) =>
							new TableCell({
								children: [new Paragraph({ text: String(row[header] || "") })],
							}),
					),
				}),
		);

		return new Document({
			sections: [
				{
					properties: {},
					children: [
						new Table({
							rows: [headerRow, ...dataRows],
						}),
					],
				},
			],
		});
	}

	/**
	 * 创建Word对象文档
	 */
	private static createObjectDocument(data: any, options?: ExportOptions): any {
		const { Document, Paragraph, TextRun } = require("docx");

		const paragraphs = Object.entries(data).map(
			([key, value]) =>
				new Paragraph({
					children: [
						new TextRun({ text: `${key}: `, bold: true }),
						new TextRun({ text: String(value) }),
					],
				}),
		);

		return new Document({
			sections: [
				{
					properties: {},
					children: paragraphs,
				},
			],
		});
	}

	/**
	 * 创建Word文本文档
	 */
	private static createTextDocument(
		text: string,
		options?: ExportOptions,
	): any {
		const { Document, Paragraph } = require("docx");

		return new Document({
			sections: [
				{
					properties: {},
					children: [new Paragraph(text)],
				},
			],
		});
	}

	/**
	 * 导出表格到Markdown
	 */
	private static exportTableToMarkdown(
		data: any[],
		options?: ExportOptions,
	): string {
		if (!Array.isArray(data) || data.length === 0) {
			return "";
		}

		const headers = Object.keys(data[0]);
		let markdown = "";

		// 表头
		markdown += "| " + headers.join(" | ") + " |\n";
		markdown += "|" + headers.map(() => "---").join("|") + "|\n";

		// 数据行
		data.forEach((row) => {
			const values = headers.map((header) => {
				const value = row[header];
				return this.escapeMarkdown(String(value || ""));
			});
			markdown += "| " + values.join(" | ") + " |\n";
		});

		return markdown;
	}

	/**
	 * 导出对象到Markdown
	 */
	private static exportObjectToMarkdown(
		data: any,
		options?: ExportOptions,
	): string {
		let markdown = "";

		Object.entries(data).forEach(([key, value]) => {
			markdown += `## ${key}\n\n`;

			if (typeof value === "object" && value !== null) {
				if (Array.isArray(value)) {
					markdown += this.exportArrayToMarkdown(value);
				} else {
					markdown += this.exportObjectToMarkdown(value);
				}
			} else {
				markdown += `${value}\n\n`;
			}
		});

		return markdown;
	}

	/**
	 * 导出数组到Markdown
	 */
	private static exportArrayToMarkdown(data: any[]): string {
		if (data.length === 0) return "";

		// 检查是否是对象数组
		if (typeof data[0] === "object" && data[0] !== null) {
			return this.exportTableToMarkdown(data);
		}

		// 普通数组
		return data.map((item) => `- ${item}`).join("\n") + "\n\n";
	}

	/**
	 * 导出文本到Markdown
	 */
	private static exportTextToMarkdown(
		text: string,
		options?: ExportOptions,
	): string {
		return text;
	}

	/**
	 * Markdown转义
	 */
	private static escapeMarkdown(text: string): string {
		return text
			.replace(/\\/g, "\\\\")
			.replace(/`/g, "\\`")
			.replace(/\*/g, "\\*")
			.replace(/_/g, "\\_")
			.replace(/#/g, "\\#")
			.replace(/\+/g, "\\+")
			.replace(/-/g, "\\-")
			.replace(/\[/g, "\\[")
			.replace(/\]/g, "\\]")
			.replace(/\(/g, "\\(")
			.replace(/\)/g, "\\)");
	}
}
