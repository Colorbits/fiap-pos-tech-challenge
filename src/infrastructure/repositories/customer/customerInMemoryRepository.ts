import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../../../shared/models';
import { IRepository } from '../iRepository';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CustomerInMemoryRepository implements IRepository<Customer> {
  find(): Promise<Customer[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  findById(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  private readonly customers: Customer[] = [];

  create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return Promise.resolve(customer);
  }

  findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers);
  }

  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  edit(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
}
