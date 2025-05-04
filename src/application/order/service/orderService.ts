import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto, OrderResponseDto } from '../../../shared/models';

import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  EditOrderUseCase,
  FindByIdOrderUseCase,
  FindOrderUseCase,
} from '../useCases';
import { IOrderService } from './IOrderService';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject('CreateOrderUseCase')
    private readonly createOrderUseCase: CreateOrderUseCase,
    @Inject('DeleteOrderUseCase')
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    @Inject('EditOrderUseCase')
    private readonly editOrderUseCase: EditOrderUseCase,
    @Inject('FindByIdOrderUseCase')
    private readonly findByIdOrderUseCase: FindByIdOrderUseCase,
    @Inject('FindOrderUseCase')
    private readonly findOrderUseCase: FindOrderUseCase,
  ) {}
  async create(orderDto: OrderDto): Promise<OrderResponseDto> {
    return this.createOrderUseCase.create(orderDto);
  }

  findAll(): Promise<Order[]> {
    throw new HttpException('Not implemented', HttpStatus.FORBIDDEN);
  }

  find(userId: string, status: string): Promise<Order[]> {
    return this.findOrderUseCase.find(userId, status);
  }

  findById(orderId: number): Promise<OrderResponseDto> {
    return this.findByIdOrderUseCase.findById(orderId);
  }

  async edit(orderDto: OrderDto): Promise<OrderResponseDto> {
    return this.editOrderUseCase.edit(orderDto);
  }

  delete(id: number): Promise<void> {
    return this.deleteOrderUseCase.delete(id);
  }
}
