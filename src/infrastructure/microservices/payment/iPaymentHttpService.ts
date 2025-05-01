import { Payment, PaymentResponseDto } from 'src/shared/models/payment';

export interface IPaymentHttpService {
  createPayment(payment: Payment): Promise<PaymentResponseDto>;
  updatePayment(payment: Payment): Promise<PaymentResponseDto>;
  getPayment(orderId: Payment['orderId']): Promise<PaymentResponseDto>;
}
