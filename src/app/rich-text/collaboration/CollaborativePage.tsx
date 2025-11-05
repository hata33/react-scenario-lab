"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

// 用户类型定义
interface User {
	id: string;
	name: string;
	color: string;
	avatar: string;
	isOnline: boolean;
}

// 光标位置类型
interface CursorPosition {
	user: User;
	range: {
		start: number;
		end: number;
	};
	text: string;
}

// 评论类型
interface Comment {
	id: string;
	user: User;
	content: string;
	position: number;
	replies: Comment[];
	createdAt: Date;
	resolved: boolean;
}

// 模拟用户数据
const mockUsers: User[] = [
	{ id: "1", name: "张三", color: "#3B82F6", avatar: "👨‍💻", isOnline: true },
	{ id: "2", name: "李四", color: "#10B981", avatar: "👩‍💻", isOnline: true },
	{ id: "3", name: "王五", color: "#F59E0B", avatar: "🧑‍💻", isOnline: false },
];

// 协作编辑器组件
const CollaborativeEditor: React.FC<{
	value: string;
	onChange: (value: string, user: User) => void;
	currentUser: User;
	onComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
}> = ({ value, onChange, currentUser, onComment }) => {
	const [cursors, setCursors] = useState<CursorPosition[]>([]);
	const [showCommentDialog, setShowCommentDialog] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [commentPosition, setCommentPosition] = useState(0);
	const editorRef = useRef<HTMLDivElement>(null);

	// 模拟其他用户的光标移动
	useEffect(() => {
		const interval = setInterval(() => {
			const otherUsers = mockUsers.filter((u) => u.id !== currentUser.id && u.isOnline);
			const newCursors: CursorPosition[] = otherUsers.map((user) => ({
				user,
				range: {
					start: Math.floor(Math.random() * value.length),
					end: Math.floor(Math.random() * value.length),
				},
				text: user.name,
			}));
			setCursors(newCursors);
		}, 3000);

		return () => clearInterval(interval);
	}, [value, currentUser.id]);

	// 处理输入变化
	const handleInput = useCallback(() => {
		if (!editorRef.current) return;
		const content = editorRef.current.innerHTML;
		onChange(content, currentUser);
	}, [onChange, currentUser]);

	// 处理选择变化
	const handleSelectionChange = useCallback(() => {
		const selection = window.getSelection();
		if (selection?.toString()) {
			// 可以在这里处理文本选择的逻辑
		}
	}, []);

	// 处理右键菜单（添加评论）
	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		const selection = window.getSelection();
		if (selection?.toString()) {
			const range = selection.getRangeAt(0);
			const position = range.startOffset;
			setCommentPosition(position);
			setShowCommentDialog(true);
		}
	}, []);

	// 提交评论
	const submitComment = useCallback(() => {
		if (commentText.trim()) {
			onComment({
				user: currentUser,
				content: commentText,
				position: commentPosition,
				replies: [],
				resolved: false,
			});
			setCommentText("");
			setShowCommentDialog(false);
		}
	}, [commentText, currentUser, commentPosition, onComment]);

	return (
		<div className="relative overflow-hidden rounded-lg border border-gray-300">
			{/* 在线用户显示 */}
			<div className="border-gray-300 border-b bg-gray-50 p-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-gray-600 text-sm">在线用户:</span>
						<div className="flex items-center gap-1">
							{mockUsers
								.filter((u) => u.isOnline)
								.map((user) => (
									<div
										key={user.id}
										className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
										style={{ backgroundColor: user.color }}
										title={user.name}
									>
										{user.avatar}
									</div>
								))}
						</div>
					</div>
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<span>当前用户:</span>
						<div
							className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-800 text-xs"
							style={{ backgroundColor: currentUser.color }}
						>
							{currentUser.avatar}
						</div>
					</div>
				</div>
			</div>

			{/* 编辑区域 */}
			<div
				ref={editorRef}
				contentEditable
				onInput={handleInput}
				onSelect={handleSelectionChange}
				onContextMenu={handleContextMenu}
				className="relative min-h-[400px] p-4 focus:outline-none"
				dangerouslySetInnerHTML={{ __html: value }}
			/>

			{/* 其他用户光标显示 */}
			{cursors.map((cursor, index) => (
				<div
					key={`${cursor.user.id}-${index}`}
					className="pointer-events-none absolute"
					style={{
						left: `${cursor.range.start * 0.5}px`,
						top: "80px",
						color: cursor.user.color,
						borderLeft: `2px solid ${cursor.user.color}`,
					}}
				>
					<div className="rounded px-2 py-1 text-white text-xs" style={{ backgroundColor: cursor.user.color }}>
						{cursor.text}
					</div>
				</div>
			))}

			{/* 评论对话框 */}
			{showCommentDialog && (
				<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 w-80 transform rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
					<h4 className="mb-3 font-medium text-gray-900">添加评论</h4>
					<textarea
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						placeholder="请输入评论内容..."
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
					<div className="mt-3 flex gap-2">
						<button
							onClick={submitComment}
							className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
						>
							添加评论
						</button>
						<button
							onClick={() => setShowCommentDialog(false)}
							className="rounded bg-gray-200 px-3 py-1 text-gray-700 text-sm hover:bg-gray-300"
						>
							取消
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const CollaborativeContent = () => {
	const [currentUser] = useState<User>(mockUsers[0]);
	const [content, setContent] = useState(
		`<h2>协作编辑器演示</h2>
<p>这是一个支持多人实时协作的富文本编辑器演示。您可以：</p>
<ul>
<li>看到其他在线用户</li>
<li>查看其他用户的光标位置</li>
<li>选中文字右键添加评论</li>
<li>实时同步编辑内容</li>
</ul>
<p>选择一些文字并右键点击来添加评论。</p>`,
	);
	const [comments, setComments] = useState<Comment[]>([
		{
			id: "1",
			user: mockUsers[1],
			content: "这里需要添加更多的说明信息",
			position: 50,
			replies: [],
			createdAt: new Date("2024-01-15T10:30:00"),
			resolved: false,
		},
		{
			id: "2",
			user: mockUsers[0],
			content: "可以考虑增加表格功能",
			position: 120,
			replies: [
				{
					id: "3",
					user: mockUsers[1],
					content: "好主意！表格功能很有用",
					position: 0,
					replies: [],
					createdAt: new Date("2024-01-15T11:00:00"),
					resolved: false,
				},
			],
			createdAt: new Date("2024-01-15T09:45:00"),
			resolved: false,
		},
	]);

	// 处理内容变化
	const handleContentChange = useCallback((newContent: string, user: User) => {
		setContent(newContent);
		// 模拟同步到服务器
		console.log(`用户 ${user.name} 更新了内容`);
	}, []);

	// 添加评论
	const handleAddComment = useCallback((commentData: Omit<Comment, "id" | "createdAt">) => {
		const newComment: Comment = {
			...commentData,
			id: Date.now().toString(),
			createdAt: new Date(),
		};
		setComments((prev) => [...prev, newComment]);
	}, []);

	// 解决评论
	const resolveComment = useCallback((commentId: string) => {
		setComments((prev) => prev.map((comment) => (comment.id === commentId ? { ...comment, resolved: true } : comment)));
	}, []);

	// 删除评论
	const deleteComment = useCallback((commentId: string) => {
		setComments((prev) => prev.filter((comment) => comment.id !== commentId));
	}, []);

	return (
		<div className="mx-auto max-w-7xl p-6">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="mb-4 font-bold text-3xl text-gray-900">协作编辑器</h1>
				<p className="text-gray-600 text-lg">多人实时编辑、光标跟踪、评论系统等协作功能演示</p>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* 编辑器区域 */}
				<div className="lg:col-span-2">
					<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
						<div className="border-gray-200 border-b bg-gray-50 p-4">
							<h2 className="font-semibold text-gray-900 text-lg">协作编辑区</h2>
							<p className="mt-1 text-gray-600 text-sm">实时协作编辑 - 选择文字右键添加评论</p>
						</div>
						<div className="p-4">
							<CollaborativeEditor
								value={content}
								onChange={handleContentChange}
								currentUser={currentUser}
								onComment={handleAddComment}
							/>
						</div>
					</div>

					{/* 活动历史 */}
					<div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold text-gray-900">最近活动</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<div
									className="flex h-4 w-4 items-center justify-center rounded-full text-xs"
									style={{ backgroundColor: mockUsers[1].color }}
								>
									{mockUsers[1].avatar}
								</div>
								<span>{mockUsers[1].name} 正在编辑...</span>
								<span className="text-gray-400 text-xs">刚刚</span>
							</div>
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<div
									className="flex h-4 w-4 items-center justify-center rounded-full text-xs"
									style={{ backgroundColor: currentUser.color }}
								>
									{currentUser.avatar}
								</div>
								<span>{currentUser.name} 添加了评论</span>
								<span className="text-gray-400 text-xs">5分钟前</span>
							</div>
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<div
									className="flex h-4 w-4 items-center justify-center rounded-full text-xs"
									style={{ backgroundColor: mockUsers[2].color }}
								>
									{mockUsers[2].avatar}
								</div>
								<span>{mockUsers[2].name} 加入了文档</span>
								<span className="text-gray-400 text-xs">10分钟前</span>
							</div>
						</div>
					</div>
				</div>

				{/* 侧边栏 */}
				<div className="space-y-6 lg:col-span-1">
					{/* 协作功能说明 */}
					<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold text-gray-900">协作功能</h3>
						<ul className="space-y-2 text-gray-600 text-sm">
							<li className="flex items-start gap-2">
								<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>实时协作编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>用户标识和光标跟踪</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>行内评论系统</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>编辑历史记录</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>冲突检测和处理</span>
							</li>
						</ul>
					</div>

					{/* 评论列表 */}
					<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold text-gray-900">评论 ({comments.filter((c) => !c.resolved).length})</h3>
						<div className="space-y-3">
							{comments.map((comment) => (
								<div
									key={comment.id}
									className={`rounded border p-3 ${comment.resolved ? "border-gray-200 bg-gray-50" : "border-yellow-200 bg-yellow-50"}`}
								>
									<div className="flex items-start gap-2">
										<div
											className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs"
											style={{ backgroundColor: comment.user.color }}
										>
											{comment.user.avatar}
										</div>
										<div className="min-w-0 flex-1">
											<div className="mb-1 flex items-center justify-between">
												<span className="font-medium text-gray-900 text-sm">{comment.user.name}</span>
												<span className="text-gray-500 text-xs">{comment.createdAt.toLocaleTimeString()}</span>
											</div>
											<p className="text-gray-700 text-sm">{comment.content}</p>
											{!comment.resolved && (
												<div className="mt-2 flex gap-2">
													<button
														onClick={() => resolveComment(comment.id)}
														className="text-green-600 text-xs hover:text-green-700"
													>
														解决
													</button>
													<button
														onClick={() => deleteComment(comment.id)}
														className="text-red-600 text-xs hover:text-red-700"
													>
														删除
													</button>
												</div>
											)}
										</div>
									</div>
									{comment.replies.length > 0 && (
										<div className="mt-2 space-y-2 pl-8">
											{comment.replies.map((reply) => (
												<div key={reply.id} className="flex items-start gap-2">
													<div
														className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-xs"
														style={{ backgroundColor: reply.user.color }}
													>
														{reply.user.avatar}
													</div>
													<div className="flex-1">
														<div className="mb-1 flex items-center gap-2">
															<span className="font-medium text-gray-900 text-xs">{reply.user.name}</span>
															<span className="text-gray-400 text-xs">{reply.createdAt.toLocaleTimeString()}</span>
														</div>
														<p className="text-gray-600 text-xs">{reply.content}</p>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* 技术架构 */}
					<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold text-gray-900">技术实现</h3>
						<div className="space-y-2 text-gray-600 text-sm">
							<p>
								<strong>通信:</strong> WebSocket / Socket.io
							</p>
							<p>
								<strong>同步:</strong> Operational Transform
							</p>
							<p>
								<strong>冲突:</strong> CRDT Algorithm
							</p>
							<p>
								<strong>存储:</strong> Real-time Database
							</p>
							<p>
								<strong>状态:</strong> Redux / Zustand
							</p>
						</div>
					</div>

					{/* 快速导航 */}
					<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold text-gray-900">相关功能</h3>
						<div className="space-y-2">
							<a href="/rich-text/comment" className="block text-blue-600 text-sm hover:text-blue-700">
								评论系统详情 →
							</a>
							<a href="/rich-text/version" className="block text-blue-600 text-sm hover:text-blue-700">
								版本控制系统 →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function CollaborativePage() {
	return (
		<Layout>
			<CollaborativeContent />
		</Layout>
	);
}
