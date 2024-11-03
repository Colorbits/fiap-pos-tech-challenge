import { DynamicModule, Module } from '@nestjs/common';
import { TypeormDatabaseModule } from './typeorm-database.module';
import { MemoryDatabaseModule } from './memory-database.module';

@Module({})
export class RepositoryModule {
  static forFeature(): DynamicModule {
    if (process.env.USE_MEMORY_REPOSITORY) {
      return {
        module: MemoryDatabaseModule,
        exports: [MemoryDatabaseModule],
      };
    } else {
      return {
        module: TypeormDatabaseModule,
        exports: [TypeormDatabaseModule],
      };
    }
  }
}
