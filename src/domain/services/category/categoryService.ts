import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, CategoryDto, Product } from '../../../shared/models';
import { IService } from '../../iService';

@Injectable()
export class CategoryService implements IService<Category> {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}
  findById(): Promise<Category> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  create(categoryDto: CategoryDto): Promise<Category> {
    const category: Category = {
      name: categoryDto.name,
    };
    return this.categoryRepository.create(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  find(id: number): Promise<Category[]> {
    return this.categoryRepository.find(id);
  }

  edit(categoryDto: CategoryDto): Promise<Category> {
    const category: Category = {
      id: categoryDto.id,
      name: categoryDto.name,
    };
    return this.categoryRepository.edit(category);
  }

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
