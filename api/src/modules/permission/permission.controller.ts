import {
  CreatePermissionInput,
  PermissionAuth,
  PermissionService,
  Authorization,
  UpdatePermissionInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Patch()
  @Authorization(PermissionAuth.PermissionUpdate)
  async updatePermission(@Body() data: UpdatePermissionInput) {
    return await this.permissionService.updatePermission(data);
  }

  @Post()
  @Authorization(PermissionAuth.PermissionCreate)
  async createPermission(@Body() data: CreatePermissionInput) {
    return await this.permissionService.createPermission(data);
  }

  @Delete(':id')
  @Authorization(PermissionAuth.PermissionDelete)
  async deletePermission(@Param('id') id: string) {
    return await this.permissionService.deletePermission(id);
  }
}
