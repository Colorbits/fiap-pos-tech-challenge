import { Customer, CustomerResponseDto, User } from '../../../shared/models';

export interface ICustomerService {
  createUserAndCustomer(type: Customer | User): Promise<CustomerResponseDto>;
  findById(id: string): Promise<CustomerResponseDto>;
}
