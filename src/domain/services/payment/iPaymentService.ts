import { Order } from '../../../shared/models';
import { PaymentDto } from '../../../shared/models/payment';

export interface IPaymentService {
  generateQrCodePaymentUrl(order: Order): Promise<string>;
  paymentStatus(orderId: Order['id']): Promise<string>;
  payOrder(paymentDto: PaymentDto): Promise<string>;
}
