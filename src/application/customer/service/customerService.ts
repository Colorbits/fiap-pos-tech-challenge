import { Inject, Injectable } from '@nestjs/common';
import {
  CustomerDto,
  CustomerResponseDto,
} from '../../../shared/models/customer';
import {
  CreateUserAndCustomerUsecase,
  FindByIdCustomerUsecase,
} from '../useCases';
import { ICustomerService } from './iCustomerService';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject('CreateUserAndCustomerUsecase')
    private readonly createUserAndCustomerUsecase: CreateUserAndCustomerUsecase,
    @Inject('FindByIdCustomerUsecase')
    private readonly findByIdCustomerUsecase: FindByIdCustomerUsecase,
  ) {}

  async createUserAndCustomer(
    customerDto: CustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.createUserAndCustomerUsecase.createUserAndCustomer(customerDto);
  }

  async findById(customerId: number): Promise<CustomerResponseDto> {
    return this.findByIdCustomerUsecase.findById(customerId);
  }
}
