import { Controller } from '@nestjs/common';
import { ControllerService } from '@ng-nest/api/core';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends ControllerService<User> {
  constructor(public readonly usersService: UsersService) {
    super(usersService);
  }
}
