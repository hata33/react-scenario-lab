"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

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

// 核心优势数据
const advantages = [
	{
		emoji: "🚀",
		title: "性能提升",
		description: "Compiler 自动优化，减少不必要的重渲染",
		detail: "智能识别依赖关系，自动记忆化计算结果",
	},
	{
		emoji: "🛡️",
		title: "类型安全",
		description: "完整的 TypeScript 支持，更好的开发体验",
		detail: "强类型检查，减少运行时错误",
	},
	{
		emoji: "🎯",
		title: "代码简化",
		description: "use() Hook 简化异步数据处理逻辑",
		detail: "减少样板代码，提高可读性",
	},
	{
		emoji: "📱",
		title: "用户体验",
		description: "并发渲染避免界面阻塞，提升交互响应性",
		detail: "无感知的异步操作，流畅的用户交互",
	},
];

// 版本兼容性数据
const compatibility = [
	{ name: "React", version: "19.2+", status: "required" },
	{ name: "Next.js", version: "15+", status: "recommended" },
	{ name: "TypeScript", version: "5.8+", status: "recommended" },
	{ name: "Node.js", version: "18+", status: "required" },
];

export default function React19Overview() {
	const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
	const [hoveredAdvantage, setHoveredAdvantage] = useState<string | null>(null);

	const renderFeatureSection = (title: string, version: string, features: any[]) => (
		<div className="version-section" key={version}>
			<div className="version-header">
				<h2 className="version-title">
					<span className="version-badge">{version}</span>
					{title}
				</h2>
				<p className="version-description">
					{version === "19.0" && "React 19 基础特性，为现代 React 开发奠定基础"}
					{version === "19.1" && "React 19.1 增强特性，提升开发体验和调试能力"}
					{version === "19.2" && "React 19.2 前沿特性，探索 React 的未来方向"}
					{version === "Compiler" && "React Compiler 实验性功能，自动优化组件性能"}
				</p>
			</div>

			<div className="features-grid">
				{features.map((feature: any) => (
					<div
						key={feature.id}
						className={`feature-card ${selectedFeature === feature.id ? "selected" : ""}`}
						onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
					>
						<div className="feature-header">
							<div className="feature-emoji">{feature.emoji}</div>
							<div className="feature-status">
								<span className={`status-badge ${feature.status}`}>
									{feature.status === "experimental" ? "🧪 实验性" : "✅ 稳定"}
								</span>
								<span className={`difficulty-badge ${feature.difficulty}`}>
									{feature.difficulty === "beginner"
										? "🟢 初级"
										: feature.difficulty === "intermediate"
											? "🟡 中级"
											: "🔴 高级"}
								</span>
							</div>
						</div>

						<h3>{feature.title}</h3>
						<p>{feature.description}</p>

						<div className="feature-tags">
							{feature.tags.map((tag: any, index: number) => (
								<span key={index} className="tag">
									{tag}
								</span>
							))}
						</div>

						{selectedFeature === feature.id && (
							<div className="feature-details">
								<div className="three-w-principle">
									<div className="principle-item">
										<span className="principle-label">What (是什么)</span>
										<p className="principle-content">{feature.what}</p>
									</div>
									<div className="principle-item">
										<span className="principle-label">Why (为什么)</span>
										<p className="principle-content">{feature.why}</p>
									</div>
									<div className="principle-item">
										<span className="principle-label">When (何时用)</span>
										<p className="principle-content">{feature.when}</p>
									</div>
								</div>
							</div>
						)}

						<Link href={feature.href}>
							<button className="feature-btn">{feature.buttonText}</button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<Layout>
			<div
				className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
				style={{ padding: "2rem" }}
			>
				{/* 动态头部 */}
				<div className="page-header">
					<div className="header-content">
						<div className="header-text">
							<h1>
								<span className="react-logo">⚛️</span>
								React 19 新特性实验室
							</h1>
							<p>深入探索 React 19 全版本新特性，通过 3W 法则理解每个特性的价值</p>
						</div>
						<div className="version-badge">
							<span className="version">v19.2</span>
							<span className="status">Latest</span>
						</div>
					</div>
				</div>

				{/* 3W 法则说明 */}
				<div className="principle-intro">
					<h3>🎯 3W 法则解析</h3>
					<div className="principle-cards">
						<div className="principle-card">
							<span className="principle-icon">📋</span>
							<h4>What (是什么)</h4>
							<p>清晰定义特性的核心功能和作用</p>
						</div>
						<div className="principle-card">
							<span className="principle-icon">🎯</span>
							<h4>Why (为什么)</h4>
							<p>说明特性解决的具体问题和价值</p>
						</div>
						<div className="principle-card">
							<span className="principle-icon">⏰</span>
							<h4>When (何时用)</h4>
							<p>指导最佳使用场景和应用时机</p>
						</div>
					</div>
				</div>

				{/* React 19 基础特性 */}
				{renderFeatureSection("基础特性", "19.0", react19Features)}

				{/* React 19.1 增强特性 */}
				{renderFeatureSection("增强特性", "19.1", react191Features)}

				{/* React 19.2 前沿特性 */}
				{renderFeatureSection("前沿特性", "19.2", react192Features)}

				{/* React Compiler */}
				{renderFeatureSection("自动优化", "Compiler", compilerFeatures)}

				{/* 核心优势部分 */}
				<div className="advantages-section">
					<div className="section-header">
						<h2>🌟 React 19 核心优势</h2>
						<p>悬停查看详细信息</p>
					</div>

					<div className="advantages-grid">
						{advantages.map((advantage, index) => (
							<div
								key={index}
								className={`advantage-item ${hoveredAdvantage === `adv-${index}` ? "expanded" : ""}`}
								onMouseEnter={() => setHoveredAdvantage(`adv-${index}`)}
								onMouseLeave={() => setHoveredAdvantage(null)}
							>
								<div className="advantage-header">
									<span className="advantage-emoji">{advantage.emoji}</span>
									<h3>{advantage.title}</h3>
								</div>
								<p>{advantage.description}</p>
								{hoveredAdvantage === `adv-${index}` && (
									<div className="advantage-detail">
										<p>{advantage.detail}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* 版本兼容性 */}
				<div className="compatibility-section">
					<div className="section-header">
						<h2>🔧 环境兼容性</h2>
						<p>确保你的开发环境满足以下要求</p>
					</div>

					<div className="compatibility-grid">
						{compatibility.map((item, index) => (
							<div key={index} className="compatibility-item">
								<div className="compatibility-header">
									<span className="item-name">{item.name}</span>
									<span className={`item-status ${item.status}`}>
										{item.status === "required" ? "🔴 必需" : "🟡 推荐"}
									</span>
								</div>
								<span className="item-version">{item.version}</span>
							</div>
						))}
					</div>
				</div>

				{/* React 19.2 更新说明 */}
				<div className="update-section">
					<div className="section-header">
						<h2>🎉 React 19.2 新改进</h2>
						<p>了解最新版本的优化和修复</p>
					</div>

					<div className="update-grid">
						<div className="update-item">
							<h3>🐛 Bug 修复</h3>
							<ul>
								<li>修复了 Compiler 在复杂场景下的内存泄漏问题</li>
								<li>解决了 Server Actions 的类型推断问题</li>
								<li>改进了 Suspense 边界的错误处理</li>
							</ul>
						</div>

						<div className="update-item">
							<h3>⚡ 性能优化</h3>
							<ul>
								<li>Compiler 优化了依赖分析算法</li>
								<li>减少了不必要的服务端重渲染</li>
								<li>改进了 hydration 性能</li>
							</ul>
						</div>

						<div className="update-item">
							<h3>🛠️ 开发体验</h3>
							<ul>
								<li>更详细的错误信息和堆栈跟踪</li>
								<li>改进了 React DevTools 的集成</li>
								<li>更好的 TypeScript 类型定义</li>
							</ul>
						</div>
					</div>
				</div>

				{/* 使用指南 */}
				<div className="usage-guide">
					<div className="section-header">
						<h2>📖 使用指南</h2>
						<p>快速上手 React 19 新特性</p>
					</div>

					<div className="guide-content">
						<div className="guide-section">
							<h3>🚀 快速开始</h3>
							<div className="guide-steps">
								<div className="step">
									<span className="step-number">1</span>
									<div className="step-content">
										<h4>安装依赖</h4>
										<code>npm install react@19 react-dom@19</code>
									</div>
								</div>
								<div className="step">
									<span className="step-number">2</span>
									<div className="step-content">
										<h4>配置 TypeScript</h4>
										<code>npm install -D typescript@^5.8</code>
									</div>
								</div>
								<div className="step">
									<span className="step-number">3</span>
									<div className="step-content">
										<h4>启用新特性</h4>
										<code>更新配置文件启用实验性功能</code>
									</div>
								</div>
							</div>
						</div>

						<div className="guide-section">
							<h3>💡 最佳实践</h3>
							<ul className="practice-list">
								<li>
									<strong>渐进式采用:</strong> 逐步引入新特性，无需一次性重构
								</li>
								<li>
									<strong>性能监控:</strong> 使用 React DevTools 监控优化效果
								</li>
								<li>
									<strong>错误处理:</strong> 利用新特性改进错误边界和状态处理
								</li>
								<li>
									<strong>团队培训:</strong> 确保团队了解新特性和使用方法
								</li>
								<li>
									<strong>版本管理:</strong> 关注 React 19.2+ 的改进和修复
								</li>
							</ul>
						</div>

						<div className="guide-section">
							<h3>⚠️ 注意事项</h3>
							<ul className="warning-list">
								<li>React Compiler 仍为实验性功能，生产环境需谨慎</li>
								<li>Server Actions 需要 Next.js 15+ 支持</li>
								<li>use() Hook 需要配合 Suspense 使用</li>
								<li>并发特性需要正确理解使用场景</li>
							</ul>
						</div>
					</div>
				</div>

				<style jsx>{`
          /* 版本部分样式 */
          .version-section {
            margin-bottom: 3rem;
          }

          .version-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .version-title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 0 0 1rem 0;
            font-size: 2rem;
            color: #111827;
            font-weight: 700;
          }

          .version-badge {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.875rem;
          }

          .version-description {
            color: #4b5563;
            font-size: 1rem;
            margin: 0;
            font-weight: 500;
          }

          /* 3W 法则样式 */
          .principle-intro {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 3rem;
            text-align: center;
          }

          .principle-intro h3 {
            color: #1e3a8a;
            margin: 0 0 2rem 0;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .principle-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .principle-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease;
          }

          .principle-card:hover {
            transform: translateY(-4px);
          }

          .principle-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: block;
          }

          .principle-card h4 {
            margin: 0 0 0.5rem 0;
            color: #1e3a8a;
            font-size: 1.125rem;
            font-weight: 600;
          }

          .principle-card p {
            margin: 0;
            color: #4b5563;
            font-size: 0.875rem;
            line-height: 1.5;
            font-weight: 500;
          }

          /* 3W 详情样式 */
          .three-w-principle {
            background: rgba(59, 130, 246, 0.05);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            animation: slideDown 0.3s ease;
          }

          .principle-item {
            margin-bottom: 1rem;
          }

          .principle-item:last-child {
            margin-bottom: 0;
          }

          .principle-label {
            background: #3b82f6;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 0.5rem;
          }

          .principle-content {
            margin: 0;
            color: #1f2937;
            line-height: 1.6;
            font-size: 0.875rem;
            font-weight: 500;
          }

          /* 全局样式 */
          .section-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .section-header h2 {
            color: #111827;
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: 700;
          }

          .section-header p {
            color: #4b5563;
            font-size: 1rem;
            font-weight: 500;
          }

          /* 头部样式 */
          .page-header {
            text-align: center;
            margin-bottom: 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 3rem 2rem;
            color: white;
            position: relative;
            overflow: hidden;
          }

          .page-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 1;
          }

          .header-text h1 {
            margin: 0 0 1rem 0;
            font-size: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .react-logo {
            font-size: 2.5rem;
            animation: rotate 10s linear infinite;
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .header-text p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.125rem;
            margin: 0;
          }

          .version-badge {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
          }

          .version {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            font-family: monospace;
          }

          .status {
            background: #10b981;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
          }

          /* 特性卡片样式 */
          .features-section {
            margin-bottom: 3rem;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
          }

          .feature-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 2px solid #e5e7eb;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .feature-card:hover::before,
          .feature-card.selected::before {
            transform: scaleX(1);
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-color: #3b82f6;
          }

          .feature-card.selected {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          }

          .feature-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }

          .feature-emoji {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .feature-status {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
          }

          .status-badge,
          .difficulty-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .status-badge.experimental {
            background: #fef3c7;
            color: #92400e;
          }

          .status-badge.stable {
            background: #d1fae5;
            color: #065f46;
          }

          .difficulty-badge.beginner {
            background: #dcfce7;
            color: #166534;
          }

          .difficulty-badge.intermediate {
            background: #fef3c7;
            color: #92400e;
          }

          .difficulty-badge.advanced {
            background: #fee2e2;
            color: #991b1b;
          }

          .feature-card h3 {
            margin: 0 0 1rem 0;
            color: #111827;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .feature-card p {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            font-weight: 500;
          }

          .feature-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .tag {
            background: #f3f4f6;
            color: #1f2937;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .feature-details {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            animation: slideDown 0.3s ease;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .feature-extended {
            margin: 0 0 0.75rem 0;
            color: #1e3a8a;
            font-weight: 600;
          }

          .feature-details ul {
            margin: 0;
            padding-left: 1.5rem;
            color: #1f2937;
          }

          .feature-details li {
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          .feature-btn {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
          }

          .feature-btn:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }

          /* 优势部分样式 */
          .advantages-section {
            background: #f8fafc;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 3rem;
          }

          .advantages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .advantage-item {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            cursor: default;
            position: relative;
          }

          .advantage-item.expanded {
            transform: scale(1.05);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-color: #3b82f6;
          }

          .advantage-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .advantage-emoji {
            font-size: 1.5rem;
          }

          .advantage-item h3 {
            margin: 0;
            color: #1e3a8a;
            font-size: 1.125rem;
            font-weight: 700;
          }

          .advantage-item p {
            margin: 0;
            color: #1f2937;
            line-height: 1.5;
            font-size: 0.875rem;
            font-weight: 500;
          }

          .advantage-detail {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .advantage-detail p {
            color: #1e3a8a;
            font-weight: 600;
          }

          /* React 19.2 更新部分样式 */
          .update-section {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 3rem;
            border: 1px solid #bbf7d0;
          }

          .update-section .section-header h2 {
            color: #166534;
          }

          .update-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .update-item {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #bbf7d0;
          }

          .update-item h3 {
            margin: 0 0 1rem 0;
            color: #14532d;
            font-size: 1.125rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
          }

          .update-item ul {
            margin: 0;
            padding-left: 1.5rem;
            color: #1f2937;
            line-height: 1.6;
          }

          .update-item li {
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          /* 兼容性部分样式 */
          .compatibility-section {
            margin-bottom: 3rem;
          }

          .compatibility-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .compatibility-item {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.2s ease;
          }

          .compatibility-item:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
          }

          .compatibility-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .item-name {
            font-weight: 700;
            color: #111827;
          }

          .item-status {
            padding: 0.25rem 0.5rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .item-status.required {
            background: #fee2e2;
            color: #991b1b;
          }

          .item-status.recommended {
            background: #fef3c7;
            color: #92400e;
          }

          .item-version {
            font-family: monospace;
            color: #4b5563;
            font-size: 0.875rem;
            font-weight: 600;
          }

          /* 使用指南样式 */
          .usage-guide {
            background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            border-radius: 16px;
            padding: 2rem;
          }

          .usage-guide .section-header h2 {
            color: #92400e;
          }

          .guide-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }

          .guide-section {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #fbbf24;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .guide-section h3 {
            margin: 0 0 1rem 0;
            color: #78350f;
            font-size: 1.125rem;
            font-weight: 700;
          }

          .guide-steps {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .step {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
          }

          .step-number {
            background: #3b82f6;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.875rem;
            flex-shrink: 0;
          }

          .step-content h4 {
            margin: 0 0 0.5rem 0;
            color: #111827;
            font-size: 1rem;
            font-weight: 600;
          }

          .step-content code {
            background: #f3f4f6;
            color: #1f2937;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .practice-list,
          .warning-list {
            margin: 0;
            padding-left: 1.5rem;
            color: #1f2937;
            line-height: 1.6;
          }

          .practice-list li,
          .warning-list li {
            margin-bottom: 0.75rem;
            font-weight: 500;
          }

          .practice-list li strong {
            color: #059669;
          }

          .warning-list li strong {
            color: #dc2626;
          }

          /* 响应式设计 */
          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
              gap: 1rem;
            }

            .header-text h1 {
              font-size: 2rem;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }

            .advantages-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .compatibility-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .guide-content,
            .update-grid {
              grid-template-columns: 1fr;
            }

            .feature-card {
              padding: 1.5rem;
            }

            .page-header {
              padding: 2rem 1rem;
            }
          }

          @media (max-width: 480px) {
            .advantages-grid {
              grid-template-columns: 1fr;
            }

            .compatibility-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
			</div>
		</Layout>
	);
}
