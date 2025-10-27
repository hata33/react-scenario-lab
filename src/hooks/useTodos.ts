"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Database } from "@/types/database";
import type { Todo, TodoFilters, TodoFormData } from "@/types/todo";

export function useTodos() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<TodoFilters>({});

	// 获取 Todos
	const fetchTodos = async () => {
		try {
			let query = supabase.from("todos").select("*").order("created_at", { ascending: false });

			// 应用过滤器
			if (filters.status === "active") {
				query = query.eq("is_complete", false);
			} else if (filters.status === "completed") {
				query = query.eq("is_complete", true);
			}

			if (filters.priority) {
				query = query.eq("priority", filters.priority);
			}

			if (filters.search) {
				query = query.ilike("title", `%${filters.search}%`);
			}

			if (filters.tags && filters.tags.length > 0) {
				query = query.contains("tags", filters.tags);
			}

			const { data, error } = await query;

			if (error) throw error;
			setTodos(data || []);
		} catch (error) {
			console.error("Error fetching todos:", error);
		} finally {
			setLoading(false);
		}
	};

	// 添加 Todo
	const addTodo = async (todoData: TodoFormData) => {
		try {
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user) throw new Error("User not authenticated");

			const { data, error } = await supabase
				.from("todos")
				.insert({
					...todoData,
					user_id: userData.user.id,
				} as any)
				.select()
				.single();

			if (error) throw error;
			setTodos((prev) => [data, ...prev]);
			return data;
		} catch (error) {
			console.error("Error adding todo:", error);
			throw error;
		}
	};

	// 更新 Todo
	const updateTodo = async (id: number, updates: Partial<Todo>) => {
		try {
			const { data, error } = await (supabase as any)
				.from("todos")
				.update({ ...updates, updated_at: new Date().toISOString() })
				.eq("id", id)
				.select()
				.single();

			if (error) throw error;
			setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
			return data;
		} catch (error) {
			console.error("Error updating todo:", error);
			throw error;
		}
	};

	// 删除 Todo
	const deleteTodo = async (id: number) => {
		try {
			const { error } = await supabase.from("todos").delete().eq("id", id);

			if (error) throw error;
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("Error deleting todo:", error);
			throw error;
		}
	};

	// 切换完成状态
	const toggleComplete = async (id: number, isComplete: boolean) => {
		await updateTodo(id, { is_complete: isComplete });
	};

	useEffect(() => {
		fetchTodos();
	}, [filters]);

	// 实时订阅
	useEffect(() => {
		const channel = supabase
			.channel("todos")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
				},
				(payload) => {
					console.log("Change received!", payload);
					fetchTodos();
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, []);

	return {
		todos,
		loading,
		filters,
		setFilters,
		addTodo,
		updateTodo,
		deleteTodo,
		toggleComplete,
		fetchTodos,
	};
}
