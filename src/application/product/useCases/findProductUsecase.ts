import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class FindProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}

  find(categoryId: number): Promise<Product[]> {
    return this.productRepository.find(categoryId);
  }
}
