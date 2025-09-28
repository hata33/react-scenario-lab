"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadFile {
	file: File;
	id: string;
	progress: number;
	status: "pending" | "uploading" | "completed" | "error";
	speed: number;
	remainingTime: number;
	errorMessage?: string;
}

interface ChunkInfo {
	index: number;
	start: number;
	end: number;
	data: Blob;
}

export default function LargeFileUpload() {
	const [files, setFiles] = useState<UploadFile[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
	const MAX_CONCURRENT_UPLOADS = 3;

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
			file,
			id: Math.random().toString(36).substr(2, 9),
			progress: 0,
			status: "pending" as const,
			speed: 0,
			remainingTime: 0,
		}));
		setFiles((prev) => [...prev, ...newFiles]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
			"video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
			"audio/*": [".mp3", ".wav", ".ogg", ".flac", ".aac"],
			"application/pdf": [".pdf"],
			"application/zip": [".zip", ".rar", ".7z"],
			"text/*": [".txt", ".md", ".csv"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
			"application/vnd.ms-excel": [".xls"],
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
				".xlsx",
			],
		},
		maxSize: 2 * 1024 * 1024 * 1024, // 2GB
	});

	const createChunks = (file: File): ChunkInfo[] => {
		const chunks: ChunkInfo[] = [];
		const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

		for (let i = 0; i < totalChunks; i++) {
			const start = i * CHUNK_SIZE;
			const end = Math.min(start + CHUNK_SIZE, file.size);
			chunks.push({
				index: i,
				start,
				end,
				data: file.slice(start, end),
			});
		}

		return chunks;
	};

	const calculateFileHash = async (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				const buffer = reader.result as ArrayBuffer;
				const hash = simpleHash(buffer);
				resolve(hash);
			};
			reader.readAsArrayBuffer(file);
		});
	};

	const simpleHash = (buffer: ArrayBuffer): string => {
		let hash = 0;
		const view = new Uint8Array(buffer);
		for (let i = 0; i < view.length; i++) {
			hash = (hash << 5) - hash + view[i];
			hash = hash & hash;
		}
		return Math.abs(hash).toString(36);
	};

	const uploadChunk = async (
		chunk: ChunkInfo,
		fileId: string,
		fileHash: string,
		totalChunks: number,
		fileName: string,
	): Promise<void> => {
		const formData = new FormData();
		formData.append("chunk", chunk.data);
		formData.append("chunkIndex", chunk.index.toString());
		formData.append("totalChunks", totalChunks.toString());
		formData.append("fileHash", fileHash);
		formData.append("fileName", fileName);
		formData.append("fileSize", chunk.end.toString());

		try {
			const response = await fetch("/api/upload/chunk", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`上传失败: ${response.status}`);
			}

			const result = await response.json();
			if (!result.success) {
				throw new Error(result.message || "上传失败");
			}
		} catch (error) {
			throw error;
		}
	};

	const uploadFile = async (uploadFile: UploadFile) => {
		setFiles((prev) =>
			prev.map((f) =>
				f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f,
			),
		);

		try {
			const fileHash = await calculateFileHash(uploadFile.file);
			const chunks = createChunks(uploadFile.file);

			// 检查文件是否已存在（秒传）
			const checkResponse = await fetch("/api/upload/check", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fileHash, fileName: uploadFile.file.name }),
			});

			if (checkResponse.ok) {
				const checkResult = await checkResponse.json();
				if (checkResult.exists) {
					setFiles((prev) =>
						prev.map((f) =>
							f.id === uploadFile.id
								? { ...f, status: "completed" as const, progress: 100 }
								: f,
						),
					);
					return;
				}
			}

			// 分片上传
			const uploadedChunks = new Set<number>();
			const startTime = Date.now();

			for (let i = 0; i < chunks.length; i += MAX_CONCURRENT_UPLOADS) {
				const batchChunks = chunks.slice(i, i + MAX_CONCURRENT_UPLOADS);

				const uploadPromises = batchChunks.map(async (chunk) => {
					try {
						await uploadChunk(
							chunk,
							uploadFile.id,
							fileHash,
							chunks.length,
							uploadFile.file.name,
						);
						uploadedChunks.add(chunk.index);

						// 更新进度
						const progress = (uploadedChunks.size / chunks.length) * 100;
						const elapsed = Date.now() - startTime;
						const speed = (uploadedChunks.size * CHUNK_SIZE) / (elapsed / 1000);
						const remainingBytes =
							(chunks.length - uploadedChunks.size) * CHUNK_SIZE;
						const remainingTime = remainingBytes / speed;

						setFiles((prev) =>
							prev.map((f) =>
								f.id === uploadFile.id
									? {
										...f,
										progress,
										speed,
										remainingTime: remainingTime || 0,
									}
									: f,
							),
						);
					} catch (error) {
						throw error;
					}
				});

				await Promise.all(uploadPromises);
			}

			// 完成上传
			await fetch("/api/upload/complete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fileHash,
					fileName: uploadFile.file.name,
					fileSize: uploadFile.file.size,
				}),
			});

			setFiles((prev) =>
				prev.map((f) =>
					f.id === uploadFile.id
						? { ...f, status: "completed" as const, progress: 100 }
						: f,
				),
			);
		} catch (error) {
			setFiles((prev) =>
				prev.map((f) =>
					f.id === uploadFile.id
						? {
							...f,
							status: "error" as const,
							errorMessage:
								error instanceof Error ? error.message : "上传失败",
						}
						: f,
				),
			);
		}
	};

	const handleUpload = (fileId: string) => {
		const file = files.find((f) => f.id === fileId);
		if (file && file.status === "pending") {
			uploadFile(file);
		}
	};

	const handleRemove = (fileId: string) => {
		setFiles((prev) => prev.filter((f) => f.id !== fileId));
	};

	const formatSpeed = (speed: number): string => {
		if (speed < 1024) return `${speed.toFixed(1)} B/s`;
		if (speed < 1024 * 1024) return `${(speed / 1024).toFixed(1)} KB/s`;
		return `${(speed / (1024 * 1024)).toFixed(1)} MB/s`;
	};

	const formatTime = (seconds: number): string => {
		if (seconds < 60) return `${Math.round(seconds)}秒`;
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.round(seconds % 60);
		return `${minutes}分${remainingSeconds}秒`;
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024)
			return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
	};

	return (
		<div className="space-y-6">
			{/* 上传区域 */}
			<div
				{...getRootProps()}
				className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive || isDragging
					? "border-blue-500 bg-blue-50"
					: "border-gray-300 hover:border-gray-400"
					}`}
			>
				<input {...getInputProps()} />
				<div className="space-y-2">
					<div className="text-gray-400">
						<svg
							className="mx-auto h-12 w-12"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
					</div>
					<p className="font-medium text-gray-700 text-lg">
						{isDragActive ? "释放文件以上传" : "拖拽文件到此处上传"}
					</p>
					<p className="text-gray-500 text-sm">或者点击选择文件</p>
					<p className="mt-2 text-gray-400 text-xs">
						支持最大2GB文件，支持图片、视频、音频、文档等格式
					</p>
				</div>
			</div>

			{/* 文件列表 */}
			{files.length > 0 && (
				<div className="space-y-4">
					<h3 className="font-semibold text-gray-800 text-lg">上传队列</h3>
					{files.map((uploadFile) => (
						<div
							key={uploadFile.id}
							className="rounded-lg border bg-gray-50 p-4"
						>
							<div className="mb-2 flex items-center justify-between">
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-gray-800">
										{uploadFile.file.name}
									</p>
									<p className="text-gray-500 text-sm">
										{formatFileSize(uploadFile.file.size)}
									</p>
								</div>
								<div className="ml-4 flex items-center space-x-2">
									{uploadFile.status === "pending" && (
										<button
											type="button"
											onClick={() => handleUpload(uploadFile.id)}
											className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
										>
											上传
										</button>
									)}
									{uploadFile.status === "uploading" && (
										<span className="text-blue-500 text-sm">上传中...</span>
									)}
									{uploadFile.status === "completed" && (
										<span className="text-green-500 text-sm">✓ 完成</span>
									)}
									{uploadFile.status === "error" && (
										<span className="text-red-500 text-sm">✗ 失败</span>
									)}
									<button
										type="button"
										onClick={() => handleRemove(uploadFile.id)}
										className="px-2 py-1 text-gray-500 text-sm hover:text-red-500"
									>
										×
									</button>
								</div>
							</div>

							{uploadFile.status === "uploading" && (
								<div className="space-y-2">
									<div className="h-2 w-full rounded-full bg-gray-200">
										<div
											className="h-2 rounded-full bg-blue-500 transition-all duration-300"
											style={{ width: `${uploadFile.progress}%` }}
										/>
									</div>
									<div className="flex justify-between text-gray-600 text-xs">
										<span>{Math.round(uploadFile.progress)}%</span>
										<span>{formatSpeed(uploadFile.speed)}</span>
										<span>{formatTime(uploadFile.remainingTime)}</span>
									</div>
								</div>
							)}

							{uploadFile.status === "error" && uploadFile.errorMessage && (
								<p className="mt-1 text-red-500 text-sm">
									{uploadFile.errorMessage}
								</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
