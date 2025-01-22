import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IService } from '../../iService';
import { User } from '../../../shared/models';
import {
  CreateUserAndCustomerUsecase,
  FindAllCustomerUsecase,
  FindByIdCustomerUsecase,
} from '../usecases';

@Injectable()
export class CustomerService implements IService<Customer | User> {
  constructor(
    @Inject('CreateUserAndCustomerUsecase')
    private readonly createUserAndCustomerUsecase: CreateUserAndCustomerUsecase,
    @Inject('FindAllCustomerUsecase')
    private readonly findAllCustomerUsecase: FindAllCustomerUsecase,
    @Inject('FindByIdCustomerUsecase')
    private readonly findByIdCustomerUsecase: FindByIdCustomerUsecase,
  ) {}
  create(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async createUserAndCustomer(
    customerDto: CustomerDto,
  ): Promise<Customer | User> {
    return this.createUserAndCustomerUsecase.createUserAndCustomer(customerDto);
  }

  async findById(customerId: number): Promise<Customer | User> {
    return this.findByIdCustomerUsecase.findById(customerId);
  }

  findAll(): Promise<Array<Customer | User>> {
    return this.findAllCustomerUsecase.findAll();
  }

  find(): Promise<Customer[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  edit(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
}
