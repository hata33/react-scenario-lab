"use client";

import Layout from "@/components/Layout";
import FilePreview from "@/components/pages/Files/FilePreview";

export default function FilePreviewPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">文件预览</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<FilePreview />
				</div>
			</div>
		</Layout>
	);
}
