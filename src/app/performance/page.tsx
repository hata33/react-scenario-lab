import Layout from "@/components/Layout";
import Link from "next/link";

export const metadata = {
  title: "性能优化",
  description: "前端性能优化技术和工具展示"
};

export default function PerformancePage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">性能优化</h1>
        <p className="text-gray-600 mb-6">前端性能优化技术和工具展示</p>

        <div className="space-y-2">
          <Link href="/performance/virtual-list" className="block p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="font-medium">虚拟列表</h3>
            <p className="text-sm text-gray-600">大数据量列表性能优化方案</p>
          </Link>

          <Link href="/performance/frontend-cache" className="block p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="font-medium">前端缓存系统</h3>
            <p className="text-sm text-gray-600">完整的前端缓存解决方案，包含 HTTP 缓存、本地存储、内存缓存等</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}