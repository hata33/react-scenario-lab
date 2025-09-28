import QRCode from 'qrcode';

export interface QRCodePayload {
  sceneId: string;
  timestamp: number;
  nonce: string;
  signature?: string;
}

export async function generateLoginQRCode(): Promise<{
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

  // 生成二维码内容URL
  const qrContent = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/login/scan?scene=${sceneId}&t=${timestamp}&n=${nonce}&s=${signature}`;

  // 生成二维码图片
  const qrCodeUrl = await QRCode.toDataURL(qrContent, {
    width: 200,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  return {
    sceneId,
    qrCodeUrl,
    expiresAt,
  };
}

// 生成数字签名
const generateSignature = (payload: Omit<QRCodePayload, 'signature'>): string => {
  const data = `${payload.sceneId}:${payload.timestamp}:${payload.nonce}`;
  const crypto = require('crypto');
  return crypto
    .createHmac('sha256', process.env.QR_CODE_SECRET || 'default-secret-key')
    .update(data)
    .digest('hex');
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
    const timestamp = parseInt(sceneId.split('-')[0]);
    const now = Date.now();
    const isValid = (now - timestamp) < 1800000; // 30分钟内有效
    return isValid && !isNaN(timestamp);
  } catch {
    return false;
  }
};