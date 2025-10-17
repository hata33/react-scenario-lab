/**
 * 导出功能测试用例
 */

import { TextExporter } from "../textExport";
import { TableExporter } from "../tableExport";
import { DocumentExporter } from "../documentExport";
import { ExportUtils } from "../index";

describe("Export Utilities", () => {
	describe("TextExporter", () => {
		test("should export to TXT format", () => {
			const data = "Hello, World!";
			const result = TextExporter.exportToTxt(data);
			expect(result).toBe(data);
		});

		test("should export object to TXT format", () => {
			const data = { name: "John", age: 30 };
			const result = TextExporter.exportToTxt(data);
			expect(result).toBe(JSON.stringify(data, null, 2));
		});

		test("should export array to TXT format", () => {
			const data = [{ name: "John" }, { name: "Jane" }];
			const result = TextExporter.exportToTxt(data);
			expect(result).toContain("John");
			expect(result).toContain("Jane");
		});

		test("should export to CSV format", () => {
			const data = [
				{ name: "John", age: 30 },
				{ name: "Jane", age: 25 },
			];
			const result = TextExporter.exportToCsv(data);
			expect(result).toContain("name,age");
			expect(result).toContain("John,30");
			expect(result).toContain("Jane,25");
		});

		test("should export to CSV with custom delimiter", () => {
			const data = [{ name: "John", age: 30 }];
			const result = TextExporter.exportToCsv(data, { delimiter: ";" });
			expect(result).toContain("name;age");
			expect(result).toContain("John;30");
		});

		test("should export to JSON format", () => {
			const data = { name: "John", age: 30 };
			const result = TextExporter.exportToJson(data);
			expect(result).toBe(JSON.stringify(data, null, 2));
		});

		test("should export to minified JSON format", () => {
			const data = { name: "John", age: 30 };
			const result = TextExporter.exportToJson(data, { template: "minified" });
			expect(result).toBe(JSON.stringify(data));
		});

		test("should export to XML format", () => {
			const data = { name: "John", age: 30 };
			const result = TextExporter.exportToXml(data);
			expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
			expect(result).toContain("<name>John</name>");
			expect(result).toContain("<age>30</age>");
		});
	});

	describe("TableExporter", () => {
		test("should export to advanced CSV with chunking", () => {
			const largeData = Array(15000)
				.fill(0)
				.map((_, i) => ({
					id: i,
					name: `User ${i}`,
					value: i * 10,
				}));

			const result = TableExporter.exportToAdvancedCsv(largeData);
			expect(result).toContain("id,name,value");
			expect(result).toContain("User 0,0");
			expect(result).toContain("User 14999,149990");
		});

		test("should format CSV values correctly", () => {
			const data = [
				{
					text: "Hello, world!",
					number: 42,
					date: new Date("2023-01-01"),
					boolean: true,
				},
			];
			const result = TableExporter.exportToAdvancedCsv(data);
			expect(result).toContain('"Hello, world!"');
			expect(result).toContain("42");
			expect(result).toContain("TRUE");
		});
	});

	describe("DocumentExporter", () => {
		test("should export table to Markdown", () => {
			const data = [
				{ name: "John", age: 30 },
				{ name: "Jane", age: 25 },
			];
			const result = DocumentExporter.exportToMarkdown(data);
			expect(result).toContain("| name | age |");
			expect(result).toContain("| --- | --- |");
			expect(result).toContain("| John | 30 |");
			expect(result).toContain("| Jane | 25 |");
		});

		test("should export object to Markdown", () => {
			const data = {
				user: { name: "John", age: 30 },
				settings: { theme: "dark", notifications: true },
			};
			const result = DocumentExporter.exportToMarkdown(data);
			expect(result).toContain("## user");
			expect(result).toContain("## settings");
			expect(result).toContain("name: John");
		});

		test("should export text to Markdown", () => {
			const text = "# Hello\n\nThis is **bold** text.";
			const result = DocumentExporter.exportToMarkdown(text);
			expect(result).toBe(text);
		});
	});

	describe("ExportUtils", () => {
		test("should validate data correctly", () => {
			expect(ExportUtils.validateData({ name: "John" })).toEqual({
				valid: true,
			});
			expect(ExportUtils.validateData(null)).toEqual({
				valid: false,
				message: "数据不能为空",
			});
			expect(ExportUtils.validateData({})).toEqual({
				valid: false,
				message: "数据对象不能为空",
			});
			expect(ExportUtils.validateData([])).toEqual({
				valid: false,
				message: "数据数组不能为空",
			});
		});

		test("should sanitize filename", () => {
			expect(ExportUtils.sanitizeFilename("file/name.txt")).toBe(
				"file_name.txt",
			);
			expect(ExportUtils.sanitizeFilename("file name")).toBe("file_name");
			expect(ExportUtils.sanitizeFilename(".hidden")).toBe("hidden");
			expect(ExportUtils.sanitizeFilename("file..name")).toBe("file.name");
		});

		test("should estimate file size", () => {
			const data = { name: "John", age: 30 };
			const size = ExportUtils.estimateFileSize(data, "json");
			expect(size).toBeGreaterThan(0);
			expect(size).toBeLessThan(1000);
		});

		test("should estimate export time", () => {
			const time = ExportUtils.estimateExportTime(1024, "xlsx");
			expect(time).toBeGreaterThan(0);
		});

		test("should format file size", () => {
			expect(ExportUtils.formatFileSize(0)).toBe("0 B");
			expect(ExportUtils.formatFileSize(1024)).toBe("1 KB");
			expect(ExportUtils.formatFileSize(1048576)).toBe("1 MB");
		});

		test("should format time", () => {
			expect(ExportUtils.formatTime(500)).toBe("500ms");
			expect(ExportUtils.formatTime(2500)).toBe("2.5s");
			expect(ExportUtils.formatTime(120000)).toBe("2.0min");
		});

		test("should filter data", () => {
			const data = [
				{ name: "John", age: 30, department: "IT" },
				{ name: "Jane", age: 25, department: "HR" },
				{ name: "Bob", age: 35, department: "IT" },
			];

			const filters = [
				{ field: "department", operator: "equals", value: "IT" },
				{ field: "age", operator: "greaterThan", value: 25 },
			];

			const result = ExportUtils.filterData(data, filters);
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe("John");
		});

		test("should apply different filter operators", () => {
			const data = [
				{ name: "John Doe", email: "john@example.com", age: 30 },
				{ name: "Jane Smith", email: "jane@test.org", age: 25 },
			];

			// Test contains
			let filtered = ExportUtils.filterData(data, [
				{ field: "name", operator: "contains", value: "John" },
			]);
			expect(filtered).toHaveLength(1);
			expect(filtered[0].name).toBe("John Doe");

			// Test startsWith
			filtered = ExportUtils.filterData(data, [
				{ field: "email", operator: "startsWith", value: "jane" },
			]);
			expect(filtered).toHaveLength(1);
			expect(filtered[0].name).toBe("Jane Smith");

			// Test endsWith
			filtered = ExportUtils.filterData(data, [
				{ field: "email", operator: "endsWith", value: ".com" },
			]);
			expect(filtered).toHaveLength(1);
			expect(filtered[0].name).toBe("John Doe");
		});

		test("should get supported formats", () => {
			const formats = ExportUtils.getSupportedFormats();
			expect(formats).toHaveLength(11);
			expect(formats[0].value).toBe("txt");
			expect(formats[0].extension).toBe(".txt");
		});

		test("should check browser support", () => {
			const support = ExportUtils.checkBrowserSupport();
			expect(typeof support.blobSupport).toBe("boolean");
			expect(typeof support.canvasSupport).toBe("boolean");
			expect(typeof support.localStorageSupport).toBe("boolean");
		});

		test("should generate unique ID", () => {
			const id1 = ExportUtils.generateId();
			const id2 = ExportUtils.generateId();
			expect(id1).not.toBe(id2);
			expect(id1).toMatch(/^export_\d+_[a-z0-9]+$/);
		});

		test("should deep clone data", () => {
			const original = {
				name: "John",
				address: { city: "New York", zip: "10001" },
				tags: ["developer", "senior"],
			};

			const cloned = ExportUtils.deepClone(original);
			expect(cloned).toEqual(original);
			expect(cloned).not.toBe(original);
			expect(cloned.address).not.toBe(original.address);
			expect(cloned.tags).not.toBe(original.tags);
		});

		test("should handle errors", () => {
			const error = new Error("Test error");
			expect(ExportUtils.handleError(error)).toBe("Test error");
			expect(ExportUtils.handleError("String error")).toBe("String error");
			expect(ExportUtils.handleError(null)).toBe("发生未知错误");
		});
	});
});

