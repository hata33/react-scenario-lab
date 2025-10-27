export interface Todo {
	id: number;
	created_at: string;
	user_id: string;
	title: string;
	description?: string;
	is_complete: boolean;
	priority: number;
	due_date?: string;
	tags: string[];
	updated_at: string;
}

export interface TodoFormData {
	title: string;
	description?: string;
	priority: number;
	due_date?: string;
	tags: string[];
}

export interface TodoFilters {
	status?: "all" | "active" | "completed";
	priority?: number;
	tags?: string[];
	search?: string;
}
