import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">主题切换</h2>
			<button
				className="rounded bg-gray-900 px-3 py-2 text-white"
				onClick={() => setDark((v) => !v)}
			>
				{dark ? "切到浅色" : "切到深色"}
			</button>
			<div className="mt-4 rounded border bg-white p-4 transition-colors dark:bg-gray-800 dark:text-white">
				当前主题：{dark ? "Dark" : "Light"}
			</div>
		</div>
	);
}
