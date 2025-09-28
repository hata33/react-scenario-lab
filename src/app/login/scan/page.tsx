"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "confirmed">("loading");
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const sceneId = searchParams.get("scene");
    const timestamp = searchParams.get("t");
    const nonce = searchParams.get("n");
    const signature = searchParams.get("s");

    if (!sceneId || !timestamp || !nonce || !signature) {
      setStatus("invalid");
      return;
    }

    // 验证二维码有效性
    validateQRCode(sceneId, timestamp, nonce, signature);
  }, [searchParams]);

  const validateQRCode = async (sceneId: string, timestamp: string, nonce: string, signature: string) => {
    try {
      // 验证时间戳
      const now = Date.now();
      const timestampNum = parseInt(timestamp);
      if (now - timestampNum > 1800000) { // 30分钟过期
        setStatus("invalid");
        return;
      }

      // 验证签名（这里应该实现与后端一致的签名验证）
      const isValid = await verifySignature(sceneId, timestamp, nonce, signature);
      if (!isValid) {
        setStatus("invalid");
        return;
      }

      setStatus("valid");
    } catch (error) {
      console.error("验证失败:", error);
      setStatus("invalid");
    }
  };

  const verifySignature = async (sceneId: string, timestamp: string, nonce: string, signature: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/login/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId,
          timestamp,
          nonce,
          signature,
        }),
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("签名验证失败:", error);
      return false;
    }
  };

  const handleConfirm = async () => {
    const sceneId = searchParams.get("scene");
    if (!sceneId) return;

    try {
      // 模拟用户确认（实际应用中应该验证用户登录状态）
      const response = await fetch("/api/login/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId,
          userId: "user1", // 模拟用户ID
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("confirmed");
        setUserInfo(data.userInfo);
      } else {
        alert("确认失败: " + data.message);
      }
    } catch (error) {
      console.error("确认失败:", error);
      alert("确认失败，请重试");
    }
  };

  const handleScan = async () => {
    const sceneId = searchParams.get("scene");
    if (!sceneId) return;

    try {
      const response = await fetch("/api/login/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneId,
          timestamp: Date.now(),
          nonce: Math.random().toString(36).substr(2, 9),
          signature: "test-signature",
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("扫码成功，请在电脑上查看");
      } else {
        alert("扫码失败: " + data.message);
      }
    } catch (error) {
      console.error("扫码失败:", error);
      alert("扫码失败，请重试");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">扫码登录</h1>
          <p className="text-gray-600 mt-2">请在电脑上确认登录</p>
        </div>

        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">正在验证二维码...</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">二维码无效</h2>
            <p className="text-gray-600 mb-4">二维码已过期或无效，请重新扫描</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              返回
            </button>
          </div>
        )}

        {status === "valid" && (
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">二维码有效</h2>
            <p className="text-gray-600 mb-6">是否允许在当前设备上登录？</p>

            <div className="space-y-3">
              <button
                onClick={handleScan}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                模拟扫码
              </button>

              <button
                onClick={handleConfirm}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                确认登录
              </button>

              <button
                onClick={() => router.back()}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {status === "confirmed" && (
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">登录成功</h2>
            <p className="text-gray-600 mb-4">
              {userInfo && `欢迎 ${userInfo.name}`}
            </p>
            <p className="text-sm text-gray-500 mb-6">请在电脑上查看登录结果</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              完成
            </button>
          </div>
        )}
      </div>
    </div>
  );
}