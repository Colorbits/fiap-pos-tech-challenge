import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductStatusEnum } from '../../shared';
import { CategoryEntity } from '../category';
import { ProductImageEntity } from '../productImage/productImageEntity';

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

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
  productImages: ProductImageEntity[];
}
