import { Provider } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Customer, User } from '../../../shared';
import {
  CreateUserAndCustomerUsecase,
  FindAllCustomerUsecase,
  FindByIdCustomerUsecase,
} from '../useCases';
import { CustomerService } from '../service/customerService';

export const CustomerProviders: Provider[] = [
  { provide: 'IService<Customer>', useClass: CustomerService },
  {
    provide: 'CreateUserAndCustomerUsecase',
    inject: ['IRepository<Customer>', 'IRepository<User>'],
    useFactory: (
      repository: IRepository<Customer>,
      repositoryUser: IRepository<User>,
    ): CreateUserAndCustomerUsecase =>
      new CreateUserAndCustomerUsecase(repository, repositoryUser),
  },
  {
    provide: 'FindAllCustomerUsecase',
    inject: ['IRepository<Customer>'],
    useFactory: (repository: IRepository<Customer>): FindAllCustomerUsecase =>
      new FindAllCustomerUsecase(repository),
  },
  {
    provide: 'FindByIdCustomerUsecase',
    inject: ['IRepository<Customer>'],
    useFactory: (repository: IRepository<Customer>): FindByIdCustomerUsecase =>
      new FindByIdCustomerUsecase(repository),
  },
];
