import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { UserService } from '@api/services';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService]
})
export class UserModule {}
