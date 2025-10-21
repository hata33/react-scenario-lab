"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  CacheStatusMessage,
  NotificationPermissionStatus,
  BeforeInstallPromptEvent
} from "@/types/mobile";

export default function PWAContent() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [swSupported, setSwSupported] = useState<boolean>(false);
  const [swRegistered, setSwRegistered] = useState<boolean>(false);
  const [cacheStatus, setCacheStatus] = useState<CacheStatusMessage[]>([]);
  const [notificationSupported, setNotificationSupported] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermissionStatus>('default');
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

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // 检查Service Worker支持
  useEffect(() => {
    const checkServiceWorkerSupport = () => {
      const supported = 'serviceWorker' in navigator;
      setSwSupported(supported);

      if (supported) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          setSwRegistered(registrations.length > 0);
        }).catch(error => {
          console.warn('检查Service Worker注册状态失败:', error);
        });
      }
    };

    checkServiceWorkerSupport();
  }, []);

  // 检查通知支持
  useEffect(() => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
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

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // 注册Service Worker
  const registerSW = useCallback(async () => {
    if (!swSupported) {
      showError('您的浏览器不支持Service Worker');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker注册成功:', registration);
      setSwRegistered(true);
      setCacheStatus(['Service Worker注册成功']);
      setError(null);
    } catch (error: any) {
      console.error('Service Worker注册失败:', error);
      const errorMessage = `注册失败: ${error.message || '未知错误'}`;
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
      setCacheStatus(['Service Worker已取消注册']);
      setError(null);
    } catch (error: any) {
      console.error('取消注册失败:', error);
      const errorMessage = `取消注册失败: ${error.message || '未知错误'}`;
      setCacheStatus([errorMessage]);
      showError(errorMessage);
    }
  }, [swSupported, showError]);

  // 清除缓存
  const clearCache = useCallback(async () => {
    if (!swRegistered) {
      showError('请先注册Service Worker');
      return;
    }

    try {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
      setCacheStatus(prev => [...prev, '缓存已清除']);
      setError(null);
    } catch (error: any) {
      console.error('清除缓存失败:', error);
      const errorMessage = `清除缓存失败: ${error.message || '未知错误'}`;
      setCacheStatus(prev => [...prev, errorMessage]);
      showError(errorMessage);
    }
  }, [swRegistered, showError]);

  // 请求通知权限
  const requestNotificationPermission = useCallback(async () => {
    if (!notificationSupported) {
      showError('您的浏览器不支持通知功能');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      setError(null);
    } catch (error: any) {
      console.error('请求通知权限失败:', error);
      const errorMessage = `请求通知权限失败: ${error.message || '未知错误'}`;
      showError(errorMessage);
    }
  }, [notificationSupported, showError]);

  // 发送测试通知
  const sendNotification = useCallback(() => {
    if (notificationPermission !== 'granted') {
      showError('请先授权通知权限');
      return;
    }

    try {
      new Notification('测试通知', {
        body: '这是一个测试通知，点击查看详情',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: 'test-notification'
      });
    } catch (error: any) {
      console.error('发送通知失败:', error);
      const errorMessage = `发送通知失败: ${error.message || '未知错误'}`;
      showError(errorMessage);
    }
  }, [notificationPermission, showError]);

  // 安装PWA
  const installPWA = useCallback(async () => {
    if (!installPrompt) {
      showError('安装提示不可用');
      return;
    }

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
        setError(null);
      }
    } catch (error: any) {
      console.error('安装失败:', error);
      const errorMessage = `安装失败: ${error.message || '未知错误'}`;
      showError(errorMessage);
    }
  }, [installPrompt, showError]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PWA功能
          </h1>
          <p className="text-gray-600 text-lg">
            渐进式Web应用功能，包括Service Worker、离线缓存、推送通知等
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

        {/* 状态面板 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg border ${
            isOnline
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                isOnline ? 'text-green-900' : 'text-red-900'
              }`}>
                {isOnline ? '在线' : '离线'}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            swRegistered
              ? 'bg-blue-50 border-blue-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                swRegistered ? 'bg-blue-500' : 'bg-gray-500'
              }`}></div>
              <span className={`font-medium ${
                swRegistered ? 'text-blue-900' : 'text-gray-900'
              }`}>
                Service Worker
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            notificationPermission === 'granted'
              ? 'bg-purple-50 border-purple-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                notificationPermission === 'granted' ? 'bg-purple-500' : 'bg-gray-500'
              }`}></div>
              <span className={`font-medium ${
                notificationPermission === 'granted' ? 'text-purple-900' : 'text-gray-900'
              }`}>
                通知权限
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            isInstalled
              ? 'bg-green-50 border-green-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isInstalled ? 'bg-green-500' : 'bg-orange-500'
              }`}></div>
              <span className={`font-medium ${
                isInstalled ? 'text-green-900' : 'text-orange-900'
              }`}>
                {isInstalled ? '已安装' : '可安装'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Worker */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ⚙️ Service Worker
            </h2>
            <p className="text-gray-600 mb-4">
              离线缓存、后台同步、资源预加载
            </p>

            <div className="space-y-3">
              {!swRegistered ? (
                <button
                  onClick={registerSW}
                  disabled={!swSupported}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  注册 Service Worker
                </button>
              ) : (
                <button
                  onClick={unregisterSW}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  取消注册 Service Worker
                </button>
              )}

              <button
                onClick={clearCache}
                disabled={!swRegistered}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                清除缓存
              </button>
            </div>

            {/* 缓存状态 */}
            {cacheStatus.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">状态信息:</h4>
                {cacheStatus.map((status, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    • {status}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • 离线优先缓存策略<br />
                • 后台数据同步<br />
                • 资源预加载优化
              </p>
            </div>
          </div>

          {/* 推送通知 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔔 推送通知
            </h2>
            <p className="text-gray-600 mb-4">
              实时消息推送、用户提醒、离线通知
            </p>

            <div className="space-y-3">
              {notificationPermission === 'default' && (
                <button
                  onClick={requestNotificationPermission}
                  disabled={!notificationSupported}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  请求通知权限
                </button>
              )}

              {notificationPermission === 'granted' && (
                <button
                  onClick={sendNotification}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  发送测试通知
                </button>
              )}

              {notificationPermission === 'denied' && (
                <div className="w-full p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">
                    通知权限已被拒绝，请在浏览器设置中手动开启
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • Web Push API集成<br />
                • Service Worker处理<br />
                • Rich Notifications支持
              </p>
            </div>
          </div>

          {/* 应用安装 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📱 应用安装
            </h2>
            <p className="text-gray-600 mb-4">
              添加到主屏幕、离线访问、原生体验
            </p>

            {installPrompt && !isInstalled && (
              <button
                onClick={installPWA}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                安装应用
              </button>
            )}

            {isInstalled && (
              <div className="w-full p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  ✅ 应用已安装到您的设备
                </p>
              </div>
            )}

            {!installPrompt && !isInstalled && (
              <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  安装提示不可用（可能已安装或浏览器不支持）
                </p>
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>技术要点:</strong><br />
                • Web App Manifest配置<br />
                • beforeinstallprompt事件<br />
                • 安装状态检测
              </p>
            </div>
          </div>

          {/* PWA特性展示 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🌟 PWA特性
            </h2>
            <p className="text-gray-600 mb-4">
              渐进式增强、可靠快速、沉浸式体验
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">渐进式增强</h3>
                  <p className="text-sm text-gray-600">
                    无论网络状况如何，PWA都能正常工作
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">离线优先</h3>
                  <p className="text-sm text-gray-600">
                    通过Service Worker缓存资源，支持离线访问
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">类原生体验</h3>
                  <p className="text-sm text-gray-600">
                    应用图标、启动画面、全屏模式
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">可发现性</h3>
                  <p className="text-sm text-gray-600">
                    搜索引擎友好，可通过Web App发现
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>优势:</strong><br />
                • 无需应用商店<br />
                • 自动更新<br />
                • 跨平台兼容
              </p>
            </div>
          </div>
        </div>

        {/* 实现指南 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-4">🎯 PWA实现指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-green-800">
            <div>
              <h4 className="font-medium mb-2">基础配置</h4>
              <ul className="space-y-1">
                <li>• 创建 manifest.json</li>
                <li>• 配置Service Worker</li>
                <li>• HTTPS部署要求</li>
                <li>• 注册Service Worker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">缓存策略</h4>
              <ul className="space-y-1">
                <li>• Cache First策略</li>
                <li>• Network First策略</li>
                <li>• Stale-While-Revalidate</li>
                <li>• 动态内容缓存</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">用户体验</h4>
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