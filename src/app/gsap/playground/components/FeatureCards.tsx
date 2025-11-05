"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
	title: string;
	description: string;
	icon: string;
	details: string[];
	tech?: string[];
}

export default function FeatureCards() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	const features: FeatureCard[] = [
		{
			title: "视差滚动",
			description: "多层次视差效果，营造深度感和立体空间",
			icon: "🎯",
			details: ["背景元素移动速度差异", "前景元素独立运动", "深度层次感营造"],
			tech: ["scrollTrigger", "scrub", "multi-layer"],
		},
		{
			title: "固定元素",
			description: "滚动时固定特定元素，创造独特视觉体验",
			icon: "📌",
			details: ["元素固定定位", "滚动触发动画", "时间轴控制"],
			tech: ["pin", "timeline", "trigger"],
		},
		{
			title: "进度指示",
			description: "实时显示滚动进度，增强用户交互体验",
			icon: "📊",
			details: ["滚动条动画", "百分比显示", "平滑过渡效果"],
			tech: ["progress", "onUpdate", "scrub"],
		},
		{
			title: "时间轴动画",
			description: "基于时间轴的序列动画，精确控制每个细节",
			icon: "⏱️",
			details: ["关键帧控制", "序列动画", "标签管理"],
			tech: ["timeline", "labels", "stagger"],
		},
		{
			title: "响应式适配",
			description: "完美适配各种设备，确保最佳观看体验",
			icon: "📱",
			details: ["断点优化", "触控支持", "性能调优"],
			tech: ["responsive", "mediaQuery", "performance"],
		},
		{
			title: "交互增强",
			description: "丰富的交互效果，让网页生动有趣",
			icon: "✨",
			details: ["鼠标悬停", "点击反馈", "状态变化"],
			tech: ["hover", "click", "state"],
		},
	];

	const setCardRef = (idx: number) => (el: HTMLDivElement | null) => {
		if (el) cardsRef.current[idx] = el;
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const scroller = document.querySelector("#scroll-container") || window;

		// 标题动画
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ y: 80, opacity: 0, rotationX: 45 },
				{
					y: 0,
					opacity: 1,
					rotationX: 0,
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
				{ y: 60, opacity: 0 },
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

		// 卡片依次进入动画
		cardsRef.current.forEach((card, i) => {
			if (!card) return;

			// 卡片基础进入动画
			const tl = gsap.timeline({
				scrollTrigger: {
					scroller,
					trigger: card,
					start: "top 85%",
					end: "top 15%",
					toggleActions: "play none none reverse",
				},
			});

			// 卡片主体动画
			tl.fromTo(
				card,
				{
					y: 120,
					opacity: 0,
					scale: 0.8,
					rotationY: i % 2 === 0 ? -15 : 15,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					rotationY: 0,
					duration: 0.8,
					ease: "back.out(1.2)",
				},
			);

			// 图标动画
			const icon = card.querySelector(".card-icon");
			if (icon) {
				tl.fromTo(
					icon,
					{ scale: 0, rotation: -180 },
					{ scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)" },
					"-=0.4",
				);
			}

			// 标题动画
			const title = card.querySelector(".card-title");
			if (title) {
				tl.fromTo(title, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
			}

			// 描述动画
			const description = card.querySelector(".card-description");
			if (description) {
				tl.fromTo(
					description,
					{ x: -30, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
					"-=0.3",
				);
			}

			// 细节列表动画
			const details = card.querySelectorAll(".card-detail");
			details.forEach((detail, idx) => {
				tl.fromTo(
					detail,
					{ x: -20, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
					`-=${0.2 + idx * 0.1}`,
				);
			});

			// 技术标签动画
			const techTags = card.querySelectorAll(".tech-tag");
			techTags.forEach((tag, _idx) => {
				tl.fromTo(
					tag,
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" },
					`-=0.1`,
				);
			});

			// 滚动时的微动效
			gsap.to(card, {
				y: -15,
				ease: "power2.inOut",
				scrollTrigger: {
					scroller,
					trigger: card,
					start: "top 60%",
					end: "bottom 40%",
					scrub: 1,
				},
			});

			// 鼠标悬停效果
			const handleMouseEnter = () => {
				gsap.to(card, {
					y: -10,
					scale: 1.02,
					rotationY: 5,
					duration: 0.4,
					ease: "power2.out",
				});

				// 图标弹跳
				if (icon) {
					gsap.to(icon, {
						rotation: 10,
						scale: 1.1,
						duration: 0.3,
						ease: "back.out(2)",
						yoyo: true,
						repeat: 1,
					});
				}
			};

			const handleMouseLeave = () => {
				gsap.to(card, {
					y: 0,
					scale: 1,
					rotationY: 0,
					duration: 0.4,
					ease: "power2.out",
				});
			};

			card.addEventListener("mouseenter", handleMouseEnter);
			card.addEventListener("mouseleave", handleMouseLeave);

			return () => {
				card.removeEventListener("mouseenter", handleMouseEnter);
				card.removeEventListener("mouseleave", handleMouseLeave);
			};
		});

		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			style={{
				padding: "120px 0",
				background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%",
			}}
		>
			<div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
				{/* 标题区域 */}
				<div style={{ textAlign: "center", marginBottom: 80 }}>
					<h2
						ref={titleRef}
						style={{
							fontSize: "clamp(36px, 5vw, 56px)",
							fontWeight: 800,
							marginBottom: 24,
							background: "linear-gradient(135deg, #1e293b, #334155)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							letterSpacing: "-0.02em",
						}}
					>
						精彩功能展示
					</h2>
					<p
						ref={subtitleRef}
						style={{
							fontSize: "clamp(18px, 2.5vw, 22px)",
							color: "#64748b",
							maxWidth: 700,
							margin: "0 auto",
							lineHeight: 1.6,
						}}
					>
						探索 GSAP ScrollTrigger 的强大功能，每个组件都经过精心设计，带来流畅自然的动画体验
					</p>
				</div>

				{/* 卡片网格 */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
						gap: 40,
						alignItems: "stretch",
					}}
				>
					{features.map((feature, i) => (
						<div
							key={i}
							ref={setCardRef(i)}
							style={{
								background: "white",
								borderRadius: 24,
								padding: 40,
								boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
								height: "100%",
								position: "relative",
								overflow: "hidden",
								cursor: "pointer",
								transition: "box-shadow 0.3s ease",
								border: "1px solid rgba(148, 163, 184, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.12)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08)";
							}}
						>
							{/* 背景装饰 */}
							<div
								style={{
									position: "absolute",
									top: -50,
									right: -50,
									width: 150,
									height: 150,
									background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 95%), hsl(${i * 60 + 30}, 70%, 98%))`,
									borderRadius: "50%",
									opacity: 0.6,
								}}
							/>

							{/* 图标 */}
							<div
								className="card-icon"
								style={{
									fontSize: 56,
									marginBottom: 24,
									textAlign: "center",
									position: "relative",
									zIndex: 1,
								}}
							>
								{feature.icon}
							</div>

							{/* 标题 */}
							<h3
								className="card-title"
								style={{
									fontSize: 28,
									fontWeight: 700,
									marginBottom: 16,
									color: "#1e293b",
									textAlign: "center",
									position: "relative",
									zIndex: 1,
								}}
							>
								{feature.title}
							</h3>

							{/* 描述 */}
							<p
								className="card-description"
								style={{
									fontSize: 16,
									color: "#64748b",
									lineHeight: 1.6,
									marginBottom: 24,
									textAlign: "center",
									position: "relative",
									zIndex: 1,
								}}
							>
								{feature.description}
							</p>

							{/* 详细特性 */}
							<div style={{ marginBottom: 24, position: "relative", zIndex: 1 }}>
								{feature.details.map((detail, idx) => (
									<div
										key={idx}
										className="card-detail"
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											marginBottom: 8,
											fontSize: 14,
											color: "#475569",
										}}
									>
										<span
											style={{
												width: 6,
												height: 6,
												background: `hsl(${i * 60}, 70%, 60%)`,
												borderRadius: "50%",
												flexShrink: 0,
											}}
										/>
										{detail}
									</div>
								))}
							</div>

							{/* 技术标签 */}
							{feature.tech && (
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: 8,
										justifyContent: "center",
										position: "relative",
										zIndex: 1,
									}}
								>
									{feature.tech.map((tech, idx) => (
										<span
											key={idx}
											className="tech-tag"
											style={{
												padding: "4px 12px",
												background: `hsla(${i * 60}, 70%, 60%, 0.1)`,
												color: `hsl(${i * 60}, 70%, 50%)`,
												borderRadius: 20,
												fontSize: 12,
												fontWeight: 600,
												border: `1px solid hsla(${i * 60}, 70%, 60%, 0.2)`,
											}}
										>
											{tech}
										</span>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
