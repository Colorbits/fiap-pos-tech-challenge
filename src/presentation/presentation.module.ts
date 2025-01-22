import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {
  OrderApi,
  ProductApi,
  PaymentApi,
  CategoryApi,
  CustomerApi,
  OrderItemApi,
  ProductImageApi,
} from './api';
import { ApplicationModule } from '../application';

@Module({
  imports: [InfrastructureModule, ApplicationModule],
  controllers: [
    OrderApi,
    ProductApi,
    PaymentApi,
    CategoryApi,
    CustomerApi,
    OrderItemApi,
    ProductImageApi,
  ],
})
export class PresentationModule {}
