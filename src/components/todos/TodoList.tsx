'use client'

import { useTodos } from '@/hooks/useTodos'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import FilterControls from './FilterControls'

export default function TodoList() {
	const { todos, loading, filters, setFilters, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos()

	if (loading) {
		return (
			<div className="text-center py-8">
				<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				<p className="mt-2 text-gray-600">加载中...</p>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8 text-gray-900">Todo 列表</h1>

			<div className="grid gap-8">
				{/* 添加 Todo 表单 */}
				<TodoForm onSubmit={addTodo} />

				{/* 过滤控件 */}
				<FilterControls filters={filters} onChange={setFilters} />

				{/* 统计信息 */}
				<div className="bg-white p-4 rounded-lg shadow-md">
					<div className="flex justify-between text-sm text-gray-600">
						<span>总计: {todos.length} 项</span>
						<span>已完成: {todos.filter(t => t.is_complete).length} 项</span>
						<span>进行中: {todos.filter(t => !t.is_complete).length} 项</span>
					</div>
				</div>

				{/* Todo 列表 */}
				<div className="space-y-4">
					{todos.length === 0 ? (
						<div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
							<p className="text-lg">暂无 Todo 项目</p>
							<p className="text-sm mt-2">点击上方表单添加你的第一个 Todo</p>
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
	)
}