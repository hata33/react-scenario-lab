import { type NextRequest, NextResponse } from "next/server";
import { sessionManager, validateSceneId } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		const { sceneId } = await request.json();

		// 验证参数
		if (!sceneId) {
			return NextResponse.json(
				{
					success: false,
					message: "缺少sceneId参数",
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

		// 获取会话状态
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
			sessionManager.updateSession(sceneId, { state: "expired" });
			return NextResponse.json({
				success: true,
				status: "expired",
				message: "二维码已过期",
				timestamp: Date.now(),
			});
		}

		// 返回当前状态
		const response = {
			success: true,
			status: session.state,
			timestamp: Date.now(),
		};

		// 根据状态添加额外信息
		if (session.state === "confirmed" && session.userId) {
			Object.assign(response, {
				userInfo: {
					id: session.userId,
					// 可以根据需要添加更多用户信息
				},
				deviceInfo: session.deviceInfo,
			});
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error("状态检查失败:", error);
		return NextResponse.json(
			{
				success: false,
				message: "状态检查失败",
			},
			{ status: 500 },
		);
	}
}
