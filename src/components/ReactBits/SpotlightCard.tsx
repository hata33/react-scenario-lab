"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SpotlightCardProps {
	children: React.ReactNode;
	className?: string;
	spotlightSize?: number;
}

export function SpotlightCard({ children, className = "", spotlightSize = 600 }: SpotlightCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setMousePosition({ x, y });
	};

	return (
		<div
			ref={cardRef}
			className={`relative overflow-hidden rounded-2xl ${className}`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
				style={{
					opacity: isHovered ? 1 : 0,
					background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
				}}
			/>
		</div>
	);
}
