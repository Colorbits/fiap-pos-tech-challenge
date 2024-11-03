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

  async create(orderItemDto: OrderItemDto): Promise<OrderItem> {
    try {
      const product = await this.productRepository.findById(
        orderItemDto.productId,
      );
      const order = await this.orderRepository.findById(orderItemDto.orderId);
      const createdOrderItem = await this.orderItemRepository.create({
        id: orderItemDto?.id,
        order,
        product,
        productPrice: product.price,
        quantity: orderItemDto.quantity,
      });

      const orderItems = await this.orderItemRepository.find(
        orderItemDto.orderId,
      );

      const totalPrice = orderItems.reduce((sum, current) => {
        return Number(sum) + Number(current.productPrice) * current.quantity;
      }, 0);

      await this.orderRepository.edit({
        ...order,
        totalPrice: `${totalPrice}`,
      });
      return createdOrderItem;
    } catch (error) {
      throw new HttpException(
        `Error when creating order item: ${error.message}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  findAll(): Promise<OrderItem[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  find(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.find(orderId);
  }

  findById(orderId: number): Promise<OrderItem> {
    return this.orderItemRepository.findById(orderId);
  }

  async edit(orderItemDto: OrderItemDto): Promise<OrderItem> {
    try {
      const orderItem = await this.orderItemRepository.findById(
        orderItemDto.id,
      );

      if (!orderItem?.order?.id) {
        throw new HttpException(`Order item not found.`, HttpStatus.NOT_FOUND);
      }

      const product = await this.productRepository.findById(
        orderItemDto.productId,
      );

      const order = await this.orderRepository.findById(orderItem.order.id);
      const createdOrderItem = await this.orderItemRepository.edit({
        ...orderItem,
        order,
        product,
        productPrice: product.price,
        quantity: orderItemDto.quantity,
      });

      const orderItems = await this.orderItemRepository.find(order.id);

      const totalPrice = orderItems.reduce((sum, current) => {
        return Number(sum) + Number(current.productPrice) * current.quantity;
      }, 0);
      console.log('console.log edit orderItem', orderItem);

      await this.orderRepository.edit({
        ...order,
        totalPrice: `${totalPrice}`,
      });
      return createdOrderItem;
    } catch (error) {
      throw new HttpException(
        `Error when editing order item: ${error.message}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async delete(orderItemId: number): Promise<void> {
    try {
      const orderItem = await this.orderItemRepository.findById(orderItemId);
      const order = await this.orderRepository.findById(orderItem.order.id);
      await this.orderItemRepository.delete(orderItemId);

      const orderItems = await this.orderItemRepository.find(
        orderItem.order.id,
      );

      const totalPrice = orderItems.reduce((sum, current) => {
        return Number(sum) + Number(current.productPrice) * current.quantity;
      }, 0);

      await this.orderRepository.edit({
        ...order,
        totalPrice: `${totalPrice}`,
      });
    } catch (error) {
      throw new HttpException(
        `Error when editing order item: ${error.message}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
