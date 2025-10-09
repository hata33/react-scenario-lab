import { type NextRequest, NextResponse } from "next/server";
import { sessionManager, validateSceneId } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		const { sceneId, timestamp, nonce, signature } = await request.json();

		// 验证参数
		if (!sceneId || !timestamp || !nonce || !signature) {
			return NextResponse.json(
				{
					success: false,
					message: "缺少必要参数",
				},
				{ status: 400 },
			);
		}

		// 验证sceneId格式
		if (!validateSceneId(sceneId)) {
			return NextResponse.json(
				{
					success: false,
					message: "无效的sceneId",
				},
				{ status: 400 },
			);
		}

		// 获取会话
		const session = sessionManager.getSession(sceneId);

		if (!session) {
			return NextResponse.json(
				{
					success: false,
					message: "会话不存在或已过期",
				},
				{ status: 404 },
			);
		}

		// 检查会话是否过期
		if (!sessionManager.isSessionValid(sceneId)) {
			return NextResponse.json(
				{
					success: false,
					message: "二维码已过期",
				},
				{ status: 400 },
			);
		}

		// 检查是否已被扫描
		if (session.state !== "waiting") {
			return NextResponse.json(
				{
					success: false,
					message: "二维码已被扫描",
				},
				{ status: 400 },
			);
		}

		// 更新会话状态为已扫描
		sessionManager.updateSession(sceneId, {
			state: "scanned",
		});

		console.log(`二维码已被扫描: ${sceneId}`);

		return NextResponse.json({
			success: true,
			message: "扫码成功",
			sceneId,
			timestamp: Date.now(),
		});
	} catch (error) {
		console.error("扫码处理失败:", error);
		return NextResponse.json(
			{
				success: false,
				message: "扫码处理失败",
			},
			{ status: 500 },
		);
	}
}
