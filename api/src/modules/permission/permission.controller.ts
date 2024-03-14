import {
  PermissionCreateInput,
  PermissionAuth,
  PermissionService,
  Authorization,
  PermissionUpdateInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Patch()
  @Authorization(PermissionAuth.PermissionUpdate)
  async update(@Body() data: PermissionUpdateInput) {
    return await this.permissionService.update(data);
  }

  @Post()
  @Authorization(PermissionAuth.PermissionCreate)
  async create(@Body() data: PermissionCreateInput) {
    return await this.permissionService.create(data);
  }

  @Delete(':id')
  @Authorization(PermissionAuth.PermissionDelete)
  async delete(@Param('id') id: string) {
    return await this.permissionService.delete(id);
  }
}
