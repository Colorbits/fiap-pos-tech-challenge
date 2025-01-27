import { Inject, Injectable } from '@nestjs/common';
import { Customer, User } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class FindAllCustomerUsecase {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
  ) {}
  findAll(): Promise<Array<Customer | User>> {
    return this.customerRepository.findAll();
  }
}
