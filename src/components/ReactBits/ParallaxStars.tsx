"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParallaxStarsProps {
	className?: string;
	starCount?: number;
}

export function ParallaxStars({ className = "", starCount = 100 }: ParallaxStarsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const starsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		// Create stars
		for (let i = 0; i < starCount; i++) {
			const star = document.createElement("div");
			const size = Math.random() * 3 + 1;
			star.className = "absolute rounded-full bg-white";
			star.style.width = `${size}px`;
			star.style.height = `${size}px`;
			star.style.left = `${Math.random() * 100}%`;
			star.style.top = `${Math.random() * 100}%`;
			star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
			container.appendChild(star);
			starsRef.current.push(star);

			// Twinkle animation
			gsap.to(star, {
				opacity: Math.random() * 0.5 + 0.2,
				duration: Math.random() * 2 + 1,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: Math.random() * 2,
			});

			// Slow drift
			gsap.to(star, {
				y: `${Math.random() * 100 - 50}px`,
				x: `${Math.random() * 100 - 50}px`,
				duration: Math.random() * 30 + 20,
				repeat: -1,
				yoyo: true,
				ease: "none",
			});
		}

		return () => {
			starsRef.current.forEach((star) => star.remove());
			starsRef.current = [];
		};
	}, [starCount]);

	return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
}
