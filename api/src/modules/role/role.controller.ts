import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateRoleInput, UpdateRoleInput } from './dto';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Put()
  async updateRole(@Body() data: UpdateRoleInput) {
    return await this.roleService.updateRole(data);
  }

  @Post()
  async createRole(@Body() data: CreateRoleInput) {
    return await this.roleService.createRole(data);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
