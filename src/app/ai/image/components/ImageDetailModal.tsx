"use client";

import { useState } from "react";
import {
	X,
	Download,
	Share2,
	Heart,
	HeartOff,
	Trash2,
	Copy,
	Calendar,
	Image as ImageIcon,
	Settings,
	ZoomIn,
	ZoomOut
} from "lucide-react";
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
	onToggleFavorite
}: ImageDetailModalProps) {
	const [zoomLevel, setZoomLevel] = useState(1);

	if (!image) return null;

	// 下载图片
	const handleDownload = () => {
		const link = document.createElement('a');
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
		setZoomLevel(prev => Math.min(prev + 0.25, 3));
	};

	const handleZoomOut = () => {
		setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
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
			minute: "2-digit"
		});
	};

	// 获取模型显示名称
	const getModelDisplayName = (model: string) => {
		const modelNames: Record<string, string> = {
			"dall-e-3": "DALL-E 3",
			"dall-e-2": "DALL-E 2",
			"stable-diffusion": "Stable Diffusion",
			"midjourney": "Midjourney"
		};
		return modelNames[model] || model;
	};

	// 获取质量显示名称
	const getQualityDisplayName = (quality: string) => {
		const qualityNames: Record<string, string> = {
			"standard": "标准",
			"hd": "高清"
		};
		return qualityNames[quality] || quality;
	};

	// 获取风格显示名称
	const getStyleDisplayName = (style: string) => {
		const styleNames: Record<string, string> = {
			"vivid": "生动",
			"natural": "自然"
		};
		return styleNames[style] || style;
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
				{/* 头部 */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-bold text-gray-900">图片详情</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* 内容区域 */}
				<div className="flex-1 overflow-y-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
						{/* 左侧：图片展示 */}
						<div className="space-y-4">
							<div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
								<img
									src={image.url}
									alt={image.prompt}
									className="w-full h-full object-contain transition-transform duration-200"
									style={{ transform: `scale(${zoomLevel})` }}
								/>

								{/* 缩放控制 */}
								<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 rounded-lg p-2">
									<button
										onClick={handleZoomOut}
										className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
										title="缩小"
									>
										<ZoomOut className="w-4 h-4 text-white" />
									</button>
									<button
										onClick={handleResetZoom}
										className="px-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors text-white text-sm"
									>
										{Math.round(zoomLevel * 100)}%
									</button>
									<button
										onClick={handleZoomIn}
										className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
										title="放大"
									>
										<ZoomIn className="w-4 h-4 text-white" />
									</button>
								</div>

								{/* 收藏标记 */}
								{image.isFavorite && (
									<div className="absolute top-4 right-4 p-2 bg-red-500 rounded-full">
										<Heart className="w-4 h-4 text-white fill-current" />
									</div>
								)}
							</div>

							{/* 操作按钮 */}
							<div className="flex flex-wrap gap-2">
								<button
									onClick={handleDownload}
									className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
								>
									<Download className="w-4 h-4" />
									下载
								</button>
								<button
									onClick={handleCopyLink}
									className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
								>
									<Copy className="w-4 h-4" />
									复制链接
								</button>
								<button
									onClick={() => onToggleFavorite(image.id)}
									className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
										image.isFavorite
											? "bg-red-50 text-red-600 hover:bg-red-100"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{image.isFavorite ? (
										<>
											<Heart className="w-4 h-4 fill-current" />
											取消收藏
										</>
									) : (
										<>
											<Heart className="w-4 h-4" />
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
									className="flex-1 sm:flex-none px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
								>
									<Trash2 className="w-4 h-4" />
									删除
								</button>
							</div>
						</div>

						{/* 右侧：详细信息 */}
						<div className="space-y-6">
							{/* 基本信息 */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<ImageIcon className="w-5 h-5" />
									基本信息
								</h3>
								<div className="space-y-3">
									<div>
										<label className="text-sm font-medium text-gray-700">创建时间</label>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Calendar className="w-4 h-4" />
											{formatDate(image.createdAt)}
										</div>
									</div>
									<div>
										<label className="text-sm font-medium text-gray-700">图片 ID</label>
										<div className="text-sm text-gray-600 font-mono">{image.id}</div>
									</div>
								</div>
							</div>

							{/* 生成参数 */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Settings className="w-5 h-5" />
									生成参数
								</h3>
								<div className="space-y-3">
									<div>
										<label className="text-sm font-medium text-gray-700">模型</label>
										<div className="text-sm text-gray-600">{getModelDisplayName(image.model)}</div>
									</div>
									<div>
										<label className="text-sm font-medium text-gray-700">尺寸</label>
										<div className="text-sm text-gray-600">{image.size}</div>
									</div>
									<div>
										<label className="text-sm font-medium text-gray-700">质量</label>
										<div className="text-sm text-gray-600">{getQualityDisplayName(image.quality)}</div>
									</div>
									<div>
										<label className="text-sm font-medium text-gray-700">风格</label>
										<div className="text-sm text-gray-600">{getStyleDisplayName(image.style)}</div>
									</div>
								</div>
							</div>

							{/* 提示词 */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">提示词</h3>
								<div className="space-y-3">
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="text-sm font-medium text-gray-700">正面提示词</label>
											<button
												onClick={handleCopyPrompt}
												className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
											>
												<Copy className="w-3 h-3" />
												复制
											</button>
										</div>
										<div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
											{image.prompt}
										</div>
									</div>
									{image.negativePrompt && (
										<div>
											<label className="text-sm font-medium text-gray-700">负面提示词</label>
											<div className="p-3 bg-red-50 rounded-lg text-sm text-gray-700">
												{image.negativePrompt}
											</div>
										</div>
									)}
								</div>
							</div>

							{/* 操作记录 */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">操作记录</h3>
								<div className="text-sm text-gray-600">
									<div className="flex items-center gap-2 mb-1">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										图片生成成功
									</div>
									{image.isFavorite && (
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-red-500 rounded-full"></div>
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