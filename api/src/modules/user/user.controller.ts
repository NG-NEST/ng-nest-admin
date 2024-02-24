import {
  CreateUserInput,
  JwtAuthGuard,
  // Routes,
  ResetPasswordInput,
  Route,
  Routes,
  UpdateUserInput,
  UserService,
  // Route,
} from '@api/services';
import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async updateUser(@Body() data: UpdateUserInput) {
    return await this.userService.updateUser(data);
  }

  @Post()
  @Routes(Route.CreateUser)
  async createUser(@Body() data: CreateUserInput, @Req() req: any) {
    console.log(req);
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
