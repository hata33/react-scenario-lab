import Image from "next/image";
import { useState } from "react";
import img1 from "@/assets/imgs/LiquidGlass-bg/1.webp";
import img2 from "@/assets/imgs/LiquidGlass-bg/2.webp";
import img3 from "@/assets/imgs/LiquidGlass-bg/3.webp";
import FrostedGlass from "./FrostedGlass";
import SimpleGlass from "./SimpleGlass";

const images = [img1, img2, img3];

export default function BasicLiquidGlass() {
	const [activeEffect, setActiveEffect] = useState<"simple" | "frosted">(
		"simple",
	);

	return (
		<div className="absolute top-0 left-0 w-full">
			{/* 三张背景图纵向平铺，每张占满一屏高度，无边距 */}
			<section className="relative h-screen w-full">
				<Image
					src={images[0]}
					alt="liquid-glass-bg-1"
					fill
					priority
					className="object-cover"
				/>
			</section>

			<section className="relative h-screen w-full">
				<Image
					src={images[1]}
					alt="liquid-glass-bg-2"
					fill
					className="object-cover"
				/>
			</section>

			<section className="relative h-screen w-full">
				<Image
					src={images[2]}
					alt="liquid-glass-bg-3"
					fill
					className="object-cover"
				/>
			</section>

			{/* 顶部效果选择器 */}
			<div className="fixed top-6 left-1/2 z-30 -translate-x-1/2">
				<div className="rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur">
					<button type="button"
						onClick={() => setActiveEffect("simple")}
						className={`rounded-xl px-6 py-3 font-medium transition-all ${
							activeEffect === "simple"
								? "bg-blue-600 text-white shadow-lg"
								: "text-gray-700 hover:text-gray-900"
						}`}
					>
						简单玻璃
					</button>
					<button type="button"
						onClick={() => setActiveEffect("frosted")}
						className={`rounded-xl px-6 py-3 font-medium transition-all ${
							activeEffect === "frosted"
								? "bg-blue-600 text-white shadow-lg"
								: "text-gray-700 hover:text-gray-900"
						}`}
					>
						磨砂玻璃
					</button>
				</div>
			</div>

			{/* 固定在屏幕中心的效果预览卡片（包含参数调节） */}
			<div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-30 transform">
				{activeEffect === "simple" ? <SimpleGlass /> : <FrostedGlass />}
			</div>

			{/* 说明区域固定在底部左侧，避免遮挡主卡片 */}
			<div className="fixed bottom-6 left-6 z-20 rounded-xl border bg-white/70 p-4 backdrop-blur">
				<h3 className="mb-1 font-medium text-sm">说明</h3>
				<ul className="max-w-sm list-disc space-y-0.5 pl-5 text-gray-700 text-xs">
					<li>三张背景图垂直平铺（每屏一张），滚动查看效果。</li>
					<li>玻璃卡片固定在屏幕中心，内含参数调节。</li>
				</ul>
			</div>
		</div>
	);
}
