"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
	show?: boolean;
	className?: string;
	text?: string;
	onClick?: () => void;
}

export default function BackButton({ show = true, className = "", text = "返回", onClick }: BackButtonProps) {
	const router = useRouter();

	// 如果show为false，不渲染组件
	if (!show) {
		return null;
	}

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			// 使用 router.back() 返回上一页，或者使用 pathname 获取上级路径
			router.back();
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400${className}
			`}
		>
			<ArrowLeft className="h-4 w-4" />
			<span>{text}</span>
		</button>
	);
}
