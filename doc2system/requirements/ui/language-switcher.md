# 语言切换器组件

## 概述

语言切换器是一个支持多语言切换的 UI 组件，提供直观的语言选择界面和流畅的切换体验。

## 组件特性

### 核心功能
- 多语言支持（中文、英文、日文）
- 实时语言切换
- 响应式设计
- 主题适配（暗色/亮色）
- 平滑过渡动画

### 技术规范

#### 组件位置
- 主组件：`src/components/Other/I18n.tsx`
- 上下文管理：`src/contexts/LanguageContext.tsx`
- 类型定义：`src/types/language.ts`

#### 接口定义
```tsx
interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons' | 'select';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}
```

#### 语言类型
```tsx
type Language = 'zh' | 'en' | 'ja';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag?: string;
}
```

## 使用方法

### 基础用法
```tsx
import { LanguageSwitcher } from '@/components/Other/I18n';

function App() {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
}
```

### 高级用法
```tsx
<LanguageSwitcher
  variant="dropdown"
  size="large"
  showIcon={true}
  className="custom-language-switcher"
/>
```

## 设计规范

### 视觉样式
- 使用下拉菜单或按钮组
- 支持国家旗帜显示
- 活跃语言高亮显示
- 平滑的过渡动画

### 交互设计
- 点击切换语言
- 悬停效果反馈
- 键盘导航支持
- 屏幕阅读器友好

### 响应式设计
- 移动端：下拉菜单
- 平板端：按钮组
- 桌面端：下拉菜单或按钮组

## 状态管理

### 全局状态
使用 React Context 进行全局语言状态管理：

```tsx
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  language: 'zh',
  setLanguage: () => {},
});
```

### 本地存储
支持将用户语言偏好保存到 localStorage：

```tsx
useEffect(() => {
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, []);
```

## 性能优化

### 代码分割
- 语言包按需加载
- 组件懒加载支持
- 避免不必要的重渲染

### 缓存策略
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存事件处理函数
- 语言切换结果缓存

## 测试要求

### 单元测试
- 组件渲染测试
- 语言切换功能测试
- 事件处理测试
- 无障碍访问测试

### 集成测试
- 上下文集成测试
- 本地存储功能测试
- 多语言切换测试

## 维护说明

### 添加新语言
1. 在 `Language` 类型中添加新语言代码
2. 更新语言选项配置
3. 添加对应的语言包文件
4. 更新类型定义

### 样式自定义
- 使用 CSS 变量进行主题定制
- 支持自定义样式覆盖
- 保持与设计系统一致

## 相关文档

- [多语言支持系统](../features/multi-language-support.md)
- [响应式导航](./responsive-navigation.md)
- [React Context 使用指南](../../architecture/react-context-guide.md)