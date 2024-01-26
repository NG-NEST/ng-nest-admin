import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, PrismaSelect } from '@api/core';
import { UseGuards } from '@nestjs/common';
import {
  GqlAuthGuard,
  Role,
  RoleId,
  RolePaginationInput,
  RolePaginationOutput,
  RoleResolverName,
  RoleSelectOutput,
  RoleService
} from '@api/services';

@UseGuards(GqlAuthGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => RolePaginationOutput, { description: RoleResolverName.Roles })
  async roles(
    @Args() input: RolePaginationInput,
    @PrismaSelect('data') select: BaseSelect
  ): Promise<RolePaginationOutput> {
    return await this.roleService.roles(input, select);
  }

  @Query(() => Role, { description: RoleResolverName.Role })
  async role(@Args('id', RoleId) id: string, @PrismaSelect() select: BaseSelect): Promise<Role> {
    return await this.roleService.role(id, select);
  }

  @Query(() => [RoleSelectOutput], { description: RoleResolverName.RoleSelect })
  async roleSelect(@PrismaSelect('data') select: BaseSelect): Promise<RoleSelectOutput[]> {
    return await this.roleService.roleSelect(select);
  }
}
