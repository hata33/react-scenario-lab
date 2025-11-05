"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FloatingElement {
	id: number;
	x: number;
	y: number;
	size: number;
	rotation: number;
	color: string;
	shape: "circle" | "square" | "triangle";
	delay: number;
	duration: number;
}

export default function FloatingElements() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	const floatingElements: FloatingElement[] = [
		{
			id: 1,
			x: 15,
			y: 20,
			size: 80,
			rotation: 45,
			color: "#FF6B6B",
			shape: "circle",
			delay: 0,
			duration: 3,
		},
		{
			id: 2,
			x: 70,
			y: 15,
			size: 60,
			rotation: -30,
			color: "#4ECDC4",
			shape: "square",
			delay: 0.2,
			duration: 3.5,
		},
		{
			id: 3,
			x: 30,
			y: 60,
			size: 100,
			rotation: 60,
			color: "#45B7D1",
			shape: "triangle",
			delay: 0.4,
			duration: 4,
		},
		{
			id: 4,
			x: 80,
			y: 70,
			size: 70,
			rotation: -45,
			color: "#FFA07A",
			shape: "circle",
			delay: 0.6,
			duration: 3.2,
		},
		{
			id: 5,
			x: 10,
			y: 80,
			size: 90,
			rotation: 30,
			color: "#98D8C8",
			shape: "square",
			delay: 0.8,
			duration: 3.8,
		},
		{
			id: 6,
			x: 50,
			y: 10,
			size: 65,
			rotation: -60,
			color: "#6C5CE7",
			shape: "triangle",
			delay: 1,
			duration: 4.2,
		},
		{
			id: 7,
			x: 85,
			y: 40,
			size: 85,
			rotation: 15,
			color: "#A8E6CF",
			shape: "circle",
			delay: 1.2,
			duration: 3.6,
		},
		{
			id: 8,
			x: 25,
			y: 35,
			size: 55,
			rotation: -15,
			color: "#FFD3B6",
			shape: "square",
			delay: 1.4,
			duration: 4.5,
		},
	];

	const setElementRef = (idx: number) => (el: HTMLDivElement | null) => {
		elementsRef.current[idx] = el;
	};

	const renderShape = (element: FloatingElement) => {
		const baseStyle = {
			width: element.size,
			height: element.size,
			background: element.color,
			position: "absolute" as const,
			top: `${element.y}%`,
			left: `${element.x}%`,
			display: "flex",
			alignItems: "center" as const,
			justifyContent: "center" as const,
			color: "white",
			fontWeight: "bold",
			fontSize: Math.max(16, element.size / 4),
			boxShadow: `0 10px 30px ${element.color}50`,
			borderRadius: element.shape === "circle" ? "50%" : "20%",
			transform: `rotate(${element.rotation}deg)`,
			zIndex: 1,
		};

		if (element.shape === "triangle") {
			return (
				<div
					style={{
						...baseStyle,
						width: 0,
						height: 0,
						borderLeft: `${element.size / 2}px solid transparent`,
						borderRight: `${element.size / 2}px solid transparent`,
						borderBottom: `${element.size}px solid ${element.color}`,
						background: "transparent",
						boxShadow: "none",
						filter: `drop-shadow(0 10px 30px ${element.color}50)`,
					}}
				>
					<span
						style={{
							position: "absolute",
							top: element.size / 2,
							left: "50%",
							transform: "translateX(-50%)",
							color: "white",
							fontWeight: "bold",
							fontSize: Math.max(12, element.size / 5),
						}}
					>
						{element.id}
					</span>
				</div>
			);
		}

		return <div style={baseStyle}>{element.id}</div>;
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const scroller = document.querySelector("#scroll-container") || window;

		// 标题动画
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ y: 60, opacity: 0, scale: 0.9 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						scroller,
						trigger: titleRef.current,
						start: "top 85%",
						end: "top 15%",
						toggleActions: "play none none reverse",
					},
				},
			);
		}

		// 副标题动画
		if (subtitleRef.current) {
			gsap.fromTo(
				subtitleRef.current,
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
					delay: 0.2,
					scrollTrigger: {
						scroller,
						trigger: subtitleRef.current,
						start: "top 85%",
						end: "top 15%",
						toggleActions: "play none none reverse",
					},
				},
			);
		}

		// 浮动元素动画
		elementsRef.current.forEach((element, i) => {
			if (!element) return;

			const config = floatingElements[i];
			if (!config) return;

			// 初始动画：从随机位置进入
			const startX = (Math.random() - 0.5) * 200;
			const startY = (Math.random() - 0.5) * 200;

			gsap.fromTo(
				element,
				{
					x: startX,
					y: startY,
					opacity: 0,
					rotation: config.rotation + (Math.random() - 0.5) * 90,
					scale: 0,
				},
				{
					x: 0,
					y: 0,
					opacity: 1,
					rotation: config.rotation,
					scale: 1,
					duration: 1,
					ease: "back.out(1.4)",
					delay: config.delay,
				},
			);

			// 滚动时的复杂运动路径
			const timeline = gsap.timeline({
				scrollTrigger: {
					scroller,
					trigger: section,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
					onUpdate: (self) => {
						// 添加一些随机性的微动效
						const randomX = Math.sin(self.progress * Math.PI * 2 + config.id) * 20;
						const randomY = Math.cos(self.progress * Math.PI * 2 + config.id) * 15;
						gsap.to(element, {
							x: randomX,
							y: randomY,
							duration: 0.3,
							ease: "power2.out",
						});
					},
				},
			});

			// 复杂的路径动画
			const moveX = (config.id % 2 === 0 ? 1 : -1) * (80 + config.size * 0.5);
			const moveY = -(60 + config.size * 0.3);
			const finalRotation = config.rotation + (config.id % 2 === 0 ? 180 : -180);

			timeline
				.to(element, {
					x: moveX * 0.3,
					y: moveY * 0.2,
					rotation: config.rotation + 45,
					duration: 0.3,
					ease: "power1.inOut",
				})
				.to(element, {
					x: moveX * 0.7,
					y: moveY * 0.5,
					rotation: config.rotation - 30,
					duration: 0.3,
					ease: "power1.inOut",
				})
				.to(element, {
					x: moveX,
					y: moveY,
					rotation: finalRotation,
					duration: 0.4,
					ease: "power2.inOut",
				});

			// 鼠标悬停交互
			const handleMouseEnter = () => {
				gsap.to(element, {
					scale: 1.2,
					rotation: config.rotation + 10,
					duration: 0.3,
					ease: "back.out(2)",
				});

				// 发光效果
				gsap.to(element, {
					boxShadow: `0 15px 40px ${config.color}80`,
					duration: 0.3,
				});
			};

			const handleMouseLeave = () => {
				gsap.to(element, {
					scale: 1,
					rotation: config.rotation,
					duration: 0.3,
					ease: "power2.out",
				});

				gsap.to(element, {
					boxShadow: `0 10px 30px ${config.color}50`,
					duration: 0.3,
				});
			};

			const handleClick = () => {
				// 点击时的弹跳动画
				gsap
					.timeline()
					.to(element, {
						scale: 0.8,
						duration: 0.1,
						ease: "power2.in",
					})
					.to(element, {
						scale: 1.3,
						duration: 0.2,
						ease: "back.out(2)",
					})
					.to(element, {
						scale: 1,
						duration: 0.2,
						ease: "bounce.out",
					});

				// 创建涟漪效果
				const ripple = document.createElement("div");
				ripple.style.cssText = `
					position: absolute;
					top: 50%;
					left: 50%;
					width: 20px;
					height: 20px;
					background: ${config.color}40;
					border: 2px solid ${config.color};
					border-radius: 50%;
					transform: translate(-50%, -50%);
					pointer-events: none;
				`;
				element.appendChild(ripple);

				gsap.to(ripple, {
					width: 150,
					height: 150,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out",
					onComplete: () => {
						if (ripple.parentNode) {
							ripple.parentNode.removeChild(ripple);
						}
					},
				});
			};

			element.addEventListener("mouseenter", handleMouseEnter);
			element.addEventListener("mouseleave", handleMouseLeave);
			element.addEventListener("click", handleClick);

			// 持续的浮动动画
			gsap.to(element, {
				y: "+=10",
				duration: config.duration + Math.random() * 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: config.delay,
			});

			return () => {
				element.removeEventListener("mouseenter", handleMouseEnter);
				element.removeEventListener("mouseleave", handleMouseLeave);
				element.removeEventListener("click", handleClick);
			};
		});

		// 背景装饰粒子
		const createBackgroundParticles = () => {
			const particlesContainer = document.createElement("div");
			particlesContainer.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				overflow: hidden;
			`;

			for (let i = 0; i < 30; i++) {
				const particle = document.createElement("div");
				const size = Math.random() * 3 + 1;
				particle.style.cssText = `
					position: absolute;
					width: ${size}px;
					height: ${size}px;
					background: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2});
					border-radius: 50%;
					top: ${Math.random() * 100}%;
					left: ${Math.random() * 100}%;
				`;
				particlesContainer.appendChild(particle);

				// 粒子动画
				gsap.to(particle, {
					y: -300 - Math.random() * 200,
					x: (Math.random() - 0.5) * 100,
					opacity: 0,
					duration: 8 + Math.random() * 4,
					repeat: -1,
					delay: Math.random() * 8,
					ease: "none",
				});
			}

			section?.appendChild(particlesContainer);
			return particlesContainer;
		};

		const particlesContainer = createBackgroundParticles();

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
			if (particlesContainer?.parentNode) {
				particlesContainer.parentNode.removeChild(particlesContainer);
			}
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			style={{
				height: "150vh",
				position: "relative",
				background: "linear-gradient(135deg, #fef3c7, #fde68a, #fcd34d)",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* 背景装饰 */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: `
					radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
					radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)
				`,
					pointerEvents: "none",
				}}
			/>

			{/* 主要内容 */}
			<div
				style={{
					position: "relative",
					zIndex: 2,
					textAlign: "center",
					maxWidth: 800,
					padding: "0 40px",
				}}
			>
				<h2
					ref={titleRef}
					style={{
						fontSize: "clamp(42px, 6vw, 72px)",
						color: "#92400e",
						marginBottom: 24,
						fontWeight: 800,
						textShadow: "0 4px 20px rgba(146, 64, 14, 0.2)",
					}}
				>
					浮动元素乐园
				</h2>
				<p
					ref={subtitleRef}
					style={{
						fontSize: "clamp(18px, 2.5vw, 24px)",
						color: "#b45309",
						maxWidth: 600,
						margin: "0 auto",
						lineHeight: 1.6,
						fontWeight: 500,
					}}
				>
					滚动时观察元素的复杂运动轨迹，体验多层次的视差效果。
					<br />
					<span style={{ fontSize: "0.9em", opacity: 0.8 }}>点击元素查看交互动画 ✨</span>
				</p>

				{/* 提示信息 */}
				<div
					style={{
						marginTop: 40,
						padding: "20px 30px",
						background: "rgba(255, 255, 255, 0.3)",
						backdropFilter: "blur(20px)",
						borderRadius: 20,
						border: "1px solid rgba(255, 255, 255, 0.4)",
						display: "inline-block",
					}}
				>
					<p
						style={{
							margin: 0,
							fontSize: 16,
							color: "#92400e",
							fontWeight: 600,
						}}
					>
						💡 提示：移动鼠标到元素上查看悬停效果，点击触发弹跳动画
					</p>
				</div>
			</div>

			{/* 浮动元素 */}
			{floatingElements.map((element, i) => (
				<div
					key={element.id}
					ref={setElementRef(i)}
					style={{
						position: "absolute",
						cursor: "pointer",
						transition: "filter 0.3s ease",
					}}
				>
					{renderShape(element)}
				</div>
			))}
		</div>
	);
}
