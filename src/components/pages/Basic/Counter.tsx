import { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl text-responsive-lg">Counter 计数器</h2>
			<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
				<button
					className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded bg-gray-900 px-4 py-3 text-white active:scale-95"
					onClick={() => setCount((v) => v - 1)}
					aria-label="减少计数"
				>
					<span className="text-xl">-</span>
				</button>
				<span className="w-16 text-center text-lg text-responsive-base">{count}</span>
				<button
					className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded bg-gray-900 px-4 py-3 text-white active:scale-95"
					onClick={() => setCount((v) => v + 1)}
					aria-label="增加计数"
				>
					<span className="text-xl">+</span>
				</button>
			</div>
		</div>
	);
}
