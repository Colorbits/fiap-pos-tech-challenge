import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  OrderItemDto,
  OrderItem,
  Order,
  Product,
} from '../../../shared/models';
import { IService } from '../../iService';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class OrderItemService implements IService<OrderItem> {
  constructor(
    @Inject('IRepository<OrderItem>')
    private readonly orderItemRepository: IRepository<OrderItem>,
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}
  findById(): Promise<OrderItem> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async create(orderItemDto: OrderItemDto): Promise<OrderItem> {
    const product = await this.productRepository.findById(
      orderItemDto.productId,
    );
    const order = await this.orderRepository.findById(orderItemDto.orderId);
    const createdOrderItem = await this.orderItemRepository.create({
      order,
      product,
      productPrice: product.price,
      quantity: orderItemDto.quantity,
    });

    const orderItems = await this.orderItemRepository.find(
      orderItemDto.orderId,
    );

    console.log(
      'orderItemsPrices',
      orderItems.map((item) => item.productPrice),
    );
    const totalPrice = orderItems.reduce((sum, current) => {
      return Number(sum) + Number(current.productPrice) * current.quantity;
    }, 0);
    console.log('totalPrice', totalPrice);
    await this.orderRepository.edit({
      ...order,
      totalPrice: `${totalPrice}`,
    });
    return createdOrderItem;
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }

  findByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.find(orderId);
  }

  find(): Promise<OrderItem[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  edit(): Promise<OrderItem> {
    // TODO: update order price after updating item
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  delete(id: number): Promise<void> {
    // TODO: update order price after deleting item
    return this.orderItemRepository.delete(id);
  }
}
