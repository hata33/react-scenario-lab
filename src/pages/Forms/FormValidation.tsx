import { useState } from 'react'

export default function FormValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    const ok = /\S+@\S+\.\S+/.test(email)
    setError(ok ? '' : '请输入合法邮箱地址')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">表单校验</h2>
      <div className="max-w-md">
        <input className={`border rounded px-3 py-2 w-full ${error ? 'border-red-500' : ''}`} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
        <button className="mt-3 px-3 py-2 rounded bg-gray-900 text-white" onClick={submit}>提交</button>
      </div>
    </div>
  )
}


