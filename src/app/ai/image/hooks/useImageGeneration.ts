"use client";

import { useState, useCallback, useRef } from "react";
import { generateImage, checkApiConfiguration } from "../api/imageApiService";
import { APIError } from "../api/config";
import type { ImageGenerationRequest } from "../api/types";

export interface UseImageGenerationOptions {
	onSuccess?: (result: { url: string; prompt: string; revisedPrompt?: string }) => void;
	onError?: (error: Error) => void;
	onProgress?: (progress: number, status: string) => void;
	enableRetry?: boolean;
}

export function useImageGeneration(options: UseImageGenerationOptions = {}) {
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState<string>("");
	const abortControllerRef = useRef<AbortController | null>(null);

	const generate = useCallback(async (request: ImageGenerationRequest) => {
		// 检查 API 配置
		const config = checkApiConfiguration();
		const provider = request.model.startsWith('dall-e') ? 'openai' :
						   request.model.startsWith('stable-diffusion') ? 'stability' :
						   request.model.startsWith('midjourney') ? 'midjourney' : 'siliconflow';

		if (!config[provider as keyof typeof config].configured) {
			const error = new APIError(
				'AUTHENTICATION_ERROR' as any,
				`${provider.charAt(0).toUpperCase() + provider.slice(1)} API key is not configured. Please check your environment variables.`
			);
			setError(error.message);
			options.onError?.(error);
			return;
		}

		// 重置状态
		setIsGenerating(true);
		setError(null);
		setProgress(0);
		setStatus("准备生成...");

		// 创建新的 AbortController
		abortControllerRef.current = new AbortController();

		try {
			const result = await generateImage(request, (progressValue, statusText) => {
				setProgress(progressValue);
				setStatus(statusText);
				options.onProgress?.(progressValue, statusText);
			});

			setProgress(100);
			setStatus("生成完成");
			options.onSuccess?.(result);

			return result;
		} catch (err) {
			console.error('Image generation error:', err);

			let errorMessage = "生成失败";

			if (err instanceof APIError) {
				switch (err.type) {
					case 'AUTHENTICATION_ERROR':
						errorMessage = "API密钥无效或未配置";
						break;
					case 'RATE_LIMIT_ERROR':
						errorMessage = "请求频率过高，请稍后再试";
						break;
					case 'QUOTA_EXCEEDED_ERROR':
						errorMessage = "API 配额已用完";
						break;
					case 'CONTENT_POLICY_ERROR':
						errorMessage = "提示词内容违反内容政策";
						break;
					case 'INVALID_REQUEST_ERROR':
						errorMessage = "请求参数无效";
						break;
					case 'SERVER_ERROR':
						errorMessage = "服务器错误，请稍后重试";
						break;
					case 'NETWORK_ERROR':
						errorMessage = "网络连接失败";
						break;
					default:
						errorMessage = err.message || "未知错误";
				}
			} else if (err instanceof Error) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			options.onError?.(new Error(errorMessage));
		} finally {
			setIsGenerating(false);
			abortControllerRef.current = null;
		}
	}, [options]);

	// 停止生成
	const stopGeneration = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
			setIsGenerating(false);
			setStatus("生成已取消");
			setError("生成已取消");
		}
	}, []);

	// 重置状态
	const reset = useCallback(() => {
		setIsGenerating(false);
		setError(null);
		setProgress(0);
		setStatus("");
		abortControllerRef.current = null;
	}, []);

	return {
		generate,
		isGenerating,
		error,
		progress,
		status,
		stopGeneration,
		reset
	};
}