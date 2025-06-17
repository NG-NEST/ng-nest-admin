import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  VariableCategory,
  VariableCategoryCache,
  VariableCategoryId,
  VariableCategoryPaginationInput,
  VariableCategoryPaginationOutput,
  VariableCategoryResolverName,
  VariableCategorySelectInput,
  VariableCategorySelectOutput,
  VariableCategoryService,
} from '@api/services';

@Resolver(() => VariableCategory)
export class VariableCategoryResolver {
  constructor(private variableCategoryService: VariableCategoryService) {}

  @Query(() => VariableCategoryPaginationOutput, {
    description: VariableCategoryResolverName.VariableCategorys,
  })
  @CacheControl(VariableCategoryCache.VariableCategorys)
  async variableCategorys(
    @Args() input: VariableCategoryPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<VariableCategoryPaginationOutput> {
    return await this.variableCategoryService.variableCategorys(input, select);
  }

  @Query(() => VariableCategory, { description: VariableCategoryResolverName.VariableCategory })
  @CacheControl(VariableCategoryCache.VariableCategory)
  async variableCategory(
    @Args('id', VariableCategoryId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<VariableCategory> {
    return await this.variableCategoryService.variableCategory(id, select);
  }

  @Query(() => [VariableCategorySelectOutput], {
    description: VariableCategoryResolverName.VariableCategorySelect,
  })
  @CacheControl(VariableCategoryCache.VariableCategorySelect)
  async variableCategorySelect(
    @Args() input: VariableCategorySelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<VariableCategorySelectOutput[]> {
    return await this.variableCategoryService.variableCategorySelect(input, select);
  }
}
