// Jest测试环境设置

// 设置测试环境变量
// process.env.NODE_ENV = 'test';
process.env.QR_CODE_SECRET = 'test-qr-secret';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3002';

// 测试工具函数
export const generateTestSceneId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
};

// 等待指定时间
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 生成测试签名
export const generateTestSignature = (sceneId: string, timestamp: string, nonce: string): string => {
  const crypto = require('crypto');
  const data = `${sceneId}:${timestamp}:${nonce}`;
  return crypto
    .createHmac('sha256', process.env.QR_CODE_SECRET || 'default-secret')
    .update(data)
    .digest('hex');
};

// 清理测试数据
export const cleanup = async (): Promise<void> => {
  await sleep(100); // 等待异步操作完成
};

// 全局测试钩子
beforeAll(async () => {
  console.log('🚀 测试环境初始化完成');
});

afterAll(async () => {
  await cleanup();
  console.log('🧹 测试环境清理完成');
});

beforeEach(async () => {
  // 每个测试前的准备工作
});

afterEach(async () => {
  await cleanup();
  // 每个测试后的清理工作
});