import { NextRequest, NextResponse } from "next/server";
import { validateSceneId } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { sceneId, timestamp, nonce, signature } = await request.json();

    // 验证参数
    if (!sceneId || !timestamp || !nonce || !signature) {
      return NextResponse.json({
        success: false,
        message: "缺少必要参数",
      }, { status: 400 });
    }

    // 验证sceneId格式
    if (!validateSceneId(sceneId)) {
      return NextResponse.json({
        success: false,
        message: "无效的sceneId",
      }, { status: 400 });
    }

    // 验证时间戳
    const now = Date.now();
    const timestampNum = parseInt(timestamp);
    if (now - timestampNum > 1800000) { // 30分钟过期
      return NextResponse.json({
        success: false,
        message: "二维码已过期",
      }, { status: 400 });
    }

    // 验证签名（简单实现，实际应用中应该使用HMAC）
    const expectedSignature = generateSignature(sceneId, timestamp, nonce);
    const isValid = signature === expectedSignature;

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "签名验证失败",
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "验证成功",
    });

  } catch (error) {
    console.error("签名验证失败:", error);
    return NextResponse.json({
      success: false,
      message: "验证失败",
    }, { status: 500 });
  }
}

// 生成简单签名（实际应用中应该使用HMAC）
const generateSignature = (sceneId: string, timestamp: string, nonce: string): string => {
  const data = `${sceneId}:${timestamp}:${nonce}`;
  const crypto = require('crypto');
  return crypto
    .createHmac('sha256', process.env.QR_CODE_SECRET || 'default-secret')
    .update(data)
    .digest('hex');
};