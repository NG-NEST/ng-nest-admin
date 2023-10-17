import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseID, BaseSelect, PrismaSelect } from '@api/core';
import { CreateRoleInput, UpdateRoleInput, RolePaginationInput, RolePaginationOutput, RoleSelectOutput } from './dto';
import { RoleService } from './role.service';
import { Role } from './model';
import { RoleResolverName } from './enum';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => RolePaginationOutput, { description: RoleResolverName.Roles })
  async roles(@Args() input: RolePaginationInput, @PrismaSelect('data') select: BaseSelect): Promise<RolePaginationOutput> {
    return await this.roleService.roles(input, select);
  }

  @Query(() => Role, { description: RoleResolverName.Role, nullable: true })
  async role(@Args('id', BaseID) id: string, @PrismaSelect('data') select: BaseSelect): Promise<Role> {
    return await this.roleService.role(id, select);
  }

  @Query(() => [RoleSelectOutput], { description: RoleResolverName.RoleSelect })
  async roleSelect(@PrismaSelect('data') select: BaseSelect): Promise<RoleSelectOutput[]> {
    return await this.roleService.roleSelect(select);
  }

  @Mutation(() => Role, { description: RoleResolverName.UpdateRole })
  async updateRole(@Args('id', BaseID) id: string, @Args('role') data: UpdateRoleInput) {
    return await this.roleService.updateRole(id, data);
  }

  @Mutation(() => Role, { description: RoleResolverName.CreateRole })
  async createRole(@Args('role') data: CreateRoleInput) {
    return await this.roleService.createRole(data);
  }

  @Mutation(() => Role, { description: RoleResolverName.DeleteRole })
  async deleteRole(@Args('id', BaseID) id: string) {
    return await this.roleService.deleteRole(id);
  }
}
