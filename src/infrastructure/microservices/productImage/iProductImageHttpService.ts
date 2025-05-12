import { ProductImage, ProductImageDto } from '../../../shared';

export interface IProductImageHttpService {
  getProductImages(
    productId: ProductImage['productId'],
  ): Promise<ProductImageDto[]>;
}
