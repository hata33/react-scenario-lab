"use client";

import React, { useState } from "react";
import {
	ArrowLeft,
	Database,
	CheckCircle,
	Zap,
	Cloud,
	Share2,
	HardDrive
} from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";

interface StateManagementExample {
	id: string;
	title: string;
	description: string;
	library: "React State" | "Context API" | "Zustand" | "Redux Toolkit" | "Recoil" | "Jotai";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	codeSnippet: string;
	benefits: string[];
	features: string[];
	performance: {
		bundleSize: string;
		rerenders: string;
		devExperience: string;
	};
}

const stateManagementExamples: StateManagementExample[] = [
	{
		id: "react-state",
		title: "React 内置状态",
		description: "使用 useState 和 useReducer 管理组件本地状态",
		library: "React State",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// 基础状态管理
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}

// 复杂状态管理
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}

// useReducer 用于复杂状态
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};

function TodoAppWithReducer() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <div>
      <TodoInput onAdd={(text) => dispatch({
        type: 'ADD_TODO',
        payload: { id: Date.now(), text, completed: false }
      })} />
      <TodoList todos={todos} onToggle={(id) => dispatch({
        type: 'TOGGLE_TODO',
        payload: { id }
      })} />
    </div>
  );
}`,
		benefits: ["无需额外依赖", "简单直观", "性能优秀", "TypeScript 支持"],
		features: ["本地状态", "复杂逻辑", "状态派生", "性能优化"],
		performance: {
			bundleSize: "0KB",
			rerenders: "最少",
			devExperience: "优秀"
		}
	},
	{
		id: "context-api",
		title: "React Context API",
		description: "跨组件共享状态，避免 prop drilling",
		library: "Context API",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `// 创建 Context
const ThemeContext = createContext();
const AuthContext = createContext();

// 主题 Context Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 认证 Context Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查用户登录状态
    checkAuthStatus().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (credentials) => {
    const user = await api.login(credentials);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    api.logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 组合多个 Provider
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}

// 使用 Context
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={theme}>
      {user ? (
        <>
          <span>欢迎, {user.name}</span>
          <button onClick={logout}>退出</button>
        </>
      ) : (
        <Link href="/login">登录</Link>
      )}
      <button onClick={toggleTheme}>切换主题</button>
    </nav>
  );
}

