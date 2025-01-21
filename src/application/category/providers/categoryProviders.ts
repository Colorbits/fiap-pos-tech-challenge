import { Provider } from '@nestjs/common';
import { CategoryService } from '../service/categoryService';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, Product } from '../../../shared';
import {
  FindCategoryUseCase,
  DeleteCategoryUseCase,
  EditCategoryUseCase,
  FindAllCategoryUseCase,
} from '../useCases';
import { CreateCategoryUseCase } from '../useCases/createCategoryUsecase';

export const CategoryProviders: Provider[] = [
  { provide: 'IService<Category>', useClass: CategoryService },
  {
    provide: 'FindCategoryUseCase',
    inject: ['IRepository<Category>'],
    useFactory: (repository: IRepository<Category>): FindCategoryUseCase =>
      new FindCategoryUseCase(repository),
  },
  {
    provide: 'FindAllCategoryUseCase',
    inject: ['IRepository<Category>'],
    useFactory: (repository: IRepository<Category>): FindAllCategoryUseCase =>
      new FindAllCategoryUseCase(repository),
  },
  {
    provide: 'CreateCategoryUseCase',
    inject: ['IRepository<Category>'],
    useFactory: (repository: IRepository<Category>): CreateCategoryUseCase =>
      new CreateCategoryUseCase(repository),
  },
  {
    provide: 'EditCategoryUseCase',
    inject: ['IRepository<Category>'],
    useFactory: (repository: IRepository<Category>): EditCategoryUseCase =>
      new EditCategoryUseCase(repository),
  },
  {
    provide: 'DeleteCategoryUseCase',
    inject: ['IRepository<Category>'],
    useFactory: (
      repository: IRepository<Category>,
      productRepository: IRepository<Product>,
    ): DeleteCategoryUseCase =>
      new DeleteCategoryUseCase(repository, productRepository),
  },
];
