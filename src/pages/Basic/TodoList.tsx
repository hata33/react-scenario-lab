import { useMemo, useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export default function TodoList() {
	const [text, setText] = useState("");
	const [items, setItems] = useState<Todo[]>([]);
	const left = useMemo(() => items.filter((i) => !i.done).length, [items]);

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">TodoList 待办</h2>
			<div className="mb-3 flex gap-2">
				<input
					className="w-80 rounded border px-3 py-2"
					placeholder="输入待办..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && text.trim()) {
							setItems((arr) => [
								...arr,
								{ id: Date.now(), text: text.trim(), done: false },
							]);
							setText("");
						}
					}}
				/>
				<button
					className="rounded bg-gray-900 px-3 py-2 text-white"
					onClick={() => {
						if (!text.trim()) return;
						setItems((arr) => [
							...arr,
							{ id: Date.now(), text: text.trim(), done: false },
						]);
						setText("");
					}}
				>
					添加
				</button>
			</div>

			<ul className="space-y-2">
				{items.map((item) => (
					<li key={item.id} className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={item.done}
							onChange={(e) =>
								setItems((arr) =>
									arr.map((it) =>
										it.id === item.id
											? { ...it, done: (e.target as HTMLInputElement).checked }
											: it,
									),
								)
							}
						/>
						<span className={item.done ? "text-gray-400 line-through" : ""}>
							{item.text}
						</span>
						<button
							className="ml-auto text-red-600 text-sm"
							onClick={() =>
								setItems((arr) => arr.filter((it) => it.id !== item.id))
							}
						>
							删除
						</button>
					</li>
				))}
			</ul>

			<div className="mt-3 text-gray-600 text-sm">剩余：{left}</div>
		</div>
	);
}
