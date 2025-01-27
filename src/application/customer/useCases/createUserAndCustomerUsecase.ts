import { Inject, Injectable } from '@nestjs/common';
import { Customer, CustomerDto, User } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class CreateUserAndCustomerUsecase {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
    @Inject('IRepository<User>')
    private readonly userRepository: IRepository<User>,
  ) {}
  async createUserAndCustomer(
    customerDto: CustomerDto,
  ): Promise<Customer | User> {
    const user = await this.userRepository.create({});
    if (!customerDto?.document?.length) return user;

    return this.customerRepository.create({
      id: user.id,
      name: customerDto.name,
      document: customerDto.document,
      phoneNumber: customerDto.phoneNumber,
      email: customerDto.email,
    });
  }
}
