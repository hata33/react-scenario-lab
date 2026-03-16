"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";

// ============== 数据定义 ==============

// Hero 内容
const heroContent = {
	title: "前端发展史",
	subtitle: "从史前时期到 AI 时代",
	description: "探索 Web 前端技术的演进历程，见证从静态页面到智能应用的伟大变革。",
};

// 三大核心技术数据
const coreTechDetails = [
	{
		id: "html",
		name: "HTML",
		icon: "📄",
		color: "orange",
		tagline: "网页的骨架和结构",
		birthYear: 1991,
		creator: "Tim Berners-Lee",
		description:
			"HTML（HyperText Markup Language）超文本标记语言，是构建网页的基础。它定义了网页的内容结构和语义，是所有网页技术的基石。",
		keyFeatures: [
			{
				title: "核心概念",
				items: [
					"标签（Tag）和元素（Element）",
					"语义化标签（Semantic HTML）",
					"文档对象模型（DOM）",
					"超链接和锚点",
					"表单和输入",
				],
			},
			{
				title: "HTML5 新特性",
				items: [
					"语义化标签：header、nav、article、section",
					"多媒体标签：audio、video",
					"图形绘制：canvas、svg",
					"本地存储：localStorage、sessionStorage",
					"地理位置、拖放API等",
				],
			},
		],
		history: [
			{ year: 1991, event: "Tim Berners-Lee 创建 HTML" },
			{ year: 1995, event: "HTML 2.0 发布" },
			{ year: 1997, event: "HTML 3.2 和 HTML 4.0 发布" },
			{ year: 1999, event: "HTML 4.01 发布，成为标准" },
			{ year: 2008, event: "HTML5 草案发布" },
			{ year: 2014, event: "HTML5 正式成为 W3C 推荐" },
		],
		versions: [
			{
				version: "HTML 4.01",
				year: 1999,
				features: ["严格的语法规范", "CSS支持", "JavaScript集成"],
			},
			{
				version: "HTML5",
				year: 2014,
				features: ["语义化标签", "多媒体支持", "本地存储", "离线应用"],
			},
		],
		codeExample: {
			title: "HTML5 语义化结构示例",
			code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>网页标题</title>
</head>
<body>
  <header>
    <nav>导航菜单</nav>
  </header>

  <main>
    <article>
      <h1>文章标题</h1>
      <p>文章内容...</p>
    </article>

    <aside>
      <h3>侧边栏</h3>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 版权信息</p>
  </footer>
</body>
</html>`,
			explanation:
				"使用 HTML5 语义化标签构建页面结构，header、nav、main、article、aside、footer 等标签使页面结构清晰，有利于 SEO 和可访问性。",
		},
	},
	{
		id: "css",
		name: "CSS",
		icon: "🎨",
		color: "blue",
		tagline: "网页的视觉表现",
		birthYear: 1996,
		creator: "Håkon Wium Lie",
		description:
			"CSS（Cascading Style Sheets）层叠样式表，用于描述 HTML 文档的呈现方式。它控制网页的布局、颜色、字体、动画等所有视觉效果。",
		keyFeatures: [
			{
				title: "核心概念",
				items: ["选择器（Selector）", "盒模型（Box Model）", "定位（Positioning）", "浮动和 Flexbox", "Grid 网格布局"],
			},
			{
				title: "CSS3 新特性",
				items: [
					"Flexbox 弹性布局",
					"Grid 网格布局",
					"动画和过渡（Animation/Transition）",
					"媒体查询（Media Query）",
					"自定义属性（CSS Variables）",
				],
			},
		],
		history: [
			{ year: 1996, event: "CSS1 发布，成为 W3C 推荐" },
			{ year: 1998, event: "CSS2 发布" },
			{ year: 2011, event: "CSS3 Color 模块发布" },
			{ year: 2017, event: "CSS Grid 布局发布" },
			{ year: 2020, event: "CSS Container Queries 草案" },
		],
		versions: [
			{
				version: "CSS2",
				year: 1998,
				features: ["绝对定位", "表格布局", "媒体类型"],
			},
			{
				version: "CSS3",
				year: 2011,
				features: ["Flexbox", "Grid", "动画", "媒体查询"],
			},
		],
		codeExample: {
			title: "Flexbox 布局示例",
			code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 300px;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`,
			explanation:
				"使用 Flexbox 实现响应式布局，justify-content 和 align-items 控制对齐，flex-wrap 实现自动换行，配合媒体查询实现移动端适配。",
		},
	},
	{
		id: "javascript",
		name: "JavaScript",
		icon: "⚡",
		color: "yellow",
		tagline: "网页的交互逻辑",
		birthYear: 1995,
		creator: "Brendan Eich",
		description:
			"JavaScript 是一种轻量级的编程语言，最初为网页交互而设计，现在已成为最流行的编程语言之一，可用于前端、后端、移动端等各个领域。",
		keyFeatures: [
			{
				title: "核心概念",
				items: ["变量和数据类型", "函数和作用域", "异步编程（Promise/Async）", "DOM 操作", "事件处理"],
			},
			{
				title: "ES6+ 新特性",
				items: ["箭头函数", "模板字符串", "解构赋值", "类和模块", "Promise 和 async/await"],
			},
		],
		history: [
			{ year: 1995, event: "Brendan Eich 在 10 天内创建 JavaScript" },
			{ year: 1997, event: "ECMAScript 标准确立" },
			{ year: 2009, event: "ES5 发布，引入严格模式" },
			{ year: 2015, event: "ES6（ES2015）发布，重大更新" },
			{ year: 2020, event: "ES2020 发布，可选链操作符" },
		],
		versions: [
			{
				version: "ES5",
				year: 2009,
				features: ["严格模式", "JSON 支持", "数组方法（map/filter）"],
			},
			{
				version: "ES6+",
				year: 2015,
				features: ["箭头函数", "类", "模块", "Promise", "async/await"],
			},
		],
		codeExample: {
			title: "现代 JavaScript 特性示例",
			code: `// 异步数据获取
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 箭头函数和数组方法
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

const adults = users
  .filter(user => user.age >= 18)
  .map(user => user.name);

// 解构赋值
const { name, age } = users[0];

// 可选链操作符
const city = user?.address?.city ?? 'Unknown';`,
			explanation: "展示现代 JavaScript 特性：async/await 处理异步、箭头函数、数组方法、解构赋值、可选链操作符等。",
		},
	},
];

// 前端开发者职责
const responsibilities = [
	{
		id: "ui-dev",
		category: "基础开发",
		title: "UI界面开发",
		icon: "🎨",
		color: "blue",
		description: "将设计师的视觉稿还原为代码，实现用户界面的每个细节",
		tasks: [
			"使用HTML/CSS实现页面结构和样式",
			"实现响应式布局，适配各种屏幕尺寸",
			"实现复杂动画和过渡效果",
			"保证像素级精确的视觉还原",
			"处理字体、图标、图片等资源",
		],
		skills: ["HTML5语义化", "CSS3布局（Flex/Grid）", "响应式设计", "CSS预处理器", "设计稿还原"],
		tools: ["VSCode", "Chrome DevTools", "Figma/Sketch", "CSS Frameworks"],
	},
	{
		id: "interaction",
		category: "核心开发",
		title: "交互逻辑实现",
		icon: "⚡",
		color: "green",
		description: "使用JavaScript实现用户操作响应和页面动态效果",
		tasks: [
			"实现表单验证和提交",
			"处理用户点击、滑动等交互事件",
			"实现页面状态管理和数据流",
			"调用后端API获取和处理数据",
			"实现复杂业务逻辑和算法",
		],
		skills: ["JavaScript/TypeScript", "DOM操作", "事件处理", "异步编程", "状态管理"],
		tools: ["React/Vue/Angular", "Redux/Pinia", "Axios", "ESLint", "Jest"],
	},
	{
		id: "performance",
		category: "进阶优化",
		title: "性能优化",
		icon: "🚀",
		color: "purple",
		description: "优化页面加载速度和运行性能，提升用户体验",
		tasks: [
			"优化首屏加载时间（FCP/LCP）",
			"减少资源体积和HTTP请求数",
			"实现懒加载和代码分割",
			"优化渲染性能和帧率",
			"监控和分析性能指标",
		],
		skills: ["Performance API", "浏览器渲染原理", "缓存策略", "CDN优化", "性能监控"],
		tools: ["Lighthouse", "Webpack Bundle Analyzer", "Chrome DevTools Performance", "Sentry"],
	},
	{
		id: "compatibility",
		category: "核心开发",
		title: "兼容性处理",
		icon: "🔧",
		color: "orange",
		description: "确保应用在不同浏览器和设备上都能正常运行",
		tasks: [
			"处理不同浏览器的兼容问题",
			"适配iOS/Android不同系统版本",
			"使用Polyfill支持旧版浏览器",
			"实现优雅降级和渐进增强",
			"测试和修复兼容性bug",
		],
		skills: ["浏览器兼容性", "移动端适配", "CSS Hacks", "Feature Detection", "Babel转译"],
		tools: ["Browserslist", "Autoprefixer", "Babel", "BrowserStack", "真机测试"],
	},
	{
		id: "engineering",
		category: "工程化",
		title: "工程化建设",
		icon: "🛠️",
		color: "cyan",
		description: "建立和维护前端工程体系，提升开发效率和代码质量",
		tasks: [
			"搭建项目脚手架和开发环境",
			"配置构建工具和打包流程",
			"制定代码规范和最佳实践",
			"建立组件库和设计系统",
			"实现自动化测试和CI/CD",
		],
		skills: ["构建工具配置", "模块化开发", "代码规范", "测试驱动开发", "DevOps"],
		tools: ["Webpack/Vite", "ESLint/Prettier", "Jest/Cypress", "Git Actions", "Docker"],
	},
	{
		id: "collaboration",
		category: "团队协作",
		title: "团队协作",
		icon: "🤝",
		color: "pink",
		description: "与设计师、产品经理、后端开发者协作完成项目",
		tasks: [
			"参与需求评审和技术方案设计",
			"与设计师确认交互细节",
			"与后端开发者对接API接口",
			"参与代码评审和技术分享",
			"编写技术文档和使用说明",
		],
		skills: ["沟通协作", "需求分析", "技术方案设计", "代码评审", "文档编写"],
		tools: ["Git", "Jira/Notion", "Swagger/Postman", "Figma", "Confluence"],
	},
];

