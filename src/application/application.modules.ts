import { Module } from '@nestjs/common';
import {
  OrderItemService,
  PaymentService,
  ProductImageService,
} from './services';
import { CategoryProviders, CategoryService } from './category';
import { CustomerProviders, CustomerService } from './customer';
import { ProductProviders, ProductService } from './product';
import { OrderProviders, OrderService } from './order';

@Module({
  providers: [
    ...CategoryProviders,
    ...CustomerProviders,
    ...ProductProviders,
    ...OrderProviders,
    { provide: 'ICustomerService', useClass: CustomerService },
    { provide: 'IProductImageService', useClass: ProductImageService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
    { provide: 'IPaymentService', useClass: PaymentService },
  ],
  exports: [
    { provide: 'ICustomerService', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IProductImageService', useClass: ProductImageService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IOrderService', useClass: OrderService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
    { provide: 'IPaymentService', useClass: PaymentService },
  ],
})
export class ApplicationModule {}
