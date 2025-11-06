"use client";

import { useState } from "react";
import { FormStatusContext } from "./hooks";
import PublishButton from "./PublishButton";

export default function UseFormStatusMultiButtonDemo() {
	const [message, setMessage] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [formContextData, setFormContextData] = useState<FormData | null>(null);

	const publishPost = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const msg = formData.get("message") as string;
		console.log("发布文章:", msg);
	};

	const saveDraft = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const msg = formData.get("message") as string;
		console.log("保存草稿:", msg);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		const formData = new FormData();
		formData.append("message", message);
		setFormContextData(formData);
		await publishPost(formData);
		setIsPending(false);
		setFormContextData(null);
	};

	return (
		<FormStatusContext.Provider value={{ pending: isPending, data: formContextData }}>
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
				<h5 className="mb-3 font-semibold text-gray-800">📝 多按钮表单场景</h5>
				<form onSubmit={handleSubmit} className="max-w-md space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">文章内容</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
							rows={4}
							placeholder="写下您的想法..."
						/>
					</div>

					<div className="flex gap-2">
						<PublishButton />
						<button
							onClick={async (e) => {
								e.preventDefault();
								setIsPending(true);
								const formData = new FormData();
								formData.append("message", message);
								setFormContextData(formData);
								await saveDraft(formData);
								setIsPending(false);
								setFormContextData(null);
							}}
							disabled={isPending}
							className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
								isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-gray-500 text-white hover:bg-gray-600"
							}`}
						>
							💾 保存草稿
						</button>
					</div>

					<div className="rounded-md bg-blue-50 p-4">
						<p className="text-blue-700 text-sm">
							💡 注意：发布按钮会显示表单状态，保存草稿按钮使用 formAction 处理不同操作！
						</p>
					</div>
				</form>
			</div>
		</FormStatusContext.Provider>
	);
}
