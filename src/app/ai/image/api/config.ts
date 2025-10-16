// AI 图片生成 API 配置
export const API_CONFIG = {
	// OpenAI DALL-E 配置
	openai: {
		baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL || 'https://api.openai.com/v1',
		apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
		models: {
			'dall-e-3': {
				name: 'DALL-E 3',
				maxPromptLength: 4000,
				supportedSizes: ['1024x1024', '1792x1024', '1024x1792'],
				supportedQualities: ['standard', 'hd'],
				supportedStyles: ['vivid', 'natural']
			},
			'dall-e-2': {
				name: 'DALL-E 2',
				maxPromptLength: 1000,
				supportedSizes: ['256x256', '512x512', '1024x1024'],
				supportedQualities: ['standard'],
				supportedStyles: []
			}
		}
	},

	// Stability AI 配置
	stability: {
		baseURL: process.env.NEXT_PUBLIC_STABILITY_BASE_URL || 'https://api.stability.ai/v1',
		apiKey: process.env.NEXT_PUBLIC_STABILITY_API_KEY || '',
		models: {
			'stable-diffusion-xl-1024-v1-0': {
				name: 'Stable Diffusion XL',
				maxPromptLength: 1000,
				supportedSizes: ['1024x1024', '1152x896', '896x1152', '1216x832', '832x1216']
			}
		}
	},

	// Midjourney 配置（通过代理）
	midjourney: {
		baseURL: process.env.NEXT_PUBLIC_MIDJOURNEY_BASE_URL || 'http://localhost:3001',
		apiKey: process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY || '',
		models: {
			'midjourney-v6': {
				name: 'Midjourney V6',
				maxPromptLength: 2000,
				supportedSizes: ['1024x1024', '1920x1080', '1080x1920']
			}
		}
	},

	// SiliconFlow 配置
	siliconflow: {
		baseURL: process.env.NEXT_PUBLIC_SILICONFLOW_BASE_URL || 'https://api.siliconflow.cn/v1',
		apiKey: process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY || '',
		models: {
			'Kwai-Kolors/Kolors': {
				name: 'Kwai Kolors',
				maxPromptLength: 2000,
				supportedSizes: ['1024x1024', '1024x768', '768x1024'],
				defaultParams: {
					batch_size: 1,
					num_inference_steps: 20,
					guidance_scale: 7.5
				}
			}
		}
	}
};

// 默认配置
export const DEFAULT_CONFIG = {
	model: 'Kwai-Kolors/Kolors',
	size: '1024x1024',
	quality: 'standard' as const,
	style: 'vivid' as const,
	responseFormat: 'url' as const,
	n: 1,
	batch_size: 1,
	num_inference_steps: 20,
	guidance_scale: 7.5
};

// API 错误类型
export enum APIErrorType {
	NETWORK_ERROR = 'NETWORK_ERROR',
	AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
	RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
	CONTENT_POLICY_ERROR = 'CONTENT_POLICY_ERROR',
	INVALID_REQUEST_ERROR = 'INVALID_REQUEST_ERROR',
	QUOTA_EXCEEDED_ERROR = 'QUOTA_EXCEEDED_ERROR',
	SERVER_ERROR = 'SERVER_ERROR'
}

// API 错误类
export class APIError extends Error {
	public type: APIErrorType;
	public code?: string;
	public details?: any;

	constructor(type: APIErrorType, message: string, code?: string, details?: any) {
		super(message);
		this.name = 'APIError';
		this.type = type;
		this.code = code;
		this.details = details;
	}
}