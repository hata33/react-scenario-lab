"use client";

import type React from "react";
import { useState } from "react";

export default function UseActionStateCommentDemo() {
	const [comment, setComment] = useState("");
	const [author, setAuthor] = useState("");
	const [state, setState] = useState<{
		error?: string;
		success?: boolean;
		message?: string;
		commentId?: number;
	} | null>(null);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步评论提交
		await new Promise((resolve) => setTimeout(resolve, 800));

		if (!author.trim()) {
			setState({ error: "请输入您的昵称" });
		} else if (!comment.trim()) {
			setState({ error: "请输入评论内容" });
		} else if (comment.length < 10) {
			setState({ error: "评论内容至少需要10个字符" });
		} else {
			setState({
				success: true,
				message: "评论发布成功！",
				commentId: Date.now(),
			});
			setComment("");
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">💬 评论发布场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">昵称</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="请输入昵称"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">评论内容</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						disabled={isPending}
						rows={4}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="分享您的想法..."
					/>
					<div className="mt-1 text-gray-500 text-xs">{comment.length}/10 字符</div>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "发布中..." : "发布评论"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">{state.error}</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">
						{state.message}
						{state.commentId && <p className="mt-1 text-green-600 text-xs">评论ID：#{state.commentId}</p>}
					</div>
				)}
			</form>
		</div>
	);
}
