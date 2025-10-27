import { mkdir, writeFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

// 配置上传目录
const UPLOAD_BASE_DIR = process.env.UPLOAD_BASE_DIR || join(process.cwd(), "..", "uploads");
const TEMP_BASE_DIR = process.env.TEMP_BASE_DIR || join(process.cwd(), "..", "temp");

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const chunk = formData.get("chunk") as File;
		const chunkIndex = parseInt(formData.get("chunkIndex") as string);
		const totalChunks = parseInt(formData.get("totalChunks") as string);
		const fileHash = formData.get("fileHash") as string;
		const fileName = formData.get("fileName") as string;

		if (!chunk || !fileHash || !fileName) {
			return NextResponse.json({ success: false, message: "缺少必要参数" }, { status: 400 });
		}

		// 创建临时目录
		const tempDir = join(TEMP_BASE_DIR, fileHash);
		await mkdir(tempDir, { recursive: true });

		// 保存分片到临时目录
		const chunkFileName = `${chunkIndex}.chunk`;
		const chunkPath = join(tempDir, chunkFileName);

		// 将File转换为Buffer并保存
		const arrayBuffer = await chunk.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await writeFile(chunkPath, buffer);

		console.log(`保存分片 ${chunkIndex + 1}/${totalChunks}，文件: ${fileName}`);

		return NextResponse.json({
			success: true,
			chunkIndex,
			message: "分片上传成功",
		});
	} catch (error) {
		console.error("分片上传失败:", error);
		return NextResponse.json({ success: false, message: "分片上传失败" }, { status: 500 });
	}
}
