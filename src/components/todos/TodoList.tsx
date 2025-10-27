"use client";

import { useTodos } from "@/hooks/useTodos";
import FilterControls from "./FilterControls";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const { todos, loading, filters, setFilters, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();

	if (loading) {
		return (
			<div className="py-8 text-center">
				<div className="inline-block h-8 w-8 animate-spin rounded-full border-blue-500 border-b-2"></div>
				<p className="mt-2 text-gray-600">加载中...</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-8 font-bold text-3xl text-gray-900">Todo 列表</h1>

			<div className="grid gap-8">
				{/* 添加 Todo 表单 */}
				<TodoForm onSubmit={addTodo} />

				{/* 过滤控件 */}
				<FilterControls filters={filters} onChange={setFilters} />

				{/* 统计信息 */}
				<div className="rounded-lg bg-white p-4 shadow-md">
					<div className="flex justify-between text-gray-600 text-sm">
						<span>总计: {todos.length} 项</span>
						<span>已完成: {todos.filter((t) => t.is_complete).length} 项</span>
						<span>进行中: {todos.filter((t) => !t.is_complete).length} 项</span>
					</div>
				</div>

				{/* Todo 列表 */}
				<div className="space-y-4">
					{todos.length === 0 ? (
						<div className="rounded-lg bg-white py-12 text-center text-gray-500 shadow-md">
							<p className="text-lg">暂无 Todo 项目</p>
							<p className="mt-2 text-sm">点击上方表单添加你的第一个 Todo</p>
						</div>
					) : (
						todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onUpdate={updateTodo}
								onDelete={deleteTodo}
								onToggleComplete={toggleComplete}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
