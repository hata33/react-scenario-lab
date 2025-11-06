"use client";

import { useState } from "react";

type Todo = { id: number; text: string; completed: boolean; optimistic?: boolean };

export default function UseOptimisticDemo() {
	const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "学习 React 19 新特性", completed: false }]);
	const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos);
	const [newTodo, setNewTodo] = useState("");
	const [isPending, setIsPending] = useState(false);

	const addTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodo.trim()) return;

		setIsPending(true);

		// 乐观更新：立即显示新项目
		const optimisticItem = {
			id: Date.now(),
			text: newTodo,
			completed: false,
			optimistic: true,
		};

		setOptimisticTodos((prev) => [...prev, optimisticItem]);

		// 模拟实际异步操作
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// 实际更新
		setTodos((prev) => [...prev, { id: Date.now(), text: newTodo, completed: false }]);
		setOptimisticTodos((prev) =>
			prev.map((item) => (item.id === optimisticItem.id ? { ...item, optimistic: false } : item)),
		);

		setNewTodo("");
		setIsPending(false);
	};

	const toggleTodo = async (id: number) => {
		// 乐观更新：立即切换状态
		setOptimisticTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

		// 模拟异步操作
		await new Promise((resolve) => setTimeout(resolve, 500));
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📝 待办事项管理</h5>
			<form onSubmit={addTodo} className="mb-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						disabled={isPending}
						className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="添加新任务..."
					/>
					<button
						type="submit"
						disabled={isPending || !newTodo.trim()}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${
							isPending || !newTodo.trim()
								? "cursor-not-allowed bg-gray-400 text-gray-200"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						{isPending ? "添加中..." : "添加"}
					</button>
				</div>
			</form>

			<div className="space-y-2">
				{optimisticTodos.map((todo) => (
					<div
						key={todo.id}
						className={`flex items-center gap-3 rounded-md border p-3 ${
							todo.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
							className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
							{todo.text}
						</span>
						{todo.optimistic && <span className="font-medium text-xs text-yellow-600">乐观更新中...</span>}
					</div>
				))}
			</div>
		</div>
	);
}
