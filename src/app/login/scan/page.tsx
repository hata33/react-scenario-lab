"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Dynamically import to avoid static generation issues with useSearchParams
function ScanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "valid" | "invalid" | "confirmed"
  >("loading");
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

  const validateQRCode = async (
    sceneId: string,
    timestamp: string,
    nonce: string,
    signature: string,
  ) => {
    try {
      // 验证时间戳
      const now = Date.now();
      const timestampNum = parseInt(timestamp);
      if (now - timestampNum > 1800000) {
        // 30分钟过期
        setStatus("invalid");
        return;
      }

      // 验证签名（这里应该实现与后端一致的签名验证）
      const isValid = await verifySignature(
        sceneId,
        timestamp,
        nonce,
        signature,
      );
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

  const verifySignature = async (
    sceneId: string,
    timestamp: string,
    nonce: string,
    signature: string,
  ): Promise<boolean> => {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl text-gray-800">扫码登录</h1>
          <p className="mt-2 text-gray-600">请在电脑上确认登录</p>
        </div>

        {status === "loading" && (
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-blue-500 border-b-2"></div>
            <p className="text-gray-600">正在验证二维码...</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="text-center">
            <div className="mb-4 text-6xl text-red-500">⚠️</div>
            <h2 className="mb-2 font-semibold text-red-600 text-xl">
              二维码无效
            </h2>
            <p className="mb-4 text-gray-600">二维码已过期或无效，请重新扫描</p>
            <button
              onClick={() => router.back()}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              返回
            </button>
          </div>
        )}

        {status === "valid" && (
          <div className="text-center">
            <div className="mb-4 text-6xl text-green-500">✓</div>
            <h2 className="mb-2 font-semibold text-gray-800 text-xl">
              二维码有效
            </h2>
            <p className="mb-6 text-gray-600">是否允许在当前设备上登录？</p>

            <div className="space-y-3">
              <button
                onClick={handleScan}
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                模拟扫码
              </button>

              <button
                onClick={handleConfirm}
                className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                确认登录
              </button>

              <button
                onClick={() => router.back()}
                className="w-full rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {status === "confirmed" && (
          <div className="text-center">
            <div className="mb-4 text-6xl text-green-500">✓</div>
            <h2 className="mb-2 font-semibold text-gray-800 text-xl">
              登录成功
            </h2>
            <p className="mb-4 text-gray-600">
              {userInfo && `欢迎 ${userInfo.name}`}
            </p>
            <p className="mb-6 text-gray-500 text-sm">请在电脑上查看登录结果</p>
            <button
              onClick={() => router.back()}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              完成
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ScanPage), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-blue-500 border-b-2"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    </div>
  ),
});
