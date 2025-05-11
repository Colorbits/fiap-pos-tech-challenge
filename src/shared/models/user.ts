import { randomInt } from 'crypto';
import { IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  id?: string;
}

export class FilterUserDto {
  @IsOptional()
  id?: number;
}

export class User {
  id?: string;

  constructor(userDto: UserDto) {
    this.id = userDto?.id || `${randomInt(999)}`;
  }
}
