import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from '../postgres/postgres.constants';
import { PostgresConfg } from '../postgres/postgres.config';
import { OrderInDbRepository } from './order';
import { ProductInDbRepository } from './product';
import { ProductImageInDbRepository } from './productImage';
import { CategoryInDbRepository } from './category';
import { OrderItemInDbRepository } from './orderItem';
import { UserInDbRepository } from './user';
import {
  OrderEntity,
  ProductEntity,
  ProductImageEntity,
  CustomerEntity,
  CategoryEntity,
  OrderItemEntity,
  UserEntity,
} from '../../entities';

@Module({
  imports: [
    DatabaseConstants,
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      ProductImageEntity,
      CategoryEntity,
      OrderEntity,
      OrderItemEntity,
      UserEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfg],
      useFactory: async (config: TypeOrmModuleOptions) => config,
      inject: [DatabaseConstants.DATABASE_CONFIG_NAME],
    }),
  ],
  providers: [
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    {
      provide: 'IRepository<ProductImage>',
      useClass: ProductImageInDbRepository,
    },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
    { provide: 'IRepository<User>', useClass: UserInDbRepository },
  ],
  exports: [
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    {
      provide: 'IRepository<ProductImage>',
      useClass: ProductImageInDbRepository,
    },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
    { provide: 'IRepository<User>', useClass: UserInDbRepository },
  ],
})
export class TypeormDatabaseModule {}