// 前端四大载体
const platforms = [
	{
		id: "web",
		name: "Web网页",
		icon: "🌐",
		color: "blue",
		description: "运行在浏览器中的网页应用，通过URL访问，无需安装",
		features: [
			"跨平台访问，任何设备都可以使用",
			"无需安装，打开浏览器即可访问",
			"内容可被搜索引擎收录（SEO友好）",
			"更新即时，无需用户手动更新",
			"支持链接分享，传播性强",
		],
		techStack: ["HTML/CSS/JavaScript", "React/Vue/Angular", "TypeScript", "Vite/Webpack", "响应式设计"],
		scenarios: ["企业官网", "电商网站", "内容平台", "SaaS应用", "后台管理系统"],
		advantages: ["开发成本低", "更新维护方便", "跨平台兼容性好", "分享传播便捷"],
		disadvantages: ["用户体验略逊原生", "受网络环境影响大", "无法完全调用设备能力"],
	},
	{
		id: "h5",
		name: "H5页面",
		icon: "📱",
		color: "green",
		description: "专为移动端优化的网页，主要用于微信等社交平台传播",
		features: [
			"针对移动端优化，触摸交互友好",
			"轻量级，加载快速",
			"适合社交传播和营销活动",
			"可嵌入原生App和微信小程序",
			"支持丰富的动画和交互效果",
		],
		techStack: ["HTML5/CSS3", "移动端适配（viewport/rem/vw）", "触摸事件处理", "Swiper/iScroll等移动库", "微信JS-SDK"],
		scenarios: ["营销活动页", "邀请函/贺卡", "产品介绍页", "问卷调查", "抽奖游戏"],
		advantages: ["开发周期短", "传播性强（易分享）", "跨平台兼容", "无需审核即可发布"],
		disadvantages: ["功能相对简单", "性能不如原生", "在微信内限制较多", "用户体验依赖网络"],
	},
	{
		id: "miniprogram",
		name: "小程序",
		icon: "🔲",
		color: "purple",
		description: "运行在微信/支付宝等超级App内的轻量级应用",
		features: [
			"无需下载安装，扫一扫即用",
			"接近原生的用户体验",
			"可直接使用平台登录和支付",
			"依托平台生态，流量获取容易",
			"支持离线缓存，体验流畅",
		],
		techStack: ["WXML/WXSS", "微信小程序API", "uni-app/Taro跨端框架", "微信开发者工具", "小程序云开发"],
		scenarios: ["电商购物", "生活服务", "工具应用", "内容阅读", "企业服务"],
		advantages: ["用户体验优秀", "开发成本低于原生", "依托平台流量", "审核机制相对宽松"],
		disadvantages: ["受平台限制和规则约束", "无法跨平台（需分别开发）", "包大小限制（2MB）", "功能受限于平台API"],
	},
	{
		id: "app",
		name: "原生App",
		icon: "📲",
		color: "orange",
		description: "运行在操作系统上的原生应用程序",
		features: [
			"最佳的用户体验和性能",
			"可完全调用设备能力（摄像头/传感器等）",
			"支持离线使用和数据缓存",
			"可添加桌面图标，用户粘性强",
			"支持推送通知和后台运行",
		],
		techStack: [
			"iOS: Swift/Objective-C",
			"Android: Kotlin/Java",
			"React Native/Flutter",
			"原生UI组件",
			"App Store/应用商店发布",
		],
		scenarios: ["大型游戏", "社交应用", "工具软件", "音视频应用", "系统级应用"],
		advantages: ["性能最优", "功能最完整", "用户体验最好", "品牌独立性"],
		disadvantages: ["开发成本高（需iOS和Android两套）", "审核周期长", "更新需要用户下载", "推广成本高"],
	},
];

// 浏览器发展时代
const browserEras = [
	{
		id: "early",
		name: "早期探索",
		period: "1990-1995",
		description: "万维网诞生，第一个浏览器出现，Netscape 开创商业浏览器时代",
		color: "purple",
		browsers: [
			{
				name: "WorldWideWeb",
				icon: "🌐",
				years: "1990",
				description: "世界上第一个网页浏览器",
				significance: "由 Tim Berners-Lee 在 CERN 发明，是万维网的起点",
			},
			{
				name: "Mosaic",
				icon: "🖼️",
				years: "1993",
				description: "第一个能显示图片的浏览器",
				significance: "让网页从纯文字变得图文并茂，推动 Web 普及",
			},
			{
				name: "Netscape Navigator",
				icon: "⚓",
				years: "1994",
				description: "第一个商业化的成功浏览器",
				significance: "90年代中期占据90%以上市场份额，定义了早期的Web标准",
				marketPeak: { year: 1995, share: "90%" },
			},
		],
		keyEvents: [
			{ year: 1990, event: "Tim Berners-Lee 创建 WorldWideWeb", impact: "万维网诞生" },
			{ year: 1993, event: "Mosaic 浏览器发布", impact: "网页开始支持图片" },
			{ year: 1994, event: "Netscape 成立", impact: "商业浏览器时代开启" },
			{ year: 1995, event: "JavaScript 诞生", impact: "网页开始支持动态交互" },
		],
	},
	{
		id: "war1",
		name: "第一次浏览器大战",
		period: "1995-2001",
		description: "Microsoft 与 Netscape 的激烈竞争，IE 成为浏览器霸主",
		color: "red",
		browsers: [
			{
				name: "Internet Explorer",
				icon: "🔷",
				years: "1995",
				description: "Microsoft 推出的浏览器",
				significance: "通过 Windows 预装迅速占领市场，击败 Netscape",
				marketPeak: { year: 2003, share: "95%" },
			},
			{
				name: "Netscape Navigator",
				icon: "⚓",
				years: "1994-1998",
				description: "逐渐衰落",
				significance: "在 IE 的竞争下失去市场份额，最终被 AOL 收购",
			},
		],
		keyEvents: [
			{ year: 1995, event: "IE 1.0 发布", impact: "第一次浏览器大战开始" },
			{ year: 1996, event: "IE 3.0 发布", impact: "首次支持 CSS" },
			{ year: 1997, event: "IE 4.0 发布", impact: "推出 DHTML 动态HTML概念" },
			{ year: 1998, event: "Netscape 开源成为 Mozilla", impact: "开源浏览器项目诞生" },
			{ year: 1999, event: "IE 5.0 发布", impact: "实现 XMLHttpRequest(Ajax的前身)" },
			{ year: 2001, event: "IE 6.0 随 Windows XP 发布", impact: "IE 市场份额达到巅峰" },
		],
	},
	{
		id: "stagnation",
		name: "IE 垄断期",
		period: "2001-2004",
		description: "IE 统治浏览器市场，Web 技术发展停滞",
		color: "gray",
		browsers: [
			{
				name: "Internet Explorer 6",
				icon: "🔷",
				years: "2001",
				description: "长期占据统治地位",
				significance: "市场份额超过95%，但由于缺乏竞争，技术发展停滞",
				marketPeak: { year: 2003, share: "95%" },
			},
		],
		keyEvents: [
			{ year: 2001, event: "IE 6 发布", impact: "随后5年几乎无重大更新" },
			{ year: 2002, event: "IE 市场份额达到95%", impact: "浏览器创新停滞" },
			{ year: 2003, event: "Apple 发布 Safari", impact: "Mac 平台有了原生浏览器" },
		],
	},
	{
		id: "war2",
		name: "第二次浏览器大战",
		period: "2004-2012",
		description: "Firefox 挑战 IE，Chrome 后来居上，浏览器竞争再次白热化",
		color: "orange",
		browsers: [
			{
				name: "Firefox",
				icon: "🦊",
				years: "2004",
				description: "Mozilla 基金会开源浏览器",
				significance: "首次有效挑战 IE 统治，引入标签页、扩展等创新功能",
				marketPeak: { year: 2009, share: "32%" },
			},
			{
				name: "Chrome",
				icon: "🌐",
				years: "2008",
				description: "Google 推出的革命性浏览器",
				significance: "V8 引擎性能卓越，开创多进程架构，迅速成为市场领导者",
				marketPeak: { year: 2024, share: "65%" },
			},
			{
				name: "Safari",
				icon: "🧭",
				years: "2003",
				description: "Apple 的浏览器",
				significance: "在 Mac 和 iOS 设备上占据主导地位",
			},
		],
		keyEvents: [
			{ year: 2004, event: "Firefox 1.0 发布", impact: "打破 IE 垄断" },
			{ year: 2006, event: "IE 7 发布", impact: "IE 开始追赶，但已落后" },
			{ year: 2008, event: "Chrome 发布", impact: "浏览器性能大幅提升" },
			{ year: 2009, event: "IE 8 发布", impact: "开始支持 HTML5 部分" },
			{ year: 2010, event: "Chrome 超越 Firefox", impact: "成为第二大浏览器" },
		],
	},
	{
		id: "modern",
		name: "现代浏览器格局",
		period: "2012-至今",
		description: "Chrome 主导，四大浏览器并存，标准统一，性能持续提升",
		color: "blue",
		browsers: [
			{
				name: "Chrome",
				icon: "🌐",
				years: "2008-至今",
				description: "市场领导者",
				significance: "基于 Chromium 开源项目，性能强大，生态丰富",
				marketPeak: { year: 2024, share: "65%" },
			},
			{
				name: "Safari",
				icon: "🧭",
				years: "2003-至今",
				description: "苹果生态浏览器",
				significance: "在 iOS 设备上占主导，WebKit 引擎影响深远",
			},
			{
				name: "Edge",
				icon: "🌊",
				years: "2015-至今",
				description: "Microsoft 现代浏览器",
				significance: "2018年后转向 Chromium 内核，与 Chrome 兼容",
			},
			{
				name: "Firefox",
				icon: "🦊",
				years: "2004-至今",
				description: "坚持独立内核",
				significance: "唯一非 Chromium 主流浏览器，注重隐私和定制",
			},
		],
		keyEvents: [
			{ year: 2013, event: "Chrome 宣布 Blink 渲染引擎", impact: "WebKit 分支" },
			{ year: 2015, event: "Microsoft Edge 发布", impact: "IE 开始退役" },
			{ year: 2018, event: "Edge 宣布转向 Chromium", impact: "浏览器内核更加统一" },
			{ year: 2020, event: "IE 11 停止支持", impact: "第一次浏览器大战终结" },
			{ year: 2021, event: "Chrome 将停止追踪 Cookie", impact: "隐私保护加强" },
		],
	},
];

