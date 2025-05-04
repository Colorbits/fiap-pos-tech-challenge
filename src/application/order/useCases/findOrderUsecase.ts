import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order } from '../../../shared';

@Injectable()
export class FindOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) { }
  find(orderId: number | string, status: string): Promise<Order[]> {
    return this.orderRepository.find(orderId, status);
  }
}
