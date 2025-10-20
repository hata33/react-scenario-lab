import { StorageAdapter } from './types';

// 检查是否在客户端环境
const isClient = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// 本地存储适配器
export class LocalStorageAdapter implements StorageAdapter {
  private prefix: string;

  constructor(prefix: string = 'cache_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get(key: string): Promise<any> {
    if (!isClient) {
      return null;
    }

    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsed = JSON.parse(item);

      // 检查是否过期
      if (parsed.ttl && Date.now() > parsed.timestamp + parsed.ttl) {
        await this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('LocalStorage get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, options: { ttl?: number } = {}): Promise<void> {
    if (!isClient) {
      return;
    }

    try {
      const item = {
        data: value,
        timestamp: Date.now(),
        ttl: options.ttl
      };
      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // 存储空间不足，清理过期数据
        await this.cleanup();
        // 重试一次
        try {
          const item = {
            data: value,
            timestamp: Date.now(),
            ttl: options.ttl
          };
          localStorage.setItem(this.getKey(key), JSON.stringify(item));
        } catch (retryError) {
          console.error('LocalStorage set failed after cleanup:', retryError);
          throw retryError;
        }
      } else {
        console.error('LocalStorage set error:', error);
        throw error;
      }
    }
  }

  async remove(key: string): Promise<void> {
    if (!isClient) {
      return;
    }

    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.warn('LocalStorage remove error:', error);
    }
  }

  async clear(): Promise<void> {
    if (!isClient) {
      return;
    }

    try {
      const keys = await this.keys();
      for (const key of keys) {
        localStorage.removeItem(this.getKey(key));
      }
    } catch (error) {
      console.warn('LocalStorage clear error:', error);
    }
  }

  async keys(): Promise<string[]> {
    if (!isClient) {
      return [];
    }

    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.slice(this.prefix.length));
        }
      }
      return keys;
    } catch (error) {
      console.warn('LocalStorage keys error:', error);
      return [];
    }
  }

  async size(): Promise<number> {
    try {
      const keys = await this.keys();
      return keys.length;
    } catch (error) {
      console.warn('LocalStorage size error:', error);
      return 0;
    }
  }

  private async cleanup(): Promise<void> {
    if (!isClient) {
      return;
    }

    try {
      const keys = await this.keys();
      const now = Date.now();
      let removed = 0;

      for (const key of keys) {
        const item = localStorage.getItem(this.getKey(key));
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.ttl && now > parsed.timestamp + parsed.ttl) {
              localStorage.removeItem(this.getKey(key));
              removed++;
            }
          } catch (e) {
            // 清理损坏的数据
            localStorage.removeItem(this.getKey(key));
            removed++;
          }
        }
      }

      console.log(`LocalStorage cleanup: removed ${removed} expired items`);
    } catch (error) {
      console.warn('LocalStorage cleanup error:', error);
    }
  }
}

// 检查是否在客户端环境（SessionStorage 专用）
const isSessionClient = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

// SessionStorage 适配器
export class SessionStorageAdapter implements StorageAdapter {
  private prefix: string;

  constructor(prefix: string = 'session_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get(key: string): Promise<any> {
    if (!isSessionClient) {
      return null;
    }

    try {
      const item = sessionStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsed = JSON.parse(item);

      // 检查是否过期
      if (parsed.ttl && Date.now() > parsed.timestamp + parsed.ttl) {
        await this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('SessionStorage get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, options: { ttl?: number } = {}): Promise<void> {
    if (!isSessionClient) {
      return;
    }

    try {
      const item = {
        data: value,
        timestamp: Date.now(),
        ttl: options.ttl
      };
      sessionStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        await this.cleanup();
        try {
          const item = {
            data: value,
            timestamp: Date.now(),
            ttl: options.ttl
          };
          sessionStorage.setItem(this.getKey(key), JSON.stringify(item));
        } catch (retryError) {
          console.error('SessionStorage set failed after cleanup:', retryError);
          throw retryError;
        }
      } else {
        console.error('SessionStorage set error:', error);
        throw error;
      }
    }
  }

  async remove(key: string): Promise<void> {
    if (!isSessionClient) {
      return;
    }

    try {
      sessionStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.warn('SessionStorage remove error:', error);
    }
  }

  async clear(): Promise<void> {
    if (!isSessionClient) {
      return;
    }

    try {
      const keys = await this.keys();
      for (const key of keys) {
        sessionStorage.removeItem(this.getKey(key));
      }
    } catch (error) {
      console.warn('SessionStorage clear error:', error);
    }
  }

  async keys(): Promise<string[]> {
    if (!isSessionClient) {
      return [];
    }

    try {
      const keys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.slice(this.prefix.length));
        }
      }
      return keys;
    } catch (error) {
      console.warn('SessionStorage keys error:', error);
      return [];
    }
  }

  async size(): Promise<number> {
    try {
      const keys = await this.keys();
      return keys.length;
    } catch (error) {
      console.warn('SessionStorage size error:', error);
      return 0;
    }
  }

  private async cleanup(): Promise<void> {
    if (!isSessionClient) {
      return;
    }

    try {
      const keys = await this.keys();
      const now = Date.now();

      for (const key of keys) {
        const item = sessionStorage.getItem(this.getKey(key));
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.ttl && now > parsed.timestamp + parsed.ttl) {
              sessionStorage.removeItem(this.getKey(key));
            }
          } catch (e) {
            sessionStorage.removeItem(this.getKey(key));
          }
        }
      }
    } catch (error) {
      console.warn('SessionStorage cleanup error:', error);
    }
  }
}