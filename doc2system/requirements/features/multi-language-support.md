# 多语言支持系统

## 概述

多语言支持系统是一个完整的国际化解决方案，支持中文、英文、日文等多种语言的切换，提供统一的翻译管理和状态控制。

## 系统架构

### 核心组件
- **Language Context**: 全局语言状态管理
- **Language Switcher**: 语言切换 UI 组件
- **Translation Loader**: 语言包加载器
- **Translation Cache**: 翻译内容缓存

### 数据流
```
用户选择语言 → 更新全局状态 → 重新加载语言包 → 更新 UI 显示
```

## 语言包管理

### 语言包结构
```
src/locales/
├── zh.json          # 中文语言包
├── en.json          # 英文语言包
├── ja.json          # 日文语言包
└── index.ts         # 语言包导出
```

### 语言包格式
```json
{
  "common": {
    "home": "首页",
    "about": "关于",
    "contact": "联系我们"
  },
  "navigation": {
    "dashboard": "仪表板",
    "settings": "设置",
    "profile": "个人资料"
  },
  "messages": {
    "welcome": "欢迎使用",
    "success": "操作成功",
    "error": "操作失败"
  }
}
```

## 技术实现

### 状态管理
```tsx
interface LanguageState {
  currentLanguage: Language;
  translations: Record<string, any>;
  isLoading: boolean;
  error: string | null;
}

const useLanguage = () => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  const setLanguage = useCallback(async (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE_START', payload: lang });
    try {
      const translations = await loadTranslations(lang);
      dispatch({ type: 'SET_LANGUAGE_SUCCESS', payload: { lang, translations } });
    } catch (error) {
      dispatch({ type: 'SET_LANGUAGE_ERROR', payload: error.message });
    }
  }, []);

  return { ...state, setLanguage };
};
```

### 翻译函数
```tsx
const t = (key: string, params?: Record<string, string>) => {
  const keys = key.split('.');
  let value = translations;

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  // 支持参数替换
  if (params) {
    Object.entries(params).forEach(([param, replacement]) => {
      value = value.replace(`{{${param}}}`, replacement);
    });
  }

  return value;
};
```

### 语言包加载
```tsx
const loadTranslations = async (language: Language) => {
  // 检查缓存
  const cached = translationsCache.get(language);
  if (cached) return cached;

  // 动态导入语言包
  const module = await import(`@/locales/${language}.json`);
  translationsCache.set(language, module.default);

  return module.default;
};
```

## 优化策略

### 性能优化
- **按需加载**: 只加载当前需要的语言包
- **缓存机制**: 缓存已加载的语言包
- **代码分割**: 语言包单独打包
- **预加载**: 预加载常用语言包

### 内存优化
- **LRU 缓存**: 限制缓存大小
- **垃圾回收**: 定期清理不用的语言包
- **懒加载**: 避免一次性加载所有语言包

### 用户体验优化
- **加载状态**: 语言切换时显示加载动画
- **错误处理**: 语言包加载失败时的降级处理
- **本地存储**: 记住用户的语言偏好
- **默认语言**: 根据浏览器语言自动选择

## 使用示例

### 基础使用
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <div>
      <p>{t('common.welcome')}</p>
      <button onClick={() => setLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### 带参数翻译
```tsx
const message = t('messages.greeting', { name: 'John' });
// 输出: Hello, John!
```

### 复杂结构翻译
```tsx
const navigation = t('navigation');
// 返回整个导航对象的翻译
```

## 配置选项

### 语言配置
```tsx
const languageConfig = {
  defaultLanguage: 'zh',
  supportedLanguages: ['zh', 'en', 'ja'] as Language[],
  fallbackLanguage: 'en',
  autoDetectLanguage: true,
  localStorageKey: 'preferred-language',
};
```

### 加载配置
```tsx
const loadingConfig = {
  showLoadingIndicator: true,
  loadingTimeout: 5000,
  retryCount: 3,
  retryDelay: 1000,
};
```

## 测试要求

### 单元测试
- 翻译函数功能测试
- 语言切换测试
- 缓存机制测试
- 错误处理测试

### 集成测试
- 组件集成测试
- 路由切换测试
- 本地存储测试
- 主题切换测试

### 性能测试
- 语言包加载时间测试
- 内存使用测试
- 渲染性能测试
- 并发请求测试

## 维护说明

### 添加新语言
1. 创建新的语言包文件
2. 更新语言类型定义
3. 更新支持的语言列表
4. 测试新语言的完整性

### 更新翻译
1. 修改对应的语言包文件
2. 运行翻译验证脚本
3. 测试更新后的翻译
4. 更新相关文档

### 性能监控
- 监控语言包加载时间
- 跟踪内存使用情况
- 分析用户语言偏好
- 优化热门语言加载

## 相关文档

- [语言切换器](../ui/language-switcher.md)
- [响应式导航](../ui/responsive-navigation.md)
- [React Context 使用指南](../../architecture/react-context-guide.md)
- [性能优化最佳实践](../../architecture/performance-optimization.md)