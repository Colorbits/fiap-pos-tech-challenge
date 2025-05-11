import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderItem, OrderItemDto } from './orderItem';
import { OrderStatusEnum } from '../enums';
import { User } from './user';
import { Payment } from './payment';

export class OrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  totalPrice: string;

  @IsOptional()
  items?: Array<OrderItemDto>;

  @IsOptional()
  status?: Order['status'];
}

export class OrderResponseDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  totalPrice: string;

  @IsOptional()
  items?: Array<OrderItemDto>;

  @IsOptional()
  status?: Order['status'];
  @IsOptional()
  paymentStatus?: Payment['status'];
}

export class FilterOrderDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  ids?: Array<number>;

  @IsOptional()
  userId?: string;

  @IsOptional()
  status?: Order['status'];
}

export class Order {
  id?: number;
  status: OrderStatusEnum;
  totalPrice: string;
  userId: User['id'];
  items: OrderItem[];

  constructor(orderDto: OrderDto, userId: User['id']) {
    this.id = orderDto?.id || randomInt(999);
    this.status = orderDto.status;
    this.userId = userId;
    this.items = [];
  }
}
