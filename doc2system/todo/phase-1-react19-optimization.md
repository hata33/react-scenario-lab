# React 19 全版本新特性实施方案

## React 19 全版本特性概览

| **特性/功能** | **所属版本** | **核心描述** | **关键点/解决的问题** |
| :--- | :--- | :--- | :--- |
| **React Compiler** | React 19 | 自动优化组件重新渲染。 | 自动管理`useMemo`, `useCallback`等，减少手动优化，提升性能。 |
| **Actions** | React 19 | 简化异步数据变更（如表单提交）的管理。 | 集成**Pending状态**、**错误处理**；支持与`'use server'`指令结合，创建**Server Actions**。 |
| **Hooks (useActionState, useOptimistic, useFormStatus, useTransition)** | React 19 | 一系列辅助Actions和状态管理的新Hook。
 | `useActionState`: 处理Action结果与状态；`useOptimistic`: 实现**乐观更新**；`useFormStatus`: 提供表单提交状态信息；`useTransition`: 处理**并发渲染**和非紧急状态更新。 |
| **use Hook** | React 19 | 在条件语句和循环中读取Context或Promise资源。 | 更灵活地消费Context，直接在渲染中处理Promise。 |
| **服务端组件 (RSC)** | React 19 | 在服务端渲染组件，减小客户端打包体积。 | 稳定功能，提升**首屏加载速度**和**SEO**；通过`'use client'`和`'use server'`指令区分环境。 |
| **文档元数据标签** | React 19 | 在组件树中直接使用`<title>`, `<meta>`等标签。 | 简化动态SEO管理，标签会自动提升到`<head>`中。 |
| **ref作为属性** | React 19 | `ref`可作为普通属性传递，无需`forwardRef`。 | 简化需要引用子组件DOM元素的代码。 |
| **资源预加载API** | React 19 | 提供`preload`等API控制关键资源加载。 | 提升应用性能，优化关键资源加载时机。 |
| **Owner Stack** | React 19.1 | 新的调试功能，帮助定位渲染源组件。 | 增强开发体验，使调试过程更精准。 |
| **Suspense增强** | React 19.1 | 统一并优化了Suspense在客户端、服务端和混合渲染阶段的行为。 | 提升异步渲染的稳定性和性能。 |
| **Activity API / `<Activity>`组件** | React 19.2 | 精细管理组件在可见与隐藏状态下的行为。 | **保留组件状态**，避免重复渲染和副作用执行，提升复杂交互体验。 |
| **useEffectEvent** | React 19.2 | 将"事件型逻辑"从Effect中解耦。 | 解决**useEffect闭包陷阱**，避免不必要的Effect重新执行。 |
| **缓存信号 (Cache Signals)** | React 19.2 | 新的缓存机制，通过信号驱动缓存更新。 | 优化数据缓存策略，提升高负载下的响应效率和内存利用率。 |

## 🚀 具体实施方案

### 1. React 19 基础新特性实现

#### 1.1 Actions 与相关 Hooks (`/src/app/react-19/actions`)

**功能描述**：展示 React 19 Actions 生态系统，包括 useActionState、useOptimistic、useFormStatus、useTransition 等 Hook

**核心实现**：
```typescript
// hooks/useActionState-demo.tsx
'use client';

import { useActionState } from 'react';

async function submitAction(prevState: any, formData: FormData) {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 1000));

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return { error: '请填写所有字段' };
  }

  return { success: true, message: `欢迎 ${name}！` };
}

export default function UseActionStateDemo() {
  const [state, formAction, isPending] = useActionState(submitAction, null);

  return (
    <form action={formAction}>
      <div>
        <label>姓名</label>
        <input name="name" type="text" disabled={isPending} />
      </div>

      <div>
        <label>邮箱</label>
        <input name="email" type="email" disabled={isPending} />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>

      {state?.error && <div className="error">{state.error}</div>}
      {state?.success && <div className="success">{state.message}</div>}
    </form>
  );
}

// hooks/useOptimistic-demo.tsx
'use client';

import { useOptimistic, useState } from 'react';

export default function UseOptimisticDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React 19', completed: false }
  ]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, id: Date.now(), pending: true }]
  );

  const addTodo = async (formData: FormData) => {
    const text = formData.get('todo') as string;

    // 乐观更新
    addOptimisticTodo({ text, completed: false });

    // 实际异步操作
    await new Promise(resolve => setTimeout(resolve, 1500));

    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div>
      <form action={addTodo}>
        <input name="todo" placeholder="添加新任务" />
        <button type="submit">添加</button>
      </form>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} className={todo.pending ? 'pending' : ''}>
            {todo.text}
            {todo.pending && ' (添加中...)'}
          </li>
        ))}
      </ul>
    </div>
  );
}

// hooks/useFormStatus-demo.tsx
'use client';

import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交表单'}
    </button>
  );
}

export default function UseFormStatusDemo() {
  return (
    <form>
      <input name="message" placeholder="输入消息" />
      <SubmitButton />
    </form>
  );
}

// hooks/useTransition-demo.tsx
'use client';

import { useTransition, useState } from 'react';

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);

  // 模拟大量数据处理的异步函数
  const processLargeDataset = async (searchTerm: string) => {
    // 模拟耗时操作
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 生成大量数据并筛选
    const allData = Array.from({ length: 10000 }, (_, i) => `项目 ${i}: ${searchTerm}`);
    return allData.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (value: string) => {
    setInput(value);

    // 使用 startTransition 包装非紧急的状态更新
    startTransition(async () => {
      const results = await processLargeDataset(value);
      setList(results);
    });
  };

  return (
    <div>
      <h3>useTransition 并发渲染演示</h3>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索大量数据..."
          style={{
            borderColor: isPending ? '#3b82f6' : '#d1d5db',
            transition: 'border-color 0.2s'
          }}
        />
        {isPending && <span className="loading-indicator">处理中...</span>}
      </div>

      <div className="results" style={{ opacity: isPending ? 0.6 : 1 }}>
        <p>找到 {list.length} 个结果</p>
        <div className="result-list" style={{ maxHeight: '300px', overflow: 'auto' }}>
          {list.slice(0, 20).map((item, index) => (
            <div key={index} className="result-item">
              {item}
            </div>
          ))}
          {list.length > 20 && <p>... 还有 {list.length - 20} 个结果</p>}
        </div>
      </div>

      <div className="explanation">
        <h4>useTransition 的优势：</h4>
        <ul>
          <li>输入响应性：搜索输入立即响应，不会被阻塞</li>
          <li>并发渲染：数据处理在后台进行，不阻塞UI</li>
          <li>用户体验：通过 isPending 状态提供视觉反馈</li>
          <li>性能优化：避免长时间阻塞主线程</li>
        </ul>
      </div>
    </div>
  );
}
```

