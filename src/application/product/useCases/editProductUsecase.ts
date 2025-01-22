import { Inject, Injectable } from '@nestjs/common';
import { Category, Product, ProductDto } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class EditProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
    @Inject('IRepository<Category>')
    private categoryRepository: IRepository<Category>,
  ) {}

  async edit(productDto: ProductDto): Promise<Product> {
    const category = await this.categoryRepository.findById(
      productDto.categoryId,
    );
    const product: Product = {
      id: productDto.id,
      name: productDto.name,
      price: productDto.price,
      status: productDto.status,
      description: productDto.description,
      category,
    };
    return this.productRepository.edit(product);
  }
}
