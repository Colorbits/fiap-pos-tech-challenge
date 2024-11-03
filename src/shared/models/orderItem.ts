import { IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from './product';
import { randomInt } from 'crypto';
import { Order } from './order';

export class OrderItemDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  productPrice: string;
}

export class FilterOrderItemDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  productId?: number;

  @IsNotEmpty()
  quantity?: number;

  @IsNotEmpty()
  orderId?: number;
}

export class OrderItem {
  id?: number;
  order?: Order;
  quantity: number;
  product?: Product;
  productPrice?: string;

  constructor(orderItemDto: OrderItemDto, product: Product) {
    this.id = orderItemDto?.id || randomInt(999);
    this.quantity = orderItemDto.quantity;
    this.productPrice = orderItemDto.productPrice;
    this.product = product;
  }
}
