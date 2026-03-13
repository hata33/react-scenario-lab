"use client";

import { History, Image, Sparkles } from "lucide-react";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";
import ImageDetailModal from "./components/ImageDetailModal";
import ImageGallery from "./components/ImageGallery";
import type { GeneratedImage } from "./components/ImageGenerator";
import ImageGenerator from "./components/ImageGenerator";
import { useImageHistory } from "./hooks/useImageHistory";

export default function AIImagePage() {
	const [activeTab, setActiveTab] = useState<"generate" | "gallery">("generate");
	const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
	const [_galleryUpdateTrigger, setGalleryUpdateTrigger] = useState(0);

	const { images, addImage, deleteImage, toggleFavorite } = useImageHistory();

	const handleImageGenerated = (imageData: Omit<GeneratedImage, "id" | "createdAt">) => {
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
			<FeatureContainer>
				<FeatureContent>
					<div className="mb-4 md:mb-6">
						<BackButton />
					</div>

					{/* 页面头部 */}
					<div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 md:gap-3">
							<h1 className="font-bold text-responsive-2xl">AI 文生图</h1>
							<div className="flex items-center gap-1 text-gray-500 text-xs md:gap-2 md:text-sm">
								<Sparkles className="h-3 w-3 md:h-4 md:w-4" />
								<span className="hidden sm:inline">使用 AI 创造精美图片</span>
								<span className="sm:hidden">AI 创造图片</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setActiveTab("generate")}
								className={`flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all active:scale-95 md:px-4 ${
									activeTab === "generate" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								<Image className="h-4 w-4" />
								<span className="hidden sm:inline">生成图片</span>
								<span className="sm:hidden">生成</span>
							</button>
							<button
								onClick={() => setActiveTab("gallery")}
								className={`relative flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all active:scale-95 md:px-4 ${
									activeTab === "gallery" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								<History className="h-4 w-4" />
								<span className="hidden sm:inline">历史记录</span>
								<span className="sm:hidden">历史</span>
								{images.length > 0 && (
									<span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
										{images.length > 99 ? "99+" : images.length}
									</span>
								)}
							</button>
						</div>
					</div>

					{/* 主要内容区域 */}
					<div className="min-h-0 flex-1 overflow-hidden">
						{activeTab === "generate" ? (
							<ImageGenerator onImageGenerated={handleImageGenerated} onImageSelect={handleImageSelect} />
						) : (
							<ImageGallery images={images} onImageSelect={handleImageSelect} onImageUpdate={handleImageUpdate} />
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
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}