// 优化 Context 重渲染
function createOptimizedContext(defaultValue) {
  const context = createContext(defaultValue);
  const Provider = ({ children, ...props }) => {
    const value = useMemo(() => props, Object.values(props));
    return <context.Provider value={value}>{children}</context.Provider>;
  };
  return [context, Provider];
}`,
		benefits: ["内置功能", "跨组件共享", "简单易用", "TypeScript 支持"],
		features: ["状态共享", "避免 prop drilling", "组合 Provider", "性能优化"],
		performance: {
			bundleSize: "0KB",
			rerenders: "可能过多",
			devExperience: "良好"
		}
	},
	{
		id: "zustand",
		title: "Zustand 轻量状态管理",
		description: "简洁、快速、可扩展的状态管理解决方案",
		library: "Zustand",
		difficulty: "初级",
		status: "completed",
		codeSnippet: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 基础 Store
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// 复杂 Store
const useTodoStore = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        filter: 'all',

        addTodo: (text) => set((state) => ({
          todos: [...state.todos, {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
          }]
        })),

        toggleTodo: (id) => set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        })),

        deleteTodo: (id) => set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        })),

        setFilter: (filter) => set({ filter }),

        // 派生状态
        filteredTodos: () => {
          const { todos, filter } = get();
          switch (filter) {
            case 'completed':
              return todos.filter(todo => todo.completed);
            case 'active':
              return todos.filter(todo => !todo.completed);
            default:
              return todos;
          }
        },

        // 统计信息
        stats: () => {
          const { todos } = get();
          return {
            total: todos.length,
            completed: todos.filter(todo => todo.completed).length,
            active: todos.filter(todo => !todo.completed).length
          };
        }
      }),
      {
        name: 'todo-storage', // localStorage key
        partialize: (state) => ({ todos: state.todos }) // 只持久化部分状态
      }
    ),
    { name: 'todo-store' }
  )
);

// 异步操作
const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const user = await api.login(credentials);
      set({ user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => set({ user: null }),

  updateUser: async (updates) => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const updatedUser = await api.updateUser(currentUser.id, updates);
      set({ user: updatedUser });
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

// 在组件中使用
function TodoComponent() {
  const { todos, addTodo, toggleTodo, filteredTodos } = useTodoStore();
  const filter = useTodoStore(state => state.filter);

  return (
    <div>
      <TodoList todos={filteredTodos()} onToggle={toggleTodo} />
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}`,
		benefits: ["极简 API", "TypeScript 优秀", "小包体积", "性能优秀"],
		features: ["持久化", "开发工具", "异步支持", "状态派生"],
		performance: {
			bundleSize: "2.5KB",
			rerenders: "精准",
			devExperience: "优秀"
		}
	},
	{
		id: "redux-toolkit",
		title: "Redux Toolkit 现代状态管理",
		description: "Redux 官方推荐的状态管理工具集",
		library: "Redux Toolkit",
		difficulty: "中级",
		status: "in-progress",
		codeSnippet: `import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 异步 Action
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 创建 Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: 'all'
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  }
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;

// 配置 Store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    auth: authSlice.reducer,
    // ...其他 reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// Selector
export const selectFilteredTodos = createSelector(
  [state => state.todos.items, state => state.todos.filter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

// React Hook
export const useTodos = () => {
  const dispatch = useDispatch();
  const { items, status, error, filter } = useSelector(state => state.todos);

  const filteredTodos = useSelector(selectFilteredTodos);

  const handleAddTodo = useCallback((text) => {
    dispatch(addTodo(text));
  }, [dispatch]);

  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return {
    todos: filteredTodos,
    status,
    error,
    addTodo: handleAddTodo,
    toggleTodo: handleToggleTodo,
    deleteTodo: handleDeleteTodo
  };
};

// 组件使用
function TodoList() {
  const { todos, status, addTodo, toggleTodo } = useTodos();

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}`,
		benefits: ["强大工具集", "优秀开发体验", "中间件支持", "社区成熟"],
		features: ["Redux DevTools", "异步处理", "状态持久化", "选择器优化"],
		performance: {
			bundleSize: "47KB",
			rerenders: "可优化",
			devExperience: "优秀"
		}
	},
	{
		id: "recoil",
		title: "Recoil Facebook 状态管理",
		description: "Facebook 开发的实验性状态管理库",
		library: "Recoil",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// 定义 Atom
export const countState = atom({
  key: 'countState',
  default: 0
});

export const todosState = atom({
  key: 'todosState',
  default: []
});

export const filterState = atom({
  key: 'filterState',
  default: 'all'
});

// 定义 Selector
export const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const todos = get(todosState);
    const filter = get(filterState);

    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
});

export const todosStatsState = selector({
  key: 'todosStatsState',
  get: ({ get }) => {
    const todos = get(todosState);
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      active: todos.filter(todo => !todo.completed).length
    };
  }
});

// 异步 Selector
export const currentUserState = selector({
  key: 'currentUserState',
  get: async () => {
    const response = await fetch('/api/user');
    return response.json();
  }
});

// 组件使用
function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}

