import Layout from "@/components/Layout";
import CacheDemo from "./cache-demo";
import StrategyExamples from "./strategy-examples";

export const metadata = {
  title: "前端缓存系统",
  description: "构建一个完善的前端缓存系统，提升应用性能和用户体验，支持多种缓存策略和数据管理"
};

export default function FrontendCachePage() {
  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">前端缓存系统</h1>
        <p className="text-gray-600 mb-8">
          构建一个完善的前端缓存系统，提升应用性能和用户体验，支持多种缓存策略和数据管理
        </p>

        {/* 核心功能 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">HTTP 请求缓存</h3>
              <p className="text-sm text-gray-600">自动缓存 GET 请求响应数据</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">本地存储管理</h3>
              <p className="text-sm text-gray-600">localStorage/sessionStorage 封装</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">内存缓存</h3>
              <p className="text-sm text-gray-600">应用运行时数据缓存</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">静态资源缓存</h3>
              <p className="text-sm text-gray-600">浏览器缓存、CDN 缓存和 nginx 缓存管理</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">缓存策略配置</h3>
              <p className="text-sm text-gray-600">TTL、LRU、LFU 等策略</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">缓存失效机制</h3>
              <p className="text-sm text-gray-600">自动过期和手动清理</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">离线数据支持</h3>
              <p className="text-sm text-gray-600">PWA 离线缓存功能</p>
            </div>
          </div>
        </section>

        {/* 重难点功能 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-orange-600">重难点功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-l-4 border-orange-400 bg-orange-50">
              <h3 className="font-medium mb-2">缓存一致性保证</h3>
              <p className="text-sm text-gray-600">多标签页数据同步</p>
            </div>
            <div className="p-4 border-l-4 border-orange-400 bg-orange-50">
              <h3 className="font-medium mb-2">智能预加载</h3>
              <p className="text-sm text-gray-600">基于用户行为预测加载</p>
            </div>
            <div className="p-4 border-l-4 border-orange-400 bg-orange-50">
              <h3 className="font-medium mb-2">缓存大小控制</h3>
              <p className="text-sm text-gray-600">LRU 算法实现和存储限制</p>
            </div>
            <div className="p-4 border-l-4 border-orange-400 bg-orange-50">
              <h3 className="font-medium mb-2">网络状态感知</h3>
              <p className="text-sm text-gray-600">在线/离线状态切换处理</p>
            </div>
            <div className="p-4 border-l-4 border-orange-400 bg-orange-50">
              <h3 className="font-medium mb-2">数据版本管理</h3>
              <p className="text-sm text-gray-600">缓存数据版本控制和更新</p>
            </div>
          </div>
        </section>

        {/* 技术实现 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">技术实现</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">1. HTTP 请求缓存系统</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 基于 axios 拦截器实现请求级别的缓存机制</p>
                <p><strong>核心组件:</strong> axios 拦截器、缓存键生成器、TTL 管理器、缓存匹配器</p>
                <p><strong>实现要点:</strong> 请求拦截器检查缓存、响应拦截器自动缓存、缓存键名规则、强制刷新和失效处理</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">2. 本地存储管理模块</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 封装 localStorage/sessionStorage 为统一存储接口</p>
                <p><strong>核心组件:</strong> StorageManager、序列化器、过期管理器、空间监控器</p>
                <p><strong>实现要点:</strong> 统一存储 API、JSON 序列化、过期时间管理、异常处理、数据加密</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">3. 内存缓存 LRU 引擎</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 使用 Map 数据结构实现 LRU 缓存算法</p>
                <p><strong>核心组件:</strong> LRUCache、访问记录器、容量控制器、事件发射器</p>
                <p><strong>实现要点:</strong> LRU 双向链表算法、容量控制、访问统计、批量操作、事件监听</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">4. 缓存策略配置引擎</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 实现灵活的缓存策略配置系统</p>
                <p><strong>核心组件:</strong> 策略管理器、TTL 控制器、LRU 算法引擎、LFU 统计器</p>
                <p><strong>实现要点:</strong> 可扩展策略接口、TTL 生命周期管理、LRU/LFU 算法实现</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">5. 缓存失效管理系统</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 实现智能的缓存失效机制</p>
                <p><strong>核心组件:</strong> 失效检测器、定时清理器、事件触发器、级联失效器</p>
                <p><strong>实现要点:</strong> 自动过期检测、定时清理、手动失效操作、级联失效管理</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">6. 静态资源缓存管理</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 管理静态资源的缓存策略，包含 nginx 服务器缓存</p>
                <p><strong>核心组件:</strong> 资源管理器、缓存策略配置器、版本控制器、缓存检测器</p>
                <p><strong>实现要点:</strong> 版本号哈希管理、nginx 配置模板、缓存时间策略、强制刷新机制</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">7. PWA 离线缓存系统</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>技术方案:</strong> 集成 Service Worker 实现离线缓存和应用 shell</p>
                <p><strong>核心组件:</strong> Service Worker、缓存策略管理器、离线资源监听器、后台同步管理器</p>
                <p><strong>实现要点:</strong> 生命周期配置、缓存优先策略、离线资源管理、版本控制、应用 shell</p>
              </div>
            </div>
          </div>
        </section>

        {/* 架构图 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-purple-600">系统架构</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-4">
              <h3 className="font-medium mb-2">前端缓存系统架构</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">应用层</h4>
                <p className="text-xs text-gray-600">React/Vue 组件<br/>业务逻辑</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">缓存管理层</h4>
                <p className="text-xs text-gray-600">HTTP 缓存<br/>内存缓存<br/>本地存储</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">存储层</h4>
                <p className="text-xs text-gray-600">Memory<br/>LocalStorage<br/>IndexedDB</p>
              </div>
            </div>
          </div>
        </section>

        {/* 实际演示 */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">实际演示</h2>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              以下是完整缓存系统的实际功能演示，您可以操作界面来测试不同的缓存功能。
            </p>
          </div>
          <CacheDemo />
        </section>

        {/* 缓存策略实战 */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-purple-600">缓存策略实战</h2>
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
            <p className="text-sm text-purple-800">
              深入了解不同缓存策略的实际应用场景，包含需要后端配合的完整配置示例。
            </p>
          </div>
          <StrategyExamples />
        </section>

        {/* 使用示例 */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">使用示例</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// 导入缓存管理器
import { cacheManager, StrategyFactory } from '@/lib/cache';

// 内存缓存操作
cacheManager.set('user:123', { name: 'John', age: 30 });
const user = cacheManager.get('user:123');

// 本地存储操作
await cacheManager.setLocal('settings', { theme: 'dark' });
const settings = await cacheManager.getLocal('settings');

// HTTP 缓存操作
const data = await cacheManager.getHttp('/api/users');
const freshData = await cacheManager.forceGetHttp('/api/users');

// 缓存策略配置
const strategy = StrategyFactory.createLRU(100);
cacheManager.setStrategy(strategy);

// 缓存预热
await cacheManager.warmup([
  { key: 'config', value: { ... }, storage: 'local' },
  { key: 'user_data', value: [ ... ], ttl: 300000 }
]);

// 批量失效
await cacheManager.invalidate(/user:/); // 失效所有 user: 开头的缓存

// 获取统计信息
const metrics = cacheManager.getMetrics();
console.log(\`命中率: \${metrics.memory.hitRate * 100}%\`);`}
            </pre>
          </div>
        </section>
      </div>
    </Layout>
  );
}