"use client";

import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";

interface ReactFeature {
  id: string;
  title: string;
  description: string;
  emoji: string;
  version: string;
  category: string;
  status: "stable" | "experimental";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  what: string;
  why: string;
  when: string;
  href: string;
  buttonText: string;
  examples: string[];
}



// React 19 全版本特性数据
const react19Features: ReactFeature[] = [
  {
    id: "actions",
    emoji: "⚡",
    title: "Actions & Hooks",
    description: "useActionState、useOptimistic、useFormStatus、useTransition 等 Hooks",
    href: "/react-19/actions",
    buttonText: "体验 Actions 生态",
    version: "19.0",
    category: "React 19.0",
    status: "stable",
    difficulty: "intermediate",
    tags: ["异步", "表单", "并发"],
    what: "Actions 是 React 19 中简化异步数据变更的新机制，配套一系列 Hooks",
    why: "解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题",
    when: "处理表单提交、数据变更、乐观更新、并发渲染场景",
    examples: ["useActionState", "useOptimistic", "useFormStatus", "useTransition"],
  },
  {
    id: "use-hook",
    emoji: "📦",
    title: "use() Hook",
    description: "在条件语句和循环中读取 Context 或 Promise 资源",
    href: "/react-19/use-hook",
    buttonText: "体验 use() Hook",
    version: "19.0",
    category: "React 19.0",
    status: "stable",
    difficulty: "beginner",
    tags: ["异步", "Context", "Suspense"],
    what: "use() 是一个新的 Hook，可以直接在渲染中消费 Promise 和 Context",
    why: "解决异步数据处理复杂、Context 嵌套过深、代码可读性差的问题",
    when: "异步数据获取、动态 Context 消费、Promise 竞速等场景",
    examples: ["Promise 消费", "Context 读取", "条件渲染", "竞速处理"],
  },
  {
    id: "server-components",
    emoji: "🖥️",
    title: "服务端组件 (RSC)",
    description: "在服务端渲染组件，减小客户端打包体积",
    href: "/react-19/server-components",
    buttonText: "体验服务端渲染",
    version: "19.0",
    category: "React 19.0",
    status: "stable",
    difficulty: "advanced",
    tags: ["服务端", "性能", "SEO"],
    what: "RSC 允许在服务端渲染组件，只将必要的 JavaScript 发送到客户端",
    why: "解决首屏加载慢、客户端包体积大、SEO 效果差的问题",
    when: "内容展示网站、SEO 要求高、性能敏感的应用",
    examples: ["服务端数据获取", "零客户端 JS", "自动代码分割", "混合渲染"],
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
    examples: ["动态 title", "meta 标签", "Open Graph", "Twitter Cards"],
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
    examples: ["简化 ref 传递", "组件库开发", "TypeScript 类型", "函数组件 ref"],
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
    examples: ["preload", "preinit", "prefetchDNS", "preconnect"],
  },
];

const react191Features: ReactFeature[] = [
  {
    id: "owner-stack",
    emoji: "🔍",
    title: "Owner Stack 调试",
    description: "新的调试功能，帮助定位渲染源组件",
    href: "/react-19/owner-stack",
    buttonText: "体验调试增强",
    version: "19.1",
    category: "React 19.1",
    status: "stable",
    difficulty: "intermediate",
    tags: ["调试", "开发工具", "性能"],
    what: "Owner Stack 提供完整的组件调用链，帮助快速定位渲染触发源",
    why: "解决组件调试困难、性能问题定位复杂、开发效率低的问题",
    when: "调试复杂组件树、性能问题诊断、开发阶段调试",
    examples: ["调用链跟踪", "性能问题定位", "React DevTools", "组件渲染分析"],
  },
  {
    id: "suspense-enhanced",
    emoji: "🔄",
    title: "Suspense 增强",
    description: "统一并优化了客户端、服务端和混合渲染阶段的行为",
    href: "/react-19/suspense-enhanced",
    buttonText: "体验 Suspense 增强",
    version: "19.1",
    category: "React 19.1",
    status: "stable",
    difficulty: "intermediate",
    tags: ["异步", "渲染", "稳定性"],
    what: "改进了 Suspense 在不同渲染环境下的一致性和稳定性",
    why: "解决水合边界不一致、混合渲染不稳定、异步渲染体验差的问题",
    when: "使用 Suspense、混合渲染、异步组件加载场景",
    examples: ["水合边界优化", "混合渲染支持", "异步渲染稳定", "回退处理"],
  },
];

