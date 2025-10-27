import type { CacheEntry, CacheStrategy } from "./types";

// TTL (Time To Live) 策略
export class TTLStrategy implements CacheStrategy {
	name = "TTL";

	constructor(private defaultTTL: number = 5 * 60 * 1000) {} // 默认5分钟

	shouldCache(key: string, data: any): boolean {
		return true; // TTL 策略缓存所有数据
	}

	shouldEvict(entry: CacheEntry): boolean {
		if (!entry.ttl) return false;
		return Date.now() - entry.timestamp > entry.ttl;
	}

	onAccess(entry: CacheEntry): void {
		// TTL 策略在访问时不需要特殊处理
	}
}

// LRU (Least Recently Used) 策略
export class LRUStrategy implements CacheStrategy {
	name = "LRU";

	constructor(private maxSize: number = 100) {}

	shouldCache(key: string, data: any): boolean {
		return true; // LRU 策略缓存所有数据
	}

	shouldEvict(entry: CacheEntry): boolean {
		// LRU 的驱逐逻辑在缓存层实现
		return false;
	}

	onAccess(entry: CacheEntry): void {
		// LRU 策略的访问逻辑在缓存层实现
	}
}

// LFU (Least Frequently Used) 策略
export class LFUStrategy implements CacheStrategy {
	name = "LFU";

	constructor(private minFrequency: number = 1) {}

	shouldCache(key: string, data: any): boolean {
		return true; // LFU 策略缓存所有数据
	}

	shouldEvict(entry: CacheEntry): boolean {
		// LFU 的驱逐逻辑基于访问频率
		return false;
	}

	onAccess(entry: CacheEntry): void {
		// LFU 策略的访问逻辑在缓存层实现
	}
}

// 基于大小的策略
export class SizeBasedStrategy implements CacheStrategy {
	name = "SizeBased";

	constructor(
		private maxSize: number = 1024 * 1024, // 1MB
		private sizeCalculator: (data: any) => number = this.defaultSizeCalculator,
	) {}

	shouldCache(key: string, data: any): boolean {
		const size = this.sizeCalculator(data);
		return size <= this.maxSize;
	}

	shouldEvict(entry: CacheEntry): boolean {
		// 大小策略的驱逐逻辑在缓存层实现
		return false;
	}

	onAccess(entry: CacheEntry): void {
		// 大小策略在访问时不需要特殊处理
	}

	private defaultSizeCalculator(data: any): number {
		if (typeof data === "string") {
			return data.length * 2; // Unicode 字符通常占用 2 字节
		}
		return JSON.stringify(data).length * 2;
	}
}

// 基于数据类型的策略
export class TypeBasedStrategy implements CacheStrategy {
	name = "TypeBased";

	private cacheableTypes: Set<string>;

	constructor(cacheableTypes: string[] = ["string", "number", "boolean", "object", "array"]) {
		this.cacheableTypes = new Set(cacheableTypes);
	}

	shouldCache(key: string, data: any): boolean {
		const dataType = Array.isArray(data) ? "array" : typeof data;
		return this.cacheableTypes.has(dataType);
	}

	shouldEvict(entry: CacheEntry): boolean {
		return false;
	}

	onAccess(entry: CacheEntry): void {
		// 类型策略在访问时不需要特殊处理
	}
}

// 基于键模式的策略
export class PatternBasedStrategy implements CacheStrategy {
	name = "PatternBased";

	constructor(
		private includePatterns: RegExp[] = [/.*/],
		private excludePatterns: RegExp[] = [],
	) {}

	shouldCache(key: string, data: any): boolean {
		// 检查排除模式
		for (const pattern of this.excludePatterns) {
			if (pattern.test(key)) {
				return false;
			}
		}

		// 检查包含模式
		for (const pattern of this.includePatterns) {
			if (pattern.test(key)) {
				return true;
			}
		}

		return false;
	}

	shouldEvict(entry: CacheEntry): boolean {
		return false;
	}

	onAccess(entry: CacheEntry): void {
		// 模式策略在访问时不需要特殊处理
	}
}

// 混合策略 - 组合多个策略
export class HybridStrategy implements CacheStrategy {
	name = "Hybrid";

	constructor(private strategies: CacheStrategy[]) {}

	shouldCache(key: string, data: any): boolean {
		// 所有策略都同意才缓存
		return this.strategies.every((strategy) => strategy.shouldCache(key, data));
	}

	shouldEvict(entry: CacheEntry): boolean {
		// 任一策略认为应该驱逐就驱逐
		return this.strategies.some((strategy) => strategy.shouldEvict(entry));
	}

	onAccess(entry: CacheEntry): void {
		// 通知所有策略
		this.strategies.forEach((strategy) => strategy.onAccess(entry));
	}
}

// 自适应策略 - 根据访问模式调整
export class AdaptiveStrategy implements CacheStrategy {
	name = "Adaptive";

	private accessStats = new Map<string, { count: number; lastAccess: number }>();
	private accessThreshold = 3; // 访问次数阈值
	private timeWindow = 5 * 60 * 1000; // 5分钟时间窗口

	shouldCache(key: string, data: any): boolean {
		return true; // 自适应策略先缓存，然后根据访问模式调整
	}

	shouldEvict(entry: CacheEntry): boolean {
		const stats = this.accessStats.get(entry.key);
		if (!stats) return true; // 没有访问记录，驱逐

		const now = Date.now();
		const timeSinceLastAccess = now - stats.lastAccess;

		// 访问次数少且很久没访问的数据驱逐
		if (stats.count < this.accessThreshold && timeSinceLastAccess > this.timeWindow) {
			return true;
		}

		return false;
	}

	onAccess(entry: CacheEntry): void {
		const stats = this.accessStats.get(entry.key);
		if (stats) {
			stats.count++;
			stats.lastAccess = Date.now();
		} else {
			this.accessStats.set(entry.key, {
				count: 1,
				lastAccess: Date.now(),
			});
		}
	}

	// 获取访问统计
	getAccessStats(): Map<string, { count: number; lastAccess: number }> {
		return new Map(this.accessStats);
	}

	// 清理旧的统计数据
	cleanup(): void {
		const now = Date.now();
		for (const [key, stats] of this.accessStats.entries()) {
			if (now - stats.lastAccess > this.timeWindow * 2) {
				this.accessStats.delete(key);
			}
		}
	}
}

// 策略工厂
export class StrategyFactory {
	static createTTL(ttl?: number): TTLStrategy {
		return new TTLStrategy(ttl);
	}

	static createLRU(maxSize?: number): LRUStrategy {
		return new LRUStrategy(maxSize);
	}

	static createLFU(minFrequency?: number): LFUStrategy {
		return new LFUStrategy(minFrequency);
	}

	static createSizeBased(maxSize?: number): SizeBasedStrategy {
		return new SizeBasedStrategy(maxSize);
	}

	static createTypeBased(types?: string[]): TypeBasedStrategy {
		return new TypeBasedStrategy(types);
	}

	static createPatternBased(include?: RegExp[], exclude?: RegExp[]): PatternBasedStrategy {
		return new PatternBasedStrategy(include, exclude);
	}

	static createHybrid(strategies: CacheStrategy[]): HybridStrategy {
		return new HybridStrategy(strategies);
	}

	static createAdaptive(): AdaptiveStrategy {
		return new AdaptiveStrategy();
	}
}
