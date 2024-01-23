import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePermissionInput, UpdatePermissionInput } from '@api/dto';
import { PermissionService } from './permission.service';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Put()
  async updatePermission(@Body() data: UpdatePermissionInput) {
    return await this.permissionService.updatePermission(data);
  }

  @Post()
  async createPermission(@Body() data: CreatePermissionInput) {
    return await this.permissionService.createPermission(data);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    return await this.permissionService.deletePermission(id);
  }
}
