# AI 图片生成功能使用指南

## 功能概述

本项目集成了多个 AI 图片生成服务，支持 OpenAI DALL-E、Stability AI Stable Diffusion 和 Midjourney。

## 支持的 AI 服务

### 1. OpenAI DALL-E
- **DALL-E 3**: 质量最高，支持详细提示词，有多种尺寸和质量选项
- **DALL-E 2**: 速度快，成本较低，适合快速生成

### 2. Stability AI Stable Diffusion XL
- 开源模型，可定制性强
- 支持负面提示词
- 可调节参数更多（steps、cfg_scale、seed）

### 3. Midjourney V6
- 艺术效果最强
- 适合创作风格化图像
- 需要通过代理服务访问

### 4. Kwai Kolors (SiliconFlow)
- 性价比高，生成速度快
- 支持中文提示词效果更好
- 适合日常图片生成需求

## 环境配置

### 1. 配置 API 密钥

在 `.env.local` 文件中添加相应的 API 密钥：

```bash
# OpenAI DALL-E 配置
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-api-key
NEXT_PUBLIC_OPENAI_BASE_URL=https://api.openai.com/v1

# Stability AI 配置
NEXT_PUBLIC_STABILITY_API_KEY=your-stability-api-key
NEXT_PUBLIC_STABILITY_BASE_URL=https://api.stability.ai/v1

# Midjourney 配置（通过代理服务）
NEXT_PUBLIC_MIDJOURNEY_API_KEY=your-midjourney-api-key
NEXT_PUBLIC_MIDJOURNEY_BASE_URL=http://localhost:3001

# SiliconFlow 配置（Kwai Kolors）
NEXT_PUBLIC_SILICONFLOW_API_KEY=your-siliconflow-api-key
NEXT_PUBLIC_SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1
```

### 2. 获取 API 密钥

#### OpenAI DALL-E
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册/登录账户
3. 在 API Keys 页面创建新的密钥
4. 确保账户有足够的余额

#### Stability AI
1. 访问 [Stability AI](https://platform.stability.ai/)
2. 注册/登录账户
3. 在 Account Settings 中找到 API Key
4. 充值账户以获得生成额度

#### Midjourney
1. 需要通过第三方代理服务
2. 获取代理服务的 API 密钥
3. 配置代理服务的 URL

#### SiliconFlow (Kwai Kolors)
1. 访问 [SiliconFlow](https://siliconflow.cn/)
2. 注册/登录账户
3. 在 API Keys 页面创建新的密钥
4. 充值账户以获得生成额度

## 使用方法

### 1. 基础使用
1. 在输入框中描述想要生成的图片
2. 点击"生成图片"按钮
3. 等待生成完成

### 2. 高级选项
- **负面提示词**: 描述不希望出现的内容
- **模型选择**: 选择不同的 AI 模型
- **尺寸设置**: 根据模型支持的尺寸选择
- **质量设置**: 标准或高清（仅 DALL-E 支持）
- **风格设置**: 生动或自然（仅 DALL-E 支持）

### 3. 参数限制
每个模型都有不同的参数支持范围：

#### DALL-E 3
- 最大提示词长度: 4000 字符
- 支持尺寸: 1024×1024, 1792×1024, 1024×1792
- 支持质量: standard, hd
- 支持风格: vivid, natural

#### DALL-E 2
- 最大提示词长度: 1000 字符
- 支持尺寸: 256×256, 512×512, 1024×1024
- 仅支持标准质量

#### Stable Diffusion XL
- 最大提示词长度: 1000 字符
- 支持尺寸: 1024×1024, 1152×896, 896×1152, 1216×832, 832×1216

#### Kwai Kolors
- 最大提示词长度: 2000 字符
- 支持尺寸: 1024×1024, 1024×768, 768×1024
- 默认参数: batch_size=1, num_inference_steps=20, guidance_scale=7.5

## 错误处理

### 常见错误及解决方案

#### 1. API 密钥未配置
- **错误**: "需要配置 API"
- **解决**: 在环境变量中添加至少一个服务的 API 密钥

#### 2. API 密钥无效
- **错误**: "API密钥无效或未配置"
- **解决**: 检查 API 密钥是否正确，确保账户有余额

#### 3. 请求频率过高
- **错误**: "请求频率过高，请稍后再试"
- **解决**: 等待一段时间后重试，或升级账户计划

#### 4. 配额用完
- **错误**: "API 配额已用完"
- **解决**: 充值账户或等待配额重置

#### 5. 内容政策违规
- **错误**: "提示词内容违反内容政策"
- **解决**: 修改提示词，避免违规内容

#### 6. 参数不支持
- **错误**: "模型 xxx 不支持尺寸 xxx"
- **解决**: 选择模型支持的参数，或更换模型

## 功能特性

### 1. 实时进度显示
- 显示生成进度百分比
- 显示当前状态描述
- 支持取消生成

### 2. 错误重试机制
- 自动重试失败的请求
- 指数退避算法
- 最多重试 3 次

### 3. 图片管理
- 下载生成的图片
- 复制图片链接
- 查看生成参数信息

### 4. 参数验证
- 自动验证模型支持的参数
- 禁用不支持的选项
- 提供清晰的错误提示

## 开发说明

### API 服务架构
```
src/app/ai/image/
├── api/
│   ├── config.ts          # API 配置
│   ├── types.ts           # 类型定义
│   └── imageApiService.ts # API 服务层
├── hooks/
│   └── useImageGeneration.ts # 图片生成 Hook
└── components/
    └── ImageGenerator.tsx     # 图片生成组件
```

### 扩展新的 AI 服务
1. 在 `config.ts` 中添加新服务的配置
2. 在 `types.ts` 中定义请求/响应类型
3. 在 `imageApiService.ts` 中实现 API 调用
4. 更新组件中的模型选项

## 安全注意事项

1. **API 密钥保护**:
   - 不要在前端代码中硬编码 API 密钥
   - 使用环境变量存储敏感信息
   - 在生产环境中使用服务器端代理

2. **内容过滤**:
   - 实现适当的内容检查
   - 遵守各服务的内容政策
   - 记录和审计生成内容

3. **费用控制**:
   - 设置生成限制
   - 监控 API 使用量
   - 实现用户配额管理

## 常见问题

### Q: 为什么我的图片生成很慢？
A: 生成速度取决于多个因素：
- 选择的模型（DALL-E 3 通常比 DALL-E 2 慢）
- 当前 API 服务器的负载
- 网络连接质量

### Q: 可以生成哪些类型的图片？
A: 大部分类型的图片都可以生成，但需要遵守：
- 各 AI 服务的内容政策
- 不涉及暴力、成人内容等
- 避免版权和商标问题

### Q: 如何提高生成质量？
A: 建议：
- 使用详细具体的提示词
- 尝试不同的模型
- 合理使用负面提示词
- 根据需要调整参数

### Q: 生成的图片版权归谁？
A: 版权归属因服务而异：
- OpenAI: 用户拥有商业使用权
- Stability AI: 根据具体订阅计划
- Midjourney: 根据订阅等级不同

请查看各服务的具体条款了解详情。