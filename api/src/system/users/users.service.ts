import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XRepositoryService, XQuery, XIdType } from '@ng-nest/api/core';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends XRepositoryService<User, XQuery> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }

  async get(id: XIdType): Promise<User> {
    return await this.usersRepository.findOne(id, { relations: ['roles', 'organizations'] });
  }
}
