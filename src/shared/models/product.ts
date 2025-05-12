import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from './category';
import { ProductStatusEnum } from '../enums';

export class ProductDto {
  @IsOptional()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  status: Product['status'];
  @IsNotEmpty()
  categoryId: number;
}

export class FilterProductDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  ids?: Array<number>;
  @IsOptional()
  name?: string;
  @IsOptional()
  price?: string;
  @IsOptional()
  status?: Product['status'];
  @IsOptional()
  categoryId?: number;
}

export class Product {
  id?: number;
  name: string;
  description: string;
  price: string;
  status: ProductStatusEnum;
  category: Category;
  productImages?: Array<string>;

  constructor(
    productDto: ProductDto,
    category: Category,
    productImages?: Array<string>,
  ) {
    this.id = productDto?.id || randomInt(999);
    this.name = productDto.name;
    this.description = productDto.description;
    this.price = productDto.price;
    this.status = productDto.status;
    this.category = category;
    this.productImages = productImages || [];
  }
}
