import { Inject, Injectable } from '@nestjs/common';
import { CustomerDto, CustomerResponseDto } from '../../../shared';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';

@Injectable()
export class CreateUserAndCustomerUsecase {
  constructor(
    @Inject('ICustomerHttpService')
    private readonly customerHttpService: ICustomerHttpService,
  ) {}
  async createUserAndCustomer(
    customerDto: CustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerHttpService.createCustomer({
      name: customerDto.name,
      document: customerDto.document,
      phoneNumber: customerDto.phoneNumber,
      email: customerDto.email,
    });
  }
}
