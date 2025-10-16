"use client";

import { History, Image, Sparkles } from "lucide-react";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import ImageDetailModal from "./components/ImageDetailModal";
import ImageGallery from "./components/ImageGallery";
import type { GeneratedImage } from "./components/ImageGenerator";
import ImageGenerator from "./components/ImageGenerator";
import { useImageHistory } from "./hooks/useImageHistory";

export default function AIImagePage() {
	const [activeTab, setActiveTab] = useState<"generate" | "gallery">(
		"generate",
	);
	const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
		null,
	);
	const [galleryUpdateTrigger, setGalleryUpdateTrigger] = useState(0);

	const { images, addImage, deleteImage, toggleFavorite } = useImageHistory();

	const handleImageGenerated = (
		imageData: Omit<GeneratedImage, "id" | "createdAt">,
	) => {
		addImage(imageData);
		setGalleryUpdateTrigger((prev) => prev + 1);
	};

	const handleImageSelect = (image: GeneratedImage) => {
		setSelectedImage(image);
	};

	const handleImageUpdate = () => {
		setGalleryUpdateTrigger((prev) => prev + 1);
	};

	const handleDeleteImage = (id: string) => {
		deleteImage(id);
		if (selectedImage?.id === id) {
			setSelectedImage(null);
		}
	};

	const handleToggleFavorite = (id: string) => {
		toggleFavorite(id);
		if (selectedImage?.id === id) {
			setSelectedImage((prev) =>
				prev
					? {
						...prev,
						isFavorite: !prev.isFavorite,
					}
					: null,
			);
		}
	};

	return (
		<Layout>
			<div className="container mx-auto px-4 py-6 h-screen flex flex-col">
				<div className="mb-6">
					<BackButton />
				</div>

				{/* 页面头部 */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<h1 className="text-3xl font-bold">AI 文生图</h1>
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<Sparkles className="w-4 h-4" />
							<span>使用 AI 创造精美图片</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setActiveTab("generate")}
							className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === "generate"
									? "bg-purple-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
						>
							<Image className="w-4 h-4" />
							生成图片
						</button>
						<button
							onClick={() => setActiveTab("gallery")}
							className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 relative ${activeTab === "gallery"
									? "bg-purple-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
						>
							<History className="w-4 h-4" />
							历史记录
							{images.length > 0 && (
								<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
									{images.length}
								</span>
							)}
						</button>
					</div>
				</div>

				{/* 主要内容区域 */}
				<div className="flex-1 min-h-0 overflow-hidden">
					{activeTab === "generate" ? (
						<ImageGenerator
							onImageGenerated={handleImageGenerated}
							onImageSelect={handleImageSelect}
						/>
					) : (
						<ImageGallery
							images={images}
							onImageSelect={handleImageSelect}
							onImageUpdate={handleImageUpdate}
						/>
					)}
				</div>

				{/* 图片详情模态框 */}
				<ImageDetailModal
					image={selectedImage}
					onClose={() => setSelectedImage(null)}
					onImageUpdate={handleImageUpdate}
					onDeleteImage={handleDeleteImage}
					onToggleFavorite={handleToggleFavorite}
				/>
			</div>
		</Layout>
	);
}
