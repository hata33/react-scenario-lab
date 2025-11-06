/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean> 复制是否成功
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error("复制失败:", error);
		return false;
	}
};

/**
 * 复制文本到剪贴板并显示反馈
 * @param text 要复制的文本
 * @param setCopied 设置复制状态的函数
 * @param resetTime 重置状态的延迟时间（毫秒）
 */
export const copyWithFeedback = async (
	text: string,
	setCopied: (copied: boolean) => void,
	resetTime: number = 2000,
): Promise<void> => {
	const success = await copyToClipboard(text);
	if (success) {
		setCopied(true);
		setTimeout(() => setCopied(false), resetTime);
	}
};