function TodoList() {
  const filteredTodos = useRecoilValue(filteredTodosState);
  const setTodos = useSetRecoilState(todosState);
  const setFilter = useSetRecoilState(filterState);

  const addTodo = (text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <FilterButtons setFilter={setFilter} />
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}`,
		benefits: ["原子化状态", "派生状态", "时间旅行", "并发模式"],
		features: ["Atom/Selector", "异步支持", "状态订阅", "性能优化"],
		performance: {
			bundleSize: "38KB",
			rerenders: "精确",
			devExperience: "良好"
		}
	},
	{
		id: "jotai",
		title: "Jotai 原子化状态管理",
		description: "原子化的 React 状态管理库",
		library: "Jotai",
		difficulty: "中级",
		status: "planned",
		codeSnippet: `import { atom, useAtom } from 'jotai';
import { atomWithStorage, atomWithImmer } from 'jotai/utils';

// 基础 Atom
const countAtom = atom(0);

// 复杂对象 Atom
const userAtom = atom({
  name: '',
  email: '',
  preferences: {
    theme: 'light',
    language: 'zh'
  }
});

// 使用 Immer 的 Atom
const todosAtom = atomWithImmer([]);

// 持久化 Atom
const settingsAtom = atomWithStorage('app-settings', {
  theme: 'light',
  language: 'zh',
  notifications: true
});

// 派生 Atom
const filteredTodosAtom = atom(
  (get) => {
    const todos = get(todosAtom);
    return todos.filter(todo => !todo.completed);
  }
);

// 异步 Atom
const userDataAtom = atom(
  async (get) => {
    const userId = get(currentUserIdAtom);
    if (!userId) return null;

    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// 只写 Atom (Action)
const addTodoAtom = atom(
  null,
  (get, set, text) => {
    const todos = get(todosAtom);
    set(todosAtom, [...todos, {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }]);
  }
);

// 组件使用
function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [, addTodo] = useAtom(addTodoAtom);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}`,
		benefits: ["原子化设计", "TypeScript 优秀", "零样板代码", "性能优秀"],
		features: ["依赖追踪", "持久化", "Immer 集成", "Provider 可选"],
		performance: {
			bundleSize: "5KB",
			rerenders: "精确",
			devExperience: "优秀"
		}
	}
];

export default function StateManagementFeaturePage() {
	const [selectedExample, setSelectedExample] = useState<StateManagementExample | null>(null);

	const getLibraryColor = (library: StateManagementExample["library"]) => {
		switch (library) {
			case "React State":
				return "text-blue-600 bg-blue-100";
			case "Context API":
				return "text-green-600 bg-green-100";
			case "Zustand":
				return "text-purple-600 bg-purple-100";
			case "Redux Toolkit":
				return "text-red-600 bg-red-100";
			case "Recoil":
				return "text-cyan-600 bg-cyan-100";
			case "Jotai":
				return "text-orange-600 bg-orange-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: StateManagementExample["difficulty"]) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusColor = (status: StateManagementExample["status"]) => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getStatusText = (status: StateManagementExample["status"]) => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex items-center space-x-4">
							<Link
								href="/nextjs-features"
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								返回特性列表
							</Link>
							<div className="flex items-center space-x-3">
								<Database className="w-8 h-8 text-purple-600" />
								<div>
									<h1 className="text-3xl font-bold text-gray-900">
										状态管理特性
									</h1>
									<p className="text-gray-600">
										Next.js 完整状态管理方案：React State、Context、Zustand、Redux
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 方案对比 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							状态管理方案对比
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Database className="w-6 h-6 text-blue-600" />
								</div>
								<h3 className="font-semibold text-blue-900 mb-2">React State</h3>
								<p className="text-sm text-blue-700">内置状态</p>
								<div className="mt-2 text-xs text-blue-600">
									<div>⚡ 零依赖</div>
									<div>🚀 性能最佳</div>
									<div>📝 简单直观</div>
								</div>
							</div>
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Share2 className="w-6 h-6 text-green-600" />
								</div>
								<h3 className="font-semibold text-green-900 mb-2">Context API</h3>
								<p className="text-sm text-green-700">跨组件共享</p>
								<div className="mt-2 text-xs text-green-600">
									<div>🔄 状态共享</div>
									<div>🛡️ 避免 drilling</div>
									<div>⚙️ 内置功能</div>
								</div>
							</div>
							<div className="text-center p-4 bg-purple-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Zap className="w-6 h-6 text-purple-600" />
								</div>
								<h3 className="font-semibold text-purple-900 mb-2">Zustand</h3>
								<p className="text-sm text-purple-700">轻量级</p>
								<div className="mt-2 text-xs text-purple-600">
									<div>📦 极简 API</div>
									<div>🎯 TypeScript</div>
									<div>⚡ 性能优秀</div>
								</div>
							</div>
							<div className="text-center p-4 bg-red-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<HardDrive className="w-6 h-6 text-red-600" />
								</div>
								<h3 className="font-semibold text-red-900 mb-2">Redux</h3>
								<p className="text-sm text-red-700">工具集</p>
								<div className="mt-2 text-xs text-red-600">
									<div>🛠️ 强大工具</div>
									<div>🔧 DevTools</div>
									<div>📚 成熟生态</div>
								</div>
							</div>
							<div className="text-center p-4 bg-cyan-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Cloud className="w-6 h-6 text-cyan-600" />
								</div>
								<h3 className="font-semibold text-cyan-900 mb-2">Recoil</h3>
								<p className="text-sm text-cyan-700">原子化</p>
								<div className="mt-2 text-xs text-cyan-600">
									<div>⚛️ Facebook</div>
									<div>🎯 原子状态</div>
									<div>🔄 派生状态</div>
								</div>
							</div>
							<div className="text-center p-4 bg-orange-50 rounded-lg">
								<div className="flex items-center justify-center mb-2">
									<Share2 className="w-6 h-6 text-orange-600" />
								</div>
								<h3 className="font-semibold text-orange-900 mb-2">Jotai</h3>
								<p className="text-sm text-orange-700">原子化</p>
								<div className="mt-2 text-xs text-orange-600">
									<div>📦 零样板</div>
									<div>🎯 精确更新</div>
									<div>🛠️ TypeScript</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 状态管理示例 */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">实现示例</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* 左侧：示例列表 */}
						<div className="space-y-4">
							{stateManagementExamples.map((example) => (
								<div
									key={example.id}
									className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
										selectedExample?.id === example.id
											? "ring-2 ring-purple-500"
											: ""
									}`}
									onClick={() => setSelectedExample(example)}
								>
									<div className="p-6">
										<div className="flex items-start justify-between mb-3">
											<div>
												<h3 className="text-lg font-semibold text-gray-900 mb-1">
													{example.title}
												</h3>
												<div className="flex items-center space-x-2 mb-2">
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLibraryColor(
															example.library
														)}`}
													>
														{example.library}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
															example.difficulty
														)}`}
													>
														{example.difficulty}
													</span>
													<span
														className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
															example.status
														)}`}
													>
														{getStatusText(example.status)}
													</span>
												</div>
											</div>
										</div>
										<p className="text-gray-600 mb-4">{example.description}</p>
										<div className="flex items-center justify-between text-sm text-gray-500">
											<div className="flex space-x-4">
												<span>📦 {example.performance.bundleSize}</span>
												<span>🔄 {example.performance.rerenders}</span>
											</div>
											<span>🎯 {example.performance.devExperience}</span>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* 右侧：示例详情 */}
						<div className="lg:sticky lg:top-6">
							{selectedExample ? (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200">
									<div className="p-6 border-b border-gray-200">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-xl font-semibold text-gray-900">
												{selectedExample.title}
											</h3>
											<div className="flex items-center space-x-2">
												<span
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLibraryColor(
														selectedExample.library
													)}`}
												>
													{selectedExample.library}
												</span>
											</div>
										</div>
										<p className="text-gray-600 mb-4">
											{selectedExample.description}
										</p>
										<div className="grid grid-cols-3 gap-4 text-sm">
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">
													包体积
												</div>
												<div className="text-gray-600">
													{selectedExample.performance.bundleSize}
												</div>
											</div>
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">
													重渲染
												</div>
												<div className="text-gray-600">
													{selectedExample.performance.rerenders}
												</div>
											</div>
											<div className="text-center p-2 bg-gray-50 rounded">
												<div className="font-medium text-gray-900">
													开发体验
												</div>
												<div className="text-gray-600">
													{selectedExample.performance.devExperience}
												</div>
											</div>
										</div>
									</div>

									<div className="p-6">
										<h4 className="font-semibold text-gray-900 mb-3">
											代码示例
										</h4>
										<div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6">
											<h5 className="font-medium text-gray-900 mb-2">
												主要优势
											</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>

										<div className="mt-4">
											<h5 className="font-medium text-gray-900 mb-2">
												核心功能
											</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.features.map((feature, index) => (
													<span
														key={index}
														className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
													>
														{feature}
													</span>
												))}
											</div>
										</div>
									</div>

									{selectedExample.status === "completed" && (
										<div className="p-6 bg-green-50 border-t border-green-200">
											<div className="flex items-center space-x-2 text-green-800">
												<CheckCircle className="w-5 h-5" />
												<span className="font-medium">该状态管理方案已完成并可用</span>
											</div>
										</div>
									)}
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
									<Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										选择一个状态管理方案
									</h3>
									<p className="text-gray-600">
										点击左侧的状态管理方案查看详细信息和代码示例
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}