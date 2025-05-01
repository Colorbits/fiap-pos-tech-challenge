import { Order } from '../../../shared/models';
import { PaymentDto } from '../../../shared/models/payment';

export interface IPaymentService {
  payOrder(paymentDto: PaymentDto): Promise<string>;
  paymentStatus(orderId: Order['id']): Promise<string>;
}
