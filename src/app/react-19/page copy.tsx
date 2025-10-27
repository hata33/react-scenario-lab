"use client";

import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";

// 获取官方示例代码
function getOfficialExample(featureId: string) {
  const examples: Record<string, { title: string; description: string; code: string; source: string }> = {
    "actions": {
      title: "useActionState Hook",
      description: "简化表单状态管理，自动处理 pending、error、success 状态",
      code: `import { useActionState } from 'react';

async function increment(previousState: number, formData: FormData) {
  const number = Number(formData.get('number'));
  if (isNaN(number)) {
    return previousState;
  }
  return previousState + number;
}

function Counter() {
  const [state, formAction] = useActionState(increment, 0);

  return (
    <form>
      <h1>Count: {state}</h1>
      <button formAction={formAction}>Increment</button>
    </form>
  );
}`,
      source: "https://react.dev/reference/react/useActionState"
    },
    "use-hook": {
      title: "use() Hook",
      description: "在渲染中直接消费 Promise 和 Context 资源",
      code: `import { use, Suspense } from 'react';

// 消费 Promise
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  return <p>{message}</p>;
}

// 消费 Context
const ThemeContext = createContext('light');

function Button() {
  const theme = use(ThemeContext);
  return <button className={theme}>Click me</button>;
}`,
      source: "https://react.dev/reference/react/use"
    },
    "metadata": {
      title: "文档元数据",
      description: "在组件树中直接使用 title、meta 等标签",
      code: `import { metadata } from 'next';

export const metadata = {
  title: 'My App Title',
  description: 'My app description',
  openGraph: {
    title: 'My App Title',
    description: 'My app description',
  },
};

function BlogPost({ post }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <article>{post.content}</article>
    </>
  );
}`,
      source: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata"
    },
    "ref-as-prop": {
      title: "ref 作为属性",
      description: "ref 可作为普通属性传递，无需 forwardRef",
      code: `// 之前需要 forwardRef
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// React 19 中直接使用 ref
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// 使用
const inputRef = useRef();
<MyInput ref={inputRef} placeholder="Type here" />`,
      source: "https://react.dev/reference/react/forwardRef"
    },
    "resource-preload": {
      title: "资源预加载",
      description: "使用 preload 等API 控制关键资源加载",
      code: `import { preload } from 'react';

// 预加载样式表
preload('styles.css', { as: 'style' });

// 预加载字体
preload('font.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

// 预加载脚本
preload('script.js', { as: 'script' });

// 在组件中使用
function App() {
  return (
    <>
      <link rel="preload" href="critical.css" as="style" />
      <link rel="preload" href="hero-image.jpg" as="image" />
    </>
  );
}`,
      source: "https://react.dev/reference/react-dom/preload"
    }
  };

  return examples[featureId] || {
    title: "官方示例",
    description: "来自 React 官方文档的最新示例",
    code: "// 官方示例代码\\n// 请访问 react.dev 获取更多示例",
    source: "https://react.dev"
  };
}

