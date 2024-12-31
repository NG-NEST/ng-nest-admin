import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Role,
  RoleCache,
  RoleId,
  RolePaginationInput,
  RolePaginationOutput,
  RolePermissionOutput,
  RoleResolverName,
  RoleSelectInput,
  RoleSelectOutput,
  RoleService,
  SubjectId,
} from '@api/services';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) { }

  @Query(() => RolePaginationOutput, { description: RoleResolverName.Roles })
  @CacheControl(RoleCache.Roles)
  async roles(
    @Args() input: RolePaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<RolePaginationOutput> {
    return await this.roleService.roles(input, select);
  }

  @Query(() => Role, { description: RoleResolverName.Role })
  @CacheControl(RoleCache.Role)
  async role(@Args('id', RoleId) id: string, @PrismaSelect() select: BaseSelect): Promise<Role> {
    return await this.roleService.role(id, select);
  }

  @Query(() => [RoleSelectOutput], { description: RoleResolverName.RoleSelect })
  @CacheControl(RoleCache.RoleSelect)
  async roleSelect(
    @Args() input: RoleSelectInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<RoleSelectOutput[]> {
    return await this.roleService.roleSelect(input, select);
  }

  @Query(() => [RolePermissionOutput], { description: RoleResolverName.RolePermissions })
  @CacheControl(RoleCache.RolePermissions)
  async rolePermissions(
    @Args('id', RoleId) id: string,
    @Args('subjectId', SubjectId) subjectId: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<RolePermissionOutput[]> {
    return await this.roleService.rolePermissions(id, subjectId, select);
  }
}
