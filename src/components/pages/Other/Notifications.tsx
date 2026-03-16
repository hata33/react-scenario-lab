import { useState } from "react";

type Notice = { id: number; text: string };

export default function Notifications() {
	const [list, setList] = useState<Notice[]>([]);
	const push = () => setList((arr) => [...arr, { id: Date.now(), text: `消息 ${arr.length + 1}` }]);
	const remove = (id: number) => setList((arr) => arr.filter((i) => i.id !== id));
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">通知</h2>
			<button
				className="min-h-[44px] touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
				onClick={push}
			>
				来一条
			</button>
			<div className="mt-4 space-y-2">
				{list.map((n) => (
					<div key={n.id} className="flex items-center justify-between rounded border bg-white p-3">
						<span>{n.text}</span>
						<button
							className="min-h-[44px] min-w-[44px] touch-manipulation text-gray-500 transition-transform active:scale-95"
							onClick={() => remove(n.id)}
						>
							关闭
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
