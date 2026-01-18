"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface BorderBeamProps {
	children: React.ReactNode;
	className?: string;
	color?: string;
	size?: number;
}

export function BorderBeam({ children, className = "", color = "white", size = 2 }: BorderBeamProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const beamRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !beamRef.current) return;

		const container = containerRef.current;
		const beam = beamRef.current;

		const animate = () => {
			const size = 100;
			gsap.to(beam, {
				duration: 3,
				repeat: -1,
				ease: "none",
				onUpdate: function () {
					const progress = this.progress();
					const position = progress * 400;

					// Move beam around the border
					if (position < 100) {
						gsap.set(beam, {
							top: "0%",
							left: `${position}%`,
							width: `${size}%`,
							height: `${size / 100 * 4}%`,
						});
					} else if (position < 200) {
						gsap.set(beam, {
							top: `${position - 100}%`,
							right: "0%",
							width: `${size / 100 * 4}%`,
							height: `${size}%`,
						});
					} else if (position < 300) {
						gsap.set(beam, {
							bottom: "0%",
							right: `${position - 200}%`,
							width: `${size}%`,
							height: `${size / 100 * 4}%`,
						});
					} else {
						gsap.set(beam, {
							bottom: `${position - 300}%`,
							left: "0%",
							width: `${size / 100 * 4}%`,
							height: `${size}%`,
						});
					}
				},
			});
		};

		animate();
	}, []);

	return (
		<div ref={containerRef} className={`relative overflow-hidden rounded-xl ${className}`}>
			{children}
			<div
				ref={beamRef}
				className="absolute z-10 rounded-full opacity-50 blur-md"
				style={{
					background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
					width: `${size}%`,
				}}
			/>
		</div>
	);
}
