import { Provider } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Customer, Order } from '../../../shared';
import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  EditOrderUseCase,
  FindByIdOrderUseCase,
  FindOrderUseCase,
} from '../useCases';
import { OrderService } from '../service';

export const OrderProviders: Provider[] = [
  { provide: 'IService<Order>', useClass: OrderService },
  {
    provide: 'FindOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): FindOrderUseCase =>
      new FindOrderUseCase(repository),
  },
  {
    provide: 'FindByIdOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): FindByIdOrderUseCase =>
      new FindByIdOrderUseCase(repository),
  },
  {
    provide: 'EditOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): EditOrderUseCase =>
      new EditOrderUseCase(repository),
  },
  {
    provide: 'DeleteOrderUseCase',
    inject: ['IRepository<Order>'],
    useFactory: (repository: IRepository<Order>): DeleteOrderUseCase =>
      new DeleteOrderUseCase(repository),
  },
  {
    provide: 'CreateOrderUseCase',
    inject: ['IRepository<Order>', 'IRepository<Customer>'],
    useFactory: (
      repository: IRepository<Order>,
      customerRepository: IRepository<Customer>,
    ): CreateOrderUseCase =>
      new CreateOrderUseCase(repository, customerRepository),
  },
];
