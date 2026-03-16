"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 创建 Context
type Theme = "light" | "dark";
const ThemeContext = createContext<Theme | undefined>(undefined);

type User = {
	id: number;
	name: string;
	email: string;
	role: string;
};

const UserContext = createContext<User | null>(null);

// 主题提供者组件
function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={theme}>
			<div className={theme}>
				{children}
				<button
					onClick={toggleTheme}
					className="fixed top-4 right-4 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
				>
					切换主题
				</button>
			</div>
		</ThemeContext.Provider>
	);
}

// 用户提供者组件
function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const login = (name: string, email: string) => {
		setUser({
			id: Date.now(),
			name,
			email,
			role: "user",
		});
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider value={user}>
			{children}
			<div className="mb-4 rounded-lg bg-gray-100 p-4">
				{user ? (
					<div className="flex items-center justify-between">
						<span className="text-sm">当前用户: {user.name}</span>
						<button onClick={logout} className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
							登出
						</button>
					</div>
				) : (
					<div className="text-center">
						<p className="mb-2 text-gray-600 text-sm">未登录</p>
						<button
							onClick={() => login("John Doe", "john@example.com")}
							className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
						>
							登录
						</button>
					</div>
				)}
			</div>
		</UserContext.Provider>
	);
}

// 自定义 Hook 用于消费 Context
function useTheme() {
	return useContext(ThemeContext);
}

function useUser() {
	return useContext(UserContext);
}

// 消费者组件
function ThemeDisplay() {
	const theme = useTheme();

	return (
		<div className="rounded-lg bg-gray-50 p-4">
			<h5 className="mb-2 font-medium text-gray-900">当前主题</h5>
			<div className="flex items-center gap-2">
				<div className={`h-4 w-4 rounded ${theme === "light" ? "bg-yellow-400" : "bg-gray-800"}`}></div>
				<span className="text-sm capitalize">{theme}</span>
			</div>
		</div>
	);
}

function UserDisplay() {
	const user = useUser();

	return (
		<div className="rounded-lg bg-blue-50 p-4">
			<h5 className="mb-2 font-medium text-blue-900">用户信息</h5>
			{user ? (
				<div className="space-y-1">
					<p className="text-sm">
						<strong>姓名:</strong> {user.name}
					</p>
					<p className="text-sm">
						<strong>邮箱:</strong> {user.email}
					</p>
					<p className="text-sm">
						<strong>角色:</strong> {user.role}
					</p>
				</div>
			) : (
				<p className="text-gray-500 text-sm">请先登录</p>
			)}
		</div>
	);
}

export default function ContextIntegrationDemo() {
	const [_mounted, setMounted] = useState(false);

	// 模拟使用 use Hook 消费 Context
	const _theme = useTheme();
	const _user = useUser();

	// 组件挂载后设置状态
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">Context 集成演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<p className="text-gray-600 text-sm">
						这个演示展示了如何使用自定义 Hook 消费 Context，而不是在组件中直接使用 useContext。
					</p>

					<ThemeProvider>
						<UserProvider>
							<div className="grid gap-4">
								<ThemeDisplay />
								<UserDisplay />
							</div>
						</UserProvider>
					</ThemeProvider>

					<div className="rounded-lg bg-purple-50 p-3">
						<h5 className="mb-2 font-medium text-purple-800">🎯 Context 集成优势:</h5>
						<ul className="space-y-1 text-purple-700 text-sm">
							<li>• 封装 Context 逻辑</li>
							<li>• 提供默认值处理</li>
							<li>• 简化组件代码</li>
							<li>• 更好的测试支持</li>
						</ul>
					</div>

					<div className="rounded-lg bg-yellow-50 p-3">
						<h5 className="mb-2 font-medium text-yellow-800">💡 使用建议:</h5>
						<ul className="space-y-1 text-sm text-yellow-700">
							<li>• 为复杂 Context 创建自定义 Hook</li>
							<li>• 在 Hook 中提供默认值</li>
							<li>• 分离关注点，提高可维护性</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
