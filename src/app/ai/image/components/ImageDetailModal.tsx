"use client";

import {
	Calendar,
	Copy,
	Download,
	Heart,
	Image as ImageIcon,
	Settings,
	Trash2,
	X,
	ZoomIn,
	ZoomOut,
} from "lucide-react";
import { useState } from "react";
import type { GeneratedImage } from "./ImageGenerator";

interface ImageDetailModalProps {
	image: GeneratedImage | null;
	onClose: () => void;
	onImageUpdate: () => void;
	onDeleteImage: (id: string) => void;
	onToggleFavorite: (id: string) => void;
}

export default function ImageDetailModal({
	image,
	onClose,
	onImageUpdate,
	onDeleteImage,
	onToggleFavorite,
}: ImageDetailModalProps) {
	const [zoomLevel, setZoomLevel] = useState(1);

	if (!image) return null;

	// 下载图片
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = image.url;
		link.download = `ai-image-${image.id}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// 复制图片链接
	const handleCopyLink = () => {
		navigator.clipboard.writeText(image.url);
	};

	// 复制提示词
	const handleCopyPrompt = () => {
		navigator.clipboard.writeText(image.prompt);
	};

	// 缩放控制
	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 0.25, 3));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
	};

	const handleResetZoom = () => {
		setZoomLevel(1);
	};

	// 格式化日期
	const formatDate = (date: Date) => {
		return date.toLocaleString("zh-CN", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// 获取模型显示名称
	const getModelDisplayName = (model: string) => {
		const modelNames: Record<string, string> = {
			"dall-e-3": "DALL-E 3",
			"dall-e-2": "DALL-E 2",
			"stable-diffusion": "Stable Diffusion",
			midjourney: "Midjourney",
		};
		return modelNames[model] || model;
	};

	// 获取质量显示名称
	const getQualityDisplayName = (quality: string) => {
		const qualityNames: Record<string, string> = {
			standard: "标准",
			hd: "高清",
		};
		return qualityNames[quality] || quality;
	};

	// 获取风格显示名称
	const getStyleDisplayName = (style: string) => {
		const styleNames: Record<string, string> = {
			vivid: "生动",
			natural: "自然",
		};
		return styleNames[style] || style;
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
			<div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
				{/* 头部 */}
				<div className="flex items-center justify-between border-gray-200 border-b p-6">
					<h2 className="font-bold text-gray-900 text-xl">图片详情</h2>
					<button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* 内容区域 */}
				<div className="flex-1 overflow-y-auto">
					<div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
						{/* 左侧：图片展示 */}
						<div className="space-y-4">
							<div className="relative overflow-hidden rounded-lg bg-gray-100" style={{ minHeight: "400px" }}>
								<img
									src={image.url}
									alt={image.prompt}
									className="h-full w-full object-contain transition-transform duration-200"
									style={{ transform: `scale(${zoomLevel})` }}
								/>

								{/* 缩放控制 */}
								<div className="-translate-x-1/2 absolute bottom-4 left-1/2 flex transform items-center gap-2 rounded-lg bg-black bg-opacity-50 p-2">
									<button
										onClick={handleZoomOut}
										className="rounded p-1 transition-colors hover:bg-white hover:bg-opacity-20"
										title="缩小"
									>
										<ZoomOut className="h-4 w-4 text-white" />
									</button>
									<button
										onClick={handleResetZoom}
										className="rounded px-2 text-sm text-white transition-colors hover:bg-white hover:bg-opacity-20"
									>
										{Math.round(zoomLevel * 100)}%
									</button>
									<button
										onClick={handleZoomIn}
										className="rounded p-1 transition-colors hover:bg-white hover:bg-opacity-20"
										title="放大"
									>
										<ZoomIn className="h-4 w-4 text-white" />
									</button>
								</div>

								{/* 收藏标记 */}
								{image.isFavorite && (
									<div className="absolute top-4 right-4 rounded-full bg-red-500 p-2">
										<Heart className="h-4 w-4 fill-current text-white" />
									</div>
								)}
							</div>

							{/* 操作按钮 */}
							<div className="flex flex-wrap gap-2">
								<button
									onClick={handleDownload}
									className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 sm:flex-none"
								>
									<Download className="h-4 w-4" />
									下载
								</button>
								<button
									onClick={handleCopyLink}
									className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 sm:flex-none"
								>
									<Copy className="h-4 w-4" />
									复制链接
								</button>
								<button
									onClick={() => onToggleFavorite(image.id)}
									className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors sm:flex-none ${
										image.isFavorite
											? "bg-red-50 text-red-600 hover:bg-red-100"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{image.isFavorite ? (
										<>
											<Heart className="h-4 w-4 fill-current" />
											取消收藏
										</>
									) : (
										<>
											<Heart className="h-4 w-4" />
											收藏
										</>
									)}
								</button>
								<button
									onClick={() => {
										if (confirm("确定要删除这张图片吗？")) {
											onDeleteImage(image.id);
											onClose();
											onImageUpdate();
										}
									}}
									className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 transition-colors hover:bg-red-100 sm:flex-none"
								>
									<Trash2 className="h-4 w-4" />
									删除
								</button>
							</div>
						</div>

						{/* 右侧：详细信息 */}
						<div className="space-y-6">
							{/* 基本信息 */}
							<div>
								<h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 text-lg">
									<ImageIcon className="h-5 w-5" />
									基本信息
								</h3>
								<div className="space-y-3">
									<div>
										<label className="font-medium text-gray-700 text-sm">创建时间</label>
										<div className="flex items-center gap-2 text-gray-600 text-sm">
											<Calendar className="h-4 w-4" />
											{formatDate(image.createdAt)}
										</div>
									</div>
									<div>
										<label className="font-medium text-gray-700 text-sm">图片 ID</label>
										<div className="font-mono text-gray-600 text-sm">{image.id}</div>
									</div>
								</div>
							</div>

							{/* 生成参数 */}
							<div>
								<h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 text-lg">
									<Settings className="h-5 w-5" />
									生成参数
								</h3>
								<div className="space-y-3">
									<div>
										<label className="font-medium text-gray-700 text-sm">模型</label>
										<div className="text-gray-600 text-sm">{getModelDisplayName(image.model)}</div>
									</div>
									<div>
										<label className="font-medium text-gray-700 text-sm">尺寸</label>
										<div className="text-gray-600 text-sm">{image.size}</div>
									</div>
									<div>
										<label className="font-medium text-gray-700 text-sm">质量</label>
										<div className="text-gray-600 text-sm">{getQualityDisplayName(image.quality)}</div>
									</div>
									<div>
										<label className="font-medium text-gray-700 text-sm">风格</label>
										<div className="text-gray-600 text-sm">{getStyleDisplayName(image.style)}</div>
									</div>
								</div>
							</div>

							{/* 提示词 */}
							<div>
								<h3 className="mb-4 font-semibold text-gray-900 text-lg">提示词</h3>
								<div className="space-y-3">
									<div>
										<div className="mb-2 flex items-center justify-between">
											<label className="font-medium text-gray-700 text-sm">正面提示词</label>
											<button
												onClick={handleCopyPrompt}
												className="flex items-center gap-1 text-purple-600 text-sm hover:text-purple-700"
											>
												<Copy className="h-3 w-3" />
												复制
											</button>
										</div>
										<div className="rounded-lg bg-gray-50 p-3 text-gray-700 text-sm">{image.prompt}</div>
									</div>
									{image.negativePrompt && (
										<div>
											<label className="font-medium text-gray-700 text-sm">负面提示词</label>
											<div className="rounded-lg bg-red-50 p-3 text-gray-700 text-sm">{image.negativePrompt}</div>
										</div>
									)}
								</div>
							</div>

							{/* 操作记录 */}
							<div>
								<h3 className="mb-4 font-semibold text-gray-900 text-lg">操作记录</h3>
								<div className="text-gray-600 text-sm">
									<div className="mb-1 flex items-center gap-2">
										<div className="h-2 w-2 rounded-full bg-green-500"></div>
										图片生成成功
									</div>
									{image.isFavorite && (
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-red-500"></div>
											已添加到收藏
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
