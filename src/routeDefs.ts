export type RouteChild = { path: string; title: string };
export type RouteGroup = {
	path: string;
	title: string;
	children: RouteChild[];
};

export const routeGroups: RouteGroup[] = [
	{
		path: "basic",
		title: "基础",
		children: [
			{ path: "counter", title: "Counter 计数器" },
			{ path: "todolist", title: "TodoList 待办" },
		],
	},
	{
		path: "mobile",
		title: "移动端",
		children: [
			{ path: "responsive-design", title: "响应式设计" },
			{ path: "device-api", title: "设备API" },
			{ path: "pwa", title: "PWA功能" },
		],
	},
	{
		path: "special-effects",
		title: "特效",
		children: [
			{ path: "liquid-glass", title: "液体玻璃" },
			{ path: "liquid-glass/basic", title: "基础液体玻璃" },
			{ path: "liquid-glass/advanced", title: "高级液体玻璃" },
			{ path: "liquid-glass/interactive", title: "交互式液体玻璃" },
			{ path: "liquid-glass/experimental", title: "实验性液体玻璃" },
		],
	},
	{
		path: "forms",
		title: "表单",
		children: [
			{ path: "basic", title: "基础表单" },
			{ path: "step", title: "分步表单" },
			{ path: "validation", title: "表单校验" },
			{ path: "dynamic-builder", title: "动态表单构建器" },
		],
	},
	{
		path: "data",
		title: "数据",
		children: [
			{ path: "table", title: "表格" },
			{ path: "search-filter", title: "搜索/筛选" },
		],
	},
	{
		path: "charts",
		title: "图表",
		children: [
			{ path: "bar", title: "柱状图" },
			{ path: "line", title: "折线图" },
			{ path: "pie", title: "饼图" },
		],
	},
	{
		path: "files",
		title: "文件",
		children: [
			{ path: "upload", title: "文件上传" },
			{ path: "large-upload", title: "大文件上传" },
			{ path: "preview", title: "文件预览" },
			{ path: "export", title: "数据导出" },
		],
	},
	{
		path: "map",
		title: "地图",
		children: [
			{ path: "markers", title: "点标注" },
			{ path: "route-planner", title: "路径规划" },
		],
	},
	{
		path: "animation",
		title: "动画/交互",
		children: [
			{ path: "page-transition", title: "页面过渡" },
			{ path: "element", title: "元素动画" },
			{ path: "drag-drop", title: "拖拽" },
		],
	},
	{
		path: "chat",
		title: "实时通信",
		children: [{ path: "room", title: "聊天室(WebSocket)" }],
	},
	{
		path: "auth",
		title: "认证",
		children: [
			{ path: "login", title: "登录" },
			{ path: "register", title: "注册" },
			{ path: "guard", title: "路由守卫" },
			{ path: "qr-login", title: "扫码登录" },
		],
	},
	{
		path: "other",
		title: "其他",
		children: [
			{ path: "i18n", title: "国际化" },
			{ path: "theme", title: "主题切换" },
			{ path: "notifications", title: "通知" },
			{ path: "payment", title: "支付" },
		],
	},
	{
		path: "rich-text",
		title: "富文本编辑器",
		children: [
			{ path: "basic", title: "基础编辑器" },
			{ path: "advanced", title: "高级编辑器" },
			{ path: "collaboration", title: "协作编辑器" },
		],
	},
	{
		path: "markdown",
		title: "Markdown编辑器",
		children: [
			{ path: "editor", title: "编辑器" },
			{ path: "milkdown", title: "Milkdown编辑器" },
		],
	},
	{
		path: "performance",
		title: "性能",
		children: [{ path: "virtual-list", title: "虚拟列表" }, { path: "frontend-cache", title: "前端缓存系统" }],
	},
	{
		path: "d3js",
		title: "D3.js 可视化",
		children: [
			{ path: "multi-level-nodes", title: "多层级节点关系" },
			{ path: "new-style-graph", title: "新风格力导向图" },
		],
	},
	{
		path: "nextjs-features",
		title: "Next.js 特性",
		children: [
			{ path: "routing", title: "App Router" },
			{ path: "server-components", title: "Server Components" },
			{ path: "data-fetching", title: "数据获取" },
			{ path: "performance", title: "性能优化" },
			{ path: "api-routes", title: "API 路由" },
			{ path: "metadata", title: "元数据 SEO" },
			{ path: "seo-demo", title: "SEO 实战演示" },
			{ path: "seo-geo-complete", title: "SEO GEO 完整优化" },
			{ path: "styling", title: "样式方案" },
			{ path: "state-management", title: "状态管理" },
			{ path: "forms", title: "表单处理" },
			{ path: "i18n", title: "国际化" },
			{ path: "testing", title: "测试策略" },
			{ path: "security", title: "安全性" },
		],
	},
	{
		path: "ai",
		title: "AI 能力测试",
		children: [
			{ path: "chat", title: "AI 对话" },
			{ path: "image", title: "文生图" },
			{ path: "voice", title: "语音处理" },
			{ path: "video", title: "视频处理" },
			{ path: "tools", title: "AI 工具集" },
			{ path: "multimodal", title: "多模态" },
		],
	},
	{
		path: "gsap",
		title: "GSAP",
		children: [
			{ path: "playground", title: "Playground 总览" },
			{ path: "base", title: "基础入门" },
			{ path: "timeline", title: "时间轴" },
			{ path: "eases", title: "缓动函数" },
			{ path: "stagger", title: "错位动画" },
		],
	},
	{
		path: "supabase",
		title: "Supabase 数据库",
		children: [
			{ path: "auth", title: "用户认证" },
			{ path: "todo", title: "Todo 应用" },
			{ path: "dashboard", title: "控制面板" },
		],
	},
	{
		path: "sentry",
		title: "Sentry 错误监控",
		children: [
			{ path: "error-boundary", title: "错误边界" },
			{ path: "performance", title: "性能监控" },
			{ path: "breadcrumbs", title: "面包屑追踪" },
			{ path: "releases", title: "版本追踪" },
		],
	},
];
