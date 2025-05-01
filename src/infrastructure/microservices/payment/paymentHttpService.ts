import { Payment, PaymentResponseDto } from '../../../shared/models/payment';
import { IPaymentHttpService } from './IPaymentHttpService';
import axios from 'axios';

const paymentMicroserviceEndpoint = process.env.PAYMENT_MICROSERVICE_URL;

export class PaymentHttpService implements IPaymentHttpService {
  async updatePayment(payment: Payment) {
    try {
      const response = await axios.put<PaymentResponseDto>(
        paymentMicroserviceEndpoint,
        payment,
      );
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async createPayment(payment: Payment) {
    try {
      const response = await axios.post<PaymentResponseDto>(
        paymentMicroserviceEndpoint,
        payment,
      );
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async getPayment(orderId: Payment['orderId']) {
    try {
      const response = await axios.get<PaymentResponseDto>(
        `${paymentMicroserviceEndpoint}/${orderId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw error;
    }
  }
}
