import { useState } from "react";

export default function FormValidation() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const submit = () => {
		const ok = /\S+@\S+\.\S+/.test(email);
		setError(ok ? "" : "请输入合法邮箱地址");
	};

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">表单校验</h2>
			<div className="max-w-md">
				<input
					className={`min-h-[44px] w-full rounded border px-3 py-3 text-base ${error ? "border-red-500" : ""}`}
					placeholder="you@example.com"
					aria-label="邮箱地址"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{error && (
					<div className="mt-1 text-red-600 text-sm" role="alert">
						{error}
					</div>
				)}
				<button
					className="mt-3 min-h-[44px] w-full touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
					onClick={submit}
				>
					提交
				</button>
			</div>
		</div>
	);
}
