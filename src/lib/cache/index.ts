// 主要导出
// 便捷方法导出
export {
	cacheManager,
	clearAll,
	forceGetHttp,
	get,
	getHttp,
	getLocal,
	getMetrics,
	getSession,
	invalidate,
	remove,
	removeLocal,
	removeSession,
	set,
	setLocal,
	setSession,
	UnifiedCacheManager,
	warmup,
} from "./cache-manager";
export { HttpCacheManager } from "./http-cache";
export { MemoryCache } from "./memory-cache";
export { LocalStorageAdapter, SessionStorageAdapter } from "./storage-manager";
export {
	AdaptiveStrategy,
	HybridStrategy,
	LFUStrategy,
	LRUStrategy,
	PatternBasedStrategy,
	SizeBasedStrategy,
	StrategyFactory,
	TTLStrategy,
	TypeBasedStrategy,
} from "./strategies";
// 类型导出
export type {
	CacheConfig,
	CacheEntry,
	CacheMetrics,
	CacheStrategy,
	HttpCacheConfig,
	LRUNode,
	StorageAdapter,
} from "./types";
