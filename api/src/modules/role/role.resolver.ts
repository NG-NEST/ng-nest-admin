import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseID, PrismaService } from '@api/core';
import { UpdateRoleInput } from './dto/update.input';
import { Role } from './dto/role.model';
import { CreateRoleInput } from './dto/create.input';
import { RolePaginationOutput } from './dto/role.output';
import { RolePaginationInput } from './dto/role-pagination.input';
import { RoleResolverName } from './dto/role.enum';

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
