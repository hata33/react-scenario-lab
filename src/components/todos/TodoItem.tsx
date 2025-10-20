'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
	todo: Todo
	onUpdate: (id: number, updates: Partial<Todo>) => Promise<void>
	onDelete: (id: number) => Promise<void>
	onToggleComplete: (id: number, isComplete: boolean) => Promise<void>
}

export default function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(todo.title)
	const [editDescription, setEditDescription] = useState(todo.description || '')
	const [loading, setLoading] = useState(false)

	const priorityColors: Record<number, string> = {
		1: 'bg-green-100 text-green-800',
		2: 'bg-blue-100 text-blue-800',
		3: 'bg-yellow-100 text-yellow-800',
		4: 'bg-orange-100 text-orange-800',
		5: 'bg-red-100 text-red-800',
	}

	const priorityLabels: Record<number, string> = {
		1: '低',
		2: '中',
		3: '高',
		4: '紧急',
		5: '非常紧急',
	}

	const handleSave = async () => {
		if (!editTitle.trim()) return

		setLoading(true)
		try {
			await onUpdate(todo.id, {
				title: editTitle.trim(),
				description: editDescription.trim() || undefined,
			})
			setIsEditing(false)
		} catch (error) {
			console.error('Error updating todo:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleCancel = () => {
		setEditTitle(todo.title)
		setEditDescription(todo.description || '')
		setIsEditing(false)
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('zh-CN')
	}

	return (
		<div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
			todo.is_complete ? 'border-gray-300 opacity-60' : 'border-blue-500'
		}`}>
			<div className="flex items-start gap-4">
				<input
					type="checkbox"
					checked={todo.is_complete}
					onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
					className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
				/>

				<div className="flex-1">
					{isEditing ? (
						<div className="space-y-2">
							<input
								type="text"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<textarea
								value={editDescription}
								onChange={(e) => setEditDescription(e.target.value)}
								className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								rows={2}
							/>
							<div className="flex gap-2">
								<button
									onClick={handleSave}
									disabled={loading}
									className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
								>
									保存
								</button>
								<button
									onClick={handleCancel}
									className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								>
									取消
								</button>
							</div>
						</div>
					) : (
						<div>
							<h3 className={`font-semibold text-lg ${
								todo.is_complete ? 'line-through text-gray-500' : 'text-gray-900'
							}`}>
								{todo.title}
							</h3>
							{todo.description && (
								<p className="text-gray-600 mt-1">{todo.description}</p>
							)}

							<div className="flex flex-wrap items-center gap-2 mt-3">
								<span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority] || 'bg-gray-100 text-gray-800'}`}>
									{priorityLabels[todo.priority] || '未知'}
								</span>

								{todo.due_date && (
									<span className="text-xs text-gray-500">
										截止: {formatDate(todo.due_date)}
									</span>
								)}

								{todo.tags.map((tag, index) => (
									<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
										{tag}
									</span>
								))}

								<span className="text-xs text-gray-400">
									创建: {formatDate(todo.created_at)}
								</span>
							</div>
						</div>
					)}
				</div>

				{!isEditing && (
					<div className="flex gap-2">
						<button
							onClick={() => setIsEditing(true)}
							className="p-2 text-blue-600 hover:bg-blue-50 rounded"
						>
							编辑
						</button>
						<button
							onClick={() => onDelete(todo.id)}
							className="p-2 text-red-600 hover:bg-red-50 rounded"
						>
							删除
						</button>
					</div>
				)}
			</div>
		</div>
	)
}