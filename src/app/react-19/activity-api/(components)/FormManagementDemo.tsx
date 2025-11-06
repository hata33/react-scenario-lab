"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useActivity } from "./hooks";

interface ArticleDraft {
	title: string;
	content: string;
	author: string;
	tags: string[];
	category: string;
	lastSaved: string;
	wordCount: number;
}

export default function FormManagementDemo() {
	const initialDraft: ArticleDraft = {
		title: "",
		content: "",
		author: "",
		tags: [],
		category: "",
		lastSaved: "",
		wordCount: 0,
	};

	const {
		state: draft,
		setState: setDraft,
		clearState: clearDraft,
		isSyncing,
		lastSync,
	} = useActivity("article-draft-demo", initialDraft);
	const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
	const [tagInput, setTagInput] = useState("");
	const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
	const [saveInterval, setSaveInterval] = useState(3000);

	const updateDraft = useCallback(
		(updates: Partial<ArticleDraft>) => {
			const newDraft = {
				...draft,
				...updates,
				lastSaved: new Date().toLocaleString(),
				wordCount: updates.content
					? updates.content.split(/\s+/).filter((word) => word.length > 0).length
					: draft.wordCount,
			};
			setDraft(newDraft);
			setSaveStatus("saving");
			setTimeout(() => setSaveStatus("saved"), 500);
			setTimeout(() => setSaveStatus("idle"), 2000);
		},
		[draft, setDraft],
	);

	const addTag = useCallback(() => {
		if (tagInput.trim() && !draft.tags.includes(tagInput.trim())) {
			updateDraft({
				tags: [...draft.tags, tagInput.trim()],
			});
			setTagInput("");
		}
	}, [tagInput, draft.tags, updateDraft]);

	const removeTag = useCallback(
		(tagToRemove: string) => {
			updateDraft({
				tags: draft.tags.filter((tag) => tag !== tagToRemove),
			});
		},
		[draft.tags, updateDraft],
	);

	const clearForm = useCallback(() => {
		clearDraft();
		setSaveStatus("idle");
	}, [clearDraft]);

	const loadSampleArticle = useCallback(() => {
		const sampleArticle: ArticleDraft = {
			title: "Getting Started with React 19 Activity API",
			content:
				"The Activity API in React 19 introduces a revolutionary way to handle state persistence across browser sessions. This feature automatically saves component state to browser storage and restores it when the user returns, eliminating data loss and providing a seamless user experience.\n\nKey benefits include:\n- Automatic state persistence\n- Cross-tab synchronization\n- Session restoration capabilities\n- Simplified state management\n\nWith Activity API, developers can focus on building features rather than worrying about state management boilerplate.",
			author: "React Developer",
			tags: ["React", "Activity API", "State Management", "Frontend"],
			category: "technology",
			lastSaved: new Date().toLocaleString(),
			wordCount: 85,
		};
		setDraft(sampleArticle);
		setSaveStatus("saved");
		setTimeout(() => setSaveStatus("idle"), 2000);
	}, [setDraft]);

	useEffect(() => {
		if (!autoSaveEnabled) return;

		const interval = setInterval(() => {
			if (draft.title || draft.content || draft.author) {
				updateDraft({});
			}
		}, saveInterval);

		return () => clearInterval(interval);
	}, [autoSaveEnabled, saveInterval, draft, updateDraft]);

	const getStatusIcon = () => {
		switch (saveStatus) {
			case "saving":
				return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>;
			case "saved":
				return (
					<svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "error":
				return (
					<svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	const getStatusText = () => {
		switch (saveStatus) {
			case "saving":
				return "保存草稿中...";
			case "saved":
				return `草稿自动保存于 ${draft.lastSaved}`;
			case "error":
				return "保存草稿失败";
			default:
				return "所有更改会自动保存";
		}
	};

	return (
		<div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h3 className="mb-2 font-semibold text-gray-900 text-lg">表单自动保存演示</h3>
				<p className="mb-4 text-gray-600 text-sm">文章编辑器演示自动表单草稿保存。所有更改实时持久化到浏览器存储。</p>

				{(draft.lastSaved || isSyncing || lastSync) && (
					<div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								{isSyncing ? (
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
								) : (
									getStatusIcon()
								)}
								<span className="text-gray-700 text-sm">{isSyncing ? "Syncing draft..." : getStatusText()}</span>
							</div>
							<div className="flex items-center space-x-4">
								{lastSync && !isSyncing && (
									<span className="text-gray-500 text-xs">Last sync: {lastSync.toLocaleTimeString()}</span>
								)}
								<label className="flex items-center text-gray-600 text-sm">
									<input
										type="checkbox"
										checked={autoSaveEnabled}
										onChange={(e) => setAutoSaveEnabled(e.target.checked)}
										className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									自动保存
								</label>
								<span className="text-gray-500 text-sm">{draft.wordCount} 字</span>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">文章标题</label>
						<input
							type="text"
							value={draft.title}
							onChange={(e) => updateDraft({ title: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="输入文章标题"
						/>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">作者姓名</label>
						<input
							type="text"
							value={draft.author}
							onChange={(e) => updateDraft({ author: e.target.value })}
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="输入作者姓名"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">分类</label>
					<select
						value={draft.category}
						onChange={(e) => updateDraft({ category: e.target.value })}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<option value="">选择分类</option>
						<option value="technology">技术</option>
						<option value="design">设计</option>
						<option value="business">商业</option>
						<option value="lifestyle">生活方式</option>
						<option value="education">教育</option>
					</select>
				</div>

				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">标签</label>
					<div className="mb-2 flex gap-2">
						<input
							type="text"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addTag()}
							className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="添加标签（按回车）"
						/>
						<button
							onClick={addTag}
							className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							添加标签
						</button>
					</div>
					{draft.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{draft.tags.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-800 text-sm"
								>
									{tag}
									<button
										onClick={() => removeTag(tag)}
										className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
									>
										×
									</button>
								</span>
							))}
						</div>
					)}
				</div>

				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">文章内容</label>
					<textarea
						value={draft.content}
						onChange={(e) => updateDraft({ content: e.target.value })}
						rows={8}
						className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="在此编写文章内容..."
					/>
				</div>

				<div className="flex items-center justify-between border-gray-200 border-t pt-4">
					<div className="flex gap-3">
						<button
							onClick={loadSampleArticle}
							className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							加载示例文章
						</button>
						<button
							onClick={clearForm}
							className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						>
							清空草稿
						</button>
					</div>
					<div className="text-gray-500 text-sm">{autoSaveEnabled && `每${saveInterval / 1000}秒自动保存`}</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="mb-1 font-medium text-blue-900">自动保存特性：</div>
					<ul className="space-y-1 text-blue-800">
						<li>• 实时表单数据持久化</li>
						<li>• 防止刷新时数据丢失</li>
						<li>• 跨标签页草稿同步</li>
						<li>• 返回时自动恢复</li>
					</ul>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="mb-1 font-medium text-green-900">测试场景：</div>
					<ul className="space-y-1 text-green-800">
						<li>• 开始写作，然后刷新页面</li>
						<li>• 在新浏览器标签页中打开草稿</li>
						<li>• 关闭并重新打开浏览器</li>
						<li>• 检查移动端与桌面端同步</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
