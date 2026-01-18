"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GlowingOrbProps {
	className?: string;
	color?: string;
	size?: number;
	pulseSpeed?: number;
}

export function GlowingOrb({
	className = "",
	color = "rgba(59, 130, 246, 0.5)",
	size = 200,
	pulseSpeed = 2,
}: GlowingOrbProps) {
	const orbRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!orbRef.current) return;

		const orb = orbRef.current;

		// Pulse animation
		gsap.to(orb, {
			scale: 1.2,
			opacity: 0.8,
			duration: pulseSpeed,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
		});

		// Rotate animation
		gsap.to(orb, {
			rotation: 360,
			duration: pulseSpeed * 5,
			repeat: -1,
			ease: "none",
		});
	}, [pulseSpeed]);

	return (
		<div
			ref={orbRef}
			className={`absolute rounded-full blur-3xl ${className}`}
			style={{
				width: `${size}px`,
				height: `${size}px`,
				background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
			}}
		/>
	);
}
