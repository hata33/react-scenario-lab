"use client";

import { useState, useEffect } from "react";

export interface ChatMessage {
	id: string;
	type: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export interface ChatHistory {
	id: string;
	title: string;
	messages: ChatMessage[];
	createdAt: Date;
	updatedAt: Date;
}

const STORAGE_KEY = "ai-chat-history";

export function useChatHistory() {
	const [histories, setHistories] = useState<ChatHistory[]>([]);
	const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);

	// 从 localStorage 加载历史记录
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsedHistories = JSON.parse(stored).map((history: any) => ({
					...history,
					createdAt: new Date(history.createdAt),
					updatedAt: new Date(history.updatedAt),
					messages: history.messages.map((msg: any) => ({
						...msg,
						timestamp: new Date(msg.timestamp),
					})),
				}));
				setHistories(parsedHistories);
			}
		} catch (error) {
			console.error("Failed to load chat history:", error);
		}
	}, []);

	// 保存到 localStorage
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
		} catch (error) {
			console.error("Failed to save chat history:", error);
		}
	}, [histories]);

	// 创建新的对话历史
	const createHistory = (title?: string) => {
		const newHistory: ChatHistory = {
			id: Date.now().toString(),
			title: title || `对话 ${new Date().toLocaleString("zh-CN")}`,
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setHistories(prev => [newHistory, ...prev]);
		setCurrentHistoryId(newHistory.id);
		return newHistory;
	};

	// 添加消息到当前对话历史
	const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
		if (!currentHistoryId) {
			createHistory();
			return;
		}

		const newMessage: ChatMessage = {
			...message,
			id: Date.now().toString(),
			timestamp: new Date(),
		};

		setHistories(prev => prev.map(history => {
			if (history.id === currentHistoryId) {
				const updatedHistory = {
					...history,
					messages: [...history.messages, newMessage],
					updatedAt: new Date(),
				};

				// 如果是第一条用户消息，更新标题
				if (history.messages.length === 0 && message.type === "user") {
					updatedHistory.title = message.content.slice(0, 20) + (message.content.length > 20 ? "..." : "");
				}

				return updatedHistory;
			}
			return history;
		}));
	};

	// 删除对话历史
	const deleteHistory = (id: string) => {
		setHistories(prev => prev.filter(history => history.id !== id));
		if (currentHistoryId === id) {
			setCurrentHistoryId(null);
		}
	};

	// 切换到指定的对话历史
	const switchHistory = (id: string) => {
		setCurrentHistoryId(id);
	};

	// 清空所有历史记录
	const clearAllHistories = () => {
		setHistories([]);
		setCurrentHistoryId(null);
		localStorage.removeItem(STORAGE_KEY);
	};

	// 获取当前对话历史
	const getCurrentHistory = () => {
		return histories.find(history => history.id === currentHistoryId);
	};

	// 导出对话历史
	const exportHistory = (id?: string) => {
		const historyToExport = id
			? histories.find(h => h.id === id)
			: getCurrentHistory();

		if (!historyToExport) return null;

		const exportData = {
			title: historyToExport.title,
			createdAt: historyToExport.createdAt.toISOString(),
			messages: historyToExport.messages.map(msg => ({
				type: msg.type,
				content: msg.content,
				timestamp: msg.timestamp.toISOString(),
			})),
		};

		const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `chat-${historyToExport.title.replace(/[^\w\s-]/g, "")}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		return exportData;
	};

	return {
		histories,
		currentHistoryId,
		currentHistory: getCurrentHistory(),
		createHistory,
		addMessage,
		deleteHistory,
		switchHistory,
		clearAllHistories,
		exportHistory,
	};
}