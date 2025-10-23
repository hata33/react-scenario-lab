# 阶段二：并发特性深度展示

## 📋 概述

本阶段专注于 React 并发特性的深度应用，包括 useTransition、useDeferredValue、Suspense 等 React 18+ 的核心并发功能。通过实际场景展示这些特性如何提升用户体验和应用性能。

## 🎯 实施目标

### 主要目标
- [ ] useTransition 深度应用场景
- [ ] useDeferredValue 性能优化实践
- [ ] Suspense 高级用法展示
- [ ] 并发渲染模式对比

### 技术指标
- **性能提升**：对比非并发方案提升 40-60% 响应速度
- **用户体验**：减少 UI 卡顿和阻塞
- **代码质量**：100% TypeScript 类型覆盖
- **学习价值**：每个场景都有详细的性能对比

## 🚀 具体实施方案

### 1. useTransition 深度应用

#### 1.1 搜索过滤优化 (`/src/app/concurrent-features/use-transitions/search-optimization`)

**功能描述**：展示 useTransition 在大数据搜索场景下的性能优化

**核心实现**：
```typescript
import { useState, useTransition, useMemo } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
}

export default function OptimizedProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPending, startTransition] = useTransition();

  // 模拟大量产品数据
  const allProducts = useMemo(() => generateLargeProductSet(10000), []);

  // 使用 useTransition 包装非紧急的过滤操作
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // 类别过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    // 搜索过滤（这个操作会被优化）
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [allProducts, searchQuery, selectedCategory]);

  const handleSearchChange = (value: string) => {
    // 立即更新输入框状态
    setSearchQuery(value);

    // 使用 startTransition 包装过滤操作
    startTransition(() => {
      // 这个状态更新会被标记为非紧急
      // React 会延迟执行，避免阻塞输入
      // setFilteredProducts 会在下一次渲染中生效
    });
  };

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  return (
    <div className="product-search-container">
      {/* 搜索输入 - 响应式，不会被阻塞 */}
      <div className="search-input-section">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          isPending={isPending}
          placeholder="搜索产品名称、描述或标签..."
        />
      </div>

      {/* 类别过滤 */}
      <div className="category-filters">
        <CategoryFilter
          categories={['all', 'electronics', 'clothing', 'books', 'home']}
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* 产品列表 - 过渡期间显示加载状态 */}
      <div className={`products-grid ${isPending ? 'loading' : ''}`}>
        {isPending ? (
          <ProductGridSkeleton />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>

      {/* 结果统计 */}
      <div className="results-info">
        <p>
          找到 {filteredProducts.length} 个产品
          {isPending && <span className="pending-indicator"> (搜索中...)</span>}
        </p>
      </div>
    </div>
  );
}

// 搜索输入组件
function SearchInput({ value, onChange, isPending, placeholder }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`search-input ${isPending ? 'searching' : ''}`}
        style={{
          borderColor: isPending ? '#3b82f6' : '#d1d5db',
          transition: 'border-color 0.2s ease'
        }}
      />
      {isPending && (
        <div className="search-indicator">
          <SearchSpinner />
        </div>
      )}
    </div>
  );
}

// 骨架屏组件
function ProductGridSkeleton() {
  return (
    <div className="products-skeleton">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="product-skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-title" />
          <div className="skeleton-price" />
          <div className="skeleton-description" />
        </div>
      ))}
    </div>
  );
}
```

#### 1.2 数据表格分页 (`/src/app/concurrent-features/use-transitions/data-table-pagination`)

**功能描述**：展示 useTransition 在大数据表格分页中的优化效果

**实现示例**：
```typescript
import { useState, useTransition } from 'react';

interface DataRow {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
}

export default function PaginatedDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);
  const [filters, setFilters] = useState({
    status: 'all',
    searchTerm: ''
  });
  const [isPending, startTransition] = useTransition();

  // 模拟大量数据
  const [allData] = useState(() => generateLargeDataSet(50000));

  // 计算过滤后的数据
  const filteredData = useMemo(() => {
    let filtered = allData;

    if (filters.status !== 'all') {
      filtered = filtered.filter(row => row.status === filters.status);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(row =>
        row.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allData, filters]);

  // 计算当前页数据
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    startTransition(() => {
      setFilters(newFilters);
      setCurrentPage(1); // 重置到第一页
    });
  };

  return (
    <div className="data-table-container">
      {/* 过滤器 */}
      <TableFilters
        filters={filters}
        onChange={handleFilterChange}
        isPending={isPending}
      />

      {/* 表格 - 过渡期间显示加载状态 */}
      <div className="table-wrapper">
        {isPending ? (
          <TableSkeleton />
        ) : (
          <>
            <DataTable data={currentPageData} />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              disabled={isPending}
            />
          </>
        )}
      </div>

      {/* 统计信息 */}
      <TableStats
        total={allData.length}
        filtered={filteredData.length}
        showing={currentPageData.length}
        isPending={isPending}
      />
    </div>
  );
}

// 表格骨架屏
function TableSkeleton() {
  return (
    <div className="table-skeleton">
      <div className="skeleton-header">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-header-cell" />
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="skeleton-row">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="skeleton-cell" />
          ))}
        </div>
      ))}
    </div>
  );
}
```

