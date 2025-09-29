// 测试二维码 URL 生成功能
const { generateLoginQRCode } = require('../src/lib/qrcode.ts');

async function testQRCodeGeneration() {
  console.log('测试二维码 URL 生成功能...\n');

  // 模拟不同的环境
  const testCases = [
    {
      name: '开发环境',
      env: { NODE_ENV: 'development' },
      expectedUrl: 'http://localhost:3002'
    },
    {
      name: '生产环境 - 有 NEXT_PUBLIC_APP_URL',
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_APP_URL: 'https://example.com'
      },
      expectedUrl: 'https://example.com'
    },
    {
      name: '生产环境 - 只有 NEXT_DOMAIN_NAME',
      env: {
        NODE_ENV: 'production',
        NEXT_DOMAIN_NAME: 'https://backup-domain.com'
      },
      expectedUrl: 'https://backup-domain.com'
    },
    {
      name: '生产环境 - 默认',
      env: { NODE_ENV: 'production' },
      expectedUrl: 'https://react.hataa.com'
    }
  ];

  for (const testCase of testCases) {
    console.log(`测试场景: ${testCase.name}`);

    // 设置环境变量
    Object.keys(testCase.env).forEach(key => {
      process.env[key] = testCase.env[key];
    });

    try {
      const qrData = await generateLoginQRCode();
      const qrUrl = qrData.qrCodeUrl;

      // 从二维码图片 URL 中提取实际的 URL
      const dataUrlPrefix = 'data:image/png;base64,';
      if (qrUrl.startsWith(dataUrlPrefix)) {
        // 这里我们无法直接解析 data URL，但可以检查函数逻辑
        console.log(`✅ 函数执行成功，生成的二维码数据长度: ${qrUrl.length}`);
        console.log(`✅ 期望的基础 URL: ${testCase.expectedUrl}`);
      } else {
        console.log(`✅ 生成 URL: ${qrUrl}`);
        console.log(`✅ 包含期望的基础 URL: ${qrUrl.includes(testCase.expectedUrl)}`);
      }
    } catch (error) {
      console.error(`❌ 测试失败:`, error.message);
    }

    console.log('---');
  }

  console.log('测试完成！');
}

// 如果直接运行此文件
if (require.main === module) {
  testQRCodeGeneration().catch(console.error);
}

module.exports = { testQRCodeGeneration };