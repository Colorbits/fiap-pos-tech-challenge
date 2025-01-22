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
    // { provide: 'IService<Category>', useClass: CategoryService },
    // { provide: 'IService<Customer>', useClass: CustomerService },
    // { provide: 'IService<Product>', useClass: ProductService },
    // { provide: 'IService<Order>', useClass: OrderService },
    { provide: 'IService<ProductImage>', useClass: ProductImageService },
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
export class ApplicationModule {}
