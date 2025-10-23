# 阶段三：现代状态管理对比

## 📋 概述

本阶段专注于展示现代 React 状态管理库的对比和应用，包括原子化状态管理、代理式状态、传统 Redux 的现代化用法等。帮助开发者了解不同状态管理方案的适用场景和最佳实践。

## 🎯 实施目标

### 主要目标
- [ ] Jotai 原子化状态管理展示
- [ ] Valtio 代理式状态实现
- [ ] Zustand 轻量级状态库应用
- [ ] Redux Toolkit 现代化实践
- [ ] 新兴状态模式探索

### 技术指标
- **状态管理覆盖**：5种主流状态管理方案
- **性能对比**：不同方案的性能测试
- **学习价值**：每个方案都有使用场景说明
- **最佳实践**：生产环境的实施建议

## 🚀 具体实施方案

### 1. 原子化状态管理 - Jotai

#### 1.1 基础原子状态 (`/src/app/state-management/jotai/basic-usage`)

**功能描述**：展示 Jotai 的原子化状态概念和基础用法

**核心实现**：
```typescript
import { atom, useAtom } from 'jotai';

// 定义原子状态
const countAtom = atom(0);
const nameAtom = atom('Jotai User');
const userAtom = atom({
  id: '1',
  name: 'Default User',
  email: 'user@example.com'
});

// 派生原子
const doubledCountAtom = atom(
  (get) => get(countAtom) * 2
);

// 异步原子
const userAsyncAtom = atom(
  async (get) => {
    const userId = get(userAtom).id;
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

// 可写派生原子
const userInfoAtom = atom(
  (get) => `${get(nameAtom)} (${get(countAtom)} 次)`,
  (get, set, newValue) => {
    // 解析并更新基础原子
    const match = newValue.match(/^(.+?) \((\d+) 次\)$/);
    if (match) {
      set(nameAtom, match[1]);
      set(countAtom, parseInt(match[2]));
    }
  }
);

// 组件实现
export default function JotaiBasicExample() {
  const [count, setCount] = useAtom(countAtom);
  const [name, setName] = useAtom(nameAtom);
  const [user, setUser] = useAtom(userAtom);
  const [doubledCount] = useAtom(doubledCountAtom);
  const [asyncUser] = useAtom(userAsyncAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  return (
    <div className="jotai-basic-example">
      <h2>Jotai 基础原子状态</h2>

      <div className="atom-section">
        <h3>计数器原子</h3>
        <p>当前计数: {count}</p>
        <p>双倍计数: {doubledCount}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
        <button onClick={() => setCount(0)}>重置</button>
      </div>

      <div className="atom-section">
        <h3>用户信息原子</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入姓名"
        />
        <p>用户ID: {user.id}</p>
        <p>用户名: {user.name}</p>
        <p>邮箱: {user.email}</p>
      </div>

      <div className="atom-section">
        <h3>派生原子</h3>
        <input
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
          placeholder="格式: 姓名 (次数)"
        />
        <p>解析结果: 姓名={name}, 次数={count}</p>
      </div>

      <div className="atom-section">
        <h3>异步原子</h3>
        {asyncUser ? (
          <div>
            <p>异步用户: {asyncUser.name}</p>
            <p>邮箱: {asyncUser.email}</p>
          </div>
        ) : (
          <p>加载异步用户数据...</p>
        )}
      </div>
    </div>
  );
}
```

#### 1.2 复杂应用场景 (`/src/app/state-management/jotai/complex-scenarios`)

**功能描述**：展示 Jotai 在复杂应用场景中的使用

