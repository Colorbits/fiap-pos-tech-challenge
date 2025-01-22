import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, Product } from '../../../shared';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}
  async delete(categoryId: number): Promise<void> {
    const productsFromCategory = await this.productRepository.find(categoryId);
    if (productsFromCategory?.length) {
      throw new HttpException(
        `Can't delete this category because there are ${productsFromCategory?.length} related to it.`,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.categoryRepository.delete(categoryId);
  }
}
