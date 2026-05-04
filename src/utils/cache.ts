import redis from "../config/redis";

export const setCache = async (key: string, value: any, ttlSeconds: number) => {
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
};

export const getCache = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};
