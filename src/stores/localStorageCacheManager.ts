import { KeywordItem } from '@/types'

class LocalStorageCacheManager {
  private cacheKeyPrefix = "CACHE_";
  private cacheSizeLimit: number = 30;

  constructor() {
    this.cleanupExpiredItems();
  }

  set(key: string, value: KeywordItem[], duration: number) {
    const expire = Date.now() + duration;
    const data = {
      value: value,
      expire: expire
    };

    if (localStorage.length >= this.cacheSizeLimit) {
      this.removeOldestItem();
      localStorage.setItem(this.cacheKeyPrefix + key, JSON.stringify(data));
    }
  }

  get(key: string) {
    const cached = localStorage.getItem(this.cacheKeyPrefix + key);
    if (!cached) return undefined;

    const parsed = JSON.parse(cached);
    if (Date.now() > parsed.expire) {
      localStorage.removeItem(this.cacheKeyPrefix + key);
      return undefined;
    }

    return parsed.value;
  }

  has(key: string) {
    return !!this.get(key);
  }

  delete(key: string) {
    localStorage.removeItem(this.cacheKeyPrefix + key);
  }

  cleanupExpiredItems() {
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey && storageKey.startsWith(this.cacheKeyPrefix)) {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() > parsed.expire) {
            localStorage.removeItem(storageKey);
          }
        }
      }
    }
  }

  removeOldestItem() {
    let oldestKey: string | null = null;
    let oldestExpire = Infinity;

    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey && storageKey.startsWith(this.cacheKeyPrefix)) {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.expire < oldestExpire) {
            oldestExpire = parsed.expire;
            oldestKey = storageKey;
          }
        }
      }
    }
    if (oldestKey) {
      localStorage.removeItem(oldestKey);
    }
  }
}

const localStorageCacheManager = new LocalStorageCacheManager();
export default localStorageCacheManager;