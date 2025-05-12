import { Provider } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, Product } from '../../../shared';
import {
  CreateProductUsecase,
  DeleteProductUsecase,
  EditProductUsecase,
  FindByIdProductUsecase,
  FindProductUsecase,
} from '../useCases';
import { ProductService } from '../service/productService';
import { IProductImageService } from '../../services/productImage/IProductImageService';

export const ProductProviders: Provider[] = [
  { provide: 'IService<Product>', useClass: ProductService },
  {
    provide: 'CreateProductUsecase',
    inject: ['IRepository<Product>', 'IRepository<Category>'],
    useFactory: (
      repository: IRepository<Product>,
      repositoryCategory: IRepository<Category>,
    ): CreateProductUsecase =>
      new CreateProductUsecase(repository, repositoryCategory),
  },
  {
    provide: 'DeleteProductUsecase',
    inject: ['IRepository<Product>'],
    useFactory: (repository: IRepository<Product>): DeleteProductUsecase =>
      new DeleteProductUsecase(repository),
  },
  {
    provide: 'EditProductUsecase',
    inject: ['IRepository<Product>', 'IRepository<Category>'],
    useFactory: (
      repository: IRepository<Product>,
      repositoryCategory: IRepository<Category>,
    ): EditProductUsecase =>
      new EditProductUsecase(repository, repositoryCategory),
  },
  {
    provide: 'FindByIdProductUsecase',
    inject: ['IRepository<Product>', 'IProductImageService'],
    useFactory: (
      repository: IRepository<Product>,
      productImageService: IProductImageService,
    ): FindByIdProductUsecase =>
      new FindByIdProductUsecase(repository, productImageService),
  },
  {
    provide: 'FindProductUsecase',
    inject: ['IRepository<Product>'],
    useFactory: (repository: IRepository<Product>): FindProductUsecase =>
      new FindProductUsecase(repository),
  },
];
