/**
 * 图片格式导出功能
 */

import type { ExportOptions } from "@/types/export";

// 动态导入库
const importHtml2canvas = async () => {
	// 暂时禁用图片导出功能
	throw new Error("图片导出功能暂时禁用");
};

export class ImageExporter {
	/**
	 * 导出为PNG格式
	 */
	static async exportToPng(element: HTMLElement, options?: ExportOptions): Promise<Blob> {
		try {
			const html2canvas = await importHtml2canvas();

			const canvas = await (html2canvas as any)(element, {
				backgroundColor: options?.backgroundColor || "#ffffff",
				scale: options?.scale || 2,
				logging: false,
				useCORS: true,
				allowTaint: true,
			});

			return new Promise((resolve) => {
				canvas.toBlob(
					(blob: Blob | null) => {
						if (blob) {
							resolve(blob);
						} else {
							throw new Error("PNG生成失败");
						}
					},
					"image/png",
					options?.quality || 0.9,
				);
			});
		} catch (_error) {
			throw new Error("PNG导出功能暂时禁用");
		}
	}

	/**
	 * 导出为JPG格式
	 */
	static async exportToJpg(element: HTMLElement, options?: ExportOptions): Promise<Blob> {
		try {
			const html2canvas = await importHtml2canvas();

			const canvas = await (html2canvas as any)(element, {
				backgroundColor: options?.backgroundColor || "#ffffff",
				scale: options?.scale || 2,
				logging: false,
				useCORS: true,
				allowTaint: true,
			});

			return new Promise((resolve) => {
				canvas.toBlob(
					(blob: Blob | null) => {
						if (blob) {
							resolve(blob);
						} else {
							throw new Error("JPG生成失败");
						}
					},
					"image/jpeg",
					options?.quality || 0.8,
				);
			});
		} catch (_error) {
			throw new Error("JPG导出功能暂时禁用");
		}
	}

	/**
	 * 导出为SVG格式
	 */
	static exportToSvg(element: HTMLElement, options?: ExportOptions): string {
		const svg = ImageExporter.createSvgFromElement(element, options);
		return svg;
	}

	/**
	 * 导出Canvas为图片
	 */
	static exportCanvasToImage(
		canvas: HTMLCanvasElement,
		format: "png" | "jpg" | "webp",
		options?: ExportOptions,
	): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const mimeType = `image/${format}`;
			const quality = options?.quality || 0.8;

			canvas.toBlob(
				(blob: Blob | null) => {
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error("Canvas导出失败"));
					}
				},
				mimeType,
				quality,
			);
		});
	}

	/**
	 * 截图功能
	 */
	static async captureScreenshot(element: HTMLElement, options?: ExportOptions): Promise<Blob> {
		return ImageExporter.exportToPng(element, {
			...options,
			scale: options?.scale || 1,
			quality: options?.quality || 0.9,
		});
	}

	/**
	 * 高分辨率截图
	 */
	static async captureHighResScreenshot(element: HTMLElement, options?: ExportOptions): Promise<Blob> {
		return ImageExporter.exportToPng(element, {
			...options,
			scale: options?.scale || 4,
			quality: options?.quality || 1.0,
		});
	}

	/**
	 * 创建SVG从HTML元素
	 */
	private static createSvgFromElement(element: HTMLElement, options?: ExportOptions): string {
		const rect = element.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		// 获取元素的HTML内容
		const htmlContent = element.outerHTML;

		// 创建SVG
		let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

		// 添加背景
		if (options?.backgroundColor && options.backgroundColor !== "transparent") {
			svg += `<rect width="100%" height="100%" fill="${options.backgroundColor}"/>`;
		}

		// 添加HTML内容作为foreignObject
		svg += `<foreignObject width="100%" height="100%">`;
		svg += htmlContent;
		svg += `</foreignObject>`;
		svg += `</svg>`;

		return svg;
	}

	/**
	 * 调整图片尺寸
	 */
	static async resizeImage(blob: Blob, width: number, height: number, options?: ExportOptions): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(new Error("Canvas上下文获取失败"));
					return;
				}

				// 设置背景
				if (options?.backgroundColor) {
					ctx.fillStyle = options.backgroundColor;
					ctx.fillRect(0, 0, width, height);
				}

				// 绘制图片
				ctx.drawImage(img, 0, 0, width, height);

				canvas.toBlob(
					(blob: Blob | null) => {
						if (blob) {
							resolve(blob);
						} else {
							reject(new Error("图片调整失败"));
						}
					},
					"image/png",
					options?.quality || 0.8,
				);
			};
			img.onerror = () => reject(new Error("图片加载失败"));
			img.src = URL.createObjectURL(blob);
		});
	}

	/**
	 * 添加水印
	 */
	static async addWatermark(imageBlob: Blob, watermark: string, options?: ExportOptions): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;

				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(new Error("Canvas上下文获取失败"));
					return;
				}

				// 绘制原图片
				ctx.drawImage(img, 0, 0);

				// 设置水印样式
				ctx.save();
				ctx.globalAlpha = options?.quality || 0.3;
				ctx.font = `${Math.max(img.width, img.height) / 20}px Arial`;
				ctx.fillStyle = options?.backgroundColor || "#000000";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";

				// 绘制水印
				const x = canvas.width / 2;
				const y = canvas.height / 2;
				ctx.translate(x, y);
				ctx.rotate(-Math.PI / 4);
				ctx.fillText(watermark, 0, 0);
				ctx.restore();

				canvas.toBlob(
					(blob: Blob | null) => {
						if (blob) {
							resolve(blob);
						} else {
							reject(new Error("水印添加失败"));
						}
					},
					"image/png",
					0.9,
				);
			};
			img.onerror = () => reject(new Error("图片加载失败"));
			img.src = URL.createObjectURL(imageBlob);
		});
	}

	/**
	 * 转换图片格式
	 */
	static async convertFormat(
		blob: Blob,
		_fromFormat: string,
		toFormat: "png" | "jpg" | "webp",
		options?: ExportOptions,
	): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;

				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(new Error("Canvas上下文获取失败"));
					return;
				}

				ctx.drawImage(img, 0, 0);

				const mimeType = `image/${toFormat}`;
				const quality = toFormat === "png" ? undefined : options?.quality || 0.8;

				canvas.toBlob(
					(blob: Blob | null) => {
						if (blob) {
							resolve(blob);
						} else {
							reject(new Error("格式转换失败"));
						}
					},
					mimeType,
					quality,
				);
			};
			img.onerror = () => reject(new Error("图片加载失败"));
			img.src = URL.createObjectURL(blob);
		});
	}

	/**
	 * 获取图片信息
	 */
	static async getImageInfo(blob: Blob): Promise<{ width: number; height: number; size: number; type: string }> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				resolve({
					width: img.width,
					height: img.height,
					size: blob.size,
					type: blob.type,
				});
			};
			img.onerror = () => reject(new Error("图片信息获取失败"));
			img.src = URL.createObjectURL(blob);
		});
	}
}
