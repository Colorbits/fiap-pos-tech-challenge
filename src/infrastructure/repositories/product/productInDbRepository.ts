import { Injectable } from '@nestjs/common';
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
    throw new Error('Method not implemented.');
  }

  async create(product: Product): Promise<Product> {
    return this.repository
      .save(product)
      .then((productEntity) => productEntity)
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the product to the database: '${JSON.stringify(product)}': ${error.message}`,
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
      .innerJoinAndSelect('product.productImages', 'productImages')
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

  findById(id: number): Promise<Product> {
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
        throw new Error(
          `An error occurred while searching the orderItem in the database: '${JSON.stringify(productId)}': ${error.message}`,
        );
      });
  }

  async edit(product: Product): Promise<Product> {
    return this.repository
      .update(product.id, product)
      .then(() => product)
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the product to the database: '${JSON.stringify(product)}': ${error.message}`,
        );
      });
  }

  async delete(productId: number): Promise<void> {
    const orderItemsFromProduct =
      await this.getOrderItemsByProductId(productId);
    if (orderItemsFromProduct?.length) {
      throw Error(
        `Can't delete this product because there are ${orderItemsFromProduct?.length} Order Items related to it.`,
      );
    }

    await this.repository.delete(productId);
  }
}