// 前端框架发展时代
const frameworkEras = [
	{
		id: "jquery-era",
		name: "jQuery 时代",
		period: "2006-2010",
		description: "jQuery 统一了浏览器 API 差异，成为最流行的 JavaScript 库",
		color: "blue",
		frameworks: [
			{
				name: "jQuery",
				icon: "💎",
				year: 2006,
				creator: "John Resig",
				description: "轻量级 JavaScript 库，简化 DOM 操作和 AJAX",
				keyFeatures: ["简洁的选择器语法", "链式调用", "跨浏览器兼容", "丰富的插件生态", "AJAX 简化"],
				significance: "让 JavaScript 开变得简单，统治前端近10年，影响深远",
				status: "legacy" as const,
				popularity: { peak: "80%+", current: "20%" },
			},
			{
				name: "Prototype",
				icon: "🔷",
				year: 2005,
				description: "早期 JavaScript 框架，扩展了语言功能",
				keyFeatures: ["$() 函数", "类继承系统", "Ajax 封装"],
				significance: "为后来的框架奠定基础",
				status: "declined" as const,
			},
			{
				name: "MooTools",
				icon: "🟫",
				year: 2006,
				description: "面向对象的 JavaScript 框架",
				keyFeatures: ["模块化", "优雅的 API", "动画效果"],
				significance: "在特定领域有一定影响力",
				status: "declined" as const,
			},
		],
		technicalInnovations: ["选择器引擎（Sizzle）", "链式调用模式", "插件系统", "Deferred/Promise 早期实现"],
	},
	{
		id: "early-mvc",
		name: "早期 MVC 框架",
		period: "2009-2013",
		description: "Backbone、Knockout 等 MVC 框架出现，开始探索应用架构",
		color: "green",
		frameworks: [
			{
				name: "Backbone.js",
				icon: "🦴",
				year: 2010,
				creator: "Jeremy Ashkenas",
				description: "轻量级 MVC 框架，提供数据结构和 UI 的绑定",
				keyFeatures: ["Model-View 架构", "事件驱动", "RESTful JSON 接口", "Collection 集合"],
				significance: "让前端开发有了架构意识",
				status: "legacy" as const,
				popularity: { peak: "30%", current: "1%" },
			},
			{
				name: "Knockout",
				icon: "🥊",
				year: 2010,
				description: "MVVM 框架，强调数据绑定",
				keyFeatures: ["声明式绑定", "依赖跟踪", "模板系统"],
				significance: "MVVM 模式的先驱",
				status: "legacy" as const,
			},
			{
				name: "Ember.js",
				icon: "🔥",
				year: 2011,
				description: "全功能 MVC 框架，约定优于配置",
				keyFeatures: ["路由", "数据层", "组件化"],
				significance: "Apple、Netflix 等大公司在用",
				status: "active" as const,
				popularity: { peak: "15%", current: "3%" },
			},
		],
		technicalInnovations: ["MVC/MVVM 架构模式", "数据绑定概念", "客户端路由", "模板引擎"],
	},
	{
		id: "framework-rise",
		name: "现代框架崛起",
		period: "2013-2016",
		description: "Angular、React、Vue 三大框架相继诞生，开启组件化时代",
		color: "red",
		frameworks: [
			{
				name: "AngularJS",
				icon: "🅰️",
				year: 2010,
				creator: "Miško Hevery (Google)",
				description: "Google 推出的 MVVM 框架",
				keyFeatures: ["双向数据绑定", "依赖注入", "指令系统", "完整的解决方案"],
				significance: "第一个真正意义上的前端框架",
				status: "legacy" as const,
				popularity: { peak: "50%", current: "5%" },
			},
			{
				name: "React",
				icon: "⚛️",
				year: 2013,
				creator: "Jordan Walke (Facebook)",
				description: "用于构建用户界面的 JavaScript 库",
				keyFeatures: ["虚拟 DOM", "组件化", "单向数据流", "JSX 语法"],
				significance: "改变了前端开发范式，最流行的框架",
				status: "active" as const,
				popularity: { peak: "60%+", current: "65%" },
			},
			{
				name: "Vue.js",
				icon: "💚",
				year: 2014,
				creator: "尤雨溪",
				description: "渐进式 JavaScript 框架",
				keyFeatures: ["响应式系统", "组件化", "指令系统", "易学易用"],
				significance: "中国开发者最喜爱的框架",
				status: "active" as const,
				popularity: { peak: "40%", current: "20%" },
			},
		],
		technicalInnovations: ["虚拟 DOM", "组件化思想", "单向数据流", "响应式编程", "JSX 语法扩展"],
	},
	{
		id: "framework-wars",
		name: "框架大战",
		period: "2016-2020",
		description: "三大框架激烈竞争，技术快速迭代，生态日趋成熟",
		color: "orange",
		frameworks: [
			{
				name: "Angular (2+)",
				icon: "🅰️",
				year: 2016,
				creator: "Google",
				description: "基于 TypeScript 的完整平台",
				keyFeatures: ["TypeScript 原生支持", "依赖注入", "RxJS 响应式编程", "完整的 CLI"],
				significance: "企业级应用的首选",
				status: "active" as const,
				popularity: { peak: "25%", current: "15%" },
			},
			{
				name: "React 生态",
				icon: "⚛️",
				year: 2015,
				description: "包括 Redux、React Router 等生态",
				keyFeatures: ["Hooks", "Context API", "Concurrent Mode"],
				significance: "生态最丰富，社区最活跃",
				status: "active" as const,
				popularity: { peak: "65%", current: "65%" },
			},
			{
				name: "Vue 3",
				icon: "💚",
				year: 2020,
				creator: "尤雨溪",
				description: "基于 Proxy 的全新响应式系统",
				keyFeatures: ["Composition API", "Proxy 响应式", "更好的 TypeScript 支持"],
				significance: "性能提升，API 更灵活",
				status: "active" as const,
				popularity: { peak: "40%", current: "20%" },
			},
		],
		technicalInnovations: [
			"Hooks 模式",
			"Composition API",
			"状态管理最佳实践",
			"服务端渲染 (SSR)",
			"静态站点生成 (SSG)",
		],
	},
	{
		id: "modern",
		name: "多元发展",
		period: "2020-至今",
		description: "框架格局稳定，新技术不断涌现，前端进入成熟期",
		color: "purple",
		frameworks: [
			{
				name: "Svelte",
				icon: "💜",
				year: 2016,
				creator: "Rich Harris",
				description: "编译时框架，无虚拟 DOM",
				keyFeatures: ["编译时优化", "更小的包体积", "更好的性能"],
				significance: "展示了一条不同的技术路线",
				status: "active" as const,
				popularity: { peak: "-", current: "8%" },
			},
			{
				name: "Solid.js",
				icon: "💠",
				year: 2018,
				description: "细粒度响应式框架",
				keyFeatures: ["细粒度更新", "类 React 语法", "高性能"],
				significance: "性能最佳的框架之一",
				status: "active" as const,
				popularity: { peak: "-", current: "2%" },
			},
			{
				name: "Astro",
				icon: "🚀",
				year: 2021,
				description: "以内容为中心的 Web 框架",
				keyFeatures: ["零 JS 默认", "岛屿架构", "多框架支持"],
				significance: "推动内容网站性能优化",
				status: "active" as const,
				popularity: { peak: "-", current: "5%" },
			},
		],
		technicalInnovations: ["编译时优化", "零运行时", "岛屿架构", "服务端组件 (RSC)", "边缘函数"],
	},
];

// 前端工具链分类
const toolCategories = [
	{
		id: "build-tools",
		name: "构建工具",
		icon: "🔧",
		color: "blue",
		description: "将源代码转换为可在浏览器中运行的代码",
		tools: [
			{
				name: "Vite",
				icon: "⚡",
				type: "新一代构建工具",
				description: "基于 ESM 的极速开发服务器和生产构建工具",
				keyFeatures: ["极速的冷启动", "即时热更新 (HMR)", "原生 ESM 支持", "开箱即用", "生产优化 Rollup"],
				useCases: ["Vue/React 项目", "现代浏览器", "快速原型开发"],
				alternatives: ["Webpack", "esbuild", "Snowpack"],
			},
			{
				name: "Webpack",
				icon: "📦",
				type: "传统构建工具",
				description: "最流行的模块打包工具，生态最丰富",
				keyFeatures: ["强大的模块系统", "丰富的 Loader 和 Plugin", "代码分割", "Tree Shaking", "长期稳定维护"],
				useCases: ["大型项目", "复杂构建需求", "企业级应用"],
				alternatives: ["Vite", "esbuild", "Rollup"],
			},
			{
				name: "esbuild",
				icon: "🚀",
				type: "极速打包工具",
				description: "使用 Go 编写的超快速 JavaScript 打包工具",
				keyFeatures: ["编译速度极快", "内置 TypeScript 支持", "无配置", "代码压缩", "Source Map"],
				useCases: ["追求极致速度", "大型项目构建"],
				alternatives: ["Vite (底层使用)", "SWC", "Rome"],
			},
		],
	},
	{
		id: "package-managers",
		name: "包管理器",
		icon: "📦",
		color: "green",
		description: "管理项目依赖和脚本的工具",
		tools: [
			{
				name: "pnpm",
				icon: "⚡",
				type: "快速、节省磁盘空间",
				description: "快速的、节省磁盘空间的包管理器",
				keyFeatures: ["硬链接节省空间", "严格的依赖隔离", "速度快", "支持 Monorepo", "npm 完全兼容"],
				useCases: ["Monorepo 项目", "磁盘空间受限", "追求性能"],
				alternatives: ["npm", "Yarn", "Bun"],
			},
			{
				name: "npm",
				icon: "🔵",
				type: "Node.js 官方包管理器",
				description: "Node.js 自带的默认包管理器",
				keyFeatures: ["官方支持", "最大的包仓库", "简单易用", "workspaces 支持", "广泛使用"],
				useCases: ["所有 Node.js 项目", "默认选择"],
				alternatives: ["pnpm", "Yarn", "Bun"],
			},
			{
				name: "Yarn",
				icon: "🧶",
				type: "快速、可靠的依赖管理",
				description: "Facebook 开发的快速、安全、可靠的依赖管理工具",
				keyFeatures: ["并行安装", "离线模式", "确定性安装", "工作空间", "插件系统"],
				useCases: ["需要离线开发", "Monorepo"],
				alternatives: ["pnpm", "npm", "Bun"],
			},
		],
	},
	{
		id: "code-quality",
		name: "代码质量工具",
		icon: "✅",
		color: "purple",
		description: "保证代码质量和风格的工具",
		tools: [
			{
				name: "ESLint",
				icon: "📏",
				type: "JavaScript 代码检查工具",
				description: "插件化的 JavaScript 代码检查工具",
				keyFeatures: ["可配置的规则", "丰富的插件生态", "自动修复", "支持 TypeScript", "自定义规则"],
				useCases: ["所有 JavaScript/TypeScript 项目"],
				alternatives: ["JSHint", "JSLint (已废弃)"],
			},
			{
				name: "Prettier",
				icon: "💅",
				type: "代码格式化工具",
				description: "Opinionated 的代码格式化工具",
				keyFeatures: ["零配置", "支持多种语言", "编辑器集成", "自动格式化", "与 ESLint 配合"],
				useCases: ["统一代码风格", "团队协作"],
				alternatives: ["ESLint 内置格式化", "Format"],
			},
			{
				name: "Biome",
				icon: "🌿",
				type: "一体化工具链",
				description: "ESLint/Prettier 的快速替代品",
				keyFeatures: ["超快速度", "ESLint + Prettier 功能", "Rust 编写", "零配置", "与现有配置兼容"],
				useCases: ["追求格式化速度", "新项目"],
				alternatives: ["ESLint + Prettier", "Rome"],
			},
		],
	},
	{
		id: "testing",
		name: "测试工具",
		icon: "🧪",
		color: "orange",
		description: "保证代码质量和稳定性的测试工具",
		tools: [
			{
				name: "Vitest",
				icon: "⚡",
				type: "极速单元测试框架",
				description: "基于 Vite 的极速单元测试框架",
				keyFeatures: ["极速测试运行", "Vite 同步配置", "Jest 兼容 API", "内置 Mock", "UI 界面"],
				useCases: ["Vite 项目", "快速测试"],
				alternatives: ["Jest", "Jasmine", "Mocha"],
			},
			{
				name: "Jest",
				icon: "🃏",
				type: "全面的测试解决方案",
				description: "Facebook 开发的 JavaScript 测试框架",
				keyFeatures: ["零配置", "内置断言库", "Mock 功能强大", "快照测试", "并行测试"],
				useCases: ["React 项目", "全面测试"],
				alternatives: ["Vitest", "Mocha", "Jasmine"],
			},
			{
				name: "Playwright",
				icon: "🎭",
				type: "端到端测试框架",
				description: "Microsoft 开发的跨浏览器 E2E 测试框架",
				keyFeatures: ["跨浏览器支持", "自动等待", "并行测试", "强大的选择器", "网络拦截"],
				useCases: ["E2E 测试", "跨浏览器测试"],
				alternatives: ["Cypress", "Puppeteer", "Selenium"],
			},
		],
	},
	{
		id: "css-tools",
		name: "CSS 工具",
		icon: "🎨",
		color: "pink",
		description: "提升 CSS 开发效率的工具",
		tools: [
			{
				name: "Tailwind CSS",
				icon: "🌊",
				type: "实用优先的 CSS 框架",
				description: "直接在 HTML 中编写实用类",
				keyFeatures: ["实用类优先", "高度可定制", "JIT 编译", "响应式设计", "深色模式"],
				useCases: ["快速开发", "自定义设计系统"],
				alternatives: ["Bootstrap", "Bulma", "Windi CSS"],
			},
			{
				name: "PostCSS",
				icon: "🔧",
				type: "CSS 转换工具",
				description: "使用 JavaScript 插件转换 CSS",
				keyFeatures: ["插件系统", "自动添加浏览器前缀", "CSS 模块", "未来 CSS 语法", "压缩优化"],
				useCases: ["CSS 后处理", "浏览器兼容"],
				alternatives: ["Sass/Less", "Autoprefixer (内置)"],
			},
		],
	},
];