#### 1.2 use() Hook 完整应用 (`/src/app/react-19/use-hook`)

**功能描述**：深入展示 use() Hook 在不同场景下的应用

**多场景实现**：
```typescript
// use/async-context-demo.tsx
'use client';

import { createContext, use, useState } from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');
const UserContext = createContext<{ name: string; role: string } | null>(null);

// 异步 Context 提供者
async function loadUserData() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: '张三', role: 'developer' };
}

export default function AsyncContextDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userPromise, setUserPromise] = useState<Promise<{ name: string; role: string } | null>>(null);

  const loadUser = () => {
    setUserPromise(loadUserData());
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题
        </button>
        <button onClick={loadUser}>加载用户</button>

        {userPromise && (
          <UserContext.Provider value={use(userPromise)}>
            <UserProfile />
          </UserContext.Provider>
        )}

        <ThemeConsumer />
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeConsumer() {
  const theme = use(ThemeContext);
  const user = use(UserContext);

  return (
    <div className={`theme-${theme}`}>
      <p>当前主题: {theme}</p>
      {user && <p>用户: {user.name} ({user.role})</p>}
    </div>
  );
}

function UserProfile() {
  const user = use(UserContext);
  return <div>用户资料: {user?.name}</div>;
}

// use/promise-race-demo.tsx
'use client';

import { use, useState, Suspense } from 'react';

function racePromises<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.race(promises);
}

export default function PromiseRaceDemo() {
  const [dataPromise, setDataPromise] = useState<Promise<string> | null>(null);

  const startRace = () => {
    const fastPromise = new Promise<string>(resolve =>
      setTimeout(() => resolve('快速数据源'), 1000)
    );
    const slowPromise = new Promise<string>(resolve =>
      setTimeout(() => resolve('慢速数据源'), 3000)
    );

    setDataPromise(racePromises([fastPromise, slowPromise]));
  };

  return (
    <div>
      <button onClick={startRace}>开始 Promise 竞速</button>

      {dataPromise && (
        <Suspense fallback={<div>等待数据...</div>}>
          <DataConsumer promise={dataPromise} />
        </Suspense>
      )}
    </div>
  );
}

function DataConsumer({ promise }: { promise: Promise<string> }) {
  const data = use(promise);
  return <div>获取到的数据: {data}</div>;
}
```

#### 1.3 服务端组件 (RSC) 实现 (`/src/app/react-19/server-components`)

**功能描述**：展示服务端组件和客户端组件的混合使用

**服务端组件实现**：
```typescript
// server-components/user-profile-server.tsx
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';

async function getUser(id: string) {
  try {
    const result = await sql`
      SELECT id, name, email, bio, avatar_url
      FROM users
      WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      notFound();
    }

    return result.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to load user profile');
  }
}

async function getUserPosts(userId: string) {
  try {
    const result = await sql`
      SELECT id, title, excerpt, created_at
      FROM posts
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 10
    `;

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch user posts:', error);
    return [];
  }
}

export default async function UserProfileServer({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const posts = await getUserPosts(params.id);

  return (
    <div className="user-profile">
      <div className="user-header">
        <img
          src={user.avatar_url || '/default-avatar.png'}
          alt={user.name}
          className="avatar"
        />
        <div>
          <h1>{user.name}</h1>
          <p className="email">{user.email}</p>
        </div>
      </div>

      <div className="user-bio">
        <h2>个人简介</h2>
        <p>{user.bio || '这个人很懒，什么都没有留下...'}</p>
      </div>

      <div className="user-posts">
        <h2>最近文章 ({posts.length})</h2>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <time>{new Date(post.created_at).toLocaleDateString()}</time>
              </article>
            ))}
          </div>
        ) : (
          <p>还没有发表任何文章</p>
        )}
      </div>

      <div className="client-only-section">
        {/* 客户端交互组件 */}
        <UserProfileInteraction userId={params.id} />
      </div>
    </div>
  );
}

