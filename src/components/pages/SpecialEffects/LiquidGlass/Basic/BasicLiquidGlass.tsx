import { useState } from "react";
import FrostedGlass from "./FrostedGlass";
import SimpleGlass from "./SimpleGlass";

export default function BasicLiquidGlass() {
	const [activeEffect, setActiveEffect] = useState<"simple" | "frosted">(
		"simple",
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-8 text-center font-bold text-4xl text-gray-900">
					基础液体玻璃效果
				</h1>

				{/* 效果选择器 */}
				<div className="mb-8 flex justify-center">
					<div className="rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-sm">
						<button
							onClick={() => setActiveEffect("simple")}
							className={`rounded-xl px-6 py-3 font-medium transition-all ${
								activeEffect === "simple"
									? "bg-blue-600 text-white shadow-lg"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							简单玻璃
						</button>
						<button
							onClick={() => setActiveEffect("frosted")}
							className={`rounded-xl px-6 py-3 font-medium transition-all ${
								activeEffect === "frosted"
									? "bg-blue-600 text-white shadow-lg"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							磨砂玻璃
						</button>
					</div>
				</div>

				{/* 效果展示区域 */}
				<div className="rounded-3xl bg-white/60 p-8 shadow-xl backdrop-blur-sm">
					{activeEffect === "simple" ? <SimpleGlass /> : <FrostedGlass />}
				</div>

				{/* 说明区域 */}
				<div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
					<h3 className="mb-4 font-semibold text-gray-800 text-xl">效果说明</h3>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h4 className="mb-2 font-medium text-gray-700">简单玻璃</h4>
							<p className="text-gray-600 text-sm">
								基础的玻璃拟态效果，使用 backdrop-filter 实现透明度和模糊效果。
							</p>
						</div>
						<div>
							<h4 className="mb-2 font-medium text-gray-700">磨砂玻璃</h4>
							<p className="text-gray-600 text-sm">
								增强的磨砂质感，通过调整模糊强度和透明度模拟真实磨砂玻璃。
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