### 2. useDeferredValue 性能优化

#### 2.1 大型表单优化 (`/src/app/concurrent-features/use-deferred-value/large-form`)

**功能描述**：展示 useDeferredValue 在大型复杂表单中的性能优化

**核心实现**：
```typescript
import { useState, useDeferredValue, useMemo } from 'react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'checkbox' | 'textarea';
  options?: string[];
  validation?: (value: string) => string | null;
}

export default function ComplexFormWithOptimization() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // 使用 useDeferredValue 延迟表单验证
  const deferredFormData = useDeferredValue(formData);

  // 复杂的验证逻辑
  const validationErrors = useMemo(() => {
    return validateForm(deferredFormData);
  }, [deferredFormData]);

  // 计算表单完成度
  const completionPercentage = useMemo(() => {
    const filledFields = Object.values(deferredFormData).filter(
      value => value.trim() !== ''
    ).length;
    return Math.round((filledFields / formFields.length) * 100);
  }, [deferredFormData]);

  // 实时搜索建议（延迟计算）
  const searchSuggestions = useMemo(() => {
    if (!deferredFormData.address || deferredFormData.address.length < 3) {
      return [];
    }
    return generateAddressSuggestions(deferredFormData.address);
  }, [deferredFormData.address]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    setTouchedFields(prev => new Set(prev).add(fieldId));
  };

  const isFormValid = Object.keys(validationErrors).length === 0;
  const hasUnsavedChanges = Object.keys(formData).length > 0;

  return (
    <div className="complex-form-container">
      <FormHeader
        completionPercentage={completionPercentage}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <form className="complex-form">
        {formFields.map((field) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            value={formData[field.id] || ''}
            error={touchedFields.has(field.id) ? validationErrors[field.id] : null}
            suggestions={field.id === 'address' ? searchSuggestions : []}
            onChange={(value) => handleFieldChange(field.id, value)}
            onBlur={() => setTouchedFields(prev => new Set(prev).add(field.id))}
          />
        ))}

        <FormActions
          isFormValid={isFormValid}
          hasErrors={Object.keys(validationErrors).length > 0}
          disabled={Object.keys(formData).length === 0}
        />
      </form>

      {/* 实时预览 - 使用延迟数据 */}
      <div className="form-preview">
        <h3>预览</h3>
        <FormPreview data={deferredFormData} />
      </div>
    </div>
  );
}

// 复杂的表单验证函数
function validateForm(data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  // 模拟复杂的验证逻辑
  for (const [fieldId, value] of Object.entries(data)) {
    const field = formFields.find(f => f.id === fieldId);

    if (field?.validation) {
      const error = field.validation(value);
      if (error) {
        errors[fieldId] = error;
      }
    }

    // 模拟耗时的验证操作
    if (fieldId === 'email' && value) {
      // 模拟异步邮箱验证
      if (value.includes('test')) {
        errors[fieldId] = '测试邮箱不允许使用';
      }
    }
  }

  return errors;
}

// 地址建议生成
function generateAddressSuggestions(query: string): string[] {
  // 模拟耗时的地址搜索
  const allAddresses = [
    '北京市朝阳区建国路88号',
    '北京市朝阳区三里屯路19号',
    '北京市海淀区中关村大街1号',
    '上海市浦东新区陆家嘴环路1000号',
    '上海市黄浦区南京东路100号',
  ];

  return allAddresses.filter(address =>
    address.includes(query)
  ).slice(0, 5);
}
```

#### 2.2 实时搜索建议 (`/src/app/concurrent-features/use-deferred-value/search-suggestions`)

**功能描述**：展示 useDeferredValue 在实时搜索建议中的应用

