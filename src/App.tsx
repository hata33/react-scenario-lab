import { Outlet, useMatches } from 'react-router-dom'
import { routeGroups } from './routeDefs'
import Sidebar, { type MenuItem } from './components/Sidebar'
import FirstVisitConfetti from './components/FirstVisitConfetti'

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

const categoryNodes = routeGroups.map((g) => ({ path: g.path, meta: { title: g.title }, children: g.children.map((c) => ({ path: c.path, meta: { title: c.title } })) }))
const menuTree = flattenRoutesForMenu(categoryNodes as any)

export default function App() {
  const matches = useMatches()
  const activePath = (matches[matches.length - 1] as any)?.pathname || '/'

  return (
    <div className="h-screen grid grid-cols-[260px_1fr] relative">
      <FirstVisitConfetti />
      <Sidebar menuTree={menuTree} activePath={activePath} />
      <main className="h-screen overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}


