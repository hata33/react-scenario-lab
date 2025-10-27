"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// 类型定义
type Location = {
	lat: number;
	lng: number;
};

type DeviceOrientation = {
	alpha: number;
	beta: number;
	gamma: number;
};

type PermissionName = "geolocation" | "camera" | "microphone";

type PermissionStatusMap = Record<PermissionName, PermissionState>;

type VibrationPattern = number | number[];

export default function DeviceAPIContent() {
	const [location, setLocation] = useState<Location | null>(null);
	const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
	const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
	const [vibrationSupported, setVibrationSupported] = useState<boolean>(false);
	const [permissionStatus, setPermissionStatus] = useState<PermissionStatusMap>({
		geolocation: "prompt",
		camera: "prompt",
		microphone: "prompt",
	});
	const [error, setError] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	// 检查震动API支持
	useEffect(() => {
		setVibrationSupported("vibrate" in navigator);
	}, []);

	// 显示错误信息
	const showError = useCallback((message: string) => {
		setError(message);
		setTimeout(() => setError(null), 5000);
	}, []);

	// 获取地理位置
	const getLocation = useCallback(() => {
		if (!navigator.geolocation) {
			showError("您的浏览器不支持地理定位API");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setError(null);
			},
			(error) => {
				console.error("获取位置失败:", error);
				const errorMessage = `获取位置失败: ${error.message}`;
				showError(errorMessage);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000,
			},
		);
	}, [showError]);

	// 停止摄像头
	const stopCamera = useCallback(() => {
		if (cameraStream) {
			// 停止所有媒体轨道
			cameraStream.getTracks().forEach((track) => {
				track.stop();
			});

			// 清理video元素
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}

			setCameraStream(null);
		}
	}, [cameraStream]);

	// 启动摄像头
	const startCamera = useCallback(async () => {
		try {
			// 先停止现有摄像头
			stopCamera();

			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" },
				audio: false,
			});
			setCameraStream(stream);

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
			setError(null);
		} catch (error: any) {
			console.error("摄像头访问失败:", error);
			const errorMessage = `摄像头访问失败: ${error.message || "未知错误"}`;
			showError(errorMessage);
		}
	}, [showError, stopCamera]);

	// 监听设备方向
	useEffect(() => {
		const handleOrientation = (event: DeviceOrientationEvent) => {
			if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
				setOrientation({
					alpha: event.alpha,
					beta: event.beta,
					gamma: event.gamma,
				});
			}
		};

		if (window.DeviceOrientationEvent) {
			window.addEventListener("deviceorientation", handleOrientation);
			return () => {
				window.removeEventListener("deviceorientation", handleOrientation);
			};
		}
	}, []);

	// 震动反馈
	const vibrate = useCallback((pattern: VibrationPattern) => {
		if ("vibrate" in navigator) {
			navigator.vibrate(pattern);
		} else {
			console.log("您的设备不支持震动API");
		}
	}, []);

	// 检查权限状态
	const checkPermissions = useCallback(async () => {
		const permissions: PermissionName[] = ["geolocation", "camera", "microphone"];
		const status: PermissionStatusMap = {
			geolocation: "prompt",
			camera: "prompt",
			microphone: "prompt",
		};

		for (const permission of permissions) {
			try {
				const result = await navigator.permissions.query({ name: permission });
				status[permission] = result.state;
			} catch (error) {
				console.warn(`无法检查 ${permission} 权限:`, error);
				status[permission] = "prompt";
			}
		}

		setPermissionStatus(status);
	}, []);

	useEffect(() => {
		checkPermissions();
	}, [checkPermissions]);

	return (
		<div className="p-6">
			<div className="mx-auto max-w-6xl">
				{/* 页面标题 */}
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-3xl text-gray-900">设备API集成</h1>
					<p className="text-gray-600 text-lg">移动端设备原生功能集成，包括地理位置、摄像头、陀螺仪、震动反馈等API</p>
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

				{/* 权限状态 */}
				<div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<h3 className="mb-2 font-semibold text-yellow-900">权限状态检查</h3>
					<div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
						{Object.entries(permissionStatus).map(([permission, status]) => (
							<div key={permission} className="flex items-center space-x-2">
								<span className="font-medium text-yellow-800">{permission}:</span>
								<span
									className={`rounded px-2 py-1 font-medium text-xs ${
										status === "granted"
											? "bg-green-100 text-green-800"
											: status === "denied"
												? "bg-red-100 text-red-800"
												: "bg-gray-100 text-gray-800"
									}`}
								>
									{status === "granted" ? "已授权" : status === "denied" ? "已拒绝" : "未授权"}
								</span>
							</div>
						))}
					</div>
					<button
						onClick={checkPermissions}
						className="mt-3 rounded-lg bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
					>
						刷新权限状态
					</button>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* 地理位置 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">📍 地理位置 API</h2>
						<p className="mb-4 text-gray-600">获取用户当前位置，支持高精度定位和误差范围</p>

						{location ? (
							<div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
								<p className="text-green-800">
									<strong>当前位置:</strong>
									<br />
									纬度: {location.lat.toFixed(6)}
									<br />
									经度: {location.lng.toFixed(6)}
								</p>
							</div>
						) : (
							<div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
								<p className="text-gray-600">尚未获取位置信息</p>
							</div>
						)}

						<button
							onClick={getLocation}
							className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							获取当前位置
						</button>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• enableHighAccuracy: 高精度定位
								<br />• timeout: 10秒超时
								<br />• maximumAge: 60秒缓存
							</p>
						</div>
					</div>

					{/* 摄像头 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">📷 摄像头 API</h2>
						<p className="mb-4 text-gray-600">访问设备摄像头，支持拍照和视频流</p>

						<div className="mb-4">
							{cameraStream ? (
								<video ref={videoRef} autoPlay playsInline className="h-48 w-full rounded-lg bg-black object-cover" />
							) : (
								<div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
									<p className="text-gray-500">摄像头未启动</p>
								</div>
							)}
						</div>

						<div className="flex space-x-2">
							{!cameraStream ? (
								<button
									onClick={startCamera}
									className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
								>
									启动摄像头
								</button>
							) : (
								<button
									onClick={stopCamera}
									className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
								>
									停止摄像头
								</button>
							)}
						</div>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• facingMode: 'environment' 后置摄像头
								<br />• getUserMedia: 媒体流获取
								<br />• 停止所有轨道释放资源
							</p>
						</div>
					</div>

					{/* 设备方向 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">🧭 设备方向 API</h2>
						<p className="mb-4 text-gray-600">监听设备方向变化，获取陀螺仪数据</p>

						{orientation ? (
							<div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
								<div className="space-y-2 text-green-800">
									<div className="flex justify-between">
										<span>Alpha (Z轴):</span>
										<span className="font-mono">{orientation.alpha.toFixed(2)}°</span>
									</div>
									<div className="flex justify-between">
										<span>Beta (X轴):</span>
										<span className="font-mono">{orientation.beta.toFixed(2)}°</span>
									</div>
									<div className="flex justify-between">
										<span>Gamma (Y轴):</span>
										<span className="font-mono">{orientation.gamma.toFixed(2)}°</span>
									</div>
								</div>
							</div>
						) : (
							<div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
								<p className="text-gray-600">设备方向数据暂不可用</p>
								<p className="mt-2 text-gray-500 text-xs">(需要在真实设备上测试，或使用开发者工具模拟)</p>
							</div>
						)}

						<div className="rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• DeviceOrientationEvent 监听
								<br />• alpha/beta/gamma 三轴数据
								<br />• 需要用户授权和HTTPS环境
							</p>
						</div>
					</div>

					{/* 震动反馈 */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">📳 震动反馈 API</h2>
						<p className="mb-4 text-gray-600">提供触觉反馈，增强用户交互体验</p>

						<div className="mb-4">
							<p className="mb-2 text-gray-600 text-sm">震动支持状态: {vibrationSupported ? "✅ 支持" : "❌ 不支持"}</p>
						</div>

						<div className="space-y-3">
							<button
								onClick={() => vibrate(200)}
								disabled={!vibrationSupported}
								className="w-full rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								单次震动 (200ms)
							</button>
							<button
								onClick={() => vibrate([100, 50, 100])}
								disabled={!vibrationSupported}
								className="w-full rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								震动模式 (100-50-100ms)
							</button>
							<button
								onClick={() => vibrate([0, 50, 100, 150, 200, 100, 50, 0])}
								disabled={!vibrationSupported}
								className="w-full rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								渐强渐弱模式
							</button>
						</div>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<p className="text-blue-800 text-xs">
								<strong>技术要点:</strong>
								<br />• Vibration API 支持检测
								<br />• 支持单次和模式震动
								<br />• 移动设备原生体验
							</p>
						</div>
					</div>
				</div>

				{/* 实现指南 */}
				<div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
					<h3 className="mb-4 font-semibold text-green-900">🎯 实现要点和最佳实践</h3>
					<div className="grid grid-cols-1 gap-6 text-green-800 text-sm md:grid-cols-2">
						<div>
							<h4 className="mb-2 font-medium">隐私和安全</h4>
							<ul className="space-y-1">
								<li>• 始终检查API支持性</li>
								<li>• 处理权限被拒绝的情况</li>
								<li>• 提供清晰的权限请求说明</li>
								<li>• 实现优雅的降级方案</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-2 font-medium">性能优化</h4>
							<ul className="space-y-1">
								<li>• 及时释放摄像头资源</li>
								<li>• 使用防抖处理位置更新</li>
								<li>• 监听器记得移除</li>
								<li>• 合理设置超时时间</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-2 font-medium">用户体验</h4>
							<ul className="space-y-1">
								<li>• 提供加载状态指示</li>
								<li>• 错误信息友好提示</li>
								<li>• 支持手动和自动模式</li>
								<li>• 响应式界面设计</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-2 font-medium">兼容性考虑</h4>
							<ul className="space-y-1">
								<li>• 检查浏览器支持情况</li>
								<li>• HTTPS环境要求</li>
								<li>• 移动设备特性检测</li>
								<li>• 桌面端降级处理</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
