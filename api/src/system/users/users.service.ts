import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryService } from '@ng-nest/api/core';
import { User } from './entities/user.entity';

export interface UserQuery {
  organizationId: string;
}

@Injectable()
export class UsersService extends RepositoryService<User> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }
}
