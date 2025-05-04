import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order, OrderDto, OrderStatusEnum } from '../../../shared';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('ICustomerHttpService')
    private readonly customerHttpService: ICustomerHttpService,
  ) {}
  async create(orderDto: OrderDto): Promise<Order> {
    const response = await this.customerHttpService.getCustomer(
      orderDto.userId,
    );

    if (!response.id) {
      throw new HttpException('Customer not provided', HttpStatus.FORBIDDEN);
    }

    return this.orderRepository.create({
      userId: response.id,
      totalPrice: '0',
      status: OrderStatusEnum.NEW,
      items: [],
    });
  }
}
