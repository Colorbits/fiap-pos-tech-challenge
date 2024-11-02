import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {
  CustomerController,
  CategoryController,
  ProductController,
  OrderController,
  OrderItemController,
  ProductImageController,
} from './controllers';
import { DomainModule } from '../domain';
import { PaymentController } from './controllers/paymentController';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [
    CustomerController,
    CategoryController,
    ProductController,
    ProductImageController,
    OrderController,
    OrderItemController,
    PaymentController,
  ],
})
export class ApplicationModule {}
