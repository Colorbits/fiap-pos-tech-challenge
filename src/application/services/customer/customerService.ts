import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IService } from '../../iService';
import { User } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class CustomerService implements IService<Customer | User> {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
    @Inject('IRepository<User>')
    private readonly userRepository: IRepository<User>,
  ) {}
  create(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

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

  async findById(customerId: number): Promise<Customer | User> {
    return this.customerRepository.findById(customerId);
  }

  findAll(): Promise<Array<Customer | User>> {
    return this.customerRepository.findAll();
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
