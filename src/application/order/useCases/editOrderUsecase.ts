import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto, OrderResponseDto, PaymentStatusEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { PaymentHttpService } from '../../../infrastructure/microservices/payment/paymentHttpService';

@Injectable()
export class EditOrderUseCase {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IPaymentHttpService')
    private readonly paymentHttpService: PaymentHttpService,
  ) { }
  async edit(orderDto: OrderDto): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findById(orderDto.id);

    const editedOrder = await this.orderRepository.edit({
      ...order,
      status: orderDto.status,
    });

    const payments = await this.paymentHttpService.getPayment(orderDto.id);
    const lastPayment = payments[payments.length - 1];

    return {
      ...editedOrder,
      paymentStatus: lastPayment.status || PaymentStatusEnum.WAITING_PAYMENT,
    } as unknown as OrderResponseDto;
  }
}
