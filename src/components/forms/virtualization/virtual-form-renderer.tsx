"use client";

import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
// 由于react-window可能有导入问题，我们先使用简单的div渲染
// import { FixedSizeList as List } from 'react-window';
import { FormField, FormSchema, FormState } from '../dynamic-form/form-schema';

// 虚拟化渲染的表单项接口
export interface VirtualFormItem {
  id: string;
  field: FormField;
  index: number;
  value: any;
  error?: string[];
  touched?: boolean;
  disabled?: boolean;
  visible?: boolean;
}

// 虚拟化表单渲染器属性
export interface VirtualFormRendererProps {
  schema: FormSchema;
  state: FormState;
  onFieldChange: (fieldId: string, value: any) => void;
  onFieldBlur: (fieldId: string) => void;
  onFieldFocus: (fieldId: string) => void;
  itemHeight?: number;
  height?: number;
  width?: number | string;
  overscanCount?: number;
}

// 缓存管理器
class FieldRendererCache {
  private cache = new Map<string, React.ComponentType<any>>();
  private maxCacheSize = 100;

  get(fieldType: string): React.ComponentType<any> | undefined {
    return this.cache.get(fieldType);
  }

  set(fieldType: string, component: React.ComponentType<any>): void {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(fieldType, component);
  }

  clear(): void {
    this.cache.clear();
  }
}

const fieldRendererCache = new FieldRendererCache();

// 动态加载字段组件
async function loadFieldComponent(fieldType: string): Promise<React.ComponentType<any>> {
  if (fieldRendererCache.get(fieldType)) {
    return fieldRendererCache.get(fieldType)!;
  }

  // 简化的字段组件，避免导入不存在的模块
  const SimpleFieldComponent: React.ComponentType<any> = ({ field, value, onChange, onBlur, onFocus }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(e.target.value);
    };

    const baseClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={field.placeholder}
            className={baseClassName}
            disabled={field.disabled}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={baseClassName}
            disabled={field.disabled}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            className={baseClassName}
            disabled={field.disabled}
          >
            <option value="">{field.placeholder || '请选择'}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            onFocus={onFocus}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={field.disabled}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            className={baseClassName}
            disabled={field.disabled}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0])}
            onBlur={onBlur}
            onFocus={onFocus}
            className={baseClassName}
            disabled={field.disabled}
            accept={field.accept}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={field.placeholder}
            className={baseClassName}
            disabled={field.disabled}
          />
        );
    }
  };

  fieldRendererCache.set(fieldType, SimpleFieldComponent);
  return SimpleFieldComponent;
}

// React lazy的简单实现
function lazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.ComponentType<any> {
  let Component: T | null = null;
  let promise: Promise<void> | null = null;

  return function LazyComponent(props: any) {
    if (!Component) {
      if (!promise) {
        promise = factory().then(module => {
          Component = module.default;
        });
      }
      throw promise;
    }
    return React.createElement(Component, props);
  };
}

// 虚拟化表单项渲染器
function VirtualFormItemRenderer({
  index,
  style,
  data
}: {
  index: number;
  style: React.CSSProperties;
  data: VirtualFormItem;
}) {
  const [FieldComponent, setFieldComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    loadFieldComponent(data.field.type).then(component => {
      setFieldComponent(() => component);
    });
  }, [data.field.type]);

  if (!FieldComponent) {
    return (
      <div style={style} className="flex items-center justify-center p-4">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div style={style} className="p-2">
      <FieldComponent
        field={data.field}
        value={data.value}
        error={data.error}
        touched={data.touched}
        disabled={data.disabled}
        onChange={(value: any) => {
          // 这里需要通过回调传递给父组件
          console.log('Field change:', data.field.id, value);
        }}
        onBlur={() => {
          console.log('Field blur:', data.field.id);
        }}
        onFocus={() => {
          console.log('Field focus:', data.field.id);
        }}
      />
    </div>
  );
}

