import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order } from '../../../shared';

@Injectable()
export class FindByIdOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}
  findById(orderId: number): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }
}
