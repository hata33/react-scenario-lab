import { useMemo, useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export default function TodoList() {
	const [text, setText] = useState("");
	const [items, setItems] = useState<Todo[]>([]);
	const left = useMemo(() => items.filter((i) => !i.done).length, [items]);

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl text-responsive-lg md:text-3xl">TodoList 待办</h2>
			<div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
				<input
					className="min-h-[44px] flex-1 touch-manipulation rounded border px-4 py-3 text-responsive-base"
					placeholder="输入待办..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && text.trim()) {
							setItems((arr) => [...arr, { id: Date.now(), text: text.trim(), done: false }]);
							setText("");
						}
					}}
					aria-label="输入待办事项"
				/>
				<button
					className="flex min-h-[44px] min-w-[88px] touch-manipulation items-center justify-center rounded bg-gray-900 px-6 py-3 text-white transition-transform active:scale-95"
					onClick={() => {
						if (!text.trim()) return;
						setItems((arr) => [...arr, { id: Date.now(), text: text.trim(), done: false }]);
						setText("");
					}}
					aria-label="添加待办事项"
				>
					添加
				</button>
			</div>

			<ul className="space-y-3">
				{items.map((item) => (
					<li
						key={item.id}
						className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
					>
						<input
							type="checkbox"
							className="mt-1 h-5 w-5"
							checked={item.done}
							onChange={(e) =>
								setItems((arr) =>
									arr.map((it) => (it.id === item.id ? { ...it, done: (e.target as HTMLInputElement).checked } : it)),
								)
							}
							aria-label={`标记 ${item.text} 为${item.done ? "未完成" : "已完成"}`}
						/>
						<span className={`flex-1 text-responsive-base ${item.done ? "text-gray-400 line-through" : ""}`}>
							{item.text}
						</span>
						<button
							className="ml-auto flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded bg-red-50 px-4 py-2 text-red-600 transition-colors hover:bg-red-100 active:scale-95"
							onClick={() => setItems((arr) => arr.filter((it) => it.id !== item.id))}
							aria-label={`删除 ${item.text}`}
						>
							删除
						</button>
					</li>
				))}
			</ul>

			{items.length > 0 && <div className="mt-4 text-gray-600 text-responsive-sm">剩余：{left}</div>}
		</div>
	);
}
