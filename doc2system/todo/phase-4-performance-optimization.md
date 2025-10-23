# 阶段四：性能优化深化

## 📋 概述

本阶段专注于前端性能优化的深度实践，包括高级虚拟化、Bundle 分析优化、渲染性能优化等方面。通过实际的性能测试和优化方案，提供生产环境可用的性能优化策略。

## 🎯 实施目标

### 主要目标
- [ ] 高级虚拟化场景实现
- [ ] Bundle 分析和代码分割
- [ ] 渲染性能优化实践
- [ ] 加载性能优化策略

### 技术指标
- **性能提升**：相比基准方案提升 50-70%
- **包体积优化**：减少 30-40% 的 Bundle 大小
- **加载速度**：首屏加载时间减少 40-60%
- **用户体验**：Core Web Vitals 全部指标达标

## 🚀 具体实施方案

### 1. 高级虚拟化场景

#### 1.1 虚拟表单 (`/src/app/performance/advanced-virtualization/virtual-forms`)

**功能描述**：展示大型动态表单的虚拟化优化，解决表单性能瓶颈

**核心实现**：
```typescript
import { useCallback, useRef, useMemo, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
  validation?: (value: any) => string | null;
  group?: string;
}

interface FormData {
  [key: string]: any;
}

export default function VirtualForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [activeGroup, setActiveGroup] = useState('basic');

  // 大量表单字段（模拟复杂表单）
  const [formFields] = useState(() => generateLargeFormFields(1000));

  // 按组分类字段
  const fieldGroups = useMemo(() => {
    const groups = formFields.reduce((acc, field) => {
      const groupName = field.group || 'other';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(field);
      return acc;
    }, {} as Record<string, FormField[]>);

    return Object.entries(groups).map(([name, fields]) => ({
      name,
      fields: fields.sort((a, b) => a.id.localeCompare(b.id))
    }));
  }, [formFields]);

  // 当前组的字段
  const currentFields = useMemo(() => {
    return fieldGroups.find(group => group.name === activeGroup)?.fields || [];
  }, [fieldGroups, activeGroup]);

  // 虚拟化列表项组件
  const VirtualFieldItem = useCallback(({ index, style, data }) => {
    const field = data[index];

    return (
      <div style={style} className="virtual-form-field">
        <VirtualFormField
          field={field}
          value={formData[field.id] || ''}
          error={touchedFields.has(field.id) ? errors[field.id] : null}
          onChange={(value) => handleFieldChange(field.id, value)}
          onBlur={() => handleFieldBlur(field.id)}
        />
      </div>
    );
  }, [formData, errors, touchedFields]);

  // 字段变化处理
  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));

    // 实时验证
    const field = formFields.find(f => f.id === fieldId);
    if (field?.validation) {
      const error = field.validation(value);
      setErrors(prev => ({ ...prev, [fieldId]: error }));
    }
  }, [formFields]);

  // 字段失焦处理
  const handleFieldBlur = useCallback((fieldId: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldId));
  }, []);

  // 表单提交
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段
    const newErrors: Record<string, string> = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} 是必填项`;
      } else if (field.validation && formData[field.id]) {
        const error = field.validation(formData[field.id]);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    if (Object.keys(newErrors).length === 0) {
      // 提交表单
      await submitForm(formData);
    } else {
      setErrors(newErrors);
      setTouchedFields(new Set(Object.keys(newErrors)));
    }
  }, [formData, formFields]);

  // 表单进度计算
  const completionPercentage = useMemo(() => {
    const requiredFields = formFields.filter(field => field.required);
    const filledRequiredFields = requiredFields.filter(field => {
      const value = formData[field.id];
      return value && value.toString().trim() !== '';
    });

    return Math.round((filledRequiredFields.length / requiredFields.length) * 100);
  }, [formData, formFields]);

  return (
    <div className="virtual-form-container">
      <div className="form-header">
        <h2>大型虚拟化表单</h2>
        <div className="form-progress">
          <div
            className="progress-bar"
            style={{ width: `${completionPercentage}%` }}
          />
          <span className="progress-text">{completionPercentage}% 完成</span>
        </div>
      </div>

      <div className="form-layout">
        {/* 组选择器 */}
        <div className="group-selector">
          <h3>表单分组</h3>
          {fieldGroups.map(group => (
            <button
              key={group.name}
              className={`group-button ${activeGroup === group.name ? 'active' : ''}`}
              onClick={() => setActiveGroup(group.name)}
            >
              {group.name} ({group.fields.length})
            </button>
          ))}
        </div>

        {/* 虚拟化表单字段 */}
        <div className="form-content">
          <div className="current-group-info">
            <h3>{activeGroup}</h3>
            <p>共 {currentFields.length} 个字段</p>
          </div>

          <form onSubmit={handleSubmit}>
            <List
              height={600}
              itemCount={currentFields.length}
              itemSize={120}
              itemData={currentFields}
              children={VirtualFieldItem}
              overscanCount={5}
            />

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                提交表单
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={() => {
                  setFormData({});
                  setErrors({});
                  setTouchedFields(new Set());
                }}
              >
                重置
              </button>
            </div>
          </form>
        </div>

        {/* 实时预览 */}
        <div className="form-preview">
          <h3>表单数据预览</h3>
          <div className="preview-content">
            {Object.entries(formData).length === 0 ? (
              <p className="empty-preview">请填写表单字段</p>
            ) : (
              <VirtualizedDataPreview data={formData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 虚拟化表单字段组件
function VirtualFormField({ field, value, error, onChange, onBlur }: {
  field: FormField;
  value: any;
  error: string | null;
  onChange: (value: any) => void;
  onBlur: () => void;
}) {
  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={field.placeholder}
            className={`form-input ${error ? 'error' : ''}`}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={field.placeholder}
            className={`form-textarea ${error ? 'error' : ''}`}
            rows={3}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`form-select ${error ? 'error' : ''}`}
          >
            <option value="">请选择...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              className="form-checkbox"
            />
            <span>{field.label}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map(option => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`form-input ${error ? 'error' : ''}`}
          />
        );
    }
  };

  return (
    <div className={`form-field ${field.type}-field`}>
      {field.type !== 'checkbox' && field.type !== 'radio' && (
        <label className="form-label">
          {field.label}
          {field.required && <span className="required">*</span>}
        </label>
      )}
      {renderField()}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// 虚拟化数据预览组件
function VirtualizedDataPreview({ data }: { data: Record<string, any> }) {
  const entries = useMemo(() => Object.entries(data), [data]);

  const PreviewItem = useCallback(({ index, style }) => {
    const [key, value] = entries[index];
    return (
      <div style={style} className="preview-item">
        <span className="preview-key">{key}:</span>
        <span className="preview-value">{JSON.stringify(value)}</span>
      </div>
    );
  }, [entries]);

  return (
    <List
      height={400}
      itemCount={entries.length}
      itemSize={30}
      children={PreviewItem}
      overscanCount={10}
    />
  );
}
```

#### 1.2 虚拟网格 (`/src/app/performance/advanced-virtualization/virtual-grids`)

**功能描述**：展示大型数据网格的虚拟化渲染和优化

**实现示例**：
```typescript
import { useMemo, useCallback, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { FixedSizeList as List } from 'react-window';

interface GridItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  description: string;
}

export default function VirtualDataGrid() {
  const [items] = useState(() => generateLargeDataSet(10000));
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 排序和过滤逻辑
  const processedItems = useMemo(() => {
    let filtered = items;

    // 过滤
    if (filter) {
      filtered = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase()) ||
        item.description.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // 排序
    return [...filtered].sort((a, b) => {
      let aValue = a[sortBy as keyof GridItem];
      let bValue = b[sortBy as keyof GridItem];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, filter, sortBy, sortOrder]);

  // 网格配置
  const GRID_CONFIG = {
    columnCount: 4,
    columnWidth: 280,
    rowHeight: 320,
    rowHeightList: 80,
  };

  // 网格单元组件
  const GridCell = useCallback(({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * GRID_CONFIG.columnCount + columnIndex;
    const item = processedItems[itemIndex];

    if (!item) {
      return <div style={style} />;
    }

    return (
      <div style={style} className="grid-cell">
        <VirtualGridItem
          item={item}
          isSelected={selectedItems.has(item.id)}
          onSelect={(selected) => {
            setSelectedItems(prev => {
              const newSet = new Set(prev);
              if (selected) {
                newSet.add(item.id);
              } else {
                newSet.delete(item.id);
              }
              return newSet;
            });
          }}
        />
      </div>
    );
  }, [processedItems, selectedItems]);

  // 列表项组件
  const ListItem = useCallback(({ index, style }) => {
    const item = processedItems[index];

    return (
      <div style={style} className="list-item">
        <VirtualListItem
          item={item}
          isSelected={selectedItems.has(item.id)}
          onSelect={(selected) => {
            setSelectedItems(prev => {
              const newSet = new Set(prev);
              if (selected) {
                newSet.add(item.id);
              } else {
                newSet.delete(item.id);
              }
              return newSet;
            });
          }}
        />
      </div>
    );
  }, [processedItems, selectedItems]);

  // 计算网格尺寸
  const gridHeight = useMemo(() => {
    const rowCount = Math.ceil(processedItems.length / GRID_CONFIG.columnCount);
    return rowCount * GRID_CONFIG.rowHeight;
  }, [processedItems.length]);

  const listHeight = processedItems.length * GRID_CONFIG.rowHeightList;

  return (
    <div className="virtual-grid-container">
      <div className="grid-header">
        <h2>大型虚拟化数据网格</h2>

        {/* 控制面板 */}
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="搜索商品..."
              className="search-input"
            />
          </div>

          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">名称</option>
              <option value="category">分类</option>
              <option value="price">价格</option>
              <option value="rating">评分</option>
              <option value="stock">库存</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              网格视图
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              列表视图
            </button>
          </div>

          <div className="selection-info">
            已选择 {selectedItems.size} 项
            {selectedItems.size > 0 && (
              <button
                onClick={() => setSelectedItems(new Set())}
                className="clear-selection"
              >
                清除选择
              </button>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="stats">
          <span>总计: {items.length} 项</span>
          <span>过滤后: {processedItems.length} 项</span>
          <span>视图模式: {viewMode === 'grid' ? '网格' : '列表'}</span>
        </div>
      </div>

      {/* 虚拟化内容 */}
      <div className="grid-content">
        {viewMode === 'grid' ? (
          <Grid
            columnCount={GRID_CONFIG.columnCount}
            columnWidth={GRID_CONFIG.columnWidth}
            height={600}
            rowHeight={GRID_CONFIG.rowHeight}
            rowCount={Math.ceil(processedItems.length / GRID_CONFIG.columnCount)}
            width={GRID_CONFIG.columnCount * GRID_CONFIG.columnWidth + 20}
            children={GridCell}
            overscanRowCount={2}
            overscanColumnCount={2}
          />
        ) : (
          <List
            height={600}
            itemCount={processedItems.length}
            itemSize={GRID_CONFIG.rowHeightList}
            width={GRID_CONFIG.columnCount * GRID_CONFIG.columnWidth + 20}
            children={ListItem}
            overscanCount={10}
          />
        )}
      </div>

      {/* 批量操作面板 */}
      {selectedItems.size > 0 && (
        <div className="batch-actions">
          <h3>批量操作 ({selectedItems.size} 项)</h3>
          <div className="batch-buttons">
            <button
              onClick={() => {
                console.log('批量删除:', Array.from(selectedItems));
                setSelectedItems(new Set());
              }}
            >
              删除选中项
            </button>
            <button
              onClick={() => {
                console.log('批量导出:', Array.from(selectedItems));
              }}
            >
              导出选中项
            </button>
            <button
              onClick={() => {
                // 模拟批量更新
                setSelectedItems(new Set());
              }}
            >
              批量更新
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 虚拟化网格项组件
function VirtualGridItem({ item, isSelected, onSelect }: {
  item: GridItem;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}) {
  return (
    <div
      className={`grid-item-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(!isSelected)}
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        {isSelected && <div className="selection-indicator">✓</div>}
      </div>
      <div className="item-info">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-category">{item.category}</p>
        <div className="item-meta">
          <span className="price">¥{item.price}</span>
          <span className="rating">★{item.rating}</span>
          <span className={`stock ${item.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {item.stock > 0 ? `库存:${item.stock}` : '缺货'}
          </span>
        </div>
      </div>
    </div>
  );
}

// 虚拟化列表项组件
function VirtualListItem({ item, isSelected, onSelect }: {
  item: GridItem;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}) {
  return (
    <div
      className={`list-item-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(!isSelected)}
    >
      <div className="list-item-image">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="list-item-content">
        <div className="item-header">
          <h4>{item.name}</h4>
          <span className="price">¥{item.price}</span>
        </div>
        <div className="item-details">
          <span className="category">{item.category}</span>
          <span className="rating">★{item.rating}</span>
          <span className={`stock ${item.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {item.stock > 0 ? `库存:${item.stock}` : '缺货'}
          </span>
        </div>
        <p className="description">{item.description}</p>
      </div>
      {isSelected && <div className="selection-indicator">✓</div>}
    </div>
  );
}
```

### 2. Bundle 分析和优化

#### 2.1 Webpack Bundle 分析 (`/src/app/performance/bundle-optimization/webpack-bundle-analyzer`)

**功能描述**：集成 Bundle 分析工具，展示项目打包详情和优化建议

**实现示例**：
```typescript
import { useEffect, useState } from 'react';
import { gzipSizeSync } from 'gzip-size';

interface BundleInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: BundleModule[];
  chunks: string[];
}

interface BundleModule {
  name: string;
  size: number;
  path: string;
  dependencies: string[];
  type: 'static' | 'dynamic';
}

export default function BundleAnalyzer() {
  const [bundles, setBundles] = useState<BundleInfo[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<BundleInfo | null>(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // 模拟 Bundle 分析
    analyzeBundles();
  }, []);

  const analyzeBundles = async () => {
    // 这里应该调用实际的 Bundle 分析 API
    const mockBundles: BundleInfo[] = [
      {
        name: 'main.js',
        size: 1024 * 150, // 150KB
        gzippedSize: 1024 * 45, // 45KB
        modules: generateMockModules(80),
        chunks: ['main', 'vendor']
      },
      {
        name: 'vendor.js',
        size: 1024 * 300, // 300KB
        gzippedSize: 1024 * 90, // 90KB
        modules: generateMockModules(200),
        chunks: ['vendor']
      },
      {
        name: 'admin.js',
        size: 1024 * 80, // 80KB
        gzippedSize: 1024 * 25, // 25KB
        modules: generateMockModules(40),
        chunks: ['admin', 'vendor']
      }
    ];

    setBundles(mockBundles);

    // 生成优化建议
    const suggestions = generateOptimizationSuggestions(mockBundles);
    setOptimizationSuggestions(suggestions);
  };

  const generateMockModules = (count: number): BundleModule[] => {
    return Array.from({ length: count }, (_, index) => ({
      name: `module-${index}.js`,
      size: Math.floor(Math.random() * 10000) + 1000,
      path: `/src/modules/module-${index}.js`,
      dependencies: Array.from({ length: Math.floor(Math.random() * 5) }, () => `dep-${Math.random()}`),
      type: Math.random() > 0.5 ? 'static' : 'dynamic' as const
    }));
  };

  const generateOptimizationSuggestions = (bundles: BundleInfo[]): string[] => {
    const suggestions = [];

    bundles.forEach(bundle => {
      // 检查 Bundle 大小
      if (bundle.gzippedSize > 100 * 1024) { // > 100KB
        suggestions.push(`${bundle.name} 过大 (${(bundle.gzippedSize / 1024).toFixed(1)}KB)，建议进行代码分割`);
      }

      // 检查模块重复
      const duplicateModules = findDuplicateModules(bundle.modules);
      if (duplicateModules.length > 0) {
        suggestions.push(`${bundle.name} 中发现重复模块: ${duplicateModules.join(', ')}`);
      }

      // 检查依赖优化
      const largeDependencies = bundle.modules
        .filter(module => module.dependencies.length > 5)
        .map(module => module.name);

      if (largeDependencies.length > 0) {
        suggestions.push(`${bundle.name} 中某些模块依赖过多: ${largeDependencies.slice(0, 3).join(', ')}`);
      }
    });

    // 通用建议
    suggestions.push(
      '考虑使用动态导入 (import()) 来分割大型模块',
      '启用 Tree Shaking 来移除未使用的代码',
      '使用 externals 配置来处理大型第三方库'
    );

    return suggestions;
  };

  const findDuplicateModules = (modules: BundleModule[]): string[] => {
    const nameCounts = modules.reduce((acc, module) => {
      acc[module.name] = (acc[module.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(nameCounts)
      .filter(([, count]) => count > 1)
      .map(([name]) => name);
  };

  return (
    <div className="bundle-analyzer-container">
      <div className="analyzer-header">
        <h2>Bundle 分析器</h2>
        <button onClick={analyzeBundles} className="analyze-btn">
          重新分析
        </button>
      </div>

      {/* Bundle 总览 */}
      <div className="bundles-overview">
        <h3>Bundle 概览</h3>
        <div className="bundle-list">
          {bundles.map(bundle => (
            <div
              key={bundle.name}
              className={`bundle-card ${selectedBundle?.name === bundle.name ? 'selected' : ''}`}
              onClick={() => setSelectedBundle(bundle)}
            >
              <div className="bundle-info">
                <h4>{bundle.name}</h4>
                <div className="size-info">
                  <span>原始: {(bundle.size / 1024).toFixed(1)}KB</span>
                  <span>压缩: {(bundle.gzippedSize / 1024).toFixed(1)}KB</span>
                  <span>压缩比: {((1 - bundle.gzippedSize / bundle.size) * 100).toFixed(1)}%</span>
                </div>
                <div className="module-count">
                  {bundle.modules.length} 个模块
                </div>
              </div>
              <div className="bundle-visual">
                <BundleVisual bundle={bundle} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详细分析 */}
      {selectedBundle && (
        <div className="bundle-details">
          <h3>{selectedBundle.name} 详细分析</h3>

          {/* 模块分析 */}
          <div className="modules-analysis">
            <h4>模块分析</h4>
            <div className="modules-grid">
              {selectedBundle.modules.slice(0, 20).map(module => (
                <div key={module.name} className="module-card">
                  <div className="module-header">
                    <span className="module-name">{module.name}</span>
                    <span className={`module-type ${module.type}`}>
                      {module.type === 'dynamic' ? '动态' : '静态'}
                    </span>
                  </div>
                  <div className="module-size">
                    {(module.size / 1024).toFixed(1)}KB
                  </div>
                  <div className="module-deps">
                    {module.dependencies.length} 依赖
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 依赖图 */}
          <div className="dependency-graph">
            <h4>依赖关系</h4>
            <DependencyGraph modules={selectedBundle.modules} />
          </div>

          {/* Chunks 信息 */}
          <div className="chunks-info">
            <h4>Chunks 分片</h4>
            <div className="chunks-list">
              {selectedBundle.chunks.map(chunk => (
                <div key={chunk} className="chunk-item">
                  <span className="chunk-name">{chunk}</span>
                  <span className="chunk-type">runtime chunk</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 优化建议 */}
      <div className="optimization-suggestions">
        <h3>优化建议</h3>
        <div className="suggestions-list">
          {optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <span className="suggestion-icon">💡</span>
              <span className="suggestion-text">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Bundle 可视化组件
function BundleVisual({ bundle }: { bundle: BundleInfo }) {
  const totalSize = bundle.size;
  const largeModules = bundle.modules
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  const otherSize = bundle.modules
    .slice(10)
    .reduce((sum, module) => sum + module.size, 0);

  return (
    <div className="bundle-visual">
      <div className="pie-chart">
        {largeModules.map((module, index) => {
          const percentage = (module.size / totalSize) * 100;
          const color = `hsl(${index * 30}, 70%, 50%)`;

          return (
            <div
              key={module.name}
              className="pie-segment"
              style={{
                background: color,
                width: `${percentage}%`,
                height: '20px',
                borderRadius: '2px'
              }}
              title={`${module.name}: ${(module.size / 1024).toFixed(1)}KB`}
            />
          );
        })}
      </div>

      <div className="module-list">
        {largeModules.slice(0, 5).map((module, index) => {
          const percentage = (module.size / totalSize) * 100;
          const color = `hsl(${index * 30}, 70%, 50%)`;

          return (
            <div key={module.name} className="module-item">
              <div
                className="module-color"
                style={{ backgroundColor: color }}
              />
              <span className="module-name">{module.name}</span>
              <span className="module-percentage">{percentage.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 依赖关系图组件
function DependencyGraph({ modules }: { modules: BundleModule[] }) {
  return (
    <div className="dependency-graph-visual">
      <div className="graph-container">
        {modules.slice(0, 15).map((module, index) => (
          <div
            key={module.name}
            className="graph-node"
            style={{
              left: `${(index % 5) * 150}px`,
              top: `${Math.floor(index / 5) * 100}px`
            }}
          >
            <div className="node-label">{module.name}</div>
            {module.dependencies.slice(0, 2).map((dep, depIndex) => (
              <div
                key={dep}
                className="dependency-line"
                style={{
                  width: `${50 + Math.random() * 100}px`,
                  transform: `rotate(${Math.random() * 60 - 30}deg)`
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 2.2 动态导入优化 (`/src/app/performance/bundle-optimization/dynamic-imports`)

**功能描述**：展示动态导入和代码分割的最佳实践

**实现示例**：
```typescript
import { useState, Suspense, lazy } from 'react';

// 动态导入大型组件
const HeavyChart = lazy(() => import(
  /* webpackChunkName: "heavy-chart" */ '@/components/HeavyChart'
));

const DataGrid = lazy(() => import(
  /* webpackChunkName: "data-grid" */ '@/components/DataGrid'
));

const RichTextEditor = lazy(() => import(
  /* webpackChunkName: "rich-text-editor" */ '@/components/RichTextEditor'
));

const AdvancedFilters = lazy(() => import(
  /* webpackChunkName: "advanced-filters" */ '@/components/AdvancedFilters'
));

// 带预加载的动态导入
const preLoadableComponents = {
  pdfViewer: () => import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "pdf-viewer" */ '@/components/PdfViewer'
  ),
  videoPlayer: () => import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "video-player" */ '@/components/VideoPlayer'
  ),
  imageEditor: () => import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "image-editor" */ '@/components/ImageEditor'
  )
};

export default function DynamicImportExample() {
  const [activeComponent, setActiveComponent] = useState<string>('');
  const [loadTimes, setLoadTimes] = useState<Record<string, number>>({});

  // 组件加载性能监控
  const loadComponent = async (componentName: string) => {
    const startTime = performance.now();

    try {
      let Component;

      switch (componentName) {
        case 'chart':
          Component = await import('@/components/HeavyChart');
          break;
        case 'grid':
          Component = await import('@/components/DataGrid');
          break;
        case 'editor':
          Component = await import('@/components/RichTextEditor');
          break;
        case 'filters':
          Component = await import('@/components/AdvancedFilters');
          break;
        default:
          return;
      }

      const loadTime = performance.now() - startTime;
      setLoadTimes(prev => ({ ...prev, [componentName]: loadTime }));
      setActiveComponent(componentName);
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
    }
  };

  // 预加载策略
  const preloadComponent = (componentName: string) => {
    switch (componentName) {
      case 'pdf':
        preLoadableComponents.pdfViewer();
        break;
      case 'video':
        preLoadableComponents.videoPlayer();
        break;
      case 'image':
        preLoadableComponents.imageEditor();
        break;
    }
  };

  // 基于用户行为的预测性加载
  const handleUserInteraction = (action: string) => {
    switch (action) {
      case 'hover-chart':
        // 用户悬停在图表相关按钮上，预加载图表组件
        setTimeout(() => preloadComponent('chart'), 100);
        break;
      case 'hover-editor':
        setTimeout(() => preloadComponent('editor'), 100);
        break;
      case 'scroll-to-bottom':
        // 用户滚动到底部，预加载更多内容
        preloadComponent('grid');
        break;
    }
  };

  // 渲染活动组件
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'chart':
        return (
          <Suspense fallback={<ComponentSkeleton name="图表" />}>
            <HeavyChart />
          </Suspense>
        );
      case 'grid':
        return (
          <Suspense fallback={<ComponentSkeleton name="数据网格" />}>
            <DataGrid />
          </Suspense>
        );
      case 'editor':
        return (
          <Suspense fallback={<ComponentSkeleton name="富文本编辑器" />}>
            <RichTextEditor />
          </Suspense>
        );
      case 'filters':
        return (
          <Suspense fallback={<ComponentSkeleton name="高级过滤器" />}>
            <AdvancedFilters />
          </Suspense>
        );
      default:
        return <div className="component-placeholder">请选择一个组件</div>;
    }
  };

  return (
    <div className="dynamic-import-container">
      <div className="import-header">
        <h2>动态导入和代码分割</h2>
        <p>展示动态导入的最佳实践，减少初始包体积</p>
      </div>

      {/* 组件选择器 */}
      <div className="component-selector">
        <h3>选择要加载的组件</h3>
        <div className="component-buttons">
          <button
            className="component-btn"
            onClick={() => loadComponent('chart')}
            onMouseEnter={() => handleUserInteraction('hover-chart')}
            disabled={activeComponent === 'chart'}
          >
            📊 加载图表组件
          </button>

          <button
            className="component-btn"
            onClick={() => loadComponent('grid')}
            disabled={activeComponent === 'grid'}
          >
            📋 加载数据网格
          </button>

          <button
            className="component-btn"
            onClick={() => loadComponent('editor')}
            onMouseEnter={() => handleUserInteraction('hover-editor')}
            disabled={activeComponent === 'editor'}
          >
            ✏️ 加载富文本编辑器
          </button>

          <button
            className="component-btn"
            onClick={() => loadComponent('filters')}
            disabled={activeComponent === 'filters'}
          >
            🔍 加载高级过滤器
          </button>
        </div>
      </div>

      {/* 预加载控制 */}
      <div className="preload-controls">
        <h3>预加载策略</h3>
        <div className="preload-buttons">
          <button onClick={() => preloadComponent('pdf')}>
            📄 预加载 PDF 查看器
          </button>
          <button onClick={() => preloadComponent('video')}>
            🎥 预加载视频播放器
          </button>
          <button onClick={() => preloadComponent('image')}>
            🖼️ 预加载图片编辑器
          </button>
        </div>
      </div>

      {/* 组件加载区域 */}
      <div className="component-container">
        <h3>组件展示区</h3>
        <div className="component-wrapper">
          {renderActiveComponent()}
        </div>
      </div>

      {/* 性能统计 */}
      <div className="performance-stats">
        <h3>加载性能统计</h3>
        <div className="stats-grid">
          {Object.entries(loadTimes).map(([component, time]) => (
            <div key={component} className="stat-item">
              <span className="component-name">{component}</span>
              <span className="load-time">{time.toFixed(0)}ms</span>
              <div className="performance-bar">
                <div
                  className="performance-fill"
                  style={{ width: `${Math.min(time / 10, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {Object.keys(loadTimes).length === 0 && (
          <div className="no-stats">
            <p>尚未加载任何组件</p>
            <p>点击上方按钮开始测试</p>
          </div>
        )}
      </div>

      {/* Bundle 信息 */}
      <div className="bundle-info">
        <h3>Bundle 分割信息</h3>
        <div className="bundle-list">
          <div className="bundle-item">
            <span className="bundle-name">main.js</span>
            <span className="bundle-size">~150KB (gzipped)</span>
            <span className="bundle-desc">核心应用代码</span>
          </div>
          <div className="bundle-item">
            <span className="bundle-name">heavy-chart.js</span>
            <span className="bundle-size">~80KB (gzipped)</span>
            <span className="bundle-desc">动态加载的图表组件</span>
          </div>
          <div className="bundle-item">
            <span className="bundle-name">data-grid.js</span>
            <span className="bundle-size">~60KB (gzipped)</span>
            <span className="bundle-desc">动态加载的数据网格</span>
          </div>
          <div className="bundle-item">
            <span className="bundle-name">rich-text-editor.js</span>
            <span className="bundle-size">~120KB (gzipped)</span>
            <span className="bundle-desc">动态加载的富文本编辑器</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 组件骨架屏
function ComponentSkeleton({ name }: { name: string }) {
  return (
    <div className="component-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title">正在加载 {name}...</div>
        <div className="skeleton-spinner" />
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
}
```

## 📋 检查清单

### 高级虚拟化
- [ ] 虚拟表单组件
- [ ] 虚拟网格实现
- [ ] 图片瀑布流虚拟化
- [ ] 嵌套列表虚拟化

### Bundle 优化
- [ ] Bundle 分析工具集成
- [ ] 动态导入优化
- [ ] 代码分割策略
- [ ] Tree Shaking 优化

### 渲染性能
- [ ] React 渲染优化
- [ ] CSS 性能提升
- [ ] DOM 操作优化
- [ ] 布局稳定性改善

### 加载性能
- [ ] 懒加载策略
- [ ] 预加载优化
- [ ] 缓存策略
- [ ] 资源优化

## ⏱️ 时间安排

### 第1周：高级虚拟化
- **2天**：虚拟表单实现
- **2天**：虚拟网格和瀑布流
- **1天**：性能测试和对比

### 第2周：Bundle 优化
- **2天**：Bundle 分析工具
- **2天**：动态导入和代码分割
- **1天**：优化策略实施

### 第3周：渲染和加载优化
- **2天**：渲染性能优化
- **2天**：加载性能优化
- **1天**：综合测试和文档

## 📈 预期成果

### 性能指标
- **包体积减少**：30-40% 的 Bundle 大小优化
- **加载速度提升**：40-60% 的首屏加载时间减少
- **渲染性能提升**：50-70% 的交互响应速度提升
- **内存使用优化**：20-30% 的内存占用减少

### 技术成果
- **虚拟化组件库**：可复用的高性能组件
- **优化工具链**：自动化的性能优化工具
- **最佳实践文档**：生产环境的优化指南
- **性能监控系统**：实时性能指标跟踪

## 🔧 技术要求

### 核心依赖
```json
{
  "react-window": "^1.8.8",
  "react-window-infinite-loader": "^1.0.9",
  "gzip-size": "^7.0.0",
  "webpack-bundle-analyzer": "^4.10.1",
  "@module-federation/webpack": "^0.6.5"
}
```

### 工具配置
- **Webpack 配置**：代码分割和优化配置
- **性能监控**：Core Web Vitals 集成
- **Bundle 分析**：自动化分析流程
- **缓存策略**：智能缓存配置

## 📚 参考资料

- [React Window 官方文档](https://react-window.vercel.app/)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Next.js 性能优化](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**下一步**：完成性能优化深化后，整个项目的现代化程度将达到企业级标准，成为前端开发和性能优化的完整参考项目。