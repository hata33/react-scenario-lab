import { type NextRequest, NextResponse } from "next/server";
import { generateLoginQRCode } from "@/lib/qrcode";
import { sessionManager } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		// 生成二维码，传递请求对象以获取正确的Host信息
		const qrData = await generateLoginQRCode(request);

		// 创建会话
		sessionManager.createSession(qrData.sceneId, request);

		return NextResponse.json({
			success: true,
			sceneId: qrData.sceneId,
			qrCodeUrl: qrData.qrCodeUrl,
			expiresAt: qrData.expiresAt,
			timestamp: Date.now(),
		});
	} catch (error) {
		console.error("生成二维码失败:", error);
		return NextResponse.json({ success: false, message: "生成二维码失败" }, { status: 500 });
	}
}
