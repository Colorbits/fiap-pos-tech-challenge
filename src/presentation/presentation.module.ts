import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {
  OrderApi,
  HealthApi,
  ProductApi,
  PaymentApi,
  CategoryApi,
  CustomerApi,
  OrderItemApi,
} from './api';
import { ApplicationModule } from '../application';

@Module({
  imports: [InfrastructureModule, ApplicationModule],
  controllers: [
    OrderApi,
    HealthApi,
    ProductApi,
    PaymentApi,
    CategoryApi,
    CustomerApi,
    OrderItemApi,
  ],
})
export class PresentationModule {}
