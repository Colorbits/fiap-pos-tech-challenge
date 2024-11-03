import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../shared/models';
import { OrderEntity } from './orderEntity';
import { IRepository } from '../iRepository';

@Injectable()
export class OrderInDbRepository implements IRepository<Order> {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this.repository.save({
        status: order.status,
        totalPrice: order.totalPrice,
        user: order.user,
      });
      return createdOrder;
    } catch (error) {
      throw new HttpException(
        `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  find(orderId: number): Promise<Order[]> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', {
        orderId: orderId,
      })
      .getMany()
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the order in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  findAll(): Promise<Order[]> {
    return this.repository
      .createQueryBuilder('order')
      .getMany()
      .then((orderEntities) => {
        return orderEntities.map((orderEntity) => ({
          id: orderEntity.id,
          status: orderEntity.status,
          totalPrice: orderEntity.totalPrice,
          items: orderEntity.items,
          user: orderEntity.user,
        }));
      })
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the order in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  findById(id: number): Promise<Order> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', {
        orderId: id,
      })
      .getOne()
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the order in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async edit(order: Order): Promise<Order> {
    try {
      const updatedOrder = await this.repository.save(order);

      return updatedOrder;
    } catch (error) {
      throw new HttpException(
        `An error occurred while saving the order to the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
