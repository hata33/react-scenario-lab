"use client";

import { useState } from "react";

const platforms = [
	{
		id: "web",
		name: "Web 网页",
		icon: "🌐",
		color: "blue",
		description: "运行在浏览器中，跨平台访问",
		screenSize: { width: 1920, height: 1080, label: "桌面端", ratio: "16:9" },
		navPosition: "top",
		interaction: "鼠标点击 + 悬停 + 键盘",
		features: ["响应式布局", "URL 导航", "浏览器原生控件", "SEO 友好", "跨平台"],
		uiElements: [
			{ type: "顶部导航", style: "固定顶部，包含 Logo、菜单、搜索栏", icon: "🔝" },
			{ type: "轮播图", style: "大尺寸横幅，自动切换，箭头控制", icon: "🖼️" },
			{ type: "卡片网格", style: "多列布局（3-4列），悬停阴影效果", icon: "📋" },
			{ type: "底部链接", style: "页脚信息，友情链接，社交媒体", icon: "🔗" },
		],
		designSpecs: [
			{ label: "最小点击区域", value: "44×44px", bar: 80 },
			{ label: "正文字号", value: "16-18px", bar: 70 },
			{ label: "标题字号", value: "24-48px", bar: 90 },
			{ label: "内容边距", value: "24-32px", bar: 60 },
			{ label: "动画时长", value: "200-300ms", bar: 50 },
		],
		codeSnippet: `.card {
  padding: 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}`,
		deviceType: "desktop",
	},
	{
		id: "h5",
		name: "H5 页面",
		icon: "📱",
		color: "green",
		description: "专为移动端优化，单页应用",
		screenSize: { width: 375, height: 667, label: "iPhone SE", ratio: "9:16" },
		navPosition: "top",
		interaction: "触摸滑动 + 点击 + 手势",
		features: ["触摸优化", "滑动浏览", "手势交互", "移动端适配", "PWA 支持"],
		uiElements: [
			{ type: "顶部栏", style: "固定导航，返回按钮，分享功能", icon: "📍" },
			{ type: "滑动轮播", style: "全屏宽度，手势左右滑动", icon: "👆" },
			{ type: "瀑布流", style: "单列布局，无限滚动加载", icon: "📜" },
			{ type: "底部操作", style: "固定底部，主要CTA按钮", icon: "⚡" },
		],
		designSpecs: [
			{ label: "最小触摸区域", value: "48×48px", bar: 85 },
			{ label: "正文字号", value: "16-20px", bar: 80 },
			{ label: "标题字号", value: "20-28px", bar: 75 },
			{ label: "安全边距", value: "16-20px", bar: 65 },
			{ label: "动画时长", value: "300-400ms", bar: 65 },
		],
		codeSnippet: `.touch-target {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  active: scale(0.95);
}`,
		deviceType: "phone",
	},
	{
		id: "miniprogram",
		name: "小程序",
		icon: "🔲",
		color: "purple",
		description: "运行在超级 App 内，轻量应用",
		screenSize: { width: 375, height: 667, label: "微信标准", ratio: "9:16" },
		navPosition: "top",
		interaction: "原生手势 + API 调用",
		features: ["原生组件", "平台能力", "胶囊导航", "分包加载", "快速启动"],
		uiElements: [
			{ type: "胶囊导航", style: "右上角固定，系统默认样式", icon: "💊" },
			{ type: "原生轮播", style: "swiper组件，圆点指示器", icon: "🎠" },
			{ type: "列表卡片", style: "统一样式，点击跳转新页面", icon: "📝" },
			{ type: "底部TabBar", style: "系统TabBar，图标+文字切换", icon: "📊" },
		],
		designSpecs: [
			{ label: "最小触摸区域", value: "48×48px", bar: 85 },
			{ label: "正文字号", value: "14-18px", bar: 70 },
			{ label: "标题字号", value: "18-24px", bar: 70 },
			{ label: "安全边距", value: "16-32px", bar: 75 },
			{ label: "动画时长", value: "200-300ms", bar: 55 },
		],
		codeSnippet: `<view class="container">
  <swiper indicator-dots>
    <swiper-item>...</swiper-item>
  </swiper>
  <button bindtap="handleTap">
    点击事件
  </button>
</view>`,
		deviceType: "phone",
	},
	{
		id: "app",
		name: "原生 App",
		icon: "📲",
		color: "orange",
		description: "操作系统应用，最佳性能",
		screenSize: { width: 390, height: 844, label: "iPhone 14", ratio: "9:19.5" },
		navPosition: "bottom",
		interaction: "系统手势 + 复杂交互",
		features: ["系统级权限", "复杂动画", "离线缓存", "推送通知", "60fps 流畅"],
		uiElements: [
			{ type: "大标题导航", style: "大标题样式，滚动时渐变隐藏", icon: "🎯" },
			{ type: "集合视图", style: "复杂布局，长按拖拽排序", icon: "🗂️" },
			{ type: "底部导航", style: "Tab Bar，毛玻璃效果", icon: "🧭" },
			{ type: "模态视图", style: "从底部滑入，支持手势关闭", icon: "🎪" },
		],
		designSpecs: [
			{ label: "最小点击区域", value: "44×44pt", bar: 80 },
			{ label: "正文字号", value: "15-17pt", bar: 72 },
			{ label: "标题字号", value: "20-34pt", bar: 85 },
			{ label: "安全边距", value: "16-20pt", bar: 70 },
			{ label: "动画时长", value: "250-350ms", bar: 70 },
		],
		codeSnippet: `UINavigationController *nav = [[UINavigationController alloc] init];
nav.navigationBar.prefersLargeTitles = YES;

UIViewPropertyAnimator *animator = [UIViewPropertyAnimator
  runningWithDuration:0.3 delay:0 options:0
  animations:^{
    view.transform = CGAffineTransformMakeScale(1.05, 1.05);
  }];`,
		deviceType: "phone",
	},
];

