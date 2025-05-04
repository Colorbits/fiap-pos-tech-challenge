import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItemEntity } from '../orderItem';
import { OrderStatusEnum } from '../../shared';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'status' })
  status: OrderStatusEnum;

  @Column({ name: 'total_price' })
  totalPrice: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];
}
