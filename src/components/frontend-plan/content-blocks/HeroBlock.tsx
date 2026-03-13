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
				"hero-block relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-white",
				styles?.className,
			)}
			style={{
				backgroundColor,
				backgroundImage: backgroundImage?.src
					? `linear-gradient(rgba(0,0,0,${backgroundImage.opacity || 0.6}), rgba(0,0,0,${backgroundImage.opacity || 0.6})), url(${backgroundImage.src})`
					: undefined,
				backgroundSize: "cover",
				backgroundPosition: "center",
				...styles,
			}}
		>
			<div className="hero-content relative z-10 mx-auto max-w-4xl text-center">
				<h1 className="hero-title mb-6 font-bold text-5xl md:text-7xl">{title}</h1>
				{subtitle && <h2 className="hero-subtitle mb-4 text-2xl text-white/80 md:text-3xl">{subtitle}</h2>}
				{description && <p className="hero-description mx-auto max-w-2xl text-lg text-white/70">{description}</p>}
				{cta && (
					<Link
						href={cta.href}
						className={cn(
							"hero-cta mt-8 inline-block rounded-lg px-6 py-3 font-semibold transition-colors",
							cta.variant === "secondary" && "bg-white/10 hover:bg-white/20",
							cta.variant === "outline" && "border-2 border-white hover:bg-white/10",
							(!cta.variant || cta.variant === "primary") && "text-white hover:opacity-90",
							"transition-all",
						)}
						style={{
							backgroundColor: cta.variant === "primary" ? primaryColor : undefined,
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
