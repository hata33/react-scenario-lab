"use client";

import { useState } from "react";

export default function DataFetchingDemo() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (type: "direct" | "client") => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
			if (type === "direct") {
				// 模拟服务端组件直接访问数据库
				await new Promise((resolve) => setTimeout(resolve, 300));
				setData({
					id: 1,
					title: "产品标题",
					description: "这是通过服务端组件直接从数据库获取的数据",
					price: 299,
					stock: 15,
					source: "服务端组件直接访问",
				});
			} else {
				// 模拟客户端组件通过API获取数据
				await new Promise((resolve) => setTimeout(resolve, 800));
				setData({
					id: 1,
					title: "产品标题",
					description: "这是通过客户端组件调用API获取的数据",
					price: 299,
					stock: 15,
					source: "客户端API调用",
				});
			}
		} catch (err) {
			setError("获取数据失败");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">数据获取对比演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="grid gap-2">
						<button
							onClick={() => fetchData("direct")}
							disabled={loading}
							className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:bg-gray-300"
						>
							{loading ? "获取中..." : "服务端组件直接获取"}
						</button>
						<button
							onClick={() => fetchData("client")}
							disabled={loading}
							className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
						>
							{loading ? "获取中..." : "客户端API调用"}
						</button>
					</div>

					{loading && (
						<div className="flex items-center gap-2 text-blue-600 text-sm">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							正在获取数据...
						</div>
					)}

					{error && (
						<div className="rounded-lg bg-red-50 p-3">
							<p className="text-red-800 text-sm">❌ {error}</p>
						</div>
					)}

					{data && (
						<div className="space-y-3">
							<div className="rounded-lg bg-gray-50 p-3">
								<h5 className="mb-2 font-medium text-gray-900">获取到的数据:</h5>
								<div className="space-y-1 text-sm">
									<div>
										<strong>标题:</strong> {data.title}
									</div>
									<div>
										<strong>描述:</strong> {data.description}
									</div>
									<div>
										<strong>价格:</strong> ¥{data.price}
									</div>
									<div>
										<strong>库存:</strong> {data.stock}
									</div>
									<div className="text-gray-500 text-xs">
										<strong>数据来源:</strong>
										<span className={data.source === "服务端组件直接访问" ? "text-green-600" : "text-blue-600"}>
											{data.source}
										</span>
									</div>
								</div>
							</div>

							<div className="grid gap-2 text-xs">
								<div className="rounded bg-green-50 p-2">
									<strong>服务端组件优势:</strong> 直接访问数据库，无需API层，减少网络请求
								</div>
								<div className="rounded bg-blue-50 p-2">
									<strong>传统方式:</strong> 需要额外的API层，增加网络延迟和复杂性
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
