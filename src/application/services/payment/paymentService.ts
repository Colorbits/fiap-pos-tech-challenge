import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { Order } from '../../../shared/models';
import { IPaymentService } from './iPaymentService';
import { Payment, PaymentDto } from '../../../shared/models/payment';
import { OrderStatusEnum, PaymentStatusEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { IPaymentHttpService } from '../../../infrastructure/microservices/payment/IPaymentHttpService';

export class PaymentService implements IPaymentService {
  private logger: Logger = new Logger(PaymentService.name);
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IPaymentHttpService')
    private readonly PaymentHttpService: IPaymentHttpService,
  ) {}

  async payOrder(paymentDto: PaymentDto): Promise<string> {
    const order = await this.orderRepository.findById(paymentDto.orderId);

    if (!order) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }

    if (order.status === OrderStatusEnum.CANCELED) {
      throw new HttpException('Order has been cancelled', HttpStatus.FORBIDDEN);
    }

    if (order.status !== OrderStatusEnum.CONFIRMED) {
      throw new HttpException(
        'Order needs to be confirmed to be paid',
        HttpStatus.FORBIDDEN,
      );
    }

    if (
      [
        PaymentStatusEnum.PAYMENT_APPROVED,
        OrderStatusEnum.READY,
        OrderStatusEnum.FINISHED,
      ].includes(order.status)
    ) {
      throw new HttpException('Order is paid already', HttpStatus.FORBIDDEN);
    }

    const payment = new Payment(paymentDto);
    const response = await this.PaymentHttpService.createPayment(payment);
    this.logger.log(`Payment created response ${response}`);

    return response.paymentUrl;
  }

  async paymentStatus(orderId: Order['id']): Promise<string> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }

    const response = await this.PaymentHttpService.getPayment(orderId);
    this.logger.log(`Payment status response ${response}`);

    return response.status;
  }
}
