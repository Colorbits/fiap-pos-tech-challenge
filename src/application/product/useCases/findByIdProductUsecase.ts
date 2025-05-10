import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { IProductImageService } from '../../services/productImage/IProductImageService';
const productImageMicroserviceEndpoint =
  process.env.PRODUCT_IMAGE_MICROSERVICE_URL;
@Injectable()
export class FindByIdProductUsecase {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
    @Inject('IProductImageService')
    private readonly productImageService: IProductImageService,
  ) {}

  async findById(id: Product['id']): Promise<Product> {
    const product = await this.productRepository.findById(id);
    const productImages = await this.productImageService.getProductImages(id);
    return {
      ...product,
      productImages: productImages.map(
        (image) => `${productImageMicroserviceEndpoint}/${image.id}`,
      ),
    };
  }
}
