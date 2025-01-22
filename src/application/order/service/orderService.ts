import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto } from '../../../shared/models';
import { IService } from '../../iService';
import {
  CreateOrderUseCase,
  DeleteOrderUseCase,
  EditOrderUseCase,
  FindByIdOrderUseCase,
  FindOrderUseCase,
} from '../useCases';

@Injectable()
export class OrderService implements IService<Order> {
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
  async create(orderDto: OrderDto): Promise<Order> {
    return this.createOrderUseCase.create(orderDto);
  }

  findAll(): Promise<Order[]> {
    throw new HttpException('Not implemented', HttpStatus.FORBIDDEN);
  }

  find(orderId: number, status: string): Promise<Order[]> {
    return this.findOrderUseCase.find(orderId, status);
  }

  findById(orderId: number): Promise<Order> {
    return this.findByIdOrderUseCase.findById(orderId);
  }

  async edit(orderDto: OrderDto): Promise<Order> {
    return this.editOrderUseCase.edit(orderDto);
  }

  delete(id: number): Promise<void> {
    return this.deleteOrderUseCase.delete(id);
  }
}
