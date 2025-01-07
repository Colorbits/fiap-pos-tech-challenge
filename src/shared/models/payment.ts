import { IsNotEmpty } from 'class-validator';
import { PaymentMethodEnum } from '../enums';

export class PaymentDto {
  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;
}

export class PaymentDataDto {
  @IsNotEmpty()
  paymentStatus: string;
}
