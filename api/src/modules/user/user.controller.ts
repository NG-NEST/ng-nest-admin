import { CacheClear } from '@api/core';
import {
  UserCreateInput,
  UserResetPasswordInput,
  UserUpdateInput,
  UserService,
  Authorization,
  UserAuth,
  UserCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  @Authorization(UserAuth.UserUpdate)
  @CacheClear(...UserCacheClear)
  async update(@Body() data: UserUpdateInput) {
    return await this.userService.update(data);
  }

  @Post()
  // @Authorization(UserAuth.UserCreate)
  @CacheClear(...UserCacheClear)
  async create(@Body() data: UserCreateInput) {
    return await this.userService.create(data);
  }

  @Delete(':id')
  @Authorization(UserAuth.UserDelete)
  @CacheClear(...UserCacheClear)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Patch(':id/reset-password')
  @Authorization(UserAuth.UserResetPassword)
  async resetPassword(@Param('id') id: string, @Body() data: UserResetPasswordInput) {
    return await this.userService.resetPassword(id, data);
  }
}
