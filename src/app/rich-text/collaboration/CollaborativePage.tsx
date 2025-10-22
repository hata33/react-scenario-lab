"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
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
	{ id: '1', name: '张三', color: '#3B82F6', avatar: '👨‍💻', isOnline: true },
	{ id: '2', name: '李四', color: '#10B981', avatar: '👩‍💻', isOnline: true },
	{ id: '3', name: '王五', color: '#F59E0B', avatar: '🧑‍💻', isOnline: false },
];

// 协作编辑器组件
const CollaborativeEditor: React.FC<{
	value: string;
	onChange: (value: string, user: User) => void;
	currentUser: User;
	onComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
}> = ({ value, onChange, currentUser, onComment }) => {
	const [cursors, setCursors] = useState<CursorPosition[]>([]);
	const [showCommentDialog, setShowCommentDialog] = useState(false);
	const [commentText, setCommentText] = useState('');
	const [commentPosition, setCommentPosition] = useState(0);
	const editorRef = useRef<HTMLDivElement>(null);

	// 模拟其他用户的光标移动
	useEffect(() => {
		const interval = setInterval(() => {
			const otherUsers = mockUsers.filter(u => u.id !== currentUser.id && u.isOnline);
			const newCursors: CursorPosition[] = otherUsers.map(user => ({
				user,
				range: {
					start: Math.floor(Math.random() * value.length),
					end: Math.floor(Math.random() * value.length)
				},
				text: user.name
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
		if (selection && selection.toString()) {
			// 可以在这里处理文本选择的逻辑
		}
	}, []);

	// 处理右键菜单（添加评论）
	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		const selection = window.getSelection();
		if (selection && selection.toString()) {
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
				resolved: false
			});
			setCommentText('');
			setShowCommentDialog(false);
		}
	}, [commentText, currentUser, commentPosition, onComment]);

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden relative">
			{/* 在线用户显示 */}
			<div className="bg-gray-50 border-b border-gray-300 p-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600">在线用户:</span>
						<div className="flex items-center gap-1">
							{mockUsers.filter(u => u.isOnline).map(user => (
								<div
									key={user.id}
									className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
									style={{ backgroundColor: user.color }}
									title={user.name}
								>
									{user.avatar}
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<span>当前用户:</span>
						<div
							className="w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-gray-800"
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
				className="min-h-[400px] p-4 focus:outline-none relative"
				dangerouslySetInnerHTML={{ __html: value }}
			/>

			{/* 其他用户光标显示 */}
			{cursors.map((cursor, index) => (
				<div
					key={`${cursor.user.id}-${index}`}
					className="absolute pointer-events-none"
					style={{
						left: `${cursor.range.start * 0.5}px`,
						top: '80px',
						color: cursor.user.color,
						borderLeft: `2px solid ${cursor.user.color}`
					}}
				>
					<div
						className="px-2 py-1 text-xs text-white rounded"
						style={{ backgroundColor: cursor.user.color }}
					>
						{cursor.text}
					</div>
				</div>
			))}

			{/* 评论对话框 */}
			{showCommentDialog && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80">
					<h4 className="font-medium text-gray-900 mb-3">添加评论</h4>
					<textarea
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						placeholder="请输入评论内容..."
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
					<div className="flex gap-2 mt-3">
						<button
							onClick={submitComment}
							className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
						>
							添加评论
						</button>
						<button
							onClick={() => setShowCommentDialog(false)}
							className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
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
<p>选择一些文字并右键点击来添加评论。</p>`
	);
	const [comments, setComments] = useState<Comment[]>([
		{
			id: '1',
			user: mockUsers[1],
			content: '这里需要添加更多的说明信息',
			position: 50,
			replies: [],
			createdAt: new Date('2024-01-15T10:30:00'),
			resolved: false
		},
		{
			id: '2',
			user: mockUsers[0],
			content: '可以考虑增加表格功能',
			position: 120,
			replies: [
				{
					id: '3',
					user: mockUsers[1],
					content: '好主意！表格功能很有用',
					position: 0,
					replies: [],
					createdAt: new Date('2024-01-15T11:00:00'),
					resolved: false
				}
			],
			createdAt: new Date('2024-01-15T09:45:00'),
			resolved: false
		}
	]);

	// 处理内容变化
	const handleContentChange = useCallback((newContent: string, user: User) => {
		setContent(newContent);
		// 模拟同步到服务器
		console.log(`用户 ${user.name} 更新了内容`);
	}, []);

	// 添加评论
	const handleAddComment = useCallback((commentData: Omit<Comment, 'id' | 'createdAt'>) => {
		const newComment: Comment = {
			...commentData,
			id: Date.now().toString(),
			createdAt: new Date()
		};
		setComments(prev => [...prev, newComment]);
	}, []);

	// 解决评论
	const resolveComment = useCallback((commentId: string) => {
		setComments(prev => prev.map(comment =>
			comment.id === commentId ? { ...comment, resolved: true } : comment
		));
	}, []);

	// 删除评论
	const deleteComment = useCallback((commentId: string) => {
		setComments(prev => prev.filter(comment => comment.id !== commentId));
	}, []);

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					协作编辑器
				</h1>
				<p className="text-lg text-gray-600">
					多人实时编辑、光标跟踪、评论系统等协作功能演示
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 编辑器区域 */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="p-4 bg-gray-50 border-b border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">协作编辑区</h2>
							<p className="text-sm text-gray-600 mt-1">
								实时协作编辑 - 选择文字右键添加评论
							</p>
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
					<div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">最近活动</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<div
									className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
									style={{ backgroundColor: mockUsers[1].color }}
								>
									{mockUsers[1].avatar}
								</div>
								<span>{mockUsers[1].name} 正在编辑...</span>
								<span className="text-gray-400 text-xs">刚刚</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<div
									className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
									style={{ backgroundColor: currentUser.color }}
								>
									{currentUser.avatar}
								</div>
								<span>{currentUser.name} 添加了评论</span>
								<span className="text-gray-400 text-xs">5分钟前</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<div
									className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
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
				<div className="lg:col-span-1 space-y-6">
					{/* 协作功能说明 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">协作功能</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>实时协作编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>用户标识和光标跟踪</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>行内评论系统</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>编辑历史记录</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>冲突检测和处理</span>
							</li>
						</ul>
					</div>

					{/* 评论列表 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">评论 ({comments.filter(c => !c.resolved).length})</h3>
						<div className="space-y-3">
							{comments.map(comment => (
								<div key={comment.id} className={`p-3 rounded border ${comment.resolved ? 'bg-gray-50 border-gray-200' : 'bg-yellow-50 border-yellow-200'}`}>
									<div className="flex items-start gap-2">
										<div
											className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
											style={{ backgroundColor: comment.user.color }}
										>
											{comment.user.avatar}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between mb-1">
												<span className="font-medium text-gray-900 text-sm">
													{comment.user.name}
												</span>
												<span className="text-xs text-gray-500">
													{comment.createdAt.toLocaleTimeString()}
												</span>
											</div>
											<p className="text-sm text-gray-700">{comment.content}</p>
											{!comment.resolved && (
												<div className="flex gap-2 mt-2">
													<button
														onClick={() => resolveComment(comment.id)}
														className="text-xs text-green-600 hover:text-green-700"
													>
													 解决
													</button>
													<button
														onClick={() => deleteComment(comment.id)}
														className="text-xs text-red-600 hover:text-red-700"
													>
													 删除
													</button>
												</div>
											)}
										</div>
									</div>
									{comment.replies.length > 0 && (
										<div className="mt-2 pl-8 space-y-2">
											{comment.replies.map(reply => (
												<div key={reply.id} className="flex items-start gap-2">
													<div
														className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0"
														style={{ backgroundColor: reply.user.color }}
													>
														{reply.user.avatar}
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<span className="font-medium text-gray-900 text-xs">
																{reply.user.name}
															</span>
															<span className="text-xs text-gray-400">
																{reply.createdAt.toLocaleTimeString()}
															</span>
														</div>
														<p className="text-xs text-gray-600">{reply.content}</p>
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
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">技术实现</h3>
						<div className="space-y-2 text-sm text-gray-600">
							<p><strong>通信:</strong> WebSocket / Socket.io</p>
							<p><strong>同步:</strong> Operational Transform</p>
							<p><strong>冲突:</strong> CRDT Algorithm</p>
							<p><strong>存储:</strong> Real-time Database</p>
							<p><strong>状态:</strong> Redux / Zustand</p>
						</div>
					</div>

					{/* 快速导航 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">相关功能</h3>
						<div className="space-y-2">
							<a
								href="/rich-text/comment"
								className="block text-sm text-blue-600 hover:text-blue-700"
							>
								评论系统详情 →
							</a>
							<a
								href="/rich-text/version"
								className="block text-sm text-blue-600 hover:text-blue-700"
							>
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