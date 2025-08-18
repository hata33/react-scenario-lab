import Link from 'next/link'

export type MenuItem = { path: string; title?: string; children?: MenuItem[] }

type SidebarProps = {
  menuTree: MenuItem[]
  activePath: string
}

export default function Sidebar({ menuTree, activePath }: SidebarProps) {
  return (
    <aside className="h-screen border-r bg-white flex flex-col">
      <div className="px-4 py-4 border-b shrink-0">
        <h1 className="text-xl font-semibold">React Scenario Lab</h1>
        <p className="text-xs text-gray-500">Next.js 15 + React 19 + Tailwind</p>
      </div>
      <nav className="p-3 space-y-4 overflow-y-auto grow">
        {menuTree.map((group) => (
          <div key={group.title}>
            <div className="px-2 text-sm font-medium text-gray-700 uppercase tracking-wide">
              {group.title}
            </div>
            <ul className="mt-2 space-y-1">
              {group.children?.map((child) => (
                <li key={child.path}>
                  <Link
                    href={child.path}
                    className={`block rounded px-3 py-2 text-sm transition-colors duration-150 ${
                      activePath === child.path
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* 底部提示区域 */}
      <div className="px-4 py-3 border-t text-xs text-gray-500">
        <p>快捷键: Ctrl/Cmd + B 切换侧边栏</p>
        <p className="text-blue-600 mt-1">点击菜单后侧边栏自动隐藏</p>
      </div>
    </aside>
  )
}


