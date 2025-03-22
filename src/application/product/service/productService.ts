import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IService } from '../../iService';
import { Product, ProductDto } from '../../../shared/models';

import {
  CreateProductUsecase,
  DeleteProductUsecase,
  EditProductUsecase,
  FindByIdProductUsecase,
  FindProductUsecase,
} from '../useCases';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService implements IService<Product> {
  constructor(
    @Inject('CreateProductUsecase')
    private readonly createProductUsecase: CreateProductUsecase,
    @Inject('EditProductUsecase')
    private readonly editProductUsecase: EditProductUsecase,
    @Inject('DeleteProductUsecase')
    private readonly deleteProductUsecase: DeleteProductUsecase,
    @Inject('FindByIdProductUsecase')
    private readonly findByIdProductUsecase: FindByIdProductUsecase,
    @Inject('FindProductUsecase')
    private readonly findProductUsecase: FindProductUsecase,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) { }

  findAll(): Promise<Product[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async create(productDto: ProductDto): Promise<Product> {
    return this.createProductUsecase.create(productDto);
  }

  async edit(productDto: ProductDto): Promise<Product> {
    return this.editProductUsecase.edit(productDto);
  }

  async find(categoryId: number): Promise<Product[]> {
    try {
      if (categoryId) {
        const cachedData = await this.cacheService.get<Product[]>(
          categoryId.toString(),
        );

        console.error('Product from cache', cachedData);

        if (cachedData) {
          return cachedData;
        }
      }
      const data = await this.findProductUsecase.find(categoryId);
      if (categoryId) {
        await this.cacheService.set(categoryId?.toString(), data);
      }
      return data;
    } catch (error) {
      console.error('Error while fetching data from cache', error);
    }
  }

  findById(id: Product['id']): Promise<Product> {
    return this.findByIdProductUsecase.findById(id);
  }

  async delete(productId: number): Promise<void> {
    return this.deleteProductUsecase.delete(productId);
  }
}
