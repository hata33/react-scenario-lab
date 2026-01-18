"use client";

import { useRef, useState } from "react";

interface HolographicEffectProps {
	children: React.ReactNode;
	className?: string;
}

export function HolographicEffect({ children, className = "" }: HolographicEffectProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setMousePosition({ x, y });
	};

	return (
		<div
			ref={containerRef}
			className={`relative overflow-hidden ${className}`}
			onMouseMove={handleMouseMove}
		>
			{children}
			<div
				className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
				style={{
					background: `linear-gradient(135deg,
						transparent 0%,
						rgba(255, 0, 0, 0.1) ${mousePosition.x}%,
						rgba(0, 255, 0, 0.1) ${mousePosition.y}%,
						transparent 100%)`,
				}}
			/>
			<div
				className="absolute inset-0 pointer-events-none opacity-30"
				style={{
					background: `linear-gradient(${mousePosition.x}deg,
						rgba(59, 130, 246, 0.1) 0%,
						rgba(147, 51, 234, 0.1) 50%,
						rgba(236, 72, 153, 0.1) 100%)`,
				}}
			/>
		</div>
	);
}