**购物车场景实现**：
```typescript
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 产品类型
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// 购物车项目
interface CartItem extends Product {
  quantity: number;
}

// 原子定义
const cartAtom = atomWithStorage<CartItem[]>('cart', []);

const totalItemsAtom = atom(
  (get) => get(cartAtom).reduce((sum, item) => sum + item.quantity, 0)
);

const totalPriceAtom = atom(
  (get) => get(cartAtom).reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const cartItemCountAtom = (productId: string) => atom(
  (get) => {
    const cart = get(cartAtom);
    const item = cart.find(item => item.id === productId);
    return item?.quantity || 0;
  }
);

// 购物车操作原子
const cartActionsAtom = atom(
  null,
  (get, set, action: { type: string; payload?: any }) => {
    const cart = get(cartAtom);

    switch (action.type) {
      case 'ADD_TO_CART':
        const { product } = action.payload;
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
          const updatedCart = cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set(cartAtom, updatedCart);
        } else {
          set(cartAtom, [...cart, { ...product, quantity: 1 }]);
        }
        break;

      case 'REMOVE_FROM_CART':
        const { productId } = action.payload;
        set(cartAtom, cart.filter(item => item.id !== productId));
        break;

      case 'UPDATE_QUANTITY':
        const { productId, quantity } = action.payload;
        if (quantity <= 0) {
          set(cartAtom, cart.filter(item => item.id !== productId));
        } else {
          const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          );
          set(cartAtom, updatedCart);
        }
        break;

      case 'CLEAR_CART':
        set(cartAtom, []);
        break;
    }
  }
);

// 购物车组件
export default function JotaiShoppingCart() {
  const [cart] = useAtom(cartAtom);
  const [totalItems] = useAtom(totalItemsAtom);
  const [totalPrice] = useAtom(totalPriceAtom);
  const [, dispatch] = useAtom(cartActionsAtom);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="jotai-shopping-cart">
      <h2>Jotai 购物车示例</h2>

      {/* 商品列表 */}
      <div className="products-section">
        <h3>商品列表</h3>
        <div className="product-grid">
          {products.map(product => {
            const [itemCount] = useAtom(cartItemCountAtom(product.id));

            return (
              <ProductCard
                key={product.id}
                product={product}
                cartCount={itemCount}
                onAddToCart={() => addToCart(product)}
              />
            );
          })}
        </div>
      </div>

      {/* 购物车 */}
      <div className="cart-section">
        <h3>购物车 ({totalItems} 件商品)</h3>

        {cart.length === 0 ? (
          <p className="empty-cart">购物车为空</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="cart-summary">
              <p>总计: ¥{totalPrice.toFixed(2)}</p>
              <button onClick={clearCart} className="clear-cart-btn">
                清空购物车
              </button>
              <button className="checkout-btn">
                结算
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### 2. 代理式状态管理 - Valtio

#### 2.1 基础代理状态 (`/src/app/state-management/valtio/proxy-state`)

**功能描述**：展示 Valtio 的代理式状态管理和自动更新

**核心实现**：
```typescript
import { proxy, useSnapshot } from 'valtio';

// 创建代理状态
const userState = proxy({
  profile: {
    name: 'Valtio User',
    email: 'user@example.com',
    age: 25,
    avatar: ''
  },
  preferences: {
    theme: 'light' as 'light' | 'dark',
    language: 'zh-CN' as string,
    notifications: true
  },
  stats: {
    loginCount: 0,
    lastLogin: new Date(),
    activeSessions: []
  }
});

// 带方法的代理状态
const counterState = proxy({
  count: 0,
  history: [] as number[],

  increment() {
    this.count++;
    this.history.push(this.count);
    if (this.history.length > 10) {
      this.history.shift();
    }
  },

  decrement() {
    this.count--;
    this.history.push(this.count);
    if (this.history.length > 10) {
      this.history.shift();
    }
  },

  reset() {
    this.count = 0;
    this.history = [];
  },

  setCount(value: number) {
    this.count = value;
    this.history.push(value);
    if (this.history.length > 10) {
      this.history.shift();
    }
  }
});

// 嵌套代理状态
const todoState = proxy({
  todos: [] as Todo[],
  filter: 'all' as 'all' | 'active' | 'completed',

  addTodo(text: string) {
    this.todos.push({
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    });
  },

  toggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },

  removeTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  },

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
  },

  setFilter(filter: string) {
    this.filter = filter as any;
  }
});

