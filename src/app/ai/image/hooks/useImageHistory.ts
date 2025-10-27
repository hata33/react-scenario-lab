"use client";

import { useEffect, useState } from "react";
import type { GeneratedImage } from "../components/ImageGenerator";

const STORAGE_KEY = "ai-image-history";

export function useImageHistory() {
	const [images, setImages] = useState<GeneratedImage[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// 从 localStorage 加载历史记录
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsedImages = JSON.parse(stored).map((image: any) => ({
					...image,
					createdAt: new Date(image.createdAt),
				}));
				setImages(parsedImages);
			}
		} catch (error) {
			console.error("Failed to load image history:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// 保存到 localStorage
	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
		}
	}, [images, isLoading]);

	// 添加图片到历史记录
	const addImage = (imageData: Omit<GeneratedImage, "id" | "createdAt">) => {
		const newImage: GeneratedImage = {
			...imageData,
			id: Date.now().toString(),
			createdAt: new Date(),
		};

		setImages((prev) => [newImage, ...prev]);
		return newImage;
	};

	// 删除图片
	const deleteImage = (id: string) => {
		setImages((prev) => prev.filter((image) => image.id !== id));
	};

	// 切换收藏状态
	const toggleFavorite = (id: string) => {
		setImages((prev) =>
			prev.map((image) => {
				if (image.id === id) {
					return { ...image, isFavorite: !image.isFavorite };
				}
				return image;
			}),
		);
	};

	// 清空历史记录
	const clearHistory = () => {
		if (confirm("确定要清空所有历史记录吗？此操作不可恢复。")) {
			setImages([]);
			localStorage.removeItem(STORAGE_KEY);
		}
	};

	// 导出历史记录
	const exportHistory = () => {
		const exportData = {
			version: "1.0",
			exportDate: new Date().toISOString(),
			images: images.map((image) => ({
				...image,
				createdAt: image.createdAt.toISOString(),
			})),
		};

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `image-history-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// 获取收藏的图片
	const getFavoriteImages = () => {
		return images.filter((image) => image.isFavorite);
	};

	// 按日期分组图片
	const getImagesByDate = () => {
		const grouped: Record<string, GeneratedImage[]> = {};

		images.forEach((image) => {
			const date = image.createdAt.toLocaleDateString("zh-CN");
			if (!grouped[date]) {
				grouped[date] = [];
			}
			grouped[date].push(image);
		});

		return grouped;
	};

	// 搜索图片
	const searchImages = (query: string) => {
		if (!query.trim()) return images;

		const lowercaseQuery = query.toLowerCase();
		return images.filter(
			(image) =>
				image.prompt.toLowerCase().includes(lowercaseQuery) ||
				image.negativePrompt?.toLowerCase().includes(lowercaseQuery) ||
				image.model.toLowerCase().includes(lowercaseQuery) ||
				image.style.toLowerCase().includes(lowercaseQuery),
		);
	};

	// 按模型筛选
	const filterByModel = (model: string) => {
		return images.filter((image) => image.model === model);
	};

	// 按尺寸筛选
	const filterBySize = (size: string) => {
		return images.filter((image) => image.size === size);
	};

	// 获取统计信息
	const getStats = () => {
		const total = images.length;
		const favorites = images.filter((img) => img.isFavorite).length;
		const modelCounts = images.reduce(
			(acc, img) => {
				acc[img.model] = (acc[img.model] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		return {
			total,
			favorites,
			modelCounts,
		};
	};

	return {
		images,
		isLoading,
		addImage,
		deleteImage,
		toggleFavorite,
		clearHistory,
		exportHistory,
		getFavoriteImages,
		getImagesByDate,
		searchImages,
		filterByModel,
		filterBySize,
		getStats,
	};
}
