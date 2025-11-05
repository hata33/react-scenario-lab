import * as QRCode from "qrcode";

export interface QRCodePayload {
	sceneId: string;
	timestamp: number;
	nonce: string;
	signature?: string;
}

// 动态获取当前应用的URL
function getAppBaseUrl(): string {
	// 如果有环境变量配置，使用环境变量
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL;
	}

	// 如果是服务端，无法获取当前URL，使用默认值
	if (typeof window === "undefined") {
		// 生产环境：优先使用备用域名，否则使用默认域名
		if (process.env.NODE_ENV === "production") {
			return process.env.NEXT_DOMAIN_NAME || "https://react.hataa.com";
		}
		// 开发环境
		return "http://localhost:3002";
	}

	// 客户端获取当前URL
	const { protocol, host } = window.location;
	return `${protocol}//${host}`;
}

export async function generateLoginQRCode(request?: Request): Promise<{
	sceneId: string;
	qrCodeUrl: string;
	expiresAt: number;
}> {
	const sceneId = generateSceneId();
	const timestamp = Date.now();
	const nonce = generateNonce();
	const expiresAt = timestamp + 1800000; // 30分钟过期

	const payload: QRCodePayload = {
		sceneId,
		timestamp,
		nonce,
	};

	// 添加签名防止篡改
	const signature = generateSignature(payload);
	payload.signature = signature;

	// 动态获取应用URL
	const baseUrl = getAppBaseUrl();

	// 如果有请求对象，尝试从请求头获取Host信息
	let finalUrl = baseUrl;
	if (request) {
		const host = request.headers.get("host");
		const protocol =
			request.headers.get("x-forwarded-proto") ||
			request.headers.get("x-forwarded-protocol") ||
			(request.headers.get("x-forwarded-ssl") === "on" ? "https" : "http");

		if (host) {
			finalUrl = `${protocol}://${host}`;
		}
	}

	// 生成二维码内容URL
	const qrContent = `${finalUrl}/login/scan?scene=${sceneId}&t=${timestamp}&n=${nonce}&s=${signature}`;

	// 调试日志
	console.log("生成二维码:", {
		sceneId,
		timestamp,
		nonce: `${nonce?.substring(0, 8)}...`,
		signature: `${signature?.substring(0, 8)}...`,
		finalUrl,
		secretKey: process.env.QR_CODE_SECRET ? process.env.QR_CODE_SECRET : "未设置（使用默认值）",
	});

	// 生成二维码图片
	const qrCodeUrl = await QRCode.toDataURL(qrContent, {
		width: 200,
		margin: 2,
		color: {
			dark: "#000000",
			light: "#FFFFFF",
		},
	});

	return {
		sceneId,
		qrCodeUrl,
		expiresAt,
	};
}

// 生成数字签名
const generateSignature = (payload: Omit<QRCodePayload, "signature">): string => {
	const data = `${payload.sceneId}:${payload.timestamp}:${payload.nonce}`;
	const crypto = require("node:crypto");
	return crypto
		.createHmac("sha256", process.env.QR_CODE_SECRET || "default-secret")
		.update(data)
		.digest("hex");
};

// 生成场景ID
const generateSceneId = (): string => {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substr(2, 9);
	return `${timestamp}-${random}`;
};

// 生成随机数
const generateNonce = (): string => {
	return Math.random().toString(36).substr(2, 16);
};

// 验证二维码签名
export const validateQRCodeSignature = (payload: QRCodePayload): boolean => {
	const { sceneId, timestamp, nonce, signature } = payload;
	if (!signature) return false;

	const expectedSignature = generateSignature({ sceneId, timestamp, nonce });
	return signature === expectedSignature;
};

// 验证sceneId时效性
export const validateSceneId = (sceneId: string): boolean => {
	try {
		const timestamp = parseInt(sceneId.split("-")[0], 10);
		const now = Date.now();
		const isValid = now - timestamp < 1800000; // 30分钟内有效
		return isValid && !Number.isNaN(timestamp);
	} catch {
		return false;
	}
};