// 组件实现
export default function ValtioProxyExample() {
  const userSnapshot = useSnapshot(userState);
  const counterSnapshot = useSnapshot(counterState);
  const todoSnapshot = useSnapshot(todoState);

  return (
    <div className="valtio-proxy-example">
      <h2>Valtio 代理式状态管理</h2>

      {/* 计数器示例 */}
      <div className="section">
        <h3>计数器（带方法的状态）</h3>
        <p>当前计数: {counterSnapshot.count}</p>
        <p>历史记录: {counterSnapshot.history.join(' → ')}</p>
        <div className="button-group">
          <button onClick={() => counterState.increment()}>增加</button>
          <button onClick={() => counterState.decrement()}>减少</button>
          <button onClick={() => counterState.reset()}>重置</button>
          <button onClick={() => counterState.setCount(100)}>设为100</button>
        </div>
      </div>

      {/* 用户状态示例 */}
      <div className="section">
        <h3>用户信息（嵌套状态）</h3>
        <div className="user-info">
          <label>
            姓名:
            <input
              value={userSnapshot.profile.name}
              onChange={(e) => userState.profile.name = e.target.value}
            />
          </label>
          <label>
            邮箱:
            <input
              type="email"
              value={userSnapshot.profile.email}
              onChange={(e) => userState.profile.email = e.target.value}
            />
          </label>
          <label>
            年龄:
            <input
              type="number"
              value={userSnapshot.profile.age}
              onChange={(e) => userState.profile.age = parseInt(e.target.value)}
            />
          </label>
        </div>

        <div className="preferences">
          <label>
            主题:
            <select
              value={userSnapshot.preferences.theme}
              onChange={(e) => userState.preferences.theme = e.target.value as any}
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
            </select>
          </label>
          <label>
            通知:
            <input
              type="checkbox"
              checked={userSnapshot.preferences.notifications}
              onChange={(e) => userState.preferences.notifications = e.target.checked}
            />
          </label>
        </div>
      </div>

      {/* Todo 列表示例 */}
      <div className="section">
        <h3>Todo 列表（复杂操作）</h3>
        <div className="todo-controls">
          <input
            type="text"
            placeholder="添加新的 todo..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                todoState.addTodo(e.currentTarget.value.trim());
                e.currentTarget.value = '';
              }
            }}
          />
          <select
            value={todoSnapshot.filter}
            onChange={(e) => todoState.setFilter(e.target.value)}
          >
            <option value="all">全部</option>
            <option value="active">活跃</option>
            <option value="completed">已完成</option>
          </select>
          <button onClick={() => todoState.clearCompleted()}>
            清除已完成
          </button>
        </div>

        <div className="todo-list">
          {todoSnapshot.todos
            .filter(todo => {
              if (todoSnapshot.filter === 'active') return !todo.completed;
              if (todoSnapshot.filter === 'completed') return todo.completed;
              return true;
            })
            .map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => todoState.toggleTodo(todo.id)}
                onRemove={() => todoState.removeTodo(todo.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
```

#### 2.2 计算值和订阅 (`/src/app/state-management/valtio/computed-values`)

**功能描述**：展示 Valtio 的计算值、订阅和高级特性

**实现示例**：
```typescript
import { proxy, subscribe, derive } from 'valtio';

// 基础状态
const gameState = proxy({
  player: {
    x: 0,
    y: 0,
    health: 100,
    score: 0
  },
  enemies: [] as Enemy[],
  items: [] as Item[],
  level: 1,
  time: 0
});

// 计算状态
const derivedState = derive({
  // 玩家到原点的距离
  playerDistance: (get) => {
    const player = get(gameState.player);
    return Math.sqrt(player.x * player.x + player.y * player.y);
  },

  // 最近的敌人
  nearestEnemy: (get) => {
    const player = get(gameState.player);
    const enemies = get(gameState.enemies);

    if (enemies.length === 0) return null;

    return enemies.reduce((nearest, enemy) => {
      const enemyDistance = Math.sqrt(
        Math.pow(enemy.x - player.x, 2) +
        Math.pow(enemy.y - player.y, 2)
      );
      const nearestDistance = Math.sqrt(
        Math.pow(nearest.x - player.x, 2) +
        Math.pow(nearest.y - player.y, 2)
      );

      return enemyDistance < nearestDistance ? enemy : nearest;
    });
  },

  // 总分数
  totalScore: (get) => {
    return get(gameState.player.score) + (get(gameState.level) * 100);
  },

  // 游戏状态
  gameStatus: (get) => {
    const health = get(gameState.player.health);
    if (health <= 0) return 'gameOver';
    if (get(gameState.enemies).length === 0) return 'levelComplete';
    return 'playing';
  }
});

// 状态操作
const gameActions = {
  movePlayer(dx: number, dy: number) {
    gameState.player.x += dx;
    gameState.player.y += dy;

    // 边界检查
    gameState.player.x = Math.max(0, Math.min(800, gameState.player.x));
    gameState.player.y = Math.max(0, Math.min(600, gameState.player.y));
  },

  playerDamage(amount: number) {
    gameState.player.health = Math.max(0, gameState.player.health - amount);
  },

  collectItem(itemId: string) {
    const itemIndex = gameState.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      gameState.items.splice(itemIndex, 1);
      gameState.player.score += 100;
    }
  },

  addEnemy(enemy: Enemy) {
    gameState.enemies.push(enemy);
  },

  nextLevel() {
    gameState.level++;
    gameState.enemies = [];
    gameState.items = [];
    gameState.player.health = 100;
  }
};

// 订阅状态变化
let unsubscribeHealth: (() => void) | null = null;
let unsubscribeScore: (() => void) | null = null;

// 游戏组件
export default function ValtioGameExample() {
  const gameSnapshot = useSnapshot(gameState);
  const derivedSnapshot = useSnapshot(derivedState);

  useEffect(() => {
    // 订阅生命值变化
    unsubscribeHealth = subscribe(
      gameState.player.health,
      (health) => {
        if (health <= 50) {
          console.warn('生命值过低！警告！');
        }
      }
    );

    // 订阅分数变化
    unsubscribeScore = subscribe(
      gameState.player.score,
      (score) => {
        console.log(`分数更新: ${score}`);
      }
    );

    return () => {
      unsubscribeHealth?.();
      unsubscribeScore?.();
    };
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const speed = 10;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        gameActions.movePlayer(0, -speed);
        break;
      case 'ArrowDown':
      case 's':
        gameActions.movePlayer(0, speed);
        break;
      case 'ArrowLeft':
      case 'a':
        gameActions.movePlayer(-speed, 0);
        break;
      case 'ArrowRight':
      case 'd':
        gameActions.movePlayer(speed, 0);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="valtio-game-example">
      <h2>Valtio 计算值和订阅</h2>

      {/* 游戏信息面板 */}
      <div className="game-info">
        <div className="info-section">
          <h3>玩家状态</h3>
          <p>位置: ({gameSnapshot.player.x}, {gameSnapshot.player.y})</p>
          <p>生命值: {gameSnapshot.player.health}</p>
          <p>分数: {gameSnapshot.player.score}</p>
        </div>

        <div className="info-section">
          <h3>计算值</h3>
          <p>到原点距离: {derivedSnapshot.playerDistance.toFixed(2)}</p>
          <p>最近敌人: {derivedSnapshot.nearestEnemy?.name || '无'}</p>
          <p>总分数: {derivedSnapshot.totalScore}</p>
          <p>游戏状态: {derivedSnapshot.gameStatus}</p>
        </div>

        <div className="info-section">
          <h3>游戏统计</h3>
          <p>关卡: {gameSnapshot.level}</p>
          <p>敌人数量: {gameSnapshot.enemies.length}</p>
          <p>道具数量: {gameSnapshot.items.length}</p>
        </div>
      </div>

      {/* 游戏画布 */}
      <div className="game-canvas">
        <div
          className="player"
          style={{
            left: `${gameSnapshot.player.x}px`,
            top: `${gameSnapshot.player.y}px`
          }}
        />

        {derivedSnapshot.nearestEnemy && (
          <div className="nearest-enemy-indicator">
            最近敌人: {derivedSnapshot.nearestEnemy.name}
          </div>
        )}

        {derivedSnapshot.gameStatus === 'gameOver' && (
          <div className="game-over-overlay">
            <h2>游戏结束</h2>
            <p>最终分数: {derivedSnapshot.totalScore}</p>
            <button onClick={() => gameActions.nextLevel()}>
              重新开始
            </button>
          </div>
        )}
      </div>

      {/* 控制说明 */}
      <div className="controls">
        <h3>控制说明</h3>
        <p>使用 WASD 或方向键移动玩家</p>
        <p>收集道具增加分数</p>
        <p>避免敌人以保持生命值</p>
      </div>
    </div>
  );
}
```

### 3. 轻量级状态管理 - Zustand

#### 3.1 Vanilla Store (`/src/app/state-management/zustand/vanilla-store`)

**功能描述**：展示 Zustand 的轻量级、无依赖的状态管理

**核心实现**：
```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// 类型定义
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
}

// 创建 store
const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // 模拟登录 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://via.placeholder.com/100'
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        set({
          error: '邮箱或密码错误',
          isLoading: false
        });
      }
    } catch (error) {
      set({
        error: '登录失败，请重试',
        isLoading: false
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  updateUser: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...updates }
      });
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

