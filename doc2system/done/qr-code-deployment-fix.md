# 二维码部署地址修复说明

## 问题描述

在部署环境中，扫码二维码后跳转到了 localhost 地址，这是因为二维码生成时使用了硬编码的 `http://localhost:3002` 地址。

## 解决方案

### 1. 代码修复

已修改 `src/lib/qrcode.ts` 文件，添加了动态获取应用URL的逻辑：

```typescript
// 动态获取当前应用的URL
function getAppBaseUrl(): string {
  // 如果有环境变量配置，使用环境变量
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 如果是服务端，无法获取当前URL，使用默认值
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3002';
  }

  // 客户端获取当前URL
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}
```

### 2. API 接口优化

更新了 `/api/login/generate` 接口，现在会从请求头获取正确的Host信息：

```typescript
// 如果有请求对象，尝试从请求头获取Host信息
let finalUrl = baseUrl;
if (request) {
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') ||
                 request.headers.get('x-forwarded-protocol') ||
                 (request.headers.get('x-forwarded-ssl') === 'on' ? 'https' : 'http');

  if (host) {
    finalUrl = `${protocol}://${host}`;
  }
}
```

### 3. 环境变量配置

在环境变量文件中添加了 `NEXT_PUBLIC_APP_URL` 配置：

#### `.env.example`
```env
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

#### `.env.production`
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 部署步骤

### 1. 设置环境变量

在部署环境中，设置正确的主机地址：

```bash
# Docker 部署
docker run -e NEXT_PUBLIC_APP_URL=https://your-domain.com ...

# 或者直接修改 .env.production 文件
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. 重新构建应用

```bash
# 清理旧的构建文件
rm -rf .next

# 重新构建
pnpm build
```

### 3. 部署测试

部署后，测试二维码生成的URL是否正确。

## 支持的部署场景

### 1. 标准域名部署
- 环境变量：`NEXT_PUBLIC_APP_URL=https://your-domain.com`
- 生成的URL：`https://your-domain.com/login/scan?scene=...`

### 2. 子路径部署
- 环境变量：`NEXT_PUBLIC_APP_URL=https://your-domain.com/app`
- 生成的URL：`https://your-domain.com/app/login/scan?scene=...`

### 3. 端口部署
- 环境变量：`NEXT_PUBLIC_APP_URL=https://your-domain.com:8443`
- 生成的URL：`https://your-domain.com:8443/login/scan?scene=...`

## 故障排除

### 二维码仍然指向 localhost

1. 确保设置了 `NEXT_PUBLIC_APP_URL` 环境变量
2. 重新构建应用
3. 检查反向代理配置是否正确传递了 `Host` 和 `X-Forwarded-Proto` 头

### 二维码无法扫描

1. 检查生成的URL是否可以正常访问
2. 确认网络防火墙设置
3. 验证证书是否有效（HTTPS）

## 反向代理配置

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    Redirect permanent / https://your-domain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName your-domain.com

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

## 测试验证

部署完成后，可以通过以下方式验证：

1. 访问扫码登录页面
2. 查看生成的二维码URL是否为正确的域名
3. 使用手机扫码验证是否能正确跳转到登录页面
4. 完成扫码登录流程测试