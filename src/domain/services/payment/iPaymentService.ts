import { Order } from '../../../shared/models';
import { PaymentDataDto, PaymentDto } from '../../../shared/models/payment';

export interface IPaymentService {
  generateQrCodePaymentUrl(order: Order): Promise<string>;
  paymentStatus(orderId: Order['id']): Promise<string>;
  paymentConfirmation(
    orderId: Order['id'],
    paymentDataDto: PaymentDataDto,
  ): Promise<string>;
  payOrder(paymentDto: PaymentDto): Promise<string>;
}
