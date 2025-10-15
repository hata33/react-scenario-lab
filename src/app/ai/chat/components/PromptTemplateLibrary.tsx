"use client";

import { useState, useMemo } from "react";
import {
	Search,
	Plus,
	Star,
	StarOff,
	Copy,
	Edit,
	Trash2,
	Download,
	Upload,
	X,
	Check,
	ChevronDown,
	Filter,
	TrendingUp,
	Clock,
	Heart
} from "lucide-react";
import { usePromptTemplates } from "../hooks/usePromptTemplates";
import { PromptTemplate, PromptTemplateFormData, PromptCategory } from "../types/prompt";

interface PromptTemplateLibraryProps {
	visible: boolean;
	onClose: () => void;
	onSelectTemplate: (template: PromptTemplate, variables?: Record<string, string>) => void;
}

export default function PromptTemplateLibrary({
	visible,
	onClose,
	onSelectTemplate
}: PromptTemplateLibraryProps) {
	const {
		templates,
		categories,
		createTemplate,
		updateTemplate,
		deleteTemplate,
		toggleFavorite,
		duplicateTemplate,
		incrementUsage,
		getFavoriteTemplates,
		getPopularTemplates,
		getRecentTemplates,
		searchTemplates,
		exportTemplates,
		importTemplates
	} = usePromptTemplates();

	const [searchText, setSearchText] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
	const [sortBy, setSortBy] = useState<"recent" | "popular" | "name">("recent");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
	const [showVariableModal, setShowVariableModal] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
	const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

	// 表单状态
	const [formData, setFormData] = useState<PromptTemplateFormData>({
		title: "",
		content: "",
		description: "",
		category: "",
		tags: [],
		variables: []
	});

	// 过滤和搜索模板
	const filteredTemplates = useMemo(() => {
		let filtered = searchTemplates({
			searchText: searchText || undefined,
			category: selectedCategory || undefined,
			isFavorite: showFavoritesOnly || undefined
		});

		// 排序
		switch (sortBy) {
			case "popular":
				filtered.sort((a, b) => b.usageCount - a.usageCount);
				break;
			case "name":
				filtered.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "recent":
			default:
				filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
				break;
		}

		return filtered;
	}, [templates, searchText, selectedCategory, showFavoritesOnly, sortBy, searchTemplates]);

	// 重置表单
	const resetForm = () => {
		setFormData({
			title: "",
			content: "",
			description: "",
			category: "",
			tags: [],
			variables: []
		});
		setEditingTemplate(null);
	};

	// 处理创建/更新模板
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (editingTemplate) {
			updateTemplate(editingTemplate.id, formData);
		} else {
			createTemplate(formData);
		}

		resetForm();
		setShowCreateForm(false);
	};

	// 处理模板选择
	const handleSelectTemplate = (template: PromptTemplate) => {
		if (template.variables && template.variables.length > 0) {
			setSelectedTemplate(template);
			setShowVariableModal(true);
		} else {
			onSelectTemplate(template);
			incrementUsage(template.id);
			onClose();
		}
	};

	// 处理变量提交
	const handleVariableSubmit = () => {
		if (selectedTemplate) {
			onSelectTemplate(selectedTemplate, templateVariables);
			incrementUsage(selectedTemplate.id);
		}
		setShowVariableModal(false);
		setSelectedTemplate(null);
		setTemplateVariables({});
		onClose();
	};

	// 处理导入
	const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const data = JSON.parse(event.target?.result as string);
				const result = importTemplates(data);
				alert(`成功导入 ${result.imported} 个模板`);
			} catch (error) {
				alert("导入失败：文件格式不正确");
			}
		};
		reader.readAsText(file);
		e.target.value = ""; // 重置 input
	};

	// 添加变量
	const addVariable = () => {
		setFormData(prev => ({
			...prev,
			variables: [...prev.variables, {
				name: "",
				description: "",
				defaultValue: "",
				required: false
			}]
		}));
	};

	// 更新变量
	const updateVariable = (index: number, field: string, value: any) => {
		setFormData(prev => ({
			...prev,
			variables: prev.variables.map((variable, i) =>
				i === index ? { ...variable, [field]: value } : variable
			)
		}));
	};

	// 删除变量
	const removeVariable = (index: number) => {
		setFormData(prev => ({
			...prev,
			variables: prev.variables.filter((_, i) => i !== index)
		}));
	};

	if (!visible) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
				{/* 头部 */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">提示词模板库</h2>
						<p className="text-sm text-gray-500 mt-1">
							共 {templates.length} 个模板
						</p>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => exportTemplates()}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							title="导出模板"
						>
							<Download className="w-5 h-5" />
						</button>
						<label className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="导入模板">
							<Upload className="w-5 h-5" />
							<input
								type="file"
								accept=".json"
								onChange={handleImport}
								className="hidden"
							/>
						</label>
						<button
							onClick={() => setShowCreateForm(true)}
							className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<Plus className="w-4 h-4" />
							新建模板
						</button>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* 搜索和过滤 */}
				<div className="p-4 border-b border-gray-200 space-y-4">
					<div className="flex gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="text"
								placeholder="搜索模板..."
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">所有分类</option>
							{categories.map(category => (
								<option key={category.id} value={category.id}>
									{category.icon} {category.name}
								</option>
							))}
						</select>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as any)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="recent">最近更新</option>
							<option value="popular">最受欢迎</option>
							<option value="name">按名称排序</option>
						</select>
						<button
							onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
							className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
								showFavoritesOnly
									? "bg-yellow-100 text-yellow-700 border border-yellow-300"
									: "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
							}`}
						>
							<Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
							{showFavoritesOnly ? "已收藏" : "收藏"}
						</button>
					</div>
				</div>

				{/* 模板列表 */}
				<div className="flex-1 overflow-y-auto p-4">
					{filteredTemplates.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-gray-400 mb-4">
								<Search className="w-16 h-16 mx-auto" />
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">未找到模板</h3>
							<p className="text-gray-500">
								{searchText || selectedCategory || showFavoritesOnly
									? "尝试调整搜索条件或筛选器"
									: "开始创建你的第一个提示词模板吧"}
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredTemplates.map(template => {
								const category = categories.find(c => c.id === template.category);
								return (
									<div
										key={template.id}
										className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
									>
										<div className="flex items-start justify-between mb-2">
											<div className="flex items-center gap-2">
												{category && (
													<span className="text-lg" title={category.name}>
														{category.icon}
													</span>
												)}
												<h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
													{template.title}
												</h3>
											</div>
											<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleFavorite(template.id);
													}}
													className="p-1 hover:bg-gray-100 rounded transition-colors"
													title={template.isFavorite ? "取消收藏" : "添加收藏"}
												>
													{template.isFavorite ? (
														<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
													) : (
														<StarOff className="w-4 h-4 text-gray-400" />
													)}
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														duplicateTemplate(template.id);
													}}
													className="p-1 hover:bg-gray-100 rounded transition-colors"
													title="复制模板"
												>
													<Copy className="w-4 h-4 text-gray-400" />
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														setEditingTemplate(template);
														setFormData({
															title: template.title,
															content: template.content,
															description: template.description || "",
															category: template.category,
															tags: template.tags,
															variables: template.variables || []
														});
														setShowCreateForm(true);
													}}
													className="p-1 hover:bg-gray-100 rounded transition-colors"
													title="编辑模板"
												>
													<Edit className="w-4 h-4 text-gray-400" />
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														if (confirm("确定要删除这个模板吗？")) {
															deleteTemplate(template.id);
														}
													}}
													className="p-1 hover:bg-red-100 rounded transition-colors"
													title="删除模板"
												>
													<Trash2 className="w-4 h-4 text-red-400" />
												</button>
											</div>
										</div>

										{template.description && (
											<p className="text-sm text-gray-600 mb-3 line-clamp-2">
												{template.description}
											</p>
										)}

										<div className="flex flex-wrap gap-1 mb-3">
											{template.tags.map(tag => (
												<span
													key={tag}
													className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
												>
													{tag}
												</span>
											))}
										</div>

										{template.variables && template.variables.length > 0 && (
											<div className="mb-3">
												<span className="text-xs text-gray-500">
													包含 {template.variables.length} 个变量
												</span>
											</div>
										)}

										<div className="flex items-center justify-between text-xs text-gray-500">
											<span>使用 {template.usageCount} 次</span>
											<span>{template.updatedAt.toLocaleDateString()}</span>
										</div>

										<button
											onClick={() => handleSelectTemplate(template)}
											className="w-full mt-3 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
										>
											使用模板
										</button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>

			{/* 创建/编辑模板弹窗 */}
			{showCreateForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<h3 className="text-xl font-bold text-gray-900">
								{editingTemplate ? "编辑模板" : "新建模板"}
							</h3>
							<button
								onClick={() => {
									setShowCreateForm(false);
									resetForm();
								}}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									模板标题 *
								</label>
								<input
									type="text"
									required
									value={formData.title}
									onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="输入模板标题"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									模板内容 *
								</label>
								<textarea
									required
									value={formData.content}
									onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
									placeholder="输入提示词内容，使用 {{变量名}} 定义变量"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									描述
								</label>
								<input
									type="text"
									value={formData.description}
									onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="简短描述这个模板的用途"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									分类 *
								</label>
								<select
									required
									value={formData.category}
									onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">选择分类</option>
									{categories.map(category => (
										<option key={category.id} value={category.id}>
											{category.icon} {category.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									标签
								</label>
								<input
									type="text"
									value={formData.tags.join(", ")}
									onChange={(e) => setFormData(prev => ({
										...prev,
										tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
									}))}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="输入标签，用逗号分隔"
								/>
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<label className="block text-sm font-medium text-gray-700">
										变量
									</label>
									<button
										type="button"
										onClick={addVariable}
										className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
									>
										<Plus className="w-4 h-4 inline mr-1" />
										添加变量
									</button>
								</div>

								{formData.variables.length === 0 ? (
									<p className="text-sm text-gray-500 italic">
										在模板内容中使用 {{变量名}} 来定义变量
									</p>
								) : (
									<div className="space-y-2">
										{formData.variables.map((variable, index) => (
											<div key={index} className="border border-gray-200 rounded-lg p-3">
												<div className="grid grid-cols-2 gap-2 mb-2">
													<input
														type="text"
														placeholder="变量名"
														value={variable.name}
														onChange={(e) => updateVariable(index, "name", e.target.value)}
														className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
													/>
													<input
														type="text"
														placeholder="默认值"
														value={variable.defaultValue}
														onChange={(e) => updateVariable(index, "defaultValue", e.target.value)}
														className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
													/>
												</div>
												<input
													type="text"
													placeholder="变量描述"
													value={variable.description}
													onChange={(e) => updateVariable(index, "description", e.target.value)}
													className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
												/>
												<div className="flex items-center justify-between">
													<label className="flex items-center gap-2 text-sm">
														<input
															type="checkbox"
															checked={variable.required}
															onChange={(e) => updateVariable(index, "required", e.target.checked)}
															className="rounded"
														/>
														必填
													</label>
													<button
														type="button"
														onClick={() => removeVariable(index)}
														className="text-red-500 hover:text-red-700 text-sm"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
								<button
									type="button"
									onClick={() => {
										setShowCreateForm(false);
										resetForm();
									}}
									className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
								>
									取消
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
								>
									{editingTemplate ? "更新" : "创建"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 变量输入弹窗 */}
			{showVariableModal && selectedTemplate && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md">
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<h3 className="text-xl font-bold text-gray-900">填写模板变量</h3>
							<button
								onClick={() => {
									setShowVariableModal(false);
									setSelectedTemplate(null);
									setTemplateVariables({});
								}}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="p-6">
							<div className="mb-4">
								<h4 className="font-semibold text-gray-900 mb-2">{selectedTemplate.title}</h4>
								{selectedTemplate.description && (
									<p className="text-sm text-gray-600">{selectedTemplate.description}</p>
								)}
							</div>

							<div className="space-y-4">
								{selectedTemplate.variables?.map((variable) => (
									<div key={variable.name}>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{variable.name}
											{variable.required && <span className="text-red-500 ml-1">*</span>}
										</label>
										{variable.description && (
											<p className="text-xs text-gray-500 mb-1">{variable.description}</p>
										)}
										<input
											type="text"
											required={variable.required}
											value={templateVariables[variable.name] || variable.defaultValue || ""}
											onChange={(e) => setTemplateVariables(prev => ({
												...prev,
												[variable.name]: e.target.value
											}))}
											placeholder={variable.defaultValue || `输入${variable.name}`}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								))}
							</div>

							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => {
										setShowVariableModal(false);
										setSelectedTemplate(null);
										setTemplateVariables({});
									}}
									className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
								>
									取消
								</button>
								<button
									onClick={handleVariableSubmit}
									className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
								>
									使用模板
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}