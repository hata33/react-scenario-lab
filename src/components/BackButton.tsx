"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
	className?: string;
	text?: string;
	onClick?: () => void;
}

export default function BackButton({
	className = "",
	text = "返回",
	onClick
}: BackButtonProps) {
	const router = useRouter();

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
			className={`
				inline-flex items-center gap-2 px-4 py-2
				bg-gray-100 hover:bg-gray-200
				text-gray-700 hover:text-gray-900
				rounded-md transition-colors duration-200
				border border-gray-300 hover:border-gray-400
				${className}
			`}
		>
			<ArrowLeft className="w-4 h-4" />
			<span>{text}</span>
		</button>
	);
}