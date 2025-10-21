"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type {
  Location,
  DeviceOrientation,
  PermissionName,
  PermissionStatusMap,
  VibrationPattern
} from "@/types/mobile";

export default function DeviceAPIContent() {
  const [location, setLocation] = useState<Location | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
  const [vibrationSupported, setVibrationSupported] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatusMap>({
    geolocation: 'prompt',
    camera: 'prompt',
    microphone: 'prompt'
  });
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 检查震动API支持
  useEffect(() => {
    setVibrationSupported('vibrate' in navigator);
  }, []);

  // 显示错误信息
  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  // 获取地理位置
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      showError('您的浏览器不支持地理定位API');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setError(null);
      },
      (error) => {
        console.error('获取位置失败:', error);
        const errorMessage = `获取位置失败: ${error.message}`;
        showError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [showError]);

  // 停止摄像头
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      // 停止所有媒体轨道
      cameraStream.getTracks().forEach(track => {
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
        video: { facingMode: 'environment' },
        audio: false
      });
      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
    } catch (error: any) {
      console.error('摄像头访问失败:', error);
      const errorMessage = `摄像头访问失败: ${error.message || '未知错误'}`;
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
          gamma: event.gamma
        });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    }
  }, []);

  // 震动反馈
  const vibrate = useCallback((pattern: VibrationPattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    } else {
      console.log('您的设备不支持震动API');
    }
  }, []);

  // 检查权限状态
  const checkPermissions = useCallback(async () => {
    const permissions: PermissionName[] = ['geolocation', 'camera', 'microphone'];
    const status: PermissionStatusMap = {
      geolocation: 'prompt',
      camera: 'prompt',
      microphone: 'prompt'
    };

    for (const permission of permissions) {
      try {
        const result = await navigator.permissions.query({ name: permission });
        status[permission] = result.state;
      } catch (error) {
        console.warn(`无法检查 ${permission} 权限:`, error);
        status[permission] = 'prompt';
      }
    }

    setPermissionStatus(status);
  }, []);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            设备API集成
          </h1>
          <p className="text-gray-600 text-lg">
            移动端设备原生功能集成，包括地理位置、摄像头、陀螺仪、震动反馈等API
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-red-500 text-lg">⚠️</div>
              <div>
                <h3 className="font-medium text-red-900">错误提示</h3>
                <p className="text-sm text-red-800 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 权限状态 */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-2">权限状态检查</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {Object.entries(permissionStatus).map(([permission, status]) => (
              <div key={permission} className="flex items-center space-x-2">
                <span className="font-medium text-yellow-800">{permission}:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  status === 'granted'
                    ? 'bg-green-100 text-green-800'
                    : status === 'denied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {status === 'granted' ? '已授权' : status === 'denied' ? '已拒绝' : '未授权'}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={checkPermissions}
            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700"
          >
            刷新权限状态
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 地理位置 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📍 地理位置 API
            </h2>
            <p className="text-gray-600 mb-4">
              获取用户当前位置，支持高精度定位和误差范围
            </p>

            {location ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800">
                  <strong>当前位置:</strong><br />
                  纬度: {location.lat.toFixed(6)}<br />
                  经度: {location.lng.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <p className="text-gray-600">尚未获取位置信息</p>
              </div>
            )}

            <button
              onClick={getLocation}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              获取当前位置
            </button>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • enableHighAccuracy: 高精度定位<br />
                • timeout: 10秒超时<br />
                • maximumAge: 60秒缓存
              </p>
            </div>
          </div>

          {/* 摄像头 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📷 摄像头 API
            </h2>
            <p className="text-gray-600 mb-4">
              访问设备摄像头，支持拍照和视频流
            </p>

            <div className="mb-4">
              {cameraStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 bg-black rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">摄像头未启动</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              {!cameraStream ? (
                <button
                  onClick={startCamera}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  启动摄像头
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  停止摄像头
                </button>
              )}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • facingMode: 'environment' 后置摄像头<br />
                • getUserMedia: 媒体流获取<br />
                • 停止所有轨道释放资源
              </p>
            </div>
          </div>

          {/* 设备方向 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🧭 设备方向 API
            </h2>
            <p className="text-gray-600 mb-4">
              监听设备方向变化，获取陀螺仪数据
            </p>

            {orientation ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
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
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <p className="text-gray-600">设备方向数据暂不可用</p>
                <p className="text-xs text-gray-500 mt-2">
                  (需要在真实设备上测试，或使用开发者工具模拟)
                </p>
              </div>
            )}

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • DeviceOrientationEvent 监听<br />
                • alpha/beta/gamma 三轴数据<br />
                • 需要用户授权和HTTPS环境
              </p>
            </div>
          </div>

          {/* 震动反馈 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📳 震动反馈 API
            </h2>
            <p className="text-gray-600 mb-4">
              提供触觉反馈，增强用户交互体验
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                震动支持状态: {vibrationSupported ? '✅ 支持' : '❌ 不支持'}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => vibrate(200)}
                disabled={!vibrationSupported}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                单次震动 (200ms)
              </button>
              <button
                onClick={() => vibrate([100, 50, 100])}
                disabled={!vibrationSupported}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                震动模式 (100-50-100ms)
              </button>
              <button
                onClick={() => vibrate([0, 50, 100, 150, 200, 100, 50, 0])}
                disabled={!vibrationSupported}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                渐强渐弱模式
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • Vibration API 支持检测<br />
                • 支持单次和模式震动<br />
                • 移动设备原生体验
              </p>
            </div>
          </div>
        </div>

        {/* 实现指南 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-4">🎯 实现要点和最佳实践</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-800">
            <div>
              <h4 className="font-medium mb-2">隐私和安全</h4>
              <ul className="space-y-1">
                <li>• 始终检查API支持性</li>
                <li>• 处理权限被拒绝的情况</li>
                <li>• 提供清晰的权限请求说明</li>
                <li>• 实现优雅的降级方案</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">性能优化</h4>
              <ul className="space-y-1">
                <li>• 及时释放摄像头资源</li>
                <li>• 使用防抖处理位置更新</li>
                <li>• 监听器记得移除</li>
                <li>• 合理设置超时时间</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">用户体验</h4>
              <ul className="space-y-1">
                <li>• 提供加载状态指示</li>
                <li>• 错误信息友好提示</li>
                <li>• 支持手动和自动模式</li>
                <li>• 响应式界面设计</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">兼容性考虑</h4>
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