"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface RevealOnScrollProps {
	children: React.ReactNode;
	className?: string;
	direction?: "up" | "down" | "left" | "right";
	delay?: number;
}

export function RevealOnScroll({
	children,
	className = "",
	direction = "up",
	delay = 0,
}: RevealOnScrollProps) {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef.current) return;

		const element = elementRef.current;
		const directionConfig = {
			up: { y: 100, x: 0 },
			down: { y: -100, x: 0 },
			left: { y: 0, x: 100 },
			right: { y: 0, x: -100 },
		};

		const { x, y } = directionConfig[direction];

		gsap.fromTo(
			element,
			{ opacity: 0, x, y },
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1,
				delay,
				ease: "power3.out",
				scrollTrigger: {
					trigger: element,
					start: "top 85%",
					toggleActions: "play none none reverse",
				},
			},
		);
	}, [direction, delay]);

	return (
		<div ref={elementRef} className={className}>
			{children}
		</div>
	);
}
