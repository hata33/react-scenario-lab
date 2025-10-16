"use client";

import { useState, useRef } from "react";
import {
	Download,
	Image,
	Settings,
	Sparkles,
	Wand2,
	Loader2,
	X,
	Copy,
	Heart,
	Share2,
	Trash2
} from "lucide-react";

export interface GeneratedImage {
	id: string;
	url: string;
	prompt: string;
	negativePrompt?: string;
	model: string;
	size: string;
	quality: string;
	style: string;
	createdAt: Date;
	isFavorite: boolean;
}

interface ImageGeneratorProps {
	onImageGenerated: (image: Omit<GeneratedImage, "id" | "createdAt">) => void;
	onImageSelect: (image: GeneratedImage) => void;
}

export default function ImageGenerator({ onImageGenerated, onImageSelect }: ImageGeneratorProps) {
	const [prompt, setPrompt] = useState("");
	const [negativePrompt, setNegativePrompt] = useState("");
	const [model, setModel] = useState("dall-e-3");
	const [size, setSize] = useState("1024x1024");
	const [quality, setQuality] = useState("standard");
	const [style, setStyle] = useState("vivid");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [generatedImage, setGeneratedImage] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// 模型选项
	const models = [
		{ value: "dall-e-3", label: "DALL-E 3", description: "最新版本，质量最佳" },
		{ value: "dall-e-2", label: "DALL-E 2", description: "经典版本，速度更快" },
		{ value: "stable-diffusion", label: "Stable Diffusion", description: "开源模型，风格多样" },
		{ value: "midjourney", label: "Midjourney", description: "艺术风格，创意独特" }
	];

	// 尺寸选项
	const sizes = [
		{ value: "1024x1024", label: "正方形 (1024×1024)" },
		{ value: "1792x1024", label: "横向 (1792×1024)" },
		{ value: "1024x1792", label: "纵向 (1024×1792)" },
		{ value: "512x512", label: "小正方形 (512×512)" }
	];

	// 质量选项
	const qualities = [
		{ value: "standard", label: "标准", description: "快速生成" },
		{ value: "hd", label: "高清", description: "细节更丰富" }
	];

	// 风格选项
	const styles = [
		{ value: "vivid", label: "生动", description: "色彩鲜艳，富有创意" },
		{ value: "natural", label: "自然", description: "更加真实自然" }
	];

	// 示例提示词
	const examplePrompts = [
		"一只可爱的橙色猫咪坐在窗台上，阳光透过窗户洒进来，温暖的午后光线，摄影风格",
		"未来城市的摩天大楼群，霓虹灯闪烁，赛博朋克风格，数字艺术，高清细节",
		"中国古典山水画，水墨风格，远山如黛，近水含烟，诗意盎然",
		"一座漂浮在云端的魔法城堡，彩虹桥连接天际，梦幻色彩，童话风格"
	];

	// 模拟生成图片
	const generateImage = async () => {
		if (!prompt.trim()) return;

		setIsGenerating(true);
		setProgress(0);

		// 模拟进度更新
		const progressInterval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 90) {
					clearInterval(progressInterval);
					return 90;
				}
				return prev + Math.random() * 20;
			});
		}, 500);

		// 模拟 API 调用延迟
		await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));

		// 生成随机图片
		const randomSeed = Math.random().toString(36).substring(7);
		const width = parseInt(size.split('x')[0]);
		const height = parseInt(size.split('x')[1]);
		const imageUrl = `https://picsum.photos/${width}/${height}?random=${randomSeed}`;

		setGeneratedImage(imageUrl);
		setProgress(100);
		clearInterval(progressInterval);

		// 保存到历史记录
		onImageGenerated({
			url: imageUrl,
			prompt: prompt.trim(),
			negativePrompt: negativePrompt.trim() || undefined,
			model,
			size,
			quality,
			style
		});

		setIsGenerating(false);
	};

	// 下载图片
	const downloadImage = () => {
		if (!generatedImage) return;

		const link = document.createElement('a');
		link.href = generatedImage;
		link.download = `ai-image-${Date.now()}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// 复制图片链接
	const copyImageUrl = () => {
		if (!generatedImage) return;
		navigator.clipboard.writeText(generatedImage);
	};

	// 使用示例提示词
	const useExamplePrompt = (example: string) => {
		setPrompt(example);
	};

	return (
		<div className="space-y-6">
			{/* 主输入区域 */}
			<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
				<div className="flex items-center gap-2 mb-4">
					<Sparkles className="w-5 h-5 text-purple-500" />
					<h3 className="text-lg font-semibold text-gray-900">描述你想要生成的图片</h3>
				</div>

				{/* 提示词输入 */}
				<div className="space-y-4">
					<textarea
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="详细描述你想要生成的图片，包括主体、风格、色彩、构图等..."
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-32"
					/>

					{/* 示例提示词 */}
					<div className="flex flex-wrap gap-2">
						<span className="text-sm text-gray-500">试试这些：</span>
						{examplePrompts.map((example, index) => (
							<button
								key={index}
								onClick={() => useExamplePrompt(example)}
								className="text-sm px-2 py-1 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors"
							>
								{example.substring(0, 30)}...
							</button>
						))}
					</div>
				</div>

				{/* 高级选项切换 */}
				<button
					onClick={() => setShowAdvanced(!showAdvanced)}
					className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mt-4"
				>
					<Settings className="w-4 h-4" />
					{showAdvanced ? "隐藏高级选项" : "显示高级选项"}
				</button>

				{/* 高级选项 */}
				{showAdvanced && (
					<div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
						{/* 负面提示词 */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								负面提示词（不希望出现的内容）
							</label>
							<textarea
								value={negativePrompt}
								onChange={(e) => setNegativePrompt(e.target.value)}
								placeholder="描述不希望出现在图片中的内容，如：模糊、低质量、文字等..."
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-20 text-sm"
							/>
						</div>

						{/* 模型选择 */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								模型选择
							</label>
							<select
								value={model}
								onChange={(e) => setModel(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							>
								{models.map(m => (
									<option key={m.value} value={m.value}>
										{m.label} - {m.description}
									</option>
								))}
							</select>
						</div>

						{/* 参数设置 */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									尺寸
								</label>
								<select
									value={size}
									onChange={(e) => setSize(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								>
									{sizes.map(s => (
										<option key={s.value} value={s.value}>
											{s.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									质量
								</label>
								<select
									value={quality}
									onChange={(e) => setQuality(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								>
									{qualities.map(q => (
										<option key={q.value} value={q.value}>
											{q.label} - {q.description}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									风格
								</label>
								<select
									value={style}
									onChange={(e) => setStyle(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								>
									{styles.map(s => (
										<option key={s.value} value={s.value}>
											{s.label} - {s.description}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				)}

				{/* 生成按钮 */}
				<button
					onClick={generateImage}
					disabled={!prompt.trim() || isGenerating}
					className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
				>
					{isGenerating ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							生成中... {Math.round(progress)}%
						</>
					) : (
						<>
							<Wand2 className="w-5 h-5" />
							生成图片
						</>
					)}
				</button>

				{/* 进度条 */}
				{isGenerating && (
					<div className="mt-3">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
								style={{ width: `${progress}%` }}
							></div>
						</div>
					</div>
				)}
			</div>

			{/* 生成结果 */}
			{generatedImage && (
				<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Image className="w-5 h-5 text-green-500" />
							<h3 className="text-lg font-semibold text-gray-900">生成结果</h3>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={downloadImage}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title="下载图片"
							>
								<Download className="w-4 h-4 text-gray-600" />
							</button>
							<button
								onClick={copyImageUrl}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title="复制链接"
							>
								<Copy className="w-4 h-4 text-gray-600" />
							</button>
							<button
								onClick={() => setGeneratedImage(null)}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title="清除"
							>
								<X className="w-4 h-4 text-gray-600" />
							</button>
						</div>
					</div>

					{/* 图片显示 */}
					<div className="relative group">
						<img
							src={generatedImage}
							alt="Generated image"
							className="w-full rounded-lg shadow-md"
							style={{ maxHeight: '512px', objectFit: 'contain' }}
						/>
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
							<button
								onClick={() => onImageSelect({
									id: Date.now().toString(),
									url: generatedImage,
									prompt: prompt.trim(),
									negativePrompt: negativePrompt.trim() || undefined,
									model,
									size,
									quality,
									style,
									createdAt: new Date(),
									isFavorite: false
								})}
								className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 transform scale-95 group-hover:scale-100"
							>
								查看详情
							</button>
						</div>
					</div>

					{/* 生成信息 */}
					<div className="mt-4 p-3 bg-gray-50 rounded-lg">
						<div className="text-sm text-gray-600 space-y-1">
							<p><strong>模型:</strong> {models.find(m => m.value === model)?.label}</p>
							<p><strong>尺寸:</strong> {size}</p>
							<p><strong>质量:</strong> {qualities.find(q => q.value === quality)?.label}</p>
							<p><strong>风格:</strong> {styles.find(s => s.value === style)?.label}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}