// 带选择器的 Hook
const useUser = () => useAuthStore((state) => state.user);
const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
const useAuthLoading = () => useAuthStore((state) => state.isLoading);
const useAuthError = () => useAuthStore((state) => state.error);

// 组件实现
export default function ZustandVanillaExample() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();
  const error = useAuthError();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearError = useAuthStore((state) => state.clearError);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleUpdate = () => {
    updateUser(editData);
    setEditMode(false);
  };

  const handleEdit = () => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email
      });
      setEditMode(true);
    }
  };

  return (
    <div className="zustand-vanilla-example">
      <h2>Zustand Vanilla Store</h2>

      {!isAuthenticated ? (
        /* 登录表单 */
        <div className="login-section">
          <h3>用户登录</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>邮箱:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  email: e.target.value
                })}
                required
              />
            </div>

            <div className="form-group">
              <label>密码:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({
                  ...formData,
                  password: e.target.value
                })}
                required
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
                <button type="button" onClick={clearError}>
                  关闭
                </button>
              </div>
            )}

            <button type="submit" disabled={isLoading}>
              {isLoading ? '登录中...' : '登录'}
            </button>

            <div className="demo-hint">
              <p>测试账号: admin@example.com</p>
              <p>测试密码: password</p>
            </div>
          </form>
        </div>
      ) : (
        /* 用户信息 */
        <div className="user-section">
          <h3>欢迎回来!</h3>
          <div className="user-profile">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              {editMode ? (
                <div className="edit-mode">
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({
                      ...editData,
                      name: e.target.value
                    })}
                    placeholder="姓名"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({
                      ...editData,
                      email: e.target.value
                    })}
                    placeholder="邮箱"
                  />
                  <div className="edit-actions">
                    <button onClick={handleUpdate}>保存</button>
                    <button onClick={() => setEditMode(false)}>取消</button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <p>ID: {user.id}</p>
                  <button onClick={handleEdit}>编辑资料</button>
                </div>
              )}
            </div>
          </div>

          <button onClick={logout} className="logout-btn">
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
```

#### 3.2 中间件和持久化 (`/src/app/state-management/zustand/middleware-persistence`)

**功能描述**：展示 Zustand 的中间件系统和数据持久化

**实现示例**：
```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

