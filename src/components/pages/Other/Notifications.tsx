import { useState } from "react";

type Notice = { id: number; text: string };

export default function Notifications() {
	const [list, setList] = useState<Notice[]>([]);
	const push = () =>
		setList((arr) => [
			...arr,
			{ id: Date.now(), text: `消息 ${arr.length + 1}` },
		]);
	const remove = (id: number) =>
		setList((arr) => arr.filter((i) => i.id !== id));
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">通知</h2>
			<button
				className="rounded bg-gray-900 px-3 py-2 text-white"
				onClick={push}
			>
				来一条
			</button>
			<div className="mt-4 space-y-2">
				{list.map((n) => (
					<div
						key={n.id}
						className="flex items-center justify-between rounded border bg-white p-3"
					>
						<span>{n.text}</span>
						<button
							className="text-gray-500 text-sm"
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