// 客户端交互组件
'use client';

import { useState } from 'react';
import { followUser, unfollowUser } from '@/actions/user-actions';

function UserProfileInteraction({ userId }: { userId: string }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleFollowToggle = async () => {
    setIsPending(true);

    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setFollowerCount(prev => prev - 1);
      } else {
        await followUser(userId);
        setFollowerCount(prev => prev + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('操作失败:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="user-interactions">
      <button
        onClick={handleFollowToggle}
        disabled={isPending}
        className={`follow-button ${isFollowing ? 'following' : ''}`}
      >
        {isPending ? '处理中...' : isFollowing ? '已关注' : '关注'}
      </button>

      <div className="stats">
        <span>关注者: {followerCount}</span>
      </div>
    </div>
  );
}
```

#### 1.4 文档元数据标签 (`/src/app/react-19/metadata`)

**功能描述**：展示 React 19 的文档元数据标签功能

**元数据标签实现**：
```typescript
// metadata/product-page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // 从数据库获取产品信息
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      url: `https://example.com/products/${product.id}`,
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <html>
      <head>
        {/* React 19 允许直接在组件中使用元数据标签 */}
        <title>动态产品页面</title>
        <meta name="description" content="这是动态生成的产品描述" />
        <meta property="og:title" content="Open Graph 标题" />
        <meta property="og:description" content="Open Graph 描述" />
        <meta property="og:image" content="/product-image.jpg" />
      </head>
      <body>
        <div>
          <h1>产品详情页面</h1>
          <p>这是产品 {params.id} 的详细信息</p>
        </div>
      </body>
    </html>
  );
}

// metadata/blog-post.tsx
export default function BlogPostPage() {
  const postData = {
    title: 'React 19 新特性详解',
    author: '前端开发者',
    publishDate: '2024-01-15',
    tags: ['React', 'JavaScript', '前端开发'],
    excerpt: '深入了解 React 19 带来的革命性新特性...'
  };

  return (
    <article>
      {/* 动态元数据标签 */}
      <title>{postData.title} - 我的博客</title>
      <meta name="description" content={postData.excerpt} />
      <meta name="author" content={postData.author} />
      <meta name="keywords" content={postData.tags.join(', ')} />
      <meta property="article:published_time" content={postData.publishDate} />
      <meta property="article:author" content={postData.author} />
      <meta property="article:tag" content={postData.tags.join(', ')} />

      <header>
        <h1>{postData.title}</h1>
        <div className="post-meta">
          <span>作者: {postData.author}</span>
          <span>发布时间: {postData.publishDate}</span>
          <div className="tags">
            {postData.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <section>
        <p>{postData.excerpt}</p>
        {/* 文章内容 */}
      </section>
    </article>
  );
}
```

#### 1.5 ref 作为属性 (`/src/app/react-19/ref-as-prop`)

**功能描述**：展示 React 19 中 ref 作为普通属性的使用方式

**ref 属性实现**：
```typescript
// ref-as-prop/simplified-ref-passing.tsx
'use client';

// 传统方式 - 需要 forwardRef
const TraditionalInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    return <input ref={ref} placeholder={placeholder} className="traditional-input" />;
  }
);

// React 19 新方式 - ref 作为普通属性
const ModernInput = ({ placeholder, ref }: {
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}) => {
  return <input ref={ref} placeholder={placeholder} className="modern-input" />;
};

export default function RefAsPropDemo() {
  const traditionalInputRef = useRef<HTMLInputElement>(null);
  const modernInputRef = useRef<HTMLInputElement>(null);

  const focusTraditionalInput = () => {
    traditionalInputRef.current?.focus();
  };

  const focusModernInput = () => {
    modernInputRef.current?.focus();
  };

  return (
    <div>
      <h2>ref 作为属性演示</h2>

      <div className="comparison">
        <div>
          <h3>传统方式 (需要 forwardRef)</h3>
          <TraditionalInput
            ref={traditionalInputRef}
            placeholder="传统输入框"
          />
          <button onClick={focusTraditionalInput}>聚焦传统输入框</button>
        </div>

        <div>
          <h3>React 19 新方式 (ref 作为属性)</h3>
          <ModernInput
            ref={modernInputRef}
            placeholder="现代输入框"
          />
          <button onClick={focusModernInput}>聚焦现代输入框</button>
        </div>
      </div>

      <div className="explanation">
        <h4>React 19 ref 属性的优势：</h4>
        <ul>
          <li>简化组件定义：无需使用 forwardRef</li>
          <li>更直观的 API：ref 和其他 props 一样传递</li>
          <li>更好的 TypeScript 支持：类型推断更准确</li>
          <li>减少样板代码：组件定义更简洁</li>
        </ul>
      </div>
    </div>
  );
}

// ref-as-prop/complex-component-ref.tsx
'use client';

