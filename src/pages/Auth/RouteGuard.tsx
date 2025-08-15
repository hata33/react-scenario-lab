import { Navigate } from 'react-router-dom'

export default function RouteGuard() {
  const authed = Boolean(localStorage.getItem('token'))
  if (!authed) return <Navigate to="/auth/login" replace />
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">路由守卫示例</h2>
      <div className="text-gray-600">只有登录状态可以看到这段内容。</div>
    </div>
  )
}


