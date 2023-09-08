import localStorageCacheManager from '@/stores/localStorageCacheManager.ts';
import { ApiClient } from './client';

const client = new ApiClient('https://pre-onboarding-12th-3rd-server.vercel.app/api');

export const searchByKeyword = async (keyword: string) => {
  if (!keyword || keyword.length === 0) return [];
  const config = {
    params: { q: keyword },
  };
  const cacheKey = keyword;

  if (localStorageCacheManager.has(cacheKey)) {
    console.log('cache hit')
    return localStorageCacheManager.get(cacheKey);
  }
  console.info('calling api');
  try {
    const res = await client.get('/sick', config);
    localStorageCacheManager.set(cacheKey, res.data, 10 * 60 * 1000);
    return res.data;
  } catch (e) {
    console.error(e);
    if (localStorageCacheManager.has(cacheKey)) {
      localStorageCacheManager.delete(cacheKey);
    }
  }
};
