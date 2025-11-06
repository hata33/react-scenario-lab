"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useActivity } from "./hooks";

interface UserPreferences {
	theme: "light" | "dark" | "system";
	language: string;
	fontSize: "small" | "medium" | "large";
	notifications: boolean;
	autoPlay: boolean;
	layout: "grid" | "list";
	itemsPerPage: number;
	recentlyViewed: string[];
	lastActive: string;
}

export default function PageManagementDemo() {
	const initialPreferences: UserPreferences = {
		theme: "system",
		language: "en",
		fontSize: "medium",
		notifications: true,
		autoPlay: false,
		layout: "grid",
		itemsPerPage: 12,
		recentlyViewed: [],
		lastActive: new Date().toISOString(),
	};

	const {
		state: preferences,
		setState: setPreferences,
		clearState: clearPreferences,
		isSyncing,
		lastSync,
	} = useActivity("user-preferences-demo", initialPreferences);
	const [currentPage, setCurrentPage] = useState<string>("home");
	const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
	const [activeTab, setActiveTab] = useState<"appearance" | "behavior" | "content">("appearance");

	const updatePreference = useCallback(
		<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
			const updatedPreferences = {
				...preferences,
				[key]: value,
				lastActive: new Date().toISOString(),
			};
			setPreferences(updatedPreferences);
			setSyncStatus("syncing");
			setTimeout(() => setSyncStatus("synced"), 300);
			setTimeout(() => setSyncStatus("idle"), 2000);
		},
		[preferences, setPreferences],
	);

	const addToRecentlyViewed = useCallback(
		(page: string) => {
			const updated = [...preferences.recentlyViewed];
			const index = updated.indexOf(page);
			if (index > -1) {
				updated.splice(index, 1);
			}
			updated.unshift(page);
			if (updated.length > 5) {
				updated.pop();
			}
			updatePreference("recentlyViewed", updated);
		},
		[preferences.recentlyViewed, updatePreference],
	);

	const navigateTo = useCallback(
		(page: string) => {
			setCurrentPage(page);
			addToRecentlyViewed(page);
		},
		[addToRecentlyViewed],
	);

	const exportPreferences = useCallback(() => {
		const dataStr = JSON.stringify(preferences, null, 2);
		const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
		const exportFileDefaultName = "user-preferences.json";

		const linkElement = document.createElement("a");
		linkElement.setAttribute("href", dataUri);
		linkElement.setAttribute("download", exportFileDefaultName);
		linkElement.click();
	}, [preferences]);

	const importPreferences = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const imported = JSON.parse(e.target?.result as string);
						setPreferences({ ...initialPreferences, ...imported });
						setSyncStatus("synced");
						setTimeout(() => setSyncStatus("idle"), 2000);
					} catch (error) {
						console.error("Failed to import preferences:", error);
					}
				};
				reader.readAsText(file);
			}
		},
		[setPreferences, initialPreferences],
	);

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "activity-user-preferences-demo") {
				setSyncStatus("syncing");
				setTimeout(() => setSyncStatus("synced"), 500);
				setTimeout(() => setSyncStatus("idle"), 2000);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const getSyncStatusIcon = () => {
		switch (syncStatus) {
			case "syncing":
				return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>;
			case "synced":
				return (
					<svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	const themeOptions = [
		{ value: "light", label: "浅色", icon: "☀️" },
		{ value: "dark", label: "深色", icon: "🌙" },
		{ value: "system", label: "系统", icon: "💻" },
	];

	const languageOptions = [
		{ value: "en", label: "English" },
		{ value: "es", label: "Spanish" },
		{ value: "fr", label: "French" },
		{ value: "de", label: "German" },
		{ value: "ja", label: "Japanese" },
		{ value: "zh", label: "中文" },
	];

	const demoPages = [
		{ id: "home", name: "首页", icon: "🏠" },
		{ id: "dashboard", name: "仪表板", icon: "📊" },
		{ id: "profile", name: "个人资料", icon: "👤" },
		{ id: "settings", name: "设置", icon: "⚙️" },
		{ id: "analytics", name: "分析", icon: "📈" },
	];

	return (
		<div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h3 className="mb-2 font-semibold text-gray-900 text-lg">跨页面状态管理演示</h3>
				<p className="mb-4 text-gray-600 text-sm">
					跨不同页面和浏览器会话持久化的用户偏好设置。更改自动同步到所有打开的标签页。
				</p>

				<div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							{isSyncing ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							) : (
								getSyncStatusIcon()
							)}
							<span className="text-gray-700 text-sm">
								{isSyncing || syncStatus === "syncing"
									? "同步偏好设置中..."
									: syncStatus === "synced"
										? "偏好设置已同步到所有标签页"
										: `最后活跃：${new Date(preferences.lastActive).toLocaleString()}`}
							</span>
							{lastSync && !isSyncing && syncStatus === "idle" && (
								<span className="ml-2 text-gray-500 text-xs">• 同步：{lastSync.toLocaleTimeString()}</span>
							)}
						</div>
						<span className="text-gray-500 text-sm">当前页面：{currentPage}</span>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<div className="mb-4 flex items-center justify-between">
					<h4 className="font-medium text-gray-900 text-md">导航演示</h4>
					<span className="text-gray-500 text-sm">点击模拟页面导航</span>
				</div>
				<div className="mb-4 flex flex-wrap gap-2">
					{demoPages.map((page) => (
						<button
							key={page.id}
							onClick={() => navigateTo(page.id)}
							className={`rounded-md px-4 py-2 transition-colors ${
								currentPage === page.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							<span className="mr-2">{page.icon}</span>
							{page.name}
						</button>
					))}
				</div>

				{preferences.recentlyViewed.length > 0 && (
					<div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
						<div className="mb-2 font-medium text-gray-700 text-sm">最近访问：</div>
						<div className="flex flex-wrap gap-2">
							{preferences.recentlyViewed.map((pageId, index) => {
								const page = demoPages.find((p) => p.id === pageId);
								return page ? (
									<span
										key={index}
										className="inline-flex items-center rounded bg-gray-200 px-2 py-1 font-medium text-gray-700 text-xs"
									>
										{page.icon} {page.name}
									</span>
								) : null;
							})}
						</div>
					</div>
				)}
			</div>

			<div className="mb-6">
				<div className="border-gray-200 border-b">
					<nav className="-mb-px flex space-x-8">
						{[
							{ key: "appearance", label: "外观", icon: "🎨" },
							{ key: "behavior", label: "行为", icon: "⚡" },
							{ key: "content", label: "内容", icon: "📝" },
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setActiveTab(tab.key as any)}
								className={`border-b-2 px-1 py-2 font-medium text-sm ${
									activeTab === tab.key
										? "border-indigo-500 text-indigo-600"
										: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
								}`}
							>
								<span className="mr-2">{tab.icon}</span>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				<div className="mt-6 space-y-4">
					{activeTab === "appearance" && (
						<>
							<div>
								<label className="mb-3 block font-medium text-gray-700 text-sm">主题偏好</label>
								<div className="grid grid-cols-3 gap-3">
									{themeOptions.map((theme) => (
										<button
											key={theme.value}
											onClick={() => updatePreference("theme", theme.value as any)}
											className={`rounded-lg border-2 p-3 transition-all ${
												preferences.theme === theme.value
													? "border-indigo-500 bg-indigo-50 text-indigo-700"
													: "border-gray-200 hover:border-gray-300"
											}`}
										>
											<div className="mb-1 text-2xl">{theme.icon}</div>
											<div className="font-medium text-sm">{theme.label}</div>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="mb-3 block font-medium text-gray-700 text-sm">字体大小</label>
								<div className="flex gap-2">
									{[
										{ value: "small", label: "小", preview: "A" },
										{ value: "medium", label: "中", preview: "A" },
										{ value: "large", label: "大", preview: "A" },
									].map((size) => (
										<button
											key={size.value}
											onClick={() => updatePreference("fontSize", size.value as any)}
											className={`flex-1 rounded-lg border-2 p-3 transition-all ${
												preferences.fontSize === size.value
													? "border-indigo-500 bg-indigo-50"
													: "border-gray-200 hover:border-gray-300"
											}`}
										>
											<div
												className={`font-bold ${
													size.value === "small" ? "text-sm" : size.value === "large" ? "text-2xl" : "text-lg"
												}`}
											>
												{size.preview}
											</div>
											<div className="mt-1 text-gray-600 text-sm">{size.label}</div>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">Language</label>
								<select
									value={preferences.language}
									onChange={(e) => updatePreference("language", e.target.value)}
									className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									{languageOptions.map((lang) => (
										<option key={lang.value} value={lang.value}>
											{lang.label}
										</option>
									))}
								</select>
							</div>
						</>
					)}

					{activeTab === "behavior" && (
						<>
							<div className="space-y-3">
								<label className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
									<div>
										<div className="font-medium text-gray-900">推送通知</div>
										<div className="text-gray-500 text-sm">接收浏览器通知</div>
									</div>
									<input
										type="checkbox"
										checked={preferences.notifications}
										onChange={(e) => updatePreference("notifications", e.target.checked)}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
								</label>

								<label className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
									<div>
										<div className="font-medium text-gray-900">Auto-play Videos</div>
										<div className="text-gray-500 text-sm">Automatically play video content</div>
									</div>
									<input
										type="checkbox"
										checked={preferences.autoPlay}
										onChange={(e) => updatePreference("autoPlay", e.target.checked)}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
								</label>
							</div>
						</>
					)}

					{activeTab === "content" && (
						<>
							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">Default Layout</label>
								<div className="grid grid-cols-2 gap-3">
									{[
										{ value: "grid", label: "Grid View", icon: "⊞" },
										{ value: "list", label: "List View", icon: "☰" },
									].map((layout) => (
										<button
											key={layout.value}
											onClick={() => updatePreference("layout", layout.value as any)}
											className={`rounded-lg border-2 p-4 transition-all ${
												preferences.layout === layout.value
													? "border-indigo-500 bg-indigo-50 text-indigo-700"
													: "border-gray-200 hover:border-gray-300"
											}`}
										>
											<div className="mb-2 text-2xl">{layout.icon}</div>
											<div className="font-medium text-sm">{layout.label}</div>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="mb-2 block font-medium text-gray-700 text-sm">
									Items Per Page: {preferences.itemsPerPage}
								</label>
								<input
									type="range"
									min="6"
									max="24"
									step="6"
									value={preferences.itemsPerPage}
									onChange={(e) => updatePreference("itemsPerPage", parseInt(e.target.value))}
									className="w-full"
								/>
								<div className="mt-1 flex justify-between text-gray-500 text-xs">
									<span>6</span>
									<span>12</span>
									<span>18</span>
									<span>24</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between border-gray-200 border-t pt-4">
				<div className="flex gap-3">
					<button
						onClick={exportPreferences}
						className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						Export Preferences
					</button>
					<label className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						Import Preferences
						<input type="file" accept=".json" onChange={importPreferences} className="hidden" />
					</label>
					<button
						onClick={clearPreferences}
						className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
					>
						Reset to Default
					</button>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="mb-1 font-medium text-blue-900">Cross-Page Features:</div>
					<ul className="space-y-1 text-blue-800">
						<li>• Preference persistence across pages</li>
						<li>• Real-time sync across browser tabs</li>
						<li>• Session restoration capabilities</li>
						<li>• User experience continuity</li>
					</ul>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="mb-1 font-medium text-green-900">Testing Scenarios:</div>
					<ul className="space-y-1 text-green-800">
						<li>• Change preferences and navigate</li>
						<li>• Open multiple tabs to see sync</li>
						<li>• Close and reopen browser</li>
						<li>• Export/import preference settings</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
