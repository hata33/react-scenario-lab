# Intersection Observer 动画系统

## 概述

Intersection Observer 动画系统是一个基于浏览器 Intersection Observer API 的滚动触发动画解决方案，提供高性能的元素进入视口动画效果。

## 系统架构

### 核心组件
- **Intersection Observer**: 监听元素进入视口
- **Animation Controller**: 控制动画播放逻辑
- **Animation Registry**: 注册和管理动画元素
- **Performance Monitor**: 性能监控和优化

### 数据流
```
元素注册 → 创建观察器 → 监听视口变化 → 触发动画 → 清理资源
```

## 技术实现

### 观察器配置
```tsx
interface IntersectionObserverConfig {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const defaultConfig: IntersectionObserverConfig = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.1, 0.5, 1],
  once: true,
};
```

### 动画类型
```tsx
type AnimationType =
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'bounceIn';

interface AnimationOptions {
  type: AnimationType;
  duration?: number;
  delay?: number;
  easing?: string;
  distance?: string;
  scale?: number;
}
```

### 核心 Hook
```tsx
const useIntersectionAnimation = (
  elementRef: RefObject<Element>,
  options: AnimationOptions
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!options.once || !hasAnimated)) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!entry.isIntersecting && !options.once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.once, hasAnimated]);

  return isVisible;
};
```

## 动画效果

### 淡入动画
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

### 滑动动画
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### 缩放动画
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.6s ease-out forwards;
}
```

## 使用示例

### 基础使用
```tsx
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionAnimation(ref, {
    type: 'fadeIn',
    duration: 800,
    delay: 200,
  });

  return (
    <div
      ref={ref}
      className={`animated-element ${isVisible ? 'fade-in' : ''}`}
    >
      <h2>Animated Content</h2>
      <p>This content will animate when it comes into view</p>
    </div>
  );
}
```

### 高级使用
```tsx
const advancedOptions = {
  type: 'slideUp' as AnimationType,
  duration: 1000,
  delay: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  distance: '50px',
  once: true,
};

const isVisible = useIntersectionAnimation(ref, advancedOptions);
```

### 批量动画
```tsx
function AnimatedList() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    content: `Item ${i + 1}`,
  }));

  return (
    <div className="animated-list">
      {items.map((item, index) => {
        const ref = useRef<HTMLDivElement>(null);
        const isVisible = useIntersectionAnimation(ref, {
          type: 'fadeIn',
          delay: index * 100, // 错开动画时间
        });

        return (
          <div
            key={item.id}
            ref={ref}
            className={`list-item ${isVisible ? 'fade-in' : ''}`}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
```

## 性能优化

### 观察器优化
- **单个观察器**: 全局共享一个观察器实例
- **批处理**: 批量处理多个元素的观察
- **懒加载**: 动态创建和销毁观察器
- **内存管理**: 及时清理不用的观察器

### 动画优化
- **硬件加速**: 使用 transform 和 opacity 进行动画
- **will-change**: 预告浏览器属性变化
- **减少重排**: 避免影响布局的属性变化
- **动画合并**: 合并多个动画属性

### 渲染优化
- **虚拟列表**: 大量元素时使用虚拟滚动
- **视口裁剪**: 只渲染视口内的元素
- **优先级管理**: 重要元素优先渲染
- **渐进式加载**: 分批加载动画元素

## 配置选项

### 全局配置
```tsx
const globalAnimationConfig = {
  defaultDuration: 800,
  defaultEasing: 'ease-out',
  defaultDistance: '30px',
  rootMargin: '50px',
  threshold: 0.1,
  once: true,
  disabled: false, // 用于禁用动画（测试或低性能设备）
};
```

### 设备适配
```tsx
const deviceAdaptiveConfig = {
  mobile: {
    duration: 600,
    distance: '20px',
    threshold: 0.05,
  },
  tablet: {
    duration: 700,
    distance: '25px',
    threshold: 0.08,
  },
  desktop: {
    duration: 800,
    distance: '30px',
    threshold: 0.1,
  },
};
```

## 测试要求

### 功能测试
- 动画触发时机测试
- 动画效果准确性测试
- 性能指标测试
- 兼容性测试

### 性能测试
- FPS 监控
- 内存使用测试
- 渲染时间测试
- 滚动性能测试

### 集成测试
- 与路由系统集成测试
- 与主题系统集成测试
- 与其他动画库兼容性测试
- 无障碍访问测试

## 维护说明

### 添加新动画
1. 定义动画类型和参数
2. 创建对应的 CSS 动画
3. 更新动画配置
4. 测试新动画效果

### 性能监控
- 监控动画性能指标
- 跟踪用户交互数据
- 分析设备兼容性
- 优化动画参数

### 兼容性维护
- 测试不同浏览器兼容性
- 处理旧版本浏览器降级
- 更新 API 变更适配
- 维护 Polyfill 支持

## 相关文档

- [React 性能优化指南](../react-performance-guide.md)
- [CSS 动画最佳实践](../css-animation-best-practices.md)
- [无障碍访问指南](../accessibility-guide.md)
- [浏览器兼容性参考](../browser-compatibility.md)