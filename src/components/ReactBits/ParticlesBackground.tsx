"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParticlesBackgroundProps {
	className?: string;
	particleCount?: number;
	color?: string;
}

export function ParticlesBackground({
	className = "",
	particleCount = 50,
	color = "rgba(255, 255, 255, 0.5)",
}: ParticlesBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const particles: HTMLDivElement[] = [];

		// Create particles
		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement("div");
			particle.className = "absolute rounded-full";
			particle.style.width = `${Math.random() * 4 + 2}px`;
			particle.style.height = particle.style.width;
			particle.style.backgroundColor = color;
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.top = `${Math.random() * 100}%`;
			particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
			container.appendChild(particle);
			particles.push(particle);

			// Animate each particle
			gsap.to(particle, {
				x: `${Math.random() * 200 - 100}px`,
				y: `${Math.random() * 200 - 100}px`,
				opacity: Math.random() * 0.5 + 0.2,
				duration: Math.random() * 10 + 10,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: Math.random() * 5,
			});
		}

		return () => {
			particles.forEach((particle) => particle.remove());
		};
	}, [particleCount, color]);

	return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
}
