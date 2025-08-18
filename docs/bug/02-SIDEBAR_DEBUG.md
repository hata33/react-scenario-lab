# 侧边栏自动隐藏功能调试指南

## 功能描述
无论在开发环境还是生产环境，点击菜单后侧边栏都会自动隐藏，并记忆用户的偏好设置。

## 实现逻辑

### 1. 自动隐藏触发条件
- 组件完全hydrated后
- 首次路由跳转（路径发生变化）
- 之前没有自动关闭过

### 2. 备用机制
- 3秒延迟的强制自动隐藏
- 确保功能在各种情况下都能正常工作

### 3. 状态持久化
- 自动隐藏后保存状态到localStorage
- 下次访问时恢复用户偏好

## 调试步骤

### 1. 启动应用
```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm start
```

### 2. 打开浏览器开发者工具
- 查看 Console 标签页
- 观察以下日志信息：

```
Layout initialized: {
  isDevelopment: true/false,
  initialPath: "/",
  sidebarSeen: "0",
  pinnedOpen: true
}

Auto-hide check: {
  isDevelopment: true/false,
  isHydrated: true,
  hasAutoClosed: false,
  activePath: "/basic/counter",
  initialPath: "/",
  shouldAutoClose: true
}

Auto-closing sidebar and setting localStorage
localStorage set: sidebarSeen = 1
```

### 3. 测试自动隐藏功能
1. 访问首页 `/`
2. 点击任意菜单项（如 `/basic/counter`）
3. 观察侧边栏是否自动隐藏
4. 检查 localStorage 中的 `sidebarSeen` 值

## 可能的问题和解决方案

### 问题1: 自动隐藏不触发
**症状**: 控制台显示 `shouldAutoClose: false`
**解决**: 检查 `initialPath` 和 `activePath` 的值是否不同

### 问题2: localStorage 写入失败
**症状**: 没有 "localStorage set" 日志
**解决**: 检查浏览器权限和存储空间

### 问题3: 路径比较失败
**症状**: 路径相同但应该不同
**解决**: 检查路由配置和路径生成逻辑

## 强制触发机制
如果自动隐藏仍然不工作，系统会在3秒后强制触发：
```
Force auto-closing sidebar after timeout
localStorage set: sidebarSeen = 1
```

## 测试命令
```bash
# 开发环境测试
npm run dev

# 生产环境测试
npm run build
npm start
```

## 注意事项
- 确保路由跳转正常工作
- 检查浏览器控制台是否有错误信息
- 验证 localStorage 是否可用
- 确认组件完全hydrated后再测试

## 预期行为
- **首次访问**: 侧边栏显示
- **点击菜单**: 侧边栏自动隐藏
- **刷新页面**: 侧边栏保持隐藏状态
- **手动切换**: 使用快捷键 Ctrl/Cmd + B 可以手动切换
