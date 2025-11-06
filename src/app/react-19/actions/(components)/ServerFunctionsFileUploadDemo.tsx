"use client";

import { useState } from "react";

export default function ServerFunctionsFileUploadDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploadResult, setUploadResult] = useState<{ success?: boolean; message?: string; url?: string } | null>(null);
	const [isPending, setIsPending] = useState(false);

	const uploadFile = async (file: File) => {
		// 模拟 Server Function 文件上传
		await new Promise((resolve) => setTimeout(resolve, 2000));

		if (!file) {
			return { success: false, message: "请选择文件" };
		}

		if (file.size > 5 * 1024 * 1024) {
			return { success: false, message: "文件大小不能超过 5MB" };
		}

		// 模拟成功上传
		return {
			success: true,
			message: "文件上传成功！",
			url: `https://example.com/files/${file.name}`,
		};
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		setIsPending(true);
		setUploadResult(null);

		const result = await uploadFile(file);
		setUploadResult(result);
		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📁 服务端文件上传</h5>
			<form onSubmit={handleUpload} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">选择文件</label>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
					/>
					{file && (
						<p className="mt-1 text-gray-500 text-xs">
							已选择: {file.name} ({(file.size / 1024).toFixed(2)} KB)
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending || !file}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending || !file
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "上传中..." : "🚀 上传文件"}
				</button>

				{uploadResult && (
					<div
						className={`rounded-md px-4 py-3 ${
							uploadResult.success
								? "border-green-200 bg-green-50 text-green-700"
								: "border-red-200 bg-red-50 text-red-700"
						}`}
					>
						{uploadResult.message}
						{uploadResult.success && uploadResult.url && <p className="mt-1 text-xs">访问地址: {uploadResult.url}</p>}
					</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：文件大小限制为 5MB</div>
			</form>
		</div>
	);
}
