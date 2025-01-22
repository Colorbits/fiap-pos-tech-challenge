import { DynamicModule, Module } from '@nestjs/common';
import { TypeormDatabaseModule } from './typeorm-database.module';

@Module({})
export class RepositoryModule {
  static forFeature(): DynamicModule {
    return {
      module: TypeormDatabaseModule,
      exports: [TypeormDatabaseModule],
    };
  }
}
