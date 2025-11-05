"use client";

import { ArrowLeft, Brush, CheckCircle, Monitor, Palette, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";

interface StylingExample {
	id: string;
	title: string;
	description: string;
	framework: "Tailwind" | "CSS Modules" | "Styled Components" | "Emotion" | "Global CSS";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	performance: {
		bundleSize: string;
		runtime: string;
		maintainability: string;
	};
}

const stylingExamples: StylingExample[] = [
	{
		id: "tailwind-utility-first",
		title: "Tailwind CSS Utility-First",
		description: "使用原子化 CSS 类快速构建响应式界面",
		framework: "Tailwind",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
}

// components/Button.tsx
function Button({ variant = 'primary', children }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50'
  };

  return (
    <button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
}`,
		benefits: ["快速开发", "一致性", "小包体积", "按需加载"],
		features: ["响应式设计", "暗色模式", "自定义主题", "组件提取"],
		performance: {
			bundleSize: "< 10KB",
			runtime: "极快",
			maintainability: "优秀",
		},
	},
	{
		id: "css-modules",
		title: "CSS Modules 局部作用域",
		description: "使用 CSS 模块化避免样式冲突",
		framework: "CSS Modules",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `/* styles/Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: var(--brand-500);
  color: white;
}

.primary:hover {
  background-color: var(--brand-600);
}

.secondary {
  background-color: var(--gray-200);
  color: var(--gray-900);
}

// components/Button.tsx
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      {children}
    </button>
  );
}`,
		benefits: ["局部作用域", "避免冲突", "CSS 原生语法", "良好维护性"],
		features: ["类名哈希", "组合样式", "条件样式", "主题支持"],
		performance: {
			bundleSize: "轻量级",
			runtime: "快速",
			maintainability: "良好",
		},
	},
	{
		id: "styled-components",
		title: "Styled Components CSS-in-JS",
		description: "使用 JavaScript 动态创建样式组件",
		framework: "Styled Components",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `// components/Button.js
import styled, { css } from 'styled-components';

const Button = styled.button\`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  /* 根据 props 动态样式 */
  \${props => {
    switch (props.variant) {
      case 'primary':
        return css\`
          background-color: \${props.theme.colors.brand[500]};
          color: white;

          &:hover {
            background-color: \${props.theme.colors.brand[600]};
          }
        \`;
      case 'secondary':
        return css\`
          background-color: \${props.theme.colors.gray[200]};
          color: \${props.theme.colors.gray[900]};
        \`;
      default:
        return '';
    }
  }}
\`;

// 使用主题
const theme = {
  colors: {
    brand: ['#eff6ff', '#3b82f6', '#1e3a8a'],
    gray: ['#f9fafb', '#6b7280', '#111827']
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}`,
		benefits: ["动态样式", "主题系统", "组件化", "TypeScript 支持"],
		features: ["Props 驱动样式", "主题提供者", "动画支持", "SSR 兼容"],
		performance: {
			bundleSize: "中等",
			runtime: "良好",
			maintainability: "优秀",
		},
	},
	{
		id: "emotion-react",
		title: "Emotion 高性能 CSS-in-JS",
		description: "使用 Emotion 实现高性能样式解决方案",
		framework: "Emotion",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `/** @jsxImportSource @emotion/react */
import { css, ThemeProvider } from '@emotion/react';

// CSS Prop 语法
const buttonStyles = css\`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  background-color: \${props => props.theme.colors.brand[500]};
  color: white;

  &:hover {
    background-color: \${props => props.theme.colors.brand[600]};
  }
\`;

// styled 组件
const Button = styled.button\`
  \${buttonStyles}

  \${props => props.variant === 'secondary' && css\`
    background-color: \${props.theme.colors.gray[200]};
    color: \${props.theme.colors.gray[900]};
  \`}
\`;

// 主题配置
const theme = {
  colors: {
    brand: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb'
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Styled Button</Button>
    </ThemeProvider>
  );
}`,
		benefits: ["高性能", "小包体积", "SSR 支持", "灵活性强"],
		features: ["CSS Prop", "缓存优化", "服务端渲染", "TypeScript"],
		performance: {
			bundleSize: "< 15KB",
			runtime: "快速",
			maintainability: "优秀",
		},
	},
	{
		id: "global-css-variables",
		title: "全局 CSS 变量系统",
		description: "使用 CSS 自定义属性构建可维护的主题系统",
		framework: "Global CSS",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `/* styles/globals.css */
:root {
  /* 颜色系统 */
  --color-primary: 59 130 246; /* RGB 值 */
  --color-primary-rgb: 59, 130, 246;
  --color-primary-hex: #3b82f6;

  /* 间距系统 */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* 字体系统 */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* 阴影系统 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: 96 165 250;
  }
}

/* 组件样式 */
.button {
  padding: var(--space-sm) var(--space-md);
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: var(--font-size-base);
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.button--primary {
  background-color: rgb(var(--color-primary-rgb));
  color: white;
  box-shadow: var(--shadow-sm);
}

.button--primary:hover {
  background-color: rgb(var(--color-primary-rgb) / 0.9);
  box-shadow: var(--shadow-md);
}`,
		benefits: ["原生 CSS", "浏览器支持", "运行时切换", "易维护"],
		features: ["主题变量", "暗色模式", "响应式设计", "动画支持"],
		performance: {
			bundleSize: "极小",
			runtime: "最快",
			maintainability: "良好",
		},
	},
	{
		id: "responsive-design",
		title: "响应式设计系统",
		description: "构建适配各种设备的响应式界面",
		framework: "Tailwind",
		difficulty: "中级",
		status: "completed",
		codeSnippet: `// 响应式组件
function ResponsiveLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 响应式导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </div>

            {/* 桌面导航 */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">首页</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">产品</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">关于</a>
            </div>

            {/* 移动菜单按钮 */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-700 hover:text-gray-900">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 响应式内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 卡片组件 */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">响应式卡片</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              这个卡片会根据屏幕大小调整内容和布局
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}`,
		benefits: ["多设备适配", "用户体验好", "SEO 友好", "维护简单"],
		features: ["断点系统", "流式布局", "弹性图片", "媒体查询"],
		performance: {
			bundleSize: "轻量级",
			runtime: "优秀",
			maintainability: "良好",
		},
	},
];

export default function StylingFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<StylingExample | null>(null);

	const getFrameworkColor = (framework: StylingExample["framework"]) => {
		switch (framework) {
			case "Tailwind":
				return "text-cyan-600 bg-cyan-100";
			case "CSS Modules":
				return "text-blue-600 bg-blue-100";
			case "Styled Components":
				return "text-pink-600 bg-pink-100";
			case "Emotion":
				return "text-purple-600 bg-purple-100";
			case "Global CSS":
				return "text-green-600 bg-green-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: StylingExample["difficulty"]) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusColor = (status: StylingExample["status"]) => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: StylingExample["status"]) => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
							>
								<ArrowLeft className="mr-2 h-5 w-5" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Palette className="h-8 w-8 text-cyan-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">样式方案特性</h1>
									<p className="text-gray-600">Next.js 完整样式解决方案：Tailwind、CSS Modules、CSS-in-JS</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 框架对比 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">样式框架对比</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
							<div className="rounded-lg bg-cyan-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Brush className="h-6 w-6 text-cyan-600" />
								</div>
								<h3 className="mb-2 font-semibold text-cyan-900">Tailwind</h3>
								<p className="text-cyan-700 text-sm">原子化 CSS</p>
								<div className="mt-2 text-cyan-600 text-xs">
									<div>⚡ 快速开发</div>
									<div>📦 小包体积</div>
									<div>🎨 一致性高</div>
								</div>
							</div>
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Settings className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="mb-2 font-semibold text-blue-900">CSS Modules</h3>
								<p className="text-blue-700 text-sm">模块化样式</p>
								<div className="mt-2 text-blue-600 text-xs">
									<div>🔒 局部作用域</div>
									<div>🛡️ 避免冲突</div>
									<div>📝 原生语法</div>
								</div>
							</div>
							<div className="rounded-lg bg-pink-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Palette className="h-6 w-6 text-pink-600" />
								</div>
								<h3 className="mb-2 font-semibold text-pink-900">Styled Comp</h3>
								<p className="text-pink-700 text-sm">CSS-in-JS</p>
								<div className="mt-2 text-pink-600 text-xs">
									<div>🎯 动态样式</div>
									<div>🎨 主题系统</div>
									<div>🔧 组件化</div>
								</div>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Brush className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="mb-2 font-semibold text-purple-900">Emotion</h3>
								<p className="text-purple-700 text-sm">高性能 CSS-in-JS</p>
								<div className="mt-2 text-purple-600 text-xs">
									<div>🚀 高性能</div>
									<div>📦 小包体积</div>
									<div>⚡ SSR 支持</div>
								</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<div className="mb-2 flex items-center justify-center">
									<Monitor className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="mb-2 font-semibold text-green-900">Global CSS</h3>
								<p className="text-green-700 text-sm">全局样式系统</p>
								<div className="mt-2 text-green-600 text-xs">
									<div>🌐 原生支持</div>
									<div>🎨 CSS 变量</div>
									<div>🌓 暗色模式</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 样式示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<h2 className="mb-6 font-bold text-2xl text-gray-900">实现示例</h2>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{stylingExamples.map((example) => (
								<div
									key={example.id}
									className={`cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${
										selectedExample?.id === example.id ? "ring-2 ring-cyan-500" : ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="mb-3 flex items-start justify-between">
											<div>
												<h3 className="mb-1 font-semibold text-gray-900 text-lg">{example.title}</h3>
												<div className="mb-2 flex items-center space-x-2">
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getFrameworkColor(example.framework)}`}
													>
														{example.framework}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getDifficultyColor(
															example.difficulty,
														)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(example.status)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{example.description}</p>
										<div className="flex items-center justify-between text-gray-500 text-sm">
											<div className="flex space-x-4">
												<span>📦 {example.performance.bundleSize}</span>
												<span>⚡ {example.performance.runtime}</span>
											</div>
											<span>🔧 {example.performance.maintainability}</span>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-6">
										<div className="mb-4 flex items-center justify-between">
											<h3 className="font-semibold text-gray-900 text-xl">{selectedExample.title}</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-sm ${getFrameworkColor(
														selectedExample.framework,
													)}`}
												>
													{selectedExample.framework}
												</span>
											</div>
										</div>
										<p className="mb-4 text-gray-600">{selectedExample.description}</p>
										<div className="grid grid-cols-3 gap-4 text-sm">
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">包体积</div>
												<div className="text-gray-600">{selectedExample.performance.bundleSize}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">运行时</div>
												<div className="text-gray-600">{selectedExample.performance.runtime}</div>
											</div>
											<div className="rounded bg-gray-50 p-2 text-center">
												<div className="font-medium text-gray-900">维护性</div>
												<div className="text-gray-600">{selectedExample.performance.maintainability}</div>
											</div>
										</div>
									</div>

									<div className="p-6">
										<h4 className="mb-3 font-semibold text-gray-900">代码示例</h4>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
											<h5 className="mb-2 font-medium text-gray-900">主要优势</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>

										<div className="mt-4">
											<h5 className="mb-2 font-medium text-gray-900">核心功能</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.features.map((feature, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
													>
														{feature}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="border-green-200 border-t bg-green-50 p-6">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="h-5 w-5" />
												<span className="font-medium">该样式方案已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
									<Palette className="mx-auto mb-4 h-16 w-16 text-gray-400" />
									<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个样式方案</h3>
									<p className="text-gray-600">点击左侧的样式方案查看详细信息和代码示例</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