// 日志中间件
const logMiddleware = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log('State update:', args);
      return set(...args);
    },
    get,
    api
  );
};

// 撤销/重做中间件
const historyMiddleware = (config) => (set, get, api) => {
  const history = { past: [], present: get(), future: [] };

  const setStateWithHistory = (...args) => {
    const newState = typeof args[0] === 'function'
      ? args[0](get())
      : args[0];

    history.past.push(history.present);
    history.present = newState;
    history.future = [];

    set(newState);
  };

  const undo = () => {
    if (history.past.length > 0) {
      const previous = history.past.pop();
      history.future.unshift(history.present);
      history.present = previous;
      set(history.present);
    }
  };

  const redo = () => {
    if (history.future.length > 0) {
      const next = history.future.shift();
      history.past.push(history.present);
      history.present = next;
      set(history.present);
    }
  };

  return config(
    setStateWithHistory,
    () => history.present,
    { ...api, undo, redo }
  );
};

// 主题 store（带持久化）
const useThemeStore = create(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light' as 'light' | 'dark' | 'auto',
        primaryColor: '#3b82f6',
        fontSize: 16,

        setTheme: (theme) => {
          set({ theme }, 'setTheme');
          // 应用主题到 DOM
          document.documentElement.setAttribute('data-theme', theme);
        },

        setPrimaryColor: (color) => {
          set({ primaryColor: color }, 'setPrimaryColor');
          document.documentElement.style.setProperty('--primary-color', color);
        },

        setFontSize: (size) => {
          set({ fontSize: size }, 'setFontSize');
          document.documentElement.style.setProperty('--font-size', `${size}px`);
        },

        resetTheme: () => {
          const defaultTheme = {
            theme: 'light' as const,
            primaryColor: '#3b82f6',
            fontSize: 16
          };
          set(defaultTheme, 'resetTheme');
          document.documentElement.removeAttribute('data-theme');
          document.documentElement.style.removeProperty('--primary-color');
          document.documentElement.style.removeProperty('--font-size');
        }
      }),
      {
        name: 'theme-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          primaryColor: state.primaryColor,
          fontSize: state.fontSize
        })
      }
    ),
    { name: 'theme-store' }
  )
);

