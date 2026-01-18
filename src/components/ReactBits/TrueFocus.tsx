"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TrueFocusProps {
	sentence?: string;
	separator?: string;
	manualMode?: boolean;
	blurAmount?: number;
	borderColor?: string;
	glowColor?: string;
	animationDuration?: number;
	pauseBetweenAnimations?: number;
	className?: string;
}

interface FocusRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export function TrueFocus({
	sentence = "React Scenario Lab",
	separator = " ",
	manualMode = false,
	blurAmount = 5,
	borderColor = "#3b82f6",
	glowColor = "rgba(59, 130, 246, 0.6)",
	animationDuration = 0.5,
	pauseBetweenAnimations = 1,
	className = "",
}: TrueFocusProps) {
	const words = sentence.split(separator);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

	useEffect(() => {
		if (!manualMode) {
			const interval = setInterval(
				() => {
					setCurrentIndex((prev) => (prev + 1) % words.length);
				},
				(animationDuration + pauseBetweenAnimations) * 1000,
			);

			return () => clearInterval(interval);
		}
	}, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

	useEffect(() => {
		if (currentIndex === null || currentIndex === -1) return;
		if (!wordRefs.current[currentIndex] || !containerRef.current) return;

		const parentRect = containerRef.current.getBoundingClientRect();
		const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

		setFocusRect({
			x: activeRect.left - parentRect.left,
			y: activeRect.top - parentRect.top,
			width: activeRect.width,
			height: activeRect.height,
		});
	}, [currentIndex]);

	const handleMouseEnter = (index: number) => {
		if (manualMode) {
			setLastActiveIndex(index);
			setCurrentIndex(index);
		}
	};

	const handleMouseLeave = () => {
		if (manualMode) {
			setCurrentIndex(lastActiveIndex!);
		}
	};

	return (
		<div
			className={`relative flex flex-wrap items-center justify-center gap-2 md:gap-4 ${className}`}
			ref={containerRef}
			style={{ outline: "none", userSelect: "none" }}
		>
			{words.map((word, index) => {
				const isActive = index === currentIndex;
				return (
					<span
						key={index}
						ref={(el) => {
							wordRefs.current[index] = el;
						}}
						className="relative cursor-pointer font-bold"
						style={
							{
								filter: manualMode
									? isActive
										? `blur(0px)`
										: `blur(${blurAmount}px)`
									: isActive
										? `blur(0px)`
										: `blur(${blurAmount}px)`,
								transition: `filter ${animationDuration}s ease`,
								outline: "none",
								userSelect: "none",
								fontSize: "clamp(1.5rem, 5vw, 4rem)",
							} as React.CSSProperties
						}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
					>
						{word}
					</span>
				);
			})}

			<motion.div
				className="pointer-events-none absolute top-0 left-0 box-border border-0"
				animate={{
					x: focusRect.x,
					y: focusRect.y,
					width: focusRect.width,
					height: focusRect.height,
					opacity: currentIndex >= 0 ? 1 : 0,
				}}
				transition={{
					duration: animationDuration,
				}}
				style={{ "--border-color": borderColor, "--glow-color": glowColor } as React.CSSProperties}
			>
				<span
					className="absolute top-[-8px] left-[-8px] h-3 w-3 rounded-sm border-[2px] border-r-0 border-b-0 md:top-[-10px] md:left-[-10px] md:h-4 md:w-4 md:rounded-[3px] md:border-[3px]"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 3px var(--border-color))",
					}}
				/>
				<span
					className="absolute top-[-8px] right-[-8px] h-3 w-3 rounded-sm border-[2px] border-b-0 border-l-0 md:top-[-10px] md:right-[-10px] md:h-4 md:w-4 md:rounded-[3px] md:border-[3px]"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 3px var(--border-color))",
					}}
				/>
				<span
					className="absolute bottom-[-8px] left-[-8px] h-3 w-3 rounded-sm border-[2px] border-t-0 border-r-0 md:bottom-[-10px] md:left-[-10px] md:h-4 md:w-4 md:rounded-[3px] md:border-[3px]"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 3px var(--border-color))",
					}}
				/>
				<span
					className="absolute right-[-8px] bottom-[-8px] h-3 w-3 rounded-sm border-[2px] border-t-0 border-l-0 md:right-[-10px] md:bottom-[-10px] md:h-4 md:w-4 md:rounded-[3px] md:border-[3px]"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 3px var(--border-color))",
					}}
				/>
			</motion.div>
		</div>
	);
} 
