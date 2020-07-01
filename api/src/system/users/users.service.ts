import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { RepositoryService, XQuery } from '@ng-nest/api/core';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends RepositoryService<User, XQuery> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }

  async get(id: string | number | Date | ObjectID): Promise<User> {
    return await this.usersRepository.findOne(id, { relations: ['roles', 'organizations'] });
  }
}
