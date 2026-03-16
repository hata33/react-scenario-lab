import { useState } from "react";

export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">文件上传</h2>
			<input
				type="file"
				className="min-h-[44px] file:mr-4 file:rounded file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:font-semibold file:text-sm file:text-white hover:file:bg-gray-700"
				onChange={(e) => setFile(e.target.files?.[0] ?? null)}
			/>
			{file && (
				<div className="mt-3 text-gray-600 text-sm md:text-base">
					已选择：{file.name}（{Math.round(file.size / 1024)} KB）
				</div>
			)}
		</div>
	);
}
