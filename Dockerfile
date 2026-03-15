# 优化的 Dockerfile - 更小的镜像和更快的构建
# 主要优化：跳过 Cypress、清理开发依赖和缓存、多阶段构建

FROM node:22-alpine AS base
WORKDIR /app

# 安装系统依赖和配置工具
RUN apk add --no-cache libc6-compat && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm install -g pnpm@9

# 安装依赖阶段
FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
# 设置环境变量跳过 Cypress（大幅减少镜像大小和构建时间）
ENV CYPRESS_INSTALL_BINARY=0 \
    CYPRESS_DOWNLOAD_SKIP_TEMPLATE=1
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile \
    --registry https://registry.npmmirror.com || \
    pnpm install --registry https://registry.npmmirror.com

# 构建阶段
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建并清理
RUN pnpm build && \
    pnpm prune --prod && \
    rm -rf .next/cache node_modules/.cache

# 生产运行时
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=512" \
    PORT=3000

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/uploads /app/temp && \
    chown -R nextjs:nodejs /app

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]
