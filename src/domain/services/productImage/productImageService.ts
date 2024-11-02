import { Inject, Injectable } from '@nestjs/common';
import { IService } from '../../iService';
import { Product, ProductImage, ProductImageDto } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class ProductImageService implements IService<ProductImage> {
  constructor(
    @Inject('IRepository<ProductImage>')
    private readonly productImageRepository: IRepository<ProductImage>,
    @Inject('IRepository<Product>')
    private productRepository: IRepository<Product>,
  ) {}
  edit(): Promise<ProductImage> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ProductImage[]> {
    throw new Error('Method not implemented.');
  }

  async create(productImageDto: ProductImageDto): Promise<ProductImage> {
    const product = await this.productRepository.findById(
      productImageDto.productId,
    );
    const productImage: ProductImage = {
      path: productImageDto.path,
      product,
    };
    return this.productImageRepository.create(productImage);
  }

  find(productId: number): Promise<ProductImage[]> {
    return this.productImageRepository.find(productId);
  }

  findById(id: ProductImage['id']): Promise<ProductImage> {
    return this.productImageRepository.findById(id);
  }

  async delete(id: ProductImage['id']): Promise<void> {
    return this.productImageRepository.delete(id);
  }
}
