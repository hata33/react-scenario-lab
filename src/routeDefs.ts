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
			{ path: "richtext", title: "富文本" },
			{ path: "notifications", title: "通知" },
			{ path: "payment", title: "支付" },
		],
	},
	{
		path: "performance",
		title: "性能",
		children: [{ path: "virtual-list", title: "虚拟列表" }],
	},
	{
		path: "d3js",
		title: "D3.js 可视化",
		children: [
			{ path: "multi-level-nodes", title: "多层级节点关系" },
			{ path: "new-style-graph", title: "新风格力导向图" },
		],
	},
];
