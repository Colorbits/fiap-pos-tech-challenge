import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;
}
