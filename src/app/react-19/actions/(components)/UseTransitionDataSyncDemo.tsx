"use client";

import { useState } from "react";
import { useTransition } from "./hooks";

export default function UseTransitionDataSyncDemo() {
	const [isPending, startTransition] = useTransition();
	const [localData, setLocalData] = useState({
		name: "张三",
		email: "zhangsan@example.com",
		phone: "13800138000",
	});
	const [serverData, setServerData] = useState(localData);
	const [syncStatus, setSyncStatus] = useState<"已同步" | "同步中" | "有未保存更改">("已同步");

	const handleChange = (field: keyof typeof localData, value: string) => {
		setLocalData((prev) => ({ ...prev, [field]: value }));
		setSyncStatus("有未保存更改");
	};

	const saveToServer = async () => {
		// 立即更新UI状态
		setSyncStatus("同步中");

		startTransition(async () => {
			// 模拟网络延迟
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// 模拟服务端保存
			setServerData(localData);
			setSyncStatus("已同步");
		});
	};

	const hasChanges = JSON.stringify(localData) !== JSON.stringify(serverData);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔄 数据同步场景</h5>

			<div className="max-w-md space-y-4">
				<div className="mb-4 flex items-center justify-between">
					<span className="font-medium text-gray-700 text-sm">同步状态：</span>
					<span
						className={`font-medium text-sm ${
							syncStatus === "已同步" ? "text-green-600" : syncStatus === "同步中" ? "text-blue-600" : "text-orange-600"
						}`}
					>
						{syncStatus === "已同步" && "✅ "}
						{syncStatus === "同步中" && "🔄 "}
						{syncStatus === "有未保存更改" && "⚠️ "}
						{syncStatus}
					</span>
				</div>

				<div className="space-y-3">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">姓名</label>
						<input
							type="text"
							value={localData.name}
							onChange={(e) => handleChange("name", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">邮箱</label>
						<input
							type="email"
							value={localData.email}
							onChange={(e) => handleChange("email", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">电话</label>
						<input
							type="tel"
							value={localData.phone}
							onChange={(e) => handleChange("phone", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
				</div>

				<button
					onClick={saveToServer}
					disabled={!hasChanges || syncStatus === "同步中"}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						!hasChanges || syncStatus === "同步中"
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{syncStatus === "同步中" ? "保存中..." : "💾 保存到服务器"}
				</button>

				<div
					className={`rounded-md p-3 text-sm ${
						isPending ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-600"
					}`}
				>
					{isPending
						? "🔄 正在同步数据到服务器，您可以继续编辑其他字段..."
						: "💡 修改数据后会显示未保存状态，点击保存按钮使用 transition 同步到服务器"}
				</div>
			</div>
		</div>
	);
}
