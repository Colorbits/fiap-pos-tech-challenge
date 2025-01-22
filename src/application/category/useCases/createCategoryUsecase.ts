import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, CategoryDto } from '../../../shared';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
  ) {}
  create(categoryDto: CategoryDto): Promise<Category> {
    const category: Category = {
      name: categoryDto.name,
    };
    return this.categoryRepository.create(category);
  }
}
