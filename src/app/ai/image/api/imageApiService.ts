import { API_CONFIG, APIError, APIErrorType, DEFAULT_CONFIG } from "./config";
import type {
	ImageGenerationRequest,
	ImageGenerationResponse,
	MidjourneyRequest,
	MidjourneyResponse,
	OpenAIErrorResponse,
	ProgressCallback,
	SiliconFlowRequest,
	SiliconFlowResponse,
	StabilityGenerationRequest,
	StabilityGenerationResponse,
} from "./types";

// 重试配置
const RETRY_CONFIG = {
	maxRetries: 3,
	retryDelay: 1000, // 1秒
	retryBackoff: 2, // 指数退避
};

// 创建 API 请求头
const createHeaders = (
	apiKey: string,
	additionalHeaders: Record<string, string> = {},
) => {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`,
		...additionalHeaders,
	};
};

// 处理 API 错误
const handleApiError = async (response: Response): Promise<never> => {
	let errorData: any;

	try {
		errorData = await response.json();
	} catch {
		errorData = { error: { message: "Unknown error" } };
	}

	const message = errorData.error?.message || errorData.message || "请求失败";
	let errorType: APIErrorType;
	let code: string | undefined;

	// 根据状态码和错误类型确定错误类型
	switch (response.status) {
		case 401:
			errorType = APIErrorType.AUTHENTICATION_ERROR;
			code = "UNAUTHORIZED";
			break;
		case 429:
			errorType = APIErrorType.RATE_LIMIT_ERROR;
			code = "RATE_LIMIT";
			break;
		case 400:
			errorType = APIErrorType.INVALID_REQUEST_ERROR;
			code = "INVALID_REQUEST";
			break;
		case 402:
			errorType = APIErrorType.QUOTA_EXCEEDED_ERROR;
			code = "QUOTA_EXCEEDED";
			break;
		case 403:
			errorType = APIErrorType.CONTENT_POLICY_ERROR;
			code = "CONTENT_POLICY";
			break;
		case 500:
		case 502:
		case 503:
		case 504:
			errorType = APIErrorType.SERVER_ERROR;
			code = "SERVER_ERROR";
			break;
		default:
			errorType = APIErrorType.NETWORK_ERROR;
			code = "NETWORK_ERROR";
	}

	throw new APIError(errorType, message, code, errorData);
};

// 带重试的请求函数
const fetchWithRetry = async (
	url: string,
	options: RequestInit,
	retries = 0,
): Promise<Response> => {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			// 如果是服务器错误且还有重试次数，则重试
			if (
				(response.status >= 500 || response.status === 429) &&
				retries < RETRY_CONFIG.maxRetries
			) {
				const delay =
					RETRY_CONFIG.retryDelay *
					Math.pow(RETRY_CONFIG.retryBackoff, retries);
				await new Promise((resolve) => setTimeout(resolve, delay));
				return fetchWithRetry(url, options, retries + 1);
			}
		}

		return response;
	} catch (error) {
		// 网络错误重试
		if (retries < RETRY_CONFIG.maxRetries) {
			const delay =
				RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.retryBackoff, retries);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return fetchWithRetry(url, options, retries + 1);
		}
		throw error;
	}
};

// OpenAI DALL-E API
export const generateImageWithOpenAI = async (
	request: ImageGenerationRequest,
	onProgress?: ProgressCallback,
): Promise<ImageGenerationResponse> => {
	const { baseURL, apiKey } = API_CONFIG.openai;

	if (!apiKey) {
		throw new APIError(
			APIErrorType.AUTHENTICATION_ERROR,
			"OpenAI API key is required",
			"MISSING_API_KEY",
		);
	}

	// 模拟进度
	if (onProgress) {
		onProgress(10, "正在验证请求...");
	}

	const response = await fetchWithRetry(`${baseURL}/images/generations`, {
		method: "POST",
		headers: createHeaders(apiKey),
		body: JSON.stringify({
			model: request.model,
			prompt: request.prompt,
			negative_prompt: request.negative_prompt,
			size: request.size,
			quality: request.quality,
			style: request.style,
			response_format: request.response_format,
			n: request.n || 1,
		}),
	});

	if (onProgress) {
		onProgress(50, "正在生成图片...");
	}

	if (!response.ok) {
		await handleApiError(response);
	}

	const data: ImageGenerationResponse = await response.json();

	if (onProgress) {
		onProgress(100, "图片生成完成");
	}

	return data;
};

// Stability AI API
export const generateImageWithStability = async (
	request: StabilityGenerationRequest,
	onProgress?: ProgressCallback,
): Promise<StabilityGenerationResponse> => {
	const { baseURL, apiKey } = API_CONFIG.stability;

	if (!apiKey) {
		throw new APIError(
			APIErrorType.AUTHENTICATION_ERROR,
			"Stability AI API key is required",
			"MISSING_API_KEY",
		);
	}

	// 提取尺寸
	const [width, height] = request.size.split("x").map(Number);

	if (onProgress) {
		onProgress(10, "正在验证请求...");
	}

	const response = await fetchWithRetry(
		`${baseURL}/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
		{
			method: "POST",
			headers: createHeaders(apiKey, {
				"Stability-API-Version": "1.0",
			}),
			body: JSON.stringify({
				prompt: request.prompt,
				negative_prompt: request.negative_prompt,
				samples: request.samples || 1,
				model: request.model,
				width,
				height,
				steps: request.steps || 30,
				cfg_scale: request.cfg_scale || 7,
				seed: request.seed,
			}),
		},
	);

	if (onProgress) {
		onProgress(50, "正在生成图片...");
	}

	if (!response.ok) {
		await handleApiError(response);
	}

	const data: StabilityGenerationResponse = await response.json();

	if (onProgress) {
		onProgress(100, "图片生成完成");
	}

	return data;
};

