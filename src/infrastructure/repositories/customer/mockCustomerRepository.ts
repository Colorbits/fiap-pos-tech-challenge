import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MockCustomerRepository implements IRepository<Customer> {
  find(): Promise<Customer[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  findById(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  edit(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  private readonly customers: Customer[] = [];

  async create(customerDto: CustomerDto): Promise<Customer> {
    const createdCustomer = new Customer(customerDto);
    this.customers.push(createdCustomer);
    return Promise.resolve(createdCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers);
  }
}
