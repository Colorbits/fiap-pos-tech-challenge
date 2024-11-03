import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './orderItemEntity';
import { IRepository } from '../iRepository';
import { OrderItem } from '../../../shared/models/orderItem';

@Injectable()
export class OrderItemInDbRepository implements IRepository<OrderItem> {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repository: Repository<OrderItemEntity>,
  ) {}
  findById(): Promise<OrderItem> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  create(orderItem: OrderItem): Promise<OrderItem> {
    try {
      return this.repository.save(orderItem);
    } catch (error) {
      new HttpException(
        `An error occurred while saving the orderItem to the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<OrderItem[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  find(orderId: number): Promise<OrderItem[]> {
    return this.repository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.orderId = :orderId', {
        orderId: orderId,
      })
      .getMany()
      .then((orderItemEntities) => {
        console.log(orderItemEntities);
        return orderItemEntities.map((orderItemEntity) => ({
          id: orderItemEntity.id,
          product: orderItemEntity.product,
          quantity: orderItemEntity.quantity,
          productPrice: orderItemEntity.productPrice,
          order: orderItemEntity.order,
        }));
      })
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  edit(): Promise<OrderItem> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
}
