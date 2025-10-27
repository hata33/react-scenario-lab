"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ProgressBarProps {
	color?: string;
	height?: number;
	showPercentage?: boolean;
	position?: "top" | "bottom";
	scrollerRef?: React.RefObject<HTMLElement>;
	scrubValue?: boolean;
}

export default function ProgressBar({
	color = "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
	height = 4,
	showPercentage = true,
	position = "top",
	scrollerRef,
	scrubValue = true,
}: ProgressBarProps) {
	const progressBarRef = useRef<HTMLDivElement>(null);
	const percentageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const progressBar = progressBarRef.current;
		const percentage = percentageRef.current;
		if (!progressBar) return;

		// 确定滚动容器
		const scroller = scrollerRef?.current || document.querySelector("#scroll-container") || window;

		// 重置进度条
		gsap.set(progressBar, { scaleX: 0 });

		// 创建进度条动画
		gsap.to(progressBar, {
			scaleX: 1,
			ease: "none",
			scrollTrigger: {
				scroller,
				trigger: "body",
				start: "top top",
				end: "bottom bottom",
				scrub: scrubValue ? 1 : false,
				onUpdate: (self) => {
					// 更新百分比显示
					if (percentage && showPercentage) {
						const progressPercent = Math.round(self.progress * 100);
						percentage.textContent = `${progressPercent}%`;
					}

					// 根据进度改变颜色
					if (self.progress > 0.8) {
						progressBar.style.background = "linear-gradient(90deg, #10b981, #3b82f6)";
					} else if (self.progress > 0.6) {
						progressBar.style.background = "linear-gradient(90deg, #8b5cf6, #ec4899)";
					} else if (self.progress > 0.4) {
						progressBar.style.background = "linear-gradient(90deg, #3b82f6, #8b5cf6)";
					} else if (self.progress > 0.2) {
						progressBar.style.background = "linear-gradient(90deg, #06b6d4, #3b82f6)";
					}
				},
			},
		});

		// 添加脉冲效果
		const pulseTimeline = gsap.timeline({ repeat: -1 });
		pulseTimeline
			.to(progressBar, {
				boxShadow: "0 0 15px rgba(59, 130, 246, 0.8)",
				duration: 1,
				ease: "power2.inOut",
			})
			.to(progressBar, {
				boxShadow: "0 0 5px rgba(59, 130, 246, 0.4)",
				duration: 1,
				ease: "power2.inOut",
			});

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
			pulseTimeline.kill();
		};
	}, [color, showPercentage, scrollerRef, scrubValue]);

	// 样式计算
	const positionStyles = position === "top" ? { top: 0 } : { bottom: 0 };

	return (
		<>
			{/* 进度条 */}
			<div
				ref={progressBarRef}
				style={{
					position: "fixed",
					left: 0,
					width: "100%",
					height: height,
					background: color,
					transformOrigin: "left",
					zIndex: 1000,
					...positionStyles,
				}}
			/>

			{/* 百分比显示 */}
			{showPercentage && (
				<div
					ref={percentageRef}
					style={{
						position: "fixed",
						[position]: position === "top" ? height + 10 : "auto",
						[position === "top" ? "left" : "bottom"]: position === "top" ? 20 : height + 10,
						background: "rgba(0, 0, 0, 0.8)",
						color: "white",
						padding: "6px 12px",
						borderRadius: 20,
						fontSize: 12,
						fontWeight: 600,
						zIndex: 1000,
						backdropFilter: "blur(10px)",
						border: "1px solid rgba(255, 255, 255, 0.2)",
						minWidth: "50px",
						textAlign: "center",
					}}
				>
					0%
				</div>
			)}
		</>
	);
}
