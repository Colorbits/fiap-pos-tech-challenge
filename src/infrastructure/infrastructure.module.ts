import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from './repositories/repository.module';
import { MicroserviceModule } from './microservices/microservice.module';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MicroserviceModule,
    RepositoryModule.forFeature(),
    MulterModule.register({
      dest: './files',
    }),
  ],
  exports: [RepositoryModule.forFeature(), MicroserviceModule],
})
export class InfrastructureModule {}
