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
    inject: ['IRepository<Order>', 'ICustomerHttpService'],
    useFactory: (
      repository: IRepository<Order>,
      customerHttpService: ICustomerHttpService,
    ): CreateOrderUseCase =>
      new CreateOrderUseCase(repository, customerHttpService),
  },
];
