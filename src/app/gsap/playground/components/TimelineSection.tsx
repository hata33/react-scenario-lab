"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
	year: string;
	title: string;
	description: string;
	achievements: string[];
	technologies: string[];
	color: string;
}

export default function TimelineSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const lineRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);

	const timelineItems: TimelineItem[] = [
		{
			year: "2020",
			title: "项目启动",
			description: "开始 GSAP 学习之旅，探索动画的无限可能",
			achievements: [
				"学习基础动画 API",
				"掌握缓动函数",
				"完成第一个动画项目"
			],
			technologies: ["GSAP", "CSS", "JavaScript"],
			color: "#3b82f6"
		},
		{
			year: "2021",
			title: "基础掌握",
			description: "熟练使用基础动画 API，能够创建流畅的交互动效",
			achievements: [
				"掌握 Timeline 时间轴",
				"实现复杂动画序列",
				"性能优化技巧"
			],
			technologies: ["Timeline", "Stagger", "Eases"],
			color: "#8b5cf6"
		},
		{
			year: "2022",
			title: "进阶提升",
			description: "掌握 ScrollTrigger 和高级功能，创建专业级滚动动画",
			achievements: [
				"精通 ScrollTrigger",
				"实现视差滚动效果",
				"开发完整动画库"
			],
			technologies: ["ScrollTrigger", "Parallax", "Plugin"],
			color: "#ec4899"
		},
		{
			year: "2023",
			title: "实战应用",
			description: "在实际项目中大量应用，积累了丰富的实践经验",
			achievements: [
				"完成多个商业项目",
				"建立最佳实践规范",
				"团队技术分享"
			],
			technologies: ["React", "Vue", "Performance"],
			color: "#f59e0b"
		},
		{
			year: "2024",
			title: "精通掌握",
			description: "成为 GSAP 动画专家，能够解决复杂的动画需求",
			achievements: [
				"开源动画组件库",
				"技术文章撰写",
				"社区贡献者"
			],
			technologies: ["Open Source", "Teaching", "Community"],
			color: "#10b981"
		},
		{
			year: "2025",
			title: "未来展望",
			description: "继续探索动画领域的前沿技术，推动行业发展",
			achievements: [
				"WebGL 动画探索",
				"AI 辅助动画",
				"跨平台解决方案"
			],
			technologies: ["WebGL", "AI", "WebAssembly"],
			color: "#ef4444"
		}
	];

	const setItemRef = (idx: number) => (el: HTMLDivElement | null) => {
		itemsRef.current[idx] = el;
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const scroller = document.querySelector('#scroll-container') || window;

		// 标题动画
		if (titleRef.current) {
			gsap.fromTo(titleRef.current,
				{ y: 80, opacity: 0, rotationX: 45 },
				{
					y: 0,
					opacity: 1,
					rotationX: 0,
					duration: 1.2,
					ease: "power3.out",
					scrollTrigger: {
						scroller,
						trigger: titleRef.current,
						start: "top 85%",
						end: "top 15%",
						toggleActions: "play none none reverse"
					}
				}
			);
		}

		// 副标题动画
		if (subtitleRef.current) {
			gsap.fromTo(subtitleRef.current,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power2.out",
					delay: 0.2,
					scrollTrigger: {
						scroller,
						trigger: subtitleRef.current,
						start: "top 85%",
						end: "top 15%",
						toggleActions: "play none none reverse"
					}
				}
			);
		}

		// 时间轴线进度动画
		if (lineRef.current) {
			gsap.fromTo(lineRef.current,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: "none",
					scrollTrigger: {
						scroller,
						trigger: section,
						start: "top center",
						end: "bottom center",
						scrub: 1
					}
				}
			);

			// 添加发光效果
			gsap.to(lineRef.current, {
				boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				scrollTrigger: {
					scroller,
					trigger: section,
					start: "top center",
					end: "bottom center",
					scrub: 1
				}
			});
		}

		// 时间轴项目动画
		itemsRef.current.forEach((item, i) => {
			if (!item) return;

			const itemData = timelineItems[i];
			if (!itemData) return;

			// 获取元素引用
			const dot = item.querySelector('.timeline-dot');
			const content = item.querySelector('.timeline-content');
			const year = item.querySelector('.timeline-year');
			const title = item.querySelector('.timeline-title');
			const description = item.querySelector('.timeline-description');
			const achievements = item.querySelectorAll('.timeline-achievement');
			const techTags = item.querySelectorAll('.tech-tag');

			// 圆点动画
			if (dot) {
				// 入场动画
				gsap.fromTo(dot,
					{ scale: 0, rotation: -180, opacity: 0 },
					{
						scale: 1,
						rotation: 0,
						opacity: 1,
						duration: 0.8,
						ease: "back.out(1.5)",
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// 滚动时的激活状态
				gsap.to(dot, {
					scale: 1.8,
					backgroundColor: itemData.color,
					boxShadow: `0 0 25px ${itemData.color}80`,
					duration: 0.4,
					ease: "back.out(1.2)",
					scrollTrigger: {
						scroller,
						trigger: item,
						start: "top 60%",
						end: "bottom 40%",
						toggleActions: "play none none reverse"
					}
				});
			}

			// 内容卡片的入场动画
			if (content) {
				const direction = i % 2 === 0 ? -1 : 1;
				gsap.fromTo(content,
					{
						x: direction * 100,
						opacity: 0,
						scale: 0.9,
						rotationY: direction * 15
					},
					{
						x: 0,
						opacity: 1,
						scale: 1,
						rotationY: 0,
						duration: 1,
						ease: "power3.out",
						delay: i * 0.1,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 80%",
							end: "top 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// 滚动时的微动效
				gsap.to(content, {
					y: -10,
					duration: 0.4,
					ease: "power2.inOut",
					scrollTrigger: {
						scroller,
						trigger: item,
						start: "top 50%",
						end: "bottom 50%",
						scrub: 1
					}
				});
			}

			// 年份动画
			if (year) {
				gsap.fromTo(year,
					{ scale: 0, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.6,
						ease: "back.out(1.8)",
						delay: i * 0.1 + 0.2,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// 标题动画
			if (title) {
				gsap.fromTo(title,
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.6,
						ease: "power2.out",
						delay: i * 0.1 + 0.3,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// 描述动画
			if (description) {
				gsap.fromTo(description,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.5,
						ease: "power2.out",
						delay: i * 0.1 + 0.4,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// 成就列表动画
			achievements.forEach((achievement, idx) => {
				gsap.fromTo(achievement,
					{ x: -20, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out",
						delay: i * 0.1 + 0.5 + idx * 0.1,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);
			});

			// 技术标签动画
			techTags.forEach((tag, idx) => {
				gsap.fromTo(tag,
					{ scale: 0, opacity: 0, rotation: -180 },
					{
						scale: 1,
						opacity: 1,
						rotation: 0,
						duration: 0.4,
						ease: "back.out(1.4)",
						delay: i * 0.1 + 0.6 + idx * 0.05,
						scrollTrigger: {
							scroller,
							trigger: item,
							start: "top 85%",
							end: "top 15%",
							toggleActions: "play none none reverse"
						}
					}
				);
			});

			// 鼠标悬停效果
			const handleMouseEnter = () => {
				if (content) {
					gsap.to(content, {
						scale: 1.02,
						y: -5,
						duration: 0.3,
						ease: "power2.out"
					});
				}

				if (dot) {
					gsap.to(dot, {
						scale: 2.2,
						duration: 0.3,
						ease: "back.out(2)"
					});
				}
			};

			const handleMouseLeave = () => {
				if (content) {
					gsap.to(content, {
						scale: 1,
						y: 0,
						duration: 0.3,
						ease: "power2.out"
					});
				}

				if (dot) {
					gsap.to(dot, {
						scale: 1.8,
						duration: 0.3,
						ease: "power2.out"
					});
				}
			};

			item.addEventListener('mouseenter', handleMouseEnter);
			item.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				item.removeEventListener('mouseenter', handleMouseEnter);
				item.removeEventListener('mouseleave', handleMouseLeave);
			};
		});

		return () => {
			ScrollTrigger.getAll().forEach(st => st.kill());
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			style={{
				padding: "120px 0",
				background: "linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
				position: "relative",
				overflow: "hidden"
			}}
		>
			{/* 背景装饰 */}
			<div style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: `
					radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
					radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
					radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.03) 0%, transparent 70%)
				`,
				pointerEvents: "none"
			}} />

			<div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
				{/* 标题区域 */}
				<div style={{ textAlign: "center", marginBottom: 100 }}>
					<h2
						ref={titleRef}
						style={{
							fontSize: "clamp(42px, 6vw, 64px)",
							fontWeight: 800,
							marginBottom: 24,
							background: "linear-gradient(135deg, #1e293b, #3b82f6)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							letterSpacing: "-0.02em"
						}}
					>
						发展历程
					</h2>
					<p
						ref={subtitleRef}
						style={{
							fontSize: "clamp(18px, 2.5vw, 24px)",
							color: "#64748b",
							maxWidth: 700,
							margin: "0 auto",
							lineHeight: 1.6
						}}
					>
						从初学者到专家的成长之路，每一个里程碑都是进步的见证
					</p>
				</div>

				{/* 时间轴线 */}
				<div
					ref={lineRef}
					style={{
						position: "absolute",
						left: "50%",
						top: 280,
						bottom: 100,
						width: 6,
						background: "linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #ef4444)",
						transform: "translateX(-50%)",
						transformOrigin: "top",
						borderRadius: 3,
						zIndex: 1,
						boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
					}}
				/>

				{/* 时间轴项目 */}
				{timelineItems.map((item, i) => (
					<div
						key={i}
						ref={setItemRef(i)}
						className="timeline-item"
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: 100,
							position: "relative",
							flexDirection: i % 2 === 0 ? "row" : "row-reverse"
						}}
					>
						{/* 内容区域 */}
						<div style={{
							flex: 1,
							textAlign: i % 2 === 0 ? "right" : "left",
							paddingRight: i % 2 === 0 ? 80 : 0,
							paddingLeft: i % 2 === 1 ? 80 : 0
						}}>
							<div
								className="timeline-content"
								style={{
									background: "white",
									padding: 40,
									borderRadius: 20,
									boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
									display: "inline-block",
									maxWidth: "500px",
									position: "relative",
									border: "2px solid transparent",
									transition: "all 0.3s ease",
									cursor: "pointer"
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = item.color;
									e.currentTarget.style.boxShadow = `0 20px 50px ${item.color}20`;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "transparent";
									e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.08)";
								}}
							>
								{/* 年份标签 */}
								<div
									className="timeline-year"
									style={{
										position: "absolute",
										top: -15,
										[i % 2 === 0 ? "right" : "left"]: -20,
										background: item.color,
										color: "white",
										padding: "8px 16px",
										borderRadius: 20,
										fontWeight: "bold",
										fontSize: 14,
										boxShadow: `0 4px 15px ${item.color}40`
									}}
								>
									{item.year}
								</div>

								{/* 标题 */}
								<h3
									className="timeline-title"
									style={{
										fontSize: 28,
										fontWeight: 700,
										marginBottom: 16,
										color: "#1e293b",
										marginTop: 10
									}}
								>
									{item.title}
								</h3>

								{/* 描述 */}
								<p
									className="timeline-description"
									style={{
										fontSize: 16,
										color: "#64748b",
										lineHeight: 1.6,
										marginBottom: 24
									}}
								>
									{item.description}
								</p>

								{/* 成就列表 */}
								<div style={{ marginBottom: 24 }}>
									{item.achievements.map((achievement, idx) => (
										<div
											key={idx}
											className="timeline-achievement"
											style={{
												display: "flex",
												alignItems: "flex-start",
												gap: 10,
												marginBottom: 10,
												fontSize: 14,
												color: "#475569"
											}}
										>
											<span style={{
												color: item.color,
												fontWeight: "bold",
												marginTop: 2,
												flexShrink: 0
											}}>
												✓
											</span>
											{achievement}
										</div>
									))}
								</div>

								{/* 技术标签 */}
								<div style={{
									display: "flex",
									flexWrap: "wrap",
									gap: 8,
									justifyContent: i % 2 === 0 ? "flex-end" : "flex-start"
								}}>
									{item.technologies.map((tech, idx) => (
										<span
											key={idx}
											className="tech-tag"
											style={{
												padding: "6px 12px",
												background: `${item.color}15`,
												color: item.color,
												borderRadius: 15,
												fontSize: 12,
												fontWeight: 600,
												border: `1px solid ${item.color}30`
											}}
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* 中心圆点 */}
						<div style={{
							width: 60,
							textAlign: "center",
							position: "relative",
							zIndex: 3
						}}>
							<div
								className="timeline-dot"
								style={{
									width: 30,
									height: 30,
									borderRadius: "50%",
									background: "#cbd5e1",
									margin: "0 auto",
									position: "relative",
									border: "4px solid white",
									boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
									transition: "all 0.3s ease"
								}}
							/>
						</div>

						{/* 占位空间 */}
						<div style={{ flex: 1 }} />
					</div>
				))}
			</div>
		</div>
	);
}