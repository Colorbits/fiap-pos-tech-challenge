import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, CategoryDto } from '../../../shared';

@Injectable()
export class EditCategoryUseCase {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
  ) {}
  edit(categoryDto: CategoryDto): Promise<Category> {
    const category: Category = {
      id: categoryDto.id,
      name: categoryDto.name,
    };
    return this.categoryRepository.edit(category);
  }
}
