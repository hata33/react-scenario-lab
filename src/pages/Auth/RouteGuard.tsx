'use client'

import { useEffect, useState } from 'react';

export default function RouteGuard() {
  // 初始状态设为null（未确定），避免服务端渲染时的判断
  const [authed, setAuthed] = useState<boolean | null>(null);

  // 在客户端 hydration 完成后再访问 localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthed(Boolean(token));
  }, []);

  // 服务端渲染或客户端未加载完成时，显示加载状态（可选）
  if (authed === null) {
    return null; // 或 <div>加载中...</div>
  }

  if (!authed) {
    return <div>请先登录</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">路由守卫示例</h2>
      <div className="text-gray-600">只有登录状态可以看到这段内容。</div>
    </div>
  );
}
    