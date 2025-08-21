import { useState } from "react";

export default function DragDrop() {
	const [items, setItems] = useState<string[]>(["A", "B", "C", "D"]);
	const [drag, setDrag] = useState<number | null>(null);

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">拖拽</h2>
			<div className="flex gap-2">
				{items.map((it, idx) => (
					<div
						key={it}
						draggable
						onDragStart={() => setDrag(idx)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => {
							if (drag === null || drag === idx) return;
							const next = [...items];
							const [moved] = next.splice(drag, 1);
							next.splice(idx, 0, moved);
							setItems(next);
							setDrag(null);
						}}
						className="cursor-move select-none rounded border bg-white px-4 py-2"
					>
						{it}
					</div>
				))}
			</div>
		</div>
	);
}
