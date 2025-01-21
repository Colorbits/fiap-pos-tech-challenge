import { Inject, Injectable } from '@nestjs/common';
import { Customer, User } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class FindByIdCustomerUsecase {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
  ) {}
  async findById(customerId: number): Promise<Customer | User> {
    return this.customerRepository.findById(customerId);
  }
}
