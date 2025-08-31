import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Prompt,
  PromptCache,
  PromptId,
  PromptPaginationInput,
  PromptPaginationOutput,
  PromptResolverName,
  PromptSelectInput,
  PromptSelectOutput,
  PromptService,
} from '@api/services';

@Resolver(() => Prompt)
export class PromptResolver {
  constructor(private promptService: PromptService) {}

  @Query(() => PromptPaginationOutput, { description: PromptResolverName.Prompts })
  @CacheControl(PromptCache.Prompts)
  async prompts(
    @Args() input: PromptPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<PromptPaginationOutput> {
    return await this.promptService.prompts(input, select);
  }

  @Query(() => Prompt, { description: PromptResolverName.Prompt })
  @CacheControl(PromptCache.Prompt)
  async prompt(
    @Args('id', PromptId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Prompt> {
    return await this.promptService.prompt(id, select);
  }

  @Query(() => [PromptSelectOutput], { description: PromptResolverName.PromptSelect })
  @CacheControl(PromptCache.PromptSelect)
  async promptSelect(
    @Args() input: PromptSelectInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<PromptSelectOutput[]> {
    return await this.promptService.promptSelect(input, select);
  }
}
