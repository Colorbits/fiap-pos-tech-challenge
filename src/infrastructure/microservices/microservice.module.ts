import { Module } from '@nestjs/common';
import { PaymentHttpService } from './payment/paymentHttpService';
import { CustomerHttpService } from './customer/customerHttpService';

@Module({
  providers: [
    { provide: 'IPaymentHttpService', useClass: PaymentHttpService },
    { provide: 'ICustomerHttpService', useClass: CustomerHttpService },
  ],
  exports: [
    { provide: 'IPaymentHttpService', useClass: PaymentHttpService },
    { provide: 'ICustomerHttpService', useClass: CustomerHttpService }
  ],
})
export class MicroserviceModule {}
