const CACHE_NAME = "react-scenario-lab-v1";
const urlsToCache = [
	"/",
	"/manifest.json",
	// 关键资源会在运行时缓存
];

// 安装事件 - 缓存关键资源
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
	self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	self.clients.claim();
});

// 拦截请求 - 网络优先策略
self.addEventListener("fetch", (event) => {
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// 如果网络请求成功，克隆并缓存响应
				if (response && response.status === 200) {
					const responseToCache = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseToCache);
					});
				}
				return response;
			})
			.catch(() => {
				// 网络失败时，尝试从缓存获取
				return caches.match(event.request).then((response) => {
					if (response) {
						return response;
					}
					// 如果是导航请求，返回离线页面
					if (event.request.mode === "navigate") {
						return caches.match("/");
					}
				});
			})
	);
});
