"use client";

import { useState } from "react";
import type { TodoFormData } from "@/types/todo";

interface TodoFormProps {
	onSubmit: (todoData: TodoFormData) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState(1);
	const [dueDate, setDueDate] = useState("");
	const [tags, setTags] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		setLoading(true);
		try {
			const tagsArray = tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean);
			await onSubmit({
				title: title.trim(),
				description: description.trim() || undefined,
				priority,
				due_date: dueDate || undefined,
				tags: tagsArray,
			});

			// Reset form
			setTitle("");
			setDescription("");
			setPriority(1);
			setDueDate("");
			setTags("");
		} catch (error) {
			console.error("Error submitting todo:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<h2 className="mb-4 font-semibold text-xl">添加新 Todo</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">标题 *</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">描述</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">优先级</label>
						<select
							value={priority}
							onChange={(e) => setPriority(Number(e.target.value))}
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value={1}>低</option>
							<option value={2}>中</option>
							<option value={3}>高</option>
							<option value={4}>紧急</option>
							<option value={5}>非常紧急</option>
						</select>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">截止日期</label>
						<input
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block font-medium text-gray-700 text-sm">标签 (用逗号分隔)</label>
					<input
						type="text"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="工作, 重要, 会议"
					/>
				</div>

				<button
					type="submit"
					disabled={loading || !title.trim()}
					className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "添加中..." : "添加 Todo"}
				</button>
			</form>
		</div>
	);
}
