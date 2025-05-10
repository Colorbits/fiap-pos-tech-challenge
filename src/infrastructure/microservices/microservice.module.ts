import { Module } from '@nestjs/common';
import { PaymentHttpService } from './payment/paymentHttpService';
import { CustomerHttpService } from './customer/customerHttpService';
import { ProductImageHttpService } from './productImage/productImageHttpService';

@Module({
  providers: [
    { provide: 'IPaymentHttpService', useClass: PaymentHttpService },
    { provide: 'ICustomerHttpService', useClass: CustomerHttpService },
    { provide: 'IProductImageHttpService', useClass: ProductImageHttpService },
  ],
  exports: [
    { provide: 'IPaymentHttpService', useClass: PaymentHttpService },
    { provide: 'ICustomerHttpService', useClass: CustomerHttpService },
    { provide: 'IProductImageHttpService', useClass: ProductImageHttpService },
  ],
})
export class MicroserviceModule {}
