import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
