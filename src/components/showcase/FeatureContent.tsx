"use client";

import type React from "react";

interface FeatureContentProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * 内容容器组件
 * 负责提供统一的 padding 和 max-width
 * 响应式间距：px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8
 */
export default function FeatureContent({ children, className = "" }: FeatureContentProps) {
	return (
		<div className={`mx-auto max-w-7xl px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8 ${className}`}>{children}</div>
	);
}
