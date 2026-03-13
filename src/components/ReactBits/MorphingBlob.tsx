"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

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

		// Animate blob shape using border-radius with timeline
		const tl = gsap.timeline({ repeat: -1, yoyo: true });

		tl.to(blob, {
			duration: duration / 2,
			ease: "sine.inOut",
			borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
		}).to(blob, {
			duration: duration / 2,
			ease: "sine.inOut",
			borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
		});

		// Animate rotation separately
		gsap.to(blob, {
			duration: duration * 2,
			rotation: 360,
			repeat: -1,
			ease: "none",
		});
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
