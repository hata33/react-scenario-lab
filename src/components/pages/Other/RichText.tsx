import { useState } from "react";

export default function RichText() {
	const [value, setValue] = useState("<p><b>富文本</b> 内容示例</p>");
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">富文本</h2>
			<textarea
				className="h-48 w-full max-w-2xl rounded border p-3"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div
				className="mt-4 rounded border bg-white p-4"
				dangerouslySetInnerHTML={{ __html: value }}
			/>
		</div>
	);
}
