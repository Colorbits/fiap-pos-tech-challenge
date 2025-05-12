import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from '../postgres/postgres.constants';
import { PostgresConfg } from '../postgres/postgres.config';
import { OrderInDbRepository } from './order';
import { ProductInDbRepository } from './product';
import { CategoryInDbRepository } from './category';
import { OrderItemInDbRepository } from './orderItem';
import {
  OrderEntity,
  ProductEntity,
  CategoryEntity,
  OrderItemEntity,
} from '../../entities';

@Module({
  imports: [
    DatabaseConstants,
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfg],
      useFactory: async (config: TypeOrmModuleOptions) => config,
      inject: [DatabaseConstants.DATABASE_CONFIG_NAME],
    }),
  ],
  providers: [
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
  ],
  exports: [
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
  ],
})
export class TypeormDatabaseModule {}
