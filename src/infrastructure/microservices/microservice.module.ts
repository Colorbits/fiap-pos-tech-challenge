import { Module } from '@nestjs/common';
import { PaymentHttpService } from './payment/paymentHttpService';

@Module({
  providers: [{ provide: 'IPaymentHttpService', useClass: PaymentHttpService }],
  exports: [{ provide: 'IPaymentHttpService', useClass: PaymentHttpService }],
})
export class MicroserviceModule {}
