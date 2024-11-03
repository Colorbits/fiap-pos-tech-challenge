import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../../../shared/models/product';
import { IRepository } from '../iRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './productEntity';
import { Repository } from 'typeorm';
import { OrderItem } from '../../../shared';
import { OrderItemEntity } from '../orderItem';

@Injectable()
export class ProductInDbRepository implements IRepository<Product> {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<Product>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  findAll(): Promise<Product[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  async create(product: Product): Promise<Product> {
    return this.repository
      .save(product)
      .then((productEntity) => productEntity)
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  find(categoryId: number): Promise<Product[]> {
    let whereClause = '';

    if (categoryId) {
      whereClause = 'product.categoryId = :categoryId';
    }

    return this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productImages', 'productImages')
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

  findById(id: number): Promise<Product> {
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

  getOrderItemsByProductId(productId: number): Promise<OrderItem[]> {
    return this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.productId = :productId', {
        productId,
      })
      .getMany()
      .then((orderItemEntities) => {
        console.log(orderItemEntities);
        return orderItemEntities.map((orderItemEntity) => ({
          id: orderItemEntity.id,
          product: orderItemEntity.product,
          quantity: orderItemEntity.quantity,
          productPrice: orderItemEntity.productPrice,
          order: orderItemEntity.order,
        }));
      })
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async edit(product: Product): Promise<Product> {
    return this.repository
      .update(product.id, product)
      .then(() => product)
      .catch((error) => {
        throw new HttpException(
          `An error occurred while saving the product to the database: '${JSON.stringify(product)}': ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async delete(productId: number): Promise<void> {
    const orderItemsFromProduct =
      await this.getOrderItemsByProductId(productId);
    if (orderItemsFromProduct?.length) {
      throw new HttpException(
        `Can't delete this product because there are ${orderItemsFromProduct?.length} Order Items related to it.`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.repository.delete(productId);
  }
}
