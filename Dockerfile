# 使用 Node.js 作为基础镜像
FROM node:20-alpine AS base

# 设置工作目录
WORKDIR /app

# 设置国内镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 安装依赖阶段
FROM base AS deps
# 安装 pnpm
RUN npm install -g pnpm

# 检查 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么需要 libc6-compat
RUN apk add --no-cache libc6-compat

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖 (只安装生产环境需要的依赖)
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --prod \
    --registry https://registry.npmmirror.com

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM base AS runner
WORKDIR /app

# 设置默认环境变量
ENV NODE_ENV=production
ENV CONTAINER_PORT=3000
ENV HOSTNAME=0.0.0.0

# 创建非 root 用户并设置权限
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

USER nextjs

# 复制构建产物和必要文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 暴露端口（使用环境变量）
EXPOSE ${CONTAINER_PORT}

# 启动命令
CMD ["node", "server.js"]
