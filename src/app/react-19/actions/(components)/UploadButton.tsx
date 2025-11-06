"use client";

import { useFormStatus } from "./hooks";

export default function UploadButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
				pending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-green-500 text-white hover:bg-green-600"
			}`}
		>
			{pending ? "上传中..." : "📤 开始上传"}
		</button>
	);
}
