import { Order, OrderDto, OrderResponseDto } from '../../../shared';

export interface IOrderService {
  create(orderDto: OrderDto): Promise<OrderResponseDto>;

  edit(orderDto: Partial<OrderDto>): Promise<OrderResponseDto>;

  delete(orderId: number): Promise<void>;

  find(userId?: string, status?: string, term?: string): Promise<Order[]>;

  findById(orderId: number): Promise<OrderResponseDto>;

  findAll(): Promise<Order[]>;
}
