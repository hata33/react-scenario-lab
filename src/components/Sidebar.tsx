import Link from "next/link";
import { useEffect, useState } from "react";

export type MenuItem = { path: string; title?: string; children?: MenuItem[] };

type SidebarProps = {
	menuTree: MenuItem[];
	activePath: string;
};

export default function Sidebar({ menuTree, activePath }: SidebarProps) {
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

	// 自动展开当前激活路径所在的分组
	useEffect(() => {
		const currentGroup = menuTree.find((group) =>
			group.children?.some((child) => child.path === activePath),
		);
		if (currentGroup?.title) {
			setExpandedGroups((prev: any) => new Set([...prev, currentGroup.title]));
		}
	}, [activePath, menuTree]);

	const toggleGroup = (title: string) => {
		const newExpanded = new Set(expandedGroups);
		if (newExpanded.has(title)) {
			newExpanded.delete(title);
		} else {
			newExpanded.add(title);
		}
		setExpandedGroups(newExpanded);
	};

	return (
		<aside className="flex h-full flex-col border-gray-200 border-r bg-white">
			{/* Logo和首页按钮区域 */}
			<div className="shrink-0 border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="font-bold text-gray-900 text-xl">
							React Scenario Lab
						</h1>
						<p className="text-gray-600 text-sm">
							Next.js 15 + React 19 + Tailwind
						</p>
					</div>
				</div>

				{/* 首页按钮 - PC和移动端都显示 */}
				<Link
					href="/"
					className={`flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 font-semibold text-sm transition-all duration-200 ${activePath === "/"
							? "scale-105 transform bg-blue-600 text-white shadow-md"
							: "border border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
						}`}
				>
					<svg
						className="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					<span>首页</span>
					{activePath === "/" && (
						<svg
							className="h-4 w-4 animate-pulse"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</Link>
			</div>

			{/* 导航菜单区域 */}
			<nav className="grow overflow-y-auto">
				<div className="space-y-6 p-4">
					{menuTree.map((group) => (
						<div key={group.title} className="space-y-3">
							{/* 移动端可折叠的分组标题 */}
							<button
								type="button"
								onClick={() => toggleGroup(group.title || "")}
								className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium transition-all duration-200 ${expandedGroups.has(group.title || "")
										? "border-blue-600 border-l-4 bg-blue-50 text-blue-700"
										: "text-gray-700 hover:bg-gray-50"
									} focus:outline-none focus:ring-2 focus:ring-blue-500`}
							>
								<span className="font-semibold text-sm uppercase tracking-wider">
									{group.title}
								</span>
								<svg
									className={`h-4 w-4 transform transition-transform duration-200 ${expandedGroups.has(group.title || "")
											? "rotate-180 text-blue-600"
											: "text-gray-400"
										}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{/* 菜单项 */}
							<ul
								className={`space-y-2 transition-all duration-300 ${expandedGroups.has(group.title || "")
										? "max-h-[1000px] opacity-100"
										: "max-h-0 overflow-hidden opacity-70"
									} md:opacity-100`}
							>
								{group.children?.map((child) => {
									const isActive = activePath === child.path;
									return (
										<li key={child.path}>
											<Link
												href={child.path}
												className={`group relative flex touch-manipulation items-center overflow-hidden rounded-lg px-4 py-3 font-medium text-sm transition-all duration-200 ${isActive
														? "scale-105 transform bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
														: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
													}`}
											>
												{/* 选中状态的背景动画 */}
												{isActive && (
													<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-600 to-blue-700 opacity-20" />
												)}

												<span className="flex min-h-[44px] flex-1 items-center font-medium">
													{child.title}
												</span>
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</nav>

			{/* 底部提示区域 */}
			<div className="border-t bg-gradient-to-t from-gray-50 to-white px-6 py-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-gray-600 text-sm">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
							/>
						</svg>
						<span>
							<span className="font-medium">快捷键:</span> Ctrl/Cmd + B
						</span>
					</div>
					<div className="flex items-center gap-2 text-blue-600 text-sm">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>点击菜单后侧边栏自动隐藏</span>
					</div>
				</div>
			</div>
		</aside>
	);
}
