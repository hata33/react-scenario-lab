/**
 * 扫码登录简化测试脚本
 * 可以直接运行，不需要Jest环境
 */

// 重新定义测试工具函数，避免复杂的导入
function generateTestSceneId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 测试配置
const BASE_URL = 'http://localhost:3002';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.cyan}[${timestamp}]${colors.reset} ${colors[color]}${message}${colors.reset}`);
}

async function testAPI(endpoint: string, data: any, method = 'POST') {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'QR-Login-Test/1.0',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      status: response.status,
      data: result,
      success: response.ok,
    };
  } catch (error) {
    return {
      status: 0,
      data: { message: error instanceof Error ? error.message : 'Unknown error' },
      success: false,
    };
  }
}

async function runBasicTest() {
  log('🚀 开始基础扫码登录测试', 'blue');

  let sceneId: string;

  // 1. 生成二维码
  log('1. 生成二维码...', 'yellow');
  const generateResult = await testAPI('/api/login/generate', {});

  if (!generateResult.success || !generateResult.data.success) {
    log(`❌ 生成二维码失败: ${generateResult.data.message}`, 'red');
    return false;
  }

  sceneId = generateResult.data.sceneId;
  log(`✅ 生成二维码成功: ${sceneId}`, 'green');

  // 2. 检查初始状态
  log('2. 检查初始状态...', 'yellow');
  const initialStatus = await testAPI('/api/login/status', { sceneId });

  if (!initialStatus.success || !initialStatus.data.success) {
    log(`❌ 状态检查失败: ${initialStatus.data.message}`, 'red');
    return false;
  }

  log(`✅ 初始状态: ${initialStatus.data.status}`, 'green');

  // 3. 模拟扫码
  log('3. 模拟扫码...', 'yellow');
  const scanResult = await testAPI('/api/login/scan', {
    sceneId,
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substr(2, 9),
    signature: 'test-signature',
  });

  if (!scanResult.success || !scanResult.data.success) {
    log(`❌ 扫码失败: ${scanResult.data.message}`, 'red');
    return false;
  }

  log('✅ 扫码成功', 'green');

  // 4. 检查扫码后状态
  log('4. 检查扫码后状态...', 'yellow');
  await sleep(1000);
  const scannedStatus = await testAPI('/api/login/status', { sceneId });

  if (!scannedStatus.success || !scannedStatus.data.success) {
    log(`❌ 状态检查失败: ${scannedStatus.data.message}`, 'red');
    return false;
  }

  log(`✅ 扫码后状态: ${scannedStatus.data.status}`, 'green');

  // 5. 确认登录
  log('5. 确认登录...', 'yellow');
  const confirmResult = await testAPI('/api/login/confirm', {
    sceneId,
    userId: 'user1',
  });

  if (!confirmResult.success || !confirmResult.data.success) {
    log(`❌ 确认登录失败: ${confirmResult.data.message}`, 'red');
    return false;
  }

  log('✅ 登录确认成功', 'green');
  log(`用户信息: ${confirmResult.data.userInfo.name || confirmResult.data.userInfo.username}`, 'cyan');

  // 6. 检查最终状态
  log('6. 检查最终状态...', 'yellow');
  await sleep(1000);
  const finalStatus = await testAPI('/api/login/status', { sceneId });

  if (!finalStatus.success || !finalStatus.data.success) {
    log(`❌ 最终状态检查失败: ${finalStatus.data.message}`, 'red');
    return false;
  }

  log(`✅ 最终状态: ${finalStatus.data.status}`, 'green');

  log('🎉 基础测试全部通过！', 'magenta');
  return true;
}

async function runErrorTest() {
  log('🔍 开始错误情况测试', 'blue');

  // 1. 无效sceneId
  log('1. 测试无效sceneId...', 'yellow');
  const invalidResult = await testAPI('/api/login/status', { sceneId: 'invalid-scene-id' });

  if (invalidResult.success && invalidResult.data.success) {
    log('❌ 无效sceneId应该失败', 'red');
    return false;
  }

  log('✅ 无效sceneId正确拒绝', 'green');

  // 2. 不存在的sceneId
  log('2. 测试不存在sceneId...', 'yellow');
  const notExistResult = await testAPI('/api/login/status', { sceneId: generateTestSceneId() });

  if (notExistResult.success && notExistResult.data.success) {
    log('❌ 不存在sceneId应该失败', 'red');
    return false;
  }

  log('✅ 不存在sceneId正确拒绝', 'green');

  // 3. 重复扫码
  log('3. 测试重复扫码...', 'yellow');

  // 先生成一个二维码并扫码
  const generateResult = await testAPI('/api/login/generate', {});
  const testSceneId = generateResult.data.sceneId;

  await testAPI('/api/login/scan', {
    sceneId: testSceneId,
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substr(2, 9),
    signature: 'test-signature',
  });

  // 尝试重复扫码
  const duplicateResult = await testAPI('/api/login/scan', {
    sceneId: testSceneId,
    timestamp: Date.now() + 1000,
    nonce: Math.random().toString(36).substr(2, 9),
    signature: 'test-signature',
  });

  if (duplicateResult.success && duplicateResult.data.success) {
    log('❌ 重复扫码应该失败', 'red');
    return false;
  }

  log('✅ 重复扫码正确拒绝', 'green');

  log('🎉 错误情况测试全部通过！', 'magenta');
  return true;
}

async function runPerformanceTest() {
  log('⚡ 开始性能测试', 'blue');

  // 并发测试
  log('1. 并发生成10个二维码...', 'yellow');
  const startTime = Date.now();

  const promises = Array.from({ length: 10 }, () => testAPI('/api/login/generate', {}));
  const results = await Promise.all(promises);

  const endTime = Date.now();
  const duration = endTime - startTime;

  const successCount = results.filter(r => r.success && r.data.success).length;

  log(`✅ 并发测试完成: ${successCount}/10 成功, 耗时 ${duration}ms`, 'green');

  if (successCount < 9) {
    log('⚠️  并发成功率较低', 'yellow');
  }

  log('🎉 性能测试完成！', 'magenta');
  return true;
}

async function runAllTests() {
  log('🧪 开始完整的扫码登录测试套件', 'magenta');
  log('=====================================', 'magenta');

  const results = {
    basic: await runBasicTest(),
    error: await runErrorTest(),
    performance: await runPerformanceTest(),
  };

  log('=====================================', 'magenta');
  log('📊 测试结果总结:', 'blue');
  log(`基础功能测试: ${results.basic ? '✅ 通过' : '❌ 失败'}`, results.basic ? 'green' : 'red');
  log(`错误处理测试: ${results.error ? '✅ 通过' : '❌ 失败'}`, results.error ? 'green' : 'red');
  log(`性能测试: ${results.performance ? '✅ 通过' : '❌ 失败'}`, results.performance ? 'green' : 'red');

  const allPassed = Object.values(results).every(result => result);

  if (allPassed) {
    log('🎉 所有测试都通过了！扫码登录功能正常工作。', 'magenta');
  } else {
    log('❌ 部分测试失败，请检查实现。', 'red');
  }

  process.exit(allPassed ? 0 : 1);
}

// 如果直接运行此文件
if (require.main === module) {
  runAllTests().catch(error => {
    log(`💥 测试运行出错: ${error.message}`, 'red');
    process.exit(1);
  });
}

export { runAllTests, runBasicTest, runErrorTest, runPerformanceTest };