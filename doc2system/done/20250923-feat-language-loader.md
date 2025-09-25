# 添加语言加载器组件

**任务ID**: 20250923-feat-language-loader
**创建时间**: 2025-09-23
**优先级**: 中
**类型**: feat

## 功能描述

为多语言支持系统添加语言加载器组件，在语言切换时显示加载状态，提升用户体验。

## 功能需求

### 核心功能
- 语言切换时显示加载动画
- 支持自定义加载提示文本
- 支持多种加载动画样式
- 语言加载完成后自动隐藏

### 技术要求
- 组件名称：`LanguageLoader`
- 位置：`src/components/common/LanguageLoader.tsx`
- 使用 React 状态管理加载状态
- 支持 TypeScript 类型定义

### 设计要求
- 简洁现代的 UI 设计
- 支持暗色/亮色主题
- 动画效果流畅自然
- 响应式设计

## 预期接口

```tsx
interface LanguageLoaderProps {
  isLoading: boolean;
  message?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'small' | 'medium' | 'large';
}
```

## 相关文件

- `src/components/common/LanguageLoader.tsx` (新建)
- `src/components/Layout.tsx` (需要集成)
- `src/components/Other/I18n.tsx` (需要集成)

## 验证标准

- [ ] 组件成功创建并通过 TypeScript 编译
- [ ] 加载动画显示正常
- [ ] 不同样式和尺寸配置工作正常
- [ ] 主题切换时样式适配正确
- [ ] 与现有语言切换功能集成正常