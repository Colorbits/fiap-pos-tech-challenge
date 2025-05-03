import { Inject, Injectable } from '@nestjs/common';
import { CustomerResponseDto } from '../../../shared';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';

@Injectable()
export class FindByIdCustomerUsecase {
  constructor(
    @Inject('ICustomerHttpService')
    private readonly customerHttpService: ICustomerHttpService,
  ) {}
  async findById(customerId: number): Promise<CustomerResponseDto> {
    return this.customerHttpService.getCustomer(customerId);
  }
}
