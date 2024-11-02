import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from './repositories/repository.module';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    RepositoryModule.forFeature(),
    MulterModule.register({
      dest: './files',
    }),
  ],
  exports: [RepositoryModule.forFeature()],
})
export class InfrastructureModule {}
