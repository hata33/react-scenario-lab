import { useMemo, useState } from "react";

type Item = { id: number; name: string };
const all: Item[] = Array.from({ length: 30 }).map((_, i) => ({
	id: i + 1,
	name: `Product ${i + 1}`,
}));

export default function SearchFilter() {
	const [q, setQ] = useState("");
	const list = useMemo(() => all.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())), [q]);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-responsive-base md:text-responsive-xl">搜索/筛选</h2>
			<input
				className="min-h-[44px] w-full rounded border px-3 py-3 text-base"
				placeholder="搜索..."
				value={q}
				onChange={(e) => setQ(e.target.value)}
			/>
			<ul className="mt-3 grid grid-cols-1 gap-2">
				{list.map((i) => (
					<li key={i.id} className="rounded border bg-white px-3 py-2">
						{i.name}
					</li>
				))}
			</ul>
		</div>
	);
}
