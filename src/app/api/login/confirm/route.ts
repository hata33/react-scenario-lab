import { type NextRequest, NextResponse } from "next/server";
import { collectDeviceInfo, generateAuthToken } from "@/lib/auth";
import { sessionManager, validateSceneId } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		const {
			sceneId,
			userId,
			deviceInfo: clientDeviceInfo,
		} = await request.json();

		// 验证参数
		if (!sceneId || !userId) {
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

		// 检查会话状态（必须已被扫码）
		if (session.state !== "scanned") {
			return NextResponse.json(
				{
					success: false,
					message: "二维码未被扫描",
				},
				{ status: 400 },
			);
		}

		// 收集设备信息
		const deviceInfo = clientDeviceInfo || (await collectDeviceInfo());

		// 生成登录token
		const token = generateAuthToken(userId, deviceInfo);

		// 更新会话状态
		sessionManager.updateSession(sceneId, {
			state: "confirmed",
			userId,
			token,
			deviceInfo,
		});

		// 获取用户信息（这里使用模拟数据）
		const userInfo = {
			id: userId,
			username: userId === "user1" ? "demo_user" : "test_user",
			email: userId === "user1" ? "demo@example.com" : "test@example.com",
			name: userId === "user1" ? "演示用户" : "测试用户",
			avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
		};

		console.log(`用户登录成功: ${userInfo.name} (${userInfo.email})`);

		return NextResponse.json({
			success: true,
			token,
			userInfo,
			deviceInfo: {
				name: deviceInfo.name,
				platform: deviceInfo.platform,
			},
			timestamp: Date.now(),
		});
	} catch (error) {
		console.error("登录确认失败:", error);
		return NextResponse.json(
			{
				success: false,
				message: "登录确认失败",
			},
			{ status: 500 },
		);
	}
}
