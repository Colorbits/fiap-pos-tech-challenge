import { Provider } from '@nestjs/common';
import {
  CreateUserAndCustomerUsecase,
  FindByIdCustomerUsecase,
} from '../useCases';
import { CustomerService } from '../service/customerService';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';

export const CustomerProviders: Provider[] = [
  { provide: 'ICustomerService', useClass: CustomerService },
  {
    provide: 'CreateUserAndCustomerUsecase',
    inject: ['ICustomerHttpService'],
    useFactory: (
      customerHttpService: ICustomerHttpService,
    ): CreateUserAndCustomerUsecase =>
      new CreateUserAndCustomerUsecase(customerHttpService),
  },
  {
    provide: 'FindByIdCustomerUsecase',
    inject: ['ICustomerHttpService'],
    useFactory: (
      customerHttpService: ICustomerHttpService,
    ): FindByIdCustomerUsecase =>
      new FindByIdCustomerUsecase(customerHttpService),
  },
];
