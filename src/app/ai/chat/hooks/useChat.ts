"use client";

import { useState } from "react";

interface Message {
	id: number;
	type: "user" | "assistant";
	content: string;
	timestamp?: Date;
}

interface ChatState {
	messages: Message[];
	isLoading: boolean;
	error: string | null;
}

export function useChat() {
	const [state, setState] = useState<ChatState>({
		messages: [
			{
				id: 1,
				type: "assistant",
				content: "您好！我是 AI 助手，请问有什么可以帮助您的吗？",
				timestamp: new Date(),
			},
		],
		isLoading: false,
		error: null,
	});

	const [model, setModel] = useState("gpt-3.5-turbo");
	const [apiKey, setApiKey] = useState("");

	const sendMessage = async (content: string) => {
		if (!content.trim()) return;

		const userMessage: Message = {
			id: state.messages.length + 1,
			type: "user",
			content: content.trim(),
			timestamp: new Date(),
		};

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, userMessage],
			isLoading: true,
			error: null,
		}));

		try {
			// 模拟 API 调用
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const assistantMessage: Message = {
				id: state.messages.length + 2,
				type: "assistant",
				content: `这是来自 ${model} 的模拟响应。实际的 AI 集成功能正在开发中...`,
				timestamp: new Date(),
			};

			setState((prev) => ({
				...prev,
				messages: [...prev.messages, assistantMessage],
				isLoading: false,
			}));
		} catch (error) {
			setState((prev) => ({
				...prev,
				isLoading: false,
				error: "发送消息失败，请稍后重试",
			}));
		}
	};

	const clearMessages = () => {
		setState((prev) => ({
			...prev,
			messages: [],
			error: null,
		}));
	};

	return {
		...state,
		model,
		apiKey,
		setModel,
		setApiKey,
		sendMessage,
		clearMessages,
	};
}
