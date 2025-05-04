import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentMethodEnum, PaymentStatusEnum } from '../enums';

export class PaymentDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  orderId: number;
  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;
  @IsNotEmpty()
  status: PaymentStatusEnum;
  @IsOptional()
  message?: string;
}

export class PaymentCallbackDto {
  @IsNotEmpty()
  paymentId: string;
  @IsNotEmpty()
  orderId: number;
  @IsNotEmpty()
  message: PaymentMethodEnum;
  @IsNotEmpty()
  status: string;
}

export class PaymentResponseDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  orderId: number;
  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;
  @IsNotEmpty()
  status: PaymentStatusEnum;
  @IsNotEmpty()
  paymentUrl: string;
}

export class PaymentDataDto {
  @IsNotEmpty()
  paymentStatus: string;
}

export class Payment {
  id?: string;
  orderId: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  message?: string;

  constructor(paymentDto: PaymentDto) {
    this.id = paymentDto?.id;
    this.orderId = paymentDto.orderId;
    this.paymentMethod = paymentDto.paymentMethod;
    this.status = paymentDto.status;
    this.message = paymentDto.message;
  }
}
