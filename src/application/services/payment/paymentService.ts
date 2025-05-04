import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { Order } from '../../../shared/models';
import { IPaymentService } from './iPaymentService';
import { PaymentCallbackDto, PaymentDto } from '../../../shared/models/payment';
import { OrderStatusEnum, PaymentStatusEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { IPaymentHttpService } from '../../../infrastructure/microservices/payment/IPaymentHttpService';

export class PaymentService implements IPaymentService {
  private logger: Logger = new Logger(PaymentService.name);
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IPaymentHttpService')
    private readonly paymentHttpService: IPaymentHttpService,
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
    try {
      const createPaymentDto: PaymentDto = {
        ...paymentDto,
        orderId: order.id,
        paymentMethod: paymentDto.paymentMethod,
        status: PaymentStatusEnum.WAITING_PAYMENT,
      };
      this.logger.log(`createPaymentDto ${JSON.stringify(createPaymentDto)}`);

      const response =
        await this.paymentHttpService.createPayment(createPaymentDto);
      this.logger.log(`Payment created response ${JSON.stringify(response)}`);

      return response.paymentUrl;
    } catch (error) {
      throw new HttpException(
        `An error occurred while saving paying: '${JSON.stringify(paymentDto)}': ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPayment(orderId: Order['id']) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }

    const response = await this.paymentHttpService.getPayment(orderId);

    return response;
  }

  async paymentCallback(paymentDto: PaymentCallbackDto) {
    const order = await this.orderRepository.findById(paymentDto.orderId);

    if (!order) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }

    let status;
    if (paymentDto.status === 'approved') {
      status = PaymentStatusEnum.PAYMENT_APPROVED;
    } else {
      status = PaymentStatusEnum.PAYMENT_NOT_APPROVED;
    }

    const response = await this.paymentHttpService.updatePayment({
      status,
      id: paymentDto.paymentId,
      orderId: paymentDto.orderId,
      message: paymentDto.message,
    });

    return response;
  }
}
