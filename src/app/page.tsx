import Layout from '@/components/Layout'
import { routeGroups } from '@/routeDefs'

export default function HomePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">React Scenario Lab</h1>
        <p className="text-lg text-gray-600 mb-8">
          欢迎使用 React Scenario Lab！这是一个基于 Next.js 15 和 React 19 的组件实验室。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routeGroups.map((group) => (
            <div key={group.path} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{group.title}</h2>
              <ul className="space-y-2">
                {group.children.map((child) => (
                  <li key={child.path}>
                    <a
                      href={`/${group.path}/${child.path}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
