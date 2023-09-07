import { KeywordItem } from '@/types'

class LocalStorageCacheManager {
  private cacheKeyPrefix = "CACHE_";

  constructor() {
    this.cleanupExpiredItems();
  }

  set(key: string, value: KeywordItem[], duration: number) {
    const expire = Date.now() + duration;
    const data = {
      value: value,
      expire: expire
    };
    localStorage.setItem(this.cacheKeyPrefix + key, JSON.stringify(data));
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
}

const localStorageCacheManager = new LocalStorageCacheManager();
export default localStorageCacheManager;