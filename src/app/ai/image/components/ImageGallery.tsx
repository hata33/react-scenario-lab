"use client";

import {
	Calendar,
	Download,
	Edit3,
	Filter,
	Grid3X3,
	Heart,
	HeartOff,
	Image as ImageIcon,
	List,
	Search,
	Share2,
	Trash2,
	X,
	ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { useImageHistory } from "../hooks/useImageHistory";
import type { GeneratedImage } from "./ImageGenerator";

interface ImageGalleryProps {
	images: GeneratedImage[];
	onImageSelect: (image: GeneratedImage) => void;
	onImageUpdate: () => void;
}

export default function ImageGallery({ images, onImageSelect, onImageUpdate }: ImageGalleryProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
	const [selectedModel, setSelectedModel] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
	const [showFilters, setShowFilters] = useState(false);

	const { deleteImage, toggleFavorite, exportHistory, getStats } = useImageHistory();

	// 获取所有可用的模型
	const availableModels = Array.from(new Set(images.map((img) => img.model)));

	// 过滤图片
	const filteredImages = images.filter((image) => {
		// 搜索过滤
		if (searchQuery && !image.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
			return false;
		}

		// 收藏过滤
		if (showFavoritesOnly && !image.isFavorite) {
			return false;
		}

		// 模型过滤
		if (selectedModel && image.model !== selectedModel) {
			return false;
		}

		return true;
	});

	// 删除图片
	const handleDeleteImage = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (confirm("确定要删除这张图片吗？")) {
			deleteImage(id);
			onImageUpdate();
		}
	};

	// 下载图片
	const handleDownloadImage = (image: GeneratedImage, e: React.MouseEvent) => {
		e.stopPropagation();
		const link = document.createElement("a");
		link.href = image.url;
		link.download = `ai-image-${image.id}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// 切换收藏
	const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		toggleFavorite(id);
		onImageUpdate();
	};

	// 格式化日期
	const formatDate = (date: Date) => {
		return date.toLocaleDateString("zh-CN", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const stats = getStats();

	return (
		<div className="space-y-6">
			{/* 搜索和过滤栏 */}
			<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
				<div className="flex flex-col gap-4 lg:flex-row">
					{/* 搜索框 */}
					<div className="relative flex-1">
						<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
						<input
							type="text"
							placeholder="搜索图片描述..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>

					{/* 过滤按钮 */}
					<div className="flex items-center gap-2">
						<button
							onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
							className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
								showFavoritesOnly
									? "border border-red-200 bg-red-50 text-red-600"
									: "border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
							}`}
						>
							{showFavoritesOnly ? <Heart className="h-4 w-4 fill-current" /> : <HeartOff className="h-4 w-4" />}
							<span className="hidden sm:inline">{showFavoritesOnly ? "已收藏" : "收藏"}</span>
						</button>

						<button
							onClick={() => setShowFilters(!showFilters)}
							className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
								showFilters
									? "border border-purple-200 bg-purple-50 text-purple-600"
									: "border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
							}`}
						>
							<Filter className="h-4 w-4" />
							<span className="hidden sm:inline">筛选</span>
						</button>

						{/* 视图切换 */}
						<div className="flex rounded-lg border border-gray-200">
							<button
								onClick={() => setViewMode("grid")}
								className={`px-3 py-2 transition-colors ${
									viewMode === "grid" ? "bg-purple-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
								}`}
							>
								<Grid3X3 className="h-4 w-4" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`px-3 py-2 transition-colors ${
									viewMode === "list" ? "bg-purple-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
								}`}
							>
								<List className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>

				{/* 高级过滤选项 */}
				{showFilters && (
					<div className="mt-4 border-gray-200 border-t pt-4">
						<div className="flex items-center gap-4">
							<label className="font-medium text-gray-700 text-sm">模型:</label>
							<select
								value={selectedModel}
								onChange={(e) => setSelectedModel(e.target.value)}
								className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
							>
								<option value="">全部模型</option>
								{availableModels.map((model) => (
									<option key={model} value={model}>
										{model}
									</option>
								))}
							</select>

							<div className="flex flex-1 justify-end">
								<button onClick={exportHistory} className="text-purple-600 text-sm hover:text-purple-700">
									导出历史记录
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* 统计信息 */}
			<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-6">
						<div className="text-sm">
							<span className="text-gray-500">总计:</span>
							<span className="ml-2 font-semibold text-gray-900">{stats.total} 张</span>
						</div>
						<div className="text-sm">
							<span className="text-gray-500">收藏:</span>
							<span className="ml-2 font-semibold text-red-600">{stats.favorites} 张</span>
						</div>
					</div>
					{filteredImages.length !== images.length && (
						<div className="text-gray-500 text-sm">
							显示 {filteredImages.length} / {images.length} 张
						</div>
					)}
				</div>
			</div>

			{/* 图片网格/列表 */}
			{filteredImages.length === 0 ? (
				<div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
					<ImageIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" />
					<h3 className="mb-2 font-medium text-gray-900 text-lg">
						{images.length === 0 ? "还没有生成任何图片" : "没有找到匹配的图片"}
					</h3>
					<p className="text-gray-500">
						{images.length === 0 ? "开始生成你的第一张 AI 图片吧！" : "尝试调整搜索条件或筛选器"}
					</p>
				</div>
			) : (
				<div
					className={
						viewMode === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"
					}
				>
					{filteredImages.map((image) => (
						<div
							key={image.id}
							onClick={() => setSelectedImage(image)}
							className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
						>
							{viewMode === "grid" ? (
								// 网格视图
								<div className="relative aspect-square overflow-hidden">
									<img
										src={image.url}
										alt={image.prompt}
										className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
									/>
									{/* 悬停操作按钮 */}
									<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all duration-200 group-hover:bg-opacity-50 group-hover:opacity-100">
										<div className="flex items-center gap-2">
											<button
												onClick={(e) => handleToggleFavorite(image.id, e)}
												className="rounded-lg bg-white p-2 transition-colors hover:bg-gray-100"
												title={image.isFavorite ? "取消收藏" : "添加收藏"}
											>
												{image.isFavorite ? (
													<Heart className="h-4 w-4 fill-current text-red-500" />
												) : (
													<Heart className="h-4 w-4 text-gray-600" />
												)}
											</button>
											<button
												onClick={(e) => handleDownloadImage(image, e)}
												className="rounded-lg bg-white p-2 transition-colors hover:bg-gray-100"
												title="下载"
											>
												<Download className="h-4 w-4 text-gray-600" />
											</button>
											<button
												onClick={(e) => handleDeleteImage(image.id, e)}
												className="rounded-lg bg-white p-2 transition-colors hover:bg-red-100"
												title="删除"
											>
												<Trash2 className="h-4 w-4 text-red-500" />
											</button>
										</div>
									</div>
									{/* 收藏标记 */}
									{image.isFavorite && (
										<div className="absolute top-2 right-2 rounded-full bg-red-500 p-1">
											<Heart className="h-3 w-3 fill-current text-white" />
										</div>
									)}
								</div>
							) : (
								// 列表视图
								<div className="flex gap-4 p-4">
									<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
										<img src={image.url} alt={image.prompt} className="h-full w-full object-cover" />
									</div>
									<div className="min-w-0 flex-1">
										<h4 className="mb-1 truncate font-medium text-gray-900">{image.prompt}</h4>
										<div className="mb-2 flex items-center gap-4 text-gray-500 text-xs">
											<span>{image.model}</span>
											<span>{image.size}</span>
											<span>{formatDate(image.createdAt)}</span>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={(e) => handleToggleFavorite(image.id, e)}
												className={`rounded p-1 transition-colors ${image.isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
											>
												<Heart className={`h-4 w-4 ${image.isFavorite ? "fill-current" : ""}`} />
											</button>
											<button
												onClick={(e) => handleDownloadImage(image, e)}
												className="p-1 text-gray-400 transition-colors hover:text-gray-600"
											>
												<Download className="h-4 w-4" />
											</button>
											<button
												onClick={(e) => handleDeleteImage(image.id, e)}
												className="p-1 text-gray-400 transition-colors hover:text-red-500"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
									</div>
								</div>
							)}

							{/* 图片信息 (网格视图) */}
							{viewMode === "grid" && (
								<div className="p-3">
									<p className="mb-2 line-clamp-2 text-gray-600 text-sm">{image.prompt}</p>
									<div className="flex items-center justify-between text-gray-500 text-xs">
										<span>{image.model}</span>
										<span>{formatDate(image.createdAt)}</span>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
