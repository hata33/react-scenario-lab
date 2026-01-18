"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AuroraBackgroundProps {
	className?: string;
	colors?: string[];
}

export function AuroraBackground({ className = "", colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"] }: AuroraBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const blobsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		// Create multiple aurora blobs
		colors.forEach((color, index) => {
			const blob = document.createElement("div");
			blob.className = "absolute rounded-full blur-3xl opacity-40";
			blob.style.width = `${400 + index * 100}px`;
			blob.style.height = `${400 + index * 100}px`;
			blob.style.background = color;
			blob.style.left = `${Math.random() * 80}%`;
			blob.style.top = `${Math.random() * 80}%`;
			container.appendChild(blob);
			blobsRef.current.push(blob);

			// Animate each blob
			gsap.to(blob, {
				x: `${Math.random() * 200 - 100}px`,
				y: `${Math.random() * 200 - 100}px`,
				scale: Math.random() * 0.5 + 0.8,
				opacity: Math.random() * 0.3 + 0.2,
				duration: 10 + index * 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Rotate animation
			gsap.to(blob, {
				rotation: 360,
				duration: 20 + index * 3,
				repeat: -1,
				ease: "none",
			});
		});

		return () => {
			blobsRef.current.forEach((blob) => blob.remove());
			blobsRef.current = [];
		};
	}, [colors]);

	return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
}
