import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ContentBlockStyles, HeroBlockContent } from "@/types/era";

interface HeroBlockProps {
	content: HeroBlockContent;
	styles?: ContentBlockStyles;
	era?: {
		theme?: {
			primaryColor: string;
			backgroundColor: string;
		};
	};
}

export function HeroBlock({ content, styles, era }: HeroBlockProps) {
	const { title, subtitle, description, backgroundImage, cta } = content;

	// 使用时代主题颜色或默认颜色
	const primaryColor = era?.theme?.primaryColor || "#3b82f6";
	const backgroundColor = era?.theme?.backgroundColor || "#1e293b";

	return (
		<section
			className={cn(
				"hero-block relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-white",
				styles?.className,
			)}
			style={{
				backgroundColor,
				backgroundImage: backgroundImage?.src
					? `linear-gradient(rgba(0,0,0,${backgroundImage.opacity || 0.7}), rgba(0,0,0,${backgroundImage.opacity || 0.7})), url(${backgroundImage.src})`
					: undefined,
				backgroundSize: "cover",
				backgroundPosition: "center",
				...styles,
			}}
		>
			{/* 装饰性光效背景 */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl" />
				<div className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000" />
				<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
			</div>

			<div className="hero-content relative z-10 mx-auto max-w-4xl text-center">
				{/* 渐变标题 */}
				<h1 className="hero-title mb-6 bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text font-bold text-5xl text-transparent drop-shadow-lg md:text-7xl">
					{title}
				</h1>
				{subtitle && (
					<h2 className="hero-subtitle mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-2xl text-white/90 backdrop-blur-sm md:text-3xl">
						{subtitle}
					</h2>
				)}
				{description && (
					<p className="hero-description mx-auto max-w-2xl text-lg text-white/80 leading-relaxed backdrop-blur-sm">
						{description}
					</p>
				)}
				{cta && (
					<Link
						href={cta.href}
						className={cn(
							"hero-cta hover:-translate-y-1 mt-8 inline-block rounded-xl px-8 py-4 font-bold text-lg shadow-2xl transition-all hover:shadow-white/20",
							cta.variant === "secondary" && "border border-white/30 bg-white/10 hover:bg-white/20",
							cta.variant === "outline" && "border-2 border-white/50 hover:border-white hover:bg-white/10",
							(!cta.variant || cta.variant === "primary") && "text-white hover:brightness-110",
						)}
						style={{
							backgroundColor: cta.variant === "primary" ? primaryColor : undefined,
							backgroundImage:
								cta.variant === "primary" ? `linear-gradient(135deg, ${primaryColor}dd, ${primaryColor}aa)` : undefined,
						}}
					>
						{cta.label}
					</Link>
				)}
			</div>

			{/* 来源标注 */}
			{styles?.source && (
				<div className="hero-source absolute right-4 bottom-4 text-white/50 text-xs">
					<a
						href={styles.source.url}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-white/70"
					>
						来源: {styles.source.text}
					</a>
				</div>
			)}
		</section>
	);
}