// 前端技能等级
const skillLevels = [
	{
		id: "beginner",
		name: "入门阶段",
		period: "0-6个月",
		description: "打好基础，掌握前端开发的基本技能",
		color: "green",
		skills: [
			{
				category: "HTML/CSS",
				items: [
					{
						name: "HTML 基础",
						importance: "critical" as const,
						description: "了解 HTML 标签、文档结构、表单等",
						resources: ["MDN HTML 教程", "W3School HTML"],
					},
					{
						name: "CSS 基础",
						importance: "critical" as const,
						description: "掌握选择器、盒模型、布局等",
						resources: ["MDN CSS 教程", "CSS-Tricks"],
					},
					{
						name: "响应式设计",
						importance: "important" as const,
						description: "媒体查询、移动端适配",
						resources: ["Responsive Web Design"],
					},
				],
			},
			{
				category: "JavaScript",
				items: [
					{
						name: "JS 基础语法",
						importance: "critical" as const,
						description: "变量、数据类型、函数、对象",
						resources: ["JavaScript.info", "MDN JS 教程"],
					},
					{
						name: "DOM 操作",
						importance: "critical" as const,
						description: "元素选择、事件处理",
						resources: ["MDN DOM API"],
					},
					{
						name: "ES6+ 语法",
						importance: "important" as const,
						description: "箭头函数、解构、模板字符串",
						resources: ["ES6 Features"],
					},
				],
			},
			{
				category: "工具",
				items: [
					{
						name: "Git 基础",
						importance: "critical" as const,
						description: "版本控制基本操作",
						resources: ["Git 官方文档", "GitHub Learning Lab"],
					},
					{
						name: "VS Code",
						importance: "important" as const,
						description: "代码编辑器使用",
						resources: ["VS Code 官方文档"],
					},
					{
						name: "浏览器 DevTools",
						importance: "important" as const,
						description: "调试和检查元素",
						resources: ["Chrome DevTools 文档"],
					},
				],
			},
		],
		projects: [
			{
				name: "个人主页",
				description: "使用 HTML/CSS 制作简单的个人介绍页面",
				skills: ["HTML", "CSS", "响应式设计"],
			},
			{
				name: "待办事项",
				description: "实现添加、删除、标记完成的待办列表",
				skills: ["JavaScript", "DOM 操作", "事件处理"],
			},
			{
				name: "天气查询",
				description: "调用天气 API 实现天气查询",
				skills: ["Fetch API", "异步编程", "DOM 操作"],
			},
		],
	},
	{
		id: "intermediate",
		name: "进阶阶段",
		period: "6-18个月",
		description: "深入学习框架和工程化，提升开发效率",
		color: "blue",
		skills: [
			{
				category: "框架",
				items: [
					{
						name: "React / Vue",
						importance: "critical" as const,
						description: "至少掌握一个主流框架",
						resources: ["React 官方文档", "Vue 官方文档"],
					},
					{
						name: "状态管理",
						importance: "important" as const,
						description: "Redux/Pinia/Context API",
						resources: ["Redux 文档", "Pinia 文档"],
					},
					{
						name: "路由",
						importance: "important" as const,
						description: "React Router / Vue Router",
						resources: ["React Router 文档", "Vue Router 文档"],
					},
				],
			},
			{
				category: "工程化",
				items: [
					{
						name: "npm/yarn/pnpm",
						importance: "critical" as const,
						description: "包管理器使用",
						resources: ["npm 文档", "pnpm 文档"],
					},
					{
						name: "Vite/Webpack",
						importance: "important" as const,
						description: "构建工具配置",
						resources: ["Vite 文档", "Webpack 文档"],
					},
					{
						name: "TypeScript",
						importance: "important" as const,
						description: "类型系统和接口",
						resources: ["TypeScript 官方文档"],
					},
				],
			},
			{
				category: "进阶技能",
				items: [
					{
						name: "性能优化",
						importance: "important" as const,
						description: "代码分割、懒加载、缓存",
						resources: ["Web.dev 性能指南"],
					},
					{
						name: "测试",
						importance: "nice-to-have" as const,
						description: "单元测试、集成测试",
						resources: ["Vitest 文档", "Jest 文档"],
					},
					{
						name: "CI/CD",
						importance: "nice-to-have" as const,
						description: "GitHub Actions / GitLab CI",
						resources: ["GitHub Actions 文档"],
					},
				],
			},
		],
		projects: [
			{
				name: "电商网站",
				description: "实现商品列表、购物车、结算功能",
				skills: ["React/Vue", "路由", "状态管理"],
			},
			{
				name: "博客系统",
				description: "支持文章发布、评论、标签分类",
				skills: ["框架", "API 对接", "表单处理"],
			},
			{
				name: "仪表板",
				description: "数据可视化仪表板，图表展示",
				skills: ["图表库", "数据可视化", "响应式布局"],
			},
		],
	},
	{
		id: "advanced",
		name: "高级阶段",
		period: "18-36个月",
		description: "掌握架构设计和性能优化，成为技术专家",
		color: "purple",
		skills: [
			{
				category: "架构设计",
				items: [
					{
						name: "设计模式",
						importance: "critical" as const,
						description: "单例、工厂、观察者等设计模式",
						resources: ["设计模式书籍", "Refactoring.guru"],
					},
					{
						name: "微前端",
						importance: "important" as const,
						description: "qiankun、Module Federation",
						resources: ["qiankun 文档", "Webpack Module Federation"],
					},
					{
						name: "Monorepo",
						importance: "important" as const,
						description: "pnpm workspace、Nx、Turborepo",
						resources: ["pnpm workspace", "Nx 文档"],
					},
				],
			},
			{
				category: "性能",
				items: [
					{
						name: "性能监控",
						importance: "critical" as const,
						description: "Lighthouse、Web Vitals、Sentry",
						resources: ["Web Vitals", "Sentry 文档"],
					},
					{
						name: "服务端渲染",
						importance: "important" as const,
						description: "Next.js、Nuxt.js",
						resources: ["Next.js 文档", "Nuxt.js 文档"],
					},
					{
						name: "Web Workers",
						importance: "nice-to-have" as const,
						description: "多线程处理",
						resources: ["Web Workers API"],
					},
				],
			},
			{
				category: "跨端",
				items: [
					{
						name: "React Native / Flutter",
						importance: "important" as const,
						description: "移动应用开发",
						resources: ["React Native 文档", "Flutter 文档"],
					},
					{
						name: "Electron",
						importance: "nice-to-have" as const,
						description: "桌面应用开发",
						resources: ["Electron 文档"],
					},
					{
						name: "小程序开发",
						importance: "important" as const,
						description: "微信/支付宝小程序",
						resources: ["小程序官方文档"],
					},
				],
			},
		],
		projects: [
			{
				name: "大型管理系统",
				description: "包含权限管理、动态菜单、复杂表单",
				skills: ["权限设计", "动态路由", "复杂状态管理"],
			},
			{
				name: "组件库",
				description: "开发自己的 UI 组件库",
				skills: ["组件设计", "文档系统", "npm 发布"],
			},
			{
				name: "监控平台",
				description: "实时监控、错误追踪、性能分析",
				skills: ["WebSocket", "数据可视化", "性能优化"],
			},
		],
	},
	{
		id: "expert",
		name: "专家阶段",
		period: "3年+",
		description: "深入技术原理，具备架构决策能力",
		color: "orange",
		skills: [
			{
				category: "深度技术",
				items: [
					{
						name: "浏览器原理",
						importance: "critical" as const,
						description: "渲染机制、事件循环、V8 引擎",
						resources: ["浏览器工作原理", "V8 文档"],
					},
					{
						name: "网络协议",
						importance: "critical" as const,
						description: "HTTP/2、WebSocket、WebRTC",
						resources: ["MDN HTTP", "WebSocket RFC"],
					},
					{
						name: "安全",
						importance: "critical" as const,
						description: "XSS、CSRF、CSP 等",
						resources: ["OWASP", "Web 安全知识"],
					},
				],
			},
			{
				category: "技术管理",
				items: [
					{
						name: "技术选型",
						importance: "critical" as const,
						description: "评估和选择技术方案",
						resources: ["技术选型方法"],
					},
					{
						name: "代码审查",
						importance: "critical" as const,
						description: "Code Review 最佳实践",
						resources: ["Google Code Review 指南"],
					},
					{
						name: "团队协作",
						importance: "important" as const,
						description: "敏捷开发、代码规范",
						resources: ["敏捷实践", "代码规范"],
					},
				],
			},
			{
				category: "前沿技术",
				items: [
					{
						name: "WebAssembly",
						importance: "nice-to-have" as const,
						description: "高性能计算",
						resources: ["WebAssembly 文档"],
					},
					{
						name: "WebGPU",
						importance: "nice-to-have" as const,
						description: "下一代图形 API",
						resources: ["WebGPU 规范"],
					},
					{
						name: "AI 辅助开发",
						importance: "important" as const,
						description: "Copilot、ChatGPT 等",
						resources: ["AI 工具文档"],
					},
				],
			},
		],
		projects: [
			{
				name: "开源项目",
				description: "维护有影响力的开源项目",
				skills: ["开源协作", "社区运营", "技术影响力"],
			},
			{
				name: "技术博客",
				description: "分享技术见解和最佳实践",
				skills: ["写作能力", "技术总结", "知识传播"],
			},
			{
				name: "技术架构",
				description: "设计大型系统技术架构",
				skills: ["系统设计", "技术决策", "风险评估"],
			},
		],
	},
];

