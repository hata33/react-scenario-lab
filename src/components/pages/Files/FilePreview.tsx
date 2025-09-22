import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilePreview() {
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (!file) return setUrl("");
		const u = URL.createObjectURL(file);
		setUrl(u);
		return () => URL.revokeObjectURL(u);
	}, [file]);

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">文件预览</h2>
			<input
				type="file"
				accept="image/*,application/pdf"
				onChange={(e) => setFile(e.target.files?.[0] ?? null)}
			/>
			{url && (
				<div className="mt-4">
					{file && file.type.startsWith("image/") ? (
						<Image
							src={url}
							alt="preview"
							className="max-w-md rounded border"
						/>
					) : (
						<iframe
							title="preview"
							src={url}
							className="h-96 w-full max-w-2xl rounded border"
						/>
					)}
				</div>
			)}
		</div>
	);
}
