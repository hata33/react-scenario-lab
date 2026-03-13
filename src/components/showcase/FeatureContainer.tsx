"use client";

import type React from "react";

interface FeatureContainerProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * 外层容器组件
 * 负责提供背景色和最小高度，不包含 padding
 * 使用 FeatureContent 内部组件添加间距
 */
export default function FeatureContainer({ children, className = "" }: FeatureContainerProps) {
	return <div className={`min-h-screen bg-gray-50 ${className}`}>{children}</div>;
}
