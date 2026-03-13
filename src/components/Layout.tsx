"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { routeGroups } from "@/routeDefs";
import BackButton from "./BackButton";
import FirstVisitConfetti from "./FirstVisitConfetti";
import Sidebar, { type MenuItem } from "./Sidebar";

// 移动端断点检测 hook
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
}

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

type MobileHeaderMode = "auto" | "always" | "never";

type LayoutProps = {
	children: React.ReactNode;
	showBackButton?: boolean;
	showPadding?: boolean;
	/** 移动端顶部栏显示模式：auto=智能隐藏, always=始终显示, never=不显示 */
	mobileHeaderMode?: MobileHeaderMode;
};

export default function Layout({
	children,
	showBackButton = true,
	showPadding = true,
	mobileHeaderMode = "auto",
}: LayoutProps) {
	const pathname = usePathname();
	const activePath = pathname || "/";
	const scrollContainerId = useId();
	const isMobile = useIsMobile();
	// 初始状态：根据 localStorage 决定是否显示侧边栏，移动端默认关闭
	const [pinnedOpen, setPinnedOpen] = useState<boolean>(false);
	const [hoverOpen, setHoverOpen] = useState<boolean>(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
	const isOpen = isMobile ? mobileMenuOpen : pinnedOpen || hoverOpen;

	// 客户端初始化：读取 localStorage 并设置正确的侧边栏状态
	useEffect(() => {
		const handleLoad = () => {
			try {
				const sidebarSeen = localStorage.getItem("sidebarSeen");
				// 移动端始终默认关闭，桌面端根据用户选择
				if (isMobile) {
					setPinnedOpen(false);
				} else {
					const shouldShowSidebar = sidebarSeen === "1";
					setPinnedOpen(shouldShowSidebar);
				}
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
	}, [isMobile]);

	// 快捷键切换侧边栏（仅桌面端）
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

	// 监听路由变化，移动端点击菜单后自动关闭侧边栏
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname 用于检测路由变化，isMobile 使用 ref 避免 lint 错误
	useEffect(() => {
		setMobileMenuOpen((prev) => {
			if (isMobile && prev) {
				return false;
			}
			return prev;
		});
	}, [pathname, isMobile]);

	// 根据 mobileHeaderMode 决定是否显示顶部栏
	// auto 模式：首页不显示，子页面显示
	// always 模式：始终显示
	// never 模式：不显示
	const shouldShowMobileHeader = isMobile && (
		mobileHeaderMode === "always" ||
		(mobileHeaderMode === "auto" && activePath !== "/")
	);

	return (
		<div className={`relative grid h-screen grid-cols-[auto_1fr] bg-gray-50`}>
			<FirstVisitConfetti />

			{/* 移动端遮罩层 */}
			{isOpen && isMobile && (
				<div className="fixed inset-0 z-overlay bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
			)}

			{/* 左侧边缘悬停热区：非按钮交互，移到左侧边缘自动显示（仅桌面端） */}
			<div
				className="absolute top-0 left-0 z-sidebar hidden h-full w-2 lg:block"
				onMouseEnter={() => !pinnedOpen && setHoverOpen(true)}
			/>

			{/* 侧栏列容器：响应式设计 */}
			<div
				className={`relative transition-[width] duration-300 ease-in-out ${isOpen ? "w-[280px] md:w-[320px]" : "w-0"
					} z-sidebar overflow-hidden`}
				onMouseEnter={() => !isMobile && !pinnedOpen && setHoverOpen(true)}
				onMouseLeave={() => !isMobile && !pinnedOpen && setHoverOpen(false)}
			>
				<div
					className={`absolute inset-0 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full pointer-events-none opacity-0"
						} transition-transform duration-300 ease-in-out`}
				>
					<Sidebar menuTree={menuTree} activePath={activePath} />
				</div>
			</div>

			<main
				id={scrollContainerId}
				className={`h-full overflow-y-auto bg-gray-50 ${shouldShowMobileHeader ? "pt-14" : ""}`}
			>
				{/* 移动端顶部栏 */}
				{shouldShowMobileHeader && (
					<div className="fixed top-0 right-0 left-0 z-sticky flex items-center justify-between bg-white px-3 py-3 shadow-sm md:hidden">
						<div className="flex items-center gap-2">
							{/* 返回按钮 - 紧凑模式 */}
							{showBackButton && <BackButton show={true} compact={true} />}
							<button
								type="button"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-gray-700 transition-transform hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
								aria-label="Toggle menu"
							>
								<svg
									className={`h-6 w-6 transition-transform duration-200 ${mobileMenuOpen ? "rotate-90" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									{mobileMenuOpen ? (
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									) : (
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
									)}
								</svg>
							</button>
							<div className="ml-1">
								<h1 className="font-bold text-base text-gray-900 sm:text-lg">React Scenario Lab</h1>
							</div>
						</div>

						{/* 右侧功能按钮预留位置 */}
						<div className="flex items-center gap-1.5">
							<button
								type="button"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-transform hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
								aria-label="Search"
							>
								<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
							<button
								type="button"
								className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
								aria-label="User menu"
							>
								<svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				)}

				{/* 内容区域 - 移动端边距更窄，内容更宽 */}
				<div className={`relative min-h-full bg-white`}>
					{/* 返回按钮 - 移动端顶部栏有返回按钮时隐藏 */}
					<BackButton show={showBackButton && !shouldShowMobileHeader} className="m-4" />
					{children}
				</div>
			</main>
		</div>
	);
} 