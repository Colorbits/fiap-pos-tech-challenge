import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import {
  Order,
  OrderDto,
  OrderResponseDto,
  OrderStatusEnum,
  PaymentStatusEnum,
} from '../../../shared';
import { ICustomerHttpService } from '../../../infrastructure/microservices/customer/iCustomerHttpService';
import { IPaymentHttpService } from '../../../infrastructure/microservices/payment/IPaymentHttpService';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('ICustomerHttpService')
    private readonly customerHttpService: ICustomerHttpService,
    @Inject('IPaymentHttpService')
    private readonly paymentHttpService: IPaymentHttpService,
  ) {}
  async create(orderDto: OrderDto): Promise<OrderResponseDto> {
    const response = await this.customerHttpService.getCustomer(
      orderDto.userId,
    );

    if (!response.id) {
      throw new HttpException('Customer not provided', HttpStatus.FORBIDDEN);
    }

    const order = await this.orderRepository.create({
      userId: response.id,
      totalPrice: '0',
      status: OrderStatusEnum.NEW,
      items: [],
    });

    const payments = await this.paymentHttpService.getPayment(order.id);
    const lastPayment = payments[payments.length - 1];
    return {
      ...order,
      paymentStatus: lastPayment.status || PaymentStatusEnum.WAITING_PAYMENT,
    } as OrderResponseDto;
  }
}