// 性能优化分类
const performanceCategories = [
	{
		id: "loading",
		name: "加载性能",
		icon: "⏱️",
		color: "blue",
		description: "优化页面资源的加载速度，减少用户等待时间",
		techniques: [
			{
				title: "资源优化",
				items: [
					{
						name: "代码压缩和混淆",
						importance: "high" as const,
						description: "使用 Terser、UglifyJS 等工具压缩代码",
						examples: ["Webpack TerserPlugin", "Vite 内置压缩"],
						metrics: ["减少 JS 体积 50-70%"],
					},
					{
						name: "图片优化",
						importance: "high" as const,
						description: "选择合适的格式、压缩、使用 CDN",
						examples: ["WebP 格式", "响应式图片", "懒加载"],
						metrics: ["减少 60-80% 体积"],
					},
					{
						name: "字体优化",
						importance: "medium" as const,
						description: "使用字体子集、font-display",
						examples: ["subfont", "font-display: swap"],
						metrics: ["FOIT/FOUT 减少"],
					},
				],
			},
			{
				title: "网络优化",
				items: [
					{
						name: "代码分割",
						importance: "high" as const,
						description: "按路由或功能分割代码",
						examples: ["React.lazy()", "dynamic import()"],
						metrics: ["首屏加载减少 30-50%"],
					},
					{
						name: "Tree Shaking",
						importance: "high" as const,
						description: "移除未使用的代码",
						examples: ["Webpack", "Vite", "Rollup"],
						metrics: ["减少 10-30% 体积"],
					},
					{
						name: "HTTP 缓存",
						importance: "high" as const,
						description: "设置合理的缓存策略",
						examples: ["Cache-Control", "ETag", "Service Worker"],
						metrics: ["重复访问加速 90%"],
					},
				],
			},
			{
				title: "预加载",
				items: [
					{
						name: "预连接",
						importance: "medium" as const,
						description: "提前建立 DNS/TCP 连接",
						examples: ['<link rel="preconnect">'],
						metrics: ["减少 100-500ms 延迟"],
					},
					{
						name: "资源预加载",
						importance: "medium" as const,
						description: "提前加载关键资源",
						examples: ['<link rel="preload">', '<link rel="prefetch">'],
						metrics: ["关键资源提前 200ms"],
					},
				],
			},
		],
		tools: [
			{
				name: "Lighthouse",
				description: "Google 开发的性能审计工具",
				features: ["性能评分", "优化建议", "Core Web Vitals"],
			},
			{
				name: "Webpack Bundle Analyzer",
				description: "分析打包体积",
				features: ["可视化模块依赖", "识别大文件"],
			},
			{
				name: "WebPageTest",
				description: "在线性能测试工具",
				features: ["多地点测试", "瀑布图分析", "视频回放"],
			},
		],
	},
	{
		id: "rendering",
		name: "渲染性能",
		icon: "🎨",
		color: "green",
		description: "优化页面渲染和交互，提升流畅度",
		techniques: [
			{
				title: "减少重排重绘",
				items: [
					{
						name: "使用虚拟 DOM",
						importance: "high" as const,
						description: "React/Vue 自动优化 DOM 操作",
						examples: ["React Fiber", "Vue 3 Proxy"],
						metrics: ["减少 50%+ DOM 操作"],
					},
					{
						name: "CSS 硬件加速",
						importance: "medium" as const,
						description: "使用 transform 和 opacity",
						examples: ["will-change", "transform: translateZ(0)"],
						metrics: ["动画帧率提升到 60fps"],
					},
					{
						name: "避免强制同步布局",
						importance: "high" as const,
						description: "批量读写 DOM",
						examples: ["使用 DocumentFragment", "分离读写操作"],
						metrics: ["减少布局抖动"],
					},
				],
			},
			{
				title: "JavaScript 执行",
				items: [
					{
						name: "减少主线程阻塞",
						importance: "high" as const,
						description: "分割长任务，使用 Web Workers",
						examples: ["requestIdleCallback", "Web Workers"],
						metrics: ["长任务减少 80%"],
					},
					{
						name: "防抖和节流",
						importance: "medium" as const,
						description: "优化频繁触发的事件",
						examples: ["scroll", "resize", "input 事件"],
						metrics: ["事件处理减少 70%"],
					},
					{
						name: "虚拟滚动",
						importance: "medium" as const,
						description: "只渲染可见区域",
						examples: ["react-window", "vue-virtual-scroller"],
						metrics: ["长列表性能提升 10x"],
					},
				],
			},
		],
		tools: [
			{
				name: "Chrome DevTools Performance",
				description: "浏览器内置性能分析",
				features: ["火焰图", "帧率分析", "内存快照"],
			},
			{
				name: "React DevTools Profiler",
				description: "React 组件性能分析",
				features: ["组件渲染时间", "为什么渲染"],
			},
		],
	},
	{
		id: "network",
		name: "网络性能",
		icon: "🌐",
		color: "purple",
		description: "优化网络请求，减少延迟",
		techniques: [
			{
				title: "请求优化",
				items: [
					{
						name: "合并请求",
						importance: "medium" as const,
						description: "减少 HTTP 请求数",
						examples: ["GraphQL", "批量接口"],
						metrics: ["请求数减少 50%"],
					},
					{
						name: "HTTP/2 或 HTTP/3",
						importance: "high" as const,
						description: "使用新一代协议",
						examples: ["服务器开启 HTTP/2", "CDN 支持"],
						metrics: ["多路复用，延迟减少 30%"],
					},
					{
						name: "CDN 加速",
						importance: "high" as const,
						description: "静态资源使用 CDN",
						examples: ["阿里云 CDN", "Cloudflare", "七牛云"],
						metrics: ["访问速度提升 50-80%"],
					},
				],
			},
			{
				title: "API 优化",
				items: [
					{
						name: "数据压缩",
						importance: "medium" as const,
						description: "启用 Gzip/Brotli 压缩",
						examples: ["服务器配置", "Accept-Encoding"],
						metrics: ["传输体积减少 60-80%"],
					},
					{
						name: "缓存策略",
						importance: "high" as const,
						description: "合理设置 HTTP 缓存",
						examples: ["Cache-Control", "ETag", "Last-Modified"],
						metrics: ["命中缓存加速 95%"],
					},
					{
						name: "服务端渲染",
						importance: "medium" as const,
						description: "SSR 或 SSG 提升首屏",
						examples: ["Next.js", "Nuxt.js", "Astro"],
						metrics: ["FCP 减少 50%"],
					},
				],
			},
		],
		tools: [
			{
				name: "Charles/Fiddler",
				description: "网络抓包工具",
				features: ["请求拦截", "修改响应", "性能分析"],
			},
			{
				name: "Network Information API",
				description: "获取网络状态",
				features: ["网络类型", "下行速度", "RTT"],
			},
		],
	},
	{
		id: "monitoring",
		name: "性能监控",
		icon: "📊",
		color: "orange",
		description: "建立性能监控体系，持续优化",
		techniques: [
			{
				title: "Core Web Vitals",
				items: [
					{
						name: "LCP (Largest Contentful Paint)",
						importance: "high" as const,
						description: "最大内容绘制时间",
						examples: ["优化图片", "预加载关键资源"],
						metrics: ["目标 < 2.5s"],
					},
					{
						name: "FID (First Input Delay)",
						importance: "high" as const,
						description: "首次输入延迟",
						examples: ["减少 JS 执行时间", "代码分割"],
						metrics: ["目标 < 100ms"],
					},
					{
						name: "CLS (Cumulative Layout Shift)",
						importance: "high" as const,
						description: "累积布局偏移",
						examples: ["为图片预留空间", "避免插入内容"],
						metrics: ["目标 < 0.1"],
					},
				],
			},
			{
				title: "监控指标",
				items: [
					{
						name: "FCP (First Contentful Paint)",
						importance: "medium" as const,
						description: "首次内容绘制",
						examples: ["减少渲染阻塞资源"],
						metrics: ["目标 < 1.8s"],
					},
					{
						name: "TTI (Time to Interactive)",
						importance: "medium" as const,
						description: "可交互时间",
						examples: ["减少长任务", "优化 JS 执行"],
						metrics: ["目标 < 3.8s"],
					},
					{
						name: "TTFB (Time to First Byte)",
						importance: "medium" as const,
						description: "首字节时间",
						examples: ["优化服务器", "使用 CDN"],
						metrics: ["目标 < 600ms"],
					},
				],
			},
		],
		tools: [
			{
				name: "Google Analytics",
				description: "用户行为和性能监控",
				features: ["Web Vitals 报告", "用户分层"],
			},
			{
				name: "Sentry",
				description: "错误和性能监控",
				features: ["错误追踪", "性能监控", "发布监控"],
			},
			{
				name: "Vercel Analytics",
				description: "Vercel 提供的分析",
				features: ["Web Vitals", "真实用户监控 (RUM)"],
			},
		],
	},
];

// ============== 组件定义 ==============

// Hero 区块组件
function HeroBlock() {
	return (
		<section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-16 text-white">
			<div className="relative z-10 mx-auto max-w-4xl text-center">
				<h1 className="mb-6 font-bold text-5xl md:text-7xl">{heroContent.title}</h1>
				<h2 className="mb-4 text-2xl text-white/80 md:text-3xl">{heroContent.subtitle}</h2>
				<p className="mx-auto max-w-2xl text-lg text-white/70">{heroContent.description}</p>
			</div>
		</section>
	);
}