// 集成测试
describe("Export Integration", () => {
	test("should handle complex data structures", () => {
		const complexData = {
			users: [
				{
					id: 1,
					name: "John",
					profile: { age: 30, skills: ["JavaScript", "React"] },
				},
				{
					id: 2,
					name: "Jane",
					profile: { age: 25, skills: ["Python", "Django"] },
				},
			],
			metadata: {
				total: 2,
				timestamp: new Date().toISOString(),
			},
		};

		// Test JSON export
		const jsonResult = TextExporter.exportToJson(complexData);
		expect(jsonResult).toContain("John");
		expect(jsonResult).toContain("JavaScript");
		expect(jsonResult).toContain("metadata");

		// Test XML export
		const xmlResult = TextExporter.exportToXml(complexData);
		expect(xmlResult).toContain("<?xml");
		expect(xmlResult).toContain("<users>");
		expect(xmlResult).toContain("</users>");

		// Test Markdown export
		const mdResult = DocumentExporter.exportToMarkdown(complexData);
		expect(mdResult).toContain("## users");
		expect(mdResult).toContain("## metadata");
	});

	test("should handle edge cases", () => {
		// Empty data
		expect(TextExporter.exportToTxt("")).toBe("");
		expect(TextExporter.exportToCsv([])).toBe("");
		expect(TextExporter.exportToJson(null)).toBe("null");

		// Special characters
		const specialData = {
			text: "Special: \"quotes\", 'apostrophes', &symbols",
			emoji: "😀 🎉 🚀",
			unicode: "中文 русский español",
		};

		const jsonResult = TextExporter.exportToJson(specialData);
		expect(jsonResult).toContain("Special");
		expect(jsonResult).toContain("😀");
		expect(jsonResult).toContain("中文");

		const csvResult = TextExporter.exportToCsv([specialData]);
		expect(csvResult).toContain(
			'"Special: ""quotes"", \'apostrophes\', &symbols"',
		);
	});

	test("should handle large datasets", () => {
		const largeData = Array(10000)
			.fill(0)
			.map((_, i) => ({
				id: i + 1,
				name: `User ${i + 1}`,
				value: Math.random() * 1000,
				active: i % 2 === 0,
			}));

		// Test CSV export with large data
		const csvResult = TextExporter.exportToCsv(largeData);
		expect(csvResult).toContain("id,name,value,active");
		expect(csvResult).toContain("User 1");
		expect(csvResult).toContain("User 10000");

		// Test JSON export with large data
		const jsonResult = TextExporter.exportToJson(largeData, {
			template: "minified",
		});
		expect(jsonResult.length).toBeGreaterThan(1000);
		expect(jsonResult).toContain("User 10000");
	});
});
