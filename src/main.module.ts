import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './presentation/redisOptions.module';

@Module({
  imports: [
    PresentationModule,
    CacheModule.register({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
  ],
})
export class MainModule {}
