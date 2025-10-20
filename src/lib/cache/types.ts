// 缓存条目接口
export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl?: number; // 生存时间（毫秒）
  key: string;
}

// 缓存策略接口
export interface CacheStrategy {
  name: string;
  shouldCache(key: string, data: any): boolean;
  shouldEvict(entry: CacheEntry): boolean;
  onAccess(entry: CacheEntry): void;
}

// 缓存配置接口
export interface CacheConfig {
  maxSize?: number;
  defaultTTL?: number;
  strategy?: CacheStrategy;
  enableMetrics?: boolean;
}

// 缓存统计信息
export interface CacheMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  evictions: number;
  hitRate: number;
}

// HTTP 缓存配置
export interface HttpCacheConfig {
  ttl?: number;
  maxSize?: number;
  cacheableMethods?: string[];
  cacheableStatusCodes?: number[];
  keyGenerator?: (url: string, config?: any) => string;
  shouldCache?: (url: string, response: any) => boolean;
}

// 存储适配器接口
export interface StorageAdapter {
  get(key: string): Promise<any>;
  set(key: string, value: any, options?: { ttl?: number }): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
}

// LRU 缓存节点
export interface LRUNode<T = any> {
  key: string;
  value: T;
  prev: LRUNode<T> | null;
  next: LRUNode<T> | null;
  accessCount: number;
  lastAccess: number;
}