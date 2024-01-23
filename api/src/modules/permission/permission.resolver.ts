import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, PrismaSelect } from '@api/core';
import { PermissionService } from './permission.service';
import {
  Permission,
  PermissionCode,
  PermissionId,
  PermissionPaginationInput,
  PermissionPaginationOutput,
  PermissionResolverName,
  PermissionSelectOutput
} from '@api/dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth';

@UseGuards(GqlAuthGuard)
@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) {}

  @Query(() => PermissionPaginationOutput, {
    description: PermissionResolverName.Permissions
  })
  async permissions(
    @Args() input: PermissionPaginationInput,
    @PrismaSelect('data') select: BaseSelect
  ): Promise<PermissionPaginationOutput> {
    return await this.permissionService.permissions(input, select);
  }

  @Query(() => Permission, { description: PermissionResolverName.Permission })
  async permission(
    @Args('id', PermissionId) id: string,
    @PrismaSelect() select: BaseSelect
  ): Promise<Permission> {
    return await this.permissionService.permission(id, select);
  }

  @Query(() => [PermissionSelectOutput], {
    description: PermissionResolverName.PermissionSelect
  })
  async permissionSelect(
    @PrismaSelect('data') select: BaseSelect
  ): Promise<PermissionSelectOutput[]> {
    return await this.permissionService.permissionSelect(select);
  }
}