// 官方示例展示组件
function OfficialExample({ featureId }: { featureId: string }) {
  const example = getOfficialExample(featureId);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-gray-200 border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
            <span className="text-blue-600">📚</span>
            官方示例
          </h3>
          <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 text-xs">
            React 19
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h4 className="mb-3 font-medium text-base text-gray-900">{example.title}</h4>
          <p className="mb-4 text-gray-600 text-sm leading-relaxed">{example.description}</p>
          <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-900 p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-gray-100 text-sm leading-relaxed">
              <code>{example.code}</code>
            </pre>
            <button
              className="absolute top-2 right-2 rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white text-xs transition-colors duration-200 hover:bg-blue-700"
              onClick={() => navigator.clipboard.writeText(example.code)}
            >
              📋 复制
            </button>
          </div>
          <div className="text-right">
            <small className="text-gray-500">
              📖 来源:{" "}
              <a
                href={example.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                {example.source}
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}


// React 19 全版本特性数据
const react19Features = [
  {
    id: "actions",
    emoji: "⚡",
    title: "Actions & Hooks",
    description: "useActionState、useOptimistic、useFormStatus、useTransition 等 Hooks",
    href: "/react-19/actions",
    buttonText: "体验 Actions 生态",
    version: "19.0",
    status: "stable",
    difficulty: "intermediate",
    tags: ["异步", "表单", "并发"],
    what: "Actions 是 React 19 中简化异步数据变更的新机制，配套一系列 Hooks",
    why: "解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题",
    when: "处理表单提交、数据变更、乐观更新、并发渲染场景",
  },
  {
    id: "use-hook",
    emoji: "📦",
    title: "use() Hook",
    description: "在条件语句和循环中读取 Context 或 Promise 资源",
    href: "/react-19/use-hook",
    buttonText: "体验 use() Hook",
    version: "19.0",
    status: "stable",
    difficulty: "beginner",
    tags: ["异步", "Context", "Suspense"],
    what: "use() 是一个新的 Hook，可以直接在渲染中消费 Promise 和 Context",
    why: "解决异步数据处理复杂、Context 嵌套过深、代码可读性差的问题",
    when: "异步数据获取、动态 Context 消费、Promise 竞速等场景",
  },
  {
    id: "server-components",
    emoji: "🖥️",
    title: "服务端组件 (RSC)",
    description: "在服务端渲染组件，减小客户端打包体积",
    href: "/react-19/server-components",
    buttonText: "体验服务端渲染",
    version: "19.0",
    status: "stable",
    difficulty: "advanced",
    tags: ["服务端", "性能", "SEO"],
    what: "RSC 允许在服务端渲染组件，只将必要的 JavaScript 发送到客户端",
    why: "解决首屏加载慢、客户端包体积大、SEO 效果差的问题",
    when: "内容展示网站、SEO 要求高、性能敏感的应用",
  },
  {
    id: "metadata",
    emoji: "📝",
    title: "文档元数据标签",
    description: "在组件树中直接使用 title、meta 等标签",
    href: "/react-19/metadata",
    buttonText: "体验元数据管理",
    version: "19.0",
    status: "stable",
    difficulty: "beginner",
    tags: ["SEO", "元数据", "社交媒体"],
    what: "可以直接在组件中使用 HTML 头部标签，自动提升到 head 中",
    why: "解决动态 SEO 管理复杂、社交媒体分享优化困难的问题",
    when: "需要动态 SEO、社交媒体优化、页面元数据管理",
  },
  {
    id: "ref-as-prop",
    emoji: "🔗",
    title: "ref 作为属性",
    description: "ref 可作为普通属性传递，无需 forwardRef",
    href: "/react-19/ref-as-prop",
    buttonText: "体验简化 ref",
    version: "19.0",
    status: "stable",
    difficulty: "beginner",
    tags: ["API", "TypeScript", "简化"],
    what: "ref 现在可以作为普通属性传递，不再需要 forwardRef",
    why: "解决 forwardRef 代码冗余、API 不直观、TypeScript 类型复杂的问题",
    when: "需要访问子组件 DOM、库组件开发、ref 传递场景",
  },
  {
    id: "resource-preload",
    emoji: "🚀",
    title: "资源预加载 API",
    description: "提供 preload 等 API 控制关键资源加载",
    href: "/react-19/resource-preload",
    buttonText: "体验资源预加载",
    version: "19.0",
    status: "stable",
    difficulty: "intermediate",
    tags: ["性能", "资源", "优化"],
    what: "preload API 允许开发者控制关键资源的加载时机和优先级",
    why: "解决资源加载延迟、用户体验不流畅、性能优化困难的问题",
    when: "性能优化、关键资源预加载、用户体验提升场景",
  },
];

const react191Features = [
  {
    id: "owner-stack",
    emoji: "🔍",
    title: "Owner Stack 调试",
    description: "新的调试功能，帮助定位渲染源组件",
    href: "/react-19/owner-stack",
    buttonText: "体验调试增强",
    version: "19.1",
    status: "stable",
    difficulty: "intermediate",
    tags: ["调试", "开发工具", "性能"],
    what: "Owner Stack 提供完整的组件调用链，帮助快速定位渲染触发源",
    why: "解决组件调试困难、性能问题定位复杂、开发效率低的问题",
    when: "调试复杂组件树、性能问题诊断、开发阶段调试",
  },
  {
    id: "suspense-enhanced",
    emoji: "🔄",
    title: "Suspense 增强",
    description: "统一并优化了客户端、服务端和混合渲染阶段的行为",
    href: "/react-19/suspense-enhanced",
    buttonText: "体验 Suspense 增强",
    version: "19.1",
    status: "stable",
    difficulty: "intermediate",
    tags: ["异步", "渲染", "稳定性"],
    what: "改进了 Suspense 在不同渲染环境下的一致性和稳定性",
    why: "解决水合边界不一致、混合渲染不稳定、异步渲染体验差的问题",
    when: "使用 Suspense、混合渲染、异步组件加载场景",
  },
];

const react192Features = [
  {
    id: "activity-api",
    emoji: "🔄",
    title: "Activity API",
    description: "精细管理组件在可见与隐藏状态下的行为",
    href: "/react-19/activity-api",
    buttonText: "体验状态保留",
    version: "19.2",
    status: "stable",
    difficulty: "advanced",
    tags: ["状态", "性能", "交互"],
    what: "Activity API 允许组件在隐藏时保留状态，避免重复渲染",
    why: "解决组件状态丢失、重复渲染开销、用户体验不连贯的问题",
    when: "标签页切换、抽屉组件、复杂交互界面",
  },
  {
    id: "use-effect-event",
    emoji: "⚡",
    title: "useEffectEvent Hook",
    description: "将事件型逻辑从 Effect 中解耦，解决闭包陷阱",
    href: "/react-19/use-effect-event",
    buttonText: "体验闭包陷阱解决",
    version: "19.2",
    status: "stable",
    difficulty: "intermediate",
    tags: ["Hook", "Effect", "优化"],
    what: "useEffectEvent 创建不随 Effect 重新执行的事件函数",
    why: "解决 useEffect 闭包陷阱、Effect 重复执行、性能问题",
    when: "定时器、事件监听、第三方库集成、API 请求",
  },
  {
    id: "cache-signals",
    emoji: "💾",
    title: "缓存信号",
    description: "新的缓存机制，通过信号驱动缓存更新",
    href: "/react-19/cache-signals",
    buttonText: "体验智能缓存",
    version: "19.2",
    status: "stable",
    difficulty: "advanced",
    tags: ["缓存", "性能", "数据"],
    what: "缓存信号提供自动管理的缓存机制，通过信号触发更新",
    why: "解决缓存管理复杂、重复请求、内存使用不当的问题",
    when: "API 缓存、数据预取、高频数据访问场景",
  },
];

const compilerFeatures = [
  {
    id: "compiler",
    emoji: "🤖",
    title: "React Compiler",
    description: "自动优化组件重新渲染，无需手动使用 useMemo、useCallback",
    href: "/react-19/compiler",
    buttonText: "体验自动优化",
    version: "19.0+",
    status: "experimental",
    difficulty: "advanced",
    tags: ["性能", "自动优化", "Compiler"],
    what: "React Compiler 自动分析组件依赖关系，进行智能优化",
    why: "解决手动优化复杂、性能调优困难、代码冗余的问题",
    when: "性能敏感应用、复杂组件树、减少手动优化工作",
  },
];

// 手风琴式特性渲染函数
const renderAccordionFeatureSection = (
  title: string,
  version: string,
  features: any[],
  versionKey: string,
  selectedFeatures: Record<string, string | null>,
  setSelectedFeatures: (features: Record<string, string | null>) => void,
) => {
  const selectedFeature = selectedFeatures[versionKey];
  const setSelectedFeature = (feature: string | null) => {
    setSelectedFeatures({
      ...selectedFeatures,
      [versionKey]: feature,
    });
  };

  return (
  <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md" key={versionKey}>
    <div className="border-gray-200 border-b bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6">
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`rounded-lg px-4 py-2 font-bold text-lg ${version === "19.0"
              ? "bg-blue-600 text-white"
              : version === "19.1"
                ? "bg-purple-600 text-white"
                : version === "19.2"
                  ? "bg-green-600 text-white"
                  : "bg-orange-600 text-white"
            }`}
        >
          {version}
        </div>
        <h2 className="font-bold text-2xl text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600 leading-relaxed">
        {version === "19.0" && "React 19 基础特性，为现代 React 开发奠定基础"}
        {version === "19.1" && "React 19.1 增强特性，提升开发体验和调试能力"}
        {version === "19.2" && "React 19.2 前沿特性，探索 React 的未来方向"}
        {version === "Compiler" && "React Compiler 实验性功能，自动优化组件性能"}
      </p>
    </div>

    <div className="p-8">
      {/* 展开的卡片 */}
      <div className="space-y-6">
        {features.map((feature: any) => {
          const isExpanded = selectedFeature === feature.id;

          return (
            <div
              key={feature.id}
              className={`transition-all duration-500 ease-in-out ${isExpanded ? "scale-[1.02] transform" : ""}`}
            >
              {/* 展开状态：单列完整卡片 */}
              {isExpanded ? (
                <div className="overflow-hidden rounded-2xl border-2 border-blue-500 bg-white shadow-xl ring-4 ring-blue-100">
                  {/* 预览区域 */}
                  <div className="border-blue-100 border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">{feature.emoji}</span>
                        <div className="flex-1">
                          <h3 className="mb-2 font-bold text-2xl text-gray-900">{feature.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {feature.tags.map((tag: any, index: number) => (
                              <span
                                key={index}
                                className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1.5 font-medium text-white text-xs">
                          📚 官方示例
                        </span>
                        <span
                          className={`rounded-full px-3 py-1.5 font-medium text-xs ${feature.status === "experimental"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {feature.status === "experimental" ? "🧪 实验性" : "✅ 稳定"}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1.5 font-medium text-xs ${feature.difficulty === "beginner"
                              ? "bg-green-100 text-green-700"
                              : feature.difficulty === "intermediate"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {feature.difficulty === "beginner"
                            ? "🟢 初级"
                            : feature.difficulty === "intermediate"
                              ? "🟡 中级"
                              : "🔴 高级"}
                        </span>
                      </div>
                    </div>

                    {/* 收起按钮 */}
                    <button
                      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors duration-200 hover:bg-blue-700"
                      onClick={() => setSelectedFeature(null)}
                    >
                      🔽 收起详情
                    </button>
                  </div>

                  {/* 详细内容区域 */}
                  <div className="p-6">
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* 左侧：3W 法则 */}
                      <div className="space-y-6">
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-900 text-lg">
                            <span className="text-blue-600">📋</span> What (是什么)
                          </h4>
                          <p className="text-blue-700 leading-relaxed">{feature.what}</p>
                        </div>
                        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-900 text-lg">
                            <span className="text-green-600">🎯</span> Why (为什么)
                          </h4>
                          <p className="text-green-700 leading-relaxed">{feature.why}</p>
                        </div>
                        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                          <h4 className="mb-3 flex items-center gap-2 font-semibold text-lg text-purple-900">
                            <span className="text-purple-600">⏰</span> When (何时用)
                          </h4>
                          <p className="text-purple-700 leading-relaxed">{feature.when}</p>
                        </div>
                      </div>

                      {/* 右侧：官方示例 */}
                      <div className="lg:col-span-1">
                        <OfficialExample featureId={feature.id} />
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-8 border-gray-200 border-t pt-6">
                      <Link href={feature.href}>
                        <button className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-lg text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700">
                          {feature.buttonText} →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* 收缩状态：隐藏 */
                <div className="hidden" />
              )}
            </div>
          );
        })}
      </div>

      {/* 预览卡片网格布局 */}
      {!selectedFeature && (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {features.map((feature: any) => (
            <div
              key={`preview-${feature.id}`}
              className="cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
              onClick={() => setSelectedFeature(feature.id)}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-4xl">{feature.emoji}</span>
                <div className="flex flex-col gap-2">
                  <span className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1.5 font-medium text-white text-xs">
                    📚 官方示例
                  </span>
                  <span
                    className={`rounded-full px-3 py-1.5 font-medium text-xs ${feature.status === "experimental"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {feature.status === "experimental" ? "🧪 实验性" : "✅ 稳定"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1.5 font-medium text-xs ${feature.difficulty === "beginner"
                        ? "bg-green-100 text-green-700"
                        : feature.difficulty === "intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {feature.difficulty === "beginner"
                      ? "🟢 初级"
                      : feature.difficulty === "intermediate"
                        ? "🟡 中级"
                        : "🔴 高级"}
                  </span>
                </div>
              </div>

              <h3 className="mb-3 font-bold text-gray-900 text-xl">{feature.title}</h3>
              <p className="mb-4 text-gray-600 leading-relaxed">{feature.description}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {feature.tags.map((tag: any, index: number) => (
                  <span key={index} className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-center">
                <span className="font-medium text-blue-600 text-sm">🔽 点击查看详情</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default function React19Overview() {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, string | null>>({});

  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* 现代化头部 */}
          <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
              <div className="absolute inset-0 bg-white opacity-5">
                <div className="-translate-y-1/2 absolute h-96 w-96 translate-x-1/2 rotate-45 transform bg-white"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div>
                  <h1 className="mb-3 flex items-center gap-3 font-bold text-4xl text-white">
                    <span className="animate-spin-slow text-5xl">⚛️</span>
                    React 19 新特性实验室
                  </h1>
                  <p className="max-w-2xl text-blue-100 text-lg">
                    深入探索 React 19 全版本新特性，通过 3W 法则理解每个特性的价值
                  </p>
                </div>
                <div className="text-right">
                  <div className="rounded-xl border border-white/30 bg-white/20 px-6 py-3 backdrop-blur-sm">
                    <div className="font-bold text-white text-xl">v19.2</div>
                    <div className="font-medium text-green-300 text-sm">Latest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3W 法则说明 */}
          <div className="mb-12 rounded-2xl border border-blue-200 bg-white p-8 shadow-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-2xl text-gray-900">3W 法则解析</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 transition-all duration-300 hover:shadow-md">
                <span className="mb-4 block text-3xl">📋</span>
                <h4 className="mb-3 font-semibold text-blue-900 text-lg">What (是什么)</h4>
                <p className="text-blue-700 leading-relaxed">清晰定义特性的核心功能和作用</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 transition-all duration-300 hover:shadow-md">
                <span className="mb-4 block text-3xl">🎯</span>
                <h4 className="mb-3 font-semibold text-blue-900 text-lg">Why (为什么)</h4>
                <p className="text-blue-700 leading-relaxed">说明特性解决的具体问题和价值</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 transition-all duration-300 hover:shadow-md">
                <span className="mb-4 block text-3xl">⏰</span>
                <h4 className="mb-3 font-semibold text-blue-900 text-lg">When (何时用)</h4>
                <p className="text-blue-700 leading-relaxed">指导最佳使用场景和应用时机</p>
              </div>
            </div>
          </div>

          {/* React 19 基础特性 */}
          {renderAccordionFeatureSection("基础特性", "19.0", react19Features, "v19.0", selectedFeatures, setSelectedFeatures)}

          {/* React 19.1 增强特性 */}
          {renderAccordionFeatureSection("增强特性", "19.1", react191Features, "v19.1", selectedFeatures, setSelectedFeatures)}

          {/* React 19.2 前沿特性 */}
          {renderAccordionFeatureSection("前沿特性", "19.2", react192Features, "v19.2", selectedFeatures, setSelectedFeatures)}

          {/* React Compiler */}
          {renderAccordionFeatureSection("自动优化", "Compiler", compilerFeatures, "compiler", selectedFeatures, setSelectedFeatures)}
        </div>
      </div>
    </Layout>
  );
}
