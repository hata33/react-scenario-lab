"use client";

import Layout from "@/components/Layout";
import LargeFileUpload from "@/components/pages/Files/LargeFileUpload";

export default function LargeFileUploadPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">大文件上传</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4">
						<p className="text-gray-600">
							支持分片上传、断点续传、进度显示等功能，最大支持2GB文件上传。
						</p>
					</div>
					<LargeFileUpload />
				</div>
			</div>
		</Layout>
	);
}
