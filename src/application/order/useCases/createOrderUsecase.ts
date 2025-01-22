import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Customer, Order, OrderDto, OrderStatusEnum } from '../../../shared';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
  ) {}
  async create(orderDto: OrderDto): Promise<Order> {
    const user = await this.customerRepository.findById(orderDto.customerId);

    if (!user) {
      throw new HttpException('Customer not provided', HttpStatus.FORBIDDEN);
    }

    return this.orderRepository.create({
      user,
      totalPrice: '0',
      status: OrderStatusEnum.NEW,
      items: [],
    });
  }
}