// 任务管理 store（带订阅选择器）
interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
}

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'priority' | 'completedAt';
  sortOrder: 'asc' | 'desc';

  // Actions
  addTask: (title: string, priority: Task['priority']) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
  setFilter: (filter: TaskState['filter']) => void;
  setSorting: (sortBy: TaskState['sortBy'], sortOrder: TaskState['sortOrder']) => void;
  clearCompleted: () => void;
}

const useTaskStore = create<TaskState>()(
  subscribeWithSelector(
    devtools(
      persist(
        logMiddleware(
          (set, get) => ({
            tasks: [],
            filter: 'all',
            sortBy: 'createdAt',
            sortOrder: 'desc',

            addTask: (title, priority) => {
              const newTask: Task = {
                id: Date.now().toString(),
                title,
                completed: false,
                priority,
                createdAt: new Date()
              };

              set((state) => ({
                tasks: [newTask, ...state.tasks]
              }), 'addTask');
            },

            toggleTask: (id) => {
              set((state) => ({
                tasks: state.tasks.map(task =>
                  task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? new Date() : undefined
                      }
                    : task
                )
              }), 'toggleTask');
            },

            deleteTask: (id) => {
              set((state) => ({
                tasks: state.tasks.filter(task => task.id !== id)
              }), 'deleteTask');
            },

            editTask: (id, title) => {
              set((state) => ({
                tasks: state.tasks.map(task =>
                  task.id === id ? { ...task, title } : task
                )
              }), 'editTask');
            },

            setFilter: (filter) => {
              set({ filter }, 'setFilter');
            },

            setSorting: (sortBy, sortOrder) => {
              set({ sortBy, sortOrder }, 'setSorting');
            },

            clearCompleted: () => {
              set((state) => ({
                tasks: state.tasks.filter(task => !task.completed)
              }), 'clearCompleted');
            }
          })
        ),
        {
          name: 'task-storage',
          storage: createJSONStorage(() => localStorage)
        }
      ),
      { name: 'task-store' }
    )
  )
);

// 选择器 hooks
const useTasks = () => useTaskStore((state) => state.tasks);
const useFilteredTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const sortBy = useTaskStore((state) => state.sortBy);
  const sortOrder = useTaskStore((state) => state.sortOrder);

  return useMemo(() => {
    let filtered = tasks;

    // 应用过滤器
    if (filter === 'active') {
      filtered = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter(task => task.completed);
    }

    // 应用排序
    filtered = [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (aValue instanceof Date) aValue = aValue.getTime();
      if (bValue instanceof Date) bValue = bValue.getTime();

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, filter, sortBy, sortOrder]);
};

