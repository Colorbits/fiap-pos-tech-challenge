import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, User } from '../../../shared/models';
import { CustomerEntity, UserEntity } from '../../../entities';
import { IRepository } from '../iRepository';

@Injectable()
export class CustomerInDbRepository implements IRepository<Customer | User> {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findById(id: number): Promise<Customer | User> {
    try {
      const customers = await this.userRepository.query(
        `SELECT "u"."id", "c"."name", "c"."document", "c"."phone_number", "c"."email" FROM "User" "u" LEFT JOIN "Customer" "c" ON "c"."id" = "u"."id" WHERE "u"."id" = ${id}`,
      );

      console.log(customers);
      if (!customers.length) {
        throw new HttpException(
          `Customer not found`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const [customer] = customers;
      if (!customer.name) return { id: customer.id };

      return {
        id: customer.id,
        name: customer.name,
        document: customer.document,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      };
    } catch (error) {
      throw new HttpException(
        `An error occurred while searching the customer in the database: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  create(customer: Customer): Promise<Customer> {
    return this.repository
      .save({
        id: customer.id,
        name: customer.name,
        document: customer.document,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      })
      .catch((error) => {
        throw new HttpException(
          `An error occurred while saving the customer to the database: '${JSON.stringify(customer)}': ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
  findAll(): Promise<Array<Customer | User>> {
    return this.userRepository
      .query(
        `
      SELECT
        "u"."id",
        "c"."name",
        "c"."document",
        "c"."phone_number",
        "c"."email"
      FROM
        "User" "u"
        LEFT JOIN "Customer" "c" ON "c"."id" = "u"."id"  
      `,
      )
      .then((customers) => {
        return customers.map((customer) => {
          if (!customer.name) return { id: customer.id };

          return {
            id: customer.id,
            name: customer.name,
            document: customer.document,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
          };
        });
      })
      .catch((error) => {
        throw new HttpException(
          `An error occurred while searching the customer in the database: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  find(): Promise<Array<Customer | User>> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  delete(): Promise<void> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }

  edit(): Promise<Customer> {
    throw new HttpException('Method not implemented.', HttpStatus.FORBIDDEN);
  }
}
