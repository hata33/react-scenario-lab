"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MorphingBlobProps {
	className?: string;
	color?: string;
}

export function MorphingBlob({ className = "", color = "rgba(59, 130, 246, 0.3)" }: MorphingBlobProps) {
	const blobRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!blobRef.current) return;

		const blob = blobRef.current;
		const duration = 8;
		const repeatDelay = 0.5;

		// Animate blob shape using border-radius
		const animateBlob = () => {
			gsap.to(blob, {
				duration,
				repeat: -1,
				repeatDelay,
				yoyo: true,
				ease: "sine.inOut",
				borderRadius: [
					"60% 40% 30% 70% / 60% 30% 70% 40%",
					"30% 60% 70% 40% / 50% 60% 30% 60%",
					"60% 40% 30% 70% / 60% 30% 70% 40%",
				],
				rotation: 360,
			});
		};

		animateBlob();
	}, []);

	return (
		<div
			ref={blobRef}
			className={`absolute blur-3xl ${className}`}
			style={{
				background: color,
				borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
			}}
		/>
	);
}
