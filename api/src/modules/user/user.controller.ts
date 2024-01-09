import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateUserInput, ResetPasswordInput, UpdateUserInput } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async updateUser(@Body() data: UpdateUserInput) {
    return await this.userService.updateUser(data);
  }

  @Post()
  async createUser(@Body() data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Put(':id/reset-password')
  async resetPassword(@Param('id') id: string, @Body() data: ResetPasswordInput) {
    return await this.userService.resetPassword(id, data);
  }
}