// 主要组件
export default function ZustandMiddlewareExample() {
  const theme = useThemeStore((state) => state.theme);
  const primaryColor = useThemeStore((state) => state.primaryColor);
  const fontSize = useThemeStore((state) => state.fontSize);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);
  const setFontSize = useThemeStore((state) => state.setFontSize);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  const filteredTasks = useFilteredTasks();
  const tasks = useTasks();
  const filter = useTaskStore((state) => state.filter);
  const sortBy = useTaskStore((state) => state.sortBy);
  const sortOrder = useTaskStore((state) => state.sortOrder);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSorting = useTaskStore((state) => state.setSorting);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);

  return (
    <div className="zustand-middleware-example">
      <h2>Zustand 中间件和持久化</h2>

      {/* 主题控制 */}
      <div className="theme-section">
        <h3>主题设置</h3>
        <div className="theme-controls">
          <label>
            主题:
            <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
              <option value="light">浅色</option>
              <option value="dark">深色</option>
              <option value="auto">自动</option>
            </select>
          </label>

          <label>
            主色调:
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </label>

          <label>
            字体大小:
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
            <span>{fontSize}px</span>
          </label>

          <button onClick={resetTheme}>重置主题</button>
        </div>
      </div>

      {/* 任务管理 */}
      <div className="task-section">
        <h3>任务管理</h3>

        {/* 过滤器和排序 */}
        <div className="task-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">全部</option>
            <option value="active">活跃</option>
            <option value="completed">已完成</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              setSorting(sortBy as any, sortOrder as any);
            }}
          >
            <option value="createdAt-desc">创建时间 (新到旧)</option>
            <option value="createdAt-asc">创建时间 (旧到新)</option>
            <option value="priority-desc">优先级 (高到低)</option>
            <option value="priority-asc">优先级 (低到高)</option>
          </select>

          <button
            onClick={clearCompleted}
            disabled={tasks.filter(t => t.completed).length === 0}
          >
            清除已完成
          </button>
        </div>

        {/* 任务列表 */}
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onAdd={addTask}
        />
      </div>
    </div>
  );
}
```

## 📋 检查清单

### Jotai 原子化状态
- [ ] 基础原子状态演示
- [ ] 复杂应用场景
- [ ] Provider 模式
- [ ] 开发工具集成

### Valtio 代理式状态
- [ ] 代理状态基础
- [ ] 计算值和订阅
- [ ] 嵌套状态处理
- [ ] DevTools 集成

### Zustand 轻量级状态
- [ ] Vanilla Store 实现
- [ ] 中间件系统
- [ ] 数据持久化
- [ ] 选择器优化

### Redux Toolkit 现代化
- [ ] Slice 模式实现
- [ ] RTK Query 集成
- [ ] 异步状态处理
- [ ] 中间件自定义

### 新兴状态模式
- [ ] Signals 模式
- [ ] Observable 模式
- [ ] 事件总线
- [ ] 状态机集成

## ⏱️ 时间安排

### 第1周：原子化状态管理
- **2天**：Jotai 基础和复杂场景
- **2天**：Valtio 代理状态和订阅
- **1天**：性能对比和文档

### 第2周：轻量级状态管理
- **2天**：Zustand 基础和中间件
- **2天**：Redux Toolkit 现代化实践
- **1天**：性能测试和优化

### 第3周：新兴状态模式
- **2天**：Signals 和 Observable 模式
- **2天**：事件总线和状态机
- **1天**：整体对比和总结

## 📈 预期成果

### 技术成果
- **状态管理对比**：5种主流方案完整实现
- **性能基准测试**：不同方案的性能数据
- **使用场景指南**：每种方案的适用场景
- **最佳实践文档**：生产环境的实施建议

### 学习价值
- **状态管理深度**：从基础到高级的完整覆盖
- **方案对比**：不同方案的优缺点分析
- **实际应用**：真实场景的代码示例
- **开发体验**：不同方案的开发体验对比

## 🔧 技术要求

### 依赖包
```json
{
  "jotai": "^2.6.0",
  "valtio": "^1.13.2",
  "zustand": "^4.4.7",
  "@reduxjs/toolkit": "^2.2.1",
  "react-redux": "^9.1.0"
}
```

### 开发工具
- **Redux DevTools**：Redux 调试工具
- **Jotai DevTools**：原子状态调试
- **Valtio DevTools**：代理状态调试
- **Zustand DevTools**：轻量状态调试

## 📚 参考资料

- [Jotai 官方文档](https://jotai.org/)
- [Valtio 官方文档](https://valtio.pmnd.rs/)
- [Zustand 官方文档](https://docs.pmnd.rs/zustand)
- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)

---

**下一步**：完成状态管理对比后，进入性能优化深化阶段，进一步提升项目的技术深度。