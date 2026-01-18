"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GradientBorderProps {
	children: React.ReactNode;
	className?: string;
	colors?: string[];
	borderWidth?: number;
	animationSpeed?: number;
}

export function GradientBorder({
	children,
	className = "",
	colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"],
	borderWidth = 2,
	animationSpeed = 3,
}: GradientBorderProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const borderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!borderRef.current) return;

		const border = borderRef.current;

		gsap.to(border, {
			backgroundPosition: "200% 200%",
			duration: animationSpeed,
			repeat: -1,
			ease: "none",
		});
	}, [animationSpeed]);

	return (
		<div ref={containerRef} className={`relative p-[${borderWidth}px] ${className}`}>
			<div
				ref={borderRef}
				className="absolute inset-0 rounded-2xl opacity-75"
				style={{
					background: `linear-gradient(45deg, ${colors.join(", ")}, ${colors[0]})`,
					backgroundSize: "400% 400%",
				}}
			/>
			<div className="relative h-full w-full rounded-2xl bg-slate-950">{children}</div>
		</div>
	);
}
