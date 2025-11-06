"use client";

import { useEffect, useState } from "react";

export default function PreinitDemo() {
	const [connections, setConnections] = useState<{
		api: boolean;
		cdn: boolean;
		fonts: boolean;
	}>({
		api: false,
		cdn: false,
		fonts: false,
	});

	const [isInitializing, setIsInitializing] = useState(false);

	useEffect(() => {
		// 模拟连接预热
		const timer = setTimeout(() => {
			setIsInitializing(true);
			setTimeout(() => {
				setConnections({ api: true, cdn: true, fonts: true });
				setIsInitializing(false);
			}, 2000);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">preinit 演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<p className="text-gray-600 text-sm">应用启动时预热关键连接:</p>
					<div className="space-y-3">
						{Object.entries({
							api: { name: "API 服务器", url: "https://api.example.com" },
							cdn: { name: "CDN 资源", url: "https://cdn.example.com" },
							fonts: { name: "字体服务", url: "https://fonts.googleapis.com" },
						}).map(([key, { name, url }]) => (
							<div key={key} className="flex items-center justify-between rounded border p-3">
								<div>
									<div className="font-medium text-sm">{name}</div>
									<div className="text-gray-500 text-xs">{url}</div>
								</div>
								<span
									className={`rounded px-2 py-1 text-xs ${
										connections[key as keyof typeof connections]
											? "bg-green-100 text-green-800"
											: isInitializing
												? "bg-yellow-100 text-yellow-800"
												: "bg-gray-100 text-gray-600"
									}`}
								>
									{connections[key as keyof typeof connections]
										? "✅ 已连接"
										: isInitializing
											? "🔄 连接中..."
											: "⏳ 待连接"}
								</span>
							</div>
						))}
					</div>
					{isInitializing && <div className="text-center text-blue-600 text-sm">正在建立关键连接...</div>}
				</div>
			</div>
		</div>
	);
}
