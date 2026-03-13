"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
	show?: boolean;
	className?: string;
	text?: string;
	onClick?: () => void;
	/** 紧凑模式：仅显示图标，用于顶部栏 */
	compact?: boolean;
}

export default function BackButton({ show = true, className = "", text = "返回", onClick, compact = false }: BackButtonProps) {
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

	// 紧凑模式：仅显示图标，用于顶部栏
	if (compact) {
		return (
			<button
				onClick={handleClick}
				className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-gray-700 transition-transform hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 ${className}
				}`}
				aria-label="返回"
			>
				<ArrowLeft className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			onClick={handleClick}
			className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 hover:text-gray-900 active:scale-95 ${className}
			`}
		>
			<ArrowLeft className="h-4 w-4" />
			<span>{text}</span>
		</button>
	);
}
