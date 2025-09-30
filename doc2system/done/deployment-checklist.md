# 二维码登录部署检查清单

## ✅ 已完成的修复

### 1. 签名密钥统一
- [x] 二维码生成使用 `process.env.QR_CODE_SECRET || 'default-secret'`
- [x] 签名验证使用 `process.env.QR_CODE_SECRET || 'default-secret'`
- [x] 密钥默认值已统一

### 2. 环境变量配置
- [x] `.env.example`: 设置开发环境密钥 `QR_CODE_SECRET=dev-secret-key-for-testing`
- [x] `.env.production`: 设置生产环境密钥 `QR_CODE_SECRET=your-super-secret-key-here`
- [x] URL配置：`NEXT_PUBLIC_APP_URL=https://react.hataa.com`

### 3. 调试日志
- [x] 二维码生成时输出详细参数
- [x] 签名验证时输出比较结果
- [x] 环境变量状态检查

### 4. 测试用例
- [x] 更新测试环境变量设置
- [x] 添加签名验证测试用例
- [x] 添加过期验证测试用例

## 🚀 部署前检查清单

### 环境变量检查
- [ ] `QR_CODE_SECRET` 是否设置为安全的随机密钥
- [ ] `NEXT_PUBLIC_APP_URL` 是否设置为正确的域名
- [ ] 环境变量是否正确传递到容器中

### 代码一致性检查
- [ ] 二维码生成代码和验证代码使用相同的签名算法
- [ ] 默认密钥值保持一致
- [ ] 环境变量回退逻辑正确

### 安全配置检查
- [ ] 生产环境不使用默认密钥
- [ ] 环境变量文件不包含敏感信息
- [ ] Docker镜像不包含测试配置

## 🔧 生产环境部署命令

### 1. 生成安全密钥
```bash
# 生成32字节的随机密钥
openssl rand -hex 32
# 输出示例: a1b2c3d4e5f678901234567890123456789012345678901234567890123456
```

### 2. 设置环境变量
```bash
# 生产环境
export QR_CODE_SECRET="a1b2c3d4e5f678901234567890123456789012345678901234567890123456"
export NEXT_PUBLIC_APP_URL="https://react.hataa.com"
export NODE_ENV="production"
```

### 3. Docker部署
```bash
# 构建镜像
docker build -t react-scenario-lab .

# 运行容器
docker run -d \
  -e QR_CODE_SECRET="a1b2c3d4e5f678901234567890123456789012345678901234567890123456" \
  -e NEXT_PUBLIC_APP_URL="https://react.hataa.com" \
  -e NODE_ENV="production" \
  -p 8000:3000 \
  --name react-scenario-lab \
  react-scenario-lab
```

### 4. Docker Compose部署
```yaml
version: '3.8'
services:
  app:
    image: react-scenario-lab
    environment:
      - QR_CODE_SECRET=a1b2c3d4e5f678901234567890123456789012345678901234567890123456
      - NEXT_PUBLIC_APP_URL=https://react.hataa.com
      - NODE_ENV=production
    ports:
      - "8000:3000"
    restart: unless-stopped
```

## 🧪 部署后验证

### 1. 功能验证
- [ ] 访问应用首页
- [ ] 访问扫码登录页面
- [ ] 生成二维码
- [ ] 扫描二维码（检查URL是否正确）
- [ ] 完成登录流程

### 2. 日志检查
```bash
# 查看容器日志
docker logs -f react-scenario-lab

# 检查关键日志
grep "生成二维码:" docker.log
grep "签名验证:" docker.log
```

期望看到的日志输出：
```
生成二维码: {
  sceneId: '1728xxxxxx-xxxxxxxxx',
  timestamp: 1728xxxxxx,
  nonce: 'xxxxxx...',
  signature: 'xxxxxx...',
  finalUrl: 'https://react.hataa.com',
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

### 3. 环境变量验证
```bash
# 进入容器检查
docker exec -it react-scenario-lab bash

# 检查环境变量
echo $QR_CODE_SECRET
echo $NEXT_PUBLIC_APP_URL
echo $NODE_ENV
```

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 签名验证失败
**症状**：扫码后提示"签名验证失败"

**检查项**：
- [ ] `QR_CODE_SECRET` 在生成和验证时是否一致
- [ ] 环境变量是否正确加载
- [ ] 应用是否重启以加载新环境变量

**解决方案**：
```bash
# 重启容器
docker restart react-scenario-lab

# 检查环境变量
docker exec react-scenario-lab env | grep QR_CODE_SECRET
```

#### 2. 二维码URL错误
**症状**：扫码后跳转到localhost地址

**检查项**：
- [ ] `NEXT_PUBLIC_APP_URL` 是否正确设置
- [ ] 是否重新构建了应用
- [ ] 反向代理配置是否正确

**解决方案**：
```bash
# 重新构建镜像
docker build -t react-scenario-lab .

# 重新部署
docker-compose down && docker-compose up -d
```

#### 3. 二维码过期
**症状**：生成后立即提示过期

**检查项**：
- [ ] 服务器时间是否正确
- [ ] 过期时间设置是否合理（当前为30分钟）

**解决方案**：
```bash
# 检查服务器时间
docker exec react-scenario-lab date

# 如果时间不正确，同步时间
docker exec react-scenario-lab ntpdate -s pool.ntp.org
```

## 📊 监控和告警

### 关键指标
- 二维码生成成功率
- 签名验证成功率
- 用户登录成功率
- 平均登录时间

### 日志监控
```bash
# 监控错误日志
docker logs react-scenario-lab | grep -i "error\|fail"

# 监控签名验证
docker logs react-scenario-lab | grep "签名验证"
```

## 🔄 回滚计划

如果部署后出现问题，可以快速回滚：

```bash
# 停止当前容器
docker stop react-scenario-lab
docker rm react-scenario-lab

# 使用之前的镜像（如果有）
docker run -d \
  -e QR_CODE_SECRET="previous-secret-key" \
  -e NEXT_PUBLIC_APP_URL="https://previous-domain.com" \
  -p 8000:3000 \
  --name react-scenario-lab \
  react-scenario-lab:previous-version
```

## 📞 紧急联系

如果问题无法解决，请提供以下信息：

1. **环境信息**：
   ```bash
   docker --version
   docker-compose --version
   node --version
   ```

2. **配置信息**：
   ```bash
   # 环境变量（隐藏敏感信息）
   docker exec react-scenario-lab env | grep -E "(QR_CODE_SECRET|NEXT_PUBLIC_APP_URL|NODE_ENV)"

   # 应用版本
   docker exec react-scenario-lab cat /app/package.json | grep version
   ```

3. **日志信息**：
   ```bash
   # 最近100行日志
   docker logs --tail 100 react-scenario-lab

   # 错误日志
   docker logs react-scenario-lab 2>&1 | grep -i "error\|fail"
   ```

4. **测试结果**：
   - 访问应用时的具体错误信息
   - 浏览器开发者工具的网络请求日志
   - 扫码时的具体行为描述

---

**部署前请务必确认所有检查项都已通过！** 🚀