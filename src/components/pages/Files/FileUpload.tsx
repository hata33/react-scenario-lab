import { useState } from "react";

export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">文件上传</h2>
			<input
				type="file"
				onChange={(e) => setFile(e.target.files?.[0] ?? null)}
			/>
			{file && (
				<div className="mt-3 text-gray-600 text-sm">
					已选择：{file.name}（{Math.round(file.size / 1024)} KB）
				</div>
			)}
		</div>
	);
}