// 复杂组件中的 ref 使用
function FormField({
  label,
  type = 'text',
  ref,
  error,
  ...props
}: {
  label: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
  error?: string;
  [key: string]: any;
}) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        ref={ref}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// 可编辑文本区域组件
function EditableText({
  value,
  onChange,
  ref
}: {
  value: string;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLTextAreaElement>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="editable-text editing">
        <textarea
          ref={ref}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
        />
        <div className="actions">
          <button onClick={handleSave}>保存</button>
          <button onClick={handleCancel}>取消</button>
        </div>
      </div>
    );
  }

  return (
    <div className="editable-text">
      <p>{value}</p>
      <button onClick={() => setIsEditing(true)}>编辑</button>
    </div>
  );
}

export default function ComplexRefDemo() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;

    console.log('提交的数据:', { username, email });
  };

  const focusFirstError = () => {
    if (!usernameRef.current?.value) {
      usernameRef.current?.focus();
    } else if (!emailRef.current?.validity.valid) {
      emailRef.current?.focus();
    }
  };

  return (
    <div>
      <h2>复杂组件中的 ref 使用</h2>

      <form action={handleSubmit}>
        <FormField
          label="用户名"
          name="username"
          required
          ref={usernameRef}
        />

        <FormField
          label="邮箱"
          name="email"
          type="email"
          required
          ref={emailRef}
        />

        <div className="form-field">
          <label>个人简介</label>
          <EditableText
            value="这是我的个人简介..."
            onChange={(value) => console.log('简介更新:', value)}
            ref={bioRef}
          />
        </div>

        <div className="form-actions">
          <button type="submit">提交</button>
          <button type="button" onClick={focusFirstError}>
            聚焦第一个错误字段
          </button>
        </div>
      </form>
    </div>
  );
}
```

#### 1.6 资源预加载 API (`/src/app/react-19/resource-preload`)

**功能描述**：展示 React 19 的资源预加载 API

**资源预加载实现**：
```typescript
// resource-preload/preload-demo.tsx
'use client';

import { preload } from 'react';

// 预加载图片资源
function preloadImages() {
  preload('/images/hero-bg.jpg', {
    as: 'image',
    priority: 'high'
  });

  preload('/images/product-1.jpg', {
    as: 'image',
    priority: 'medium'
  });

  preload('/images/logo.svg', {
    as: 'image',
    priority: 'low'
  });
}

