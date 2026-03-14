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
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="hero-content relative z-10 mx-auto max-w-4xl text-center">
				{/* 渐变标题 */}
				<h1 className="hero-title mb-6 font-bold text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/70 drop-shadow-lg">
					{title}
				</h1>
				{subtitle && (
					<h2 className="hero-subtitle mb-4 text-2xl text-white/90 md:text-3xl backdrop-blur-sm bg-white/10 inline-block px-4 py-1 rounded-full">
						{subtitle}
					</h2>
				)}
				{description && <p className="hero-description mx-auto max-w-2xl text-lg text-white/80 leading-relaxed backdrop-blur-sm">{description}</p>}
				{cta && (
					<Link
						href={cta.href}
						className={cn(
							"hero-cta mt-8 inline-block rounded-xl px-8 py-4 font-bold text-lg shadow-2xl transition-all hover:-translate-y-1 hover:shadow-white/20",
							cta.variant === "secondary" && "bg-white/10 hover:bg-white/20 border border-white/30",
							cta.variant === "outline" && "border-2 border-white/50 hover:bg-white/10 hover:border-white",
							(!cta.variant || cta.variant === "primary") && "text-white hover:brightness-110",
						)}
						style={{
							backgroundColor: cta.variant === "primary" ? primaryColor : undefined,
							backgroundImage: cta.variant === "primary" ? `linear-gradient(135deg, ${primaryColor}dd, ${primaryColor}aa)` : undefined,
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
