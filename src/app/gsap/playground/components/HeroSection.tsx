"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
	onScrollTriggerUpdate?: (progress: number) => void;
}

export default function HeroSection({
	onScrollTriggerUpdate,
}: HeroSectionProps) {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const hero = heroRef.current;
		if (!hero) return;

		// 确保使用正确的滚动容器
		const scroller = document.querySelector("#scroll-container") || window;

		// 标题动画：从下方滑入并淡入，滚动时向上移动并淡出
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ y: 100, opacity: 0, scale: 0.9 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.2,
					ease: "power3.out",
					onComplete: () => {
						// 初始动画完成后，添加滚动动画
						gsap.to(titleRef.current!, {
							y: -120,
							opacity: 0.2,
							scale: 0.8,
							ease: "power2.out",
							scrollTrigger: {
								scroller,
								trigger: hero,
								start: "top top",
								end: "50% top",
								scrub: 1,
								onUpdate: (self) => {
									onScrollTriggerUpdate?.(self.progress);
								},
							},
						});
					},
				},
			);
		}

		// 副标题动画：延迟进入，滚动时淡出
		if (subtitleRef.current) {
			gsap.fromTo(
				subtitleRef.current,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 0.9,
					duration: 1,
					ease: "power2.out",
					delay: 0.3,
				},
			);

			gsap.to(subtitleRef.current, {
				y: -80,
				opacity: 0,
				scale: 0.95,
				ease: "power2.out",
				scrollTrigger: {
					scroller,
					trigger: hero,
					start: "top top",
					end: "40% top",
					scrub: 1,
				},
			});
		}

		// CTA按钮动画：弹性进入
		if (ctaRef.current) {
			gsap.fromTo(
				ctaRef.current,
				{ y: 40, opacity: 0, scale: 0.8 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "back.out(1.7)",
					delay: 0.6,
				},
			);

			gsap.to(ctaRef.current, {
				y: -30,
				opacity: 0,
				scale: 0.9,
				ease: "power2.inOut",
				scrollTrigger: {
					scroller,
					trigger: hero,
					start: "20% top",
					end: "60% top",
					scrub: 1,
				},
			});
		}

		// 背景元素动画：多层视差效果
		if (bgRef.current) {
			// 背景圆形缩放和移动
			gsap.fromTo(
				bgRef.current,
				{ scale: 0.8, x: 100, y: 100 },
				{
					scale: 1,
					x: 0,
					y: 0,
					duration: 2,
					ease: "power2.out",
				},
			);

			gsap.to(bgRef.current, {
				scale: 1.5,
				x: -150,
				y: -100,
				rotation: 15,
				ease: "none",
				scrollTrigger: {
					scroller,
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: 1.5,
				},
			});
		}

		// 创建粒子效果
		const createParticles = () => {
			const particlesContainer = document.createElement("div");
			particlesContainer.className = "particles-container";
			particlesContainer.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				overflow: hidden;
			`;

			for (let i = 0; i < 20; i++) {
				const particle = document.createElement("div");
				const size = Math.random() * 4 + 2;
				particle.style.cssText = `
					position: absolute;
					width: ${size}px;
					height: ${size}px;
					background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
					border-radius: 50%;
					top: ${Math.random() * 100}%;
					left: ${Math.random() * 100}%;
					box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
				`;
				particlesContainer.appendChild(particle);

				// 粒子动画
				gsap.fromTo(
					particle,
					{ opacity: 0, scale: 0 },
					{
						opacity: 1,
						scale: 1,
						duration: Math.random() * 2 + 1,
						ease: "power2.out",
						delay: Math.random() * 2,
					},
				);

				gsap.to(particle, {
					y: -200 - Math.random() * 300,
					x: (Math.random() - 0.5) * 200,
					opacity: 0,
					scale: 0.5,
					duration: 3 + Math.random() * 2,
					ease: "none",
					scrollTrigger: {
						scroller,
						trigger: hero,
						start: "top top",
						end: "bottom top",
						scrub: 1,
					},
				});
			}

			hero.appendChild(particlesContainer);
			return particlesContainer;
		};

		const particlesContainer = createParticles();

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
			if (particlesContainer && particlesContainer.parentNode) {
				particlesContainer.parentNode.removeChild(particlesContainer);
			}
		};
	}, [onScrollTriggerUpdate]);

	return (
		<div
			ref={heroRef}
			style={{
				minHeight: "100vh",
				position: "relative",
				background:
					"linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				marginBottom: "50vh",
			}}
		>
			{/* 背景装饰元素 */}
			<div
				ref={bgRef}
				style={{
					position: "absolute",
					top: "-30%",
					right: "-20%",
					width: "80%",
					height: "160%",
					background:
						"radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
					borderRadius: "50%",
					filter: "blur(40px)",
				}}
			/>

			{/* 额外的背景装饰 */}
			<div
				style={{
					position: "absolute",
					top: "20%",
					left: "-10%",
					width: "40%",
					height: "40%",
					background:
						"radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
					borderRadius: "50%",
					filter: "blur(30px)",
				}}
			/>

			{/* 主要内容 */}
			<div
				style={{
					position: "relative",
					zIndex: 2,
					textAlign: "center",
					color: "white",
					maxWidth: "900px",
					padding: "0 20px",
				}}
			>
				<h1
					ref={titleRef}
					style={{
						fontSize: "clamp(48px, 8vw, 84px)",
						fontWeight: 900,
						marginBottom: 24,
						lineHeight: 1.1,
						textShadow: "0 4px 20px rgba(0,0,0,0.3)",
						letterSpacing: "-0.02em",
					}}
				>
					ScrollTrigger <br />
					<span
						style={{
							background: "linear-gradient(90deg, #fff, #f0f0f0)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
					>
						魔法实验室
					</span>
				</h1>

				<p
					ref={subtitleRef}
					style={{
						fontSize: "clamp(18px, 2.5vw, 24px)",
						opacity: 0.9,
						maxWidth: 600,
						margin: "0 auto 40px",
						lineHeight: 1.6,
						fontWeight: 300,
						textShadow: "0 2px 10px rgba(0,0,0,0.2)",
					}}
				>
					体验 GSAP ScrollTrigger
					带来的极致滚动体验，包含视差、固定、时间轴等多种效果。
					<br />
					<span style={{ fontSize: "0.9em", opacity: 0.8 }}>
						向下滚动开始探索无限可能 ✨
					</span>
				</p>

				<div
					ref={ctaRef}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 12,
						padding: "16px 32px",
						background: "rgba(255, 255, 255, 0.15)",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(255, 255, 255, 0.2)",
						borderRadius: 50,
						fontSize: 18,
						fontWeight: 600,
						cursor: "pointer",
						transition: "all 0.3s ease",
						boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
					}}
					onMouseEnter={(e) => {
						gsap.to(e.currentTarget, {
							scale: 1.05,
							duration: 0.3,
							ease: "power2.out",
						});
					}}
					onMouseLeave={(e) => {
						gsap.to(e.currentTarget, {
							scale: 1,
							duration: 0.3,
							ease: "power2.out",
						});
					}}
				>
					<span>开始探索</span>
					<span style={{ fontSize: 20 }}>↓</span>
				</div>
			</div>

			{/* 滚动指示器 */}
			<div
				style={{
					position: "absolute",
					bottom: 40,
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: 3,
				}}
			>
				<div
					style={{
						width: 30,
						height: 50,
						border: "2px solid rgba(255, 255, 255, 0.8)",
						borderRadius: 15,
						position: "relative",
						cursor: "pointer",
					}}
				>
					<div
						style={{
							width: 6,
							height: 6,
							background: "white",
							borderRadius: "50%",
							position: "absolute",
							top: 8,
							left: "50%",
							transform: "translateX(-50%)",
							animation: "scrollWheel 2s infinite",
						}}
					/>
				</div>
			</div>

			<style>{`
				@keyframes scrollWheel {
					0%, 20% { transform: translateX(-50%) translateY(0); opacity: 1; }
					100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
				}
			`}</style>
		</div>
	);
}
