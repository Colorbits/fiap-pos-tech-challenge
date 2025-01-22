import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Category, CategoryDto } from '../../../shared/models';
import { IService } from '../../iService';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  EditCategoryUseCase,
  FindAllCategoryUseCase,
  FindCategoryUseCase,
} from '../useCases';

@Injectable()
export class CategoryService implements IService<Category> {
  constructor(
    @Inject('FindCategoryUseCase')
    private findCategoryUseCase: FindCategoryUseCase,
    @Inject('FindAllCategoryUseCase')
    private findAllCategoryUseCase: FindAllCategoryUseCase,
    @Inject('CreateCategoryUseCase')
    private createCategoryUseCase: CreateCategoryUseCase,
    @Inject('EditCategoryUseCase')
    private editCategoryUseCase: EditCategoryUseCase,
    @Inject('DeleteCategoryUseCase')
    private deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}
  findById(): Promise<Category> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  create(categoryDto: CategoryDto): Promise<Category> {
    return this.createCategoryUseCase.create(categoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.findAllCategoryUseCase.findAll();
  }

  find(id: number): Promise<Category[]> {
    return this.findCategoryUseCase.find(id);
  }

  edit(categoryDto: CategoryDto): Promise<Category> {
    return this.editCategoryUseCase.edit(categoryDto);
  }

  async delete(categoryId: number): Promise<void> {
    return this.deleteCategoryUseCase.delete(categoryId);
  }
}