// 预加载字体资源
function preloadFonts() {
  preload('/fonts/inter-bold.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  });

  preload('/fonts/inter-regular.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  });
}

// 预加载脚本资源
function preloadScripts() {
  preload('/scripts/analytics.js', {
    as: 'script',
    priority: 'low'
  });

  preload('/scripts/payment-handler.js', {
    as: 'script',
    priority: 'high'
  });
}

export default function ResourcePreloadDemo() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handlePreloadResources = () => {
    preloadImages();
    preloadFonts();
    preloadScripts();
    setIsPreloaded(true);
  };

  return (
    <div>
      <h2>资源预加载 API 演示</h2>

      <div className="preload-controls">
        <button onClick={handlePreloadResources} disabled={isPreloaded}>
          {isPreloaded ? '资源已预加载' : '预加载关键资源'}
        </button>
      </div>

      {isPreloaded && (
        <div className="preloaded-content">
          <h3>预加载的资源内容</h3>

          <div className="image-gallery">
            <h4>图片资源</h4>
            <img src="/images/hero-bg.jpg" alt="Hero Background" />
            <img src="/images/product-1.jpg" alt="Product 1" />
            <img src="/images/logo.svg" alt="Logo" />
          </div>

          <div className="text-content" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h4>字体资源</h4>
            <p style={{ fontWeight: 'bold' }}>这是粗体文本</p>
            <p>这是常规文本</p>
          </div>

          <div className="script-loaded">
            <h4>脚本资源</h4>
            <p>分析脚本和支付处理器脚本已被预加载</p>
          </div>
        </div>
      )}

      <div className="explanation">
        <h4>资源预加载的优势：</h4>
        <ul>
          <li>性能优化：提前加载关键资源，减少延迟</li>
          <li>用户体验：页面交互更加流畅</li>
          <li>智能优先级：根据重要性调整加载顺序</li>
          <li>资源类型支持：支持图片、字体、脚本等多种资源</li>
        </ul>
      </div>
    </div>
  );
}

// resource-preload/dynamic-preload.tsx
'use client';

// 动态组件预加载
function preloadComponents() {
  // 预加载懒加载的组件
  preload('./components/heavy-chart', () =>
    import('@/components/heavy-chart')
  );

  preload('./components/admin-panel', () =>
    import('@/components/admin-panel')
  );
}

// 智能预加载策略
function useSmartPreload() {
  const [userIntent, setUserIntent] = useState<string | null>(null);

  useEffect(() => {
    // 根据用户行为预加载相关资源
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // 检测用户是否接近某个区域
      if (clientX < 200 && clientY < 200) {
        // 用户可能在寻找导航菜单
        preload('/api/navigation', { as: 'fetch' });
      }

      if (clientY > window.innerHeight - 100) {
        // 用户可能准备滚动到底部
        preload('/api/more-content', { as: 'fetch' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { userIntent, setUserIntent };
}

export default function DynamicPreloadDemo() {
  const { userIntent } = useSmartPreload();
  const [showChart, setShowChart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleShowChart = () => {
    preload('./components/heavy-chart', () =>
      import('@/components/heavy-chart')
    );
    setShowChart(true);
  };

  const handleShowAdmin = () => {
    preload('./components/admin-panel', () =>
      import('@/components/admin-panel')
    );
    setShowAdmin(true);
  };

  return (
    <div>
      <h2>动态资源预加载</h2>

      <div className="user-intent">
        <p>检测到的用户意图: {userIntent || '无'}</p>
      </div>

      <div className="dynamic-controls">
        <button onClick={handleShowChart}>
          显示数据图表 (将预加载)
        </button>

        <button onClick={handleShowAdmin}>
          显示管理面板 (将预加载)
        </button>
      </div>

      {showChart && (
        <Suspense fallback={<div>加载图表组件中...</div>}>
          <LazyChart />
        </Suspense>
      )}

      {showAdmin && (
        <Suspense fallback={<div>加载管理面板中...</div>}>
          <LazyAdminPanel />
        </Suspense>
      )}

      <div className="preload-status">
        <h4>预加载状态</h4>
        <p>当鼠标接近不同区域时，相关资源会自动预加载</p>
      </div>
    </div>
  );
}

// 懒加载组件
const LazyChart = lazy(() => import('@/components/heavy-chart'));
const LazyAdminPanel = lazy(() => import('@/components/admin-panel'));
```

### 2. React 19.1 新特性实现

#### 2.1 Owner Stack 调试增强 (`/src/app/react-19/owner-stack`)

**功能描述**：展示 React 19.1 的 Owner Stack 调试功能

**调试组件实现**：
```typescript
// owner-stack/debugging-demo.tsx
'use client';

import { useEffect, useRef } from 'react';

// 用于模拟复杂组件树的调试场景
function DeeplyNestedComponent({ level }: { level: number }) {
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    // React 19.1 会在开发者工具中显示 Owner Stack
    // 帮助定位是哪个父组件触发了这次渲染
    console.log(`DeeplyNestedComponent ${level} rendered #${renderCount.current}`);
    console.log('Owner Stack:', new Error().stack);
  });

  if (level === 0) {
    return <div>最深层级组件</div>;
  }

  return (
    <div>
      <p>层级 {level}</p>
      <DeeplyNestedComponent level={level - 1} />
    </div>
  );
}

export default function OwnerStackDemo() {
  const [trigger, setTrigger] = useState(0);

  return (
    <div>
      <button onClick={() => setTrigger(prev => prev + 1)}>
        触发重新渲染
      </button>

      <div className="debug-info">
        <p>打开 React DevTools 查看 Owner Stack 信息</p>
        <p>在组件面板中可以看到完整的组件调用链</p>
      </div>

      <DeeplyNestedComponent level={5} />
    </div>
  );
}

// owner-stack/performance-debugging.tsx
'use client';

// 性能调试场景
function ExpensiveComponent({ data }: { data: any[] }) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (renderTime > 16) { // 超过一帧的时间
      console.warn(`ExpensiveComponent 渲染耗时 ${renderTime.toFixed(2)}ms`);
      console.warn('检查 Owner Stack 找到触发重新渲染的组件');
    }
  });

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.content}</div>
      ))}
    </div>
  );
}

export default function PerformanceDebuggingDemo() {
  const [items, setItems] = useState(
    Array.from({ length: 1000 }, (_, i) => ({ content: `项目 ${i}` }))
  );

  return (
    <div>
      <button onClick={() => setItems(prev => [...prev, { content: `新项目 ${Date.now()}` }])}>
        添加项目
      </button>

      <ExpensiveComponent data={items} />
    </div>
  );
}
```

#### 2.2 Suspense 增强功能 (`/src/app/react-19/suspense-enhanced`)

**功能描述**：展示 React 19.1 的 Suspense 增强功能

**Suspense 优化实现**：
```typescript
// suspense/hydration-boundary.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';

// React 19.1 改进了水合边界的处理
function HydrationAwareComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>服务端渲染内容</div>;
  }

  return <div>客户端水合内容</div>;
}

export default function SuspenseHydrationDemo() {
  return (
    <div>
      <h2>Suspense 水合边界增强</h2>
      <p>React 19.1 改进了服务端和客户端渲染的一致性</p>

      <Suspense fallback={<div>加载中...</div>}>
        <HydrationAwareComponent />
      </Suspense>
    </div>
  );
}

// suspense/mixed-rendering.tsx
'use client';

// 混合渲染场景 - 服务端组件和客户端组件的 Suspense 集成
function ServerComponentWrapper({ children }: { children: React.ReactNode }) {
  // 模拟服务端组件的延迟加载
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData('服务端组件数据加载完成');
    };

    loadData();
  }, []);

  if (!data) {
    throw new Promise(resolve => setTimeout(resolve, 2000));
  }

  return <>{children}</>;
}

export default function MixedRenderingDemo() {
  return (
    <div>
      <h2>混合渲染 Suspense 增强</h2>

      <Suspense fallback={<div>服务端组件加载中...</div>}>
        <ServerComponentWrapper>
          <div>这是嵌套在服务端组件中的客户端内容</div>
        </ServerComponentWrapper>
      </Suspense>

      <Suspense fallback={<div>客户端组件加载中...</div>}>
        <ClientOnlyComponent />
      </Suspense>
    </div>
  );
}

