import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Customer, Order, OrderDto } from '../../../shared/models';
import { IService } from '../../iService';
import { OrderStatusEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class OrderService implements IService<Order> {
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

  findAll(): Promise<Order[]> {
    throw new HttpException('Not implemented', HttpStatus.FORBIDDEN);
  }

  find(orderId: number, status: string): Promise<Order[]> {
    return this.orderRepository.find(orderId, status);
  }

  findById(orderId: number): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }

  async edit(orderDto: OrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(orderDto.id);

    return this.orderRepository.edit({
      ...order,
      status: orderDto.status,
    });
  }

  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
