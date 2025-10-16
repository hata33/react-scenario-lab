"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProgressStep {
	title: string;
	description: string;
	icon: string;
	details: string[];
	code?: string;
}

export default function PinSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const progressStepsRef = useRef<(HTMLDivElement | null)[]>([]);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const stepsContainerRef = useRef<HTMLDivElement>(null);

	const progressSteps: ProgressStep[] = [
		{
			title: "第一步：初始化 ScrollTrigger",
			description: "注册插件并配置基础参数",
			icon: "⚙️",
			details: [
				"gsap.registerPlugin(ScrollTrigger)",
				"设置 scroller 和 trigger",
				"配置 start 和 end 位置"
			],
			code: `gsap.registerPlugin(ScrollTrigger);\ngsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top top",
    end: "bottom top"
  }
});`
		},
		{
			title: "第二步：配置触发器和动画",
			description: "定义动画属性和触发条件",
			icon: "🎬",
			details: [
				"定义动画属性 (x, y, opacity, scale)",
				"设置缓动函数 ease",
				"配置持续时间 duration"
			],
			code: `gsap.to(element, {
  x: 100,
  opacity: 1,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 80%"
  }
});`
		},
		{
			title: "第三步：添加 scrub 和 pin 效果",
			description: "实现平滑滚动和固定定位",
			icon: "📌",
			details: [
				"scrub: true 实现滚动联动",
				"pin: true 固定元素",
				"toggleActions 控制播放行为"
			],
			code: `gsap.to(element, {
  x: 200,
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=100%"
  }
});`
		},
		{
			title: "第四步：优化性能和用户体验",
			description: "添加高级功能和性能调优",
			icon: "🚀",
			details: [
				"使用 invalidateOnRefresh",
				"添加 markers 调试",
				"处理响应式和移动端"
			],
			code: `ScrollTrigger.refresh();
ScrollTrigger.addEventListener("refreshInit", () => {
  // 清理和重置逻辑
});`
		}
	];

	const setStepRef = (idx: number) => (el: HTMLDivElement | null) => {
		progressStepsRef.current[idx] = el;
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const scroller = document.querySelector('#scroll-container') || window;

		// 标题动画
		if (titleRef.current) {
			gsap.fromTo(titleRef.current,
				{ y: 80, opacity: 0, scale: 0.9 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
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

		// 创建固定区域的时间轴
		const tl = gsap.timeline({
			scrollTrigger: {
				scroller,
				trigger: section,
				start: "top top",
				end: "+=400%",
				pin: true,
				scrub: 1,
				pinSpacing: true,
				markers: false,
				onUpdate: (self) => {
					// 根据滚动进度更新背景
					const progress = self.progress;
					const hue = 220 + progress * 60; // 从蓝色到紫色
					const lightness = 15 - progress * 5; // 渐变变暗

					if (section) {
						section.style.background = `linear-gradient(135deg,
							hsl(${hue}, 70%, ${lightness}%),
							hsl(${hue + 20}, 60%, ${lightness + 5}%))`;
					}
				}
			}
		});

		// 内容区域的缩放和旋转动画
		if (contentRef.current) {
			tl.to(contentRef.current, {
				scale: 1.05,
				rotation: 2,
				duration: 0.5,
				ease: "power2.inOut"
			})
			.to(contentRef.current, {
				scale: 1,
				rotation: -1,
				duration: 0.5,
				ease: "power2.inOut"
			})
			.to(contentRef.current, {
				scale: 1.02,
				rotation: 0.5,
				duration: 0.5,
				ease: "power2.inOut"
			})
			.to(contentRef.current, {
				scale: 1,
				rotation: 0,
				duration: 0.5,
				ease: "power2.inOut"
			});
		}

		// 步骤动画
		progressStepsRef.current.forEach((step, i) => {
			if (!step) return;

			const stepData = progressSteps[i];
			if (!stepData) return;

			// 每个步骤的进入动画
			tl.to(step, {
				opacity: 1,
				y: 0,
				scale: 1,
				rotation: 0,
				duration: 0.8,
				ease: "back.out(1.3)",
			}, `step${i + 1}`);

			// 步骤内容的详细动画
			const title = step.querySelector('.step-title');
			const description = step.querySelector('.step-description');
			const icon = step.querySelector('.step-icon');
			const details = step.querySelectorAll('.step-detail');
			const codeBlock = step.querySelector('.step-code');

			if (icon) {
				tl.fromTo(icon,
					{ scale: 0, rotation: -180 },
					{ scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.8)" },
					`step${i + 1}+=0.1`
				);
			}

			if (title) {
				tl.fromTo(title,
					{ x: -30, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
					`step${i + 1}+=0.2`
				);
			}

			if (description) {
				tl.fromTo(description,
					{ x: -30, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
					`step${i + 1}+=0.3`
				);
			}

			details.forEach((detail, idx) => {
				tl.fromTo(detail,
					{ x: -20, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
					`step${i + 1}+=${0.4 + idx * 0.1}`
				);
			});

			if (codeBlock) {
				tl.fromTo(codeBlock,
					{ y: 20, opacity: 0, scale: 0.95 },
					{ y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
					`step${i + 1}+=0.6`
				);
			}

			// 高亮当前步骤
			if (i < progressStepsRef.current.length - 1) {
				tl.to(step, {
					borderColor: "rgba(255, 255, 255, 0.6)",
					background: "rgba(255, 255, 255, 0.15)",
					duration: 0.3,
					ease: "power2.inOut"
				}, `step${i + 1}+=1.5`);

				// 取消高亮
				tl.to(step, {
					borderColor: "rgba(255, 255, 255, 0.2)",
					background: "rgba(255, 255, 255, 0.1)",
					duration: 0.3,
					ease: "power2.inOut"
				}, `step${i + 2}`);
			}
		});

		// 创建背景粒子效果
		const createBackgroundParticles = () => {
			const particlesContainer = document.createElement('div');
			particlesContainer.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				overflow: hidden;
			`;

			for (let i = 0; i < 25; i++) {
				const particle = document.createElement('div');
				const size = Math.random() * 3 + 1;
				particle.style.cssText = `
					position: absolute;
					width: ${size}px;
					height: ${size}px;
					background: rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3});
					border-radius: 50%;
					top: ${Math.random() * 100}%;
					left: ${Math.random() * 100}%;
					box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
				`;
				particlesContainer.appendChild(particle);

				// 粒子随时间轴动画
				tl.to(particle, {
					y: -200 - Math.random() * 300,
					x: (Math.random() - 0.5) * 100,
					opacity: 0,
					scale: 0,
					duration: 2 + Math.random() * 2,
					ease: "none"
				}, Math.random() * 3);
			}

			section?.appendChild(particlesContainer);
			return particlesContainer;
		};

		const particlesContainer = createBackgroundParticles();

		return () => {
			ScrollTrigger.getAll().forEach(st => st.kill());
			tl.kill();
			if (particlesContainer && particlesContainer.parentNode) {
				particlesContainer.parentNode.removeChild(particlesContainer);
			}
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			style={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #1e293b, #334155)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
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
					radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 70%)
				`,
				pointerEvents: "none"
			}} />

			{/* 主要内容 */}
			<div
				ref={contentRef}
				style={{
					position: "relative",
					zIndex: 2,
					textAlign: "center",
					color: "white",
					maxWidth: 900,
					padding: "0 40px"
				}}
			>
				<h2
					ref={titleRef}
					style={{
						fontSize: "clamp(42px, 6vw, 64px)",
						fontWeight: 800,
						marginBottom: 60,
						textShadow: "0 4px 20px rgba(0,0,0,0.3)",
						letterSpacing: "-0.02em"
					}}
				>
					🎯 ScrollTrigger 实战教程
				</h2>

				{/* 步骤容器 */}
				<div
					ref={stepsContainerRef}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 40,
						maxWidth: "800px",
						margin: "0 auto"
					}}
				>
					{progressSteps.map((step, i) => (
						<div
							key={i}
							ref={setStepRef(i)}
							style={{
								padding: 40,
								borderRadius: 24,
								background: "rgba(255,255,255,0.1)",
								backdropFilter: "blur(20px)",
								border: "2px solid rgba(255,255,255,0.2)",
								opacity: 0,
								y: 80,
								scale: 0.9,
								rotation: i % 2 === 0 ? -2 : 2,
								transition: "all 0.3s ease",
								textAlign: "left",
								position: "relative",
								overflow: "hidden"
							}}
							onMouseEnter={(e) => {
								gsap.to(e.currentTarget, {
									scale: 1.02,
									duration: 0.3,
									ease: "power2.out"
								});
							}}
							onMouseLeave={(e) => {
								gsap.to(e.currentTarget, {
									scale: 1,
									duration: 0.3,
									ease: "power2.out"
								});
							}}
						>
							{/* 步骤编号 */}
							<div style={{
								position: "absolute",
								top: 20,
								right: 20,
								width: 40,
								height: 40,
								background: "rgba(255,255,255,0.2)",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 18
							}}>
								{i + 1}
							</div>

							{/* 图标和标题 */}
							<div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
								<span className="step-icon" style={{ fontSize: 32 }}>
									{step.icon}
								</span>
								<h3
									className="step-title"
									style={{
										fontSize: 24,
										fontWeight: 700,
										margin: 0,
										color: "#f8fafc"
									}}
								>
									{step.title}
								</h3>
							</div>

							{/* 描述 */}
							<p
								className="step-description"
								style={{
									fontSize: 18,
									color: "#cbd5e1",
									lineHeight: 1.6,
									marginBottom: 20,
									fontWeight: 500
								}}
							>
								{step.description}
							</p>

							{/* 详细列表 */}
							<div style={{ marginBottom: 24 }}>
								{step.details.map((detail, idx) => (
									<div
										key={idx}
										className="step-detail"
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: 12,
											marginBottom: 8,
											fontSize: 16,
											color: "#94a3b8"
										}}
									>
										<span style={{
											color: "#3b82f6",
											fontWeight: "bold",
											marginTop: 2
										}}>
											▸
										</span>
										{detail}
									</div>
								))}
							</div>

							{/* 代码示例 */}
							{step.code && (
								<div
									className="step-code"
									style={{
										background: "rgba(0,0,0,0.3)",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: 12,
										padding: 20,
										fontFamily: "'Courier New', monospace",
										fontSize: 14,
										lineHeight: 1.5,
										overflow: "auto",
										maxHeight: 200
									}}
								>
									<pre style={{ margin: 0, color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
										{step.code}
									</pre>
								</div>
							)}
						</div>
					))}
				</div>

				{/* 滚动提示 */}
				<div style={{
					marginTop: 60,
					padding: "16px 24px",
					background: "rgba(255,255,255,0.1)",
					backdropFilter: "blur(10px)",
					borderRadius: 30,
					border: "1px solid rgba(255,255,255,0.2)",
					display: "inline-block",
					fontSize: 16,
					color: "#cbd5e1"
				}}>
					📜 继续滚动查看完整教程
				</div>
			</div>
		</div>
	);
}