import { Inject, Injectable } from '@nestjs/common';
import { Category, Product, ProductDto } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class CreateProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
    @Inject('IRepository<Category>')
    private categoryRepository: IRepository<Category>,
  ) {}
  async create(productDto: ProductDto): Promise<Product> {
    const category = await this.categoryRepository.findById(
      productDto.categoryId,
    );
    const product: Product = {
      name: productDto.name,
      price: productDto.price,
      status: productDto.status,
      description: productDto.description,
      category,
    };
    return this.productRepository.create(product);
  }
}
