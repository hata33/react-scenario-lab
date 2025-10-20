import { CacheEntry, CacheConfig, CacheMetrics, LRUNode } from './types';

export class MemoryCache {
  private cache = new Map<string, LRUNode<CacheEntry>>();
  private maxSize: number;
  private defaultTTL: number;
  private head: LRUNode<CacheEntry> | null = null;
  private tail: LRUNode<CacheEntry> | null = null;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    evictions: 0,
    hitRate: 0
  };

  constructor(config: CacheConfig = {}) {
    this.maxSize = config.maxSize || 100;
    this.defaultTTL = config.defaultTTL || 5 * 60 * 1000; // 5分钟
  }

  // 获取缓存
  get(key: string): any {
    const node = this.cache.get(key);

    if (!node) {
      this.metrics.misses++;
      this.updateHitRate();
      return null;
    }

    const entry = node.value;

    // 检查是否过期
    if (this.isExpired(entry)) {
      this.remove(key);
      this.metrics.misses++;
      this.updateHitRate();
      return null;
    }

    // 更新访问信息
    node.value.accessCount++;
    node.value.lastAccess = Date.now();
    this.moveToHead(node);

    this.metrics.hits++;
    this.updateHitRate();

    return entry.data;
  }

  // 设置缓存
  set(key: string, data: any, ttl?: number): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      // 更新现有条目
      existingNode.value.data = data;
      existingNode.value.timestamp = Date.now();
      existingNode.value.ttl = ttl || this.defaultTTL;
      existingNode.value.accessCount = 1;
      existingNode.value.lastAccess = Date.now();
      this.moveToHead(existingNode);
    } else {
      // 创建新条目
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL,
        key
      };

      const newNode: LRUNode<CacheEntry> = {
        key,
        value: entry,
        prev: null,
        next: null,
        accessCount: 1,
        lastAccess: Date.now()
      };

      this.cache.set(key, newNode);
      this.addToHead(newNode);

      // 检查容量限制
      if (this.cache.size > this.maxSize) {
        this.evictLRU();
      }
    }

    this.metrics.sets++;
  }

  // 删除缓存
  remove(key: string): boolean {
    const node = this.cache.get(key);
    if (!node) return false;

    this.cache.delete(key);
    this.removeFromList(node);
    this.metrics.deletes++;

    return true;
  }

  // 清空缓存
  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      hitRate: 0
    };
  }

  // 获取缓存大小
  size(): number {
    return this.cache.size;
  }

  // 获取所有键
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  // 获取统计信息
  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  // 检查条目是否过期
  private isExpired(entry: CacheEntry): boolean {
    if (!entry.ttl) return false;
    return Date.now() - entry.timestamp > entry.ttl;
  }

  // LRU 链表操作
  private addToHead(node: LRUNode<CacheEntry>): void {
    node.prev = null;
    node.next = this.head;

    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  private removeFromList(node: LRUNode<CacheEntry>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  private moveToHead(node: LRUNode<CacheEntry>): void {
    this.removeFromList(node);
    this.addToHead(node);
  }

  private evictLRU(): void {
    if (!this.tail) return;

    const lruKey = this.tail.key;
    this.cache.delete(lruKey);
    this.removeFromList(this.tail);
    this.tail = this.tail.prev;

    if (this.tail) {
      this.tail.next = null;
    }

    this.metrics.evictions++;
  }

  // 更新命中率
  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }

  // 清理过期条目
  cleanup(): number {
    let cleanedCount = 0;
    const now = Date.now();

    for (const [key, node] of this.cache.entries()) {
      if (node.value.ttl && (now - node.value.timestamp > node.value.ttl)) {
        this.cache.delete(key);
        this.removeFromList(node);
        cleanedCount++;
      }
    }

    return cleanedCount;
  }
}