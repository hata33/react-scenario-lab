"use client";

import { useEffect, useMemo, useState } from "react";
import {
	DEFAULT_CATEGORIES,
	DEFAULT_TEMPLATES,
	PromptCategory,
	PromptSearchFilters,
	PromptTemplate,
	PromptTemplateFormData,
} from "../types/prompt";

const TEMPLATES_STORAGE_KEY = "ai-prompt-templates";
const CATEGORIES_STORAGE_KEY = "ai-prompt-categories";

export function usePromptTemplates() {
	const [templates, setTemplates] = useState<PromptTemplate[]>([]);
	const [categories, setCategories] = useState<PromptCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// 初始化数据
	useEffect(() => {
		const initData = () => {
			try {
				// 加载分类
				const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
				let loadedCategories: PromptCategory[] = [];

				if (storedCategories) {
					loadedCategories = JSON.parse(storedCategories);
				} else {
					loadedCategories = DEFAULT_CATEGORIES;
					localStorage.setItem(
						CATEGORIES_STORAGE_KEY,
						JSON.stringify(loadedCategories),
					);
				}

				// 加载模板
				const storedTemplates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
				let loadedTemplates: PromptTemplate[] = [];

				if (storedTemplates) {
					loadedTemplates = JSON.parse(storedTemplates).map(
						(template: any) => ({
							...template,
							createdAt: new Date(template.createdAt),
							updatedAt: new Date(template.updatedAt),
						}),
					);
				} else {
					// 创建默认模板
					loadedTemplates = DEFAULT_TEMPLATES.map((template, index) => ({
						...template,
						id: `default-${index + 1}`,
						createdAt: new Date(),
						updatedAt: new Date(),
						usageCount: 0,
					}));
					localStorage.setItem(
						TEMPLATES_STORAGE_KEY,
						JSON.stringify(loadedTemplates),
					);
				}

				setCategories(loadedCategories);
				setTemplates(loadedTemplates);
			} catch (error) {
				console.error("Failed to load prompt templates:", error);
				// 设置默认数据
				setCategories(DEFAULT_CATEGORIES);
				setTemplates(
					DEFAULT_TEMPLATES.map((template, index) => ({
						...template,
						id: `default-${index + 1}`,
						createdAt: new Date(),
						updatedAt: new Date(),
						usageCount: 0,
					})),
				);
			} finally {
				setIsLoading(false);
			}
		};

		initData();
	}, []);

	// 保存模板到本地存储
	useEffect(() => {
		if (!isLoading && templates.length > 0) {
			localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
		}
	}, [templates, isLoading]);

	// 创建新模板
	const createTemplate = (data: PromptTemplateFormData) => {
		const newTemplate: any = {
			...data,
			id: `template-${Date.now()}`,
			createdAt: new Date(),
			updatedAt: new Date(),
			usageCount: 0,
		};

		setTemplates((prev) => [newTemplate, ...prev]);
		return newTemplate;
	};

	// 更新模板
	const updateTemplate = (
		id: string,
		data: Partial<PromptTemplateFormData>,
	) => {
		setTemplates((prev) =>
			prev.map((template) => {
				if (template.id === id) {
					return {
						...template,
						...data,
						updatedAt: new Date(),
					};
				}
				return template;
			}),
		);
	};

	// 删除模板
	const deleteTemplate = (id: string) => {
		setTemplates((prev) => prev.filter((template) => template.id !== id));
	};

	// 切换收藏状态
	const toggleFavorite = (id: string) => {
		setTemplates((prev) =>
			prev.map((template) => {
				if (template.id === id) {
					return { ...template, isFavorite: !template.isFavorite };
				}
				return template;
			}),
		);
	};

	// 增加使用次数
	const incrementUsage = (id: string) => {
		setTemplates((prev) =>
			prev.map((template) => {
				if (template.id === id) {
					return { ...template, usageCount: template.usageCount + 1 };
				}
				return template;
			}),
		);
	};

	// 复制模板
	const duplicateTemplate = (id: string) => {
		const template = templates.find((t) => t.id === id);
		if (!template) return null;

		const duplicated: PromptTemplate = {
			...template,
			id: `template-${Date.now()}`,
			title: `${template.title} (副本)`,
			createdAt: new Date(),
			updatedAt: new Date(),
			usageCount: 0,
		};

		setTemplates((prev) => [duplicated, ...prev]);
		return duplicated;
	};

	// 获取模板内容（替换变量）
	const getProcessedContent = (
		template: PromptTemplate,
		variables: Record<string, string> = {},
	) => {
		let content = template.content;

		// 替换变量
		template.variables?.forEach((variable) => {
			const value =
				variables[variable.name] ||
				variable.defaultValue ||
				`{{${variable.name}}}`;
			content = content.replace(new RegExp(`{{${variable.name}}}`, "g"), value);
		});

		return content;
	};

	// 搜索和过滤模板
	const filteredTemplates = useMemo(() => {
		return templates.filter((template) => {
			// 搜索文本过滤
			const searchText: string = ""; // 可以从外部传入
			if (searchText) {
				const searchLower = searchText.toLowerCase();
				const matchesSearch =
					template.title.toLowerCase().includes(searchLower) ||
					template.description?.toLowerCase().includes(searchLower) ||
					template.content.toLowerCase().includes(searchLower) ||
					template.tags.some((tag) => tag.toLowerCase().includes(searchLower));

				if (!matchesSearch) return false;
			}

			return true;
		});
	}, [templates]);

	// 按分类获取模板
	const getTemplatesByCategory = (categoryId: string) => {
		return templates.filter((template) => template.category === categoryId);
	};

	// 获取收藏模板
	const getFavoriteTemplates = () => {
		return templates.filter((template) => template.isFavorite);
	};

	// 获取热门模板（按使用次数排序）
	const getPopularTemplates = (limit = 10) => {
		return [...templates]
			.sort((a, b) => b.usageCount - a.usageCount)
			.slice(0, limit);
	};

	// 获取最近使用的模板
	const getRecentTemplates = (limit = 10) => {
		return [...templates]
			.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
			.slice(0, limit);
	};

	// 搜索模板
	const searchTemplates = (filters: PromptSearchFilters) => {
		return templates.filter((template) => {
			// 分类过滤
			if (filters.category && template.category !== filters.category) {
				return false;
			}

			// 标签过滤
			if (filters.tags && filters.tags.length > 0) {
				const hasAllTags = filters.tags.every((tag) =>
					template.tags.includes(tag),
				);
				if (!hasAllTags) return false;
			}

			// 收藏过滤
			if (
				filters.isFavorite !== undefined &&
				template.isFavorite !== filters.isFavorite
			) {
				return false;
			}

			// 搜索文本过滤
			if (filters.searchText) {
				const searchLower = filters.searchText.toLowerCase();
				const matchesSearch =
					template.title.toLowerCase().includes(searchLower) ||
					template.description?.toLowerCase().includes(searchLower) ||
					template.content.toLowerCase().includes(searchLower) ||
					template.tags.some((tag) => tag.toLowerCase().includes(searchLower));

				if (!matchesSearch) return false;
			}

			return true;
		});
	};

	// 导出模板
	const exportTemplates = (ids?: string[]) => {
		const templatesToExport = ids
			? templates.filter((t) => ids.includes(t.id))
			: templates;

		const exportData = {
			version: "1.0",
			exportDate: new Date().toISOString(),
			templates: templatesToExport,
			categories: categories,
		};

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `prompt-templates-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		return exportData;
	};

	// 导入模板
	const importTemplates = (data: any) => {
		try {
			const importedTemplates: PromptTemplate[] = data.templates.map(
				(template: any) => ({
					...template,
					id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
					createdAt: new Date(template.createdAt),
					updatedAt: new Date(),
					usageCount: 0,
				}),
			);

			setTemplates((prev) => [...importedTemplates, ...prev]);

			// 导入分类（如果不存在）
			if (data.categories) {
				const newCategories = data.categories.filter(
					(cat: any) => !categories.some((existing) => existing.id === cat.id),
				);
				if (newCategories.length > 0) {
					setCategories((prev) => [...prev, ...newCategories]);
				}
			}

			return {
				imported: importedTemplates.length,
				total: data.templates.length,
			};
		} catch (error) {
			console.error("Failed to import templates:", error);
			throw new Error("导入失败：文件格式不正确");
		}
	};

	return {
		// 数据
		templates,
		categories,
		isLoading,
		filteredTemplates,

		// 操作方法
		createTemplate,
		updateTemplate,
		deleteTemplate,
		toggleFavorite,
		incrementUsage,
		duplicateTemplate,

		// 查询方法
		getProcessedContent,
		getTemplatesByCategory,
		getFavoriteTemplates,
		getPopularTemplates,
		getRecentTemplates,
		searchTemplates,

		// 导入导出
		exportTemplates,
		importTemplates,
	};
}
