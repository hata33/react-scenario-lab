"use client";

import { useState } from "react";

type Post = { id: number; content: string; likes: number; isLiked: boolean; optimistic?: boolean };

export default function UseOptimisticLikeDemo() {
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, content: "React 19 的新特性真是太棒了！", likes: 42, isLiked: false },
		{ id: 2, content: "useActionState 让表单处理变得如此简单", likes: 28, isLiked: false },
		{ id: 3, content: "乐观更新大大提升了用户体验", likes: 15, isLiked: true },
	]);
	const [optimisticPosts, setOptimisticPosts] = useState<Post[]>(posts);

	const handleLike = async (postId: number) => {
		// 乐观更新：立即更新点赞状态
		setOptimisticPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							isLiked: !post.isLiked,
							likes: post.isLiked ? post.likes - 1 : post.likes + 1,
							optimistic: true,
						}
					: post,
			),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 800));

		// 实际更新状态
		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							isLiked: !post.isLiked,
							likes: post.isLiked ? post.likes - 1 : post.likes + 1,
						}
					: post,
			),
		);

		// 移除乐观状态
		setOptimisticPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, optimistic: false } : post)));
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">👍 社交点赞场景</h5>
			<div className="space-y-3">
				{optimisticPosts.map((post) => (
					<div
						key={post.id}
						className={`rounded-lg border p-4 ${
							post.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<p className="mb-3 text-gray-800">{post.content}</p>
						<div className="flex items-center justify-between">
							<button
								onClick={() => handleLike(post.id)}
								className={`flex items-center gap-2 rounded-full px-3 py-1 font-medium text-sm transition-colors ${
									post.isLiked
										? "bg-red-100 text-red-700 hover:bg-red-200"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								<span>{post.isLiked ? "❤️" : "🤍"}</span>
								<span>{post.likes}</span>
							</button>
							{post.optimistic && <span className="font-medium text-xs text-yellow-600">更新中...</span>}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