function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div>纯客户端组件内容</div>;
}
```

### 3. React 19.2 新特性实现

#### 3.1 Activity API 状态保留 (`/src/app/react-19/activity-api`)

**功能描述**：展示 Activity API 如何保留组件状态，避免重复渲染

**Activity 组件实现**：
```typescript
// activity/tabs-demo.tsx
'use client';

import { Activity, useState } from 'react';

// React 19.2 的 Activity 组件 - 保留组件状态
function TabContent({ tabId }: { tabId: string }) {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // 当 tab 切换时，这些状态会被保留
  return (
    <div className="tab-content">
      <h3>标签页 {tabId}</h3>

      <div>
        <p>计数器: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>增加</button>
      </div>

      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入一些内容"
        />
        <p>输入内容: {inputValue}</p>
      </div>

      <div>
        <p>这个组件的状态在切换标签时会被保留</p>
        <p>即使组件被隐藏，状态也不会丢失</p>
      </div>
    </div>
  );
}

export default function ActivityTabsDemo() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <h2>Activity API 状态保留演示</h2>

      <div className="tab-buttons">
        <button onClick={() => setActiveTab('tab1')}>标签页 1</button>
        <button onClick={() => setActiveTab('tab2')}>标签页 2</button>
        <button onClick={() => setActiveTab('tab3')}>标签页 3</button>
      </div>

      <div className="tab-panels">
        <Activity active={activeTab === 'tab1'}>
          <TabContent tabId="1" />
        </Activity>

        <Activity active={activeTab === 'tab2'}>
          <TabContent tabId="2" />
        </Activity>

        <Activity active={activeTab === 'tab3'}>
          <TabContent tabId="3" />
        </Activity>
      </div>

      <div className="explanation">
        <h4>Activity API 的优势：</h4>
        <ul>
          <li>状态保留：组件状态在隐藏/显示时不会丢失</li>
          <li>性能优化：避免重复渲染和副作用执行</li>
          <li>用户体验：切换时保持用户的操作状态</li>
        </ul>
      </div>
    </div>
  );
}

// activity/drawer-demo.tsx
'use client';

// 抽屉组件状态保留示例
function DrawerContent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = Array.from({ length: 50 }, (_, i) => `选项 ${i + 1}`);

  const toggleItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="drawer-content">
      <h3>抽屉内容</h3>

      <div
        className="scrollable-list"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollTop)}
      >
        {items.map(item => (
          <div
            key={item}
            className={`list-item ${selectedItems.includes(item) ? 'selected' : ''}`}
            onClick={() => toggleItem(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="drawer-info">
        <p>滚动位置: {Math.round(scrollPosition)}px</p>
        <p>选中项目: {selectedItems.length}</p>
      </div>
    </div>
  );
}

export default function ActivityDrawerDemo() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <h2>Activity 抽屉状态保留</h2>

      <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        {isDrawerOpen ? '关闭抽屉' : '打开抽屉'}
      </button>

      <Activity active={isDrawerOpen}>
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <DrawerContent />
          </div>
        </div>
      </Activity>

      <div className="main-content">
        <p>抽屉关闭时，所有状态都会被保留</p>
        <p>再次打开时，滚动位置和选中项目都会恢复</p>
      </div>
    </div>
  );
}
```

#### 3.2 useEffectEvent Hook (`/src/app/react-19/use-effect-event`)

**功能描述**：展示 useEffectEvent 如何解决 useEffect 闭包陷阱

**useEffectEvent 实现示例**：
```typescript
// effect-event/basic-demo.tsx
'use client';

import { useEffectEvent, useEffect, useState } from 'react';

// 传统 useEffect 闭包陷阱问题
function TraditionalEffectComponent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('初始消息');

  // 问题：每次 message 变化都会重新执行 effect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`当前消息: ${message}`); // 闭包陷阱：总是打印旧的 message
    }, 1000);

    return () => clearInterval(timer);
  }, [message]); // 依赖 message 导致 effect 重新执行

  return (
    <div>
      <p>计数: {count}</p>
      <p>消息: {message}</p>
      <button onClick={() => setCount(prev => prev + 1)}>增加计数</button>
      <button onClick={() => setMessage(`消息 ${Date.now()}`)}>更新消息</button>
    </div>
  );
}