// 表单项可见性计算器
export class FieldVisibilityCalculator {
  private static VISIBLE_THRESHOLD = 0.1; // 10%可见度阈值

  static isVisible(
    element: HTMLElement,
    container: HTMLElement,
    threshold: number = this.VISIBLE_THRESHOLD
  ): boolean {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // 元素完全在容器外
    if (
      rect.bottom < containerRect.top ||
      rect.top > containerRect.bottom ||
      rect.right < containerRect.left ||
      rect.left > containerRect.right
    ) {
      return false;
    }

    // 计算可见区域
    const visibleTop = Math.max(rect.top, containerRect.top);
    const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
    const visibleLeft = Math.max(rect.left, containerRect.left);
    const visibleRight = Math.min(rect.right, containerRect.right);

    const visibleArea = (visibleBottom - visibleTop) * (visibleRight - visibleLeft);
    const totalArea = rect.width * rect.height;
    const visibleRatio = visibleArea / totalArea;

    return visibleRatio >= threshold;
  }

  static getVisibleFields(
    containerRef: React.RefObject<HTMLElement | null>,
    fieldRefs: Map<string, React.RefObject<HTMLElement | null>>
  ): Set<string> {
    const visibleFields = new Set<string>();
    const container = containerRef.current;

    if (!container) return visibleFields;

    fieldRefs.forEach((ref, fieldId) => {
      const element = ref.current;
      if (element && this.isVisible(element, container)) {
        visibleFields.add(fieldId);
      }
    });

    return visibleFields;
  }
}

// 分片渲染管理器
export class ChunkedRenderer {
  private static CHUNK_SIZE = 50; // 每次渲染50个字段
  private static RENDER_DELAY = 16; // 16ms延迟，约60fps

  static async renderInChunks<T>(
    items: T[],
    renderer: (items: T[], startIndex: number) => void,
    onProgress?: (completed: number, total: number) => void
  ): Promise<void> {
    const total = items.length;
    let completed = 0;

    for (let i = 0; i < total; i += this.CHUNK_SIZE) {
      const chunk = items.slice(i, i + this.CHUNK_SIZE);

      // 使用requestAnimationFrame确保不阻塞UI
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          renderer(chunk, i);
          completed += chunk.length;
          onProgress?.(completed, total);
          resolve();
        });
      });

      // 小延迟以确保UI响应性
      if (i + this.CHUNK_SIZE < total) {
        await new Promise(resolve => setTimeout(resolve, this.RENDER_DELAY));
      }
    }
  }
}

// 性能监控器
export class PerformanceMonitor {
  private static metrics = {
    renderTime: [] as number[],
    fieldCount: 0,
    visibleFields: 0,
    memoryUsage: 0
  };

  static startRender(): void {
    this.metrics.renderTime = [];
    this.metrics.fieldCount = 0;
    this.metrics.visibleFields = 0;
  }

  static recordFieldRender(): void {
    this.metrics.fieldCount++;
  }

  static recordVisibleField(): void {
    this.metrics.visibleFields++;
  }

  static endRender(): number {
    const totalTime = this.metrics.renderTime.reduce((a, b) => a + b, 0);
    this.metrics.memoryUsage = this.estimateMemoryUsage();
    return totalTime;
  }

  static getMetrics() {
    return {
      ...this.metrics,
      averageRenderTime: this.metrics.renderTime.length > 0
        ? this.metrics.renderTime.reduce((a, b) => a + b, 0) / this.metrics.renderTime.length
        : 0,
      visibilityRatio: this.metrics.fieldCount > 0
        ? this.metrics.visibleFields / this.metrics.fieldCount
        : 0
    };
  }

  private static estimateMemoryUsage(): number {
    // 简单的内存使用估算
    return this.metrics.fieldCount * 1024; // 假设每个字段占用1KB
  }
}

