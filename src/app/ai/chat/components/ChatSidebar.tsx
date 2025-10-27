"use client";

import { ChevronLeft, Download, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useChatHistory } from "../hooks/useChatHistory";

interface ChatSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
	const { histories, currentHistoryId, createHistory, deleteHistory, switchHistory, clearAllHistories, exportHistory } =
		useChatHistory();

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const handleNewChat = () => {
		createHistory();
		onClose();
	};

	const handleSelectHistory = (id: string) => {
		switchHistory(id);
		onClose();
	};

	const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		deleteHistory(id);
	};

	const handleExportHistory = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		exportHistory(id);
	};

	const handleClearAll = () => {
		clearAllHistories();
		setShowDeleteConfirm(false);
		onClose();
	};

	return (
		<>
			{/* 遮罩层 */}
			{isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />}

			{/* 侧边栏 */}
			<div
				className={`fixed top-0 left-0 z-50 h-full border-gray-200 border-r bg-white transition-transform duration-300 ease-in-out${isOpen ? "translate-x-0" : "-translate-x-full"}w-80 lg:static lg:z-0 lg:translate-x-0`}
			>
				<div className="flex h-full flex-col">
					{/* 头部 */}
					<div className="flex items-center justify-between border-gray-200 border-b p-4">
						<h2 className="font-semibold text-lg">对话历史</h2>
						<div className="flex items-center gap-2">
							<button
								onClick={handleNewChat}
								className="rounded-lg p-2 transition-colors hover:bg-gray-100"
								title="新建对话"
							>
								<Plus className="h-5 w-5" />
							</button>
							<button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden">
								<ChevronLeft className="h-5 w-5" />
							</button>
						</div>
					</div>

					{/* 历史记录列表 */}
					<div className="flex-1 overflow-y-auto p-4">
						{histories.length === 0 ? (
							<div className="py-8 text-center text-gray-500">
								<MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-300" />
								<p>暂无对话历史</p>
								<button onClick={handleNewChat} className="mt-4 text-blue-600 hover:text-blue-800">
									开始新对话
								</button>
							</div>
						) : (
							<div className="space-y-2">
								{histories.map((history) => (
									<div
										key={history.id}
										onClick={() => handleSelectHistory(history.id)}
										className={`cursor-pointer rounded-lg p-3 transition-colors group${currentHistoryId === history.id ? "border border-blue-200 bg-blue-50" : "border border-transparent hover:bg-gray-50"}
										`}
									>
										<div className="flex items-start justify-between">
											<div className="min-w-0 flex-1">
												<h3 className="mb-1 truncate font-medium text-sm">{history.title}</h3>
												<p className="text-gray-500 text-xs">{history.messages.length} 条消息</p>
												<p className="mt-1 text-gray-400 text-xs">
													{history.updatedAt.toLocaleString("zh-CN", {
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													})}
												</p>
											</div>
											<div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
												<button
													onClick={(e) => handleExportHistory(history.id, e)}
													className="rounded p-1 transition-colors hover:bg-gray-200"
													title="导出对话"
												>
													<Download className="h-4 w-4" />
												</button>
												<button
													onClick={(e) => handleDeleteHistory(history.id, e)}
													className="rounded p-1 text-red-600 transition-colors hover:bg-red-100"
													title="删除对话"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* 底部操作 */}
					{histories.length > 0 && (
						<div className="border-gray-200 border-t p-4">
							{!showDeleteConfirm ? (
								<button
									onClick={() => setShowDeleteConfirm(true)}
									className="w-full rounded-lg p-2 text-red-600 text-sm transition-colors hover:bg-red-50"
								>
									清空所有对话
								</button>
							) : (
								<div className="space-y-2">
									<p className="text-gray-600 text-sm">确定要清空所有对话记录吗？</p>
									<div className="flex gap-2">
										<button
											onClick={handleClearAll}
											className="flex-1 rounded-lg bg-red-600 p-2 text-sm text-white transition-colors hover:bg-red-700"
										>
											确定
										</button>
										<button
											onClick={() => setShowDeleteConfirm(false)}
											className="flex-1 rounded-lg bg-gray-200 p-2 text-gray-700 text-sm transition-colors hover:bg-gray-300"
										>
											取消
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
