// // Jest测试环境设置

// // 设置测试环境变量
// process.env.NODE_ENV = 'test';
// process.env.JWT_SECRET = 'test-secret-key';
// process.env.QR_CODE_SECRET = 'test-qr-secret';
// process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3002';

// // 全局测试超时设置
// jest.setTimeout(30000);

// // 模拟Next.js的请求对象
// global.createMockRequest = (overrides = {}) => ({
//   headers: new Map([
//     ['user-agent', 'jest-test'],
//     ['content-type', 'application/json'],
//     ...Object.entries(overrides.headers || {}),
//   ]),
//   method: 'POST',
//   url: '/test',
//   ...overrides,
// });

// // 模拟Next.js的响应对象
// global.createMockResponse = () => ({
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn().mockReturnThis(),
//   headers: new Map(),
// });

// // 测试工具函数
// global.testUtils = {
//   // 生成测试用的sceneId
//   generateTestSceneId: () => {
//     const timestamp = Date.now();
//     const random = Math.random().toString(36).substring(2, 11);
//     return `${timestamp}-${random}`;
//   },

//   // 等待指定时间
//   sleep: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

//   // 生成测试签名
//   generateTestSignature: (sceneId: string, timestamp: string, nonce: string) => {
//     const crypto = require('crypto');
//     const data = `${sceneId}:${timestamp}:${nonce}`;
//     return crypto
//       .createHmac('sha256', 'test-qr-secret')
//       .update(data)
//       .digest('hex');
//   },

//   // 清理测试数据
//   cleanup: async () => {
//     // 这里可以添加测试后的清理逻辑
//     await global.testUtils.sleep(100); // 等待异步操作完成
//   },
// };

// // 全局测试钩子
// beforeAll(async () => {
//   console.log('🚀 测试环境初始化完成');
// });

// afterAll(async () => {
//   await global.testUtils.cleanup();
//   console.log('🧹 测试环境清理完成');
// });

// beforeEach(async () => {
//   // 每个测试前的准备工作
// });

// afterEach(async () => {
//   // 每个测试后的清理工作
//   await global.testUtils.cleanup();
// });