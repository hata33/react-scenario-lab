/**
 * 表格数据导出功能
 */

import { ExportConfig, type ExportOptions } from "@/types/export";

// 动态导入xlsx库（仅在客户端使用）
const importXlsx = async () => {
	// 暂时禁用Excel导出功能
	throw new Error("Excel导出功能暂时禁用");
};

export class TableExporter {
	/**
	 * 导出为Excel格式
	 */
	static async exportToExcel(data: any[], options?: ExportOptions): Promise<Blob> {
		try {
			const XLSX = await importXlsx();

			const workbook = (XLSX as any).utils.book_new();
			const sheetName = options?.sheetName || "Sheet1";

			// 处理数据
			const worksheet = (XLSX as any).utils.json_to_sheet(data);

			// 设置单元格样式
			if (options?.quality) {
				TableExporter.applyCellStyles(worksheet, options);
			}

			(XLSX as any).utils.book_append_sheet(workbook, worksheet, sheetName);

			// 如果有密码保护
			if (options?.password) {
				return TableExporter.createProtectedExcel(workbook, options.password);
			}

			// 生成Excel文件
			const excelBuffer = (XLSX as any).write(workbook, {
				bookType: "xlsx",
				type: "array",
			});
			return new Blob([excelBuffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
		} catch (error) {
			throw new Error("Excel导出功能暂时禁用");
		}
	}

	/**
	 * 导出多工作表Excel
	 */
	static async exportToMultiSheetExcel(data: Record<string, any[]>, options?: ExportOptions): Promise<Blob> {
		try {
			const XLSX = await importXlsx();

			const workbook = (XLSX as any).utils.book_new();

			// 为每个数据集创建工作表
			Object.entries(data).forEach(([sheetName, sheetData]) => {
				const worksheet = (XLSX as any).utils.json_to_sheet(sheetData);
				(XLSX as any).utils.book_append_sheet(workbook, worksheet, sheetName);
			});

			const excelBuffer = (XLSX as any).write(workbook, {
				bookType: "xlsx",
				type: "array",
			});
			return new Blob([excelBuffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
		} catch (error) {
			throw new Error("Excel导出功能暂时禁用");
		}
	}

	/**
	 * 导出CSV高级格式
	 */
	static exportToAdvancedCsv(data: any[], options?: ExportOptions): string {
		const delimiter = options?.delimiter || ",";
		const includeHeaders = options?.includeHeaders !== false;

		// 处理大数据量 - 分片处理
		const CHUNK_SIZE = 10000;
		let csv = "";

		// 添加BOM头
		if (options?.encoding === "utf-8") {
			csv += "\uFEFF";
		}

		// 分片处理数据
		for (let i = 0; i < data.length; i += CHUNK_SIZE) {
			const chunk = data.slice(i, i + CHUNK_SIZE);

			if (i === 0 && includeHeaders) {
				// 添加表头
				const headers = Object.keys(chunk[0] || {});
				csv += headers.map((header) => TableExporter.escapeCsvValue(header)).join(delimiter) + "\n";
			}

			// 处理数据行
			chunk.forEach((row) => {
				const values = Object.keys(row).map((key) => {
					const value = row[key];
					return TableExporter.formatCsvValue(value, options);
				});
				csv += values.join(delimiter) + "\n";
			});
		}

		return csv;
	}

	/**
	 * 创建数据透视表
	 */
	static async exportPivotTable(data: any[], pivotConfig: any, options?: ExportOptions): Promise<Blob> {
		try {
			const XLSX = await importXlsx();

			// 创建主数据工作表
			const workbook = (XLSX as any).utils.book_new();
			const dataSheet = (XLSX as any).utils.json_to_sheet(data);
			(XLSX as any).utils.book_append_sheet(workbook, dataSheet, "Data");

			// 创建透视表
			const pivotSheet = TableExporter.createPivotSheet(data, pivotConfig);
			(XLSX as any).utils.book_append_sheet(workbook, pivotSheet, "Pivot");

			const excelBuffer = (XLSX as any).write(workbook, {
				bookType: "xlsx",
				type: "array",
			});
			return new Blob([excelBuffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
		} catch (error) {
			throw new Error("Excel导出功能暂时禁用");
		}
	}

	/**
	 * 应用单元格样式
	 */
	private static applyCellStyles(worksheet: any, options: ExportOptions): void {
		// 设置列宽
		const colWidths = Object.keys(worksheet)
			.filter((key) => key[0] === "!")
			.map(() => 15);
		if (colWidths.length > 0) {
			worksheet["!cols"] = colWidths.map((width) => ({ wch: width }));
		}

		// 设置行高
		const rowHeights = Object.keys(worksheet)
			.filter((key) => key[0] === "!")
			.map(() => 20);
		if (rowHeights.length > 0) {
			worksheet["!rows"] = rowHeights.map((height) => ({ hpt: height }));
		}
	}

	/**
	 * 创建密码保护的Excel
	 */
	private static createProtectedExcel(workbook: any, password: string): Blob {
		// 注意：xlsx库本身不支持密码保护
		// 这里创建一个基本的Excel文件，实际项目中可能需要使用其他库
		const XLSX = workbook.constructor as any;
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});
		return new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
	}

	/**
	 * 创建透视表工作表
	 */
	private static createPivotSheet(data: any[], config: any): any {
		// 简化的透视表实现
		const pivotData = TableExporter.processPivotData(data, config);
		return { ...pivotData };
	}

	/**
	 * 处理透视表数据
	 */
	private static processPivotData(data: any[], config: any): any {
		// 简化的透视表数据处理
		const { rows, columns, values } = config;
		const result: any = {};

		data.forEach((item) => {
			const rowKey = rows.map((r: string) => item[r]).join("|");
			const colKey = columns.map((c: string) => item[c]).join("|");

			if (!result[rowKey]) {
				result[rowKey] = {};
			}

			values.forEach((v: string) => {
				if (!result[rowKey][colKey]) {
					result[rowKey][colKey] = 0;
				}
				result[rowKey][colKey] += Number(item[v]) || 0;
			});
		});

		return result;
	}

	/**
	 * 格式化CSV值
	 */
	private static formatCsvValue(value: any, options?: ExportOptions): string {
		if (value === null || value === undefined) {
			return "";
		}

		// 处理日期
		if (value instanceof Date) {
			return value.toISOString();
		}

		// 处理数字
		if (typeof value === "number") {
			return value.toString();
		}

		// 处理布尔值
		if (typeof value === "boolean") {
			return value ? "TRUE" : "FALSE";
		}

		return TableExporter.escapeCsvValue(String(value));
	}

	/**
	 * CSV值转义
	 */
	private static escapeCsvValue(value: string): string {
		if (value.includes(",") || value.includes("\n") || value.includes('"')) {
			return `"${value.replace(/"/g, '""')}"`;
		}
		return value;
	}
}
