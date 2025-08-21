"use client";

import Layout from "@/components/Layout";
import FileUpload from "@/components/pages/Files/FileUpload";

export default function FileUploadPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">文件上传</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<FileUpload />
				</div>
			</div>
		</Layout>
	);
}
