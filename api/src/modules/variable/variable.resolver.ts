import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Variable,
  VariableCache,
  VariableId,
  VariablePaginationInput,
  VariablePaginationOutput,
  VariableResolverName,
  VariableSelectInput,
  VariableSelectOutput,
  VariableService,
} from '@api/services';

@Resolver(() => Variable)
export class VariableResolver {
  constructor(private variableService: VariableService) {}

  @Query(() => VariablePaginationOutput, {
    description: VariableResolverName.Variables,
  })
  @CacheControl(VariableCache.Variables)
  async variables(
    @Args() input: VariablePaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<VariablePaginationOutput> {
    return await this.variableService.variables(input, select);
  }

  @Query(() => Variable, { description: VariableResolverName.Variable })
  @CacheControl(VariableCache.Variable)
  async variable(
    @Args('id', VariableId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Variable> {
    return await this.variableService.variable(id, select);
  }

  @Query(() => [VariableSelectOutput], {
    description: VariableResolverName.VariableSelect,
  })
  @CacheControl(VariableCache.VariableSelect)
  async variableSelect(
    @Args() input: VariableSelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<VariableSelectOutput[]> {
    return await this.variableService.variableSelect(input, select);
  }
}