**实现示例**：
```typescript
import { useState, useDeferredValue, useMemo, useRef } from 'react';

export default function RealtimeSearchWithSuggestions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 延迟搜索查询，避免频繁计算建议
  const deferredQuery = useDeferredValue(searchQuery);

  // 计算搜索建议（使用延迟值）
  const suggestions = useMemo(() => {
    if (deferredQuery.length < 2) return [];
    return generateSearchSuggestions(deferredQuery);
  }, [deferredQuery]);

  // 高亮匹配的建议
  const highlightedSuggestions = useMemo(() => {
    return suggestions.map(suggestion => ({
      ...suggestion,
      highlightedText: highlightMatch(suggestion.text, deferredQuery)
    }));
  }, [suggestions, deferredQuery]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setIsDropdownOpen(value.length >= 2);
    setSelectedIndex(0);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || highlightedSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < highlightedSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : highlightedSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedSuggestions[selectedIndex]) {
          handleSuggestionClick(highlightedSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        break;
    }
  };

  return (
    <div className="search-suggestions-container">
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(searchQuery.length >= 2)}
          placeholder="搜索产品、品牌或分类..."
          className="search-input"
        />
        {searchQuery && (
          <ClearButton
            onClick={() => {
              setSearchQuery('');
              setIsDropdownOpen(false);
              inputRef.current?.focus();
            }}
          />
        )}
      </div>

      {/* 建议下拉列表 */}
      {isDropdownOpen && highlightedSuggestions.length > 0 && (
        <SuggestionsDropdown
          suggestions={highlightedSuggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSuggestionClick}
          onMouseEnter={setSelectedIndex}
        />
      )}

      {/* 搜索统计 */}
      {deferredQuery && (
        <div className="search-stats">
          <span>
            找到 {highlightedSuggestions.length} 个建议
            {searchQuery !== deferredQuery &&
              <span className="updating-indicator"> (更新中...)</span>
            }
          </span>
        </div>
      )}
    </div>
  );
}

// 建议生成函数（模拟耗时操作）
function generateSearchSuggestions(query: string): SearchSuggestion[] {
  // 模拟数据库查询
  const allSuggestions: SearchSuggestion[] = [
    { type: 'product', text: 'iPhone 15 Pro Max', category: 'Electronics' },
    { type: 'product', text: 'iPhone 15 Pro', category: 'Electronics' },
    { type: 'brand', text: 'Apple', category: 'Brand' },
    { type: 'category', text: 'Smartphones', category: 'Category' },
  ];

  return allSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase())
  );
}

// 高亮匹配文本
function highlightMatch(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
```

### 3. Suspense 高级用法

#### 3.1 列表模式 Suspense (`/src/app/concurrent-features/suspense/list-suspense`)

**功能描述**：展示 React 18 的 Suspense 列表模式，实现流式数据加载

**核心实现**：
```typescript
import { Suspense } from 'react';

// 数据资源类
class UserListResource {
  private users: User[] = [];
  private loading: boolean = false;
  private error: Error | null = null;
  private currentPage: number = 1;
  private pageSize: number = 20;

  constructor(private userId: string) {}

  async loadMore() {
    if (this.loading) return;

    this.loading = true;

    try {
      const newUsers = await fetchUsers(this.currentPage, this.pageSize);
      this.users = [...this.users, ...newUsers];
      this.currentPage++;
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.loading = false;
    }
  }

  get users() {
    return this.users;
  }

  get isLoading() {
    return this.loading;
  }

  get hasError() {
    return this.error !== null;
  }
}

// 用户列表组件
function UserList({ resource }: { resource: UserListResource }) {
  const users = resource.users;
  const isLoading = resource.isLoading;
  const hasError = resource.hasError;

  if (hasError) {
    throw resource.error;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      {isLoading && (
        <div className="loading-more">
          <LoadingSpinner />
          <span>加载更多用户...</span>
        </div>
      )}
    </div>
  );
}

// 主要组件
export default function InfiniteUserList() {
  const resource = useRef(new UserListResource('current'));

  useEffect(() => {
    // 初始加载
    resource.current.loadMore();
  }, []);

  const loadMore = () => {
    resource.current.loadMore();
  };

  return (
    <div className="infinite-list-container">
      <h2>无限用户列表</h2>

      {/* 列表模式的 Suspense */}
      <Suspense
        fallback={<UserListSkeleton />}
        fallback={<ListLoadingFallback />}
      >
        <UserList resource={resource.current} />
      </Suspense>

      {/* 加载更多按钮 */}
      <div className="load-more-section">
        <button
          onClick={loadMore}
          disabled={resource.current.isLoading}
          className="load-more-button"
        >
          {resource.current.isLoading ? '加载中...' : '加载更多'}
        </button>
      </div>
    </div>
  );
}

// 自定义 fallback 组件
function ListLoadingFallback() {
  return (
    <div className="list-loading-fallback">
      <div className="skeleton-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-user-card" />
        ))}
      </div>
    </div>
  );
}
```

#### 3.2 嵌套 Suspense (`/src/app/concurrent-features/suspense/nested-suspense`)

**功能描述**：展示嵌套 Suspense 的复杂应用场景

