import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IRepository } from '../iRepository';
import { User } from '../../../shared/models/user';
import { UserEntity } from './userEntity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserInDbRepository implements IRepository<User> {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(): Promise<User> {
    return this.repository.save({}).catch((error) => {
      throw new HttpException(
        `An error occurred while searching the orderItem in the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  findById(id: number) {
    return this.repository
      .createQueryBuilder('customer')
      .where('User.id = :id', { id })
      .getOne()
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the orderItem in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  find(): Promise<User[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  edit(): Promise<User> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
  findAll(): Promise<User[]> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
}
