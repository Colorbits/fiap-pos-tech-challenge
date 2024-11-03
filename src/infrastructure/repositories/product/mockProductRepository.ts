import { Product } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MockProductRepository implements IRepository<Product> {
  findById(): Promise<Product> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  edit(): Promise<Product> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  private readonly products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return Promise.resolve(product);
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  async find(categoryId: number): Promise<Product[]> {
    const filteredProducts = this.products.filter((product) => {
      return product.category.id === categoryId;
    });

    return Promise.resolve(filteredProducts);
  }

  async update(productDto: Product): Promise<Product> {
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

  async remove(id: number): Promise<void> {
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
