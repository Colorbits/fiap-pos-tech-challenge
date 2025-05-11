import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order, OrderResponseDto, PaymentStatusEnum } from '../../../shared';
import { PaymentHttpService } from '../../../infrastructure/microservices/payment/paymentHttpService';

@Injectable()
export class FindByIdOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IPaymentHttpService')
    private readonly paymentHttpService: PaymentHttpService,
  ) { }
  async findById(orderId: number): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findById(orderId);
      const orderResponseDto = {
        ...order,
      } as OrderResponseDto;

      const payments = await this.paymentHttpService.getPayment(orderId);
      const lastPayment = payments[payments.length - 1];

      orderResponseDto.paymentStatus =
        lastPayment?.status || PaymentStatusEnum.WAITING_PAYMENT;

      return orderResponseDto;
    } catch (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
  }
}
