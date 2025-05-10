import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductImageDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  productId: number;

  @IsOptional()
  path?: string;

  @IsOptional()
  filename?: string;
  @IsOptional()
  file?: Express.Multer.File;
}

export class FilterProductImageDto {
  @IsOptional()
  id?: number;
}

export class ProductImage {
  id?: string;
  path?: string;
  productId: number;
  filename?: string;

  constructor(productImageDto: ProductImageDto) {
    this.id = productImageDto?.id || `${randomInt(999)}`;
    this.path = productImageDto.path;
    this.productId = productImageDto.productId;
    this.filename = productImageDto.filename;
  }
}
