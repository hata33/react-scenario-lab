import { useState } from "react";

export default function ElementAnimation() {
	const [on, setOn] = useState(false);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">元素动画</h2>
			<button className="rounded bg-gray-900 px-3 py-2 text-white" onClick={() => setOn((v) => !v)}>
				{on ? "隐藏" : "显示"}
			</button>
			<div
				className={`mt-4 transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
			>
				<div className="rounded border bg-white p-4">一个有过渡效果的卡片</div>
			</div>
		</div>
	);
}
