import Layout from "@/components/Layout";
import Link from "next/link";

export const metadata = {
  title: "移动端开发",
  description: "企业级移动端开发解决方案，涵盖响应式设计、设备API、PWA等功能",
};

export default function MobilePage() {
  const features = [
    {
      href: "/mobile/responsive-design",
      title: "响应式设计系统",
      description: "断点系统、触摸交互、移动端导航",
      icon: "📱"
    },
    {
      href: "/mobile/device-api",
      title: "设备API集成",
      description: "地理位置、摄像头、陀螺仪、震动反馈",
      icon: "🔧"
    },
    {
      href: "/mobile/pwa",
      title: "PWA功能",
      description: "Service Worker、离线缓存、推送通知",
      icon: "⚙️"
    },
    {
      href: "/mobile/performance",
      title: "性能优化",
      description: "图片优化、代码分割、网络优化",
      icon: "⚡"
    },
    {
      href: "/mobile/forms",
      title: "移动端表单",
      description: "输入优化、表单验证、文件上传",
      icon: "📝"
    },
    {
      href: "/mobile/components",
      title: "移动端组件",
      description: "触摸手势、虚拟列表、模态框",
      icon: "🎯"
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              企业级移动端开发架构指南
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              提供完整的移动端开发解决方案，从基础适配到高级优化，构建高性能、用户体验优秀的移动端应用。
              重点解决移动端开发的性能瓶颈、兼容性问题和用户体验挑战。
            </p>
          </div>

          {/* 核心技术挑战 */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              🎯 核心技术挑战
            </h2>
            <ul className="space-y-2 text-blue-800">
              <li>• <strong>跨端架构设计</strong> - 一套代码多端运行的统一解决方案</li>
              <li>• <strong>性能优化挑战</strong> - 移动端特有的性能瓶颈和优化策略</li>
              <li>• <strong>用户体验设计</strong> - 触摸交互、手势识别、响应式布局</li>
              <li>• <strong>设备能力集成</strong> - 原生API调用、PWA功能、推送通知</li>
            </ul>
          </div>

          {/* 功能模块网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 技术栈 */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🛠️ 核心技术栈
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">前端框架</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 15 + React 19</li>
                  <li>• TypeScript 严格模式</li>
                  <li>• Tailwind CSS 4</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">移动端技术</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PWA (Service Worker)</li>
                  <li>• Web Push API</li>
                  <li>• 设备API (Geolocation, Camera)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">性能优化</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 响应式图片</li>
                  <li>• 代码分割</li>
                  <li>• 懒加载策略</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">用户体验</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 触摸手势识别</li>
                  <li>• 震动反馈</li>
                  <li>• 无障碍访问</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 学习路径 */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-900 mb-3">
              🎓 薪资提升路径
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium text-green-900 mb-2">第1阶段：基础掌握</h3>
                <p className="text-sm text-green-800">
                  掌握React Native基础、响应式设计、移动端适配
                </p>
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-2">第2阶段：进阶技能</h3>
                <p className="text-sm text-green-800">
                  深入PWA开发、性能优化、原生API集成
                </p>
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-2">第3阶段：架构设计</h3>
                <p className="text-sm text-green-800">
                  跨端架构设计、技术选型、团队指导
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}