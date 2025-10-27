import { useState } from "react";

export default function SimpleGlass() {
	const [opacity, setOpacity] = useState(0.3);
	const [blur, setBlur] = useState(10);

	const glassStyle = {
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		background: `rgba(255, 255, 255, ${opacity})`,
		border: "1px solid rgba(255, 255, 255, 0.3)",
		boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
	} as React.CSSProperties;

	return (
		<div className="w-96 rounded-3xl p-6 text-gray-800" style={glassStyle}>
			<h2 className="font-semibold text-2xl">简单玻璃</h2>
			<div className="mt-4 grid gap-4">
				<label className="block">
					<span className="text-gray-700 text-sm">透明度: {opacity.toFixed(2)}</span>
					<input
						type="range"
						min="0.1"
						max="0.8"
						step="0.05"
						value={opacity}
						onChange={(e) => setOpacity(Number(e.target.value))}
						className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</label>
				<label className="block">
					<span className="text-gray-700 text-sm">模糊强度: {blur}px</span>
					<input
						type="range"
						min="0"
						max="20"
						step="1"
						value={blur}
						onChange={(e) => setBlur(Number(e.target.value))}
						className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</label>
			</div>
			<p className="mt-4 text-gray-700 text-sm">这是一个简单的玻璃拟态效果示例。</p>
		</div>
	);
}
