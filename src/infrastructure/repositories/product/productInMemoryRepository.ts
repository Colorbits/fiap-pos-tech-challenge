import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../../../shared/models/product';
import { IRepository } from '../iRepository';

@Injectable()
export class ProductInMemoryRepository implements IRepository<Product> {
  findById(): Promise<Product> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  private readonly products: Product[] = [];

  create(product: Product): Promise<Product> {
    this.products.push(product);
    return Promise.resolve(product);
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  find(categoryId: number): Promise<Product[]> {
    const filteredProducts = this.products.filter((product) => {
      return product.category.id === categoryId;
    });
    return Promise.resolve(filteredProducts);
  }

  async edit(productDto: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === productDto.id,
    );
    if (productIndex === -1) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = { ...this.products[productIndex], ...productDto };
    this.products[productIndex] = updatedProduct;
    return Promise.resolve(updatedProduct);
  }

  async delete(id: number): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    this.products.splice(productIndex, 1);
    return Promise.resolve();
  }
}
