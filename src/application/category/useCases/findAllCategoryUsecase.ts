import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category } from '../../../shared';

@Injectable()
export class FindAllCategoryUseCase {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
  ) {}
  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
