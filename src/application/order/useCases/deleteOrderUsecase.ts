import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order } from '../../../shared';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}
  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
