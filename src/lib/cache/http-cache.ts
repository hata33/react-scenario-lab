import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { MemoryCache } from "./memory-cache";
import { LocalStorageAdapter } from "./storage-manager";
import type { HttpCacheConfig } from "./types";

interface CachedResponse {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	timestamp: number;
	ttl?: number;
}

export class HttpCacheManager {
	private memoryCache: MemoryCache;
	private persistentCache: LocalStorageAdapter;
	private config: Required<HttpCacheConfig>;
	private axiosInstance: AxiosInstance;

	constructor(axiosInstance?: AxiosInstance, config: HttpCacheConfig = {}) {
		this.axiosInstance = axiosInstance || axios.create();
		this.memoryCache = new MemoryCache({
			maxSize: config.maxSize || 50,
			defaultTTL: config.ttl || 5 * 60 * 1000, // 5分钟
		});
		this.persistentCache = new LocalStorageAdapter("http_cache_");

		this.config = {
			ttl: config.ttl || 5 * 60 * 1000,
			maxSize: config.maxSize || 50,
			cacheableMethods: config.cacheableMethods || ["GET"],
			cacheableStatusCodes: config.cacheableStatusCodes || [200, 201, 304],
			keyGenerator: config.keyGenerator || this.defaultKeyGenerator,
			shouldCache: config.shouldCache || this.defaultShouldCache,
		};

		this.setupInterceptors();
	}

	// 设置拦截器
	private setupInterceptors(): void {
		// 请求拦截器
		this.axiosInstance.interceptors.request.use(
			async (config) => {
				if (this.config.cacheableMethods.includes(config.method?.toUpperCase() || "")) {
					const cacheKey = this.config.keyGenerator(config.url!, config);
					const cachedResponse = await this.getCachedResponse(cacheKey);

					if (cachedResponse && !config.headers?.["X-Cache-Bypass"]) {
						// 返回缓存的数据
						return Promise.reject({
							__cached: true,
							data: cachedResponse.data,
							status: cachedResponse.status,
							statusText: cachedResponse.statusText,
							headers: cachedResponse.headers,
							config,
						});
					}
				}
				return config;
			},
			(error) => Promise.reject(error),
		);

		// 响应拦截器
		this.axiosInstance.interceptors.response.use(
			(response) => {
				const config = response.config;

				if (this.config.cacheableMethods.includes(config.method?.toUpperCase() || "")) {
					if (this.config.shouldCache(config.url!, response)) {
						const cacheKey = this.config.keyGenerator(config.url!, config);
						this.cacheResponse(cacheKey, response, config);
					}
				}

				return response;
			},
			async (error) => {
				// 检查是否是缓存数据
				if (error.__cached) {
					return Promise.resolve({
						...error,
						fromCache: true,
					});
				}
				return Promise.reject(error);
			},
		);
	}

	// 获取缓存响应
	private async getCachedResponse(key: string): Promise<CachedResponse | null> {
		// 先查内存缓存
		let cached = this.memoryCache.get(key);
		if (cached) {
			return cached;
		}

		// 再查持久化缓存
		cached = await this.persistentCache.get(key);
		if (cached) {
			// 将数据重新放入内存缓存
			this.memoryCache.set(key, cached);
			return cached;
		}

		return null;
	}

	// 缓存响应
	private cacheResponse(key: string, response: AxiosResponse, _config: AxiosRequestConfig): void {
		if (!this.config.cacheableStatusCodes.includes(response.status)) {
			return;
		}

		const cachedResponse: CachedResponse = {
			data: response.data,
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			timestamp: Date.now(),
			ttl: this.getTTLFromHeaders(response.headers) || this.config.ttl,
		};

		// 存储到内存缓存
		this.memoryCache.set(key, cachedResponse, cachedResponse.ttl);

		// 存储到持久化缓存（异步）
		this.persistentCache.set(key, cachedResponse, { ttl: cachedResponse.ttl }).catch(console.warn);
	}

	// 默认键生成器
	private defaultKeyGenerator(url: string, config: AxiosRequestConfig): string {
		const params = new URLSearchParams();

		// 添加 URL 参数
		const urlObj = new URL(url);
		urlObj.searchParams.forEach((value, key) => {
			params.append(key, value);
		});

		// 添加请求参数
		if (config.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				params.append(key, String(value));
			});
		}

		const queryString = params.toString();
		return `${urlObj.pathname}${queryString ? `?${queryString}` : ""}`;
	}

	// 默认缓存判断
	private defaultShouldCache(url: string, _response: AxiosResponse): boolean {
		// 不缓存 API 调用（通常包含 /api/）
		if (url.includes("/api/")) {
			return false;
		}

		// 缓存静态资源
		const staticResourcePattern = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i;
		return staticResourcePattern.test(url);
	}

	// 从响应头获取 TTL
	private getTTLFromHeaders(headers: any): number | null {
		const cacheControl = headers["cache-control"];
		if (!cacheControl) return null;

		const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
		if (maxAgeMatch) {
			return parseInt(maxAgeMatch[1], 10) * 1000; // 转换为毫秒
		}

		return null;
	}

	// 公共 API
	async get(url: string, config?: AxiosRequestConfig): Promise<any> {
		try {
			const response = await this.axiosInstance.get(url, config);
			return response.data;
		} catch (error: any) {
			if (error.fromCache) {
				return error.data;
			}
			throw error;
		}
	}

	async forceGet(url: string, config?: AxiosRequestConfig): Promise<any> {
		const requestConfig = {
			...config,
			headers: {
				...config?.headers,
				"X-Cache-Bypass": "true",
			},
		};

		const response = await this.axiosInstance.get(url, requestConfig);
		return response.data;
	}

	// 清除缓存
	clearCache(): void {
		this.memoryCache.clear();
		this.persistentCache.clear().catch(console.warn);
	}

	// 清除特定 URL 的缓存
	clearCacheForUrl(url: string, config?: AxiosRequestConfig): void {
		const cacheKey = this.config.keyGenerator(url, config || {});
		this.memoryCache.remove(cacheKey);
		this.persistentCache.remove(cacheKey).catch(console.warn);
	}

	// 获取缓存统计
	getCacheStats() {
		return {
			memory: this.memoryCache.getMetrics(),
			memorySize: this.memoryCache.size(),
		};
	}

	// 清理过期缓存
	cleanup(): void {
		this.memoryCache.cleanup();
	}
}
