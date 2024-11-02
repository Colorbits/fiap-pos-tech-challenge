import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IRepository } from '../iRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImageEntity } from './productImageEntity';
import { ProductEntity } from '../product/productEntity';
import { ProductImage } from '../../../shared/models/productImage';

@Injectable()
export class ProductImageInDbRepository implements IRepository<ProductImage> {
  constructor(
    @InjectRepository(ProductImageEntity)
    private repository: Repository<ProductImageEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  edit(): Promise<ProductImage> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ProductImage[]> {
    throw new Error('Method not implemented.');
  }

  async create(productImage: ProductImage): Promise<ProductImage> {
    return this.repository.save(productImage).catch((error) => {
      throw new Error(
        `An error occurred while saving the product to the database: '${JSON.stringify(productImage)}': ${error.message}`,
      );
    });
  }

  find(categoryId: number): Promise<ProductImage[]> {
    let whereClause = '';

    if (categoryId) {
      whereClause = 'product.categoryId = :categoryId';
    }

    return this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(whereClause, {
        categoryId,
      })
      .getMany()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the product in the database: ${error.message}`,
        );
      });
  }

  findById(id: number): Promise<ProductImage> {
    return this.repository
      .createQueryBuilder('product')
      .where('product.id = :id', {
        id,
      })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the product in the database: ${error.message}`,
        );
      });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
