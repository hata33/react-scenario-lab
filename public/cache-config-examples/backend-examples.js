// 后端缓存配置示例
// 用于配合前端缓存系统的各种缓存策略

const express = require('express');
const redis = require('redis');
const crypto = require('crypto');
const app = express();

// Redis 客户端配置
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  db: 0
});

// ETag 生成函数
function generateETag(data) {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

// 通用缓存中间件
function cacheMiddleware(options = {}) {
  const {
    ttl = 300, // 默认5分钟
    keyGenerator = (req) => req.originalUrl,
    condition = () => true // 缓存条件
  } = options;

  return async (req, res, next) => {
    // 只缓存 GET 请求
    if (req.method !== 'GET' || !condition(req)) {
      return next();
    }

    const cacheKey = keyGenerator(req);
    const ifNoneMatch = req.headers['if-none-match'];

    try {
      // 检查 Redis 缓存
      const cached = await redisClient.get(cacheKey);

      if (cached) {
        const { data, etag, timestamp } = JSON.parse(cached);

        // 检查 ETag
        if (ifNoneMatch === etag) {
          return res.status(304).end();
        }

        res.set('ETag', etag);
        res.set('X-Cache', 'HIT');
        res.set('X-Cache-Age', Math.floor((Date.now() - timestamp) / 1000));
        return res.json(data);
      }

      // 缓存未命中，继续处理
      res.locals.cacheKey = cacheKey;
      res.locals.cacheTTL = ttl;
      next();

    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
}

// 设置缓存响应头
function setCacheHeaders(req, res, next) {
  // 根据路由设置不同的缓存策略
  const url = req.originalUrl;

  if (url.startsWith('/api/public/')) {
    // 公共 API - 可以缓存
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  } else if (url.startsWith('/api/user/')) {
    // 用户相关 API - 私有缓存
    res.set('Cache-Control', 'private, max-age=60');
  } else if (url.startsWith('/api/admin/')) {
    // 管理员 API - 不缓存
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    // 默认策略
    res.set('Cache-Control', 'public, max-age=60');
  }

  next();
}

// 缓存响应中间件
function cacheResponse() {
  return (req, res, next) => {
    const originalJson = res.json;

    res.json = function(data) {
      const { cacheKey, cacheTTL } = res.locals;

      if (cacheKey && data) {
        const etag = generateETag(data);
        const cacheData = {
          data,
          etag,
          timestamp: Date.now()
        };

        // 异步存储到 Redis
        redisClient.setex(cacheKey, cacheTTL, JSON.stringify(cacheData))
          .catch(error => console.error('Redis cache error:', error));

        res.set('ETag', etag);
        res.set('X-Cache', 'MISS');
      }

      return originalJson.call(this, data);
    };

    next();
  };
}

// 应用中间件
app.use(express.json());
app.use(setCacheHeaders);
app.use(cacheResponse());

// === API 路由示例 ===

// 1. 用户配置缓存 (TTL 策略)
app.get('/api/user/:id/config',
  cacheMiddleware({
    ttl: 3600, // 1小时
    keyGenerator: (req) => `user:${req.params.id}:config`
  }),
  async (req, res) => {
    const { id } = req.params;

    // 模拟从数据库获取用户配置
    const userConfig = {
      theme: 'dark',
      language: 'zh-CN',
      notifications: true,
      id,
      lastUpdated: new Date().toISOString()
    };

    res.json(userConfig);
  }
);

// 2. 热门商品列表 (LRU 策略模拟)
app.get('/api/products/hot',
  cacheMiddleware({
    ttl: 600, // 10分钟
    keyGenerator: () => 'products:hot'
  }),
  async (req, res) => {
    // 模拟热门商品数据
    const hotProducts = [
      { id: 1, name: '商品1', price: 99.99, views: 1000 },
      { id: 2, name: '商品2', price: 199.99, views: 850 },
      { id: 3, name: '商品3', price: 299.99, views: 720 }
    ];

    res.json(hotProducts);
  }
);

// 3. 新闻资讯 (Pattern-based 策略)
app.get('/api/news/:category?',
  cacheMiddleware({
    ttl: 300, // 5分钟
    keyGenerator: (req) => `news:${req.params.category || 'latest'}`,
    condition: (req) => {
      // 只缓存新闻列表，不缓存单条新闻详情
      return !req.query.id;
    }
  }),
  async (req, res) => {
    const { category } = req.params;

    const news = [
      { id: 1, title: '新闻标题1', category: category || 'tech', date: new Date() },
      { id: 2, title: '新闻标题2', category: category || 'tech', date: new Date() }
    ];

    res.json(news);
  }
);

// 4. 搜索结果 (Size-based 策略)
app.get('/api/search',
  cacheMiddleware({
    ttl: 1800, // 30分钟
    keyGenerator: (req) => `search:${JSON.stringify(req.query)}`,
    condition: (req) => {
      // 只缓存结果小于 10KB 的搜索
      return !req.query.large;
    }
  }),
  async (req, res) => {
    const { q = '', page = 1 } = req.query;

    const searchResults = {
      query: q,
      page,
      total: 100,
      results: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `搜索结果 ${i + 1} for "${q}"`,
        url: `https://example.com/result/${i + 1}`
      }))
    };

    res.json(searchResults);
  }
);

// 5. 文件上传 (不缓存)
app.post('/api/upload', (req, res) => {
  // 文件上传逻辑
  res.set('Cache-Control', 'no-cache');
  res.json({ success: true, message: 'File uploaded successfully' });
});

// 6. 统计数据 (Adaptive 策略)
app.get('/api/stats/:type',
  cacheMiddleware({
    ttl: 600, // 10分钟
    keyGenerator: (req) => `stats:${req.params.type}:${req.query.period || 'day'}`
  }),
  async (req, res) => {
    const { type } = req.params;
    const { period = 'day' } = req.query;

    const stats = {
      type,
      period,
      data: {
        views: Math.floor(Math.random() * 10000),
        users: Math.floor(Math.random() * 1000),
        revenue: Math.floor(Math.random() * 100000)
      },
      timestamp: new Date().toISOString()
    };

    res.json(stats);
  }
);

// 7. 清除缓存的管理接口
app.post('/api/admin/cache/clear', async (req, res) => {
  const { pattern } = req.body;

  try {
    if (pattern) {
      // 清除匹配模式的缓存
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
      res.json({ cleared: keys.length, pattern });
    } else {
      // 清除所有缓存
      await redisClient.flushdb();
      res.json({ cleared: 'all' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. 缓存统计接口
app.get('/api/admin/cache/stats', async (req, res) => {
  try {
    const info = await redisClient.info('memory');
    const keyspace = await redisClient.info('keyspace');

    res.json({
      memory: info,
      keyspace,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 错误处理
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log('Cache endpoints:');
  console.log('- GET /api/user/:id/config (TTL策略)');
  console.log('- GET /api/products/hot (LRU策略模拟)');
  console.log('- GET /api/news/:category (Pattern-based策略)');
  console.log('- GET /api/search (Size-based策略)');
  console.log('- GET /api/stats/:type (Adaptive策略)');
  console.log('- POST /api/admin/cache/clear (清除缓存)');
  console.log('- GET /api/admin/cache/stats (缓存统计)');
});

module.exports = app;