const react192Features: ReactFeature[] = [
  {
    id: "activity-api",
    emoji: "🔄",
    title: "Activity API",
    description: "精细管理组件在可见与隐藏状态下的行为",
    href: "/react-19/activity-api",
    buttonText: "体验状态保留",
    version: "19.2",
    category: "React 19.2",
    status: "stable",
    difficulty: "advanced",
    tags: ["状态", "性能", "交互"],
    what: "Activity API 允许组件在隐藏时保留状态，避免重复渲染",
    why: "解决组件状态丢失、重复渲染开销、用户体验不连贯的问题",
    when: "标签页切换、抽屉组件、复杂交互界面",
    examples: ["状态保留", "组件挂起", "交互优化", "内存管理"],
  },
  {
    id: "use-effect-event",
    emoji: "⚡",
    title: "useEffectEvent Hook",
    description: "将事件型逻辑从 Effect 中解耦，解决闭包陷阱",
    href: "/react-19/use-effect-event",
    buttonText: "体验闭包陷阱解决",
    version: "19.2",
    category: "React 19.2",
    status: "stable",
    difficulty: "intermediate",
    tags: ["Hook", "Effect", "优化"],
    what: "useEffectEvent 创建不随 Effect 重新执行的事件函数",
    why: "解决 useEffect 闭包陷阱、Effect 重复执行、性能问题",
    when: "定时器、事件监听、第三方库集成、API 请求",
    examples: ["事件处理优化", "闭包陷阱解决", "Effect 清理", "依赖管理"],
  },
  {
    id: "cache-signals",
    emoji: "💾",
    title: "缓存信号",
    description: "新的缓存机制，通过信号驱动缓存更新",
    href: "/react-19/cache-signals",
    buttonText: "体验智能缓存",
    version: "19.2",
    category: "React 19.2",
    status: "stable",
    difficulty: "advanced",
    tags: ["缓存", "性能", "数据"],
    what: "缓存信号提供自动管理的缓存机制，通过信号触发更新",
    why: "解决缓存管理复杂、重复请求、内存使用不当的问题",
    when: "API 缓存、数据预取、高频数据访问场景",
    examples: ["智能缓存", "信号驱动更新", "内存优化", "数据同步"],
  },
];

const compilerFeatures: ReactFeature[] = [
  {
    id: "compiler",
    emoji: "🤖",
    title: "React Compiler",
    description: "自动优化组件重新渲染，无需手动使用 useMemo、useCallback",
    href: "/react-19/compiler",
    buttonText: "体验自动优化",
    version: "19.0+",
    category: "React Compiler",
    status: "experimental",
    difficulty: "advanced",
    tags: ["性能", "自动优化", "Compiler"],
    what: "React Compiler 自动分析组件依赖关系，进行智能优化",
    why: "解决手动优化复杂、性能调优困难、代码冗余的问题",
    when: "性能敏感应用、复杂组件树、减少手动优化工作",
    examples: ["自动记忆化", "依赖分析", "渲染优化", "性能提升"],
  },
];


// 所有特性数据
const allFeatures = [...react19Features, ...react191Features, ...react192Features, ...compilerFeatures];

const categories = [
  "全部",
  "React 19.0",
  "React 19.1",
  "React 19.2",
  "React Compiler",
];

export default function React19Overview() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = allFeatures.filter((feature) => {
    const matchesCategory = selectedCategory === "全部" || feature.category === selectedCategory;
    const matchesSearch =
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: ReactFeature["status"]) => {
    switch (status) {
      case "stable":
        return "text-green-600 bg-green-100";
      case "experimental":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: ReactFeature["status"]) => {
    switch (status) {
      case "stable":
        return "稳定";
      case "experimental":
        return "实验性";
      default:
        return "未知";
    }
  };

  const getDifficultyColor = (difficulty: ReactFeature["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyText = (difficulty: ReactFeature["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "初级";
      case "intermediate":
        return "中级";
      case "advanced":
        return "高级";
      default:
        return "未知";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <div className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-4 font-bold text-4xl text-gray-900">React 19 新特性实验室</h1>
              <p className="mx-auto max-w-3xl text-gray-600 text-lg">
                深入探索 React 19 全版本新特性，包括 Actions、Hooks、Server Components
                等功能的完整实现和示例。
              </p>
            </div>
          </div>
        </div>

        {/* 搜索和过滤 */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 font-medium text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索特性..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 特性卡片网格 */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature) => (
              <div
                key={feature.id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{feature.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getStatusColor(feature.status)}`}>
                            {getStatusText(feature.status)}
                          </span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${getDifficultyColor(feature.difficulty)}`}>
                            {getDifficultyText(feature.difficulty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-600">{feature.description}</p>

                  <div className="mb-4">
                    <span className="mb-2 block text-gray-500 text-sm">分类: {feature.category}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 font-medium text-gray-700 text-sm">标签:</h4>
                    <div className="flex flex-wrap gap-1">
                      {feature.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 font-medium text-gray-700 text-sm">包含示例:</h4>
                    <div className="flex flex-wrap gap-1">
                      {feature.examples.map((example, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-blue-700 text-xs"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Link href={feature.href}>
                      <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700">
                        查看详情
                      </button>
                    </Link>
                    {feature.status === "stable" && (
                      <button
                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-sm transition-colors hover:bg-gray-50"
                        onClick={() => {
                          // TODO: Open demo
                          console.log(`Open demo for ${feature.id}`);
                        }}
                      >
                        演示
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-900 text-xl">统计信息</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="font-bold text-3xl text-blue-600">{allFeatures.length}</div>
                <div className="text-gray-600 text-sm">总特性数</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-green-600">
                  {allFeatures.filter((f) => f.status === "stable").length}
                </div>
                <div className="text-gray-600 text-sm">稳定版</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-yellow-600">
                  {allFeatures.filter((f) => f.status === "experimental").length}
                </div>
                <div className="text-gray-600 text-sm">实验性</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-purple-600">
                  {allFeatures.filter((f) => f.difficulty === "advanced").length}
                </div>
                <div className="text-gray-600 text-sm">高级特性</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
