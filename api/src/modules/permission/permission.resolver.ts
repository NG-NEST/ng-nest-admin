import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Permission,
  PermissionCache,
  PermissionId,
  PermissionPaginationInput,
  PermissionPaginationOutput,
  PermissionResolverName,
  PermissionSelectOutput,
  PermissionService,
} from '@api/services';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) {}

  @Query(() => PermissionPaginationOutput, {
    description: PermissionResolverName.Permissions,
  })
  @CacheControl(PermissionCache.Permissions)
  async permissions(
    @Args() input: PermissionPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<PermissionPaginationOutput> {
    return await this.permissionService.permissions(input, select);
  }

  @Query(() => Permission, { description: PermissionResolverName.Permission })
  @CacheControl(PermissionCache.Permission)
  async permission(
    @Args('id', PermissionId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Permission> {
    return await this.permissionService.permission(id, select);
  }

  @Query(() => [PermissionSelectOutput], {
    description: PermissionResolverName.PermissionSelect,
  })
  @CacheControl(PermissionCache.PermissionSelect)
  async permissionSelect(
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<PermissionSelectOutput[]> {
    return await this.permissionService.permissionSelect(select);
  }
}
