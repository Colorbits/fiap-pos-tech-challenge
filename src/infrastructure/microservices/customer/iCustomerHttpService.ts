import { Customer, CustomerResponseDto } from 'src/shared/models';

export interface ICustomerHttpService {
  createCustomer(payment: Customer): Promise<CustomerResponseDto>;
  updateCustomer(payment: Customer): Promise<CustomerResponseDto>;
  getCustomer(id: Customer['id']): Promise<CustomerResponseDto>;
}
