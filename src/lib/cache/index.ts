// 主要导出
export { UnifiedCacheManager, cacheManager } from './cache-manager';
export { MemoryCache } from './memory-cache';
export { LocalStorageAdapter, SessionStorageAdapter } from './storage-manager';
export { HttpCacheManager } from './http-cache';
export {
  StrategyFactory,
  TTLStrategy,
  LRUStrategy,
  LFUStrategy,
  SizeBasedStrategy,
  TypeBasedStrategy,
  PatternBasedStrategy,
  HybridStrategy,
  AdaptiveStrategy
} from './strategies';

// 类型导出
export type {
  CacheEntry,
  CacheStrategy,
  CacheConfig,
  CacheMetrics,
  HttpCacheConfig,
  StorageAdapter,
  LRUNode
} from './types';

// 便捷方法导出
export {
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
} from './cache-manager';