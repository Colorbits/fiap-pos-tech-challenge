import { ProductImage, ProductImageDto } from '../../../shared';

export interface IProductImageService {
  getProductImages(
    productId: ProductImage['productId'],
  ): Promise<ProductImageDto[]>;
}
