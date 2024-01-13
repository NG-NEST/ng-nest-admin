import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseID, BaseSelect, PrismaSelect } from '@api/core';
import { ResourcePaginationInput, ResourcePaginationOutput, ResourceSelectOutput } from './dto';
import { ResourceService } from './resource.service';
import { Resource } from './model';
import { ResourceResolverName } from './enum';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth';

@UseGuards(GqlAuthGuard)
@Resolver(() => Resource)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => ResourcePaginationOutput, { description: ResourceResolverName.Resources })
  async resources(@Args() input: ResourcePaginationInput, @PrismaSelect('data') select: BaseSelect): Promise<ResourcePaginationOutput> {
    return await this.resourceService.resources(input, select);
  }

  @Query(() => Resource, { description: ResourceResolverName.Resource, nullable: true })
  async resource(@Args('id', BaseID) id: string, @PrismaSelect() select: BaseSelect): Promise<Resource> {
    return await this.resourceService.resource(id, select);
  }

  @Query(() => [ResourceSelectOutput], { description: ResourceResolverName.ResourceSelect })
  async resourceSelect(@PrismaSelect('data') select: BaseSelect): Promise<ResourceSelectOutput[]> {
    return await this.resourceService.resourceSelect(select);
  }
}
