import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URI as string);

export const cacheService = {
  async get(key: string) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set(key: string, value: any, expireTime = 3600) {
    await redis.set(key, JSON.stringify(value), 'EX', expireTime);
  },

  async del(key: string) {
    await redis.del(key);
  }
}; 