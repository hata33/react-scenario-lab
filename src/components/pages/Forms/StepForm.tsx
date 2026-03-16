import { useState } from "react";

export default function StepForm() {
	const [step, setStep] = useState(1);
	const next = () => setStep((s) => Math.min(3, s + 1));
	const prev = () => setStep((s) => Math.max(1, s - 1));

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">分步表单</h2>
			<div className="mb-4 text-gray-600 text-sm md:text-base">当前步骤：{step} / 3</div>
			<div className="max-w-xl rounded border p-4 md:p-6">
				{step === 1 && <div>步骤一：填写基本信息</div>}
				{step === 2 && <div>步骤二：填写详细信息</div>}
				{step === 3 && <div>步骤三：确认提交</div>}
			</div>
			<div className="mt-3 flex flex-col gap-2 sm:flex-row">
				<button
					className="min-h-[44px] touch-manipulation rounded bg-gray-100 px-4 py-3 transition-transform active:scale-95"
					onClick={prev}
				>
					上一步
				</button>
				<button
					className="min-h-[44px] touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
					onClick={next}
				>
					下一步
				</button>
			</div>
		</div>
	);
}
