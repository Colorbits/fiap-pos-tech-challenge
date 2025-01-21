import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class FindByIdProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}

  findById(id: Product['id']): Promise<Product> {
    return this.productRepository.findById(id);
  }
}
