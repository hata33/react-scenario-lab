"use client";

import type { TodoFilters } from "@/types/todo";

interface FilterControlsProps {
	filters: TodoFilters;
	onChange: (filters: TodoFilters) => void;
}

export default function FilterControls({ filters, onChange }: FilterControlsProps) {
	const handleStatusChange = (status: TodoFilters["status"]) => {
		onChange({ ...filters, status });
	};

	const handlePriorityChange = (priority: number | undefined) => {
		onChange({ ...filters, priority });
	};

	const handleSearchChange = (search: string) => {
		onChange({ ...filters, search: search || undefined });
	};

	return (
		<div className="rounded-lg bg-white p-4 shadow-md">
			<h3 className="mb-4 font-semibold text-lg">筛选条件</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">状态</label>
					<div className="flex gap-2">
						<button
							onClick={() => handleStatusChange("all")}
							className={`rounded px-3 py-1 ${
								filters.status === "all" || !filters.status
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							全部
						</button>
						<button
							onClick={() => handleStatusChange("active")}
							className={`rounded px-3 py-1 ${
								filters.status === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							进行中
						</button>
						<button
							onClick={() => handleStatusChange("completed")}
							className={`rounded px-3 py-1 ${
								filters.status === "completed"
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							已完成
						</button>
					</div>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">优先级</label>
					<select
						value={filters.priority || ""}
						onChange={(e) => handlePriorityChange(e.target.value ? Number(e.target.value) : undefined)}
						className="w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">全部优先级</option>
						<option value={1}>低</option>
						<option value={2}>中</option>
						<option value={3}>高</option>
						<option value={4}>紧急</option>
						<option value={5}>非常紧急</option>
					</select>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">搜索</label>
					<input
						type="text"
						value={filters.search || ""}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder="搜索标题..."
						className="w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
	);
}
