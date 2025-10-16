# 路由创建标准提示词（Next.js App Router + routeDefs.ts）

适用范围
- 技术栈：Next.js App Router（src/app 目录）
- 目标：在 src/app 下创建新路由页面，并按约定将其纳入侧边导航（src/routeDefs.ts） 
 

二、路径命名与目录结构规范
- 页面根：src/app/{group}/{subPath}/page.tsx
  - group 为一级目录（如 basic、files、animation、other、nextjs-features 等）
  - subPath 为二级或多级路径（如 page-transition、liquid-glass/advanced）
- URL 规则：/{group}/{subPath}
- 命名建议：小写-kebab-case

三、页面实现规范（Server Component）
- page.tsx 为服务端组件，默认即可
- SEO 元数据：导出 metadata 
 

五、导航配置规范（src/routeDefs.ts）
- 找到合适的分组 RouteGroup（按领域归类）
  - 常见分组：basic、forms、data、charts、files、map、animation、chat、auth、other、performance、d3js、nextjs-features、ai 等
- 将新页面以 RouteChild 追加到对应组的 children
  - RouteChild.path 为 group 下的相对路径；如果 URL 是 /animation/page-transition，则 path 为 "page-transition"
  - 若多级：/special-effects/liquid-glass/advanced 则 path 为 "liquid-glass/advanced"
- 若无合适分组：新增一个 RouteGroup，包含 path、title、children

RouteChild 示例补丁（伪示例）
```ts
// 在 animation 组中增加一个页面
{
  path: "animation",
  title: "动画/交互",
  children: [
    { path: "page-transition", title: "页面过渡" },
    { path: "element", title: "元素动画" },
    { path: "drag-drop", title: "拖拽" },
    // 新增项
    { path: "new-demo", title: "新动画示例" },
  ],
},
```

六、标准提示词模板（可直接复用）
请在本项目中新增一个路由页面，要求：
1) 路由信息
- URL：/{group}/{subPath}
- 页面标题（中文）：{titleZh}
- 页面描述（中文）：{descZh}

2) 文件与目录
- 在 src/app/{group}/{subPath}/page.tsx 创建页面（多级子路径请对应创建目录）
- 页面使用 Server Component，无需 "use client"
- 导出 metadata，包含 title 和 description
 
4) 导航配置
- 打开 src/routeDefs.ts
- 在 {group} 分组下 children 追加 { path: "{subPath}", title: "{titleZh}" }
- 若无合适分组，请新增一个 RouteGroup，并在 routeGroups 中注册

5) 验收清单
- 访问 /{group}/{subPath} 正常加载
- 浏览器标题与 metadata.title 一致 
- routeDefs.ts 中标题与侧边栏显示一致
- 无控制台/终端错误

请直接创建文件并修改 routeDefs.ts，保持现有代码风格与命名约定。
 
routeDefs.ts（示例，添加到 animation 组）
```ts
{
  path: "animation",
  title: "动画/交互",
  children: [
    { path: "page-transition", title: "页面过渡" },
    { path: "element", title: "元素动画" },
    { path: "drag-drop", title: "拖拽" },
    { path: "gsap-todo", title: "GSAP TODO 文档" }, // 新增
  ],
},
```
 