import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product';
import { OrderEntity } from '../order/orderEntity';

@Entity({ name: 'OrderItem' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'product_price', nullable: true })
  productPrice?: string;

  @ManyToOne(() => ProductEntity, (product) => product, { cascade: true })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order, { cascade: true })
  order: OrderEntity;
}