// 使用 useEffectEvent 解决闭包陷阱
function UseEffectEventComponent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('初始消息');

  // 使用 useEffectEvent 创建事件函数
  const onLogMessage = useEffectEvent(() => {
    console.log(`当前消息: ${message}`); // 总是获取最新的 message
  });

  // Effect 不再依赖 message，不会重新执行
  useEffect(() => {
    const timer = setInterval(() => {
      onLogMessage(); // 调用事件函数
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 空依赖数组

  return (
    <div>
      <p>计数: {count}</p>
      <p>消息: {message}</p>
      <button onClick={() => setCount(prev => prev + 1)}>增加计数</button>
      <button onClick={() => setMessage(`消息 ${Date.now()}`)}>更新消息</button>
    </div>
  );
}

export default function UseEffectEventDemo() {
  return (
    <div>
      <h2>useEffectEvent Hook 演示</h2>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>传统 useEffect (有问题)</h3>
          <TraditionalEffectComponent />
          <p className="warning">
            ⚠️ 每次更新消息都会重新创建定时器
          </p>
        </div>

        <div>
          <h3>useEffectEvent (优化后)</h3>
          <UseEffectEventComponent />
          <p className="success">
            ✅ 定时器只创建一次，始终获取最新消息
          </p>
        </div>
      </div>
    </div>
  );
}

// effect-event/complex-demo.tsx
'use client';

// 复杂场景：API 请求和事件处理
function ApiDataComponent() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  // 传统写法：依赖过多导致频繁重新执行
  const fetchDataTraditional = async () => {
    try {
      const response = await fetch(`/api/data?filter=${filter}&retry=${retryCount}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  useEffect(() => {
    fetchDataTraditional();
  }, [filter, retryCount]); // 依赖过多

  // 使用 useEffectEvent 优化
  const onFetchData = useEffectEvent(async () => {
    try {
      const response = await fetch(`/api/data?filter=${filter}&retry=${retryCount}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  });

  useEffect(() => {
    onFetchData();
  }, []); // 空依赖

  return (
    <div>
      <h3>API 数据获取</h3>

      <div>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="筛选条件"
        />
        <button onClick={() => setRetryCount(prev => prev + 1)}>
          重试 ({retryCount})
        </button>
      </div>

      <div>
        {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default function ComplexUseEffectEventDemo() {
  return (
    <div>
      <h2>复杂 useEffectEvent 应用场景</h2>

      <ApiDataComponent />

      <div className="explanation">
        <h4>useEffectEvent 的使用场景：</h4>
        <ul>
          <li>事件处理函数：避免 effect 依赖过多</li>
          <li>API 请求：封装请求逻辑，减少 effect 重新执行</li>
          <li>定时器回调：总是获取最新的状态值</li>
          <li>第三方库集成：避免库的重新初始化</li>
        </ul>
      </div>
    </div>
  );
}
```

#### 3.3 缓存信号 (Cache Signals) (`/src/app/react-19/cache-signals`)

**功能描述**：展示 React 19.2 的缓存信号机制

**缓存信号实现**：
```typescript
// cache-signals/basic-demo.tsx
'use client';

import { createCacheSignal, use } from 'react';

// 创建缓存信号
const userCacheSignal = createCacheSignal<string>(
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
  {
    ttl: 60000, // 缓存 1 分钟
    maxSize: 100 // 最多缓存 100 个结果
  }
);

function UserProfile({ userId }: { userId: string }) {
  // 使用缓存信号获取数据
  const user = use(userCacheSignal(userId));

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>部门: {user.department}</p>
    </div>
  );
}

export default function CacheSignalDemo() {
  const [selectedUserId, setSelectedUserId] = useState('1');

  const users = [
    { id: '1', name: '用户 1' },
    { id: '2', name: '用户 2' },
    { id: '3', name: '用户 3' }
  ];

  return (
    <div>
      <h2>缓存信号演示</h2>

      <div>
        <h3>选择用户</h3>
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={selectedUserId === user.id ? 'active' : ''}
          >
            {user.name}
          </button>
        ))}
      </div>

      <div>
        <UserProfile userId={selectedUserId} />
        <p className="cache-info">
          💡 切换用户后再切换回来，数据会从缓存中读取
        </p>
      </div>
    </div>
  );
}

// cache-signals/advanced-demo.tsx
'use client';

// 高级缓存信号应用
const searchCacheSignal = createCacheSignal(
  async (query: string) => {
    // 模拟搜索 API
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const allResults = [
      { id: 1, title: 'React 19 新特性', category: 'frontend' },
      { id: 2, title: 'Next.js 15 更新', category: 'framework' },
      { id: 3, title: 'TypeScript 最佳实践', category: 'language' },
      { id: 4, title: '性能优化技巧', category: 'performance' },
      { id: 5, title: '状态管理模式', category: 'architecture' }
    ];

    return allResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  },
  {
    ttl: 300000, // 缓存 5 分钟
    maxSize: 50
  }
);

function SearchResults({ query }: { query: string }) {
  const results = use(searchCacheSignal(query));

  return (
    <div className="search-results">
      <h3>搜索结果 ({results.length})</h3>
      {results.map(result => (
        <div key={result.id} className="result-item">
          <h4>{result.title}</h4>
          <span className="category">{result.category}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdvancedCacheSignalDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 });

  // 监听缓存统计（这是示例代码，实际 API 可能不同）
  useEffect(() => {
    const updateStats = () => {
      // 获取缓存统计信息的逻辑
      setCacheStats(prev => ({ ...prev }));
    };

    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>高级缓存信号应用</h2>

      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索文章..."
        />
      </div>

      {searchQuery && (
        <Suspense fallback={<div>搜索中...</div>}>
          <SearchResults query={searchQuery} />
        </Suspense>
      )}

      <div className="cache-stats">
        <h4>缓存统计</h4>
        <p>缓存命中: {cacheStats.hits}</p>
        <p>缓存未命中: {cacheStats.misses}</p>
        <p>命中率: {cacheStats.hits / (cacheStats.hits + cacheStats.misses) * 100 || 0}%</p>
      </div>

      <div className="explanation">
        <h4>缓存信号的优势：</h4>
        <ul>
          <li>自动缓存管理：无需手动处理缓存逻辑</li>
          <li>信号驱动：数据变化时自动更新缓存</li>
          <li>性能优化：减少重复的网络请求</li>
          <li>内存管理：自动清理过期和超量的缓存</li>
        </ul>
      </div>
    </div>
  );
}
```

### 4. React Compiler 集成演示

#### 4.1 基础编译器优化 (`/src/app/react-19/compiler/basic-optimization`)

**功能描述**：展示 React Compiler 如何自动优化组件渲染性能

**实施要点**：
```typescript
// CompilerOptimizationDemo.tsx
import { useState } from 'react';

// 传统写法 - 需要手动优化
export default function TraditionalComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveValue = useMemo(() => {
    return heavyCalculation(count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive: {expensiveValue}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

// React Compiler 优化 - 自动优化
export default function CompilerOptimizedComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Compiler 会自动识别依赖关系并进行优化
  const expensiveValue = heavyCalculation(count);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive: {expensiveValue}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}
```

#### 4.2 组件记忆化 (`/src/app/react-19/compiler/component-memoization`)

**功能描述**：展示 Compiler 如何替代手动 memo 使用

**关键实现**：
```typescript
// 不再需要手动 memo
const ExpensiveChild = ({ data, onAction }) => {
  console.log('Child rendered');
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

// Compiler 会自动优化渲染
export default function ParentComponent() {
  const [items, setItems] = useState(initialData);
  const [filter, setFilter] = useState('');

  // 自动 memo 化，避免不必要的重渲染
  const filteredItems = items.filter(item =>
    item.title.includes(filter)
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      {filteredItems.map(item => (
        <ExpensiveChild
          key={item.id}
          data={item}
          onAction={() => console.log('Action:', item.id)}
        />
      ))}
    </div>
  );
}
```

## 📋 技术要求

### 开发环境
- Node.js 18+
- React 19.2.0+
- Next.js 15.5.0+
- TypeScript 5.8+

### 依赖包
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "next": "^15.5.0",
  "@types/react": "^19.2.0",
  "@types/react-dom": "^19.2.0",
  "typescript": "~5.8.3",
  "zod": "^3.22.4",
  "@types/node": "^20.10.0"
}
```

### React 19 新特性兼容性要求
- **React 19.2.0+**：支持 Activity API、useEffectEvent、缓存信号
- **React 19.1.0+**：支持 Owner Stack、Suspense 增强
- **React 19.0.0+**：支持 Actions、use() Hook、服务端组件
- **Next.js 15.5.0+**：完整支持 App Router 和 Server Actions
- **Node.js 18.17.0+**：支持服务端组件和 Server Actions

### 工具配置
- **React DevTools**：最新版本以支持 React 19 全版本特性
- **TypeScript**：严格模式配置，支持 React 19 新类型
- **ESLint/Biome**：React 19 规则配置，包含新 Hook 检测
- **React Compiler**：实验性编译器配置（可选）
- **缓存分析工具**：用于监控 React 19.2 缓存信号性能

### 开发环境配置
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### package.json 脚本配置
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "react-19-dev": "cross-env REACT_VERSION=19.2.0 next dev",
    "analyze-performance": "next build && next analyze"
  }
}
```

## 📚 参考资料

### 官方文档
- [React 19 Beta 官方文档](https://react.dev/blog/2024/04/25/react-19)
- [React 19.1 更新日志](https://react.dev/blog/2024/12/05/react-19-1)
- [React 19.2 更新日志](https://react.dev/blog/2025/10/01/react-19-2)
- [React Compiler 实验性功能](https://github.com/facebook/react/blob/main/packages/react-compiler/README.md)

### API 参考
- [Server Actions 最佳实践](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [use() Hook 使用指南](https://react.dev/reference/react/use)
- [useTransition API 文档](https://react.dev/reference/react/useTransition)
- [useActionState API 文档](https://react.dev/reference/react/useActionState)
- [useOptimistic API 文档](https://react.dev/reference/react/useOptimistic)
- [useFormStatus API 文档](https://react.dev/reference/react/useFormStatus)
- [useEffectEvent API 文档](https://react.dev/reference/react/useEffectEvent)

### 高级特性
- [Activity API 使用指南](https://react.dev/reference/react/Activity)
- [缓存信号 (Cache Signals) 文档](https://react.dev/reference/react/createCacheSignal)
- [服务端组件 (RSC) 指南](https://react.dev/learn/server-components)
- [Suspense 增强功能](https://react.dev/reference/react/Suspense)

### 调试和性能
- [React 19.1+ 调试工具](https://react.dev/learn/react-developer-tools)
- [Owner Stack 调试指南](https://react.dev/learn/react-developer-tools#owner-stack)
- [React Compiler 性能分析](https://github.com/facebook/react/blob/main/packages/react-compiler/README.md#performance-profiling)

### 社区资源
- [React 19 迁移指南](https://react.dev/learn/react-19-migration)
- [React 19 最佳实践](https://react.dev/learn/react-19-best-practices)
- [React 19 性能优化技巧](https://react.dev/learn/react-19-performance)