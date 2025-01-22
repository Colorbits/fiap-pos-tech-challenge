import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class DeleteProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}

  async delete(productId: number): Promise<void> {
    return this.productRepository.delete(productId);
  }
}
