/**
 * 扫码登录功能集成测试
 */
import { generateTestSceneId, generateTestSignature, sleep } from '../setup';

describe('扫码登录功能', () => {
  const baseUrl = 'http://localhost:3002';
  let sceneId: string;
  let qrData: any;

  describe('核心功能测试', () => {
    test('生成二维码', async () => {
      const response = await fetch(`${baseUrl}/api/login/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Jest-Test/1.0',
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.sceneId).toBeDefined();
      expect(data.qrCodeUrl).toBeDefined();
      expect(data.expiresAt).toBeDefined();
      expect(data.timestamp).toBeDefined();

      sceneId = data.sceneId;
      qrData = data;

      console.log('✅ 二维码生成成功:', sceneId);
    });

    test('检查初始状态', async () => {
      const response = await fetch(`${baseUrl}/api/login/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneId }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.status).toBe('waiting');
      expect(data.timestamp).toBeDefined();

      console.log('✅ 初始状态检查成功:', data.status);
    });

    test('模拟扫码', async () => {
      const scanData = {
        sceneId,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substr(2, 9),
        signature: 'test-signature',
      };

      const response = await fetch(`${baseUrl}/api/login/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scanData),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.message).toBe('扫码成功');
      expect(data.sceneId).toBe(sceneId);

      console.log('✅ 扫码成功');
    });

    test('检查扫码后状态', async () => {
      // 等待状态更新
      await sleep(1000);

      const response = await fetch(`${baseUrl}/api/login/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneId }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.status).toBe('scanned');

      console.log('✅ 扫码后状态检查成功:', data.status);
    });

    test('确认登录', async () => {
      const confirmData = {
        sceneId,
        userId: 'user1',
      };

      const response = await fetch(`${baseUrl}/api/login/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmData),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.token).toBeDefined();
      expect(data.userInfo).toBeDefined();
      expect(data.userInfo.id).toBe('user1');

      console.log('✅ 登录确认成功');
    });

    test('检查最终状态', async () => {
      // 等待状态更新
      await sleep(1000);

      const response = await fetch(`${baseUrl}/api/login/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneId }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.status).toBe('confirmed');
      expect(data.userInfo).toBeDefined();

      console.log('✅ 最终状态检查成功:', data.status);
    });
  });

  describe('异常情况测试', () => {
    test('无效sceneId', async () => {
      const response = await fetch(`${baseUrl}/api/login/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneId: 'invalid-scene-id' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('无效的sceneId');

      console.log('✅ 无效sceneId测试通过');
    });

    test('不存在的sceneId', async () => {
      const response = await fetch(`${baseUrl}/api/login/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneId: generateTestSceneId() }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('会话不存在或已过期');

      console.log('✅ 不存在sceneId测试通过');
    });

    test('重复扫码', async () => {
      if (!sceneId) {
        // 创建新的sceneId进行测试
        const generateResponse = await fetch(`${baseUrl}/api/login/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const generateData = await generateResponse.json();
        sceneId = generateData.sceneId;

        // 先扫码一次
        await fetch(`${baseUrl}/api/login/scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sceneId,
            timestamp: Date.now(),
            nonce: Math.random().toString(36).substr(2, 9),
            signature: 'test-signature',
          }),
        });
      }

      // 尝试重复扫码
      const response = await fetch(`${baseUrl}/api/login/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneId,
          timestamp: Date.now(),
          nonce: Math.random().toString(36).substr(2, 9),
          signature: 'test-signature',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('二维码已被扫描');

      console.log('✅ 重复扫码测试通过');
    });

    test('未扫码就确认登录', async () => {
      const newSceneId = generateTestSceneId();

      const response = await fetch(`${baseUrl}/api/login/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneId: newSceneId,
          userId: 'user1',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('会话不存在或已过期');

      console.log('✅ 未扫码确认测试通过');
    });
  });

  describe('签名验证测试', () => {
    test('有效签名验证', async () => {
      const testSceneId = generateTestSceneId();
      const timestamp = Date.now().toString();
      const nonce = Math.random().toString(36).substr(2, 9);
      const signature = generateTestSignature(testSceneId, timestamp, nonce);

      const response = await fetch(`${baseUrl}/api/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneId: testSceneId,
          timestamp,
          nonce,
          signature,
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.message).toBe('验证成功');

      console.log('✅ 有效签名验证测试通过');
    });

    test('无效签名验证', async () => {
      const testSceneId = generateTestSceneId();
      const timestamp = Date.now().toString();
      const nonce = Math.random().toString(36).substr(2, 9);
      const invalidSignature = 'invalid-signature';

      const response = await fetch(`${baseUrl}/api/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneId: testSceneId,
          timestamp,
          nonce,
          signature: invalidSignature,
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('签名验证失败');

      console.log('✅ 无效签名验证测试通过');
    });

    test('过期时间验证', async () => {
      const testSceneId = generateTestSceneId();
      const expiredTimestamp = (Date.now() - 1800000 - 1000).toString(); // 过期1秒
      const nonce = Math.random().toString(36).substr(2, 9);
      const signature = generateTestSignature(testSceneId, expiredTimestamp, nonce);

      const response = await fetch(`${baseUrl}/api/login/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneId: testSceneId,
          timestamp: expiredTimestamp,
          nonce,
          signature,
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toContain('二维码已过期');

      console.log('✅ 过期时间验证测试通过');
    });
  });

  describe('性能测试', () => {
    test('并发扫码测试', async () => {
      // 生成5个二维码
      const qrCodes = [];
      for (let i = 0; i < 5; i++) {
        const response = await fetch(`${baseUrl}/api/login/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        qrCodes.push(data);
      }

      expect(qrCodes).toHaveLength(5);

      // 并发扫码
      const scanPromises = qrCodes.map(async (qr, index) => {
        const response = await fetch(`${baseUrl}/api/login/scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sceneId: qr.sceneId,
            timestamp: Date.now() + index,
            nonce: Math.random().toString(36).substr(2, 9),
            signature: 'test-signature',
          }),
        });
        return response.json();
      });

      const scanResults = await Promise.all(scanPromises);

      scanResults.forEach((result, index) => {
        expect(result.success).toBe(true);
        expect(result.sceneId).toBe(qrCodes[index].sceneId);
      });

      console.log('✅ 并发扫码测试通过');
    }, 15000); // 15秒超时
  });
});

describe('端到端测试', () => {
  test('完整扫码登录流程', async () => {
    // 1. 生成二维码
    const generateResponse = await fetch(`${baseUrl}/api/login/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const generateData = await generateResponse.json();
    expect(generateData.success).toBe(true);

    const sceneId = generateData.sceneId;

    // 2. 模拟移动端扫码
    const scanResponse = await fetch(`${baseUrl}/api/login/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sceneId,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substr(2, 9),
        signature: 'test-signature',
      }),
    });

    const scanData = await scanResponse.json();
    expect(scanData.success).toBe(true);

    // 3. 模拟用户确认
    const confirmResponse = await fetch(`${baseUrl}/api/login/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sceneId,
        userId: 'user1',
      }),
    });

    const confirmData = await confirmResponse.json();
    expect(confirmData.success).toBe(true);
    expect(confirmData.token).toBeDefined();
    expect(confirmData.userInfo).toBeDefined();

    // 4. 验证最终状态
    await sleep(1000);
    const statusResponse = await fetch(`${baseUrl}/api/login/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sceneId }),
    });

    const statusData = await statusResponse.json();
    expect(statusData.success).toBe(true);
    expect(statusData.status).toBe('confirmed');

    console.log('🎉 完整扫码登录流程测试通过');
  }, 10000);
});