import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category } from '../../../shared';

@Injectable()
export class FindCategoryUseCase {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
  ) {}
  find(id: number): Promise<Category[]> {
    return this.categoryRepository.find(id);
  }
}
