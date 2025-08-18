import Link from "next/link";

export type MenuItem = { path: string; title?: string; children?: MenuItem[] };

type SidebarProps = {
	menuTree: MenuItem[];
	activePath: string;
};

export default function Sidebar({ menuTree, activePath }: SidebarProps) {
	return (
		<aside className="flex h-screen flex-col border-gray-200 border-r bg-white">
			<div className="shrink-0 border-b px-4 py-4">
				<h1 className="font-semibold text-xl">React Scenario Lab</h1>
				<p className="text-gray-500 text-xs">
					Next.js 15 + React 19 + Tailwind
				</p>
			</div>
			<nav className="grow space-y-4 overflow-y-auto p-3">
				{menuTree.map((group) => (
					<div key={group.title}>
						<div className="px-2 font-medium text-gray-700 text-sm uppercase tracking-wide">
							{group.title}
						</div>
						<ul className="mt-2 space-y-1">
							{group.children?.map((child) => (
								<li key={child.path}>
									<Link
										href={child.path}
										className={`block rounded px-3 py-2 text-sm transition-colors duration-150 ${
											activePath === child.path
												? "bg-gray-900 text-white"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										{child.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>

			{/* 底部提示区域 */}
			<div className="border-t px-4 py-3 text-gray-500 text-xs">
				<p>快捷键: Ctrl/Cmd + B 切换侧边栏</p>
				<p className="mt-1 text-blue-600">点击菜单后侧边栏自动隐藏</p>
			</div>
		</aside>
	);
}