const colorMap = {
	blue: {
		bg: "from-blue-500 to-cyan-500",
		text: "text-blue-600",
		border: "border-blue-200",
		light: "bg-blue-50",
		dark: "dark:bg-blue-900/20",
		darkText: "dark:text-blue-400",
		shadow: "shadow-blue-500/30",
	},
	green: {
		bg: "from-green-500 to-emerald-500",
		text: "text-green-600",
		border: "border-green-200",
		light: "bg-green-50",
		dark: "dark:bg-green-900/20",
		darkText: "dark:text-green-400",
		shadow: "shadow-green-500/30",
	},
	purple: {
		bg: "from-purple-500 to-pink-500",
		text: "text-purple-600",
		border: "border-purple-200",
		light: "bg-purple-50",
		dark: "dark:bg-purple-900/20",
		darkText: "dark:text-purple-400",
		shadow: "shadow-purple-500/30",
	},
	orange: {
		bg: "from-orange-500 to-red-500",
		text: "text-orange-600",
		border: "border-orange-200",
		light: "bg-orange-50",
		dark: "dark:bg-orange-900/20",
		darkText: "dark:text-orange-400",
		shadow: "shadow-orange-500/30",
	},
};

export function PlatformComparisonBlock() {
	const [activePlatform, setActivePlatform] = useState(platforms[0]);
	const [viewMode, setViewMode] = useState<"ui" | "specs" | "code">("ui");

	return (
		<section className="platform-comparison relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-purple-50/30 py-20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			{/* 动态装饰背景 */}
			<div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
				<div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
				{/* 网格装饰 */}
				<div className="absolute inset-0 opacity-[0.03]" style={{
					backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
					backgroundSize: '50px 50px'
				}} />
			</div>

			<div className="container mx-auto px-4 relative">
				{/* 标题区域 - 增强 */}
				<div className="mb-12 text-center">
					<div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 border border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-sm">
						<span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-lg shadow-blue-500/50"></span>
						<span className="font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent dark:from-blue-300 dark:to-purple-300 text-sm">
							视觉对比
						</span>
					</div>
					<h2 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 drop-shadow-sm">
						不同载体的界面展示
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
						通过可视化展示，直观了解 Web、H5、小程序、App 在界面和交互上的差异
					</p>
				</div>

				{/* 平台选择器 - 优化 */}
				<div className="mb-10">
					<div className="flex flex-wrap justify-center gap-4">
						{platforms.map((platform) => {
							const colors = colorMap[platform.color as keyof typeof colorMap];
							const isActive = activePlatform.id === platform.id;
							return (
								<button
									key={platform.id}
									onClick={() => setActivePlatform(platform)}
									className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
										isActive
											? `${colors.border} bg-gradient-to-br ${colors.bg} border-current shadow-2xl shadow-${colors.shadow} scale-105`
											: "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg"
									}`}
								>
									{/* 卡片光效 */}
									{isActive && (
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
									)}
									<div className="relative flex items-center gap-4 px-6 py-4">
										<div className={`relative ${isActive ? 'animate-bounce' : ''}`}>
											<div className={`text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
												{platform.icon}
											</div>
											{isActive && (
												<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/50 rounded-full" />
											)}
										</div>
										<div className="text-left">
											<div className={`font-bold text-lg transition-colors ${isActive ? "text-white" : "text-slate-900 dark:text-slate-100"}`}>
												{platform.name}
											</div>
											<div className={`text-xs transition-colors ${isActive ? "text-white/90" : "text-slate-500 dark:text-slate-400"}`}>
												{platform.screenSize.label}
											</div>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* 视图模式切换 - 优化 */}
				<div className="mb-10 flex justify-center">
					<div className="inline-flex rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-1.5 shadow-xl">
						<button
							onClick={() => setViewMode("ui")}
							className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
								viewMode === "ui"
									? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
									: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
							}`}
						>
							📱 界面展示
						</button>
						<button
							onClick={() => setViewMode("specs")}
							className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
								viewMode === "specs"
									? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
									: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
							}`}
						>
							📐 设计规范
						</button>
						<button
							onClick={() => setViewMode("code")}
							className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
								viewMode === "code"
									? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
									: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
							}`}
						>
							💻 代码示例
						</button>
					</div>
				</div>

				{/* 内容展示区域 */}
				<div className="max-w-7xl mx-auto">
					{viewMode === "ui" ? <UIPlatformShowcase platform={activePlatform} /> :
					 viewMode === "specs" ? <DesignSpecsShowcase platform={activePlatform} /> :
					 <CodeExampleShowcase platform={activePlatform} />}
				</div>
			</div>
		</section>
	);
}

// UI 界面展示组件 - 增强
function UIPlatformShowcase({ platform }: { platform: typeof platforms[0] }) {
	const colors = colorMap[platform.color as keyof typeof colorMap];
	const isDesktop = platform.deviceType === "desktop";

	return (
		<div className="grid gap-8 lg:grid-cols-5">
			{/* 设备模拟器 - 增强 */}
			<div className="lg:col-span-2">
				<div className="relative">
					{/* 背景装饰 */}
					<div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-10 rounded-3xl blur-3xl`} />
					<div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-3xl transform rotate-2 scale-105" />

					{/* 设备框架 */}
					<div className={`relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${
						isDesktop ? 'aspect-video' : 'aspect-[9/16] max-w-[400px] mx-auto'
					}`}>
						{/* 设备标题栏 */}
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} text-2xl shadow-xl ring-4 ring-white/50`}>
									{platform.icon}
								</div>
								<div>
									<h3 className="font-bold text-slate-900 dark:text-slate-100">{platform.name}</h3>
									<p className="text-slate-500 text-xs dark:text-slate-400">{platform.screenSize.ratio}</p>
								</div>
							</div>
							<div className="text-right">
								<div className={`font-mono text-xs font-bold ${colors.text} dark:${colors.darkText}`}>
									{platform.screenSize.width}×{platform.screenSize.height}
								</div>
							</div>
						</div>

						{/* 模拟屏幕 - 增强 */}
						<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-inner ring-4 ring-slate-300 dark:ring-slate-600">
							{/* 状态栏 */}
							<div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
								<span className="text-slate-900 text-xs font-bold dark:text-slate-100">9:41</span>
								<div className="flex items-center gap-1.5">
									<div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center">
										<div className="w-3 h-3 rounded-full bg-slate-600 dark:bg-slate-400" />
									</div>
									<div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center">
										<div className="w-3 h-3 rounded-full bg-slate-600 dark:bg-slate-400" />
									</div>
									<div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center">
										<div className="w-3 h-3 rounded-full bg-slate-600 dark:bg-slate-400" />
									</div>
								</div>
								<div className="flex items-center gap-1">
									<div className={`w-8 h-4 rounded-sm ${colors.light} ${colors.dark}`} />
									<div className={`w-6 h-4 rounded-sm ${colors.light} ${colors.dark}`} />
								</div>
							</div>

							{/* 内容区域 */}
							<div className={`p-3 space-y-2 ${isDesktop ? '' : ''}`}>
								{/* 导航栏 */}
								<div className={`rounded-xl ${colors.light} ${colors.dark} p-3 flex items-center justify-between border ${colors.border} shadow-sm`}>
									<div className="flex items-center gap-2">
										<div className={`w-7 h-7 rounded-lg ${colors.light} flex items-center justify-center text-xs font-bold shadow-inner`}>←</div>
										<span className={`font-semibold text-sm ${colors.text} ${colors.darkText}`}>页面标题</span>
									</div>
									<div className="flex gap-1">
										<div className={`w-7 h-7 rounded-lg ${colors.light} flex items-center justify-center text-xs shadow-inner`}>⋯</div>
										<div className={`w-7 h-7 rounded-lg ${colors.light} flex items-center justify-center text-xs shadow-inner`}>🔍</div>
									</div>
								</div>

								{/* 轮播图 */}
								<div className={`relative rounded-2xl bg-gradient-to-br ${colors.bg} h-28 flex items-center justify-center text-white overflow-hidden shadow-lg`}>
									<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
									<span className="relative text-5xl opacity-60">{platform.icon}</span>
									{/* 指示器 */}
									<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
										<div className="w-4 h-1.5 rounded-full bg-white" />
										<div className="w-1.5 h-1.5 rounded-full bg-white/50" />
										<div className="w-1.5 h-1.5 rounded-full bg-white/50" />
									</div>
								</div>

								{/* 卡片网格/列表 */}
								<div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
									{[1, 2, 3, 4, 5, 6].slice(0, isDesktop ? 6 : 4).map((i) => (
										<div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
											<div className={`w-full h-12 rounded-lg mb-2 ${colors.light} ${colors.dark} flex items-center justify-center text-2xl`}>
												{platform.icon}
											</div>
											<div className="w-3/4 h-2.5 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
											<div className="w-1/2 h-2 bg-slate-100 dark:bg-slate-800 rounded" />
										</div>
									))}
								</div>

								{/* 按钮 */}
								<div className={`rounded-xl bg-gradient-to-r ${colors.bg} py-3 text-center text-white font-bold text-sm shadow-lg transition-transform active:scale-95`}>
									立即体验 →
								</div>
							</div>
						</div>

						{/* 底部指示条 */}
						<div className="mt-4 flex justify-center">
							<div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
						</div>
					</div>
				</div>
			</div>

			{/* UI 元素说明 - 增强 */}
			<div className="lg:col-span-3 space-y-6">
				{/* 交互方式卡片 */}
				<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all hover:shadow-2xl">
					<div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
					<div className="relative">
						<div className="mb-4 flex items-center gap-4">
							<div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} text-2xl shadow-xl ring-4 ring-white/50`}>
								👆
							</div>
							<div>
								<div className="text-slate-500 text-xs dark:text-slate-400 font-medium">主要交互方式</div>
								<div className="font-bold text-xl text-slate-900 dark:text-slate-100">{platform.interaction}</div>
							</div>
						</div>
						{/* 触摸/鼠标示意 */}
						<div className="flex gap-3">
							{platform.interaction.includes("鼠标") && (
								<div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-700/50 p-3 text-center border-2 border-dashed border-slate-300 dark:border-slate-600">
									<span className="text-2xl">🖱️</span>
									<div className="text-xs text-slate-600 dark:text-slate-400 mt-1">点击</div>
								</div>
							)}
							{platform.interaction.includes("触摸") && (
								<div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-700/50 p-3 text-center border-2 border-dashed border-slate-300 dark:border-slate-600">
									<span className="text-2xl">👆</span>
									<div className="text-xs text-slate-600 dark:text-slate-400 mt-1">触摸</div>
								</div>
							)}
							{platform.interaction.includes("手势") && (
								<div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-700/50 p-3 text-center border-2 border-dashed border-slate-300 dark:border-slate-600">
									<span className="text-2xl">👋</span>
									<div className="text-xs text-slate-600 dark:text-slate-400 mt-1">手势</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* UI 元素列表 */}
				<div>
					<h4 className="mb-4 flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-slate-100">
						<span className="text-2xl">🎨</span>
						界面元素
					</h4>
					<div className="grid gap-3 sm:grid-cols-2">
						{platform.uiElements.map((element) => (
							<div key={element.type} className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 p-4 shadow-md dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 transition-all hover:shadow-lg hover:-translate-y-1">
								<div className="flex items-start gap-3">
									<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-lg shadow-inner`}>
										{element.icon}
									</div>
									<div className="flex-1 min-w-0">
										<h5 className="mb-1 font-bold text-slate-900 dark:text-slate-100 text-sm">{element.type}</h5>
										<p className="text-slate-600 text-xs dark:text-slate-400 leading-relaxed">{element.style}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 特点标签 */}
				<div>
					<h4 className="mb-4 flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-slate-100">
						<span className="text-2xl">✨</span>
						核心特性
					</h4>
					<div className="flex flex-wrap gap-2">
						{platform.features.map((feature) => (
							<span key={feature} className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} font-semibold text-sm border ${colors.border} shadow-sm hover:shadow-md transition-all`}>
								<span className="w-2 h-2 rounded-full bg-current animate-pulse" />
								{feature}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// 设计规范展示组件 - 增强
function DesignSpecsShowcase({ platform }: { platform: typeof platforms[0] }) {
	const colors = colorMap[platform.color as keyof typeof colorMap];

	return (
		<div className="space-y-8">
			{/* 规范标题 */}
			<div className="text-center">
				<div className={`inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gradient-to-br ${colors.bg} text-white shadow-2xl shadow-${colors.shadow} mb-6`}>
					<span className="text-4xl">{platform.icon}</span>
					<div className="text-left">
						<div className="font-bold text-2xl">{platform.name}</div>
						<div className="text-white/80 text-sm">设计规范</div>
					</div>
				</div>
				<p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
					{platform.description} · 遵循平台官方设计指南，确保最佳用户体验
				</p>
			</div>

			{/* 规范卡片网格 */}
			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{platform.designSpecs.map((spec, index) => (
					<div key={spec.label} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ animationDelay: `${index * 50}ms` }}>
						<div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />

						<div className="relative">
							{/* 标签 */}
							<div className="mb-4 flex items-center gap-3">
								<div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} text-white text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
									{spec.label[0]}
								</div>
								<div className="text-slate-500 text-sm dark:text-slate-400 font-medium">{spec.label}</div>
							</div>

							{/* 数值 */}
							<div className={`mb-4 text-4xl font-bold ${colors.text} ${colors.darkText} transition-transform duration-300 group-hover:scale-105`}>
								{spec.value}
							</div>

							{/* 进度条 */}
							<div className="relative h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
								<div
									className={`h-full rounded-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 group-hover:shadow-lg`}
									style={{ width: `${spec.bar}%` }}
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
									<style>{`
										@keyframes shimmer {
											0% { transform: translateX(-100%); }
											100% { transform: translateX(100%); }
										}
										.animate-shimmer {
											animation: shimmer 2s infinite;
										}
									`}</style>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* 设计差异说明卡片 */}
			<div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
				<h5 className="mb-6 flex items-center gap-3 font-bold text-xl text-slate-900 dark:text-slate-100">
					<span className="text-2xl">💡</span>
					设计差异说明
				</h5>
				<div className="grid gap-4 md:grid-cols-2">
					{[
						{ icon: "🎯", title: "点击区域适配", desc: "根据平台特性调整最小触摸区域，确保操作便利性" },
						{ icon: "⏱️", title: "动画时长优化", desc: "不同平台的动画节奏有所差异，保持流畅自然" },
						{ icon: "📐", title: "安全区域预留", desc: "考虑刘海屏、圆角等设备特性，预留安全边距" },
						{ icon: "🔤", title: "字体系统选择", desc: "遵循平台原生字体规范，保持系统一致性" },
					].map((item) => (
						<div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm dark:shadow-none transition-all hover:shadow-md">
							<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-lg`}>
								{item.icon}
							</div>
							<div>
								<div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{item.title}</div>
								<div className="text-slate-600 text-sm dark:text-slate-400 leading-relaxed">{item.desc}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// 代码示例展示组件 - 新增
function CodeExampleShowcase({ platform }: { platform: typeof platforms[0] }) {
	const colors = colorMap[platform.color as keyof typeof colorMap];

	return (
		<div className="space-y-8">
			{/* 标题 */}
			<div className="text-center">
				<div className={`inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gradient-to-br ${colors.bg} text-white shadow-2xl shadow-${colors.shadow} mb-6`}>
					<span className="text-4xl">{platform.icon}</span>
					<div className="text-left">
						<div className="font-bold text-2xl">{platform.name}</div>
						<div className="text-white/80 text-sm">代码示例</div>
					</div>
				</div>
				<p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
					了解不同平台的代码实现方式和最佳实践
				</p>
			</div>

			{/* 代码展示区域 */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* 代码示例 */}
				<div className="lg:col-span-2">
					<div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
						{/* 代码头部 */}
						<div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<div className="w-3 h-3 rounded-full bg-green-500" />
								</div>
								<div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
									<div className={`w-2 h-2 rounded-full ${colors.light.replace('bg-', 'bg-').replace('50', '500')}`} />
									<span className="text-xs font-medium text-slate-600 dark:text-slate-400">
										{platform.id === 'web' ? 'CSS + HTML' :
										 platform.id === 'h5' ? 'CSS' :
										 platform.id === 'miniprogram' ? 'WXML' : 'Swift'}
									</span>
								</div>
							</div>
							<button className={`px-4 py-2 rounded-lg ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-sm font-semibold transition-all hover:scale-105 active:scale-95`}>
								复制代码
							</button>
						</div>

						{/* 代码内容 */}
						<div className="bg-slate-900 dark:bg-slate-950 p-6 overflow-x-auto">
							<pre className="text-sm leading-relaxed">
								<code dangerouslySetInnerHTML={{
									__html: platform.codeSnippet
										.split('\n')
										.map((line, i) => {
											let coloredLine = line
												.replace(/(import|from|const|let|var|function|return|if|else)/g, '<span class="text-pink-400">$1</span>')
												.replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
												.replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
												.replace(/(\.[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="text-yellow-300">$1</span>')
												.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\(/g, '<span class="text-blue-400">$1</span>(')
												.replace(/(\/\*.*?\*\/)/g, '<span class="text-slate-500">$1</span>')
												.replace(/(&lt;[a-z]+)/g, '<span class="text-purple-400">$1</span>')
												.replace(/([a-z]+&gt;)/g, '<span class="text-purple-400">$1</span>')
												.replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
											return `<div class="flex"><span class="w-8 text-slate-600 select-none">${i + 1}</span><span>${coloredLine || ' '}</span></div>`;
										})
										.join('')
								}} />
							</pre>
						</div>
					</div>
				</div>

				{/* 特性说明卡片 */}
				{[
					{
						icon: "🎨",
						title: "样式定义",
						items: platform.id === 'web' ? ["使用 CSS 预处理器", "支持响应式媒体查询", "利用 CSS 变量主题化"] :
							   platform.id === 'h5' ? ["使用 touch-action 优化", "利用 viewport 设置", "添加 -webkit- 前缀"] :
							   platform.id === 'miniprogram' ? ["使用 rpx 单位适配", "支持全局样式", "组件样式隔离"] :
							   ["使用 Auto Layout", "支持深色模式", "遵循 Human Interface"]
					},
					{
						icon: "⚡",
						title: "交互实现",
						items: platform.id === 'web' ? ["addEventListener 绑定", "CSS :hover 伪类", "preventDefault 阻止默认"] :
							   platform.id === 'h5' ? ["touchstart/touchend", "利用 passive 优化", "preventDefault 阻止滚动"] :
							   platform.id === 'miniprogram' ? ["bindtap 绑定事件", "catchtap 阻止冒泡", "使用 behavior 封装"] :
							   ["UIGestureRecognizer", "Target-Action 模式", "Combine 框架"]
					},
				].map((section) => (
					<div key={section.title} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 transition-all hover:shadow-xl">
						<div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
						<div className="relative">
							<div className="mb-4 flex items-center gap-3">
								<div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} text-2xl shadow-lg`}>
									{section.icon}
								</div>
								<h5 className="font-bold text-xl text-slate-900 dark:text-slate-100">{section.title}</h5>
							</div>
							<ul className="space-y-2">
								{section.items.map((item) => (
									<li key={item} className="flex items-start gap-3">
										<div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-xs mt-0.5`}>✓</div>
										<span className="text-slate-600 dark:text-slate-400">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>

			{/* 最佳实践提示 */}
			<div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
				<h5 className="mb-6 flex items-center gap-3 font-bold text-xl text-slate-900 dark:text-slate-100">
					<span className="text-2xl">💡</span>
					最佳实践建议
				</h5>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="flex items-start gap-3">
						<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-sm font-bold`}>1</div>
						<div>
							<div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">遵循平台规范</div>
							<div className="text-slate-600 text-sm dark:text-slate-400">仔细阅读官方设计指南，确保符合平台惯例</div>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-sm font-bold`}>2</div>
						<div>
							<div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">测试真实设备</div>
							<div className="text-slate-600 text-sm dark:text-slate-400">在多种设备上测试，确保一致性体验</div>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.light} ${colors.dark} ${colors.text} ${colors.darkText} text-sm font-bold`}>3</div>
						<div>
							<div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">保持代码简洁</div>
							<div className="text-slate-600 text-sm dark:text-slate-400">使用组件化和模块化，提高代码可维护性</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
