import { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">Counter 计数器</h2>
			<div className="flex items-center gap-3">
				<button
					className="rounded bg-gray-900 px-3 py-1 text-white"
					onClick={() => setCount((v) => v - 1)}
				>
					-
				</button>
				<span className="w-16 text-center text-lg">{count}</span>
				<button
					className="rounded bg-gray-900 px-3 py-1 text-white"
					onClick={() => setCount((v) => v + 1)}
				>
					+
				</button>
			</div>
		</div>
	);
}
