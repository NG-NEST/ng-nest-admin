import { CacheClear } from '@api/core';
import {
  CreateRoleInput,
  Authorization,
  RoleAuth,
  RoleService,
  UpdateRoleInput,
  RoleCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Patch()
  @Authorization(RoleAuth.RoleUpdate)
  @CacheClear(...RoleCacheClear)
  async updateRole(@Body() data: UpdateRoleInput) {
    return await this.roleService.updateRole(data);
  }

  @Post()
  @Authorization(RoleAuth.RoleCreate)
  @CacheClear(...RoleCacheClear)
  async createRole(@Body() data: CreateRoleInput) {
    return await this.roleService.createRole(data);
  }

  @Post(':id/permissions')
  @Authorization(RoleAuth.RolePermissions)
  @CacheClear(...RoleCacheClear)
  async rolePermissions(@Param('id') id: string, @Body() permissionIds: string[]) {
    return await this.roleService.createRolePermissions(id, permissionIds);
  }

  @Delete(':id')
  @Authorization(RoleAuth.RoleDelete)
  @CacheClear(...RoleCacheClear)
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
