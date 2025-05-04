import { Order } from '../../../shared/models';
import {
  PaymentCallbackDto,
  PaymentDto,
  PaymentResponseDto,
} from '../../../shared/models/payment';

export interface IPaymentService {
  payOrder(paymentDto: PaymentDto): Promise<string>;
  getPayment(orderId: Order['id']): Promise<PaymentResponseDto[]>;
  paymentCallback(paymentDto: PaymentCallbackDto): Promise<PaymentResponseDto>;
}
