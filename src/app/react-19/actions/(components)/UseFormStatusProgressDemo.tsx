"use client";

import { useState } from "react";
import { FormStatusContext } from "./hooks";
import UploadButton from "./UploadButton";

export default function UseFormStatusProgressDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isPending, setIsPending] = useState(false);
	const [formContextData, setFormContextData] = useState<FormData | null>(null);

	const uploadFile = async (formData: FormData) => {
		const file = formData.get("file") as File;

		// 模拟文件上传进度
		for (let i = 0; i <= 100; i += 10) {
			await new Promise((resolve) => setTimeout(resolve, 200));
			setUploadProgress(i);
		}

		console.log("文件上传完成:", file.name);
		return { success: true, message: "文件上传成功！" };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		setFormContextData(formData);
		setIsPending(true);
		setUploadProgress(0);

		await uploadFile(formData);

		setIsPending(false);
		setFormContextData(null);
	};

	return (
		<FormStatusContext.Provider value={{ pending: isPending, data: formContextData }}>
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
				<h5 className="mb-3 font-semibold text-gray-800">📤 文件上传进度场景</h5>
				<form onSubmit={handleSubmit} className="max-w-md space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">选择文件</label>
						<input
							type="file"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>

					<UploadButton />

					{uploadProgress > 0 && (
						<div className="mt-4">
							<div className="mb-2 flex items-center justify-between">
								<span className="font-medium text-gray-700 text-sm">上传进度</span>
								<span className="text-gray-600 text-sm">{uploadProgress}%</span>
							</div>
							<div className="h-2 w-full rounded-full bg-gray-200">
								<div
									className="h-2 rounded-full bg-blue-600 transition-all duration-300"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
						</div>
					)}

					<div className="rounded-md bg-green-50 p-4">
						<p className="text-green-700 text-sm">💡 注意：上传按钮基于表单状态自动禁用/启用，并显示上传进度！</p>
					</div>
				</form>
			</div>
		</FormStatusContext.Provider>
	);
}
