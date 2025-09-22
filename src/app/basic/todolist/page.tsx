"use client";

import Layout from "@/components/Layout";
import TodoList from "@/components/pages/Basic/TodoList";

export default function TodoListPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">TodoList 待办</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<TodoList />
				</div>
			</div>
		</Layout>
	);
}
