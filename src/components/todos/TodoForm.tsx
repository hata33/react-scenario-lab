'use client'

import { useState } from 'react'
import { TodoFormData } from '@/types/todo'

interface TodoFormProps {
	onSubmit: (todoData: TodoFormData) => Promise<void>
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [priority, setPriority] = useState(1)
	const [dueDate, setDueDate] = useState('')
	const [tags, setTags] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) return

		setLoading(true)
		try {
			const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean)
			await onSubmit({
				title: title.trim(),
				description: description.trim() || undefined,
				priority,
				due_date: dueDate || undefined,
				tags: tagsArray,
			})

			// Reset form
			setTitle('')
			setDescription('')
			setPriority(1)
			setDueDate('')
			setTags('')
		} catch (error) {
			console.error('Error submitting todo:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">添加新 Todo</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						标题 *
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						描述
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							优先级
						</label>
						<select
							value={priority}
							onChange={(e) => setPriority(Number(e.target.value))}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value={1}>低</option>
							<option value={2}>中</option>
							<option value={3}>高</option>
							<option value={4}>紧急</option>
							<option value={5}>非常紧急</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							截止日期
						</label>
						<input
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						标签 (用逗号分隔)
					</label>
					<input
						type="text"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="工作, 重要, 会议"
					/>
				</div>

				<button
					type="submit"
					disabled={loading || !title.trim()}
					className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? '添加中...' : '添加 Todo'}
				</button>
			</form>
		</div>
	)
}