// 什么是Web前端区块
function FrontendIntroBlock() {
	return (
		<section className="bg-gradient-to-b from-blue-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 font-semibold text-blue-700 text-sm dark:bg-blue-900 dark:text-blue-300">
						第一优先级 · 核心概念
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">什么是 Web 前端？</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						Web 前端是构建用户在浏览器中看到和交互的网页界面的技术和实践
					</p>
				</div>

				<div className="mb-12 grid gap-6 md:grid-cols-3">
					<div className="rounded-xl border-2 border-orange-200 bg-white p-6 shadow-lg transition-all hover:border-orange-400 dark:border-orange-900 dark:bg-slate-800 dark:hover:border-orange-700">
						<div className="mb-4 text-5xl">📄</div>
						<h3 className="mb-2 font-bold text-2xl text-orange-600 dark:text-orange-400">HTML</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">超文本标记语言</p>
						<p className="text-slate-700 dark:text-slate-300">网页的骨架和结构，定义内容的语义和层次</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">1991年由 Tim Berners-Lee 创建</div>
					</div>

					<div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:border-blue-400 dark:border-blue-900 dark:bg-slate-800 dark:hover:border-blue-700">
						<div className="mb-4 text-5xl">🎨</div>
						<h3 className="mb-2 font-bold text-2xl text-blue-600 dark:text-blue-400">CSS</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">层叠样式表</p>
						<p className="text-slate-700 dark:text-slate-300">控制网页的视觉呈现，负责布局、颜色、字体等样式</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">CSS1于1996年成为W3C推荐标准</div>
					</div>

					<div className="rounded-xl border-2 border-yellow-200 bg-white p-6 shadow-lg transition-all hover:border-yellow-400 dark:border-yellow-900 dark:bg-slate-800 dark:hover:border-yellow-700">
						<div className="mb-4 text-5xl">⚡</div>
						<h3 className="mb-2 font-bold text-2xl text-yellow-600 dark:text-yellow-400">JavaScript</h3>
						<p className="mb-3 text-slate-500 text-sm dark:text-slate-400">脚本语言</p>
						<p className="text-slate-700 dark:text-slate-300">实现网页的动态交互，处理用户操作和数据处理</p>
						<div className="mt-4 text-slate-500 text-xs dark:text-slate-500">1995年由 Brendan Eich 在10天内创建</div>
					</div>
				</div>

				<div className="mb-12 rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">前端与后端的区别</h3>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-slate-200 border-b-2 dark:border-slate-700">
									<th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">维度</th>
									<th className="px-4 py-3 text-left text-blue-600 dark:text-blue-400">前端（Frontend）</th>
									<th className="px-4 py-3 text-left text-green-600 dark:text-green-400">后端（Backend）</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">运行环境</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">浏览器</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">服务器</td>
								</tr>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">用户可见</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">是（直接看到和操作）</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">否（服务器端运行）</td>
								</tr>
								<tr className="border-slate-100 border-b dark:border-slate-700">
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">主要职责</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">用户界面、交互体验</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">业务逻辑、数据处理</td>
								</tr>
								<tr>
									<td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">关注重点</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">用户体验、视觉呈现</td>
									<td className="px-4 py-3 text-slate-600 dark:text-slate-400">数据安全、性能稳定</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-8 dark:from-slate-800 dark:to-slate-700">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">前端技术发展历程</h3>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{[
							{
								name: "史前时期",
								period: "1940s - 1980s",
								desc: "计算机图形界面诞生，超文本概念出现",
								color: "purple",
							},
							{ name: "静态网页时代", period: "1990 - 1995", desc: "HTML诞生，Web开始起步", color: "blue" },
							{
								name: "动态交互萌芽",
								period: "1995 - 2005",
								desc: "JavaScript和CSS出现，初步实现动态效果",
								color: "green",
							},
							{ name: "Ajax革命", period: "2005 - 2010", desc: "异步通信技术改变Web应用模式", color: "orange" },
							{ name: "框架时代", period: "2010 - 2015", desc: "Angular、React、Vue等框架相继诞生", color: "cyan" },
							{ name: "工程化时代", period: "2015 - 2020", desc: "构建工具、模块化、TypeScript普及", color: "pink" },
							{ name: "AI时代", period: "2020 - 至今", desc: "AI辅助开发工具开始影响前端开发方式", color: "indigo" },
						].map((era, index) => (
							<div key={index} className="era-item">
								<div className="mb-2 flex items-center gap-2">
									<div className={`h-3 w-3 rounded-full bg-${era.color}-500`}></div>
									<h4 className="font-bold text-slate-900 dark:text-slate-100">{era.name}</h4>
								</div>
								<p className="mb-1 text-slate-600 text-sm dark:text-slate-400">{era.period}</p>
								<p className="text-slate-500 text-xs dark:text-slate-500">{era.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// 前端开发者工作职责
function FrontendWorkBlock() {
	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-700 text-sm dark:bg-emerald-900 dark:text-emerald-300">
						职业认知
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发者做什么？</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						前端开发者是连接设计与用户体验的桥梁，负责将设计稿转化为用户可以交互的界面
					</p>
				</div>

				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[
						{
							title: "页面开发",
							icon: "🎨",
							color: "blue",
							items: [
								"将UI设计稿还原为HTML/CSS代码",
								"实现响应式布局，适配多种设备",
								"保证视觉还原度和像素级精确",
								"实现复杂动画和过渡效果",
							],
						},
						{
							title: "交互实现",
							icon: "⚡",
							color: "green",
							items: [
								"实现用户操作响应和反馈",
								"处理表单验证和数据提交",
								"实现复杂的状态管理和逻辑",
								"与后端API对接和数据交互",
							],
						},
						{
							title: "性能优化",
							icon: "🚀",
							color: "purple",
							items: [
								"优化页面加载速度和首屏渲染",
								"减少HTTP请求和资源大小",
								"实现懒加载和代码分割",
								"优化渲染性能和用户体验",
							],
						},
						{
							title: "兼容性处理",
							icon: "🔧",
							color: "orange",
							items: [
								"处理不同浏览器的兼容问题",
								"适配各种屏幕尺寸和分辨率",
								"使用Polyfill解决API不支持",
								"渐进增强和优雅降级策略",
							],
						},
						{
							title: "工程化建设",
							icon: "🛠️",
							color: "cyan",
							items: [
								"搭建和维护前端构建流程",
								"实现组件库和设计系统",
								"编写单元测试和集成测试",
								"建立代码规范和最佳实践",
							],
						},
						{
							title: "多端开发",
							icon: "📱",
							color: "pink",
							items: [
								"开发PC端和移动端网站",
								"开发H5页面和小程序",
								"使用跨平台技术（React Native等）",
								"适配不同平台的特性差异",
							],
						},
					].map((job, index) => (
						<div
							key={index}
							className={`rounded-xl border-l-4 bg-white p-6 shadow-lg dark:bg-slate-800 border-${job.color}-500`}
						>
							<div className="mb-4 flex items-center gap-3">
								<div
									className={`h-12 w-12 bg-${job.color}-100 dark:bg-${job.color}-900 flex items-center justify-center rounded-lg`}
								>
									<span className="text-2xl">{job.icon}</span>
								</div>
								<h4 className="font-bold text-slate-900 text-xl dark:text-slate-100">{job.title}</h4>
							</div>
							<ul className="space-y-2 text-slate-600 text-sm dark:text-slate-400">
								{job.items.map((item, i) => (
									<li key={i} className="flex items-start gap-2">
										<span className={`text-${job.color}-500 mt-1`}>•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-8 dark:from-slate-800 dark:to-slate-700">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">前端职业发展路径</h3>
					<div className="grid gap-4 md:grid-cols-4">
						{[
							{ icon: "🌱", title: "初级前端", desc: "1-2年经验\n掌握基础技能\n完成页面开发", color: "blue" },
							{ icon: "💪", title: "中级前端", desc: "3-5年经验\n深入框架原理\n独立负责模块", color: "green" },
							{ icon: "🚀", title: "高级前端", desc: "5-8年经验\n架构设计能力\n技术方案决策", color: "purple" },
							{ icon: "👑", title: "技术专家", desc: "8年+经验\n技术深度和广度\n团队技术引领", color: "orange" },
						].map((level, index) => (
							<div key={index} className="rounded-lg bg-white p-5 text-center dark:bg-slate-800">
								<div
									className={`h-16 w-16 bg-${level.color}-100 dark:bg-${level.color}-900 mx-auto mb-3 flex items-center justify-center rounded-full`}
								>
									<span className="text-3xl">{level.icon}</span>
								</div>
								<h4 className="mb-2 font-bold text-lg text-slate-900 dark:text-slate-100">{level.title}</h4>
								<p className="whitespace-pre-line text-slate-600 text-xs dark:text-slate-400">{level.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// 前端开发者一天
function FrontendResponsibilitiesBlock() {
	const [activeResponsibility, setActiveResponsibility] = useState("ui-dev");
	const current = responsibilities.find((r) => r.id === activeResponsibility)!;

	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 font-semibold text-amber-700 text-sm dark:bg-amber-900 dark:text-amber-300">
						工作内容
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发者的一天</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						前端开发者的工作远不止写代码，涉及从设计还原到性能优化的全流程
					</p>
				</div>

				<div className="mb-16">
					<h3 className="mb-8 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">典型工作流程</h3>
					<div className="relative">
						<div className="absolute top-0 bottom-0 left-8 hidden w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:block"></div>

						<div className="space-y-6 md:ml-16">
							{[
								{
									icon: "📋",
									title: "需求评审",
									desc: "参与产品需求评审，理解业务目标，评估技术可行性",
									color: "blue",
									tags: ["理解需求", "技术评估", "工期预估"],
								},
								{
									icon: "🎨",
									title: "设计对接",
									desc: "与设计师确认交互细节，讨论视觉实现方案，确保可行性",
									color: "purple",
									tags: ["视觉评审", "交互确认", "素材获取"],
								},
								{
									icon: "💻",
									title: "开发实现",
									desc: "编写代码实现功能，进行自测，修复bug，优化性能",
									color: "green",
									tags: ["UI开发", "逻辑实现", "接口联调", "性能优化"],
								},
								{
									icon: "🚀",
									title: "测试上线",
									desc: "配合测试团队修复bug，进行代码评审，最终部署上线",
									color: "orange",
									tags: ["自测", "Bug修复", "代码评审", "部署上线"],
								},
							].map((step, index) => (
								<div key={index} className="flex items-start gap-4">
									<div
										className={`h-16 w-16 bg-${step.color}-100 dark:bg-${step.color}-900 z-10 flex shrink-0 items-center justify-center rounded-full text-2xl`}
									>
										{step.icon}
									</div>
									<div className="flex-1 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
										<h4 className="mb-2 font-bold text-slate-900 text-xl dark:text-slate-100">{step.title}</h4>
										<p className="mb-3 text-slate-600 dark:text-slate-400">{step.desc}</p>
										<div className="flex flex-wrap gap-2">
											{step.tags.map((tag, i) => (
												<span
													key={i}
													className={`px-3 py-1 bg-${step.color}-100 dark:bg-${step.color}-900 text-${step.color}-700 dark:text-${step.color}-300 rounded-full text-xs`}
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mb-12">
					<h3 className="mb-8 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">核心职责详解</h3>

					<div className="mb-8 flex flex-wrap justify-center gap-3">
						{responsibilities.map((resp) => (
							<button
								key={resp.id}
								onClick={() => setActiveResponsibility(resp.id)}
								className={cn(
									"flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm transition-all",
									activeResponsibility === resp.id
										? `bg-${resp.color}-500 text-white shadow-lg`
										: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
								)}
							>
								<span className="text-lg">{resp.icon}</span>
								<span>{resp.title}</span>
							</button>
						))}
					</div>

					<div className="mx-auto max-w-5xl">
						<div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
							<div className="mb-6 flex items-start gap-4">
								<div
									className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl bg-${current.color}-100 dark:bg-${current.color}-900`}
								>
									{current.icon}
								</div>
								<div className="flex-1">
									<div className="mb-2 flex items-center gap-3">
										<h4 className="font-bold text-2xl text-slate-900 dark:text-slate-100">{current.title}</h4>
										<span
											className={`rounded-full px-3 py-1 font-semibold text-xs bg-${current.color}-100 text-${current.color}-700 dark:bg-${current.color}-900 dark:text-${current.color}-300`}
										>
											{current.category}
										</span>
									</div>
									<p className="text-slate-600 dark:text-slate-400">{current.description}</p>
								</div>
							</div>

							<div className="mb-6">
								<h5 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
									<span>📝</span>
									<span>具体任务</span>
								</h5>
								<div className="grid gap-3 md:grid-cols-2">
									{current.tasks.map((task, index) => (
										<div key={index} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
											<span className={`text-${current.color}-500`}>✓</span>
											<span className="text-slate-700 text-sm dark:text-slate-300">{task}</span>
										</div>
									))}
								</div>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
										<span>💡</span>
										<span>核心技能</span>
									</h5>
									<div className="flex flex-wrap gap-2">
										{current.skills.map((skill, index) => (
											<span
												key={index}
												className={`rounded-full px-3 py-1 text-sm bg-${current.color}-100 text-${current.color}-700 dark:bg-${current.color}-900 dark:text-${current.color}-300`}
											>
												{skill}
											</span>
										))}
									</div>
								</div>
								<div>
									<h5 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
										<span>🔧</span>
										<span>常用工具</span>
									</h5>
									<div className="flex flex-wrap gap-2">
										{current.tools.map((tool, index) => (
											<span
												key={index}
												className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 text-sm dark:bg-slate-700 dark:text-slate-300"
											>
												{tool}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// 前端四大载体
function FrontendPlatformsBlock() {
	const [activePlatform, setActivePlatform] = useState("web");
	const current = platforms.find((p) => p.id === activePlatform)!;

	return (
		<section className="bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 font-semibold text-sm text-violet-700 dark:bg-violet-900 dark:text-violet-300">
						技术载体
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端开发的四大载体</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						前端开发者需要掌握不同载体的特点和开发方式，根据业务需求选择最合适的方案
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{platforms.map((platform) => (
						<button
							key={platform.id}
							onClick={() => setActivePlatform(platform.id)}
							className={cn(
								"flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all",
								activePlatform === platform.id
									? `bg-${platform.color}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-2xl">{platform.icon}</span>
							<span>{platform.name}</span>
						</button>
					))}
				</div>

				<div className="mx-auto max-w-6xl">
					<div className="mb-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						<div className="mb-6 flex items-center gap-4">
							<div
								className={`flex h-20 w-20 items-center justify-center rounded-xl text-4xl bg-${current.color}-100 dark:bg-${current.color}-900`}
							>
								{current.icon}
							</div>
							<div className="flex-1">
								<h3 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">{current.name}</h3>
								<p className="text-slate-600 dark:text-slate-400">{current.description}</p>
							</div>
						</div>

						<div className="mb-6">
							<h4 className="mb-3 flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
								<span>✨</span>
								<span>核心特性</span>
							</h4>
							<div className="grid gap-3 md:grid-cols-2">
								{current.features.map((feature, index) => (
									<div key={index} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
										<span className={`text-${current.color}-500`}>✓</span>
										<span className="text-slate-700 text-sm dark:text-slate-300">{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
							<h4 className="mb-4 flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
								<span>🛠️</span>
								<span>技术栈</span>
							</h4>
							<div className="flex flex-wrap gap-2">
								{current.techStack.map((tech, index) => (
									<span
										key={index}
										className={`rounded-full px-3 py-1 text-sm bg-${current.color}-100 text-${current.color}-700 dark:bg-${current.color}-900 dark:text-${current.color}-300`}
									>
										{tech}
									</span>
								))}
							</div>
						</div>

						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
							<h4 className="mb-4 flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
								<span>🎯</span>
								<span>应用场景</span>
							</h4>
							<div className="grid grid-cols-2 gap-2">
								{current.scenarios.map((scenario, index) => (
									<div key={index} className="flex items-center gap-2">
										<span className="text-slate-400">•</span>
										<span className="text-slate-700 text-sm dark:text-slate-300">{scenario}</span>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:from-green-900/20 dark:to-emerald-900/20">
							<h4 className="mb-4 flex items-center gap-2 font-bold text-green-700 text-lg dark:text-green-400">
								<span>✅</span>
								<span>核心优势</span>
							</h4>
							<ul className="space-y-2">
								{current.advantages.map((advantage, index) => (
									<li key={index} className="flex items-start gap-2 text-green-700 text-sm dark:text-green-300">
										<span className="mt-0.5">✓</span>
										<span>{advantage}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-6 dark:from-red-900/20 dark:to-orange-900/20">
							<h4 className="mb-4 flex items-center gap-2 font-bold text-lg text-red-700 dark:text-red-400">
								<span>⚠️</span>
								<span>注意事项</span>
							</h4>
							<ul className="space-y-2">
								{current.disadvantages.map((disadvantage, index) => (
									<li key={index} className="flex items-start gap-2 text-red-700 text-sm dark:text-red-300">
										<span className="mt-0.5">!</span>
										<span>{disadvantage}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// 三大核心技术
function CoreTechBlock() {
	const [activeTech, setActiveTech] = useState("html");
	const [activeTab, setActiveTab] = useState<"overview" | "history" | "code">("overview");
	const currentTech = coreTechDetails.find((t) => t.id === activeTech)!;

	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 font-semibold text-orange-700 text-sm dark:bg-orange-900 dark:text-orange-300">
						核心技术
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端三大核心技术</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						HTML、CSS、JavaScript 构成了现代网页开发的三大支柱，缺一不可
					</p>
				</div>

				<div className="mb-12 flex justify-center gap-4">
					{coreTechDetails.map((tech) => (
						<button
							key={tech.id}
							onClick={() => {
								setActiveTech(tech.id);
								setActiveTab("overview");
							}}
							className={cn(
								"flex flex-col items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-all",
								activeTech === tech.id
									? `bg-${tech.color === "yellow" ? "yellow" : tech.color}-500 scale-105 text-white shadow-xl`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-3xl">{tech.icon}</span>
							<span className="text-xl">{tech.name}</span>
						</button>
					))}
				</div>

				<div className="mx-auto max-w-6xl">
					<div className="mb-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						<div className="flex items-start gap-6">
							<div
								className={`flex h-24 w-24 items-center justify-center rounded-2xl text-5xl bg-${currentTech.color === "yellow" ? "yellow" : currentTech.color}-100 dark:bg-${currentTech.color === "yellow" ? "yellow" : currentTech.color}-900`}
							>
								{currentTech.icon}
							</div>
							<div className="flex-1">
								<h3 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">
									{currentTech.name} - {currentTech.tagline}
								</h3>
								<p className="mb-4 text-slate-600 dark:text-slate-400">{currentTech.description}</p>
								<div className="flex flex-wrap gap-4 text-sm">
									<div className="flex items-center gap-2">
										<span className="text-slate-500">🎂</span>
										<span className="text-slate-700 dark:text-slate-300">出生于 {currentTech.birthYear} 年</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-slate-500">👨‍💻</span>
										<span className="text-slate-700 dark:text-slate-300">创造者 {currentTech.creator}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-slate-500">📅</span>
										<span className="text-slate-700 dark:text-slate-300">距今 {2026 - currentTech.birthYear} 年</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-6 flex gap-2">
						{[
							{ key: "overview", label: "📖 核心特性" },
							{ key: "history", label: "📅 发展历史" },
							{ key: "code", label: "💻 代码示例" },
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setActiveTab(tab.key as any)}
								className={cn(
									"rounded-lg px-6 py-3 font-medium transition-all",
									activeTab === tab.key
										? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
										: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
								)}
							>
								{tab.label}
							</button>
						))}
					</div>

					<div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
						{activeTab === "overview" && (
							<div className="space-y-8">
								{currentTech.keyFeatures.map((featureGroup, index) => (
									<div key={index}>
										<h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
											<span>{index === 0 ? "🔑" : "✨"}</span>
											<span>{featureGroup.title}</span>
										</h4>
										<div className="grid gap-3 md:grid-cols-2">
											{featureGroup.items.map((item, itemIndex) => (
												<div
													key={itemIndex}
													className={`rounded-lg border-2 p-4 ${
														currentTech.color === "orange"
															? "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-900/20"
															: currentTech.color === "blue"
																? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20"
																: "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20"
													}`}
												>
													<div className="flex items-start gap-2">
														<span
															className={`${
																currentTech.color === "orange"
																	? "text-orange-500"
																	: currentTech.color === "blue"
																		? "text-blue-500"
																		: "text-yellow-500"
															}`}
														>
															✓
														</span>
														<span className="text-slate-700 dark:text-slate-300">{item}</span>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "history" && (
							<div className="space-y-6">
								<div className="relative">
									{currentTech.history.map((event, index) => (
										<div key={index} className="mb-6 flex gap-4">
											<div className="flex flex-col items-center">
												<div
													className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg ${
														currentTech.color === "orange"
															? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400"
															: currentTech.color === "blue"
																? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
																: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
													}`}
												>
													{event.year}
												</div>
												{index < currentTech.history.length - 1 && (
													<div className="h-16 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
												)}
											</div>
											<div className="flex-1 pb-6">
												<div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
													<p className="text-slate-700 dark:text-slate-300">{event.event}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === "code" && (
							<div className="space-y-6">
								<div>
									<h4 className="mb-4 font-bold text-slate-900 text-xl dark:text-slate-100">
										{currentTech.codeExample.title}
									</h4>
									<div className="overflow-x-auto rounded-lg bg-slate-900 p-6 dark:bg-slate-950">
										<pre className="font-mono text-green-400 text-sm">
											<code>{currentTech.codeExample.code}</code>
										</pre>
									</div>
								</div>
								<div className="rounded-lg border-blue-500 border-l-4 bg-blue-50 p-4 dark:bg-blue-900/20">
									<h5 className="mb-2 font-bold text-slate-900 dark:text-slate-100">💡 代码说明</h5>
									<p className="text-slate-700 text-sm dark:text-slate-300">{currentTech.codeExample.explanation}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

// 浏览器发展史
function BrowserHistoryBlock() {
	const [activeEra, setActiveEra] = useState("war1");

	return (
		<section className="bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 font-semibold text-red-700 text-sm dark:bg-red-900 dark:text-red-300">
						浏览器历史
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">浏览器发展史</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从 WorldWideWeb 到 Chrome，浏览器的发展历程是互联网技术进步的缩影
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{browserEras.map((era) => (
						<button
							key={era.id}
							onClick={() => setActiveEra(era.id)}
							className={cn(
								"rounded-lg px-5 py-3 font-medium transition-all",
								activeEra === era.id
									? `bg-${era.color === "purple" ? "purple" : era.color === "red" ? "red" : era.color === "gray" ? "gray" : era.color === "orange" ? "orange" : "blue"}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<div className="text-xs opacity-70">{era.period}</div>
							<div>{era.name}</div>
						</button>
					))}
				</div>

				{(() => {
					const currentEra = browserEras.find((e) => e.id === activeEra)!;
					return (
						<>
							<div className="mb-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
								<div className="mb-6 flex items-center gap-4">
									<div
										className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl bg-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-100 dark:bg-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-900`}
									>
										📜
									</div>
									<div className="flex-1">
										<h3 className="mb-1 font-bold text-2xl text-slate-900 dark:text-slate-100">{currentEra.name}</h3>
										<p
											className={`font-semibold text-sm text-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-600 dark:text-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-400`}
										>
											{currentEra.period}
										</p>
									</div>
								</div>
								<p className="text-slate-700 dark:text-slate-300">{currentEra.description}</p>
							</div>

							<div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{currentEra.browsers.map((browser, index) => (
									<div
										key={index}
										className="rounded-xl border-t-4 bg-white p-6 shadow-lg dark:bg-slate-800"
										style={{
											borderColor:
												currentEra.color === "purple"
													? "#a855f7"
													: currentEra.color === "red"
														? "#ef4444"
														: currentEra.color === "gray"
															? "#6b7280"
															: currentEra.color === "orange"
																? "#f97316"
																: "#3b82f6",
										}}
									>
										<div className="mb-4 flex items-center gap-3">
											<div className="text-4xl">{browser.icon}</div>
											<div className="flex-1">
												<h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{browser.name}</h4>
												<p className="text-slate-500 text-sm dark:text-slate-400">{browser.years}</p>
											</div>
										</div>

										<p className="mb-3 text-slate-700 text-sm dark:text-slate-300">{browser.description}</p>

										<div className="mb-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
											<p className="text-slate-600 text-xs dark:text-slate-400">
												<span className="font-semibold">历史意义：</span>
												{browser.significance}
											</p>
										</div>

										{browser.marketPeak && (
											<div
												className={`rounded-lg p-2 text-center bg-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-50 dark:bg-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-900/20`}
											>
												<div className="text-slate-500 text-xs dark:text-slate-400">巅峰市场份额</div>
												<div
													className={`font-bold text-2xl text-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-600 dark:text-${currentEra.color === "purple" ? "purple" : currentEra.color === "red" ? "red" : currentEra.color === "gray" ? "gray" : currentEra.color === "orange" ? "orange" : "blue"}-400`}
												>
													{browser.marketPeak.share}
												</div>
												<div className="text-slate-500 text-xs dark:text-slate-400">{browser.marketPeak.year} 年</div>
											</div>
										)}
									</div>
								))}
							</div>
						</>
					);
				})()}
			</div>
		</section>
	);
}

// 前端框架发展史
function FrameworkHistoryBlock() {
	const [activeEra, setActiveEra] = useState("framework-rise");

	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 font-semibold text-sm text-violet-700 dark:bg-violet-900 dark:text-violet-300">
						框架历史
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端框架发展史</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从 jQuery 到现代框架，前端开发模式的演进是技术发展的缩影
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{frameworkEras.map((era) => (
						<button
							key={era.id}
							onClick={() => setActiveEra(era.id)}
							className={cn(
								"rounded-lg px-5 py-3 font-medium transition-all",
								activeEra === era.id
									? `bg-${era.color === "blue" ? "blue" : era.color === "green" ? "green" : era.color === "red" ? "red" : era.color === "orange" ? "orange" : "purple"}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<div className="text-xs opacity-70">{era.period}</div>
							<div>{era.name}</div>
						</button>
					))}
				</div>

				{(() => {
					const currentEra = frameworkEras.find((e) => e.id === activeEra)!;
					return (
						<div className="mb-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
							<div className="mb-6 flex items-center gap-4">
								<div
									className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl bg-${currentEra.color === "blue" ? "blue" : currentEra.color === "green" ? "green" : currentEra.color === "red" ? "red" : currentEra.color === "orange" ? "orange" : "purple"}-100 dark:bg-${currentEra.color === "blue" ? "blue" : currentEra.color === "green" ? "green" : currentEra.color === "red" ? "red" : currentEra.color === "orange" ? "orange" : "purple"}-900`}
								>
									📚
								</div>
								<div className="flex-1">
									<h3 className="mb-1 font-bold text-2xl text-slate-900 dark:text-slate-100">{currentEra.name}</h3>
									<p
										className={`font-semibold text-sm text-${currentEra.color === "blue" ? "blue" : currentEra.color === "green" ? "green" : currentEra.color === "red" ? "red" : currentEra.color === "orange" ? "orange" : "purple"}-600 dark:text-${currentEra.color === "blue" ? "blue" : currentEra.color === "green" ? "green" : currentEra.color === "red" ? "red" : currentEra.color === "orange" ? "orange" : "purple"}-400`}
									>
										{currentEra.period}
									</p>
								</div>
							</div>
							<p className="mb-4 text-slate-700 dark:text-slate-300">{currentEra.description}</p>
						</div>
					);
				})()}
			</div>
		</section>
	);
}

// 前端工具链
function FrontendToolsBlock() {
	const [activeCategory, setActiveCategory] = useState("build-tools");

	return (
		<section className="bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-cyan-100 px-4 py-1 font-semibold text-cyan-700 text-sm dark:bg-cyan-900 dark:text-cyan-300">
						工程化
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端工具链</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						现代前端开发离不开完善的工具链，这些工具让开发更高效、代码更可靠
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{toolCategories.map((category) => (
						<button
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
							className={cn(
								"flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all",
								activeCategory === category.id
									? `bg-${category.color === "blue" ? "blue" : category.color === "green" ? "green" : category.color === "purple" ? "purple" : category.color === "orange" ? "orange" : "pink"}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-xl">{category.icon}</span>
							<span>{category.name}</span>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}

// 前端技能树
function FrontendSkillsBlock() {
	const [activeLevel, setActiveLevel] = useState("beginner");

	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-700 text-sm dark:bg-emerald-900 dark:text-emerald-300">
						技能成长
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">
						前端技能树与学习路径
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从入门到专家，清晰的成长路径和技能要求
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-4">
					{skillLevels.map((level) => (
						<button
							key={level.id}
							onClick={() => setActiveLevel(level.id)}
							className={cn(
								"rounded-xl px-6 py-4 text-center font-medium transition-all",
								activeLevel === level.id
									? `bg-${level.color === "green" ? "green" : level.color === "blue" ? "blue" : level.color === "purple" ? "purple" : "orange"}-500 scale-105 text-white shadow-xl`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<div className="mb-1 text-xs opacity-70">{level.period}</div>
							<div className="text-lg">{level.name}</div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}

// 性能优化
function PerformanceBlock() {
	const [activeCategory, setActiveCategory] = useState("loading");

	return (
		<section className="bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-700 text-sm dark:bg-rose-900 dark:text-rose-300">
						性能优化
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">前端性能优化</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						性能优化是前端开发的核心能力，直接影响用户体验和业务指标
					</p>
				</div>

				<div className="mb-12 flex flex-wrap justify-center gap-3">
					{performanceCategories.map((category) => (
						<button
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
							className={cn(
								"flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all",
								activeCategory === category.id
									? `bg-${category.color === "blue" ? "blue" : category.color === "green" ? "green" : category.color === "purple" ? "purple" : "orange"}-500 scale-105 text-white shadow-lg`
									: "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
							)}
						>
							<span className="text-xl">{category.icon}</span>
							<span>{category.name}</span>
						</button>
					))}
				</div>

				<div className="mt-16 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
					<h3 className="mb-8 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">
						Core Web Vitals 核心指标
					</h3>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-center dark:from-blue-900/20 dark:to-cyan-900/20">
							<div className="mb-3 text-4xl">⏱️</div>
							<h4 className="mb-2 font-bold text-lg text-slate-900 dark:text-slate-100">LCP</h4>
							<p className="mb-3 text-slate-600 text-sm dark:text-slate-400">
								Largest Contentful Paint
								<br />
								最大内容绘制
							</p>
							<div className="space-y-1 text-sm">
								<div className="flex justify-center gap-2">
									<span className="text-green-600 dark:text-green-400">好 &lt;2.5s</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-yellow-600 dark:text-yellow-400">需改进 2.5-4s</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-red-600 dark:text-red-400">差 &gt;4s</span>
								</div>
							</div>
						</div>

						<div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center dark:from-purple-900/20 dark:to-pink-900/20">
							<div className="mb-3 text-4xl">⚡</div>
							<h4 className="mb-2 font-bold text-lg text-slate-900 dark:text-slate-100">FID</h4>
							<p className="mb-3 text-slate-600 text-sm dark:text-slate-400">
								First Input Delay
								<br />
								首次输入延迟
							</p>
							<div className="space-y-1 text-sm">
								<div className="flex justify-center gap-2">
									<span className="text-green-600 dark:text-green-400">好 &lt;100ms</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-yellow-600 dark:text-yellow-400">需改进 100-300ms</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-red-600 dark:text-red-400">差 &gt;300ms</span>
								</div>
							</div>
						</div>

						<div className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-6 text-center dark:from-orange-900/20 dark:to-red-900/20">
							<div className="mb-3 text-4xl">📐</div>
							<h4 className="mb-2 font-bold text-lg text-slate-900 dark:text-slate-100">CLS</h4>
							<p className="mb-3 text-slate-600 text-sm dark:text-slate-400">
								Cumulative Layout Shift
								<br />
								累积布局偏移
							</p>
							<div className="space-y-1 text-sm">
								<div className="flex justify-center gap-2">
									<span className="text-green-600 dark:text-green-400">好 &lt;0.1</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-yellow-600 dark:text-yellow-400">需改进 0.1-0.25</span>
								</div>
								<div className="flex justify-center gap-2">
									<span className="text-red-600 dark:text-red-400">差 &gt;0.25</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ============== 主页面 ==============

export default function FrontendPlanPage() {
	return (
		<Layout>
			<HeroBlock />
			<FrontendIntroBlock />
			<FrontendWorkBlock />
			<FrontendResponsibilitiesBlock />
			<FrontendPlatformsBlock />
			<CoreTechBlock />
			<BrowserHistoryBlock />
			<FrameworkHistoryBlock />
			<FrontendToolsBlock />
			<FrontendSkillsBlock />
			<PerformanceBlock />
		</Layout>
	);
}
