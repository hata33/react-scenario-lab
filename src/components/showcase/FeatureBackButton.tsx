"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FeatureBackButtonProps {
	href: string;
	label?: string;
}

/**
 * 返回按钮组件
 * 带有响应式文本和触摸区域
 */
export default function FeatureBackButton({ href, label }: FeatureBackButtonProps) {
	return (
		<Link
			href={href}
			className="flex min-h-[44px] items-center text-gray-600 transition-colors hover:text-gray-900"
		>
			<ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
			<span className="hidden sm:inline">{label || "返回列表"}</span>
			<span className="sm:hidden">返回</span>
		</Link>
	);
}
