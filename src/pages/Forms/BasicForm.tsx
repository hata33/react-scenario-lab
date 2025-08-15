import { useState } from 'react'

type FormState = { name: string; email: string }

export default function BasicForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '' })
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">基础表单</h2>
      <div className="grid gap-3 max-w-md">
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">姓名</span>
          <input className="border rounded px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">邮箱</span>
          <input className="border rounded px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <button className="px-3 py-2 rounded bg-gray-900 text-white w-max" onClick={() => alert(JSON.stringify(form, null, 2))}>提交</button>
      </div>
    </div>
  )
}


