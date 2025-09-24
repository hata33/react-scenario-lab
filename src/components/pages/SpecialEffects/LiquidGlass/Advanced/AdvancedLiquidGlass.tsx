import Image from "next/image";
import img1 from "@/assets/imgs/LiquidGlass-bg/1.webp";
import img2 from "@/assets/imgs/LiquidGlass-bg/2.webp";
import img3 from "@/assets/imgs/LiquidGlass-bg/3.webp";
import LiquidGlass from "./LiquidGlass";

const images = [img1, img2, img3];

export default function AdvancedLiquidGlass() {
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
			<LiquidGlass
				width={380}
				height={180}
				style={{
					top: "40%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div className="flex h-full w-full items-center justify-center rounded-xl bg-white/10 backdrop-blur">
					玻璃卡片
				</div>
			</LiquidGlass>

			{/* 说明区域固定在底部左侧，避免遮挡主卡片 */}
			<div className="fixed bottom-6 left-6 z-20 rounded-xl border bg-white/70 p-4 backdrop-blur">
				<h3 className="mb-1 font-medium text-sm">说明</h3>
				<ul className="max-w-sm list-disc space-y-0.5 pl-5 text-gray-700 text-xs">
					<li>三张背景图垂直平铺（每屏一张），滚动查看效果。</li>
					<li>玻璃卡片可拖拽移动，背景不变。</li>
				</ul>
			</div>
		</div>
	);
}