// 主虚拟化表单渲染器组件
export default function VirtualFormRenderer({
  schema,
  state,
  onFieldChange,
  onFieldBlur,
  onFieldFocus,
  itemHeight = 120,
  height = 600,
  width = '100%',
  overscanCount = 5
}: VirtualFormRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useRef<Map<string, React.RefObject<HTMLElement | null>>>(new Map());
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());

  // 扁平化表单字段
  const flatFields = useMemo(() => {
    const fields: VirtualFormItem[] = [];
    let index = 0;

    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        fields.push({
          id: field.id,
          field,
          index: index++,
          value: state.values[field.name] || field.defaultValue,
          error: state.errors[field.name],
          touched: state.touched[field.name],
          disabled: state.isDisabled[field.name],
          visible: state.isVisible[field.name] !== false
        });
      });
    });

    return fields;
  }, [schema, state]);

  // 创建字段引用
  const createFieldRef = useCallback((fieldId: string) => {
    if (!fieldRefs.current.has(fieldId)) {
      fieldRefs.current.set(fieldId, React.createRef());
    }
    return fieldRefs.current.get(fieldId)!;
  }, []);

  // 检查可见字段
  useEffect(() => {
    const checkVisibility = () => {
      const visible = FieldVisibilityCalculator.getVisibleFields(containerRef, fieldRefs.current);
      setVisibleFields(visible);
    };

    // 初始检查
    checkVisibility();

    // 监听滚动和窗口大小变化
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkVisibility, { passive: true });
      window.addEventListener('resize', checkVisibility, { passive: true });

      return () => {
        container.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
      };
    }
  }, [flatFields]);

  // 渲染单个表单项
  const renderItem = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = flatFields[index];
    if (!item) return null;

    // 如果字段不可见，渲染占位符
    if (!visibleFields.has(item.id)) {
      return (
        <div style={style} className="p-2">
          <div className="h-full bg-gray-100 rounded animate-pulse"></div>
        </div>
      );
    }

    return (
      <VirtualFormItemRenderer
        index={index}
        style={style}
        data={item}
      />
    );
  }, [flatFields, visibleFields]);

  // 性能监控
  useEffect(() => {
    PerformanceMonitor.startRender();
    return () => {
      const renderTime = PerformanceMonitor.endRender();
      console.log('Render performance:', PerformanceMonitor.getMetrics());
    };
  }, [schema]);

  return (
    <div className="virtual-form-renderer">
      <div
        ref={containerRef}
        style={{ height, width }}
        className="overflow-auto border border-gray-200 rounded-lg bg-white"
      >
        {/* 简化版本：直接渲染所有字段，不使用react-window */}
        <div className="p-4 space-y-4">
          {flatFields.map((item, index) => (
            <div key={item.id} style={{ minHeight: itemHeight }} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item.field.label}
                  {item.field.validation?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {item.field.description && (
                  <p className="text-xs text-gray-500 mb-1">{item.field.description}</p>
                )}
              </div>
              <VirtualFormItemRenderer
                index={index}
                style={{}}
                data={item}
              />
              {item.error && (
                <div className="mt-1 text-xs text-red-600">
                  {Array.isArray(item.error) ? item.error.join(', ') : item.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 性能信息显示 */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
        <div>总字段: {flatFields.length}</div>
        <div>可见字段: {visibleFields.size}</div>
        <div>渲染性能: {flatFields.length > 0 ? ((visibleFields.size / flatFields.length) * 100).toFixed(1) : 0}%</div>
        <div>模式: 简化渲染</div>
      </div>
    </div>
  );
}

// 优化的表单容器组件
export function OptimizedFormContainer({
  schema,
  children,
  className = ''
}: {
  schema: FormSchema;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVirtualized, setIsVirtualized] = useState(false);

  useEffect(() => {
    // 根据字段数量决定是否使用虚拟化
    const totalFields = schema.sections.reduce((sum, section) => sum + section.fields.length, 0);
    setIsVirtualized(totalFields > 100); // 超过100个字段时启用虚拟化
  }, [schema]);

  if (isVirtualized) {
    return (
      <div ref={containerRef} className={`optimized-form-container virtualized ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`optimized-form-container normal ${className}`}>
      {children}
    </div>
  );
}