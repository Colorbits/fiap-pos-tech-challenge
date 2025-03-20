import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  private readonly redis: Redis | null;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async saveData<T>(data: T, key: string): Promise<void> {
    await this.redis.set(key, JSON.stringify(data), 'EX', 180);
  }

  async getData<T>(key: string): Promise<T> {
    const data = await this.redis.get(key);
    return JSON.parse(data) as T;
  }
}
