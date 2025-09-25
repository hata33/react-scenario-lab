"use client";

import React from "react";

interface LanguageLoaderProps {
	isLoading: boolean;
	message?: string;
	variant?: "spinner" | "dots" | "pulse";
	size?: "small" | "medium" | "large";
}

export default function LanguageLoader({
	isLoading,
	message = "正在切换语言...",
	variant = "spinner",
	size = "medium",
}: LanguageLoaderProps) {
	if (!isLoading) return null;

	const sizeClasses = {
		small: {
			spinner: "w-4 h-4",
			dots: "w-1 h-1",
			pulse: "w-6 h-6",
		},
		medium: {
			spinner: "w-6 h-6",
			dots: "w-2 h-2",
			pulse: "w-8 h-8",
		},
		large: {
			spinner: "w-8 h-8",
			dots: "w-3 h-3",
			pulse: "w-12 h-12",
		},
	};

	const messageSizeClasses = {
		small: "text-sm",
		medium: "text-base",
		large: "text-lg",
	};

	const renderSpinner = () => (
		<div
			className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size].spinner}`}
		/>
	);

	const renderDots = () => (
		<div className="flex space-x-1">
			<div
				className={`animate-bounce rounded-full bg-blue-600 ${sizeClasses[size].dots}`}
				style={{ animationDelay: "0ms" }}
			/>
			<div
				className={`animate-bounce rounded-full bg-blue-600 ${sizeClasses[size].dots}`}
				style={{ animationDelay: "150ms" }}
			/>
			<div
				className={`animate-bounce rounded-full bg-blue-600 ${sizeClasses[size].dots}`}
				style={{ animationDelay: "300ms" }}
			/>
		</div>
	);

	const renderPulse = () => (
		<div
			className={`animate-pulse rounded-full bg-blue-600 ${sizeClasses[size].pulse}`}
		/>
	);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				{variant === "spinner" && renderSpinner()}
				{variant === "dots" && renderDots()}
				{variant === "pulse" && renderPulse()}
				<p
					className={`text-gray-700 dark:text-gray-300 ${messageSizeClasses[size]}`}
				>
					{message}
				</p>
			</div>
		</div>
	);
}
