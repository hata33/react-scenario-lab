"use client";

import { useCallback, useEffect, useState } from "react";

interface LoginStatus {
  success: boolean;
  status: "waiting" | "scanned" | "confirmed" | "expired";
  userInfo?: any;
  deviceInfo?: any;
  timestamp: number;
}

interface QRCodeData {
  sceneId: string;
  qrCodeUrl: string;
  expiresAt: number;
}

export default function QRCodeLogin() {
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const [status, setStatus] = useState<
    "waiting" | "scanned" | "confirmed" | "expired"
  >("waiting");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // 生成二维码
  const generateQRCode = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/login/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setQrCodeData(data);
        setStatus("waiting");
        setTimeLeft(Math.floor((data.expiresAt - Date.now()) / 1000));
      } else {
        throw new Error(data.message || "生成二维码失败");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "生成二维码失败");
    } finally {
      setIsLoading(false);
    }
  }, []);
  // 处理登录成功
  const handleLoginSuccess = useCallback((userInfo: any) => {
    // 保存用户信息到localStorage
    localStorage.setItem("user_info", JSON.stringify(userInfo));

    // 显示成功消息
    alert(`登录成功！欢迎 ${userInfo.name}`);

    // 跳转到首页
    window.location.href = "/";
  }, []);

  // 轮询状态
  const pollStatus = useCallback(
    async (sceneId: string) => {
      try {
        const response = await fetch("/api/login/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sceneId }),
        });

        const data: LoginStatus = await response.json();

        if (data.success) {
          setStatus(data.status);

          if (data.status === "confirmed") {
            // 登录成功
            handleLoginSuccess(data.userInfo);
            return;
          }

          if (data.status === "expired") {
            // 二维码过期，停止轮询
            return;
          }
        }
      } catch (error) {
        console.error("轮询失败:", error);
      }

      // 继续轮询
      if (status !== "expired" && status !== "confirmed") {
        setTimeout(() => pollStatus(sceneId), 2000);
      }
    },
    [status, handleLoginSuccess]
  );

  // 刷新二维码
  const refreshQRCode = () => {
    setStatus("waiting");
    generateQRCode();
  };

  // 模拟扫码（用于测试）
  const simulateScan = async () => {
    if (!qrCodeData) return;

    try {
      const response = await fetch("/api/login/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId: qrCodeData.sceneId,
          timestamp: Date.now(),
          nonce: Math.random().toString(36).substr(2, 9),
          signature: "test-signature",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("scanned");

        // 模拟确认登录
        setTimeout(async () => {
          await confirmLogin();
        }, 1000);
      }
    } catch (error) {
      console.error("模拟扫码失败:", error);
    }
  };

  // 模拟确认登录（用于测试）
  const confirmLogin = async () => {
    if (!qrCodeData) return;

    try {
      const response = await fetch("/api/login/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId: qrCodeData.sceneId,
          userId: "user1", // 使用演示用户
        }),
      });

      const data = await response.json();

      if (data.success) {
        handleLoginSuccess(data.userInfo);
      }
    } catch (error) {
      console.error("确认登录失败:", error);
    }
  };

  // 倒计时
  useEffect(() => {
    if (timeLeft > 0 && status === "waiting") {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && status === "waiting") {
      setStatus("expired");
    }
  }, [timeLeft, status]);

  // 初始化
  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  // 开始轮询
  useEffect(() => {
    if (qrCodeData && status === "waiting") {
      pollStatus(qrCodeData.sceneId);
    }
  }, [qrCodeData, status, pollStatus]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* 二维码显示区域 */}
      <div className="flex flex-col items-center space-y-4">
        {isLoading ? (
          <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-100">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : status === "expired" ? (
          <div className="flex h-48 w-48 flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100">
            <div className="text-gray-500">二维码已过期</div>
            <button
              onClick={refreshQRCode}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              刷新二维码
            </button>
          </div>
        ) : qrCodeData ? (
          <div className="relative">
            <img
              src={qrCodeData.qrCodeUrl}
              alt="登录二维码"
              className="h-48 w-48 rounded border border-gray-200"
            />
            {status === "scanned" && (
              <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="mb-1 text-2xl">✓</div>
                  <div className="text-sm">已扫码</div>
                </div>
              </div>
            )}
            {status === "confirmed" && (
              <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="mb-1 text-2xl">✓</div>
                  <div className="text-sm">登录成功</div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* 状态提示 */}
        <div className="text-center">
          <div className="mb-2 text-gray-600 text-sm">
            {status === "waiting" && "请使用手机扫描二维码登录"}
            {status === "scanned" && "扫描成功，请在手机上确认登录"}
            {status === "confirmed" && "登录成功，正在跳转..."}
            {status === "expired" && "二维码已过期，请刷新"}
          </div>

          {status === "waiting" && timeLeft > 0 && (
            <div className="text-gray-500 text-xs">
              二维码有效期: {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="text-center text-red-500 text-sm">
            {error}
            <button
              onClick={refreshQRCode}
              className="ml-2 text-blue-500 underline hover:text-blue-700"
            >
              重试
            </button>
          </div>
        )}

        {/* 测试按钮（开发环境） */}
        {process.env.NODE_ENV === "development" && status === "waiting" && (
          <div className="space-y-2">
            <button
              onClick={simulateScan}
              className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
            >
              模拟扫码（测试）
            </button>
          </div>
        )}
      </div>

      {/* 使用说明 */}
      <div className="space-y-1 text-center text-gray-500 text-xs">
        <p>1. 打开手机相机或扫码软件</p>
        <p>2. 扫描上方二维码</p>
        <p>3. 在手机上确认登录</p>
      </div>
    </div>
  );
}
