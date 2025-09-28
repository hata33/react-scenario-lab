import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { fileHash, fileName } = await request.json();

		// 这里应该检查数据库或文件系统是否存在该文件
		// 为了演示，我们假设文件不存在
		const exists = false;

		return NextResponse.json({
			success: true,
			exists,
			message: exists ? "文件已存在" : "文件不存在",
		});
	} catch (error) {
		console.error("检查文件失败:", error);
		return NextResponse.json(
			{ success: false, message: "检查文件失败" },
			{ status: 500 },
		);
	}
}
