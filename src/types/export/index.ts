/**
 * 导出功能类型定义
 */

export interface ExportConfig {
	filename: string;
	format: ExportFormat;
	data: any;
	options?: ExportOptions;
}

export interface ExportOptions {
	encoding?: "utf-8" | "gbk" | "ascii";
	delimiter?: string;
	includeHeaders?: boolean;
	sheetName?: string;
	template?: string;
	compression?: number;
	password?: string;
	watermark?: string;
	pageSize?: "A4" | "A3" | "Letter";
	orientation?: "portrait" | "landscape";
	quality?: number;
	scale?: number;
	backgroundColor?: string;
	transparent?: boolean;
}

export type ExportFormat =
	| "txt"
	| "csv"
	| "json"
	| "xml"
	| "xlsx"
	| "xls"
	| "pdf"
	| "docx"
	| "png"
	| "jpg"
	| "svg"
	| "markdown"
	| "zip"
	| "tar"
	| "gzip";

export interface ExportProgress {
	id: string;
	filename: string;
	format: ExportFormat;
	progress: number;
	status: "pending" | "processing" | "completed" | "error";
	message?: string;
	startTime?: Date;
	endTime?: Date;
	fileSize?: number;
}

export interface ExportHistory {
	id: string;
	filename: string;
	format: ExportFormat;
	timestamp: Date;
	fileSize: number;
	status: "success" | "failed";
	downloadUrl?: string;
	config: ExportConfig;
}

export interface ExportTemplate {
	id: string;
	name: string;
	description: string;
	format: ExportFormat;
	config: ExportConfig;
	isDefault: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ExportFilter {
	field: string;
	operator:
		| "equals"
		| "contains"
		| "startsWith"
		| "endsWith"
		| "greaterThan"
		| "lessThan";
	value: any;
}

export interface ExportBatchConfig {
	filename: string;
	formats: ExportFormat[];
	data: any;
	options?: ExportOptions;
	filters?: ExportFilter[];
}

export interface ExportPreview {
	data: any;
	format: ExportFormat;
	sampleSize: number;
	estimatedSize: number;
	estimatedTime: number;
}
