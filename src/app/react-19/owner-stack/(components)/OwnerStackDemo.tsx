"use client";

import { useState } from "react";

export default function OwnerStackDemo() {
	const [debugMode, setDebugMode] = useState(false);
	const [componentState, setComponentState] = useState({
		app: "initialized",
		parent: "ready",
		child: "loading",
	});

	// 模拟 Owner Stack 信息
	const ownerStackInfo = [
		{ component: "App", props: { debugMode }, state: componentState.app },
		{ component: "ParentComponent", props: { mode: "demo" }, state: componentState.parent },
		{ component: "ChildComponent", props: { data: "test" }, state: componentState.child },
	];

	const updateChildState = () => {
		setComponentState((prev) => ({
			...prev,
			child: prev.child === "loading" ? "loaded" : "loading",
		}));
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setDebugMode(!debugMode)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						debugMode ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{debugMode ? "关闭" : "开启"} 调试模式
				</button>
				<button
					onClick={updateChildState}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					更新子组件状态
				</button>
			</div>

			{debugMode && (
				<div className="rounded-lg bg-purple-50 p-4">
					<h4 className="mb-3 font-medium text-purple-800">🔍 Owner Stack 信息：</h4>
					<div className="space-y-2">
						{ownerStackInfo.map((owner, index) => (
							<div
								key={owner.component}
								className="flex items-center gap-2 rounded border border-purple-200 bg-white p-2"
							>
								<span className="font-mono text-purple-600 text-sm">{"".padStart(index * 2, "→")}</span>
								<div className="flex-1">
									<span className="font-medium text-gray-800">{owner.component}</span>
									<span className="ml-2 text-gray-500 text-xs">state: {owner.state}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="rounded-lg bg-blue-50 p-4">
				<p className="mb-2 font-medium text-blue-800 text-sm">🎯 Owner Stack 的优势：</p>
				<ul className="space-y-1 text-blue-700 text-sm">
					<li>• 清晰的组件层级关系</li>
					<li>• 实时的状态追踪</li>
					<li>• 详细的 props 传递信息</li>
					<li>• 直观的调用链路展示</li>
				</ul>
			</div>
		</div>
	);
}
