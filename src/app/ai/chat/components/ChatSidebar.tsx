"use client";

import { useState } from "react";
import {
	MessageSquare,
	Plus,
	Trash2,
	Download,
	ChevronLeft,
} from "lucide-react";
import { useChatHistory } from "../hooks/useChatHistory";

interface ChatSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
	const {
		histories,
		currentHistoryId,
		createHistory,
		deleteHistory,
		switchHistory,
		clearAllHistories,
		exportHistory,
	} = useChatHistory();

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
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* 侧边栏 */}
			<div
				className={`
				fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
				${isOpen ? "translate-x-0" : "-translate-x-full"}
				w-80 lg:translate-x-0 lg:static lg:z-0
			`}
			>
				<div className="flex flex-col h-full">
					{/* 头部 */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold">对话历史</h2>
						<div className="flex items-center gap-2">
							<button
								onClick={handleNewChat}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title="新建对话"
							>
								<Plus className="w-5 h-5" />
							</button>
							<button
								onClick={onClose}
								className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* 历史记录列表 */}
					<div className="flex-1 overflow-y-auto p-4">
						{histories.length === 0 ? (
							<div className="text-center text-gray-500 py-8">
								<MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
								<p>暂无对话历史</p>
								<button
									onClick={handleNewChat}
									className="mt-4 text-blue-600 hover:text-blue-800"
								>
									开始新对话
								</button>
							</div>
						) : (
							<div className="space-y-2">
								{histories.map((history) => (
									<div
										key={history.id}
										onClick={() => handleSelectHistory(history.id)}
										className={`
											p-3 rounded-lg cursor-pointer transition-colors group
											${
												currentHistoryId === history.id
													? "bg-blue-50 border border-blue-200"
													: "hover:bg-gray-50 border border-transparent"
											}
										`}
									>
										<div className="flex items-start justify-between">
											<div className="flex-1 min-w-0">
												<h3 className="font-medium text-sm truncate mb-1">
													{history.title}
												</h3>
												<p className="text-xs text-gray-500">
													{history.messages.length} 条消息
												</p>
												<p className="text-xs text-gray-400 mt-1">
													{history.updatedAt.toLocaleString("zh-CN", {
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													})}
												</p>
											</div>
											<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
												<button
													onClick={(e) => handleExportHistory(history.id, e)}
													className="p-1 hover:bg-gray-200 rounded transition-colors"
													title="导出对话"
												>
													<Download className="w-4 h-4" />
												</button>
												<button
													onClick={(e) => handleDeleteHistory(history.id, e)}
													className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
													title="删除对话"
												>
													<Trash2 className="w-4 h-4" />
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
						<div className="p-4 border-t border-gray-200">
							{!showDeleteConfirm ? (
								<button
									onClick={() => setShowDeleteConfirm(true)}
									className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
								>
									清空所有对话
								</button>
							) : (
								<div className="space-y-2">
									<p className="text-sm text-gray-600">
										确定要清空所有对话记录吗？
									</p>
									<div className="flex gap-2">
										<button
											onClick={handleClearAll}
											className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
										>
											确定
										</button>
										<button
											onClick={() => setShowDeleteConfirm(false)}
											className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
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
