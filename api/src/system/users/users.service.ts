import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { XRepositoryService, XQuery, XIdType } from '@ng-nest/api/core';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends XRepositoryService<User, XQuery> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {
    super(usersRepository, dataSource);
  }

  async get(id: XIdType): Promise<User> {
    return await this.usersRepository.findOne({ where: { id }, relations: ['roles', 'organizations'] });
  }
}
