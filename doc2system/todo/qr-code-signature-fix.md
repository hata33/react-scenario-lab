# 二维码签名验证失败修复指南

## 问题分析

部署后二维码签名验证失败的原因：

1. **签名密钥不一致**：生成签名和验证签名时使用了不同的默认密钥
2. **环境变量缺失**：`QR_CODE_SECRET` 环境变量在生产环境中未设置
3. **时间戳问题**：服务器时间可能存在差异

## 已修复的问题

### 1. 统一签名密钥
- **修复前**：生成签名使用 `'default-secret-key'`，验证签名使用 `'default-secret'`
- **修复后**：统一使用 `'default-secret'` 作为默认密钥

### 2. 环境变量配置
- 添加了 `QR_CODE_SECRET` 环境变量配置
- 支持在生产环境中自定义签名密钥

### 3. 添加调试日志
- 在二维码生成时添加详细日志
- 在签名验证时添加详细日志
- 便于排查部署后的问题

## 部署步骤

### 1. 设置环境变量

在部署环境中设置以下环境变量：

```bash
# 生产环境必须设置
QR_CODE_SECRET=your-super-secret-key-here

# 应用URL（确保正确）
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. 生成安全密钥

使用以下命令生成安全的随机密钥：

```bash
# 使用 OpenSSL 生成
openssl rand -hex 32

# 或者使用 Node.js 生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. 更新环境变量文件

#### 开发环境 (.env.example)
```env
# 二维码签名密钥（生产环境必须设置）
QR_CODE_SECRET=your-super-secret-key-here
```

#### 生产环境 (.env.production)
```env
# 二维码签名密钥（生产环境必须设置）
QR_CODE_SECRET=your-super-secret-key-here
```

## Docker 部署示例

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    image: react-scenario-lab
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
      - QR_CODE_SECRET=your-super-secret-key-here
    ports:
      - "8000:3000"
```

### Docker 命令行
```bash
docker run -d \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  -e QR_CODE_SECRET=your-super-secret-key-here \
  -p 8000:3000 \
  react-scenario-lab
```

## 故障排除

### 1. 检查日志

查看服务器日志中的调试信息：

```bash
# 查看二维码生成日志
grep "生成二维码:" logs/app.log

# 查看签名验证日志
grep "签名验证:" logs/app.log
```

期望看到的日志：
```
生成二维码: {
  sceneId: '1728xxxxxx-xxxxxxxxx',
  timestamp: 1728xxxxxx,
  nonce: 'xxxxxx...',
  signature: 'xxxxxx...',
  finalUrl: 'https://your-domain.com',
  secretKey: '已设置'
}
```

```
签名验证: {
  received: 'xxxxxx...',
  expected: 'xxxxxx...',
  isValid: true,
  secretKey: '已设置'
}
```

### 2. 常见问题

#### 问题1：签名不匹配
```
签名验证: {
  received: 'abc123...',
  expected: 'def456...',
  isValid: false,
  secretKey: '已设置'
}
```

**解决方案**：
- 确保 `QR_CODE_SECRET` 在所有环境中一致
- 检查环境变量是否正确加载
- 重启应用以加载新的环境变量

#### 问题2：使用默认密钥
```
secretKey: '未设置（使用默认值）'
```

**解决方案**：
- 设置 `QR_CODE_SECRET` 环境变量
- 确保环境变量名称正确
- 检查 Docker/Kubernetes 配置

#### 问题3：二维码URL错误
```
finalUrl: 'http://localhost:3002'
```

**解决方案**：
- 设置 `NEXT_PUBLIC_APP_URL` 环境变量
- 确保 URL 格式正确（包含协议）
- 检查反向代理配置

### 3. 验证修复

#### 步骤1：检查环境变量
```bash
# 在容器内检查
echo $QR_CODE_SECRET
echo $NEXT_PUBLIC_APP_URL
```

#### 步骤2：测试二维码生成
```bash
# 访问二维码页面
curl https://your-domain.com/auth/qr-login
```

#### 步骤3：检查日志输出
```bash
# 查看应用日志
docker logs -f <container_id>
```

#### 步骤4：测试扫码流程
1. 生成二维码
2. 扫码并查看跳转URL
3. 验证签名是否通过

## 生产环境最佳实践

### 1. 安全密钥管理
- 使用安全的随机密钥
- 定期更换密钥
- 不要在代码中硬编码密钥
- 使用密钥管理服务（如 AWS Secrets Manager）

### 2. 环境变量配置
- 使用 `.env.production` 文件
- 在 CI/CD 流程中注入环境变量
- 定期审查环境变量配置

### 3. 监控和日志
- 监控签名验证失败率
- 记录详细的错误日志
- 设置告警机制

### 4. 备份和恢复
- 备份环境变量配置
- 制定应急恢复方案
- 定期测试恢复流程

## 测试验证

### 自动化测试
```javascript
// 测试签名一致性
const testSignatureConsistency = () => {
  const payload = {
    sceneId: 'test-scene',
    timestamp: Date.now(),
    nonce: 'test-nonce'
  };

  const signature1 = generateSignature(payload);
  const signature2 = generateSignature(payload);

  console.assert(signature1 === signature2, '签名应该一致');
  console.log('签名一致性测试通过');
};
```

### 手动测试
1. 生成二维码
2. 解析二维码内容
3. 手动验证签名
4. 检查过期时间

## 联系支持

如果问题仍然存在，请提供以下信息：

1. 服务器日志（包含调试信息）
2. 环境变量配置（隐藏敏感信息）
3. 部署环境信息
4. 错误发生的时间和步骤

```bash
# 收集诊断信息
echo "=== 环境变量 ==="
env | grep -E "(QR_CODE_SECRET|NEXT_PUBLIC_APP_URL|NODE_ENV)"

echo "=== 应用版本 ==="
node -e "console.log(require('./package.json').version)"

echo "=== 最近的日志 ==="
tail -50 logs/app.log
```