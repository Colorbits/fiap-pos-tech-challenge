import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderItemEntity } from '../orderItem';
import { OrderStatusEnum } from '../../shared';
import { UserEntity } from '../user';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'status' })
  status: OrderStatusEnum;

  @Column({ name: 'total_price' })
  totalPrice: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];
}
