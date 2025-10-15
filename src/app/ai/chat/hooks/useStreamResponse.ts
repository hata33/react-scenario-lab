"use client";

import { useState, useCallback } from "react";

export function useStreamResponse() {
	const [streamingMessage, setStreamingMessage] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);

	const startStream = useCallback(async (content: string, onUpdate?: (text: string) => void) => {
		setIsStreaming(true);
		setStreamingMessage("");

		// 将内容按字符分割
		const chars = content.split("");
		let currentText = "";

		// 模拟流式输出
		for (let i = 0; i < chars.length; i++) {
			currentText += chars[i];
			setStreamingMessage(currentText);
			onUpdate?.(currentText);

			// 添加随机延迟，模拟真实的 AI 响应
			const delay = Math.random() * 50 + 10; // 10-60ms 随机延迟
			await new Promise(resolve => setTimeout(resolve, delay));

			// 在某些地方添加额外延迟，模拟思考停顿
			if (chars[i] === "。" || chars[i] === "！" || chars[i] === "？" || chars[i] === "\n") {
				await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
			}

			// 代码块内部稍微快一些
			if (chars[i] === "`" && i > 0 && chars[i - 1] === "`") {
				await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 5));
			}
		}

		setIsStreaming(false);
		const finalText = currentText;
		setStreamingMessage("");
		return finalText;
	}, []);

	const stopStream = useCallback(() => {
		setIsStreaming(false);
		setStreamingMessage("");
	}, []);

	return {
		streamingMessage,
		isStreaming,
		startStream,
		stopStream,
	};
}