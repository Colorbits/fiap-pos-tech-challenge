import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { Order } from '../../../shared/models';
import { IPaymentService } from './iPaymentService';
import { PaymentDto } from '../../../shared/models/payment';
import { OrderStatusEnum, PaymentMethodEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

export class PaymentService implements IPaymentService {
  private logger: Logger = new Logger(PaymentService.name);
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}

  generateQrCodePaymentUrl(order: Order): Promise<string> {
    this.logger.debug(
      `Generating QRCode for payment of the order ${JSON.stringify(order)}`,
    );

    // TODO: implement Mercado Pago qr code payment integration
    return Promise.resolve('qrcode-url');
  }

  async payOrder(paymentDto: PaymentDto): Promise<string> {
    const order = await this.orderRepository.findById(paymentDto.orderId);

    if (!order) {
      throw new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }

    if (order.status === OrderStatusEnum.CANCELED) {
      throw new HttpException('Order has been cancelled', HttpStatus.FORBIDDEN);
    }

    if (
      [
        OrderStatusEnum.PAYMENT_APPROVED,
        OrderStatusEnum.READY,
        OrderStatusEnum.FINISHED,
      ].includes(order.status)
    ) {
      throw new HttpException('Order is paid already', HttpStatus.FORBIDDEN);
    }

    if (order.status !== OrderStatusEnum.CONFIRMED) {
      throw new HttpException(
        'Order needs to be confirmed to be paid',
        HttpStatus.FORBIDDEN,
      );
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
      throw new HttpException('Method not implemented', HttpStatus.FORBIDDEN);
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.PIX) {
      throw new HttpException('Method not implemented', HttpStatus.FORBIDDEN);
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.QR_CODE) {
      try {
        const paymentResult = this.generateQrCodePaymentUrl(order);
        console.log(order);
        await this.orderRepository.edit({
          ...order,
          status: OrderStatusEnum.WAITING_PAYMENT,
        });
        return paymentResult;
      } catch (error) {
        throw new HttpException(
          `An error occurred while creating qr code and saving the order ${JSON.stringify(order)}: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
