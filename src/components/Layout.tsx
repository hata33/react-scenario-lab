"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { routeGroups } from "@/routeDefs";
import BackButton from "./BackButton";
import FirstVisitConfetti from "./FirstVisitConfetti";
import Sidebar, { type MenuItem } from "./Sidebar";

function _flattenRoutesForMenu(routesInput: any[], basePath = ""): MenuItem[] {
	return routesInput.filter(Boolean).map((route) => {
		const currentPath = route.index
			? basePath
			: `${basePath}/${route.path ?? ""}`.replace(/\/+/, "/").replace(/\/$/, "") || "/";
		const item: MenuItem = {
			path: currentPath || "/",
			title: route.meta?.title,
			children: [],
		};
		if (route.children?.length) {
			item.children = _flattenRoutesForMenu(route.children, currentPath === "/" ? "" : currentPath);
		}
		return item;
	});
}

// 为 Next.js 路由生成正确的菜单结构
const menuTree: MenuItem[] = routeGroups.map((group) => ({
	path: `/${group.path}`,
	title: group.title,
	children: group.children.map((child) => ({
		path: `/${group.path}/${child.path}`,
		title: child.title,
	})),
}));

type LayoutProps = {
	children: React.ReactNode;
	showBackButton?: boolean;
	showPadding?: boolean;
};

export default function Layout({ children, showBackButton = true, showPadding = true }: LayoutProps) {
	const pathname = usePathname();
	const activePath = pathname || "/";
	const scrollContainerId = useId();
	// 初始状态：根据 localStorage 决定是否显示侧边栏
	const [pinnedOpen, setPinnedOpen] = useState<boolean>(false);
	const [hoverOpen, setHoverOpen] = useState<boolean>(false);
	const isOpen = pinnedOpen || hoverOpen;

	// 客户端初始化：读取 localStorage 并设置正确的侧边栏状态
	useEffect(() => {
		const handleLoad = () => {
			try {
				const sidebarSeen = localStorage.getItem("sidebarSeen");
				// 只在用户明确要求显示时才打开侧边栏
				const shouldShowSidebar = sidebarSeen === "1";
				setPinnedOpen(shouldShowSidebar);
			} catch {
				setPinnedOpen(false);
			}
		};

		if (typeof window !== "undefined") {
			if (document.readyState === "complete") {
				handleLoad();
			} else {
				window.addEventListener("load", handleLoad);
				return () => window.removeEventListener("load", handleLoad);
			}
		}
	}, []);

	// 快捷键切换侧边栏
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
				e.preventDefault();
				const newState = !pinnedOpen;
				setPinnedOpen(newState);
				setHoverOpen(false);
				// 记住用户的选择
				try {
					localStorage.setItem("sidebarSeen", newState ? "1" : "0");
				} catch { }
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [pinnedOpen]);

	return (
		<div className={`relative grid h-screen grid-cols-[auto_1fr] bg-gray-50`}>
			<FirstVisitConfetti />

			{/* 移动端遮罩层 */}
			{isOpen && (
				<div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={() => setHoverOpen(false)} />
			)}

			{/* 左侧边缘悬停热区：非按钮交互，移到左侧边缘自动显示 */}
			<div
				className="absolute top-0 left-0 z-30 hidden h-full w-2 lg:block"
				onMouseEnter={() => !pinnedOpen && setHoverOpen(true)}
			/>

			{/* 侧栏列容器：响应式设计 */}
			<div
				className={`relative transition-[width] duration-300 ease-in-out ${isOpen ? "w-[280px] md:w-[320px]" : "w-0"} z-30 overflow-hidden`}
				onMouseEnter={() => !pinnedOpen && setHoverOpen(true)}
				onMouseLeave={() => !pinnedOpen && setHoverOpen(false)}
			>
				<div
					className={`absolute inset-0 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full pointer-events-none opacity-0"
						} transition-transform duration-300 ease-in-out`}
				>
					<Sidebar menuTree={menuTree} activePath={activePath} />
				</div>
			</div>

			<main id={scrollContainerId} className="h-full overflow-y-auto bg-gray-50">
				<div className={`relative min-h-full ${showPadding ? "p-4 md:p-6 lg:p-8" : ""}`}>
					{/* 返回按钮 */}
					<BackButton show={showBackButton} className="mb-4" />
					{children}
				</div>
			</main>
		</div>
	);
}
