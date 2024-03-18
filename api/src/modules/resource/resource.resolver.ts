import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Resource,
  ResourceCache,
  ResourceId,
  ResourcePaginationInput,
  ResourcePaginationOutput,
  ResourceResolverName,
  ResourceSelectInput,
  ResourceSelectOutput,
  ResourceService,
} from '@api/services';

@Resolver(() => Resource)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => ResourcePaginationOutput, {
    description: ResourceResolverName.Resources,
  })
  @CacheControl(ResourceCache.Resources)
  async resources(
    @Args() input: ResourcePaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<ResourcePaginationOutput> {
    return await this.resourceService.resources(input, select);
  }

  @Query(() => Resource, { description: ResourceResolverName.Resource })
  @CacheControl(ResourceCache.Resource)
  async resource(
    @Args('id', ResourceId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Resource> {
    return await this.resourceService.resource(id, select);
  }

  @Query(() => [ResourceSelectOutput], {
    description: ResourceResolverName.ResourceSelect,
  })
  @CacheControl(ResourceCache.ResourceSelect)
  async resourceSelect(
    @Args() input: ResourceSelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<ResourceSelectOutput[]> {
    return await this.resourceService.resourceSelect(input, select);
  }
}
