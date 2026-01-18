"use client";

import { useEffect, useRef, useState } from "react";

interface NeonGlowProps {
	children: React.ReactNode;
	className?: string;
	color?: string;
	intensity?: number;
}

export function NeonGlow({ children, className = "", color = "#3b82f6", intensity = 20 }: NeonGlowProps) {
	const [isHovered, setIsHovered] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={elementRef}
			className={`transition-all duration-300 ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				textShadow: isHovered ? `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}` : "none",
				boxShadow: isHovered ? `0 0 ${intensity}px ${color}, inset 0 0 ${intensity / 2}px ${color}` : "none",
			}}
		>
			{children}
		</div>
	);
}
