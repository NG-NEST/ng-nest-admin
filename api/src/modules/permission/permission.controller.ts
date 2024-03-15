import { CacheClear } from '@api/core';
import {
  PermissionCreateInput,
  PermissionAuth,
  PermissionService,
  Authorization,
  PermissionUpdateInput,
  PermissionCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Patch()
  @Authorization(PermissionAuth.PermissionUpdate)
  @CacheClear(...PermissionCacheClear)
  async update(@Body() data: PermissionUpdateInput) {
    return await this.permissionService.update(data);
  }

  @Post()
  @Authorization(PermissionAuth.PermissionCreate)
  @CacheClear(...PermissionCacheClear)
  async create(@Body() data: PermissionCreateInput) {
    return await this.permissionService.create(data);
  }

  @Delete(':id')
  @Authorization(PermissionAuth.PermissionDelete)
  @CacheClear(...PermissionCacheClear)
  async delete(@Param('id') id: string) {
    return await this.permissionService.delete(id);
  }
}
