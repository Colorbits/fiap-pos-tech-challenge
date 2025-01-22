import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class EditOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}
  async edit(orderDto: OrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(orderDto.id);

    return this.orderRepository.edit({
      ...order,
      status: orderDto.status,
    });
  }
}
