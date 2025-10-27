"use client";

import {
	AlertCircle,
	CheckCircle,
	Copy,
	Download,
	Heart,
	Image,
	Loader2,
	RefreshCw,
	Settings,
	Share2,
	Sparkles,
	Trash2,
	Wand2,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { checkApiConfiguration, getAvailableModels } from "../api/imageApiService";
import { useImageGeneration } from "../hooks/useImageGeneration";

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
	const [model, setModel] = useState("Kwai-Kolors/Kolors");
	const [size, setSize] = useState("1024x1024");
	const [quality, setQuality] = useState<"standard" | "hd">("standard");
	const [style, setStyle] = useState<"vivid" | "natural">("vivid");
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [generatedImage, setGeneratedImage] = useState<string | null>(null);
	const [showApiConfig, setShowApiConfig] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [showProgress, setShowProgress] = useState(false);
	const [displayProgress, setDisplayProgress] = useState(0);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// 使用真实的 API 调用
	const { generate, isGenerating, error, progress, status, stopGeneration, reset } = useImageGeneration({
		onSuccess: (result) => {
			setGeneratedImage(result.url);
			// 进度条跳到100%
			setDisplayProgress(100);
			// 600毫秒后隐藏进度条
			setTimeout(() => {
				setShowProgress(false);
				setDisplayProgress(0);
			}, 600);
			onImageGenerated({
				url: result.url,
				prompt: result.prompt,
				negativePrompt: negativePrompt.trim() || undefined,
				model,
				size,
				quality,
				style,
				isFavorite: false,
			});
		},
		onError: (error) => {
			console.error("Image generation error:", error);
		},
		onProgress: (progressValue, statusText) => {
			// 更新显示进度
			setDisplayProgress(progressValue);
			setShowProgress(true);
		},
	});

	// 检查 API 配置状态
	const [apiConfig, setApiConfig] = useState(() => checkApiConfiguration());
	const [availableModels, setAvailableModels] = useState<any>(() => getAvailableModels());

	useEffect(() => {
		setApiConfig(checkApiConfiguration());
		setAvailableModels(getAvailableModels());
	}, []);

	// 获取当前模型的可用选项
	const getCurrentModelConfig = () => {
		const provider = model.startsWith("dall-e")
			? "openai"
			: model.startsWith("stable-diffusion")
				? "stability"
				: model.startsWith("midjourney")
					? "midjourney"
					: "siliconflow";
		const models = availableModels[provider as keyof typeof availableModels];
		return models?.[model];
	};

	// 模型选项
	const models = [
		{
			value: "Kwai-Kolors/Kolors",
			label: "Kwai Kolors",
			description: "快手 AI 模型，性价比高",
		},
		{
			value: "dall-e-3",
			label: "DALL-E 3",
			description: "OpenAI 最新模型，质量更高",
		},
		{
			value: "dall-e-2",
			label: "DALL-E 2",
			description: "OpenAI 经典模型，速度快",
		},
		{
			value: "stable-diffusion-xl-1024-v1-0",
			label: "Stable Diffusion XL",
			description: "开源模型，可定制性强",
		},
		{
			value: "midjourney-v6",
			label: "Midjourney V6",
			description: "艺术效果最强",
		},
	];

	// 尺寸选项
	const sizes = [
		{ value: "256x256", label: "256×256", description: "小尺寸" },
		{ value: "512x512", label: "512×512", description: "中等尺寸" },
		{ value: "1024x1024", label: "1024×1024", description: "标准尺寸" },
		{ value: "1792x1024", label: "1792×1024", description: "横向" },
		{ value: "1024x1792", label: "1024×1792", description: "纵向" },
	];

	// 质量选项
	const qualities = [
		{ value: "standard", label: "标准", description: "速度快" },
		{ value: "hd", label: "高清", description: "细节更丰富" },
	];

	// 风格选项
	const styles = [
		{ value: "vivid", label: "生动", description: "色彩鲜艳" },
		{ value: "natural", label: "自然", description: "贴近现实" },
	];

	// 检查尺寸是否支持
	const isSizeSupported = (sizeToCheck: string, modelToCheck: string) => {
		const config = getCurrentModelConfig();

		// 对于 Kolors 模型，检查特定的支持尺寸
		if (modelToCheck === "Kwai-Kolors/Kolors") {
			const supportedSizes = ["1024x1024", "1024x768", "768x1024"];
			return supportedSizes.includes(sizeToCheck);
		}

		// 对于其他模型，使用配置的尺寸
		return config?.supportedSizes?.includes(sizeToCheck) || false;
	};

	// 检查质量是否支持
	const isQualitySupported = (qualityToCheck: string, modelToCheck: string) => {
		const config = getCurrentModelConfig();

		// 对于 Kolors 模型，如果没有质量配置，则默认支持标准质量
		if (modelToCheck === "Kwai-Kolors/Kolors") {
			return qualityToCheck === "standard";
		}

		// 对于其他模型，如果没有配置质量选项，则认为所有质量都支持
		if (!config?.supportedQualities || config.supportedQualities.length === 0) {
			return true;
		}

		return config.supportedQualities.includes(qualityToCheck);
	};

	// 检查风格是否支持
	const isStyleSupported = (styleToCheck: string, modelToCheck: string) => {
		const config = getCurrentModelConfig();

		// 对于 Kolors 模型，如果没有风格配置，则默认支持 vivid 风格
		if (modelToCheck === "Kwai-Kolors/Kolors") {
			return styleToCheck === "vivid";
		}

		// 对于其他模型，如果没有配置风格选项，则认为所有风格都支持
		if (!config?.supportedStyles || config.supportedStyles.length === 0) {
			return true;
		}

		return config.supportedStyles.includes(styleToCheck);
	};

	// 示例提示词
	const examplePrompts = [
		"一只可爱的橙色猫咪坐在窗台上，阳光透过窗户洒进来，温暖的午后光线，摄影风格",
		"未来城市的摩天大楼群，霓虹灯闪烁，赛博朋克风格，数字艺术，高清细节",
		"中国古典山水画，水墨风格，远山如黛，近水含烟，诗意盎然",
		"一座漂浮在云端的魔法城堡，彩虹桥连接天际，梦幻色彩，童话风格",
	];

	// 真实的图片生成函数
	const generateImage = async () => {
		if (!prompt.trim()) return;

		try {
			// 检查模型配置
			const modelConfig = getCurrentModelConfig();
			if (!modelConfig) {
				throw new Error(`模型 ${model} 配置无效`);
			}

			// 验证参数
			if (!isSizeSupported(size, model)) {
				throw new Error(`模型 ${model} 不支持尺寸 ${size}`);
			}

			if (!isQualitySupported(quality, model)) {
				throw new Error(`模型 ${model} 不支持质量 ${quality}`);
			}

			if (!isStyleSupported(style, model)) {
				throw new Error(`模型 ${model} 不支持风格 ${style}`);
			}

			await generate({
				prompt: prompt.trim(),
				negative_prompt: negativePrompt.trim() || undefined,
				model,
				size,
				quality,
				style,
				response_format: "url",
				n: 1,
			});
		} catch (error) {
			console.error("Generate image failed:", error);
			// 错误已经通过 useImageGeneration 处理
		}
	};

	// 重置状态
	const handleReset = () => {
		reset();
		setGeneratedImage(null);
		setShowProgress(false);
		setDisplayProgress(0);
	};

	// 停止生成
	const handleStopGeneration = () => {
		stopGeneration();
		setShowProgress(false);
		setDisplayProgress(0);
	};

	// 下载图片
	const downloadImage = () => {
		if (!generatedImage) return;

		const link = document.createElement("a");
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

	// 处理滚动事件
	const handleScroll = () => {
		if (containerRef.current) {
			const scrollTop = containerRef.current.scrollTop;
			setShowScrollTop(scrollTop > 400);
		}
	};

	// 滚动到顶部
	const scrollToTop = () => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	// 监听滚动事件
	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
			return () => container.removeEventListener("scroll", handleScroll);
		}
	}, []);

	return (
		<>
			<div
				ref={containerRef}
				className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[calc(100vh-8rem)] space-y-6 overflow-y-auto scroll-smooth pr-2"
			>
				{/* 确保在移动设备上的滚动体验 */}
				<style jsx>{`
					@media (max-width: 768px) {
						div {
							max-height: calc(100vh - 6rem);
							-webkit-overflow-scrolling: touch;
						}
					}
				`}</style>
				{/* API 配置状态提示 */}
				{!apiConfig.openai.configured &&
					!apiConfig.stability.configured &&
					!apiConfig.midjourney.configured &&
					!apiConfig.siliconflow.configured && (
						<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
							<div className="flex items-center gap-3">
								<AlertCircle className="h-5 w-5 text-yellow-600" />
								<div>
									<h4 className="font-medium text-yellow-800">需要配置 API</h4>
									<p className="mt-1 text-sm text-yellow-700">请在环境变量中配置至少一个 AI 服务的 API 密钥</p>
								</div>
							</div>
						</div>
					)}

				{/* 错误提示 */}
				{error && (
					<div className="rounded-xl border border-red-200 bg-red-50 p-4">
						<div className="flex items-center gap-3">
							<AlertCircle className="h-5 w-5 text-red-600" />
							<div>
								<h4 className="font-medium text-red-800">生成失败</h4>
								<p className="mt-1 text-red-700 text-sm">{error}</p>
							</div>
						</div>
					</div>
				)}

				{/* 主输入区域 */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center gap-2">
						<Sparkles className="h-5 w-5 text-purple-500" />
						<h3 className="font-semibold text-gray-900 text-lg">描述你想要生成的图片</h3>
					</div>

					{/* 提示词输入 */}
					<div className="space-y-4">
						<textarea
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="详细描述你想要生成的图片，包括主体、风格、色彩、构图等..."
							className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[12rem] min-h-[8rem] w-full resize-y rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>

						{/* 示例提示词 */}
						<div className="flex flex-wrap gap-2">
							<span className="text-gray-500 text-sm">试试这些：</span>
							{examplePrompts.map((example, index) => (
								<button
									key={index}
									onClick={() => useExamplePrompt(example)}
									className="rounded-full bg-purple-50 px-2 py-1 text-purple-600 text-sm transition-colors hover:bg-purple-100"
								>
									{example.substring(0, 30)}...
								</button>
							))}
						</div>
					</div>

					{/* 高级选项切换 */}
					<button
						onClick={() => setShowAdvanced(!showAdvanced)}
						className="mt-4 flex items-center gap-2 text-gray-600 text-sm transition-colors hover:text-gray-900"
					>
						<Settings className="h-4 w-4" />
						{showAdvanced ? "隐藏高级选项" : "显示高级选项"}
					</button>

					{/* 高级选项 */}
					{showAdvanced && (
						<div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
							{/* 负面提示词 */}
							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">负面提示词（不希望出现的内容）</label>
								<textarea
									value={negativePrompt}
									onChange={(e) => setNegativePrompt(e.target.value)}
									placeholder="描述不希望出现在图片中的内容，如：模糊、低质量、文字等..."
									className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[8rem] min-h-[5rem] w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							{/* 模型选择 */}
							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">模型选择</label>
								<select
									value={model}
									onChange={(e) => setModel(e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
								>
									{models.map((m) => (
										<option key={m.value} value={m.value}>
											{m.label} - {m.description}
										</option>
									))}
								</select>
							</div>

							{/* 参数设置 */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div>
									<label className="mb-2 block font-medium text-gray-700 text-sm">尺寸</label>
									<select
										value={size}
										onChange={(e) => setSize(e.target.value)}
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
									>
										{sizes.map((s) => {
											const supported = isSizeSupported(s.value, model);
											return (
												<option
													key={s.value}
													value={s.value}
													disabled={!supported}
													className={!supported ? "text-gray-400" : ""}
												>
													{s.label} {!supported && "(不支持)"}
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className="mb-2 block font-medium text-gray-700 text-sm">质量</label>
									<select
										value={quality}
										onChange={(e) => setQuality(e.target.value as "standard" | "hd")}
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
									>
										{qualities.map((q) => {
											const supported = isQualitySupported(q.value, model);
											return (
												<option
													key={q.value}
													value={q.value}
													disabled={!supported}
													className={!supported ? "text-gray-400" : ""}
												>
													{q.label} - {q.description} {!supported && "(不支持)"}
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className="mb-2 block font-medium text-gray-700 text-sm">风格</label>
									<select
										value={style}
										onChange={(e) => setStyle(e.target.value as "vivid" | "natural")}
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
									>
										{styles.map((s) => {
											const supported = isStyleSupported(s.value, model);
											return (
												<option
													key={s.value}
													value={s.value}
													disabled={!supported}
													className={!supported ? "text-gray-400" : ""}
												>
													{s.label} - {s.description} {!supported && "(不支持)"}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						</div>
					)}

					{/* 生成按钮区域 */}
					<div className="flex gap-3">
						{isGenerating ? (
							<>
								<button
									onClick={handleStopGeneration}
									className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-3 font-medium text-white transition-all duration-200 hover:bg-red-600"
								>
									<X className="h-5 w-5" />
									停止生成
								</button>
								<button
									onClick={handleReset}
									className="flex items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-gray-600"
								>
									<RefreshCw className="h-5 w-5" />
									重置
								</button>
							</>
						) : (
							<button
								onClick={generateImage}
								disabled={!prompt.trim() || isGenerating}
								className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400"
							>
								<Wand2 className="h-5 w-5" />
								生成图片
							</button>
						)}
					</div>

					{/* 进度条和状态 */}
					{showProgress && (
						<div className="mt-3 space-y-2">
							<div className="h-2 w-full rounded-full bg-gray-200">
								<div
									className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
									style={{ width: `${displayProgress}%` }}
								></div>
							</div>
							{status && <p className="text-center text-gray-600 text-sm">{status}</p>}
						</div>
					)}
				</div>

				{/* 生成结果 */}
				{generatedImage && (
					<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Image className="h-5 w-5 text-green-500" />
								<h3 className="font-semibold text-gray-900 text-lg">生成结果</h3>
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={downloadImage}
									className="rounded-lg p-2 transition-colors hover:bg-gray-100"
									title="下载图片"
								>
									<Download className="h-4 w-4 text-gray-600" />
								</button>
								<button
									onClick={copyImageUrl}
									className="rounded-lg p-2 transition-colors hover:bg-gray-100"
									title="复制链接"
								>
									<Copy className="h-4 w-4 text-gray-600" />
								</button>
								<button
									onClick={() => setGeneratedImage(null)}
									className="rounded-lg p-2 transition-colors hover:bg-gray-100"
									title="清除"
								>
									<X className="h-4 w-4 text-gray-600" />
								</button>
							</div>
						</div>

						{/* 图片显示 */}
						<div className="group relative">
							<img
								src={generatedImage}
								alt="Generated image"
								className="w-full rounded-lg shadow-md"
								style={{ maxHeight: "512px", objectFit: "contain" }}
							/>
						</div>

						{/* 操作按钮区域 */}
						<div className="mt-4 flex justify-center">
							<button
								onClick={() =>
									onImageSelect({
										id: Date.now().toString(),
										url: generatedImage,
										prompt: prompt.trim(),
										negativePrompt: negativePrompt.trim() || undefined,
										model,
										size,
										quality,
										style,
										createdAt: new Date(),
										isFavorite: false,
									})
								}
								className="flex items-center gap-2 rounded-lg bg-purple-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-purple-600"
							>
								<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
								查看详情
							</button>
						</div>

						{/* 生成信息 */}
						<div className="mt-4 rounded-lg bg-gray-50 p-3">
							<div className="space-y-1 text-gray-600 text-sm">
								<p>
									<strong>模型:</strong> {models.find((m) => m.value === model)?.label}
								</p>
								<p>
									<strong>尺寸:</strong> {size}
								</p>
								<p>
									<strong>质量:</strong> {qualities.find((q) => q.value === quality)?.label}
								</p>
								<p>
									<strong>风格:</strong> {styles.find((s) => s.value === style)?.label}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* 滚动到顶部按钮 */}
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className="fixed right-6 bottom-6 z-50 flex items-center justify-center rounded-full bg-purple-500 p-3 text-white shadow-lg transition-all duration-200 hover:bg-purple-600"
					title="滚动到顶部"
				>
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
					</svg>
				</button>
			)}
		</>
	);
}
