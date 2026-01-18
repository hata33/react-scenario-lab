"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WaveTextProps {
	text: string;
	className?: string;
	waveHeight?: number;
	waveSpeed?: number;
}

export function WaveText({ text, className = "", waveHeight = 10, waveSpeed = 0.5 }: WaveTextProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const letters = container.querySelectorAll(".wave-letter");

		gsap.to(letters, {
			y: -waveHeight,
			duration: waveSpeed,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			stagger: {
				each: 0.1,
				from: "center",
			},
		});
	}, [waveHeight, waveSpeed]);

	return (
		<div ref={containerRef} className={`inline-flex ${className}`}>
			{text.split("").map((letter, index) => (
				<span key={index} className="wave-letter inline-block">
					{letter === " " ? "\u00A0" : letter}
				</span>
			))}
		</div>
	);
}