**实现示例**：
```typescript
import { Suspense } from 'react';

// 嵌套数据组件
function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId));

  return (
    <div className="user-profile">
      <header className="profile-header">
        <Avatar src={user.avatar} name={user.name} />
        <div className="user-info">
          <h1>{user.name}</h1>
          <p className="user-title">{user.title}</p>
        </div>
      </header>

      {/* 嵌套的 Suspense */}
      <section className="profile-content">
        <Suspense fallback={<BioSkeleton />}>
          <UserBio bio={user.bio} />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <UserActivity userId={userId} />
        </Suspense>

        <Suspense fallback={<ConnectionsSkeleton />}>
          <UserConnections userId={userId} />
        </Suspense>
      </section>
    </div>
  );
}

// 用户活动组件
function UserActivity({ userId }: { userId: string }) {
  const activities = use(fetchUserActivities(userId));
  const posts = use(fetchUserPosts(userId));

  return (
    <div className="user-activity">
      <h3>最近活动</h3>

      {/* 再次嵌套 Suspense */}
      <div className="activity-grid">
        <Suspense fallback={<RecentPostsSkeleton />}>
          <RecentPosts posts={posts} />
        </Suspense>

        <Suspense fallback={<RecentCommentsSkeleton />}>
          <RecentComments userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}

// 主页面组件
export default function UserProfilePage({ params }: { params: { userId: string } }) {
  return (
    <div className="profile-page">
      {/* 最外层的 Suspense */}
      <Suspense fallback={<ProfilePageSkeleton />}>
        <UserProfile userId={params.userId} />
      </Suspense>

      {/* 侧边栏 - 独立的 Suspense */}
      <aside className="profile-sidebar">
        <Suspense fallback={<SidebarSkeleton />}>
          <ProfileRecommendations userId={params.userId} />
        </Suspense>

        <Suspense fallback={<TrendingSkeleton />}>
          <TrendingTopics />
        </Suspense>
      </aside>
    </div>
  );
}

// 分离的加载状态组件
function ProfilePageSkeleton() {
  return (
    <div className="profile-page-skeleton">
      <div className="profile-header-skeleton">
        <div className="avatar-skeleton" />
        <div className="user-info-skeleton">
          <div className="name-skeleton" />
          <div className="title-skeleton" />
        </div>
      </div>

      <div className="profile-content-skeleton">
        <div className="bio-skeleton" />
        <div className="activity-skeleton" />
        <div className="connections-skeleton" />
      </div>
    </div>
  );
}
```

## 📋 检查清单

### useTransition 应用
- [ ] 搜索过滤优化页面
- [ ] 数据表格分页演示
- [ ] 图片画廊优化
- [ ] 实时数据更新场景

### useDeferredValue 优化
- [ ] 大型表单性能优化
- [ ] 实时搜索建议
- [ ] 数据可视化延迟渲染
- [ ] 复杂计算结果缓存

### Suspense 高级用法
- [ ] 列表模式 Suspense
- [ ] 嵌套 Suspense 结构
- [ ] 错误边界集成
- [ ] 流式 SSR 演示

### 性能优化场景
- [ ] 大型数据集处理
- [ ] 复杂 UI 交互
- [ ] 实时协作功能
- [ ] 移动端性能优化

## ⏱️ 时间安排

### 第1周：useTransition 深度应用
- **2天**：搜索过滤优化实现
- **2天**：数据表格和分页优化
- **1天**：性能对比和文档

### 第2周：useDeferredValue 优化
- **2天**：大型表单优化实现
- **2天**：实时搜索和建议功能
- **1天**：性能测试和优化

### 第3周：Suspense 高级用法
- **2天**：列表模式和其他 Suspense
- **2天**：嵌套 Suspense 结构
- **1天**：集成测试和文档完善

## 📈 预期成果

### 性能指标
- **响应速度提升**：相比非并发方案提升 40-60%
- **用户体验改善**：减少 UI 卡顿和阻塞
- **内存使用优化**：降低不必要的重渲染
- **移动端优化**：提升低端设备体验

### 学习价值
- **并发模式理解**：深入掌握 React 并发特性
- **最佳实践**：生产环境的性能优化策略
- **性能对比**：实际场景的性能测试数据
- **问题解决**：常见性能问题的解决方案

## 🔧 技术要求

### 开发依赖
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "@types/react": "^19.1.1",
  "scheduler": "^0.23.0"
}
```

### 开发工具
- **React DevTools Profiler**：性能监控
- **Chrome Performance**：浏览器性能分析
- **Lighthouse**：性能评分测试

### 测试环境
- **Chrome DevTools**：性能测试
- **Firefox Developer Tools**：兼容性测试
- **移动设备测试**：低端设备体验验证

## 📚 参考资料

- [React 18 并发特性官方文档](https://react.dev/blog/2022/03/29/react-v18)
- [useTransition 完整指南](https://react.dev/reference/react/useTransition)
- [useDeferredValue 使用说明](https://react.dev/reference/react/useDeferredValue)
- [Suspense 最佳实践](https://react.dev/reference/react/Suspense)

---

**下一步**：完成并发特性展示后，进入现代状态管理对比阶段，进一步完善项目的技术深度。