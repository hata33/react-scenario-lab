// API 请求和响应类型定义

export interface ImageGenerationRequest {
	prompt: string;
	negative_prompt?: string;
	model: string;
	size: string;
	quality: "standard" | "hd";
	style: "vivid" | "natural";
	response_format: "url" | "b64_json";
	n?: number;
}

export interface ImageGenerationResponse {
	created: number;
	data: Array<{
		url?: string;
		b64_json?: string;
		revised_prompt?: string;
	}>;
}

export interface OpenAIErrorResponse {
	error: {
		message: string;
		type: string;
		param?: string;
		code?: string;
	};
}

export interface StabilityGenerationRequest {
	prompt: string;
	negative_prompt?: string;
	samples: number;
	model: string;
	width: number;
	height: number;
	steps?: number;
	cfg_scale?: number;
	seed?: number;
}

export interface StabilityGenerationResponse {
	artifacts: Array<{
		base64: string;
		seed: number;
		finalSeed: number;
		finishReason: string;
	}>;
}

export interface MidjourneyRequest {
	prompt: string;
	negative_prompt?: string;
	model: string;
	size: string;
	aspect_ratio?: string;
	seed?: number;
}

export interface MidjourneyResponse {
	id: string;
	prompt: string;
	status: "pending" | "processing" | "completed" | "failed";
	image_url?: string;
	created_at: string;
	error?: string;
}

export interface SiliconFlowRequest {
	prompt: string;
	model: string;
	batch_size?: number;
	num_inference_steps?: number;
	guidance_scale?: number;
}

export interface SiliconFlowResponse {
	images: Array<{
		url: string;
	}>;
	timings: {
		inference: number;
	};
	seed: number;
}

// 通用 API 响应类型
export interface ApiResponse<T = any> {
	data: T;
	success: boolean;
	message?: string;
	error?: {
		type: string;
		message: string;
		code?: string;
	};
}

// 模型配置类型
export interface ModelConfig {
	name: string;
	maxPromptLength: number;
	supportedSizes: string[];
	supportedQualities?: string[];
	supportedStyles?: string[];
	provider: "openai" | "stability" | "midjourney";
	apiEndpoint: string;
}

// 生成进度回调类型
export interface ProgressCallback {
	(progress: number, status: string): void;
}
