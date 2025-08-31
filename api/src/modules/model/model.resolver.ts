import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Model,
  ModelCache,
  ModelId,
  ModelPaginationInput,
  ModelPaginationOutput,
  ModelResolverName,
  ModelSelectInput,
  ModelSelectOutput,
  ModelService
} from '@api/services';

@Resolver(() => Model)
export class ModelResolver {
  constructor(private modelService: ModelService) { }

  @Query(() => ModelPaginationOutput, { description: ModelResolverName.Models })
  @CacheControl(ModelCache.Models)
  async models(
    @Args() input: ModelPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<ModelPaginationOutput> {
    return await this.modelService.models(input, select);
  }

  @Query(() => Model, { description: ModelResolverName.Model })
  @CacheControl(ModelCache.Model)
  async model(@Args('id', ModelId) id: string, @PrismaSelect() select: BaseSelect): Promise<Model> {
    return await this.modelService.model(id, select);
  }

  @Query(() => [ModelSelectOutput], { description: ModelResolverName.ModelSelect })
  @CacheControl(ModelCache.ModelSelect)
  async modelSelect(
    @Args() input: ModelSelectInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<ModelSelectOutput[]> {
    return await this.modelService.modelSelect(input, select);
  }
}
