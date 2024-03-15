import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Dictionary,
  DictionaryCache,
  DictionaryId,
  DictionaryPaginationInput,
  DictionaryPaginationOutput,
  DictionaryResolverName,
  DictionarySelectInput,
  DictionarySelectOutput,
  DictionaryService,
} from '@api/services';

@Resolver(() => Dictionary)
export class DictionaryResolver {
  constructor(private dictionaryService: DictionaryService) {}

  @Query(() => DictionaryPaginationOutput, {
    description: DictionaryResolverName.Dictionaries,
  })
  @CacheControl(DictionaryCache.Dictionaries)
  async dictionaries(
    @Args() input: DictionaryPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<DictionaryPaginationOutput> {
    return await this.dictionaryService.dictionaries(input, select);
  }

  @Query(() => Dictionary, { description: DictionaryResolverName.Dictionary })
  @CacheControl(DictionaryCache.Dictionary)
  async dictionary(
    @Args('id', DictionaryId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Dictionary> {
    return await this.dictionaryService.dictionary(id, select);
  }

  @Query(() => [DictionarySelectOutput], {
    description: DictionaryResolverName.DictionarySelect,
  })
  @CacheControl(DictionaryCache.DictionarySelect)
  async dictionarySelect(
    @Args() input: DictionarySelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<DictionarySelectOutput[]> {
    return await this.dictionaryService.dictionarySelect(input, select);
  }
}
