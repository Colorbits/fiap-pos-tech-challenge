import { Inject, Injectable } from '@nestjs/common';
import { IService } from '../../iService';
import { Category, Product, ProductDto } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class ProductService implements IService<Product> {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
    @Inject('IRepository<Category>')
    private categoryRepository: IRepository<Category>,
  ) {}

  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  async create(productDto: ProductDto): Promise<Product> {
    const category = await this.categoryRepository.findById(
      productDto.categoryId,
    );
    const product: Product = {
      name: productDto.name,
      price: productDto.price,
      status: productDto.status,
      category,

      // TODO: implement following fields
      // descricao: produtoEntity.descricao,
      // imagemBase64: produtoEntity.imagemBase64,
    };
    return this.productRepository.create(product);
  }

  async edit(productDto: ProductDto): Promise<Product> {
    const category = await this.categoryRepository.findById(
      productDto.categoryId,
    );
    const product: Product = {
      id: productDto.id,
      name: productDto.name,
      price: productDto.price,
      status: productDto.status,
      category,

      // TODO: implement following fields
      // descricao: produtoEntity.descricao,
      // imagemBase64: produtoEntity.imagemBase64,
    };
    return this.productRepository.edit(product);
  }

  find(categoryId: number): Promise<Product[]> {
    return this.productRepository.find(categoryId);
  }

  findById(id: Product['id']): Promise<Product> {
    return this.productRepository.findById(id);
  }

  async delete(productId: number): Promise<void> {
    return this.productRepository.delete(productId);
  }
}
