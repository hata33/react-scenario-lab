import { useState } from 'react'

export default function StepForm() {
  const [step, setStep] = useState(1)
  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">分步表单</h2>
      <div className="mb-4 text-sm text-gray-600">当前步骤：{step} / 3</div>
      <div className="border rounded p-4 max-w-xl">
        {step === 1 && <div>步骤一：填写基本信息</div>}
        {step === 2 && <div>步骤二：填写详细信息</div>}
        {step === 3 && <div>步骤三：确认提交</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-2 rounded bg-gray-100" onClick={prev}>上一步</button>
        <button className="px-3 py-2 rounded bg-gray-900 text-white" onClick={next}>下一步</button>
      </div>
    </div>
  )
}


