import { access, constants } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

// 配置上传目录
const UPLOAD_BASE_DIR = process.env.UPLOAD_BASE_DIR || join(process.cwd(), "..", "uploads");

export async function POST(request: NextRequest) {
	try {
		const { fileHash, fileName } = await request.json();

		if (!fileHash || !fileName) {
			return NextResponse.json({ success: false, message: "缺少必要参数" }, { status: 400 });
		}

		// 检查文件是否已存在于uploads目录
		const filePath = join(UPLOAD_BASE_DIR, fileName);

		try {
			await access(filePath, constants.F_OK);
			// 文件存在
			return NextResponse.json({
				success: true,
				exists: true,
				message: "文件已存在",
			});
		} catch (error) {
			// 文件不存在
			return NextResponse.json({
				success: true,
				exists: false,
				message: "文件不存在",
			});
		}
	} catch (error) {
		console.error("检查文件失败:", error);
		return NextResponse.json({ success: false, message: "检查文件失败" }, { status: 500 });
	}
}
