import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductStatusEnum } from '../../shared';
import { CategoryEntity } from '../category';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category, {
    cascade: true,
  })
  category: CategoryEntity;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'status' })
  status: ProductStatusEnum;

  @Column({ name: 'description', nullable: true })
  description: string;
}
