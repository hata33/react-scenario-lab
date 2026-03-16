import { useState } from "react";

type FormState = { name: string; email: string };

export default function BasicForm() {
	const [form, setForm] = useState<FormState>({ name: "", email: "" });
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">基础表单</h2>
			<div className="grid max-w-md gap-3">
				<label className="grid gap-1">
					<span className="text-gray-600 text-sm">姓名</span>
					<input
						className="min-h-[44px] rounded border px-3 py-3 text-base"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
				</label>
				<label className="grid gap-1">
					<span className="text-gray-600 text-sm">邮箱</span>
					<input
						className="min-h-[44px] rounded border px-3 py-3 text-base"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>
				</label>
				<button
					className="min-h-[44px] touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
					onClick={() => alert(JSON.stringify(form, null, 2))}
				>
					提交
				</button>
			</div>
		</div>
	);
}
