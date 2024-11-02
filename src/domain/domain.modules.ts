import { Module } from '@nestjs/common';
import {
  CustomerService,
  ProductService,
  CategoryService,
  OrderService,
  OrderItemService,
  PaymentService,
  ProductImageService,
} from './services';

@Module({
  providers: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<ProductImage>', useClass: ProductImageService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
    { provide: 'IPaymentService', useClass: PaymentService },
  ],
  exports: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<ProductImage>', useClass: ProductImageService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
    { provide: 'IPaymentService', useClass: PaymentService },
  ],
})
export class DomainModule {}
