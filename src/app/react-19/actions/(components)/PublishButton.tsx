"use client";

import { useFormStatus } from "./hooks";

export default function PublishButton() {
	const { pending, data } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
				pending ? "cursor-not-allowed bg-blue-400 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
			}`}
		>
			{pending ? "发布中..." : "🚀 发布文章"}
			{data && (
				<p className="mt-1 text-blue-100 text-xs">正在发布: {(data.get("message") as string)?.substring(0, 20)}...</p>
			)}
		</button>
	);
}
