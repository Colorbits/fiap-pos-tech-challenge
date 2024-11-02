import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product/productEntity';

@Entity({ name: 'ProductImage' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => ProductEntity, (product) => product, {
    cascade: true,
  })
  product: ProductEntity;
}
