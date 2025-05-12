import { IProductImageHttpService } from './../../../infrastructure/microservices/productImage/iProductImageHttpService';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product, ProductImage } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { IProductImageService } from './IProductImageService';

@Injectable()
export class ProductImageService implements IProductImageService {
  constructor(
    @Inject('IProductImageHttpService')
    private readonly productImageHttpService: IProductImageHttpService,
    @Inject('IRepository<Product>')
    private productRepository: IRepository<Product>,
  ) {}
  async getProductImages(productId: ProductImage['productId']) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return this.productImageHttpService.getProductImages(productId);
  }
}
