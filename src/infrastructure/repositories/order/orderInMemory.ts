import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IRepository } from '../iRepository';
import { Order } from '../../../shared/models';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class OrderInMemory implements IRepository<Order> {
  find(): Promise<Order[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  findById(): Promise<Order> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  private readonly orders: Order[] = [];

  create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  async edit(orderDto: Order): Promise<Order> {
    const orderIndex = this.orders.findIndex(
      (order) => order.id === orderDto.id,
    );
    if (orderIndex === -1) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    const updatedOrder = { ...this.orders[orderIndex], ...orderDto };
    this.orders[orderIndex] = updatedOrder;
    return Promise.resolve(updatedOrder);
  }

  async delete(id: number): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    this.orders.splice(orderIndex, 1);
    return Promise.resolve();
  }
}
