import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user';

@Entity({ name: 'Customer' })
export class CustomerEntity {
  @PrimaryColumn()
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'document' })
  document: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'email' })
  email: string;
}
