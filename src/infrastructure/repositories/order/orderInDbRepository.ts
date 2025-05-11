import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../shared/models';
import { OrderEntity } from '../../../entities';
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
        userId: order.userId,
      });
      return createdOrder;
    } catch (error) {
      throw new HttpException(
        `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(userId: number, status: string): Promise<Order[]> {
    let where = '';

    if (userId) {
      where += `and o.user_id = '${userId}'`;
    }

    if (status) {
      where += `and o.status = '${status}'`;
    }
    try {
      const orders = await this.repository.query(`
        SELECT 
          "o"."id",
          "o"."status",
          "o"."user_id" "userId",
          "o"."total_price" "totalPrice"
        FROM 
            "Order" "o"
        WHERE
          o.status != 'FINISHED'
          ${where}
        ORDER BY 
            CASE 
                WHEN "o"."status" = 'READY' THEN 1
                WHEN "o"."status" = 'IN_PROGRESS' THEN 2
                WHEN "o"."status" = 'FINISHED' THEN 3
                ELSE 4 -- Other statuses (if any) will come last
            END,
          "o"."id" DESC;
        `);
      return orders;
    } catch (error) {
      throw new HttpException(
        `An error occurred while searching the order in the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
          userId: orderEntity.userId,
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
