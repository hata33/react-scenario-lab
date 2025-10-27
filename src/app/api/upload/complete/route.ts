import { mkdir, readdir, readFile, unlink, writeFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

// 配置上传目录
const UPLOAD_BASE_DIR = process.env.UPLOAD_BASE_DIR || join(process.cwd(), "..", "uploads");
const TEMP_BASE_DIR = process.env.TEMP_BASE_DIR || join(process.cwd(), "..", "temp");

export async function POST(request: NextRequest) {
	try {
		const { fileHash, fileName, fileSize } = await request.json();

		if (!fileHash || !fileName || !fileSize) {
			return NextResponse.json({ success: false, message: "缺少必要参数" }, { status: 400 });
		}

		const tempDir = join(TEMP_BASE_DIR, fileHash);
		const uploadsDir = UPLOAD_BASE_DIR;
		const finalFilePath = join(uploadsDir, fileName);

		// 创建uploads目录
		await mkdir(uploadsDir, { recursive: true });

		// 读取所有分片并按顺序合并
		const chunkFiles = await readdir(tempDir);
		const chunkFilesSorted = chunkFiles
			.filter((file) => file.endsWith(".chunk"))
			.sort((a, b) => {
				const aIndex = parseInt(a.replace(".chunk", ""));
				const bIndex = parseInt(b.replace(".chunk", ""));
				return aIndex - bIndex;
			});

		// 合并分片
		const finalFileBuffer = Buffer.alloc(fileSize);
		let offset = 0;

		for (const chunkFile of chunkFilesSorted) {
			const chunkPath = join(tempDir, chunkFile);
			const chunkBuffer = await readFile(chunkPath);

			chunkBuffer.copy(finalFileBuffer, offset);
			offset += chunkBuffer.length;
		}

		// 写入最终文件
		await writeFile(finalFilePath, finalFileBuffer);

		// 清理临时分片文件
		for (const chunkFile of chunkFilesSorted) {
			const chunkPath = join(tempDir, chunkFile);
			await unlink(chunkPath);
		}

		// 删除临时目录
		try {
			await unlink(tempDir);
		} catch (error) {
			// 如果目录不为空，删除失败也没关系
		}

		console.log(`文件上传完成: ${fileName} (${fileSize} bytes)`);

		return NextResponse.json({
			success: true,
			fileName,
			fileSize,
			fileHash,
			message: "文件上传完成",
			url: `/uploads/${fileName}`, // 返回文件访问URL
		});
	} catch (error) {
		console.error("完成上传失败:", error);
		return NextResponse.json({ success: false, message: "完成上传失败" }, { status: 500 });
	}
}
