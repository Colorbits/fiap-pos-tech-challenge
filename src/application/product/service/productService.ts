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
  ) {}

  findAll(): Promise<Product[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async create(productDto: ProductDto): Promise<Product> {
    return this.createProductUsecase.create(productDto);
  }

  async edit(productDto: ProductDto): Promise<Product> {
    return this.editProductUsecase.edit(productDto);
  }

  find(categoryId: number): Promise<Product[]> {
    return this.findProductUsecase.find(categoryId);
  }

  findById(id: Product['id']): Promise<Product> {
    return this.findByIdProductUsecase.findById(id);
  }

  async delete(productId: number): Promise<void> {
    return this.deleteProductUsecase.delete(productId);
  }
}
