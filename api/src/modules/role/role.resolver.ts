import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseID, PrismaService } from '@api/core';
import { Role } from './model';
import { RolePaginationOutput, RolePaginationInput, CreateRoleInput, UpdateRoleInput } from './dto';
import { RoleResolverName } from './enum';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => RolePaginationOutput, { description: RoleResolverName.Roles })
  async roles(@Args() input: RolePaginationInput): Promise<RolePaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.role.findMany(input),
      count: await this.prisma.role.count({ where })
    };
  }

  @Query(() => Role, { description: RoleResolverName.Role, nullable: true })
  async role(@Args('id', BaseID) id: string): Promise<Role> {
    return await this.prisma.role.findUnique({ where: { id } });
  }

  @Mutation(() => Role, { description: RoleResolverName.UpdateRole })
  async updateRole(@Args('id', BaseID) id: string, @Args('updateRole') data: UpdateRoleInput) {
    return await this.prisma.role.update({
      data,
      where: { id }
    });
  }

  @Mutation(() => Role, { description: RoleResolverName.CreateRole })
  async createRole(@Args('createRole') data: CreateRoleInput) {
    return await this.prisma.role.create({ data });
  }

  @Mutation(() => Role, { description: RoleResolverName.DeleteRole })
  async deleteRole(@Args('id', BaseID) id: string) {
    return await this.prisma.role.delete({ where: { id } });
  }
}
