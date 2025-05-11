import { Provider } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order } from '../../../shared';
import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  EditOrderUseCase,
  FindByIdOrderUseCase,
  FindOrderUseCase,
} from '../useCases';
import { OrderService } from '../service';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';
import { IPaymentHttpService } from '../../../infrastructure/microservices/payment/IPaymentHttpService';

export const OrderProviders: Provider[] = [
  { provide: 'IOrderService', useClass: OrderService },
  {
    provide: 'FindOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): FindOrderUseCase =>
      new FindOrderUseCase(repository),
  },
  {
    provide: 'FindByIdOrderUseCase',
    inject: ['IRepository<Order>', 'IPaymentHttpService'],
    useFactory: (
      repository: IRepository<Order>,
      paymentHttpService: IPaymentHttpService,
    ): FindByIdOrderUseCase =>
      new FindByIdOrderUseCase(repository, paymentHttpService),
  },
  {
    provide: 'EditOrderUseCase',
    inject: ['IRepository<Order>', 'IPaymentHttpService'],
    useFactory: (
      repository: IRepository<Order>,
      paymentHttpService: IPaymentHttpService,
    ): EditOrderUseCase => new EditOrderUseCase(repository, paymentHttpService),
  },
  {
    provide: 'DeleteOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): DeleteOrderUseCase =>
      new DeleteOrderUseCase(repository),
  },
  {
    provide: 'CreateOrderUseCase',
    inject: [
      'IRepository<Order>',
      'ICustomerHttpService',
      'IPaymentHttpService',
    ],
    useFactory: (
      repository: IRepository<Order>,
      customerHttpService: ICustomerHttpService,
      paymentHttpService: IPaymentHttpService,
    ): CreateOrderUseCase =>
      new CreateOrderUseCase(
        repository,
        customerHttpService,
        paymentHttpService,
      ),
  },
];
