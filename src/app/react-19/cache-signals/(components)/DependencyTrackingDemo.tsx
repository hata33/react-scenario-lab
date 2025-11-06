"use client";

import { useCallback, useEffect, useState } from "react";

export default function DependencyTrackingDemo() {
	const [userId, setUserId] = useState(1);
	const [user, setUser] = useState<any>(null);
	const [posts, setPosts] = useState<any[]>([]);

	const fetchUser = useCallback(async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return { id, name: `User ${id}`, email: `user${id}@example.com` };
	}, []);

	const fetchUserPosts = useCallback(async (id: number) => {
		await new Promise((resolve) => setTimeout(resolve, 800));
		return Array.from({ length: 3 }, (_, i) => ({
			id: i + 1,
			title: `Post ${i + 1} by User ${id}`,
			content: `Content for post ${i + 1}`,
		}));
	}, []);

	useEffect(() => {
		fetchUser(userId).then(setUser);
		fetchUserPosts(userId).then(setPosts);
	}, [userId, fetchUser, fetchUserPosts]);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<label>用户 ID:</label>
				<input
					type="number"
					value={userId}
					onChange={(e) => setUserId(Number(e.target.value))}
					className="rounded border border-gray-300 px-3 py-1"
					min="1"
				/>
			</div>

			{user && (
				<div className="rounded border border-blue-200 bg-blue-50 p-4">
					<h4 className="mb-2 font-medium">用户信息</h4>
					<p>ID: {user.id}</p>
					<p>姓名: {user.name}</p>
					<p>邮箱: {user.email}</p>
				</div>
			)}

			{posts.length > 0 && (
				<div className="rounded border border-green-200 bg-green-50 p-4">
					<h4 className="mb-2 font-medium">用户文章</h4>
					<div className="space-y-2">
						{posts.map((post) => (
							<div key={post.id} className="border-green-100 border-b pb-2">
								<h5 className="font-medium">{post.title}</h5>
								<p className="text-gray-600 text-sm">{post.content}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}