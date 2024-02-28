import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
  UserService,
  Authorization,
  UserAuth,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  @Authorization(UserAuth.UserUpdate)
  async updateUser(@Body() data: UpdateUserInput) {
    return await this.userService.updateUser(data);
  }

  @Post()
  @Authorization(UserAuth.UserCreate)
  async createUser(@Body() data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Delete(':id')
  @Authorization(UserAuth.UserDelete)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id/reset-password')
  @Authorization(UserAuth.UserResetPassword)
  async resetPassword(@Param('id') id: string, @Body() data: ResetPasswordInput) {
    return await this.userService.resetPassword(id, data);
  }
}
