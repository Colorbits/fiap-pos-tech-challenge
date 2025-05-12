import axios from 'axios';
import { ProductImage, ProductImageDto } from '../../../shared';
import { IProductImageHttpService } from './iProductImageHttpService';

const productImageMicroserviceEndpoint =
  process.env.PRODUCT_IMAGE_MICROSERVICE_URL;

export class ProductImageHttpService implements IProductImageHttpService {
  async getProductImages(productId: ProductImage['productId']) {
    try {
      const response = await axios.get<ProductImageDto[]>(
        `${productImageMicroserviceEndpoint}/images/${productId}`,
      );

      console.log(
        `Product image microservice response: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching product image status:', error.message);
      throw error;
    }
  }
}