// Midjourney API (通过代理)
export const generateImageWithMidjourney = async (
	request: MidjourneyRequest,
	onProgress?: ProgressCallback,
): Promise<MidjourneyResponse> => {
	const { baseURL, apiKey } = API_CONFIG.midjourney;

	if (!apiKey) {
		throw new APIError(
			APIErrorType.AUTHENTICATION_ERROR,
			"Midjourney API key is required",
			"MISSING_API_KEY",
		);
	}

	if (onProgress) {
		onProgress(10, "正在提交请求...");
	}

	// 提交生成任务
	const response = await fetchWithRetry(`${baseURL}/api/imagine`, {
		method: "POST",
		headers: createHeaders(apiKey),
		body: JSON.stringify({
			prompt: request.prompt,
			negative_prompt: request.negative_prompt,
			model: request.model,
			size: request.size,
			aspect_ratio: request.aspect_ratio,
			seed: request.seed,
		}),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	let result: MidjourneyResponse = await response.json();

	// Midjourney 需要轮询状态
	if (result.status === "pending" || result.status === "processing") {
		if (onProgress) {
			onProgress(30, "任务已提交，正在处理...");
		}

		// 轮询任务状态
		const maxAttempts = 60; // 最多轮询60次（10分钟）
		for (let i = 0; i < maxAttempts; i++) {
			await new Promise((resolve) => setTimeout(resolve, 10000)); // 等待10秒

			const statusResponse = await fetchWithRetry(
				`${baseURL}/api/imagine/${result.id}`,
				{
					method: "GET",
					headers: createHeaders(apiKey),
				},
			);

			if (statusResponse.ok) {
				result = await statusResponse.json();

				if (result.status === "completed") {
					if (onProgress) {
						onProgress(100, "图片生成完成");
					}
					break;
				} else if (result.status === "failed") {
					throw new APIError(
						APIErrorType.SERVER_ERROR,
						result.error || "Midjourney 生成失败",
						"MIDJOURNEY_FAILED",
					);
				}

				if (onProgress) {
					const progress = 30 + (i + 1) * 1.16; // 30% - 100%
					onProgress(
						Math.round(progress),
						`正在处理... (${i + 1}/${maxAttempts})`,
					);
				}
			}
		}
	}

	return result;
};

// SiliconFlow API
export const generateImageWithSiliconFlow = async (
	request: SiliconFlowRequest,
	onProgress?: ProgressCallback,
): Promise<SiliconFlowResponse> => {
	const { baseURL, apiKey } = API_CONFIG.siliconflow;

	if (!apiKey) {
		throw new APIError(
			APIErrorType.AUTHENTICATION_ERROR,
			"SiliconFlow API key is required",
			"MISSING_API_KEY",
		);
	}

	if (onProgress) {
		onProgress(10, "正在验证请求...");
	}

	// 获取模型默认参数
	const modelConfig =
		API_CONFIG.siliconflow.models[
		request.model as keyof typeof API_CONFIG.siliconflow.models
		];
	const defaultParams = modelConfig?.defaultParams || {};

	const response = await fetchWithRetry(`${baseURL}/images/generations`, {
		method: "POST",
		headers: createHeaders(apiKey),
		body: JSON.stringify({
			model: request.model,
			prompt: request.prompt,
			batch_size: request.batch_size || defaultParams.batch_size || 1,
			num_inference_steps:
				request.num_inference_steps || defaultParams.num_inference_steps || 20,
			guidance_scale:
				request.guidance_scale || defaultParams.guidance_scale || 7.5,
		}),
	});

	if (onProgress) {
		onProgress(50, "正在生成图片...");
	}

	if (!response.ok) {
		await handleApiError(response);
	}

	const data: SiliconFlowResponse = await response.json();

	if (onProgress) {
		onProgress(100, "图片生成完成");
	}

	return data;
};

// 统一的图片生成接口
export const generateImage = async (
	request: ImageGenerationRequest,
	onProgress?: ProgressCallback,
): Promise<{
	url: string;
	prompt: string;
	revisedPrompt?: string;
}> => {
	const { model } = request;

	try {
		let result: {
			url: string;
			prompt: string;
			revisedPrompt?: string;
		};

		if (model.startsWith("dall-e")) {
			// OpenAI DALL-E
			const response = await generateImageWithOpenAI(request, onProgress);
			const image = response.data[0];
			result = {
				url: image.url!,
				prompt: image.revised_prompt || request.prompt,
				revisedPrompt: image.revised_prompt,
			};
		} else if (model.startsWith("stable-diffusion")) {
			// Stability AI
			const response = await generateImageWithStability(
				{
					prompt: request.prompt,
					negative_prompt: request.negative_prompt,
					model: request.model,
					size: request.size,
					samples: 1,
				},
				onProgress,
			);

			const artifact = response.artifacts[0];
			result = {
				url: `data:image/png;base64,${artifact.base64}`,
				prompt: request.prompt,
			};
		} else if (model.startsWith("midjourney")) {
			// Midjourney
			const response = await generateImageWithMidjourney(
				{
					prompt: request.prompt,
					negative_prompt: request.negative_prompt,
					model: request.model,
					size: request.size,
				},
				onProgress,
			);

			result = {
				url: response.image_url!,
				prompt: response.prompt,
			};
		} else if (model === "Kwai-Kolors/Kolors") {
			// SiliconFlow Kwai-Kolors
			const response = await generateImageWithSiliconFlow(
				{
					prompt: request.prompt,
					model: request.model,
					batch_size: (request as any).batch_size || 1,
					num_inference_steps: (request as any).num_inference_steps || 20,
					guidance_scale: (request as any).guidance_scale || 7.5,
				},
				onProgress,
			);

			result = {
				url: response.images[0].url,
				prompt: request.prompt,
			};
		} else {
			throw new APIError(
				APIErrorType.INVALID_REQUEST_ERROR,
				`Unsupported model: ${model}`,
				"UNSUPPORTED_MODEL",
			);
		}

		return result;
	} catch (error) {
		console.error("Image generation failed:", error);
		throw error;
	}
};

// 导出配置信息
export const getAvailableModels = () => {
	return {
		openai: API_CONFIG.openai.models,
		stability: API_CONFIG.stability.models,
		midjourney: API_CONFIG.midjourney.models,
		siliconflow: API_CONFIG.siliconflow.models,
	};
};

// 检查 API 配置
export const checkApiConfiguration = () => {
	const config = {
		openai: {
			configured: !!API_CONFIG.openai.apiKey,
			baseURL: API_CONFIG.openai.baseURL,
		},
		stability: {
			configured: !!API_CONFIG.stability.apiKey,
			baseURL: API_CONFIG.stability.baseURL,
		},
		midjourney: {
			configured: !!API_CONFIG.midjourney.apiKey,
			baseURL: API_CONFIG.midjourney.baseURL,
		},
		siliconflow: {
			configured: !!API_CONFIG.siliconflow.apiKey,
			baseURL: API_CONFIG.siliconflow.baseURL,
		},
	};

	return config;
};
