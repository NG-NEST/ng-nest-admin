import { CacheClear } from '@api/core';
import {
  RoleCreateInput,
  Authorization,
  RoleAuth,
  RoleService,
  RoleUpdateInput,
  RoleCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Patch()
  @Authorization(RoleAuth.RoleUpdate)
  @CacheClear(...RoleCacheClear)
  async update(@Body() data: RoleUpdateInput) {
    return await this.roleService.update(data);
  }

  @Post()
  @Authorization(RoleAuth.RoleCreate)
  @CacheClear(...RoleCacheClear)
  async create(@Body() data: RoleCreateInput) {
    return await this.roleService.create(data);
  }

  @Post(':id/permissions')
  @Authorization(RoleAuth.RolePermissions)
  @CacheClear(...RoleCacheClear)
  async updatePermissions(@Param('id') id: string, @Body() permissionCodes: string[]) {
    return await this.roleService.updatePermissions(id, permissionCodes);
  }

  @Delete(':id')
  @Authorization(RoleAuth.RoleDelete)
  @CacheClear(...RoleCacheClear)
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
}
