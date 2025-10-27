"use client";

import { useCallback, useEffect, useState } from "react";

// 类型定义
type CacheStatusMessage = string;
type NotificationPermissionStatus = NotificationPermission;

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

export default function PWAContent() {
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const [swSupported, setSwSupported] = useState<boolean>(false);
	const [swRegistered, setSwRegistered] = useState<boolean>(false);
	const [cacheStatus, setCacheStatus] = useState<CacheStatusMessage[]>([]);
	const [notificationSupported, setNotificationSupported] = useState<boolean>(false);
	const [notificationPermission, setNotificationPermission] = useState<NotificationPermissionStatus>("default");
	const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
	const [isInstalled, setIsInstalled] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// 显示错误信息
	const showError = useCallback((message: string) => {
		setError(message);
		setTimeout(() => setError(null), 5000);
	}, []);

	// 检查在线状态
	useEffect(() => {
		const updateOnlineStatus = () => {
			setIsOnline(navigator.onLine);
		};

		updateOnlineStatus();

		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, []);

	// 检查Service Worker支持
	useEffect(() => {
		const checkServiceWorkerSupport = () => {
			const supported = "serviceWorker" in navigator;
			setSwSupported(supported);

			if (supported) {
				navigator.serviceWorker
					.getRegistrations()
					.then((registrations) => {
						setSwRegistered(registrations.length > 0);
					})
					.catch((error) => {
						console.warn("检查Service Worker注册状态失败:", error);
					});
			}
		};

		checkServiceWorkerSupport();
	}, []);

	// 检查通知支持
	useEffect(() => {
		const supported = "Notification" in window && "serviceWorker" in navigator;
		setNotificationSupported(supported);

		if (supported) {
			setNotificationPermission(Notification.permission);
		}
	}, []);

	// 监听安装提示
	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setInstallPrompt(e as BeforeInstallPromptEvent);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);

	// 注册Service Worker
	const registerSW = useCallback(async () => {
		if (!swSupported) {
			showError("您的浏览器不支持Service Worker");
			return;
		}

		try {
			const registration = await navigator.serviceWorker.register("/sw.js");
			console.log("Service Worker注册成功:", registration);
			setSwRegistered(true);
			setCacheStatus(["Service Worker注册成功"]);
			setError(null);
		} catch (error: any) {
			console.error("Service Worker注册失败:", error);
			const errorMessage = `注册失败: ${error.message || "未知错误"}`;
			setCacheStatus([errorMessage]);
			showError(errorMessage);
		}
	}, [swSupported, showError]);

	// 取消注册Service Worker
	const unregisterSW = useCallback(async () => {
		if (!swSupported) return;

		try {
			const registrations = await navigator.serviceWorker.getRegistrations();
			for (const registration of registrations) {
				await registration.unregister();
			}
			setSwRegistered(false);
			setCacheStatus(["Service Worker已取消注册"]);
			setError(null);
		} catch (error: any) {
			console.error("取消注册失败:", error);
			const errorMessage = `取消注册失败: ${error.message || "未知错误"}`;
			setCacheStatus([errorMessage]);
			showError(errorMessage);
		}
	}, [swSupported, showError]);

	// 清除缓存
	const clearCache = useCallback(async () => {
		if (!swRegistered) {
			showError("请先注册Service Worker");
			return;
		}

		try {
			const cacheNames = await caches.keys();
			for (const cacheName of cacheNames) {
				await caches.delete(cacheName);
			}
			setCacheStatus((prev) => [...prev, "缓存已清除"]);
			setError(null);
		} catch (error: any) {
			console.error("清除缓存失败:", error);
			const errorMessage = `清除缓存失败: ${error.message || "未知错误"}`;
			setCacheStatus((prev) => [...prev, errorMessage]);
			showError(errorMessage);
		}
	}, [swRegistered, showError]);

	// 请求通知权限
	const requestNotificationPermission = useCallback(async () => {
		if (!notificationSupported) {
			showError("您的浏览器不支持通知功能");
			return;
		}

		try {
			const permission = await Notification.requestPermission();
			setNotificationPermission(permission);
			setError(null);
		} catch (error: any) {
			console.error("请求通知权限失败:", error);
			const errorMessage = `请求通知权限失败: ${error.message || "未知错误"}`;
			showError(errorMessage);
		}
	}, [notificationSupported, showError]);

	// 发送测试通知
	const sendNotification = useCallback(() => {
		if (notificationPermission !== "granted") {
			showError("请先授权通知权限");
			return;
		}

		try {
			new Notification("测试通知", {
				body: "这是一个测试通知，点击查看详情",
				icon: "/icon-192x192.png",
				badge: "/icon-192x192.png",
				tag: "test-notification",
			});
		} catch (error: any) {
			console.error("发送通知失败:", error);
			const errorMessage = `发送通知失败: ${error.message || "未知错误"}`;
			showError(errorMessage);
		}
	}, [notificationPermission, showError]);

	// 安装PWA
	const installPWA = useCallback(async () => {
		if (!installPrompt) {
			showError("安装提示不可用");
			return;
		}

		try {
			await installPrompt.prompt();
			const { outcome } = await installPrompt.userChoice;

			if (outcome === "accepted") {
				setIsInstalled(true);
				setInstallPrompt(null);
				setError(null);
			}
		} catch (error: any) {
			console.error("安装失败:", error);
			const errorMessage = `安装失败: ${error.message || "未知错误"}`;
			showError(errorMessage);
		}
	}, [installPrompt, showError]);

	return (
		<div className="p-6">
			<div className="mx-auto max-w-6xl">
				{/* 页面标题 */}
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-3xl text-gray-900">PWA功能</h1>
					<p className="text-gray-600 text-lg">渐进式Web应用功能，包括Service Worker、离线缓存、推送通知等</p>
				</div>

				{/* 错误提示 */}
				{error && (
					<div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
						<div className="flex items-start space-x-3">
							<div className="text-lg text-red-500">⚠️</div>
							<div>
								<h3 className="font-medium text-red-900">错误提示</h3>
								<p className="mt-1 text-red-800 text-sm">{error}</p>
							</div>
							<button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
								✕
							</button>
						</div>
					</div>
				)}

				{/* 状态面板 */}
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
					<div
						className={`rounded-lg border p-4 ${isOnline ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
					>
						<div className="flex items-center space-x-2">
							<div className={`h-3 w-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
							<span className={`font-medium ${isOnline ? "text-green-900" : "text-red-900"}`}>
								{isOnline ? "在线" : "离线"}
							</span>
						</div>
					</div>

					<div
						className={`rounded-lg border p-4 ${swRegistered ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
					>
						<div className="flex items-center space-x-2">
							<div className={`h-3 w-3 rounded-full ${swRegistered ? "bg-blue-500" : "bg-gray-500"}`}></div>
							<span className={`font-medium ${swRegistered ? "text-blue-900" : "text-gray-900"}`}>Service Worker</span>
						</div>
					</div>

					<div
						className={`rounded-lg border p-4 ${
							notificationPermission === "granted" ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-gray-50"
						}`}
					>
						<div className="flex items-center space-x-2">
							<div
								className={`h-3 w-3 rounded-full ${notificationPermission === "granted" ? "bg-purple-500" : "bg-gray-500"}`}
							></div>
							<span
								className={`font-medium ${notificationPermission === "granted" ? "text-purple-900" : "text-gray-900"}`}
							>
								通知权限
							</span>
						</div>
					</div>

					<div
						className={`rounded-lg border p-4 ${isInstalled ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
					>
						<div className="flex items-center space-x-2">
							<div className={`h-3 w-3 rounded-full ${isInstalled ? "bg-green-500" : "bg-orange-500"}`}></div>
							<span className={`font-medium ${isInstalled ? "text-green-900" : "text-orange-900"}`}>
								{isInstalled ? "已安装" : "可安装"}
							</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Service Worker */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">⚙️ Service Worker</h2>
						<p className="mb-4 text-gray-600">离线缓存、后台同步、资源预加载</p>

						<div className="space-y-3">
							{!swRegistered ? (
								<button
									onClick={registerSW}
									disabled={!swSupported}
									className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
								>
									注册 Service Worker
								</button>
							) : (
								<button
									onClick={unregisterSW}
									className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
								>
									取消注册 Service Worker
								</button>
							)}

							<button
								onClick={clearCache}
								disabled={!swRegistered}
								className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								清除缓存
							</button>
						</div>

						{/* 缓存状态 */}
						{cacheStatus.length > 0 && (
							<div className="mt-4 rounded-lg bg-gray-50 p-3">
								<h4 className="mb-2 font-medium text-gray-900">状态信息:</h4>
								{cacheStatus.map((status, index) => (
									<p key={index} className="text-gray-600 text-sm">
										• {status}
									</p>
								))}
							</div>
						)}

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• 离线优先缓存策略
								<br />• 后台数据同步
								<br />• 资源预加载优化
							</p>
						</div>
					</div>

					{/* 推送通知 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">🔔 推送通知</h2>
						<p className="mb-4 text-gray-600">实时消息推送、用户提醒、离线通知</p>

						<div className="space-y-3">
							{notificationPermission === "default" && (
								<button
									onClick={requestNotificationPermission}
									disabled={!notificationSupported}
									className="w-full rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-300"
								>
									请求通知权限
								</button>
							)}

							{notificationPermission === "granted" && (
								<button
									onClick={sendNotification}
									className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
								>
									发送测试通知
								</button>
							)}

							{notificationPermission === "denied" && (
								<div className="w-full rounded-lg border border-red-200 bg-red-50 p-3">
									<p className="text-red-800 text-sm">通知权限已被拒绝，请在浏览器设置中手动开启</p>
								</div>
							)}
						</div>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• Web Push API集成
								<br />• Service Worker处理
								<br />• Rich Notifications支持
							</p>
						</div>
					</div>

					{/* 应用安装 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">📱 应用安装</h2>
						<p className="mb-4 text-gray-600">添加到主屏幕、离线访问、原生体验</p>

						{installPrompt && !isInstalled && (
							<button
								onClick={installPWA}
								className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
							>
								安装应用
							</button>
						)}

						{isInstalled && (
							<div className="w-full rounded-lg border border-green-200 bg-green-50 p-3">
								<p className="text-green-800 text-sm">✅ 应用已安装到您的设备</p>
							</div>
						)}

						{!installPrompt && !isInstalled && (
							<div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3">
								<p className="text-gray-600 text-sm">安装提示不可用（可能已安装或浏览器不支持）</p>
							</div>
						)}

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• Web App Manifest配置
								<br />• beforeinstallprompt事件
								<br />• 安装状态检测
							</p>
						</div>
					</div>

					{/* PWA特性展示 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">🌟 PWA特性</h2>
						<p className="mb-4 text-gray-600">渐进式增强、可靠快速、沉浸式体验</p>

						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
									<span className="text-green-600 text-xs">✓</span>
								</div>
								<div>
									<h3 className="font-medium text-gray-900">渐进式增强</h3>
									<p className="text-gray-600 text-sm">无论网络状况如何，PWA都能正常工作</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
									<span className="text-green-600 text-xs">✓</span>
								</div>
								<div>
									<h3 className="font-medium text-gray-900">离线优先</h3>
									<p className="text-gray-600 text-sm">通过Service Worker缓存资源，支持离线访问</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
									<span className="text-green-600 text-xs">✓</span>
								</div>
								<div>
									<h3 className="font-medium text-gray-900">类原生体验</h3>
									<p className="text-gray-600 text-sm">应用图标、启动画面、全屏模式</p>
								</div>
							</div>

							<div className="flex items-start space-x-3">
								<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
									<span className="text-green-600 text-xs">✓</span>
								</div>
								<div>
									<h3 className="font-medium text-gray-900">可发现性</h3>
									<p className="text-gray-600 text-sm">搜索引擎友好，可通过Web App发现</p>
								</div>
							</div>
						</div>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>优势:</strong>
								<br />• 无需应用商店
								<br />• 自动更新
								<br />• 跨平台兼容
							</p>
						</div>
					</div>
				</div>

				{/* 实现指南 */}
				<div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
					<h3 className="mb-4 font-semibold text-green-900">🎯 PWA实现指南</h3>
					<div className="grid grid-cols-1 gap-6 text-green-800 text-sm md:grid-cols-3">
						<div>
							<h4 className="mb-2 font-medium">基础配置</h4>
							<ul className="space-y-1">
								<li>• 创建 manifest.json</li>
								<li>• 配置Service Worker</li>
								<li>• HTTPS部署要求</li>
								<li>• 注册Service Worker</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-2 font-medium">缓存策略</h4>
							<ul className="space-y-1">
								<li>• Cache First策略</li>
								<li>• Network First策略</li>
								<li>• Stale-While-Revalidate</li>
								<li>• 动态内容缓存</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-2 font-medium">用户体验</h4>
							<ul className="space-y-1">
								<li>• 加载状态指示</li>
								<li>• 离线友好提示</li>
								<li>• 安装引导</li>
								<li>• 更新通知</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
