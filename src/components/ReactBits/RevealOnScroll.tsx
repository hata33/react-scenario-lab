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

		// 查找最近的滚动容器
		const findScrollContainer = (): Element | Window => {
			let parent: Element | null = element.parentElement;

			while (parent) {
				const styles = window.getComputedStyle(parent);
				const overflow = styles.getPropertyValue("overflow-y");

				// 检查是否有滚动条且内容溢出
				if (
					(overflow === "auto" || overflow === "scroll") &&
					parent.scrollHeight > parent.clientHeight
				) {
					return parent;
				}

				parent = parent.parentElement;
			}

			return window;
		};

		const scroller = findScrollContainer();

		const directionConfig = {
			up: { y: 100, x: 0 },
			down: { y: -100, x: 0 },
			left: { y: 0, x: 100 },
			right: { y: 0, x: -100 },
		};

		const { x, y } = directionConfig[direction];

		// 创建 ScrollTrigger 实例
		const animation = gsap.fromTo(
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
					end: "bottom 20%",
					toggleActions: "play none none reverse",
					scroller: scroller as any,
				},
			},
		);

		// 清理函数
		return () => {
			animation.kill();
			const scrollTrigger = animation.scrollTrigger;
			if (scrollTrigger) {
				scrollTrigger.kill();
			}
		};
	}, [direction, delay]);

	return (
		<div ref={elementRef} className={className}>
			{children}
		</div>
	);
}
