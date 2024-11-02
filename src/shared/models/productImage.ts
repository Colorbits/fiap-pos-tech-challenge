import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from './product';

export class ProductImageDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  path: string;
}

export class FilterProductImageDto {
  @IsOptional()
  id?: number;
}

export class ProductImage {
  id?: number;
  path: string;
  product: Product;

  constructor(productImageDto: ProductImageDto, product: Product) {
    this.id = productImageDto?.id || randomInt(999);
    this.path = productImageDto.path;
    this.product = product;
  }
}
