import { NextRequest, NextResponse } from "next/server";
import { validateSceneId } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { sceneId, timestamp, nonce, signature } = await request.json();

    // 调试日志
    console.log('验证请求参数:', { sceneId, timestamp, nonce: nonce?.substring(0, 8) + '...', signature: signature?.substring(0, 8) + '...' });

    // 验证参数
    if (!sceneId || !timestamp || !nonce || !signature) {
      console.log('缺少必要参数:', { sceneId: !!sceneId, timestamp: !!timestamp, nonce: !!nonce, signature: !!signature });
      return NextResponse.json({
        success: false,
        message: "缺少必要参数",
      }, { status: 400 });
    }

    // 验证sceneId格式
    if (!validateSceneId(sceneId)) {
      console.log('无效的sceneId:', sceneId);
      return NextResponse.json({
        success: false,
        message: "无效的sceneId",
      }, { status: 400 });
    }

    // 验证时间戳
    const now = Date.now();
    const timestampNum = parseInt(timestamp);
    if (now - timestampNum > 1800000) { // 30分钟过期
      console.log('二维码已过期:', { now, timestamp: timestampNum, diff: now - timestampNum });
      return NextResponse.json({
        success: false,
        message: "二维码已过期",
      }, { status: 400 });
    }

    // 验证签名（简单实现，实际应用中应该使用HMAC）
    const expectedSignature = generateSignature(sceneId, timestamp, nonce);
    const isValid = signature === expectedSignature;

    console.log('签名验证:', {
      received: signature?.substring(0, 8) + '...',
      expected: expectedSignature?.substring(0, 8) + '...',
      isValid,
      secretKey: process.env.QR_CODE_SECRET ? '已设置' : '未设置（使用默认值）'
    });

    if (!isValid) {
      console.log('签名验证失败');
      return NextResponse.json({
        success: false,
        message: "签名验证失败",
      }, { status: 400 });
    }

    console.log('签名验证成功');
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