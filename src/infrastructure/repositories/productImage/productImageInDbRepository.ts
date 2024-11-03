import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  findAll(): Promise<ProductImage[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async create(productImage: ProductImage): Promise<ProductImage> {
    return this.repository.save(productImage).catch((error) => {
      throw new HttpException(
        `An error occurred while searching the orderItem in the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
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
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
