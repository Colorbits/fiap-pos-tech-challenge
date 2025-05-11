import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  document: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsOptional()
  email?: string;
}
export class CustomerResponseDto {
  @IsOptional()
  id: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  document?: string;
  @IsNotEmpty()
  phoneNumber?: string;
  @IsOptional()
  email?: string;
}

export class FilterCustomerDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  document?: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  email?: string;
}

export class Customer {
  id?: string;
  name: string;
  document: string;
  phoneNumber: string;
  email: string;

  constructor(customerDto: CustomerDto) {
    this.id = customerDto?.id || `${randomInt(999)}`;
    this.name = customerDto.name;
    this.document = customerDto.document;
    this.phoneNumber = customerDto.phoneNumber;
    this.email = customerDto.email;
  }
}
