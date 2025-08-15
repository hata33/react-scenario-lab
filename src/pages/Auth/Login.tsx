import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [user, setUser] = useState('')
  const nav = useNavigate()
  const login = () => {
    if (!user.trim()) return
    localStorage.setItem('token', 'demo')
    nav('/')
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">登录</h2>
      <div className="max-w-sm">
        <input className="border rounded px-3 py-2 w-full" placeholder="用户名" value={user} onChange={(e) => setUser(e.target.value)} />
        <button className="mt-3 px-3 py-2 rounded bg-gray-900 text-white" onClick={login}>登录</button>
      </div>
    </div>
  )
}


