import { useState } from "react";

export default function FrostedGlass() {
	const [saturation, setSaturation] = useState(140);
	const [brightness, setBrightness] = useState(100);
	const [blur, setBlur] = useState(15);

	const frostedStyle = {
		backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
		WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
		background:
			"linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
		border: "1px solid rgba(255,255,255,0.4)",
		boxShadow:
			"0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
	} as React.CSSProperties;

	return (
		<div className="w-[28rem] rounded-3xl p-8 text-gray-800" style={frostedStyle}>
			<h2 className="font-semibold text-2xl">磨砂玻璃</h2>
			<div className="mt-4 grid gap-4 md:grid-cols-3">
				<label className="block">
					<span className="text-gray-700 text-sm">模糊强度: {blur}px</span>
					<input
						type="range"
						min="5"
						max="25"
						step="1"
						value={blur}
						onChange={(e) => setBlur(Number(e.target.value))}
						className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700 text-sm">饱和度: {saturation}%</span>
					<input
						type="range"
						min="100"
						max="200"
						step="5"
						value={saturation}
						onChange={(e) => setSaturation(Number(e.target.value))}
						className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700 text-sm">亮度: {brightness}%</span>
					<input
						type="range"
						min="80"
						max="120"
						step="5"
						value={brightness}
						onChange={(e) => setBrightness(Number(e.target.value))}
						className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</label>
			</div>
			<p className="mt-4 text-gray-700 text-sm">模拟真实磨砂玻璃的质感和深度。</p>
		</div>
	);
}
