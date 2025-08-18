'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { routeGroups } from '@/routeDefs'
import Sidebar, { type MenuItem } from './Sidebar'
import FirstVisitConfetti from './FirstVisitConfetti'

function flattenRoutesForMenu(routesInput: any[], basePath = ''): MenuItem[] {
  return routesInput
    .filter(Boolean)
    .map((route) => {
      const currentPath = route.index ? basePath : `${basePath}/${route.path ?? ''}`.replace(/\/+/, '/').replace(/\/$/, '') || '/'
      const item: MenuItem = {
        path: currentPath || '/',
        title: route.meta?.title,
        children: [],
      }
      if (route.children?.length) {
        item.children = flattenRoutesForMenu(route.children, currentPath === '/' ? '' : currentPath)
      }
      return item
    })
}

// 为 Next.js 路由生成正确的菜单结构
const menuTree: MenuItem[] = routeGroups.map((group) => ({
  path: `/${group.path}`,
  title: group.title,
  children: group.children.map((child) => ({
    path: `/${group.path}/${child.path}`,
    title: child.title,
  })),
}))

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const activePath = pathname || '/'
  // 关键修复：初始状态设为false，避免服务端/客户端差异
  const [pinnedOpen, setPinnedOpen] = useState<boolean>(false)
  const [hoverOpen, setHoverOpen] = useState(true)
  const isOpen = pinnedOpen || hoverOpen
  const initialPathRef = useRef(activePath)
  const hasAutoClosedRef = useRef(false)

  // 关键修复：在客户端hydration完成后再读取localStorage
  useEffect(() => {
    const handleLoad = () => {
      try {
        // 客户端渲染时才读取localStorage
        const sidebarSeen = localStorage.getItem('sidebarSeen')
        setPinnedOpen(sidebarSeen !== '1')
      } catch {
        // 处理localStorage不可用的情况
        setPinnedOpen(true)
      }
    }
    
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        setPinnedOpen((v) => !v)
        setHoverOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // 首次进入显示侧栏，首次发生路由跳转后自动收起并记忆
  useEffect(() => { 
    if (typeof window !== 'undefined') { 
        setPinnedOpen(false)
        setHoverOpen(false)
        try { localStorage.setItem('sidebarSeen', '1') } catch {}
        hasAutoClosedRef.current = true 
    }
  }, [activePath])

  return (
    <div className={`h-screen grid grid-cols-[auto_1fr] relative bg-gray-50`}>
      <FirstVisitConfetti />
      {/* 左侧边缘悬停热区：非按钮交互，移到左侧边缘自动显示 */}
      <div className="absolute left-0 top-0 h-full w-2 z-30" onMouseEnter={() => !pinnedOpen && setHoverOpen(true)} />

      {/* 侧栏列容器：通过宽度折叠，内部绝对定位侧栏避免占位与透出 */}
      <div
        className={`relative transition-[width] duration-200 ease-in-out ${isOpen ? 'w-[260px]' : 'w-0'} overflow-hidden`}
        onMouseEnter={() => !pinnedOpen && setHoverOpen(true)}
        onMouseLeave={() => !pinnedOpen && setHoverOpen(false)}
      >
        <div className={`absolute inset-0 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'} transition-transform duration-200 ease-in-out`}>
          <Sidebar menuTree={menuTree} activePath={activePath} />
        </div>
      </div>

      <main className="h-screen overflow-y-auto bg-gray-50">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
