import { MemoryCache } from './memory-cache';
import { LocalStorageAdapter, SessionStorageAdapter } from './storage-manager';
import { HttpCacheManager } from './http-cache';
import { CacheConfig, CacheStrategy, StorageAdapter } from './types';
import { StrategyFactory } from './strategies';

export class UnifiedCacheManager {
  private memoryCache: MemoryCache;
  private localStorage: LocalStorageAdapter;
  private sessionStorage: SessionStorageAdapter;
  private httpCache: HttpCacheManager;
  private strategy: CacheStrategy;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(config: CacheConfig = {}) {
    this.memoryCache = new MemoryCache(config);
    this.localStorage = new LocalStorageAdapter('unified_cache_');
    this.sessionStorage = new SessionStorageAdapter('session_cache_');
    this.httpCache = new HttpCacheManager(undefined, {
      ttl: config.defaultTTL,
      maxSize: config.maxSize
    });

    this.strategy = config.strategy || StrategyFactory.createTTL(config.defaultTTL);

    // 启动定期清理
    if (config.enableMetrics !== false) {
      this.startCleanupInterval();
    }
  }

  // === 内存缓存操作 ===
  get<T = any>(key: string): T | null {
    return this.memoryCache.get(key);
  }

  set(key: string, value: any, ttl?: number): void {
    if (this.strategy.shouldCache(key, value)) {
      this.memoryCache.set(key, value, ttl);
      this.strategy.onAccess({
        key,
        data: value,
        timestamp: Date.now(),
        ttl: ttl || this.getDefaultTTL()
      });
    }
  }

  remove(key: string): boolean {
    return this.memoryCache.remove(key);
  }

  clearMemory(): void {
    this.memoryCache.clear();
  }

  // === 本地存储操作 ===
  async getLocal<T = any>(key: string): Promise<T | null> {
    return this.localStorage.get(key);
  }

  async setLocal(key: string, value: any, ttl?: number): Promise<void> {
    if (this.strategy.shouldCache(key, value)) {
      await this.localStorage.set(key, value, { ttl });
    }
  }

  async removeLocal(key: string): Promise<void> {
    await this.localStorage.remove(key);
  }

  async clearLocal(): Promise<void> {
    await this.localStorage.clear();
  }

  // === 会话存储操作 ===
  async getSession<T = any>(key: string): Promise<T | null> {
    return this.sessionStorage.get(key);
  }

  async setSession(key: string, value: any, ttl?: number): Promise<void> {
    if (this.strategy.shouldCache(key, value)) {
      await this.sessionStorage.set(key, value, { ttl });
    }
  }

  async removeSession(key: string): Promise<void> {
    await this.sessionStorage.remove(key);
  }

  async clearSession(): Promise<void> {
    await this.sessionStorage.clear();
  }

  // === HTTP 缓存操作 ===
  async getHttp(url: string, options?: RequestInit): Promise<any> {
    return this.httpCache.get(url, options as any);
  }

  async forceGetHttp(url: string, options?: RequestInit): Promise<any> {
    return this.httpCache.forceGetHttp(url, options as any);
  }

  clearHttpCache(): void {
    this.httpCache.clearCache();
  }

  clearHttpCacheForUrl(url: string, options?: RequestInit): void {
    this.httpCache.clearCacheForUrl(url, options as any);
  }

  // === 统一操作 ===
  async getAny<T = any>(key: string): Promise<T | null> {
    // 优先级：内存 -> 会话 -> 本地
    let value = this.memoryCache.get(key);
    if (value !== null) return value;

    value = await this.sessionStorage.get(key);
    if (value !== null) {
      // 将会话数据提升到内存
      this.memoryCache.set(key, value);
      return value;
    }

    value = await this.localStorage.get(key);
    if (value !== null) {
      // 将本地数据提升到内存
      this.memoryCache.set(key, value);
      return value;
    }

    return null;
  }

  async setAny(key: string, value: any, options: { ttl?: number; storage?: 'memory' | 'local' | 'session' } = {}): Promise<void> {
    const { ttl, storage = 'memory' } = options;

    switch (storage) {
      case 'memory':
        this.set(key, value, ttl);
        break;
      case 'local':
        await this.setLocal(key, value, ttl);
        break;
      case 'session':
        await this.setSession(key, value, ttl);
        break;
    }
  }

  async removeAny(key: string): Promise<void> {
    this.remove(key);
    await this.removeLocal(key);
    await this.removeSession(key);
  }

  // === 统计和监控 ===
  getMetrics() {
    return {
      memory: this.memoryCache.getMetrics(),
      http: this.httpCache.getCacheStats(),
      strategy: this.strategy.name
    };
  }

  // === 缓存策略管理 ===
  setStrategy(strategy: CacheStrategy): void {
    this.strategy = strategy;
  }

  getStrategy(): CacheStrategy {
    return this.strategy;
  }

  // === 缓存预热 ===
  async warmup(data: Array<{ key: string; value: any; ttl?: number; storage?: 'memory' | 'local' | 'session' }>): Promise<void> {
    const promises = data.map(item =>
      this.setAny(item.key, item.value, {
        ttl: item.ttl,
        storage: item.storage
      })
    );

    await Promise.all(promises);
  }

  // === 缓存失效 ===
  async invalidate(pattern: string | RegExp): Promise<void> {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    // 清理内存缓存
    const memoryKeys = this.memoryCache.keys();
    for (const key of memoryKeys) {
      if (regex.test(key)) {
        this.memoryCache.remove(key);
      }
    }

    // 清理会话缓存
    const sessionKeys = await this.sessionStorage.keys();
    for (const key of sessionKeys) {
      if (regex.test(key)) {
        await this.sessionStorage.remove(key);
      }
    }

    // 清理本地缓存
    const localKeys = await this.localStorage.keys();
    for (const key of localKeys) {
      if (regex.test(key)) {
        await this.localStorage.remove(key);
      }
    }
  }

  // === 缓存大小管理 ===
  async getTotalSize(): Promise<{ memory: number; local: number; session: number }> {
    return {
      memory: this.memoryCache.size(),
      local: await this.localStorage.size(),
      session: await this.sessionStorage.size()
    };
  }

  // === 清理操作 ===
  cleanup(): void {
    this.memoryCache.cleanup();
    this.localStorage.cleanup();
    this.sessionStorage.cleanup();
  }

  async clearAll(): Promise<void> {
    this.memoryCache.clear();
    await this.localStorage.clear();
    await this.sessionStorage.clear();
    this.httpCache.clearCache();
  }

  // === 生命周期管理 ===
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clearAll();
  }

  // === 私有方法 ===
  private getDefaultTTL(): number {
    return 5 * 60 * 1000; // 5分钟
  }

  private startCleanupInterval(): void {
    // 每 5 分钟清理一次过期数据
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }
}

// 单例缓存管理器
export const cacheManager = new UnifiedCacheManager();

// 便捷导出
export const {
  get,
  set,
  remove,
  getLocal,
  setLocal,
  removeLocal,
  getSession,
  setSession,
  removeSession,
  getHttp,
  forceGetHttp,
  clearAll,
  invalidate,
  warmup,
  getMetrics
} = cacheManager;